import type { I18nDictionary } from "@/services/i18n-service";

type AdSlotProps = {
  dictionary: I18nDictionary;
  compact?: boolean;
};

export function AdSlot({ dictionary, compact = false }: AdSlotProps) {
  return (
    <aside
      className={[
        "overflow-hidden rounded-[1.5rem] border border-amber-100/14 bg-[linear-gradient(135deg,rgba(245,215,138,0.1),rgba(125,211,252,0.06)_52%,rgba(168,85,247,0.08))] shadow-[0_18px_70px_rgba(0,0,0,0.22)] backdrop-blur",
        compact ? "px-4 py-3" : "px-5 py-4",
      ].join(" ")}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.28em] text-amber-100/78 uppercase">
            {dictionary.monetization.adEyebrow}
          </p>
          <p className="mt-1 text-sm leading-6 text-stone-100/86">
            {dictionary.monetization.adText}
          </p>
        </div>
        <span className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] px-4 text-xs font-semibold text-stone-100 transition">
          {dictionary.monetization.adCta}
        </span>
      </div>
    </aside>
  );
}
