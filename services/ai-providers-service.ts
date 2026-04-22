import type { AIProviderConfig } from "@/types/admin";

const aiProviderConfigs: AIProviderConfig[] = [
  {
    id: "provider_deepseek_text",
    name: "DeepSeek Primary",
    type: "text",
    baseUrl: "https://api.deepseek.com",
    model: "deepseek-chat",
    enabled: true,
    apiKeyMasked: "sk-...9K2F",
  },
  {
    id: "provider_mock_text",
    name: "Mock Reading Engine",
    type: "text",
    baseUrl: "local://mock-engine",
    model: "mock-reading-engine",
    enabled: true,
    apiKeyMasked: "not-required",
  },
  {
    id: "provider_future_translate",
    name: "Signal Translation Queue",
    type: "translation",
    baseUrl: "https://translation.internal.placeholder",
    model: "sigillab-translate-v1",
    enabled: false,
    apiKeyMasked: "tr-...A19X",
  },
];

export function listAIProviderConfigs(): AIProviderConfig[] {
  return aiProviderConfigs;
}

export function getAIProviderConfigById(
  id: string,
): AIProviderConfig | undefined {
  return aiProviderConfigs.find((provider) => provider.id === id);
}

export function getEnabledAIProviders(): AIProviderConfig[] {
  return aiProviderConfigs.filter((provider) => provider.enabled);
}
