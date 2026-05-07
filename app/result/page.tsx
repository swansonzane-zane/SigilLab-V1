import { generateReadingWithMeta } from "@/engine/generate-reading";
import { buildReadingInputFromSearchParams } from "@/engine/reading-request";
import { ResultActionBar } from "@/components/result-action-bar";
import { ResultHero } from "@/components/result-hero";
import { ResultPrompts } from "@/components/result-prompts";
import { PremiumBadge } from "@/components/premium-badge";
import { getAppConfig } from "@/services/configs-service";
import { getDictionary } from "@/services/i18n-service";
import { resolvePremiumState } from "@/services/monetization-service";
import { createReadingRecord } from "@/services/readings-service";

type ResultPageProps = {
  searchParams: Promise<{
    birthYear?: string | string[];
    ageBand?: string | string[];
    westernZodiac?: string | string[];
    intent?: string | string[];
    language?: string | string[];
    premium?: string | string[];
  }>;
};

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const config = await getAppConfig();
  const params = await searchParams;
  const input = buildReadingInputFromSearchParams(
    params,
    config.defaultLanguage,
  );
  const isPremium = resolvePremiumState(params.premium, config);
  const dictionary = await getDictionary(input.language);
  const { output, meta } = await generateReadingWithMeta(input);

  await createReadingRecord({
    input,
    output,
    meta,
  });

  return (
    <main className="relative flex min-h-screen flex-1 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(176,141,87,0.16),_transparent_24%),radial-gradient(circle_at_82%_18%,_rgba(122,31,23,0.16),_transparent_20%),linear-gradient(180deg,#15100c,#050403)]"
      />
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 pb-28 pt-6 sm:px-8 sm:pb-32 sm:pt-8 lg:px-12">
        <section className="flex flex-1 flex-col gap-10 lg:gap-14">
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-3 border border-[#b08d57]/24 bg-[#23150f]/72 px-4 py-2 text-sm tracking-[0.12em] text-[#d8bd82] shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#7a1b14]" />
              SigilLab
            </div>
            <p className="text-xs tracking-[0.28em] text-stone-300/58 uppercase">
              {dictionary.result.eyebrow}
            </p>
          </div>
          {isPremium ? <PremiumBadge dictionary={dictionary} /> : null}

          <ResultHero
            input={input}
            output={output}
            dictionary={dictionary}
          />

          {meta.failed ? (
            <div className="max-w-3xl rounded-[1.5rem] border border-amber-200/20 bg-amber-100/8 px-5 py-4 text-sm leading-7 text-amber-50/90">
              {dictionary.result.fallbackNotice}
            </div>
          ) : null}

          <ResultPrompts
            prompts={output.journalPrompts.slice(0, config.maxJournalPrompts)}
            dictionary={dictionary}
          />
        </section>
      </div>
      <ResultActionBar
        showShare={config.enableShare}
        shareSeed={{
          title: output.title,
          headline: output.headline,
          punchline: output.punchline,
          subtext: output.insight,
          intent: input.intent,
          zodiac: input.westernZodiac,
          language: input.language,
        }}
        dictionary={dictionary}
        isPremium={isPremium}
      />
    </main>
  );
}
