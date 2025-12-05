import type { ModelKey, ModelResponse, ComparisonMetrics } from '@/types/chat';

/**
 * Analyzes multiple model responses and determines which model performs best
 * in different categories (speed, detail, emotion, realism, structure, recency)
 */
export function analyzeResponses(
  responses: Record<ModelKey, ModelResponse>
): ComparisonMetrics {
  const modelKeys = Object.keys(responses) as ModelKey[];

  // Fastest: lowest response time
  const fastest = modelKeys.reduce((min, key) =>
    responses[key].responseTime < responses[min].responseTime ? key : min
  );

  // Most detailed: longest content
  const mostDetailed = modelKeys.reduce((max, key) =>
    responses[key].content.length > responses[max].content.length ? key : max
  );

  // Most emotional: sentiment analysis (simplified)
  const mostEmotional = modelKeys.reduce((max, key) => {
    const emotionalWords = [
      'feel',
      'understand',
      'empathy',
      'support',
      'encourage',
      'passion',
      'excited',
      'care',
      'believe',
      'inspire',
    ];
    const count = emotionalWords.filter((word) =>
      responses[key].content.toLowerCase().includes(word)
    ).length;
    const maxCount = emotionalWords.filter((word) =>
      responses[max].content.toLowerCase().includes(word)
    ).length;
    return count > maxCount ? key : max;
  });

  // Most realistic: practical action words
  const mostRealistic = modelKeys.reduce((max, key) => {
    const actionWords = [
      'step',
      'action',
      'implement',
      'start',
      'create',
      'build',
      'execute',
      'launch',
      'test',
      'measure',
      'track',
      'analyze',
    ];
    const count = actionWords.filter((word) =>
      responses[key].content.toLowerCase().includes(word)
    ).length;
    const maxCount = actionWords.filter((word) =>
      responses[max].content.toLowerCase().includes(word)
    ).length;
    return count > maxCount ? key : max;
  });

  // Best structured: has lists, headings, numbered items
  const bestStructured = modelKeys.reduce((max, key) => {
    const content = responses[key].content;
    // Count lists (-, *, •), numbered lists, and potential headings
    const listMatches = (content.match(/\n[-*•]\s/g) || []).length;
    const numberedMatches = (content.match(/\n\d+\.\s/g) || []).length;
    const headingMatches = (content.match(/\n#{1,6}\s/g) || []).length;
    const structureScore = listMatches + numberedMatches + headingMatches;

    const maxContent = responses[max].content;
    const maxListMatches = (maxContent.match(/\n[-*•]\s/g) || []).length;
    const maxNumberedMatches = (maxContent.match(/\n\d+\.\s/g) || []).length;
    const maxHeadingMatches = (maxContent.match(/\n#{1,6}\s/g) || []).length;
    const maxScore = maxListMatches + maxNumberedMatches + maxHeadingMatches;

    return structureScore > maxScore ? key : max;
  });

  // Most latest: mentions recent years (2024, 2025, etc.)
  const mostLatest = modelKeys.reduce((max, key) => {
    const content = responses[key].content;
    const yearMatches = content.match(/202[4-9]/g) || [];
    const maxYearMatches = responses[max].content.match(/202[4-9]/g) || [];
    return yearMatches.length > maxYearMatches.length ? key : max;
  });

  return {
    fastest,
    mostDetailed,
    mostEmotional,
    mostRealistic,
    bestStructured,
    mostLatest,
  };
}

/**
 * Calculates a simple sentiment score for text
 * Returns a value between 0 (negative) and 1 (positive)
 */
export function calculateSentiment(text: string): number {
  const positiveWords = [
    'good',
    'great',
    'excellent',
    'amazing',
    'wonderful',
    'fantastic',
    'success',
    'achieve',
    'win',
    'opportunity',
  ];
  const negativeWords = [
    'bad',
    'poor',
    'terrible',
    'awful',
    'fail',
    'problem',
    'issue',
    'difficult',
    'challenge',
    'risk',
  ];

  const lowerText = text.toLowerCase();
  const positiveCount = positiveWords.filter((word) =>
    lowerText.includes(word)
  ).length;
  const negativeCount = negativeWords.filter((word) =>
    lowerText.includes(word)
  ).length;

  const total = positiveCount + negativeCount;
  if (total === 0) return 0.5; // Neutral

  return positiveCount / total;
}
