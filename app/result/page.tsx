import { generateReading } from "@/engine/generate-reading";
import { buildReadingInputFromSearchParams } from "@/engine/reading-request";
import { ResultActionBar } from "@/components/result-action-bar";
import { ResultHero } from "@/components/result-hero";
import { ResultPrompts } from "@/components/result-prompts";

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
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 pb-28 pt-6 sm:px-8 sm:pb-32 sm:pt-8 lg:px-12">
        <section className="flex flex-1 flex-col gap-10 lg:gap-14">
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm tracking-[0.3em] text-amber-100/88 uppercase shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-amber-200 shadow-[0_0_14px_rgba(252,211,77,0.9)]" />
              SigilLab
            </div>
            <p className="text-xs tracking-[0.28em] text-stone-300/58 uppercase">
              Ritual Result
            </p>
          </div>

          <ResultHero input={input} output={output} />

          <ResultPrompts prompts={output.journalPrompts} />
        </section>
      </div>
      <ResultActionBar birthDate={input.birthDate} />
    </main>
  );
}
