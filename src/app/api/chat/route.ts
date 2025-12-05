import { streamText } from 'ai';
import { models, type ModelKey, isAIConfigured } from '@/lib/ai-config';
import { db, isDatabaseConfigured } from '@/db';
import { messages, conversations } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { analyzeResponses } from '@/lib/comparison-utils';
import type { ModelResponse } from '@/types/chat';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages: chatMessages, conversationId, modelKeys } = body;

    if (!chatMessages || !Array.isArray(chatMessages)) {
      return Response.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    if (!conversationId) {
      return Response.json(
        { error: 'Conversation ID is required' },
        { status: 400 }
      );
    }

    // Check if AI Gateway is configured
    if (!isAIConfigured) {
      return Response.json(
        { 
          error: 'AI Gateway not configured',
          details: 'Please add AI_GATEWAY_API_KEY to your .env.local file. Get it from https://vercel.com/ai-gateway'
        },
        { status: 503 }
      );
    }

    const selectedModels = (modelKeys || ['gpt4', 'claude', 'gemini']) as ModelKey[];

    // Get all model responses in parallel
    const modelPromises = selectedModels.map(async (key) => {
      const startTime = Date.now();

      try {
        const result = await streamText({
          model: models[key],
          messages: chatMessages,
          temperature: 0.7,
        });

        // Collect the full response
        let fullText = '';
        for await (const textPart of result.textStream) {
          fullText += textPart;
        }

        const responseTime = Date.now() - startTime;
        const usage = await result.usage;

        return {
          modelKey: key,
          content: fullText,
          responseTime,
          tokensUsed: usage?.totalTokens,
          finishReason: await result.finishReason,
        } as ModelResponse;
      } catch (error) {
        console.error(`Error with model ${key}:`, error);
        return {
          modelKey: key,
          content: `Error: Failed to get response from ${key}. ${error instanceof Error ? error.message : 'Unknown error'}`,
          responseTime: Date.now() - startTime,
        } as ModelResponse;
      }
    });

    const responses = await Promise.all(modelPromises);

    // Create response object
    const modelResponses = responses.reduce(
      (acc, response) => {
        acc[response.modelKey] = response;
        return acc;
      },
      {} as Record<ModelKey, ModelResponse>
    );

    // Analyze responses for comparison
    const comparisonMetrics = analyzeResponses(modelResponses);

    // Save to database only if configured
    if (isDatabaseConfigured && db) {
      try {
        const userMessage = chatMessages[chatMessages.length - 1];
        
        // Save user message if it's new
        if (userMessage.role === 'user') {
          await db.insert(messages).values({
            conversationId,
            role: 'user',
            content: userMessage.content,
          });
        }

        // Save assistant response with all model outputs
        await db.insert(messages).values({
          conversationId,
          role: 'assistant',
          content: responses[0]?.content || '', // Use first model's response as primary
          modelResponses,
          metadata: comparisonMetrics,
        });

        // Update conversation's updatedAt timestamp
        await db
          .update(conversations)
          .set({ updatedAt: new Date() })
          .where(eq(conversations.id, conversationId));
      } catch (dbError) {
        console.error('Database save error (non-fatal):', dbError);
        // Continue even if database save fails
      }
    } else {
      console.warn('⚠️  Database not configured, skipping message persistence');
    }

    return Response.json({
      responses: modelResponses,
      comparison: comparisonMetrics,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json(
      { 
        error: 'Failed to process chat request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
