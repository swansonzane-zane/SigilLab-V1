import Link from "next/link";

import type { ReadingInput, ReadingOutput } from "@/types/reading";

type ResultReadingPanelProps = {
  input: ReadingInput;
  output: ReadingOutput;
};

export function ResultReadingPanel({
  input,
  output,
}: ResultReadingPanelProps) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(18,19,35,0.94),rgba(8,9,18,0.98))] p-5 shadow-[0_24px_100px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-7">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(250,204,21,0.12),_transparent_22%),radial-gradient(circle_at_left,_rgba(125,211,252,0.12),_transparent_26%),radial-gradient(circle_at_bottom,_rgba(192,132,252,0.14),_transparent_30%)]"
      />
      <div className="relative space-y-8">
        <div className="flex flex-wrap items-center gap-3 text-xs tracking-[0.28em] text-stone-300/70 uppercase">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            SigilLab Reading
          </span>
          <span>{input.intent}</span>
          <span>{input.birthDate}</span>
          <span>{input.language}</span>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-medium tracking-[0.32em] text-sky-100/70 uppercase">
            {output.title}
          </p>
          <h1 className="max-w-3xl font-heading text-4xl leading-tight font-semibold text-stone-50 sm:text-5xl">
            {output.headline}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-amber-100/88">
            {output.punchline}
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
            <p className="mb-3 text-sm tracking-[0.28em] text-stone-300/60 uppercase">
              Insight
            </p>
            <p className="text-base leading-8 text-stone-200/88">
              {output.insight}
            </p>
          </article>

          <aside className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
            <p className="mb-4 text-sm tracking-[0.28em] text-stone-300/60 uppercase">
              Journal Prompts
            </p>
            <ul className="space-y-3 text-sm leading-7 text-stone-200/84">
              {output.journalPrompts.map((prompt) => (
                <li
                  key={prompt}
                  className="rounded-2xl border border-white/8 bg-black/10 px-4 py-3"
                >
                  {prompt}
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 text-sm font-medium text-stone-100 transition hover:bg-white/[0.08]"
          >
            Return to Ritual
          </Link>
          <Link
            href={`/?birthDate=${input.birthDate}`}
            className="inline-flex items-center justify-center rounded-full border border-amber-200/30 bg-amber-100/8 px-5 py-3 text-sm font-medium text-amber-100 transition hover:bg-amber-100/12"
          >
            Generate Another Signal
          </Link>
        </div>
      </div>
    </section>
  );
}
