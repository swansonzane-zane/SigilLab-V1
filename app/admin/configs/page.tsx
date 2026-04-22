import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSectionCard } from "@/components/admin/admin-section-card";

const configRows = [
  ["Reading language default", "en", "Active"],
  ["DeepSeek model default", "deepseek-chat", "Observed"],
  ["Share CTA target", "/", "Active"],
  ["Fallback date seed", "1992-03-14", "Active"],
] as const;

export default function AdminConfigsPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Configs"
        title="Keep operational defaults visible."
        description="A placeholder configuration surface for core knobs, safe defaults, and future environment visibility."
      />

      <AdminSectionCard
        title="Runtime Defaults"
        description="Read-only placeholders representing the knobs the app already leans on."
      >
        <div className="space-y-3">
          {configRows.map(([key, value, state]) => (
            <div
              key={key}
              className="grid gap-2 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm text-stone-200/82 sm:grid-cols-[1.2fr_1fr_auto]"
            >
              <p>{key}</p>
              <p className="text-stone-300/76">{value}</p>
              <p className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] tracking-[0.22em] text-stone-200/76 uppercase">
                {state}
              </p>
            </div>
          ))}
        </div>
      </AdminSectionCard>
    </div>
  );
}
