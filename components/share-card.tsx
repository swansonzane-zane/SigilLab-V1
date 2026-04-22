import Link from "next/link";

import { ResultSigil } from "@/components/result-sigil";
import type { ShareModel } from "@/types/share";

type ShareCardProps = {
  model: ShareModel;
};

export function ShareCard({ model }: ShareCardProps) {
  return (
    <section className="relative mx-auto w-full max-w-[26rem] overflow-hidden rounded-[2.5rem] border border-white/12 bg-[linear-gradient(180deg,rgba(18,19,35,0.96),rgba(7,8,16,0.98))] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.52)] backdrop-blur-xl sm:p-6">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.14),_transparent_22%),radial-gradient(circle_at_78%_18%,_rgba(125,211,252,0.12),_transparent_18%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.18),_transparent_30%)]"
      />
      <div className="relative space-y-6">
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[11px] tracking-[0.3em] text-amber-100/88 uppercase">
            <span className="h-2 w-2 rounded-full bg-amber-200 shadow-[0_0_12px_rgba(252,211,77,0.82)]" />
            SigilLab
          </div>
          <p className="text-[11px] tracking-[0.28em] text-stone-300/58 uppercase">
            Share Card
          </p>
        </div>

        <div className="-my-3 flex justify-center">
          <div className="scale-[0.82] sm:scale-[0.88]">
            <ResultSigil intent="share" />
          </div>
        </div>

        <div className="space-y-4 text-center">
          <p className="text-xs tracking-[0.28em] text-sky-100/68 uppercase">
            Emotional Reading
          </p>
          <h1 className="font-heading text-4xl leading-[0.95] font-semibold text-amber-50 sm:text-[3.25rem]">
            {model.punchline}
          </h1>
          <p className="text-lg leading-8 text-stone-100/86">{model.headline}</p>
          <p className="mx-auto max-w-md text-sm leading-7 text-stone-300/78">
            {model.subtext}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {model.hashtags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-stone-200/78"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
          <Link
            href={model.ctaHref}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f4d7a1,#d6b3ff_54%,#86d9ff)] px-5 text-sm font-semibold text-slate-950 transition hover:brightness-105"
          >
            {model.ctaText}
          </Link>

          <div className="justify-self-center sm:justify-self-end">
            <div className="rounded-[1.4rem] border border-white/10 bg-black/25 p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)]">
              <div className="grid h-24 w-24 grid-cols-5 gap-1 rounded-[1rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-2">
                {Array.from({ length: 25 }).map((_, index) => {
                  const filled = [0, 1, 4, 5, 7, 9, 10, 12, 14, 15, 18, 20, 21, 23, 24].includes(index);

                  return (
                    <span
                      key={index}
                      className={filled ? "rounded-[2px] bg-stone-100/88" : "rounded-[2px] bg-white/8"}
                    />
                  );
                })}
              </div>
            </div>
            <p className="mt-2 text-center text-[10px] tracking-[0.24em] text-stone-300/58 uppercase">
              {model.qrPlaceholderText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
