import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSectionCard } from "@/components/admin/admin-section-card";

const readingRows = [
  ["healing", "1993-04-16", "deepseek", "stable"],
  ["clarity", "1992-03-14", "mock", "fallback"],
  ["focus", "1988-11-02", "deepseek", "review"],
  ["release", "1996-06-28", "mock", "stable"],
] as const;

export default function AdminReadingsPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Readings"
        title="Survey recent reading traffic."
        description="A placeholder operations table for future reading records, signal trends, and moderation touchpoints."
      />

      <AdminSectionCard
        title="Reading Queue"
        description="Latest reading snapshots with intent, source, and current review posture."
      >
        <div className="space-y-3">
          {readingRows.map(([intent, birthDate, source, status]) => (
            <div
              key={`${intent}-${birthDate}`}
              className="grid gap-2 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm text-stone-200/82 sm:grid-cols-4"
            >
              <div>
                <p className="text-[11px] tracking-[0.22em] text-stone-300/55 uppercase">
                  Intent
                </p>
                <p className="mt-1 capitalize">{intent}</p>
              </div>
              <div>
                <p className="text-[11px] tracking-[0.22em] text-stone-300/55 uppercase">
                  Birth Date
                </p>
                <p className="mt-1">{birthDate}</p>
              </div>
              <div>
                <p className="text-[11px] tracking-[0.22em] text-stone-300/55 uppercase">
                  Source
                </p>
                <p className="mt-1 uppercase">{source}</p>
              </div>
              <div>
                <p className="text-[11px] tracking-[0.22em] text-stone-300/55 uppercase">
                  Status
                </p>
                <p className="mt-1 capitalize">{status}</p>
              </div>
            </div>
          ))}
        </div>
      </AdminSectionCard>
    </div>
  );
}
