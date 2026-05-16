"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { AnalyticsEvent } from "@/components/analytics-event";
import { PremiumBadge } from "@/components/premium-badge";
import { HomeSignalForm } from "@/components/home-signal-form";
import type { I18nDictionary } from "@/services/i18n-service";
import type { ReadingLanguage } from "@/types/reading";

type HomePageShellProps = {
  dailyFreeLimit: number;
  initialLanguage: ReadingLanguage;
  dictionaries: Record<ReadingLanguage, I18nDictionary>;
  isPremium: boolean;
  sponsorEnabled: boolean;
  supportedLanguages: ReadingLanguage[];
};

export function HomePageShell({
  dailyFreeLimit,
  initialLanguage,
  dictionaries,
  isPremium,
  sponsorEnabled,
  supportedLanguages,
}: HomePageShellProps) {
  const router = useRouter();
  const [language, setLanguage] = useState<ReadingLanguage>(initialLanguage);
  const dictionary = dictionaries[language] || dictionaries.en;

  function handleLanguageChange(nextLanguage: ReadingLanguage) {
    setLanguage(nextLanguage);
    const params = new URLSearchParams({ language: nextLanguage });

    if (isPremium) {
      params.set("premium", "1");
    }

    router.replace(`/?${params.toString()}`, {
      scroll: false,
    });
  }

  return (
    <main className="relative flex min-h-screen flex-1 overflow-hidden">
      <AnalyticsEvent
        eventName="landing_view"
        includeLandingProperties
        properties={{ language: initialLanguage }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(176,141,87,0.16),_transparent_24%),radial-gradient(circle_at_80%_24%,_rgba(122,31,23,0.16),_transparent_20%),linear-gradient(180deg,#15100c,#050403)]"
      />
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
        <section className="flex flex-1 flex-col justify-center gap-10 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-3 border border-[#b08d57]/24 bg-[#23150f]/72 px-4 py-2 text-sm tracking-[0.12em] text-[#d8bd82] shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#7a1b14]" />
              SigilLab
            </div>
            {isPremium ? <PremiumBadge dictionary={dictionary} /> : null}
            <div className="space-y-5">
              <p className="text-sm font-medium tracking-[0.14em] text-[#bba16e]/74">
                {dictionary.home.eyebrow}
              </p>
              <h1 className="max-w-xl font-heading text-5xl leading-[0.95] font-semibold text-stone-50 sm:text-6xl lg:text-7xl">
                {dictionary.home.title}
              </h1>
              <p className="max-w-xl text-base leading-7 text-stone-300/82 sm:text-lg">
                {dictionary.home.subtitle}
              </p>
            </div>
            <div className="grid max-w-xl grid-cols-1 gap-3 text-sm text-stone-300/75 sm:grid-cols-3">
              {dictionary.home.featureCards.map((feature) => (
                <div
                  key={feature}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-sm"
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>
          <HomeSignalForm
            dictionary={dictionary}
            dailyFreeLimit={dailyFreeLimit}
            isPremium={isPremium}
            language={language}
            onLanguageChange={handleLanguageChange}
            sponsorEnabled={sponsorEnabled}
            supportedLanguages={supportedLanguages}
          />
        </section>
      </div>
    </main>
  );
}
