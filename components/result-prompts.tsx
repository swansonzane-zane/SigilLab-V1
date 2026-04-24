"use client";

import { useState } from "react";

import type { I18nDictionary } from "@/services/i18n-service";

type ResultPromptsProps = {
  prompts: string[];
  dictionary: I18nDictionary;
};

export function ResultPrompts({ prompts, dictionary }: ResultPromptsProps) {
  const [feedback, setFeedback] = useState<string | null>(null);

  async function copyPrompt(prompt: string) {
    try {
      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(prompt);
          setFeedback(dictionary.result.promptCopySuccess);
          return;
        } catch {
          // Fall through to the textarea path for browsers that block clipboard.
        }
      }

      const textarea = document.createElement("textarea");
      textarea.value = prompt;
      textarea.setAttribute("readonly", "true");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, prompt.length);

      const copied = document.execCommand("copy");
      document.body.removeChild(textarea);

      if (!copied) {
        throw new Error("copy failed");
      }

      setFeedback(dictionary.result.promptCopySuccess);
    } catch {
      setFeedback(dictionary.result.promptCopyFailure);
    }
  }

  return (
    <section className="space-y-4">
      <div className="max-w-2xl space-y-2">
        <p className="text-sm tracking-[0.28em] text-stone-300/60 uppercase">
          {dictionary.result.journalPrompts}
        </p>
        <h2 className="font-heading text-3xl font-semibold text-stone-50 sm:text-4xl">
          {dictionary.result.journalPromptsTitle}
        </h2>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        {prompts.map((prompt, index) => (
          <button
            key={prompt}
            type="button"
            onClick={() => copyPrompt(prompt)}
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 text-left backdrop-blur-sm transition hover:border-amber-100/24 hover:bg-white/[0.07] focus:border-amber-100/35 focus:outline-none"
          >
            <p className="mb-3 text-xs tracking-[0.28em] text-stone-300/55 uppercase">
              {dictionary.result.promptLabel} {index + 1}
            </p>
            <p className="text-sm leading-7 text-stone-200/84">{prompt}</p>
          </button>
        ))}
      </div>

      <div aria-live="polite" className="min-h-6">
        {feedback ? (
          <p className="text-sm leading-6 text-emerald-100/78">{feedback}</p>
        ) : null}
      </div>
    </section>
  );
}
