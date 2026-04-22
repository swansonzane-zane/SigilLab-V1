"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

import {
  buildDerivedReadingInput,
  isValidBirthDate,
} from "@/engine/reading-profile";

const intents = [
  "clarity",
  "healing",
  "focus",
  "balance",
  "release",
  "openness",
] as const;

export function HomeSignalForm() {
  const router = useRouter();
  const [birthDate, setBirthDate] = useState("");
  const [intent, setIntent] = useState<(typeof intents)[number]>("clarity");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValidBirthDate(birthDate)) {
      return;
    }

    const derivedInput = buildDerivedReadingInput({
      birthDate,
      intent,
      language: "en",
    });
    const searchParams = new URLSearchParams({
      birthYear: String(derivedInput.birthYear),
      ageBand: derivedInput.ageBand,
      westernZodiac: derivedInput.westernZodiac,
      intent: derivedInput.intent,
      language: derivedInput.language,
    });

    router.push(`/result?${searchParams.toString()}`);
  }

  return (
    <section className="relative">
      <div
        aria-hidden="true"
        className="absolute inset-x-8 top-2 h-28 rounded-full bg-violet-400/20 blur-3xl"
      />
      <form
        onSubmit={handleSubmit}
        className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(19,20,38,0.92),rgba(9,10,18,0.98))] p-5 shadow-[0_24px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-6"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(250,204,21,0.12),_transparent_20%),radial-gradient(circle_at_left,_rgba(125,211,252,0.1),_transparent_26%)]"
        />
        <div className="relative space-y-6">
          <div className="space-y-2">
            <p className="text-sm tracking-[0.28em] text-stone-300/65 uppercase">
              Start a Reading
            </p>
            <h2 className="font-heading text-3xl leading-tight font-semibold text-stone-50 sm:text-4xl">
              Tune the ritual, then generate your signal.
            </h2>
          </div>

          <label className="block space-y-3">
            <span className="text-sm font-medium text-stone-200">
              Birth Date
            </span>
            <input
              required
              type="date"
              value={birthDate}
              onChange={(event) => setBirthDate(event.target.value)}
              className="w-full rounded-2xl border border-white/12 bg-white/6 px-4 py-3 text-base text-stone-50 outline-none transition focus:border-amber-200/60 focus:bg-white/8"
            />
          </label>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-stone-200">
              Intent
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
                        "inline-flex min-w-[calc(50%-0.375rem)] items-center justify-center rounded-full border px-4 py-2.5 text-sm font-medium capitalize transition sm:min-w-0",
                        selected
                          ? "border-amber-200/70 bg-amber-100 text-slate-950 shadow-[0_0_24px_rgba(252,211,77,0.25)]"
                          : "border-white/12 bg-white/[0.04] text-stone-200 hover:border-white/25 hover:bg-white/[0.08]",
                      ].join(" ")}
                    >
                      {option}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
          <button
            type="submit"
            disabled={!birthDate}
            className="inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#f4d7a1,#d6b3ff_54%,#86d9ff)] px-5 py-3.5 text-base font-semibold text-slate-950 transition hover:brightness-105 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-stone-500 disabled:hover:brightness-100"
          >
            Generate Signal
          </button>

          <p className="text-sm leading-6 text-stone-300/70">
            Your birth date is translated locally before navigation so the
            result route only receives lower-sensitivity profile fields.
          </p>
        </div>
      </form>
    </section>
  );
}
