#!/usr/bin/env node

import { Command } from 'commander';
import Table from 'cli-table3';
import chalk from 'chalk';
import {
  getAllPricing,
  calculate,
  getCheapest,
  compare,
  formatCost,
  formatTokens,
  formatContext,
  getProviders,
  LAST_UPDATED,
} from './index';

const program = new Command();

program
  .name('llm-price')
  .description('Real-time LLM pricing comparison & cost calculator')
  .version('1.0.0');

// Compare command
program
  .command('compare')
  .alias('c')
  .description('Compare pricing across all LLM providers')
  .option('-p, --provider <provider>', 'Filter by provider')
  .option('--sort <field>', 'Sort by: input, output, context', 'input')
  .action((options) => {
    let data = compare();

    if (options.provider) {
      data = data.filter(m => 
        m.provider.toLowerCase() === options.provider.toLowerCase()
      );
    }

    if (options.sort === 'output') {
      data.sort((a, b) => a.outputPer1M - b.outputPer1M);
    } else if (options.sort === 'context') {
      data.sort((a, b) => b.contextWindow - a.contextWindow);
    }

    const table = new Table({
      head: [
        chalk.bold('Model'),
        chalk.bold('Provider'),
        chalk.bold('Input/1M'),
        chalk.bold('Output/1M'),
        chalk.bold('Context'),
      ],
      style: { head: [], border: [] },
    });

    for (const model of data) {
      table.push([
        model.displayName,
        model.provider,
        chalk.green(`$${model.inputPer1M.toFixed(2)}`),
        chalk.yellow(`$${model.outputPer1M.toFixed(2)}`),
        formatContext(model.contextWindow),
      ]);
    }

    console.log('\n' + chalk.bold('💰 LLM Pricing Comparison'));
    console.log(chalk.dim(`Last updated: ${LAST_UPDATED}\n`));
    console.log(table.toString());
    console.log();
  });

// Calculate command
program
  .command('calc')
  .alias('calculate')
  .description('Calculate cost for specific usage')
  .requiredOption('-m, --model <model>', 'Model name')
  .requiredOption('-i, --input <tokens>', 'Number of input tokens', parseInt)
  .requiredOption('-o, --output <tokens>', 'Number of output tokens', parseInt)
  .action((options) => {
    const result = calculate({
      model: options.model,
      inputTokens: options.input,
      outputTokens: options.output,
    });

    if (!result) {
      console.error(chalk.red(`Model "${options.model}" not found.`));
      console.log('\nAvailable models:');
      const models = getAllPricing();
      models.forEach(m => console.log(`  - ${m.displayName} (${m.model})`));
      process.exit(1);
    }

    console.log('\n' + chalk.bold('🧮 Cost Calculation'));
    console.log(chalk.dim('─'.repeat(40)));
    console.log(`Model:         ${chalk.cyan(result.model)}`);
    console.log(`Provider:      ${result.provider}`);
    console.log(`Input tokens:  ${formatTokens(result.inputTokens)} (${chalk.green(formatCost(result.inputCost))})`);
    console.log(`Output tokens: ${formatTokens(result.outputTokens)} (${chalk.yellow(formatCost(result.outputCost))})`);
    console.log(chalk.dim('─'.repeat(40)));
    console.log(`Total:         ${chalk.bold.white(formatCost(result.totalCost))}`);
    console.log();
  });

// Cheapest command
program
  .command('cheapest')
  .alias('cheap')
  .description('Find cheapest models for your usage')
  .requiredOption('-i, --input <tokens>', 'Number of input tokens', parseInt)
  .requiredOption('-o, --output <tokens>', 'Number of output tokens', parseInt)
  .option('-c, --context <size>', 'Minimum context window', parseInt)
  .option('-p, --providers <list>', 'Comma-separated list of providers')
  .option('-n, --top <n>', 'Show top N results', parseInt, 10)
  .action((options) => {
    const providers = options.providers 
      ? options.providers.split(',').map((p: string) => p.trim())
      : undefined;

    const results = getCheapest({
      inputTokens: options.input,
      outputTokens: options.output,
      minContext: options.context,
      providers,
    });

    console.log('\n' + chalk.bold('🏆 Cheapest Models'));
    console.log(chalk.dim(`For ${formatTokens(options.input)} input + ${formatTokens(options.output)} output tokens\n`));

    const table = new Table({
      head: [
        chalk.bold('#'),
        chalk.bold('Model'),
        chalk.bold('Provider'),
        chalk.bold('Total Cost'),
      ],
      style: { head: [], border: [] },
    });

    const topN = Math.min(options.top, results.length);
    for (let i = 0; i < topN; i++) {
      const r = results[i];
      const rank = i === 0 ? chalk.yellow('🥇') : i === 1 ? chalk.white('🥈') : i === 2 ? chalk.red('🥉') : `${i + 1}.`;
      table.push([
        rank,
        r.displayName,
        r.provider,
        chalk.green(formatCost(r.totalCost)),
      ]);
    }

    console.log(table.toString());
    console.log();
  });

// Providers command
program
  .command('providers')
  .description('List all available providers')
  .action(() => {
    const providers = getProviders();
    console.log('\n' + chalk.bold('📦 Available Providers\n'));
    providers.forEach(p => {
      const models = getAllPricing().filter(m => m.provider === p);
      console.log(`  ${chalk.cyan(p)} (${models.length} models)`);
    });
    console.log();
  });

// Models command
program
  .command('models')
  .description('List all available models')
  .option('-p, --provider <provider>', 'Filter by provider')
  .action((options) => {
    let models = getAllPricing();
    
    if (options.provider) {
      models = models.filter(m => 
        m.provider.toLowerCase() === options.provider.toLowerCase()
      );
    }

    console.log('\n' + chalk.bold('🤖 Available Models\n'));
    
    const byProvider = new Map<string, typeof models>();
    for (const model of models) {
      if (!byProvider.has(model.provider)) {
        byProvider.set(model.provider, []);
      }
      byProvider.get(model.provider)!.push(model);
    }

    for (const [provider, providerModels] of byProvider) {
      console.log(chalk.bold.cyan(`${provider}:`));
      for (const m of providerModels) {
        console.log(`  ${m.displayName}`);
        console.log(chalk.dim(`    ${m.model}`));
      }
      console.log();
    }
  });

program.parse();
