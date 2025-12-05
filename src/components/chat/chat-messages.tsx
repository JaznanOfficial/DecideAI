"use client";

import type { UIMessage } from "ai";
import { Bot } from "lucide-react";
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

import { ScrollArea } from "@/components/ui/scroll-area";

// Helper component to render message content from parts or string
function MessageContent({ message }: { message: ExtendedMessage }) {
  if (message.parts) {
    return (
      <>
        {message.parts.map((part, index) => {
          if (part.type === "text") {
            return <span key={`${message.id}-part-${index}`}>{part.text}</span>;
          }
          return null;
        })}
      </>
    );
  }
  return <>{(message as any).content}</>;
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

  const renderMessageList = (modelName: string, isAnthropic = false) => (
    <div className="flex h-full flex-col">
      <div className="sticky top-0 z-10 flex items-center gap-2 border-b bg-background/95 p-4 backdrop-blur supports-backdrop-filter:bg-background/60">
        <Avatar
          className={`h-6 w-6 border ${isAnthropic ? "bg-orange-100" : "bg-green-100"}`}
        >
          <div
            className={`flex h-full w-full items-center justify-center font-bold text-xs ${isAnthropic ? "text-orange-700" : "text-green-700"}`}
          >
            {isAnthropic ? "AN" : "OA"}
          </div>
        </Avatar>
        <span className="font-semibold text-sm">{modelName}</span>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6 pb-4">
          {messages.map((message) => (
            <div key={`${modelName}-${message.id}`}>
              {message.role === "user" ? (
                <div className="flex justify-end">
                  <Card className="max-w-[90%] bg-primary p-3 text-primary-foreground">
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      <MessageContent message={message} />
                    </div>
                  </Card>
                </div>
              ) : (
                <div className="flex justify-start">
                  <div className="max-w-[90%] space-y-2">
                    {isAnthropic ? (
                      <Card className="border-muted bg-muted/20 p-3">
                        <p className="text-muted-foreground text-sm italic">
                          Waiting for Anthropic response...
                        </p>
                      </Card>
                    ) : (
                      <Card className="border-muted p-3">
                        <div className="whitespace-pre-wrap text-muted-foreground text-sm leading-relaxed">
                          <MessageContent message={message} />
                        </div>
                      </Card>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );

  return (
    <div className="grid h-full grid-cols-1 divide-x md:grid-cols-2">
      {/* OpenAI Column */}
      {renderMessageList("OpenAI (GPT-4o)")}

      {/* Anthropic Column */}
      {renderMessageList("Anthropic (Claude)", true)}
    </div>
  );
}
