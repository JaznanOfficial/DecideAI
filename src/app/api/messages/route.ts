import { db, isDatabaseConfigured } from '@/db';
import { messages } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';

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
