"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";

import { useTransitionController } from "@/components/transition-provider";
import { EnergyExhaustedPanel } from "@/components/energy-exhausted-panel";
import {
  buildDerivedReadingInput,
  isValidBirthDate,
} from "@/engine/reading-profile";
import {
  canGenerate,
  consumeReading,
  getEnergyState,
  type EnergyState,
} from "@/services/energy-service";
import type { I18nDictionary } from "@/services/i18n-service";
import type { ReadingLanguage } from "@/types/reading";

const intents = [
  "clarity",
  "healing",
  "focus",
  "balance",
  "release",
  "openness",
] as const;

export function HomeSignalForm({
  dictionary,
  dailyFreeLimit,
  isPremium,
  language,
  onLanguageChange,
  sponsorEnabled,
  supportedLanguages,
}: {
  dictionary: I18nDictionary;
  dailyFreeLimit: number;
  isPremium: boolean;
  language: ReadingLanguage;
  onLanguageChange: (language: ReadingLanguage) => void;
  sponsorEnabled: boolean;
  supportedLanguages: ReadingLanguage[];
}) {
  const router = useRouter();
  const { activeTransition, startTransition } = useTransitionController();
  const [birthDate, setBirthDate] = useState("");
  const [intent, setIntent] = useState<(typeof intents)[number]>("clarity");
  const [energyState, setEnergyState] = useState<EnergyState>(() =>
    getEnergyState(isPremium, dailyFreeLimit),
  );
  const [energyMessage, setEnergyMessage] = useState<string | null>(null);
  const [showEnergyPanel, setShowEnergyPanel] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  const remainingCurrent = Math.max(
    0,
    energyState.dailyFreeLimit +
      energyState.shareRewardsToday +
      energyState.sponsorRewardsToday -
      energyState.usedToday,
  );

  useEffect(() => {
    let cancelled = false;

    queueMicrotask(() => {
      if (cancelled) {
        return;
      }

      setEnergyState(getEnergyState(isPremium, dailyFreeLimit));
      setHasHydrated(true);
    });

    return () => {
      cancelled = true;
    };
  }, [dailyFreeLimit, isPremium]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValidBirthDate(birthDate) || isSubmitting) {
      return;
    }

    if (!canGenerate(isPremium, dailyFreeLimit)) {
      setEnergyState(getEnergyState(isPremium, dailyFreeLimit));
      setShowEnergyPanel(true);
      return;
    }

    consumeReading(isPremium, dailyFreeLimit);
    setIsSubmitting(true);
    startTransition({
      active: true,
      level: "ritual",
      title: dictionary.home.transitionTitle,
      message: dictionary.home.transitionMessage,
    });

    const derivedInput = buildDerivedReadingInput({
      birthDate,
      intent,
      language,
    });
    const nextParams: Record<string, string> = {
      birthYear: String(derivedInput.birthYear),
      ageBand: derivedInput.ageBand,
      westernZodiac: derivedInput.westernZodiac,
      intent: derivedInput.intent,
      language: derivedInput.language,
    };

    if (isPremium) {
      nextParams.premium = "1";
    }

    const searchParams = new URLSearchParams(nextParams);

    router.push(`/result?${searchParams.toString()}`);
  }

  return (
    <section className="relative">
      <div
        aria-hidden="true"
        className="absolute inset-x-8 top-2 h-28 bg-[#7a1b14]/18 blur-3xl"
      />
      <form
        onSubmit={handleSubmit}
        className="relative overflow-hidden rounded-[1.4rem] border border-[#80623c]/24 bg-[linear-gradient(180deg,rgba(30,19,13,0.94),rgba(8,6,5,0.98))] p-5 shadow-[0_24px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-6"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(rgba(214,188,132,0.12)_1px,transparent_1px),linear-gradient(115deg,rgba(122,31,23,0.18),transparent_38%,rgba(176,141,87,0.1))] [background-size:12px_12px,100%_100%]"
        />
        <div className="relative space-y-6">
          <div className="flex justify-end">
            <div
              aria-label={dictionary.home.languageLabel}
              className="inline-flex rounded-sm border border-[#80623c]/28 bg-[#120b08]/60 p-1"
            >
              {supportedLanguages.map((option) => {
                const selected = option === language;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => onLanguageChange(option)}
                    className={[
                      "min-w-12 rounded-sm px-3 py-1.5 text-xs font-semibold tracking-[0.12em] transition",
                      selected
                        ? "bg-[#d8bd82] text-[#1c1009]"
                        : "text-stone-200/80 hover:bg-white/[0.08]",
                    ].join(" ")}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm tracking-[0.12em] text-[#bba16e]/72">
              {dictionary.home.formEyebrow}
            </p>
            <h2 className="font-heading text-3xl leading-tight font-semibold text-stone-50 sm:text-4xl">
              {dictionary.home.formTitle}
            </h2>
          </div>

          <label className="block space-y-3">
            <span className="text-sm font-medium text-stone-200">
              {dictionary.home.birthDateLabel}
            </span>
            <input
              required
              type="date"
              value={birthDate}
              onChange={(event) => setBirthDate(event.target.value)}
              className="w-full rounded-xl border border-[#80623c]/24 bg-[#090605]/56 px-4 py-3 text-base text-stone-50 outline-none transition focus:border-[#d8bd82]/70 focus:bg-white/8"
            />
          </label>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-stone-200">
              {dictionary.home.intentLabel}
            </legend>
            <div className="flex flex-wrap gap-3">
              {intents.map((option) => {
                const selected = option === intent;

                return (
                  <label key={option} className="cursor-pointer">
                    <input
                      type="radio"
                      value={option}
                      checked={selected}
                      onChange={() => setIntent(option)}
                      className="sr-only"
                    />
                    <span
                      className={[
                        "inline-flex min-w-[calc(50%-0.375rem)] items-center justify-center rounded-sm border px-4 py-2.5 text-sm font-medium capitalize transition sm:min-w-0",
                        selected
                          ? "border-[#d8bd82]/70 bg-[#d8bd82] text-[#1c1009]"
                          : "border-[#80623c]/24 bg-[#120b08]/50 text-stone-200 hover:border-[#b08d57]/45 hover:bg-white/[0.08]",
                      ].join(" ")}
                    >
                      {dictionary.intents[option]}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
          <button
            type="submit"
            disabled={!birthDate || isSubmitting}
            className="inline-flex w-full items-center justify-center rounded-sm bg-[linear-gradient(135deg,#9d2b20,#6f1711_54%,#2a1711)] px-5 py-3.5 text-base font-semibold text-[#fff4d6] transition hover:brightness-110 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-stone-500 disabled:hover:brightness-100"
          >
            {isSubmitting || activeTransition?.level === "ritual"
              ? dictionary.home.generatingSignal
              : dictionary.home.generateSignal}
          </button>

          <p className="text-sm leading-6 text-stone-300/70">
            {dictionary.home.privacyNote}
          </p>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-stone-200/78">
            <span className="font-medium text-amber-100">
              {isPremium
                ? dictionary.energy.remainingUnlimited
                : dictionary.energy.remainingLabel}
            </span>
            {isPremium || !hasHydrated ? null : <span>: {remainingCurrent}</span>}
          </div>

          {energyMessage ? (
            <p className="text-sm leading-6 text-emerald-100/78">
              {energyMessage}
            </p>
          ) : null}
        </div>
      </form>
      {showEnergyPanel ? (
        <EnergyExhaustedPanel
          dictionary={dictionary}
          dailyFreeLimit={dailyFreeLimit}
          energyState={energyState}
          language={language}
          onClose={() => setShowEnergyPanel(false)}
          onReward={(state, message) => {
            setEnergyState(state);
            setEnergyMessage(message);
            setShowEnergyPanel(false);
          }}
          sponsorEnabled={sponsorEnabled}
        />
      ) : null}
    </section>
  );
}
