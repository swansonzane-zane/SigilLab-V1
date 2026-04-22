import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSectionCard } from "@/components/admin/admin-section-card";
import {
  getActivePromptVersion,
  getPromptVersionById,
  listPromptVersions,
} from "@/services/prompts-service";

type AdminPromptsPageProps = {
  searchParams: Promise<{
    version?: string | string[];
  }>;
};

function getSelectedVersionId(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AdminPromptsPage({
  searchParams,
}: AdminPromptsPageProps) {
  const promptVersions = listPromptVersions();
  const selectedVersionId = getSelectedVersionId((await searchParams).version);
  const activePrompt = getActivePromptVersion();
  const selectedPrompt =
    (selectedVersionId && getPromptVersionById(selectedVersionId)) ||
    activePrompt ||
    promptVersions[0];

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Prompts"
        title="Track the language driving the reading engine."
        description="Versioned prompt records now make it easier to inspect active language, compare older variants, and prepare for future editing workflows."
      />

      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <AdminSectionCard
          title="Prompt List"
          description="Available prompt versions with status and release timing."
        >
          <div className="space-y-3">
            {promptVersions.map((prompt) => {
              const isActive = prompt.status === "active";
              const isSelected = selectedPrompt?.versionId === prompt.versionId;

              return (
                <a
                  key={prompt.versionId}
                  href={`/admin/prompts?version=${prompt.versionId}`}
                  className={[
                    "block rounded-2xl border px-4 py-4 transition",
                    isSelected
                      ? "border-amber-200/30 bg-amber-100/8"
                      : "border-white/8 bg-white/[0.03] hover:border-white/16 hover:bg-white/[0.05]",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-stone-100">
                      {prompt.name}
                    </p>
                    <span
                      className={[
                        "rounded-full px-3 py-1 text-[11px] tracking-[0.22em] uppercase",
                        isActive
                          ? "border border-emerald-300/25 bg-emerald-300/10 text-emerald-100"
                          : "border border-white/10 bg-white/[0.04] text-stone-300/65",
                      ].join(" ")}
                    >
                      {prompt.status}
                    </span>
                  </div>
                  <div className="mt-3 grid gap-2 text-sm text-stone-300/76 sm:grid-cols-2">
                    <p>
                      <span className="text-stone-300/52">Version:</span>{" "}
                      {prompt.versionId}
                    </p>
                    <p>
                      <span className="text-stone-300/52">Created:</span>{" "}
                      {prompt.createdAt}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </AdminSectionCard>

        <AdminSectionCard
          title="Prompt Detail"
          description="Read-only detail view for the currently selected prompt version."
        >
          {selectedPrompt ? (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-heading text-3xl text-stone-50">
                  {selectedPrompt.name}
                </h2>
                {selectedPrompt.status === "active" ? (
                  <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-[11px] tracking-[0.24em] text-emerald-100 uppercase">
                    Active Prompt
                  </span>
                ) : null}
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <p className="text-[11px] tracking-[0.22em] text-stone-300/55 uppercase">
                  System Prompt
                </p>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-stone-200/84">
                  {selectedPrompt.systemPrompt}
                </p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <p className="text-[11px] tracking-[0.22em] text-stone-300/55 uppercase">
                  User Prompt Template
                </p>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-stone-200/84">
                  {selectedPrompt.userPromptTemplate}
                </p>
              </div>
            </div>
          ) : null}
        </AdminSectionCard>
      </div>
    </div>
  );
}
