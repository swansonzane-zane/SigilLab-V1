"use client";

import { useRouter } from "next/navigation";

import { useTransitionController } from "@/components/transition-provider";
import type { I18nDictionary } from "@/services/i18n-service";
import type { ReadingLanguage } from "@/types/reading";

type ResultActionBarProps = {
  showShare: boolean;
  isPremium: boolean;
  shareSeed?: {
    title: string;
    headline: string;
    punchline: string;
    subtext: string;
    intent: string;
    zodiac: string;
    language: ReadingLanguage;
  };
  dictionary: I18nDictionary;
};

export function ResultActionBar({
  showShare,
  isPremium,
  shareSeed,
  dictionary,
}: ResultActionBarProps) {
  const router = useRouter();
  const { startTransition } = useTransitionController();
  const language = shareSeed?.language || "en";

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-[rgba(6,7,14,0.86)] px-4 py-3 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-4xl gap-3">
        {showShare ? (
          <button
            type="button"
            onClick={() => {
              startTransition({
                active: true,
                level: "ritual",
                title: dictionary.result.shareTransitionTitle,
                message: dictionary.result.shareTransitionMessage,
              });

              const searchParams = new URLSearchParams({
                title: shareSeed?.title || "SigilLab",
                headline: shareSeed?.headline || "",
                punchline: shareSeed?.punchline || "",
                subtext: shareSeed?.subtext || "",
                intent: shareSeed?.intent || "clarity",
                zodiac: shareSeed?.zodiac || "",
                language,
                ...(isPremium ? { premium: "1" } : {}),
              });

              router.push(`/share?${searchParams.toString()}`);
            }}
            className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] px-5 text-sm font-medium text-stone-100 transition hover:bg-white/[0.1]"
          >
            {dictionary.result.share}
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => {
            startTransition({
              active: true,
              level: "instant",
              title: dictionary.result.returnTransitionTitle,
              message: dictionary.result.returnTransitionMessage,
            });
            const params = new URLSearchParams({ language });

            if (isPremium) {
              params.set("premium", "1");
            }

            router.push(`/?${params.toString()}`);
          }}
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f4d7a1,#d6b3ff_54%,#86d9ff)] px-5 text-sm font-semibold text-slate-950 transition hover:brightness-105"
        >
          {dictionary.result.revealAnotherPath}
        </button>
      </div>
    </div>
  );
}
