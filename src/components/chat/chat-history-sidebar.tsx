'use client';

import { useChatHistory, useCreateConversation } from '@/hooks/use-chat-history';
import { MessageSquare, Plus, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import { nanoid } from 'nanoid';
import { toast } from 'sonner';
import { useEffect, useRef } from 'react';

interface ChatHistorySidebarProps {
  userId: string;
}

export function ChatHistorySidebar({ userId }: ChatHistorySidebarProps) {
  const { data: conversations, isLoading, error } = useChatHistory(userId);
  const createConversation = useCreateConversation();
  const router = useRouter();
  const errorShownRef = useRef(false);

  // Show error toast only once
  useEffect(() => {
    if (error && !errorShownRef.current) {
      errorShownRef.current = true;
      toast.error('Failed to load chat history', {
        description: 'Using mock data for demonstration',
      });
    }
  }, [error]);

  const handleNewChat = async () => {
    try {
      const newId = nanoid();
      await createConversation.mutateAsync({
        userId,
        title: 'New Chat',
      });
      toast.success('New chat created', {
        description: 'Start asking your business questions',
      });
      router.push(`/chat/${newId}`);
    } catch (error) {
      toast.error('Failed to create chat', {
        description: error instanceof Error ? error.message : 'Please try again',
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
          ) : error ? (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Could not load chat history
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Check console for details
              </p>
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
