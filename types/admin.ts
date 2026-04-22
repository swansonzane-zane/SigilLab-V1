export type ReadingRecord = {
  id: string;
  createdAt: string;
  birthYear: number;
  ageBand: string;
  westernZodiac: string;
  intent: string;
  language: string;
  provider: string;
  model: string;
  status: "success" | "fallback" | "error";
  fallback: boolean;
  errorReason: string | null;
  fallbackReason: string | null;
  providerResponseMs: number | null;
  totalLatencyMs: number;
  title: string;
  insight: string;
  emotionalState: string;
  emotionalIntensity: number;
};

export type PromptVersion = {
  versionId: string;
  name: string;
  status: "active" | "inactive";
  systemPrompt: string;
  userPromptTemplate: string;
  createdAt: string;
};

export type AIProviderConfig = {
  id: string;
  name: string;
  type: "text" | "image" | "translation";
  baseUrl: string;
  model: string;
  enabled: boolean;
  apiKeyMasked: string;
};

export type AppConfig = {
  defaultLanguage: "en" | "es";
  enableShare: boolean;
  enableFallback: boolean;
  enablePremiumPlaceholder: boolean;
  maxJournalPrompts: number;
};

export type MetricsSnapshot = {
  dailyReadings: number;
  successRate: number;
  fallbackRate: number;
  averageLatencyMs: number;
  topIntents: Array<{
    intent: string;
    count: number;
  }>;
  languageDistribution: Array<{
    language: string;
    count: number;
  }>;
};
