import Link from "next/link";

import { ResultSigil } from "@/components/result-sigil";
import { buildShareModelFromRecord } from "@/engine/share-model";
import { getShareRecordById } from "@/services/shares-service";

export const dynamic = "force-dynamic";

type SharedPageProps = {
  params: Promise<{
    shareId: string;
  }>;
};

export default async function SharedSealPage({ params }: SharedPageProps) {
  const { shareId } = await params;
  const record = await getShareRecordById(shareId);

  if (!record) {
    return (
      <main className="relative flex min-h-screen flex-1 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(245,215,138,0.12),_transparent_22%),radial-gradient(circle_at_80%_20%,_rgba(125,211,252,0.12),_transparent_18%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.22),_transparent_34%)]"
        />
        <div className="relative mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-5 py-10 text-center">
          <p className="text-sm tracking-[0.32em] text-stone-300/58 uppercase">
            Shared Seal
          </p>
          <h1 className="mt-5 font-heading text-5xl leading-none text-amber-50">
            This seal has faded from the circle.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-stone-300/80">
            The shared sigil can no longer be recovered, but a new reading can still
            be cast from the beginning.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f4d7a1,#d6b3ff_54%,#86d9ff)] px-6 text-sm font-semibold text-slate-950 transition hover:brightness-105"
          >
            Generate Your Own Signal
          </Link>
        </div>
      </main>
    );
  }

  const model = await buildShareModelFromRecord(record);

  return (
    <main className="relative flex min-h-screen flex-1 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(245,215,138,0.12),_transparent_22%),radial-gradient(circle_at_80%_20%,_rgba(125,211,252,0.12),_transparent_18%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.22),_transparent_34%)]"
      />
      <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-5 py-8 sm:px-8 sm:py-10">
        <section className="relative w-full max-w-[32rem] overflow-hidden rounded-[2.6rem] border border-white/12 bg-[linear-gradient(180deg,rgba(18,19,35,0.96),rgba(7,8,16,0.98))] p-6 text-center shadow-[0_30px_120px_rgba(0,0,0,0.52)] backdrop-blur-xl sm:p-7">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.14),_transparent_22%),radial-gradient(circle_at_78%_18%,_rgba(125,211,252,0.12),_transparent_18%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.18),_transparent_30%)]"
          />
          <div className="relative space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] tracking-[0.3em] text-amber-100/88 uppercase">
              <span className="h-2 w-2 rounded-full bg-amber-200 shadow-[0_0_12px_rgba(252,211,77,0.82)]" />
              {model.title}
            </div>

            <div className="-my-2 flex justify-center">
              <div className="scale-[0.82] sm:scale-[0.88]">
                <ResultSigil intent={model.sigilIntent} />
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs tracking-[0.28em] text-sky-100/68 uppercase">
                Shared Seal
              </p>
              <h1 className="font-heading text-4xl leading-[0.95] font-semibold text-amber-50 sm:text-[3.25rem]">
                {model.punchline}
              </h1>
              <p className="text-lg leading-8 text-stone-100/86">{model.headline}</p>
              <p className="mx-auto max-w-md text-sm leading-7 text-stone-300/78">
                {model.subtext}
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#f4d7a1,#d6b3ff_54%,#86d9ff)] px-6 text-sm font-semibold text-slate-950 transition hover:brightness-105"
            >
              Generate Your Own Signal
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
