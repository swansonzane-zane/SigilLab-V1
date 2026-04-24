import Link from "next/link";

import type { I18nDictionary } from "@/services/i18n-service";

type PremiumUpgradeCtaProps = {
  dictionary: I18nDictionary;
  language: string;
};

export function PremiumUpgradeCta({
  dictionary,
  language,
}: PremiumUpgradeCtaProps) {
  return (
    <section className="rounded-[1.5rem] border border-emerald-200/14 bg-emerald-200/[0.05] px-5 py-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-emerald-100">
            {dictionary.monetization.upgradePitch}
          </p>
          <p className="mt-1 text-sm leading-6 text-stone-300/76">
            {dictionary.monetization.upgradeNote}
          </p>
        </div>
        <Link
          href={`/premium?${new URLSearchParams({ language }).toString()}`}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f4d7a1,#d6b3ff_54%,#86d9ff)] px-5 text-sm font-semibold text-slate-950 transition hover:brightness-105"
        >
          {dictionary.monetization.upgradeCta}
        </Link>
      </div>
    </section>
  );
}
