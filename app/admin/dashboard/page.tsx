import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSectionCard } from "@/components/admin/admin-section-card";
import { AdminStatCard } from "@/components/admin/admin-stat-card";

const stats = [
  {
    label: "Readings Today",
    value: "128",
    note: "Mock operations window holding steady across current signal traffic.",
  },
  {
    label: "Fallback Rate",
    value: "18%",
    note: "Requests settling into mock mode whenever provider confidence drops.",
  },
  {
    label: "Prompt Variants",
    value: "06",
    note: "Active emotional prompt shapes available for later tuning.",
  },
  {
    label: "Open Flags",
    value: "03",
    note: "Recent anomalies worth reviewing before widening the reading surface.",
  },
] as const;

const activity = [
  "DeepSeek fallback volume rose during the last reading window.",
  "Share-card traffic concentrated around clarity and healing readings.",
  "Prompt review queue contains two tone-alignment checks.",
  "No blocking config drift detected in the current mock environment.",
] as const;

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Dashboard"
        title="Monitor the reading surface."
        description="A compact control view for how SigilLab is behaving right now, with enough density to support future operations without introducing backend complexity yet."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <AdminStatCard key={stat.label} {...stat} />
        ))}
      </section>

      <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <AdminSectionCard
          title="Recent Activity"
          description="Latest platform signals and operator-facing notes."
        >
          <div className="space-y-3">
            {activity.map((item) => (
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
          title="Recent Exceptions"
          description="Placeholder for provider alerts and prompt quality concerns."
        >
          <div className="space-y-3">
            {[
              "Fallback spike beyond normal evening baseline.",
              "Prompt output too diffuse for one focus-intent draft.",
              "Share card copy pending editorial review.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-amber-200/14 bg-amber-100/6 px-4 py-3 text-sm leading-6 text-amber-50/88"
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
