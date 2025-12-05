import { db, isDatabaseConfigured } from '@/db';
import { conversations } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export const runtime = 'edge';

// Mock data for when database is not configured
const mockConversations = [
  {
    id: 'mock-1',
    userId: 'demo-user',
    title: 'Example: Marketing Strategy',
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 86400000),
  },
  {
    id: 'mock-2',
    userId: 'demo-user',
    title: 'Example: Product Launch',
    createdAt: new Date(Date.now() - 172800000),
    updatedAt: new Date(Date.now() - 172800000),
  },
];

// GET /api/conversations?userId=xxx
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return Response.json({ error: 'User ID required' }, { status: 400 });
    }

    // Return mock data if database is not configured
    if (!isDatabaseConfigured || !db) {
      console.warn('⚠️  Database not configured, returning mock data');
      return Response.json(mockConversations);
    }

    const convos = await db
      .select()
      .from(conversations)
      .where(eq(conversations.userId, userId))
      .orderBy(desc(conversations.updatedAt))
      .limit(50);

    return Response.json(convos);
  } catch (error) {
    console.error('Get conversations error:', error);
    return Response.json(
      { error: 'Failed to fetch conversations' },
      { status: 500 }
    );
  }
}

// POST /api/conversations
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, userId, title } = body;

    if (!userId) {
      return Response.json({ error: 'User ID required' }, { status: 400 });
    }

    const conversationId = id || nanoid(); // Use provided ID or generate new one

    // Return mock data if database is not configured
    if (!isDatabaseConfigured || !db) {
      console.warn('⚠️  Database not configured, returning mock conversation');
      const mockConvo = {
        id: conversationId,
        userId,
        title: title || 'New Chat',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return Response.json(mockConvo);
    }

    const [conversation] = await db
      .insert(conversations)
      .values({
        id: conversationId,
        userId,
        title: title || 'New Chat',
      })
      .returning();

    return Response.json(conversation);
  } catch (error) {
    console.error('Create conversation error:', error);
    return Response.json(
      { error: 'Failed to create conversation' },
      { status: 500 }
    );
  }
}

// DELETE /api/conversations/:id
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return Response.json(
        { error: 'Conversation ID required' },
        { status: 400 }
      );
    }

    // Return success if database is not configured
    if (!isDatabaseConfigured || !db) {
      console.warn('⚠️  Database not configured, mock delete');
      return Response.json({ success: true });
    }

    await db.delete(conversations).where(eq(conversations.id, id));

    return Response.json({ success: true });
  } catch (error) {
    console.error('Delete conversation error:', error);
    return Response.json(
      { error: 'Failed to delete conversation' },
      { status: 500 }
    );
  }
}
