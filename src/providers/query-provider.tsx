'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute - data stays fresh
            gcTime: 5 * 60 * 1000, // 5 minutes - cache time
            refetchOnWindowFocus: false, // Don't refetch on window focus
            retry: false, // Don't retry failed requests
          },
          mutations: {
            retry: false, // Don't retry failed mutations
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
