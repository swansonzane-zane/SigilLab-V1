import { ResultSigil } from "@/components/result-sigil";
import { ShareActions } from "@/components/share-actions";
import type { ShareModel } from "@/types/share";

type ShareCardProps = {
  model: ShareModel;
};

export function ShareCard({ model }: ShareCardProps) {
  return (
    <div className="mx-auto w-full max-w-[28rem] space-y-4">
      <section
        id={`share-poster-${model.shareId}`}
        className="relative overflow-hidden rounded-[2.5rem] border border-white/12 bg-[linear-gradient(180deg,rgba(18,19,35,0.96),rgba(7,8,16,0.98))] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.52)] backdrop-blur-xl sm:p-6"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.14),_transparent_22%),radial-gradient(circle_at_78%_18%,_rgba(125,211,252,0.12),_transparent_18%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.18),_transparent_30%)]"
        />
        <div className="relative space-y-6">
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[11px] tracking-[0.3em] text-amber-100/88 uppercase">
              <span className="h-2 w-2 rounded-full bg-amber-200 shadow-[0_0_12px_rgba(252,211,77,0.82)]" />
              {model.title}
            </div>
            <p className="text-[11px] tracking-[0.28em] text-stone-300/58 uppercase">
              Share Ritual
            </p>
          </div>

          <div className="-my-2 flex justify-center">
            <div className="scale-[0.82] sm:scale-[0.88]">
              <ResultSigil intent={model.sigilIntent} />
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

          <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-center">
            <p className="text-xs tracking-[0.28em] text-stone-300/62 uppercase">
              Blessing To Send
            </p>
            <p className="mt-2 text-sm leading-7 text-stone-200/84">
              {model.shareText}
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

          <div className="rounded-[1.8rem] border border-white/10 bg-black/18 p-4 sm:p-5">
            <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
              <div className="space-y-3">
                <p className="text-[11px] tracking-[0.28em] text-stone-300/56 uppercase">
                  {model.onlineCtaLabel}
                </p>
                <p className="max-w-[16rem] text-sm leading-6 text-stone-300/82">
                  Carry this exact seal into a story, a message thread, or a private screenshot.
                </p>
                <div className="space-y-2 pt-1">
                  <p className="text-[10px] tracking-[0.24em] text-amber-100/70 uppercase">
                    Shared Link
                  </p>
                  <p className="break-all text-sm leading-6 text-stone-200/80">
                    {model.sharedPath}
                  </p>
                </div>
              </div>
              <div className="justify-self-center sm:justify-self-end">
                <div
                  aria-hidden="true"
                  className="[&_svg]:block [&_svg]:h-full [&_svg]:w-full [&_svg]:rounded-[1rem] h-32 w-32 shrink-0 overflow-hidden rounded-[1.25rem] shadow-[0_10px_30px_rgba(0,0,0,0.22)]"
                  dangerouslySetInnerHTML={{ __html: model.qrSvg }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ShareActions model={model} />
    </div>
  );
}
