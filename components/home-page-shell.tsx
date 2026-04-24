"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { HomeSignalForm } from "@/components/home-signal-form";
import type { I18nDictionary } from "@/services/i18n-service";
import type { ReadingLanguage } from "@/types/reading";

type HomePageShellProps = {
  initialLanguage: ReadingLanguage;
  dictionaries: Record<ReadingLanguage, I18nDictionary>;
  supportedLanguages: ReadingLanguage[];
};

export function HomePageShell({
  initialLanguage,
  dictionaries,
  supportedLanguages,
}: HomePageShellProps) {
  const router = useRouter();
  const [language, setLanguage] = useState<ReadingLanguage>(initialLanguage);
  const dictionary = dictionaries[language] || dictionaries.en;

  function handleLanguageChange(nextLanguage: ReadingLanguage) {
    setLanguage(nextLanguage);
    router.replace(`/?${new URLSearchParams({ language: nextLanguage })}`, {
      scroll: false,
    });
  }

  return (
    <main className="relative flex min-h-screen flex-1 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(245,215,138,0.12),_transparent_24%),radial-gradient(circle_at_80%_24%,_rgba(125,211,252,0.12),_transparent_18%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.18),_transparent_30%)]"
      />
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
        <section className="flex flex-1 flex-col justify-center gap-10 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm tracking-[0.3em] text-amber-100/88 uppercase shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-amber-200 shadow-[0_0_14px_rgba(252,211,77,0.9)]" />
              SigilLab
            </div>
            <div className="space-y-5">
              <p className="text-sm font-medium tracking-[0.32em] text-sky-100/70 uppercase">
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
            language={language}
            onLanguageChange={handleLanguageChange}
            supportedLanguages={supportedLanguages}
          />
        </section>
      </div>
    </main>
  );
}
