import { ResultSigil } from "@/components/result-sigil";
import { RecentShareWriter } from "@/components/recent-share-writer";
import { ShareActions } from "@/components/share-actions";
import type { ShareModel } from "@/types/share";

type ShareCardProps = {
  dailyFreeLimit: number;
  isPremium: boolean;
  model: ShareModel;
};

export function ShareCard({
  dailyFreeLimit,
  isPremium,
  model,
}: ShareCardProps) {
  return (
    <div className="mx-auto w-full max-w-[28rem] space-y-4">
      <RecentShareWriter model={model} />
      <section
        id={`share-poster-${model.shareId}`}
        className="relative overflow-hidden rounded-[1.4rem] border border-[#80623c]/32 bg-[linear-gradient(180deg,#17100c,#080605)] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.58)] sm:p-6"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-80 [background-image:radial-gradient(rgba(214,188,132,0.14)_1px,transparent_1px),linear-gradient(115deg,rgba(122,31,23,0.22),transparent_34%,rgba(176,141,87,0.12)_72%,transparent)] [background-size:11px_11px,100%_100%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-4 border border-[#b08d57]/18"
        />
        <div className="relative space-y-6">
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-3 border border-[#b08d57]/24 bg-[#23150f]/72 px-3 py-2 text-[11px] font-medium tracking-[0.14em] text-[#d8bd82]">
              <span className="grid h-6 w-6 place-items-center rounded-sm border border-[#8f261c]/50 bg-[#6f1711] text-[10px] text-[#f0d7a4]">
                SL
              </span>
              SigilLab
            </div>
            <p className="text-[11px] tracking-[0.14em] text-[#bba16e]/72">
              {model.posterEyebrow}
            </p>
          </div>

          <div className="relative -my-1 flex justify-center">
            <div
              aria-hidden="true"
              className="absolute inset-x-8 top-7 h-56 rounded-[1.2rem] border border-[#7a1b14]/24 bg-[#c6aa78]/10"
            />
            <div className="scale-[0.84] sm:scale-[0.9]">
              <ResultSigil intent={model.sigilIntent} />
            </div>
          </div>

          <div className="space-y-4 text-center">
            <p className="text-xs tracking-[0.12em] text-[#bba16e]/70">
              {model.readingEyebrow}
            </p>
            <h1 className="font-heading text-4xl leading-[0.98] font-semibold text-[#f2dfb8] sm:text-[3.1rem]">
              {model.punchline}
            </h1>
            <p className="text-lg leading-8 text-[#d8c7a4]/88">{model.headline}</p>
            <p className="mx-auto max-w-md text-sm leading-7 text-[#b9aa8c]/84">
              {model.subtext}
            </p>
          </div>

          <div className="border border-[#b08d57]/18 bg-[#120b08]/74 px-4 py-4 text-center">
            <p className="text-xs tracking-[0.12em] text-[#bba16e]/68">
              {model.blessingLabel}
            </p>
            <p className="mt-2 text-sm leading-7 text-[#dcc9a6]/86">
              {model.shareTextLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {model.hashtags.map((tag) => (
              <span
                key={tag}
                className="border border-[#7a1b14]/34 bg-[#2b140e]/72 px-3 py-1.5 text-xs font-medium text-[#cdb27b]/82"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="border border-[#80623c]/22 bg-[#090605]/62 p-4 sm:p-5">
            <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
              <div className="space-y-3">
                <p className="text-[11px] tracking-[0.12em] text-[#bba16e]/62">
                  {model.onlineCtaLabel}
                </p>
                <p className="max-w-[16rem] text-sm leading-6 text-[#b9aa8c]/84">
                  {model.onlineCtaDescription}
                </p>
                <div className="space-y-2 pt-1">
                  <p className="text-[10px] tracking-[0.12em] text-[#d8bd82]/76">
                    {model.sharedLinkLabel}
                  </p>
                  <p className="break-all text-sm leading-6 text-[#d8c7a4]/86">
                    {model.sharedPath}
                  </p>
                </div>
              </div>
              <div className="justify-self-center sm:justify-self-end">
                <div
                  aria-hidden="true"
                  className="[&_svg]:block [&_svg]:h-full [&_svg]:w-full h-32 w-32 shrink-0 overflow-hidden border border-[#b08d57]/22 bg-[#d5c19a] p-2 shadow-[0_10px_30px_rgba(0,0,0,0.32)]"
                  dangerouslySetInnerHTML={{ __html: model.qrSvg }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ShareActions
        dailyFreeLimit={dailyFreeLimit}
        isPremium={isPremium}
        model={model}
      />
    </div>
  );
}
