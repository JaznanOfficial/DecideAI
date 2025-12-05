'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Conversation, Message } from '@/types/chat';

/**
 * Hook to fetch chat history for a user
 * Uses React Query for caching and minimal latency
 */
export function useChatHistory(userId: string) {
  return useQuery({
    queryKey: ['chat-history', userId],
    queryFn: async () => {
      const res = await fetch(`/api/conversations?userId=${userId}`);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to fetch conversations');
      }
      return res.json() as Promise<Conversation[]>;
    },
    staleTime: 30 * 1000, // 30 seconds
    enabled: !!userId, // Only run if userId exists
    retry: false, // Don't retry on error
  });
}

/**
 * Hook to fetch messages for a specific conversation
 */
export function useMessages(conversationId: string) {
  return useQuery({
    queryKey: ['messages', conversationId],
    queryFn: async () => {
      const res = await fetch(`/api/messages?conversationId=${conversationId}`);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to fetch messages');
      }
      return res.json() as Promise<Message[]>;
    },
    staleTime: 10 * 1000, // 10 seconds
    enabled: !!conversationId,
    retry: false, // Don't retry on error
  });
}

/**
 * Hook to create a new conversation
 * Uses optimistic updates for instant UI feedback
 */
export function useCreateConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id?: string; userId: string; title: string }) => {
      const res = await fetch('/api/conversations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to create conversation');
      }
      return res.json() as Promise<Conversation>;
    },
    onSuccess: (_, variables) => {
      // Invalidate and refetch chat history
      queryClient.invalidateQueries({
        queryKey: ['chat-history', variables.userId],
      });
    },
    retry: false,
  });
}

/**
 * Hook to delete a conversation
 */
export function useDeleteConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (conversationId: string) => {
      const res = await fetch(`/api/conversations?id=${conversationId}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to delete conversation');
      }
      return res.json();
    },
    onSuccess: () => {
      // Invalidate all chat history queries
      queryClient.invalidateQueries({ queryKey: ['chat-history'] });
    },
    retry: false,
  });
}

/**
 * Hook to send a chat message to multiple models
 */
export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      messages: Array<{ role: string; content: string }>;
      conversationId: string;
      modelKeys?: string[];
    }) => {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || error.details || 'Failed to send message');
      }
      return res.json();
    },
    onSuccess: (_, variables) => {
      // Invalidate messages for this conversation
      queryClient.invalidateQueries({
        queryKey: ['messages', variables.conversationId],
      });
    },
    retry: false,
  });
}
