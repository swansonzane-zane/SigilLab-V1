import { HomePageShell } from "@/components/home-page-shell";
import {
  getDictionary,
  getSupportedLanguages,
  type I18nDictionary,
  resolveLanguage,
} from "@/services/i18n-service";
import { resolvePremiumState } from "@/services/monetization-service";
import { getAppConfig } from "@/services/configs-service";
import type { ReadingLanguage } from "@/types/reading";

type HomePageProps = {
  searchParams: Promise<{
    language?: string | string[];
    premium?: string | string[];
  }>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const config = await getAppConfig();
  const params = await searchParams;
  const language = await resolveLanguage(params.language);
  const isPremium = resolvePremiumState(params.premium, config);
  const supportedLanguages = getSupportedLanguages();
  const dictionaryEntries = await Promise.all(
    supportedLanguages.map(async (supportedLanguage) => [
      supportedLanguage,
      await getDictionary(supportedLanguage),
    ]),
  );

  return (
    <HomePageShell
      dictionaries={
        Object.fromEntries(dictionaryEntries) as Record<
          ReadingLanguage,
          I18nDictionary
        >
      }
      initialLanguage={language}
      isPremium={isPremium}
      dailyFreeLimit={config.dailyFreeLimit}
      sponsorEnabled={config.enableAds}
      supportedLanguages={supportedLanguages}
    />
  );
}
