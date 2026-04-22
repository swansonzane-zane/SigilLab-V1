import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSectionCard } from "@/components/admin/admin-section-card";
import { getAppConfig } from "@/services/configs-service";

export default function AdminConfigsPage() {
  const config = getAppConfig();

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Configs"
        title="Keep operational defaults visible."
        description="This configuration center exposes the current app defaults in a structured, read-only format so future editing can slot into a stable interface."
      />

      <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <AdminSectionCard
          title="Config Surface"
          description="Core application switches and defaults represented as future-ready control rows."
        >
          <div className="space-y-3">
            {[
              {
                key: "defaultLanguage",
                label: "Default Language",
                value: config.defaultLanguage.toUpperCase(),
                state: "Locale",
              },
              {
                key: "enableShare",
                label: "Enable Share",
                value: config.enableShare ? "On" : "Off",
                state: "Feature",
              },
              {
                key: "enableFallback",
                label: "Enable Fallback",
                value: config.enableFallback ? "On" : "Off",
                state: "Safety",
              },
              {
                key: "enablePremiumPlaceholder",
                label: "Enable Premium Placeholder",
                value: config.enablePremiumPlaceholder ? "On" : "Off",
                state: "Feature",
              },
              {
                key: "maxJournalPrompts",
                label: "Max Journal Prompts",
                value: String(config.maxJournalPrompts),
                state: "Limit",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="grid gap-2 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm text-stone-200/82 sm:grid-cols-[1.2fr_0.8fr_auto]"
              >
                <div>
                  <p className="text-[11px] tracking-[0.22em] text-stone-300/55 uppercase">
                    {item.label}
                  </p>
                  <p className="mt-1 text-stone-100">{item.value}</p>
                </div>
                <div className="self-center text-stone-300/72">
                  Read-only default
                </div>
                <p className="self-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] tracking-[0.22em] text-stone-200/76 uppercase">
                  {item.state}
                </p>
              </div>
            ))}
          </div>
        </AdminSectionCard>

        <AdminSectionCard
          title="Edit Readiness"
          description="A panelized view that hints at future edit controls without enabling writes yet."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Language Default",
                note: "Prepared for future locale switching and rollout logic.",
              },
              {
                title: "Feature Switches",
                note: "Share, fallback, and premium placeholders are separated into clean boolean controls.",
              },
              {
                title: "Prompt Limits",
                note: "Journal prompt count is isolated as a simple numeric knob.",
              },
              {
                title: "Save Path",
                note: "Write actions are intentionally disabled in this phase.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-[1.5rem] border border-white/10 bg-black/14 p-4"
              >
                <p className="font-medium text-stone-100">{card.title}</p>
                <p className="mt-2 text-sm leading-6 text-stone-300/74">
                  {card.note}
                </p>
              </div>
            ))}
          </div>
        </AdminSectionCard>
      </div>
    </div>
  );
}
