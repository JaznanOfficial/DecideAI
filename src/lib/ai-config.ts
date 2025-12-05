import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

// AI Gateway API Key - Vercel handles the routing automatically
const gatewayAPIKey = process.env.AI_GATEWAY_API_KEY;

// Check if AI Gateway is configured
export const isAIConfigured = !!gatewayAPIKey;

if (!isAIConfigured) {
  console.warn('⚠️  AI Gateway not configured. Set AI_GATEWAY_API_KEY in .env.local');
}

// Configure providers with AI Gateway API key
// Vercel AI Gateway handles the routing automatically
const openai = createOpenAI({
  apiKey: gatewayAPIKey,
});

const anthropic = createAnthropic({
  apiKey: gatewayAPIKey,
});

const google = createGoogleGenerativeAI({
  apiKey: gatewayAPIKey,
});

// Configure models
export const models = {
  gpt4: openai('gpt-4-turbo'),
  claude: anthropic('claude-3-5-sonnet-20241022'),
  gemini: google('gemini-2.0-flash-exp'),
};

export type ModelKey = keyof typeof models;

export const modelNames: Record<ModelKey, string> = {
  gpt4: 'GPT-4 Turbo',
  claude: 'Claude 3.5 Sonnet',
  gemini: 'Gemini 2.0 Flash',
};

export const modelDescriptions: Record<ModelKey, string> = {
  gpt4: 'OpenAI\'s most capable model, great for complex reasoning',
  claude: 'Anthropic\'s model, excellent for analysis and writing',
  gemini: 'Google\'s fast model, good for quick responses',
};
