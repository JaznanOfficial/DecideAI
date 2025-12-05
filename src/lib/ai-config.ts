import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { google } from '@ai-sdk/google';

// AI Gateway base URL - update with your gateway details
// Format: https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}
const gatewayBaseURL = process.env.AI_GATEWAY_BASE_URL;
const gatewayAPIKey = process.env.AI_GATEWAY_API_KEY;

// Check if AI Gateway is configured
export const isAIConfigured = !!(gatewayAPIKey && gatewayBaseURL);

if (!isAIConfigured) {
  console.warn('⚠️  AI Gateway not configured. Set AI_GATEWAY_API_KEY and AI_GATEWAY_BASE_URL in .env.local');
}

// Configure models with AI Gateway
// When using AI Gateway, you only need one API key (AI_GATEWAY_API_KEY)
export const models = {
  gpt4: openai('gpt-4-turbo', {
    baseURL: gatewayBaseURL,
  }),
  claude: anthropic('claude-3-5-sonnet-20241022', {
    baseURL: gatewayBaseURL,
  }),
  gemini: google('gemini-2.0-flash-exp', {
    baseURL: gatewayBaseURL,
  }),
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
