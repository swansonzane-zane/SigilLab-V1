import { generateReading } from "@/engine/generate-reading";
import { buildReadingInputFromSearchParams } from "@/engine/reading-request";
import { ResultReadingPanel } from "@/components/result-reading-panel";

type ResultPageProps = {
  searchParams: Promise<{
    birthDate?: string | string[];
    intent?: string | string[];
    language?: string | string[];
  }>;
};

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const input = buildReadingInputFromSearchParams(await searchParams);
  const output = await generateReading(input);

  return (
    <main className="relative flex min-h-screen flex-1 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(245,215,138,0.12),_transparent_22%),radial-gradient(circle_at_80%_20%,_rgba(125,211,252,0.12),_transparent_18%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.2),_transparent_34%)]"
      />
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
        <section className="flex flex-1 flex-col justify-center gap-8">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm tracking-[0.3em] text-amber-100/88 uppercase shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-amber-200 shadow-[0_0_14px_rgba(252,211,77,0.9)]" />
              SigilLab
            </div>
            <p className="text-sm font-medium tracking-[0.32em] text-sky-100/70 uppercase">
              Emotional Signal Result
            </p>
            <h2 className="font-heading text-4xl leading-tight font-semibold text-stone-50 sm:text-5xl">
              The current sky answers the intention you carried into this
              moment.
            </h2>
            <p className="max-w-xl text-base leading-7 text-stone-300/82 sm:text-lg">
              Settle into what rises first. Your signal below is written as a
              reflective reading meant to help you name the feeling, pattern,
              and next opening in front of you.
            </p>
          </div>

          <ResultReadingPanel input={input} output={output} />
        </section>
      </div>
    </main>
  );
}
