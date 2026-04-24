import { AdminMeterList } from "@/components/admin/admin-meter-list";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSectionCard } from "@/components/admin/admin-section-card";
import { AdminStatCard } from "@/components/admin/admin-stat-card";
import { getMetricsSnapshot } from "@/services/metrics-service";

function formatRate(value: number) {
  return `${value.toFixed(1)}%`;
}

function formatMs(value: number) {
  return `${value.toFixed(1)}ms`;
}

export default async function AdminDashboardPage() {
  const metrics = await getMetricsSnapshot();

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Dashboard"
        title="Monitor live reading operations."
        description="Metrics below are aggregated from local reading and share records, giving an early-stage operating view that can later migrate to a warehouse-backed analytics stack."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7">
        <AdminStatCard
          label="Total Readings"
          value={String(metrics.totalReadings)}
          note="All persisted reading records currently available in local storage."
        />
        <AdminStatCard
          label="Daily Readings"
          value={String(metrics.dailyReadings)}
          note="Records created today (UTC day window) for quick activity checks."
        />
        <AdminStatCard
          label="Success Rate"
          value={formatRate(metrics.successRate)}
          note="Portion of readings that completed on the primary provider path."
        />
        <AdminStatCard
          label="Fallback Rate"
          value={formatRate(metrics.fallbackRate)}
          note="Readings served by fallback mode when primary generation could not complete."
        />
        <AdminStatCard
          label="Error Rate"
          value={formatRate(metrics.errorRate)}
          note="Requests that failed without fallback output."
        />
        <AdminStatCard
          label="Average Latency"
          value={formatMs(metrics.averageLatencyMs)}
          note="Mean end-to-end latency from request start to final output."
        />
        <AdminStatCard
          label="Share Records"
          value={String(metrics.shareCount)}
          note="Total share identities generated from the current branch flow."
        />
        <AdminStatCard
          label="Premium Visits"
          value={String(metrics.premiumVisits)}
          note="Mock v1 placeholder until premium visit tracking is connected."
        />
        <AdminStatCard
          label="Upgrade CTA Clicks"
          value={String(metrics.upgradeCtaClicks)}
          note="Mock v1 placeholder for future monetization funnel events."
        />
        <AdminStatCard
          label="Ads"
          value={metrics.adsEnabled ? "Enabled" : "Disabled"}
          note="Reflects the current admin config value for sponsored placements."
        />
      </section>

      <div className="grid gap-5 xl:grid-cols-2">
        <AdminSectionCard
          title="Top Intents"
          description="Most requested emotional intents in the current snapshot."
        >
          <AdminMeterList
            title="Intent Demand"
            description="Intent concentration from persisted readings."
            items={metrics.topIntents.map((item) => ({
              label: `${item.label} (${item.percentage.toFixed(1)}%)`,
              value: item.count,
            }))}
          />
        </AdminSectionCard>

        <AdminSectionCard
          title="Language Distribution"
          description="Current language mix observed across requests."
        >
          <AdminMeterList
            title="Language Mix"
            description="Locale distribution from real request records."
            items={metrics.languageDistribution.map((item) => ({
              label: `${item.label} (${item.percentage.toFixed(1)}%)`,
              value: item.count,
            }))}
          />
        </AdminSectionCard>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <AdminSectionCard
          title="Age Band Distribution"
          description="High-level age segment mix after privacy-safe derivation."
        >
          <AdminMeterList
            title="Age Bands"
            description="Derived age-band volume from real readings."
            items={metrics.ageBandDistribution.map((item) => ({
              label: `${item.label} (${item.percentage.toFixed(1)}%)`,
              value: item.count,
            }))}
          />
        </AdminSectionCard>

        <AdminSectionCard
          title="Zodiac Distribution"
          description="Signal volume by western zodiac field."
        >
          <AdminMeterList
            title="Zodiac Mix"
            description="Relative zodiac spread across current records."
            items={metrics.zodiacDistribution.map((item) => ({
              label: `${item.label} (${item.percentage.toFixed(1)}%)`,
              value: item.count,
            }))}
          />
        </AdminSectionCard>
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <AdminSectionCard
          title="Performance Snapshot"
          description="Current reliability and latency posture from local records."
        >
          <div className="space-y-3">
            {[
              `Success posture is ${formatRate(metrics.successRate)} with ${formatRate(metrics.errorRate)} terminal errors.`,
              `Fallback behavior currently accounts for ${formatRate(metrics.fallbackRate)} of readings.`,
              `Average total latency is ${formatMs(metrics.averageLatencyMs)} and provider response latency is ${formatMs(metrics.averageProviderResponseMs)}.`,
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-stone-200/82"
              >
                {item}
              </div>
            ))}
          </div>
        </AdminSectionCard>

        <AdminSectionCard
          title="Data Notes"
          description="Scope and interpretation guidance for this local-first dashboard."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Read metrics are aggregated directly from data/readings.json.",
              "Share volume is aggregated from data/shares.json.",
              "This board is suitable for early operator decisions on prompt, reliability, and traffic mix.",
              "The same metric interfaces can be redirected to a database or warehouse later.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/8 bg-black/14 px-4 py-4 text-sm leading-6 text-stone-300/78"
              >
                {item}
              </div>
            ))}
          </div>
        </AdminSectionCard>
      </div>
    </div>
  );
}
