import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSectionCard } from "@/components/admin/admin-section-card";

const providers = [
  {
    name: "DeepSeek",
    mode: "Primary",
    note: "Current first-pass reading source when credentials are available.",
  },
  {
    name: "Mock Engine",
    mode: "Fallback",
    note: "Stable backup path for missing keys, malformed JSON, or request failures.",
  },
] as const;

export default function AdminAiProvidersPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="AI Providers"
        title="Observe model routing without touching backend plumbing."
        description="A minimal control view for provider posture, fallback behavior, and future runtime notes."
      />

      <AdminSectionCard
        title="Provider Status"
        description="Current sources available to the reading flow."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {providers.map((provider) => (
            <article
              key={provider.name}
              className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5"
            >
              <p className="text-[11px] tracking-[0.28em] text-stone-300/55 uppercase">
                {provider.mode}
              </p>
              <h2 className="mt-3 font-heading text-3xl text-stone-50">
                {provider.name}
              </h2>
              <p className="mt-3 text-sm leading-6 text-stone-300/76">
                {provider.note}
              </p>
            </article>
          ))}
        </div>
      </AdminSectionCard>
    </div>
  );
}
