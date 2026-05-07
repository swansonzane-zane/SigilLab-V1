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
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(176,141,87,0.16),_transparent_24%),radial-gradient(circle_at_82%_18%,_rgba(122,31,23,0.16),_transparent_20%),linear-gradient(180deg,#15100c,#050403)]"
      />
      <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-5 py-10 sm:px-8 lg:px-12">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="space-y-6">
            <Link
              href={`/?${new URLSearchParams({ language }).toString()}`}
              className="inline-flex items-center gap-3 border border-[#b08d57]/24 bg-[#23150f]/72 px-4 py-2 text-sm tracking-[0.12em] text-[#d8bd82] backdrop-blur"
            >
              <span className="h-2.5 w-2.5 rounded-sm bg-[#7a1b14]" />
              SigilLab
            </Link>
            <div className="space-y-4">
              <p className="text-sm font-medium tracking-[0.14em] text-[#bba16e]/74">
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

          <div className="space-y-4 rounded-[1.4rem] border border-[#80623c]/24 bg-[linear-gradient(180deg,rgba(30,19,13,0.94),rgba(8,6,5,0.98))] p-5 shadow-[0_24px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-6">
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
                  className="rounded-xl border border-[#80623c]/22 bg-[#120b08]/56 px-4 py-3 text-sm font-medium text-stone-100"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                className="inline-flex min-h-12 items-center justify-center rounded-sm bg-[linear-gradient(135deg,#9d2b20,#6f1711_54%,#2a1711)] px-5 text-sm font-semibold text-[#fff4d6] transition hover:brightness-110"
              >
                {dictionary.monetization.monthlyCta}{" "}
                {formatPrice(config.premiumMonthlyPrice)}
              </button>
              <button
                type="button"
                className="inline-flex min-h-12 items-center justify-center rounded-sm border border-[#80623c]/28 bg-[#120b08]/72 px-5 text-sm font-semibold text-stone-100 transition hover:bg-white/[0.08]"
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
