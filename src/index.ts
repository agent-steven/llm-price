import { PRICING_DATA, ModelPricing, LAST_UPDATED } from './pricing';

export { PRICING_DATA, ModelPricing, LAST_UPDATED };

export interface CostResult {
  model: string;
  provider: string;
  inputTokens: number;
  outputTokens: number;
  inputCost: number;
  outputCost: number;
  totalCost: number;
}

export interface CalculateOptions {
  model?: string;
  inputTokens: number;
  outputTokens: number;
}

export interface CheapestOptions {
  inputTokens: number;
  outputTokens: number;
  minContext?: number;
  providers?: string[];
}

export interface CheapestResult {
  model: string;
  provider: string;
  displayName: string;
  totalCost: number;
  inputCost: number;
  outputCost: number;
}

/**
 * Get all pricing data
 */
export function getAllPricing(): ModelPricing[] {
  return PRICING_DATA;
}

/**
 * Get pricing for a specific provider
 */
export function getProviderPricing(provider: string): ModelPricing[] {
  return PRICING_DATA.filter(m => m.provider.toLowerCase() === provider.toLowerCase());
}

/**
 * Get pricing for a specific model
 */
export function getModelPricing(model: string): ModelPricing | undefined {
  return PRICING_DATA.find(m => 
    m.model.toLowerCase() === model.toLowerCase() ||
    m.displayName.toLowerCase() === model.toLowerCase()
  );
}

/**
 * Calculate cost for a specific model and token usage
 */
export function calculate(options: CalculateOptions): CostResult | null {
  const { model, inputTokens, outputTokens } = options;
  
  if (!model) {
    return null;
  }

  const pricing = getModelPricing(model);
  if (!pricing) {
    return null;
  }

  const inputCost = (inputTokens / 1_000_000) * pricing.inputPer1M;
  const outputCost = (outputTokens / 1_000_000) * pricing.outputPer1M;
  const totalCost = inputCost + outputCost;

  return {
    model: pricing.model,
    provider: pricing.provider,
    inputTokens,
    outputTokens,
    inputCost: Math.round(inputCost * 1000000) / 1000000,
    outputCost: Math.round(outputCost * 1000000) / 1000000,
    totalCost: Math.round(totalCost * 1000000) / 1000000,
  };
}

/**
 * Calculate cost for all models and return sorted by total cost
 */
export function calculateAll(options: Omit<CalculateOptions, 'model'>): CostResult[] {
  const { inputTokens, outputTokens } = options;
  
  return PRICING_DATA.map(pricing => {
    const inputCost = (inputTokens / 1_000_000) * pricing.inputPer1M;
    const outputCost = (outputTokens / 1_000_000) * pricing.outputPer1M;
    const totalCost = inputCost + outputCost;

    return {
      model: pricing.model,
      provider: pricing.provider,
      inputTokens,
      outputTokens,
      inputCost: Math.round(inputCost * 1000000) / 1000000,
      outputCost: Math.round(outputCost * 1000000) / 1000000,
      totalCost: Math.round(totalCost * 1000000) / 1000000,
    };
  }).sort((a, b) => a.totalCost - b.totalCost);
}

/**
 * Find the cheapest model for given usage
 */
export function getCheapest(options: CheapestOptions): CheapestResult[] {
  const { inputTokens, outputTokens, minContext, providers } = options;

  let models = PRICING_DATA;

  // Filter by minimum context window
  if (minContext) {
    models = models.filter(m => m.contextWindow >= minContext);
  }

  // Filter by providers
  if (providers && providers.length > 0) {
    const lowerProviders = providers.map(p => p.toLowerCase());
    models = models.filter(m => lowerProviders.includes(m.provider.toLowerCase()));
  }

  // Calculate costs and sort
  const results = models.map(pricing => {
    const inputCost = (inputTokens / 1_000_000) * pricing.inputPer1M;
    const outputCost = (outputTokens / 1_000_000) * pricing.outputPer1M;
    const totalCost = inputCost + outputCost;

    return {
      model: pricing.model,
      provider: pricing.provider,
      displayName: pricing.displayName,
      inputCost: Math.round(inputCost * 1000000) / 1000000,
      outputCost: Math.round(outputCost * 1000000) / 1000000,
      totalCost: Math.round(totalCost * 1000000) / 1000000,
    };
  }).sort((a, b) => a.totalCost - b.totalCost);

  return results;
}

/**
 * Compare pricing across all providers
 */
export function compare(): ModelPricing[] {
  return [...PRICING_DATA].sort((a, b) => {
    // Sort by input price first
    const inputDiff = a.inputPer1M - b.inputPer1M;
    if (inputDiff !== 0) return inputDiff;
    // Then by output price
    return a.outputPer1M - b.outputPer1M;
  });
}

/**
 * Get list of all providers
 */
export function getProviders(): string[] {
  return [...new Set(PRICING_DATA.map(m => m.provider))];
}

/**
 * Format cost as currency string
 */
export function formatCost(cost: number): string {
  if (cost < 0.01) {
    return `$${cost.toFixed(6)}`;
  } else if (cost < 1) {
    return `$${cost.toFixed(4)}`;
  } else {
    return `$${cost.toFixed(2)}`;
  }
}

/**
 * Format token count with commas
 */
export function formatTokens(tokens: number): string {
  return tokens.toLocaleString();
}

/**
 * Format context window (e.g., 128000 -> "128K")
 */
export function formatContext(context: number): string {
  if (context >= 1_000_000) {
    return `${context / 1_000_000}M`;
  } else if (context >= 1000) {
    return `${context / 1000}K`;
  }
  return context.toString();
}
