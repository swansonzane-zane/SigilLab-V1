import Link from "next/link";

import { ResultSigil } from "@/components/result-sigil";
import { buildShareModelFromRecord } from "@/engine/share-model";
import { getDictionary } from "@/services/i18n-service";
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
    const dictionary = await getDictionary("en");

    return (
      <main className="relative flex min-h-screen flex-1 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(176,141,87,0.14),_transparent_24%),radial-gradient(circle_at_82%_18%,_rgba(122,31,23,0.18),_transparent_20%),linear-gradient(180deg,#15100c,#050403)]"
        />
        <div className="relative mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-5 py-10 text-center">
          <p className="text-sm tracking-[0.32em] text-stone-300/58 uppercase">
            {dictionary.share.sharedMissingEyebrow}
          </p>
          <h1 className="mt-5 font-heading text-5xl leading-none text-amber-50">
            {dictionary.share.sharedMissingTitle}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-stone-300/80">
            {dictionary.share.sharedMissingSubtitle}
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-sm bg-[linear-gradient(135deg,#e5c98c,#b08d57_48%,#7a1b14)] px-6 text-sm font-semibold text-[#160d08] transition hover:brightness-105"
          >
            {dictionary.share.generateOwnSignal}
          </Link>
        </div>
      </main>
    );
  }

  const dictionary = await getDictionary(record.language);
  const model = await buildShareModelFromRecord(record, dictionary);

  return (
    <main className="relative flex min-h-screen flex-1 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(176,141,87,0.14),_transparent_24%),radial-gradient(circle_at_82%_18%,_rgba(122,31,23,0.18),_transparent_20%),linear-gradient(180deg,#15100c,#050403)]"
      />
      <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-5 py-8 sm:px-8 sm:py-10">
        <section className="relative w-full max-w-[32rem] overflow-hidden rounded-[1.4rem] border border-[#80623c]/32 bg-[linear-gradient(180deg,#17100c,#080605)] p-6 text-center shadow-[0_30px_120px_rgba(0,0,0,0.58)] sm:p-7">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-80 [background-image:radial-gradient(rgba(214,188,132,0.14)_1px,transparent_1px),linear-gradient(115deg,rgba(122,31,23,0.22),transparent_34%,rgba(176,141,87,0.12)_72%,transparent)] [background-size:11px_11px,100%_100%]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-4 border border-[#b08d57]/18"
          />
          <div className="relative space-y-6">
            <div className="inline-flex items-center gap-3 border border-[#b08d57]/24 bg-[#23150f]/72 px-3 py-2 text-[11px] font-medium tracking-[0.14em] text-[#d8bd82]">
              <span className="grid h-6 w-6 place-items-center rounded-sm border border-[#8f261c]/50 bg-[#6f1711] text-[10px] text-[#f0d7a4]">
                SL
              </span>
              {model.title}
            </div>

            <div className="-my-2 flex justify-center">
              <div className="scale-[0.82] sm:scale-[0.88]">
                <ResultSigil intent={model.sigilIntent} />
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs tracking-[0.12em] text-[#bba16e]/70">
                {dictionary.share.sharedSealEyebrow}
              </p>
              <h1 className="font-heading text-4xl leading-[0.98] font-semibold text-[#f2dfb8] sm:text-[3.1rem]">
                {model.punchline}
              </h1>
              <p className="text-lg leading-8 text-[#d8c7a4]/88">{model.headline}</p>
              <p className="mx-auto max-w-md text-sm leading-7 text-[#b9aa8c]/84">
                {model.subtext}
              </p>
            </div>

            <Link
              href={`/?${new URLSearchParams({
                language: model.language,
              }).toString()}`}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-sm bg-[linear-gradient(135deg,#e5c98c,#b08d57_48%,#7a1b14)] px-6 text-sm font-semibold text-[#160d08] transition hover:brightness-105"
            >
              {dictionary.share.generateOwnSignal}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
