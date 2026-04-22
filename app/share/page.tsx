import { ShareCard } from "@/components/share-card";
import { buildMockShareModel } from "@/engine/share-model";

export default function SharePage() {
  const model = buildMockShareModel();

  return (
    <main className="relative flex min-h-screen flex-1 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(245,215,138,0.12),_transparent_22%),radial-gradient(circle_at_80%_20%,_rgba(125,211,252,0.12),_transparent_18%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.22),_transparent_34%)]"
      />
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-6 max-w-md text-center">
          <p className="text-sm tracking-[0.32em] text-stone-300/58 uppercase">
            Share Preview
          </p>
          <p className="mt-3 text-sm leading-7 text-stone-300/78">
            A compact SigilLab card designed to feel luminous on a screenshot,
            story, or message thread.
          </p>
        </div>

        <ShareCard model={model} />
      </div>
    </main>
  );
}
