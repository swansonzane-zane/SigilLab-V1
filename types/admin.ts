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
  enableAds: boolean;
  enablePremium: boolean;
  premiumMonthlyPrice: number;
  premiumYearlyPrice: number;
  maxJournalPrompts: number;
};

export type MetricsSnapshot = {
  totalReadings: number;
  dailyReadings: number;
  successRate: number;
  fallbackRate: number;
  errorRate: number;
  averageLatencyMs: number;
  averageProviderResponseMs: number;
  topIntents: Array<{
    label: string;
    count: number;
    percentage: number;
  }>;
  languageDistribution: Array<{
    label: string;
    count: number;
    percentage: number;
  }>;
  ageBandDistribution: Array<{
    label: string;
    count: number;
    percentage: number;
  }>;
  zodiacDistribution: Array<{
    label: string;
    count: number;
    percentage: number;
  }>;
  shareCount: number;
  premiumVisits: number;
  upgradeCtaClicks: number;
  adsEnabled: boolean;
};
