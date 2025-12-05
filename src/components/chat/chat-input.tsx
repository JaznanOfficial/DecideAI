"use client";

import { Loader2, Send } from "lucide-react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export function ChatInput({
  value,
  onChange,
  onSubmit,
  isLoading = false,
  placeholder = "Ask anything about your business...",
}: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  return (
    <form className="mx-auto max-w-4xl" onSubmit={onSubmit}>
      <div className="flex items-end gap-2">
        <Textarea
          className="max-h-[200px] min-h-[60px] resize-none bg-background shadow-sm"
          disabled={isLoading}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={3}
          value={value}
        />
        <Button
          className="h-[60px] w-[60px] shrink-0 shadow-sm"
          disabled={!value?.trim() || isLoading}
          size="icon"
          type="submit"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </Button>
      </div>
      <p className="mt-2 text-center text-muted-foreground text-xs">
        Press Enter to send, Shift+Enter for new line
      </p>
    </form>
  );
}
