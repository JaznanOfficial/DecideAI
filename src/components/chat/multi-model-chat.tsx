'use client';

import { useState, useEffect, useRef } from 'react';
import { useMessages, useSendMessage } from '@/hooks/use-chat-history';
import { ChatMessages } from '@/components/chat/chat-messages';
import { ChatInput } from '@/components/chat/chat-input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface MultiModelChatProps {
  conversationId: string;
}

export function MultiModelChat({ conversationId }: MultiModelChatProps) {
  const { data: messages = [], isLoading: messagesLoading, error: messagesError, refetch } = useMessages(conversationId);
  const sendMessage = useSendMessage();
  const [selectedModels] = useState(['gpt4', 'claude', 'gemini']);
  const errorShownRef = useRef(false);

  // Show error toast only once
  useEffect(() => {
    if (messagesError && !errorShownRef.current) {
      errorShownRef.current = true;
      toast.error('Failed to load messages', {
        description: 'There was an error loading your chat history',
      });
    }
  }, [messagesError]);

  const handleSendMessage = async (content: string) => {
    // Build messages array for API
    const chatMessages = [
      ...messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
      {
        role: 'user',
        content,
      },
    ];

    try {
      await sendMessage.mutateAsync({
        messages: chatMessages,
        conversationId,
        modelKeys: selectedModels,
      });
      // Success - no toast needed, user can see the responses
    } catch (error) {
      console.error('Send message error:', error);
      toast.error('Failed to get response', {
        description: error instanceof Error ? error.message : 'AI Gateway not configured. Check .env.local',
        duration: 5000,
      });
    }
  };

  if (messagesLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (messagesError) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-xl font-semibold mb-2">Failed to Load Messages</h2>
        <p className="text-muted-foreground mb-4">
          There was an error loading your chat history
        </p>
        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <ScrollArea className="flex-1">
        <ChatMessages messages={messages} />
      </ScrollArea>
      <ChatInput
        onSubmit={handleSendMessage}
        isLoading={sendMessage.isPending}
      />
    </div>
  );
}
