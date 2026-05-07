import type { ReadingInput, ReadingOutput } from "@/types/reading";
import type { I18nDictionary } from "@/services/i18n-service";

import { ResultSigil } from "@/components/result-sigil";

type ResultHeroProps = {
  input: ReadingInput;
  output: ReadingOutput;
  dictionary: I18nDictionary;
};

export function ResultHero({ input, output, dictionary }: ResultHeroProps) {
  return (
    <section className="grid items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
      <div className="order-1 flex justify-center lg:order-none">
        <ResultSigil
          intent={input.intent}
          zodiac={input.westernZodiac}
          birthYear={input.birthYear}
          ageBand={input.ageBand}
          title={output.title}
          headline={output.headline}
        />
      </div>

      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3 text-xs tracking-[0.12em] text-[#bba16e]/76">
          <span className="border border-[#b08d57]/18 bg-[#23150f]/58 px-3 py-1.5">
            {output.title}
          </span>
          <span>{input.birthYear}</span>
          <span>{input.ageBand}</span>
          <span>{input.westernZodiac}</span>
          <span>{input.language}</span>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-medium tracking-[0.14em] text-[#bba16e]/74">
            {dictionary.result.heroEyebrow}
          </p>
          <h1 className="max-w-4xl font-heading text-4xl leading-[0.95] font-semibold text-amber-50 sm:text-5xl lg:text-6xl">
            {output.punchline}
          </h1>
          <p className="max-w-3xl text-base leading-7 text-[#ead7aa]/84 italic sm:text-lg">
            {output.ritualPhrase}
          </p>
          <p className="max-w-3xl text-xl leading-8 text-stone-100/88 sm:text-2xl sm:leading-9">
            {output.headline}
          </p>
        </div>

        <article className="max-w-3xl rounded-[1.2rem] border border-[#80623c]/22 bg-[#120b08]/64 p-5 text-stone-200/88 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-sm sm:p-6">
          <p className="mb-3 text-sm tracking-[0.12em] text-[#bba16e]/68">
            {dictionary.result.insightLabel}
          </p>
          <p className="text-base leading-8 sm:text-lg">{output.insight}</p>
        </article>
      </div>
    </section>
  );
}
