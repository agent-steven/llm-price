/**
 * LLM Pricing Data
 * Last updated: 2026-02-09
 * 
 * Prices are in USD per 1 million tokens
 */

export interface ModelPricing {
  provider: string;
  model: string;
  displayName: string;
  inputPer1M: number;
  outputPer1M: number;
  contextWindow: number;
  notes?: string;
}

export const PRICING_DATA: ModelPricing[] = [
  // OpenAI
  {
    provider: 'openai',
    model: 'gpt-4o',
    displayName: 'GPT-4o',
    inputPer1M: 2.50,
    outputPer1M: 10.00,
    contextWindow: 128000,
  },
  {
    provider: 'openai',
    model: 'gpt-4o-mini',
    displayName: 'GPT-4o Mini',
    inputPer1M: 0.15,
    outputPer1M: 0.60,
    contextWindow: 128000,
  },
  {
    provider: 'openai',
    model: 'gpt-4-turbo',
    displayName: 'GPT-4 Turbo',
    inputPer1M: 10.00,
    outputPer1M: 30.00,
    contextWindow: 128000,
  },
  {
    provider: 'openai',
    model: 'o1',
    displayName: 'o1',
    inputPer1M: 15.00,
    outputPer1M: 60.00,
    contextWindow: 200000,
  },
  {
    provider: 'openai',
    model: 'o1-mini',
    displayName: 'o1 Mini',
    inputPer1M: 3.00,
    outputPer1M: 12.00,
    contextWindow: 128000,
  },
  {
    provider: 'openai',
    model: 'o3-mini',
    displayName: 'o3 Mini',
    inputPer1M: 1.10,
    outputPer1M: 4.40,
    contextWindow: 200000,
  },

  // Anthropic
  {
    provider: 'anthropic',
    model: 'claude-3-5-sonnet-20241022',
    displayName: 'Claude 3.5 Sonnet',
    inputPer1M: 3.00,
    outputPer1M: 15.00,
    contextWindow: 200000,
  },
  {
    provider: 'anthropic',
    model: 'claude-3-5-haiku-20241022',
    displayName: 'Claude 3.5 Haiku',
    inputPer1M: 0.80,
    outputPer1M: 4.00,
    contextWindow: 200000,
  },
  {
    provider: 'anthropic',
    model: 'claude-3-opus-20240229',
    displayName: 'Claude 3 Opus',
    inputPer1M: 15.00,
    outputPer1M: 75.00,
    contextWindow: 200000,
  },

  // Google
  {
    provider: 'google',
    model: 'gemini-1.5-pro',
    displayName: 'Gemini 1.5 Pro',
    inputPer1M: 1.25,
    outputPer1M: 5.00,
    contextWindow: 2000000,
    notes: 'Up to 128K context. >128K is $2.50/$10.00',
  },
  {
    provider: 'google',
    model: 'gemini-1.5-flash',
    displayName: 'Gemini 1.5 Flash',
    inputPer1M: 0.075,
    outputPer1M: 0.30,
    contextWindow: 1000000,
    notes: 'Up to 128K context. >128K is $0.15/$0.60',
  },
  {
    provider: 'google',
    model: 'gemini-2.0-flash',
    displayName: 'Gemini 2.0 Flash',
    inputPer1M: 0.10,
    outputPer1M: 0.40,
    contextWindow: 1000000,
  },

  // Mistral
  {
    provider: 'mistral',
    model: 'mistral-large-latest',
    displayName: 'Mistral Large',
    inputPer1M: 2.00,
    outputPer1M: 6.00,
    contextWindow: 128000,
  },
  {
    provider: 'mistral',
    model: 'mistral-small-latest',
    displayName: 'Mistral Small',
    inputPer1M: 0.20,
    outputPer1M: 0.60,
    contextWindow: 128000,
  },
  {
    provider: 'mistral',
    model: 'codestral-latest',
    displayName: 'Codestral',
    inputPer1M: 0.30,
    outputPer1M: 0.90,
    contextWindow: 256000,
  },

  // Groq
  {
    provider: 'groq',
    model: 'llama-3.1-70b-versatile',
    displayName: 'Llama 3.1 70B (Groq)',
    inputPer1M: 0.59,
    outputPer1M: 0.79,
    contextWindow: 128000,
  },
  {
    provider: 'groq',
    model: 'llama-3.1-8b-instant',
    displayName: 'Llama 3.1 8B (Groq)',
    inputPer1M: 0.05,
    outputPer1M: 0.08,
    contextWindow: 128000,
  },
  {
    provider: 'groq',
    model: 'mixtral-8x7b-32768',
    displayName: 'Mixtral 8x7B (Groq)',
    inputPer1M: 0.24,
    outputPer1M: 0.24,
    contextWindow: 32768,
  },

  // DeepSeek
  {
    provider: 'deepseek',
    model: 'deepseek-chat',
    displayName: 'DeepSeek V3',
    inputPer1M: 0.27,
    outputPer1M: 1.10,
    contextWindow: 64000,
    notes: 'Cache hits: $0.07/1M input',
  },
  {
    provider: 'deepseek',
    model: 'deepseek-reasoner',
    displayName: 'DeepSeek R1',
    inputPer1M: 0.55,
    outputPer1M: 2.19,
    contextWindow: 64000,
  },

  // Together AI
  {
    provider: 'together',
    model: 'meta-llama/Llama-3.1-70B-Instruct-Turbo',
    displayName: 'Llama 3.1 70B (Together)',
    inputPer1M: 0.88,
    outputPer1M: 0.88,
    contextWindow: 128000,
  },
  {
    provider: 'together',
    model: 'Qwen/Qwen2.5-72B-Instruct-Turbo',
    displayName: 'Qwen 2.5 72B (Together)',
    inputPer1M: 1.20,
    outputPer1M: 1.20,
    contextWindow: 128000,
  },

  // Perplexity
  {
    provider: 'perplexity',
    model: 'llama-3.1-sonar-large-128k-online',
    displayName: 'Sonar Large (Perplexity)',
    inputPer1M: 1.00,
    outputPer1M: 1.00,
    contextWindow: 128000,
    notes: 'Includes web search',
  },

  // xAI
  {
    provider: 'xai',
    model: 'grok-2',
    displayName: 'Grok 2',
    inputPer1M: 2.00,
    outputPer1M: 10.00,
    contextWindow: 128000,
  },
];

// Helper to get last updated date
export const LAST_UPDATED = '2026-02-09';
