'use client';

import { useState } from 'react';
import { useMessages, useSendMessage } from '@/hooks/use-chat-history';
import { ChatMessages } from '@/components/chat/chat-messages';
import { ChatInput } from '@/components/chat/chat-input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface MultiModelChatProps {
  conversationId: string;
}

export function MultiModelChat({ conversationId }: MultiModelChatProps) {
  const { data: messages = [], isLoading: messagesLoading, error: messagesError } = useMessages(conversationId);
  const sendMessage = useSendMessage();
  const [selectedModels] = useState(['gpt4', 'claude', 'gemini']);

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

  // For new conversations with no messages, show welcome instead of error
  if (messagesError || (messages && messages.length === 0)) {
    return (
      <div className="flex flex-col h-screen">
        <ScrollArea className="flex-1">
          <ChatMessages messages={[]} />
        </ScrollArea>
        <ChatInput
          onSubmit={handleSendMessage}
          isLoading={sendMessage.isPending}
        />
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
