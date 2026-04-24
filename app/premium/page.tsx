import Link from "next/link";

import { getAppConfig } from "@/services/configs-service";
import { getDictionary, resolveLanguage } from "@/services/i18n-service";

type PremiumPageProps = {
  searchParams: Promise<{
    language?: string | string[];
  }>;
};

function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

export default async function PremiumPage({ searchParams }: PremiumPageProps) {
  const config = await getAppConfig();
  const params = await searchParams;
  const language = await resolveLanguage(params.language);
  const dictionary = await getDictionary(language);

  return (
    <main className="relative flex min-h-screen flex-1 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(245,215,138,0.12),_transparent_22%),radial-gradient(circle_at_80%_20%,_rgba(125,211,252,0.12),_transparent_18%),radial-gradient(circle_at_bottom,_rgba(16,185,129,0.16),_transparent_34%)]"
      />
      <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-5 py-10 sm:px-8 lg:px-12">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="space-y-6">
            <Link
              href={`/?${new URLSearchParams({ language }).toString()}`}
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm tracking-[0.3em] text-amber-100/88 uppercase backdrop-blur"
            >
              <span className="h-2 w-2 rounded-full bg-amber-200 shadow-[0_0_14px_rgba(252,211,77,0.9)]" />
              SigilLab
            </Link>
            <div className="space-y-4">
              <p className="text-sm font-medium tracking-[0.32em] text-emerald-100/76 uppercase">
                {dictionary.monetization.premiumEyebrow}
              </p>
              <h1 className="font-heading text-5xl leading-[0.95] font-semibold text-stone-50 sm:text-6xl">
                {dictionary.monetization.premiumTitle}
              </h1>
              <p className="max-w-xl text-base leading-7 text-stone-300/82 sm:text-lg">
                {dictionary.monetization.premiumSubtitle}
              </p>
            </div>
          </div>

          <div className="space-y-4 rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(19,20,38,0.92),rgba(9,10,18,0.98))] p-5 shadow-[0_24px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-6">
            <p className="text-sm leading-7 text-stone-200/82">
              {dictionary.monetization.whyPremium}
            </p>
            <div className="grid gap-3">
              {[
                dictionary.monetization.adFreeReadings,
                dictionary.monetization.hdSigilExports,
                dictionary.monetization.priorityFutureFeatures,
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-stone-100"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f4d7a1,#d6b3ff_54%,#86d9ff)] px-5 text-sm font-semibold text-slate-950 transition hover:brightness-105"
              >
                {dictionary.monetization.monthlyCta}{" "}
                {formatPrice(config.premiumMonthlyPrice)}
              </button>
              <button
                type="button"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] px-5 text-sm font-semibold text-stone-100 transition hover:bg-white/[0.1]"
              >
                {dictionary.monetization.yearlyCta}{" "}
                {formatPrice(config.premiumYearlyPrice)}
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
