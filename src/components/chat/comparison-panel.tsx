'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { modelNames, type ModelKey } from '@/lib/ai-config';
import type { ComparisonMetrics } from '@/types/chat';
import {
  Zap,
  FileText,
  Heart,
  Target,
  List,
  Calendar,
} from 'lucide-react';

interface ComparisonPanelProps {
  comparison: ComparisonMetrics;
}

const metricConfig = {
  fastest: {
    label: 'Fastest Response',
    icon: Zap,
    description: 'Quickest to respond',
    color: 'text-yellow-600 dark:text-yellow-400',
  },
  mostDetailed: {
    label: 'Most Detailed',
    icon: FileText,
    description: 'Most comprehensive answer',
    color: 'text-blue-600 dark:text-blue-400',
  },
  mostEmotional: {
    label: 'Most Empathetic',
    icon: Heart,
    description: 'Most emotionally supportive',
    color: 'text-pink-600 dark:text-pink-400',
  },
  mostRealistic: {
    label: 'Most Practical',
    icon: Target,
    description: 'Most actionable advice',
    color: 'text-green-600 dark:text-green-400',
  },
  bestStructured: {
    label: 'Best Structured',
    icon: List,
    description: 'Clearest organization',
    color: 'text-purple-600 dark:text-purple-400',
  },
  mostLatest: {
    label: 'Most Current',
    icon: Calendar,
    description: 'Most up-to-date information',
    color: 'text-orange-600 dark:text-orange-400',
  },
};

export function ComparisonPanel({ comparison }: ComparisonPanelProps) {
  return (
    <Card className="m-4 p-6">
      <h3 className="font-semibold text-lg mb-4">Comparison Analysis</h3>
      <p className="text-sm text-muted-foreground mb-6">
        See which model excels in different aspects of the response
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(Object.keys(metricConfig) as Array<keyof ComparisonMetrics>).map((metric) => {
          const config = metricConfig[metric];
          const Icon = config.icon;
          const modelKey = comparison[metric];

          return (
            <div
              key={metric}
              className="flex items-start gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className={`mt-0.5 ${config.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{config.label}</p>
                <p className="text-xs text-muted-foreground mb-2">
                  {config.description}
                </p>
                <Badge variant="outline" className="font-mono">
                  {modelNames[modelKey]}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
