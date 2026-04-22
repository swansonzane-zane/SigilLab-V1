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
  fallback: boolean;
  title: string;
  insight: string;
  emotionalState: string;
  emotionalIntensity: number;
  latencyMs: number;
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
