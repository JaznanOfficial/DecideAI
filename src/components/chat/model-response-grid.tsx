'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { modelNames, modelDescriptions, type ModelKey } from '@/lib/ai-config';
import type { ModelResponse } from '@/types/chat';
import { Clock, Zap } from 'lucide-react';

interface ModelResponseGridProps {
  responses: Record<ModelKey, ModelResponse>;
  isLoading?: boolean;
}

export function ModelResponseGrid({ responses, isLoading }: ModelResponseGridProps) {
  const modelKeys = Object.keys(responses) as ModelKey[];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {['gpt4', 'claude', 'gemini'].map((key) => (
          <Card key={key} className="p-6">
            <div className="space-y-3">
              <div className="h-6 w-32 bg-muted animate-pulse rounded" />
              <div className="space-y-2">
                <div className="h-4 bg-muted animate-pulse rounded" />
                <div className="h-4 bg-muted animate-pulse rounded" />
                <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (modelKeys.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {modelKeys.map((key) => {
        const response = responses[key];
        return (
          <Card key={key} className="p-6 hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{modelNames[key]}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {modelDescriptions[key]}
                  </p>
                </div>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {response.responseTime}ms
                </Badge>
              </div>

              {/* Content */}
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {response.content}
                </p>
              </div>

              {/* Footer */}
              {response.tokensUsed && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
                  <Zap className="h-3 w-3" />
                  {response.tokensUsed} tokens
                </div>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
