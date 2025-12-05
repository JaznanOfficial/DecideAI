"use client";

import type { UIMessage } from "ai";
import { Bot, User } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import type { ModelResponse } from "@/types/chat";

// Helper type to extend UIMessage with our custom properties
type ExtendedMessage = UIMessage & {
  modelResponses?: Record<string, ModelResponse>;
  metadata?: any; // Relaxed to 'any' to match UIMessage's metadata type
};

interface ChatMessagesProps {
  messages: ExtendedMessage[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  if (messages.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8 text-center">
        <Bot className="mb-4 h-16 w-16 text-muted-foreground" />
        <h2 className="mb-2 font-semibold text-2xl">Welcome to DecideAI</h2>
        <p className="max-w-md text-muted-foreground">
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
          {message.role === "user" ? (
            <div className="flex justify-center">
              <Card className="mx-4 w-full max-w-2xl border-none bg-primary/5 p-4 shadow-sm">
                <div className="flex gap-4">
                  <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                    <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground">
                      <User className="h-6 w-6" />
                    </div>
                  </Avatar>
                  <div className="flex-1">
                    <p className="mb-1 font-semibold text-primary">You</p>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">
                      {(message as any).content}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            <div className="mx-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* OpenAI Column */}
              <Card className="border-muted p-4 shadow-sm">
                <div className="mb-3 flex items-center gap-2 border-b pb-2">
                  <Avatar className="h-8 w-8 border bg-green-100">
                    <div className="flex h-full w-full items-center justify-center font-bold text-green-700 text-xs">
                      OA
                    </div>
                  </Avatar>
                  <span className="font-semibold text-sm">OpenAI (GPT-4o)</span>
                </div>
                <div className="whitespace-pre-wrap text-muted-foreground text-sm leading-relaxed">
                  {/* Render parts if available (AI SDK 5.0), otherwise content */}
                  {message.parts
                    ? message.parts.map((part, index) => {
                        if (part.type === "text") {
                          return (
                            <span key={`${message.id}-part-${index}`}>
                              {part.text}
                            </span>
                          );
                        }
                        return null;
                      })
                    : (message as any).content}
                </div>
              </Card>

              {/* Anthropic Column */}
              <Card className="border-muted bg-muted/20 p-4 shadow-sm">
                <div className="mb-3 flex items-center gap-2 border-b pb-2">
                  <Avatar className="h-8 w-8 border bg-orange-100">
                    <div className="flex h-full w-full items-center justify-center font-bold text-orange-700 text-xs">
                      AN
                    </div>
                  </Avatar>
                  <span className="font-semibold text-sm">
                    Anthropic (Claude)
                  </span>
                </div>
                <div className="whitespace-pre-wrap text-muted-foreground text-sm leading-relaxed">
                  {/* Placeholder for Anthropic response */}
                  <span className="italic opacity-70">
                    Waiting for Anthropic response... (Multi-model streaming
                    coming soon)
                  </span>
                </div>
              </Card>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
