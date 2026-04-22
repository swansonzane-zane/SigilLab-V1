import { AdminConfigsEditor } from "@/components/admin/admin-configs-editor";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSectionCard } from "@/components/admin/admin-section-card";
import { getAppConfig } from "@/services/configs-service";

export default async function AdminConfigsPage() {
  const config = await getAppConfig();

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
          description="Editable control surface for the small set of runtime defaults currently wired into the app."
        >
          <AdminConfigsEditor config={config} />
        </AdminSectionCard>

        <AdminSectionCard
          title="Edit Readiness"
          description="A compact summary of which config switches now have real behavioral impact."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Language Default",
                note: "Now drives homepage submission and result defaults when language is not specified.",
              },
              {
                title: "Feature Switches",
                note: "Share visibility and fallback behavior are now wired into the live front-end flow.",
              },
              {
                title: "Prompt Limits",
                note: "Journal prompts on the result page are capped by the saved config value.",
              },
              {
                title: "Save Path",
                note: "Writes now persist to the local JSON config file without introducing a database.",
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
