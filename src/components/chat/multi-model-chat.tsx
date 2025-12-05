"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";

export function MultiModelChat() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
    onError: (err) => {
      console.error("Chat error:", err);
      toast.error("Failed to get response", {
        description:
          err.message || "AI Gateway not configured. Check .env.local",
        duration: 5000,
      });
    },
  });

  const [input, setInput] = useState("");
  const isLoading = status === "submitted" || status === "streaming";

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput(""); // Clear input immediately

    await sendMessage({
      text: userMessage,
    });
  };

  // Show loading state while initializing
  if (!messages && isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background">
      <div className="flex-1 overflow-hidden">
        <ChatMessages messages={messages as any} />
      </div>
      <div className="z-10 border-t bg-background/80 p-4 backdrop-blur-sm">
        <ChatInput
          isLoading={isLoading}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          value={input}
        />
      </div>
    </div>
  );
}
