import { db, isDatabaseConfigured } from '@/db';
import { messages } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export const runtime = 'edge';

// GET /api/messages?conversationId=xxx
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const conversationId = searchParams.get('conversationId');

    if (!conversationId) {
      return Response.json(
        { error: 'Conversation ID required' },
        { status: 400 }
      );
    }

    // Return empty array if database is not configured
    if (!isDatabaseConfigured || !db) {
      console.warn('⚠️  Database not configured, returning empty messages');
      return Response.json([]);
    }

    const chatMessages = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(asc(messages.createdAt));

    return Response.json(chatMessages);
  } catch (error) {
    console.error('Get messages error:', error);
    return Response.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

// POST /api/messages
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { conversationId, role, content, modelResponses, metadata } = body;

    if (!conversationId || !role || !content) {
      return Response.json(
        { error: 'conversationId, role, and content are required' },
        { status: 400 }
      );
    }

    // Return mock data if database is not configured
    if (!isDatabaseConfigured || !db) {
      console.warn('⚠️  Database not configured, returning mock message');
      const mockMessage = {
        id: nanoid(),
        conversationId,
        role,
        content,
        modelResponses: modelResponses || null,
        metadata: metadata || null,
        createdAt: new Date(),
      };
      return Response.json(mockMessage);
    }

    const [message] = await db
      .insert(messages)
      .values({
        id: nanoid(),
        conversationId,
        role,
        content,
        modelResponses: modelResponses || null,
        metadata: metadata || null,
      })
      .returning();

    return Response.json(message);
  } catch (error) {
    console.error('Create message error:', error);
    return Response.json(
      { error: 'Failed to create message' },
      { status: 500 }
    );
  }
}
