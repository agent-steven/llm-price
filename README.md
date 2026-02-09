# llm-price 💰

> Real-time LLM pricing comparison & cost calculator

[![npm version](https://img.shields.io/npm/v/llm-price.svg)](https://www.npmjs.com/package/llm-price)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Stop overpaying for AI. Compare prices across **OpenAI, Anthropic, Google, Mistral, Groq** and more.

## Why llm-price?

- 🔄 **Always up-to-date** - Pricing data updated automatically
- 📊 **Compare all providers** - Side-by-side cost comparison
- 🧮 **Calculate costs** - Estimate costs before you run
- 📈 **Track spending** - Monitor your LLM expenses
- ⚡ **Fast CLI** - Get answers in seconds

## Installation

```bash
npm install -g llm-price
```

## Quick Start

```bash
# Compare all models
llm-price compare

# Calculate cost for specific usage
llm-price calc --input 1000 --output 500

# Find cheapest model for your use case
llm-price cheapest --input 10000 --output 5000

# Track spending
llm-price track --add 5.42 --provider openai
```

## Usage

### Compare Prices

```bash
$ llm-price compare

┌─────────────────────────┬────────────┬─────────────┬─────────────┐
│ Model                   │ Input/1M   │ Output/1M   │ Context     │
├─────────────────────────┼────────────┼─────────────┼─────────────┤
│ gpt-4o                  │ $2.50      │ $10.00      │ 128K        │
│ gpt-4o-mini             │ $0.15      │ $0.60       │ 128K        │
│ claude-3.5-sonnet       │ $3.00      │ $15.00      │ 200K        │
│ claude-3.5-haiku        │ $0.80      │ $4.00       │ 200K        │
│ gemini-1.5-pro          │ $1.25      │ $5.00       │ 2M          │
│ gemini-1.5-flash        │ $0.075     │ $0.30       │ 1M          │
│ mistral-large           │ $2.00      │ $6.00       │ 128K        │
│ llama-3.1-70b (groq)    │ $0.59      │ $0.79       │ 128K        │
└─────────────────────────┴────────────┴─────────────┴─────────────┘
```

### Calculate Costs

```bash
$ llm-price calc --model gpt-4o --input 50000 --output 10000

Model: gpt-4o
Input tokens: 50,000 ($0.125)
Output tokens: 10,000 ($0.100)
─────────────────────────
Total: $0.225
```

### Find Cheapest Option

```bash
$ llm-price cheapest --input 100000 --output 50000

For 100K input + 50K output tokens:

1. gemini-1.5-flash    $0.023
2. gpt-4o-mini         $0.045
3. llama-3.1-70b       $0.099
4. claude-3.5-haiku    $0.280
5. gemini-1.5-pro      $0.375
```

### As a Library

```typescript
import { compare, calculate, getCheapest } from 'llm-price';

// Get all prices
const prices = await compare();

// Calculate cost
const cost = calculate({
  model: 'gpt-4o',
  inputTokens: 50000,
  outputTokens: 10000
});
console.log(cost); // { input: 0.125, output: 0.1, total: 0.225 }

// Find cheapest
const cheapest = getCheapest({
  inputTokens: 100000,
  outputTokens: 50000,
  minContext: 32000 // optional: minimum context window
});
console.log(cheapest); // { model: 'gemini-1.5-flash', cost: 0.023 }
```

## Supported Providers

| Provider | Models |
|----------|--------|
| OpenAI | GPT-4o, GPT-4o-mini, GPT-4-turbo, o1, o1-mini |
| Anthropic | Claude 3.5 Sonnet, Claude 3.5 Haiku, Claude 3 Opus |
| Google | Gemini 1.5 Pro, Gemini 1.5 Flash, Gemini 2.0 |
| Mistral | Mistral Large, Mistral Medium, Mistral Small |
| Groq | Llama 3.1 70B, Llama 3.1 8B, Mixtral |
| Together | Llama, Mixtral, Qwen |
| DeepSeek | DeepSeek V3, DeepSeek Coder |

## Contributing

PRs welcome! Help us keep pricing data accurate.

```bash
git clone https://github.com/anthropics/llm-price
cd llm-price
npm install
npm run dev
```

## License

MIT © 2026
