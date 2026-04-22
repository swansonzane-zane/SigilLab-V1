import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSectionCard } from "@/components/admin/admin-section-card";

const promptGroups = [
  {
    title: "System Prompt",
    body: "Sets the overall tone guardrails, JSON shape, and safety posture for readings.",
  },
  {
    title: "User Prompt",
    body: "Injects intent, birth date, language, and content style requirements into the request.",
  },
  {
    title: "Editorial Review",
    body: "Placeholder for future notes on sharpness, empathy, and overclaim risk.",
  },
] as const;

export default function AdminPromptsPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Prompts"
        title="Track the language driving the reading engine."
        description="A scaffold for prompt inventory, tone review, and future version comparisons."
      />

      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <AdminSectionCard
          title="Prompt List"
          description="Core prompt surfaces that shape reading output."
        >
          <div className="space-y-3">
            {promptGroups.map((group) => (
              <div
                key={group.title}
                className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4"
              >
                <p className="text-sm font-medium text-stone-100">
                  {group.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-stone-300/76">
                  {group.body}
                </p>
              </div>
            ))}
          </div>
        </AdminSectionCard>

        <AdminSectionCard
          title="Prompt Detail"
          description="Reserved for a deeper editor, diff, and validation view."
        >
          <div className="rounded-2xl border border-dashed border-white/12 bg-black/10 p-5 text-sm leading-7 text-stone-300/72">
            Detailed prompt content, revision history, and testing notes will
            anchor here once the admin surface begins handling real edits.
          </div>
        </AdminSectionCard>
      </div>
    </div>
  );
}
