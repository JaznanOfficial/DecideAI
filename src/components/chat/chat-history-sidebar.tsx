'use client';

import { useChatHistory, useCreateConversation } from '@/hooks/use-chat-history';
import { MessageSquare, Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import { nanoid } from 'nanoid';
import { toast } from 'sonner';

interface ChatHistorySidebarProps {
  userId: string;
}

export function ChatHistorySidebar({ userId }: ChatHistorySidebarProps) {
  const { data: conversations, isLoading } = useChatHistory(userId);
  const createConversation = useCreateConversation();
  const router = useRouter();

  // Don't show error toast for empty history - that's expected!
  // Only show toast if there's an actual API error

  const handleNewChat = async () => {
    const newId = nanoid();
    
    try {
      await createConversation.mutateAsync({
        id: newId, // Pass the ID to the API
        userId,
        title: 'New Chat',
      });
      
      // Navigate to the new chat
      router.push(`/chat/${newId}`);
      
      toast.success('New chat created', {
        description: 'Start asking your business questions',
      });
    } catch (error) {
      console.error('Create chat error:', error);
      
      // Even if database fails, still navigate (mock mode)
      router.push(`/chat/${newId}`);
      
      toast.info('Chat created (demo mode)', {
        description: 'Database not configured - messages won\'t be saved',
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <Button
          onClick={handleNewChat}
          className="w-full"
          disabled={createConversation.isPending}
        >
          {createConversation.isPending ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Plus className="h-4 w-4 mr-2" />
          )}
          New Chat
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-2 p-2">
          <h3 className="px-2 text-sm font-medium text-muted-foreground mb-2">
            Recent Chats
          </h3>

          {isLoading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={`skeleton-${i}`} className="h-16 w-full" />
              ))}
            </div>
          ) : conversations && conversations.length > 0 ? (
            conversations.map((conv) => (
              <Link
                key={conv.id}
                href={`/chat/${conv.id}`}
                className="flex items-start gap-3 rounded-lg p-3 hover:bg-accent transition-colors"
              >
                <MessageSquare className="h-5 w-5 mt-0.5 text-muted-foreground" />
                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-sm font-medium">{conv.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(conv.updatedAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center p-4 text-sm text-muted-foreground">
              No chats yet. Start a new conversation!
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
