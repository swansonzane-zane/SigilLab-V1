import { ShareCard } from "@/components/share-card";
import { buildShareModelFromRecord } from "@/engine/share-model";
import { createShareRecord } from "@/services/shares-service";

export const dynamic = "force-dynamic";

type SharePageProps = {
  searchParams: Promise<{
    title?: string | string[];
    headline?: string | string[];
    punchline?: string | string[];
    subtext?: string | string[];
    intent?: string | string[];
    zodiac?: string | string[];
  }>;
};

function getParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function SharePage({ searchParams }: SharePageProps) {
  const params = await searchParams;
  const record = await createShareRecord({
    title: getParam(params.title),
    headline: getParam(params.headline),
    punchline: getParam(params.punchline),
    subtext: getParam(params.subtext),
    intent: getParam(params.intent),
    zodiac: getParam(params.zodiac),
  });
  const model = await buildShareModelFromRecord(record);

  return (
    <main className="relative flex min-h-screen flex-1 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(245,215,138,0.12),_transparent_22%),radial-gradient(circle_at_80%_20%,_rgba(125,211,252,0.12),_transparent_18%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.22),_transparent_34%)]"
      />
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-6 max-w-lg text-center">
          <p className="text-sm tracking-[0.32em] text-stone-300/58 uppercase">
            Share Growth Ritual
          </p>
          <h1 className="mt-4 font-heading text-4xl leading-none text-amber-50 sm:text-5xl">
            Let the seal travel.
          </h1>
          <p className="mt-4 text-sm leading-7 text-stone-300/78">
            This card is shaped for screenshots, blessings, and return paths.
            Keep the ritual close, then send it onward without breaking the
            atmosphere.
          </p>
          <p className="mt-3 text-sm leading-7 text-emerald-100/68">
            {model.privacyNotice}
          </p>
        </div>

        <ShareCard model={model} />
      </div>
    </main>
  );
}
