import { AdminMeterList } from "@/components/admin/admin-meter-list";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSectionCard } from "@/components/admin/admin-section-card";
import { AdminStatCard } from "@/components/admin/admin-stat-card";
import { getMetricsSnapshot } from "@/services/metrics-service";

export default function AdminDashboardPage() {
  const metrics = getMetricsSnapshot();

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Dashboard"
        title="Monitor the reading surface."
        description="This observability board tracks reading volume, reliability, fallback posture, latency, and the distribution of intent and language signals."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          label="Daily Readings"
          value={String(metrics.dailyReadings)}
          note="Current day volume across all reading requests."
        />
        <AdminStatCard
          label="Success Rate"
          value={`${metrics.successRate}%`}
          note="Share of requests that resolved without hitting the fallback path."
        />
        <AdminStatCard
          label="Fallback Rate"
          value={`${metrics.fallbackRate}%`}
          note="Current fallback posture when provider output fails or is unavailable."
        />
        <AdminStatCard
          label="Average Latency"
          value={`${metrics.averageLatencyMs}ms`}
          note="Mean reading response time across the current metrics window."
        />
      </section>

      <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <AdminSectionCard
          title="Top Intents"
          description="Most requested emotional intents in the current snapshot."
        >
          <AdminMeterList
            title="Intent Demand"
            description="A quick visual ranking of what users are currently seeking."
            items={metrics.topIntents.map((item) => ({
              label: item.intent,
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
            description="Read distribution by currently supported locale buckets."
            items={metrics.languageDistribution.map((item) => ({
              label: item.language,
              value: item.count,
            }))}
          />
        </AdminSectionCard>
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <AdminSectionCard
          title="Performance Snapshot"
          description="A compact readout of how the reading pipeline is behaving."
        >
          <div className="space-y-3">
            {[
              `Success posture is holding at ${metrics.successRate}% across the latest metrics window.`,
              `Fallback behavior currently accounts for ${metrics.fallbackRate}% of readings.`,
              `Average latency is ${metrics.averageLatencyMs}ms, keeping the ritual flow responsive.`,
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
          title="Operational Notes"
          description="Mock board annotations that help the page feel like an actual control surface."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Clarity remains the leading intent, so prompt sharpness should stay under review.",
              "Spanish exists as a config target but remains a smaller traffic band.",
              "Fallback remains enabled to protect the front-end result flow.",
              "Share remains active, aligning with the current product propagation push.",
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
