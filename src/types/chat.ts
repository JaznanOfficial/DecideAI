export type ModelKey = 'gpt4' | 'claude' | 'gemini';

export interface ModelResponse {
  modelKey: ModelKey;
  content: string;
  responseTime: number;
  tokensUsed?: number;
  finishReason?: string;
}

export interface ComparisonMetrics {
  fastest: ModelKey;
  mostDetailed: ModelKey;
  mostEmotional: ModelKey;
  mostRealistic: ModelKey;
  bestStructured: ModelKey;
  mostLatest: ModelKey;
}

export interface Message {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant';
  content: string;
  modelResponses?: Record<ModelKey, ModelResponse>;
  metadata?: ComparisonMetrics;
  createdAt: Date;
}

export interface Conversation {
  id: string;
  userId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}
