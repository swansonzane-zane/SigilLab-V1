import type { AppConfig } from "@/types/admin";

const appConfig: AppConfig = {
  defaultLanguage: "en",
  enableShare: true,
  enableFallback: true,
  enablePremiumPlaceholder: true,
  maxJournalPrompts: 3,
};

export function getAppConfig(): AppConfig {
  return appConfig;
}
