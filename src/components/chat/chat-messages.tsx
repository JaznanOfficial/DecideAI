'use client';

import { Avatar } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { User, Bot } from 'lucide-react';
import type { Message } from '@/types/chat';
import { ModelResponseGrid } from './model-response-grid';
import { ComparisonPanel } from './comparison-panel';

interface ChatMessagesProps {
  messages: Message[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <Bot className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Welcome to DecideAI</h2>
        <p className="text-muted-foreground max-w-md">
          Ask any business question and get insights from multiple AI models
          side-by-side. Compare responses to make better decisions.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-32">
      {messages.map((message) => (
        <div key={message.id}>
          {message.role === 'user' ? (
            <Card className="p-4 max-w-3xl mx-4">
              <div className="flex gap-3">
                <Avatar className="h-8 w-8 bg-primary">
                  <User className="h-5 w-5 text-primary-foreground" />
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium mb-1">You</p>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {message.modelResponses && (
                <>
                  <ModelResponseGrid responses={message.modelResponses} />
                  {message.metadata && (
                    <ComparisonPanel comparison={message.metadata} />
                  )}
                </>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
