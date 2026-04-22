import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSectionCard } from "@/components/admin/admin-section-card";
import {
  getEnabledAIProviders,
  listAIProviderConfigs,
} from "@/services/ai-providers-service";

export default function AdminAiProvidersPage() {
  const providers = listAIProviderConfigs();
  const enabledProviders = getEnabledAIProviders();

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="AI Providers"
        title="Observe model routing without touching backend plumbing."
        description="Provider configuration is now mapped into a readable operations view, including routing posture, connection surface, and masked credential state."
      />

      <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <AdminSectionCard
          title="Provider Configs"
          description="Current provider entries and the connection shape the app expects."
        >
          <div className="space-y-3">
            {providers.map((provider) => (
              <article
                key={provider.id}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] tracking-[0.28em] text-stone-300/55 uppercase">
                      {provider.type}
                    </p>
                    <h2 className="mt-2 font-heading text-3xl text-stone-50">
                      {provider.name}
                    </h2>
                  </div>
                  <span
                    className={[
                      "rounded-full px-3 py-1 text-[11px] tracking-[0.22em] uppercase",
                      provider.enabled
                        ? "border border-emerald-300/25 bg-emerald-300/10 text-emerald-100"
                        : "border border-white/10 bg-white/[0.04] text-stone-300/65",
                    ].join(" ")}
                  >
                    {provider.enabled ? "Enabled" : "Disabled"}
                  </span>
                </div>
                <div className="mt-4 grid gap-3 text-sm text-stone-300/78 sm:grid-cols-2">
                  <p>
                    <span className="text-stone-300/52">Base URL:</span>{" "}
                    {provider.baseUrl}
                  </p>
                  <p>
                    <span className="text-stone-300/52">Model:</span>{" "}
                    {provider.model}
                  </p>
                  <p>
                    <span className="text-stone-300/52">Provider ID:</span>{" "}
                    {provider.id}
                  </p>
                  <p>
                    <span className="text-stone-300/52">API Key:</span>{" "}
                    {provider.apiKeyMasked}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </AdminSectionCard>

        <AdminSectionCard
          title="Enabled Surface"
          description="Providers currently available to runtime routing."
        >
          <div className="space-y-3">
            {enabledProviders.map((provider) => (
              <div
                key={provider.id}
                className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4"
              >
                <p className="text-sm font-medium text-stone-100">
                  {provider.name}
                </p>
                <p className="mt-2 text-sm leading-6 text-stone-300/76">
                  {provider.type} provider using <span className="text-stone-100">{provider.model}</span> at{" "}
                  <span className="text-stone-100">{provider.baseUrl}</span>.
                </p>
              </div>
            ))}
          </div>
        </AdminSectionCard>
      </div>
    </div>
  );
}
