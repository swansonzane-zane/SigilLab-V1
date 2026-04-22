import type { ReadingInput, ReadingOutput } from "@/types/reading";

import { ResultSigil } from "@/components/result-sigil";

type ResultHeroProps = {
  input: ReadingInput;
  output: ReadingOutput;
};

export function ResultHero({ input, output }: ResultHeroProps) {
  return (
    <section className="grid items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
      <div className="order-1 flex justify-center lg:order-none">
        <ResultSigil intent={input.intent} />
      </div>

      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3 text-xs tracking-[0.28em] text-stone-300/70 uppercase">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            {output.title}
          </span>
          <span>{input.birthDate}</span>
          <span>{input.language}</span>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-medium tracking-[0.32em] text-sky-100/70 uppercase">
            Emotional Signal Result
          </p>
          <h1 className="max-w-4xl font-heading text-4xl leading-[0.95] font-semibold text-amber-50 sm:text-5xl lg:text-6xl">
            {output.punchline}
          </h1>
          <p className="max-w-3xl text-xl leading-8 text-stone-100/88 sm:text-2xl sm:leading-9">
            {output.headline}
          </p>
        </div>

        <article className="max-w-3xl rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 text-stone-200/88 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-sm sm:p-6">
          <p className="mb-3 text-sm tracking-[0.28em] text-stone-300/60 uppercase">
            Insight
          </p>
          <p className="text-base leading-8 sm:text-lg">{output.insight}</p>
        </article>
      </div>
    </section>
  );
}
