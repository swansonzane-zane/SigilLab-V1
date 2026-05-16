"use client";

import { useRouter } from "next/navigation";

import { useTransitionController } from "@/components/transition-provider";
import { captureEvent } from "@/services/analytics-service";
import type { I18nDictionary } from "@/services/i18n-service";
import type { ReadingLanguage } from "@/types/reading";

type ResultActionBarProps = {
  showShare: boolean;
  isPremium: boolean;
  shareSeed?: {
    title: string;
    headline: string;
    punchline: string;
    ritualPhrase: string;
    subtext: string;
    intent: string;
    zodiac: string;
    birthYear: number;
    ageBand: string;
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
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-[#80623c]/22 bg-[rgba(8,6,5,0.88)] px-4 py-3 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-4xl gap-3">
        {showShare ? (
          <button
            type="button"
            onClick={() => {
              captureEvent("share_ritual_clicked", {
                intent: shareSeed?.intent,
                westernZodiac: shareSeed?.zodiac,
                ageBand: shareSeed?.ageBand,
                language,
              });
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
                ritualPhrase: shareSeed?.ritualPhrase || "",
                subtext: shareSeed?.subtext || "",
                intent: shareSeed?.intent || "clarity",
                zodiac: shareSeed?.zodiac || "",
                birthYear: String(shareSeed?.birthYear || ""),
                ageBand: shareSeed?.ageBand || "",
                language,
                ...(isPremium ? { premium: "1" } : {}),
              });

              router.push(`/share?${searchParams.toString()}`);
            }}
            className="inline-flex min-h-12 flex-1 items-center justify-center rounded-sm border border-[#80623c]/28 bg-[#120b08]/72 px-5 text-sm font-medium text-stone-100 transition hover:bg-white/[0.08]"
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
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-sm bg-[linear-gradient(135deg,#9d2b20,#6f1711_54%,#2a1711)] px-5 text-sm font-semibold text-[#fff4d6] transition hover:brightness-110"
        >
          {dictionary.result.revealAnotherPath}
        </button>
      </div>
    </div>
  );
}
