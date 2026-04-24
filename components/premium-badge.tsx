import type { I18nDictionary } from "@/services/i18n-service";

type PremiumBadgeProps = {
  dictionary: I18nDictionary;
};

export function PremiumBadge({ dictionary }: PremiumBadgeProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/18 bg-emerald-200/10 px-3 py-1.5 text-xs font-semibold tracking-[0.18em] text-emerald-100 uppercase">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-200 shadow-[0_0_12px_rgba(167,243,208,0.8)]" />
      {dictionary.monetization.premiumBadge}
    </span>
  );
}
