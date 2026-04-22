import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSectionCard } from "@/components/admin/admin-section-card";
import {
  getReadingRecordById,
  listReadingRecords,
} from "@/services/readings-service";

type AdminReadingsPageProps = {
  searchParams: Promise<{
    record?: string | string[];
  }>;
};

function getSelectedRecordId(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AdminReadingsPage({
  searchParams,
}: AdminReadingsPageProps) {
  const records = await listReadingRecords();
  const selectedRecordId = getSelectedRecordId((await searchParams).record);
  const selectedRecord =
    (selectedRecordId && (await getReadingRecordById(selectedRecordId))) ||
    records[0];

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Readings"
        title="Survey recent reading traffic."
        description="Structured reading records now surface timing, provider behavior, fallback posture, and emotional metadata in one operator-friendly view."
      />

      <div className="grid gap-5 xl:grid-cols-[1.25fr_0.95fr]">
        <AdminSectionCard
          title="Reading Records"
          description="Persisted reading records with live provider and fallback detail."
        >
          <div className="space-y-3">
            {records.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/12 bg-white/[0.02] px-4 py-8 text-sm text-stone-300/72">
                No reading records yet. Generate a reading from the homepage to
                create the first persisted entry.
              </div>
            ) : null}
            {records.map((record) => {
              const isSelected = selectedRecord?.id === record.id;
              const statusTone =
                record.status === "success"
                  ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-100"
                  : record.status === "fallback"
                    ? "border-amber-300/25 bg-amber-300/10 text-amber-100"
                    : "border-rose-300/25 bg-rose-300/10 text-rose-100";

              return (
                <a
                  key={record.id}
                  href={`/admin/readings?record=${record.id}`}
                  className={[
                    "grid gap-3 rounded-2xl border px-4 py-4 text-sm transition sm:grid-cols-[1.05fr_0.7fr_0.9fr_0.7fr_1.1fr_0.55fr]",
                    isSelected
                      ? "border-amber-200/30 bg-amber-100/8 text-stone-100"
                      : "border-white/8 bg-white/[0.03] text-stone-200/82 hover:border-white/16 hover:bg-white/[0.05]",
                  ].join(" ")}
                >
                  <div>
                    <p className="text-[11px] tracking-[0.22em] text-stone-300/55 uppercase">
                      Created
                    </p>
                    <p className="mt-1">{record.createdAt}</p>
                  </div>
                  <div>
                    <p className="text-[11px] tracking-[0.22em] text-stone-300/55 uppercase">
                      Intent
                    </p>
                    <p className="mt-1 capitalize">{record.intent}</p>
                  </div>
                  <div>
                    <p className="text-[11px] tracking-[0.22em] text-stone-300/55 uppercase">
                      Language
                    </p>
                    <p className="mt-1 uppercase">{record.language}</p>
                  </div>
                  <div>
                    <p className="text-[11px] tracking-[0.22em] text-stone-300/55 uppercase">
                      Status
                    </p>
                    <p className="mt-1">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-[11px] tracking-[0.18em] uppercase ${statusTone}`}
                      >
                        {record.status}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] tracking-[0.22em] text-stone-300/55 uppercase">
                      Provider / Model
                    </p>
                    <p className="mt-1">
                      {record.provider} / {record.model}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] tracking-[0.22em] text-stone-300/55 uppercase">
                      Total Latency
                    </p>
                    <p className="mt-1">{record.totalLatencyMs}ms</p>
                  </div>
                  <div className="sm:col-span-full">
                    <p className="text-[11px] tracking-[0.22em] text-stone-300/55 uppercase">
                      Title
                    </p>
                    <p className="mt-1 text-stone-100">{record.title}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </AdminSectionCard>

        <AdminSectionCard
          title="Record Detail"
          description="Selected reading detail for quality review and provider tracing."
        >
          {selectedRecord ? (
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <p className="text-[11px] tracking-[0.28em] text-stone-300/55 uppercase">
                  {selectedRecord.id}
                </p>
                <h2 className="mt-3 font-heading text-3xl text-stone-50">
                  {selectedRecord.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-stone-300/80">
                  {selectedRecord.insight}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["Birth Year", String(selectedRecord.birthYear)],
                  ["Age Band", selectedRecord.ageBand],
                  ["Western Zodiac", selectedRecord.westernZodiac],
                  ["Intent", selectedRecord.intent],
                  ["Status", selectedRecord.status],
                  ["Emotional State", selectedRecord.emotionalState],
                  [
                    "Emotional Intensity",
                    `${selectedRecord.emotionalIntensity}/10`,
                  ],
                  ["Fallback", selectedRecord.fallback ? "Yes" : "No"],
                  [
                    "Fallback Reason",
                    selectedRecord.fallbackReason || "None",
                  ],
                  ["Error Reason", selectedRecord.errorReason || "None"],
                  [
                    "Provider Response",
                    selectedRecord.providerResponseMs
                      ? `${selectedRecord.providerResponseMs}ms`
                      : "N/A",
                  ],
                  ["Total Latency", `${selectedRecord.totalLatencyMs}ms`],
                  [
                    "Provider / Model",
                    `${selectedRecord.provider} / ${selectedRecord.model}`,
                  ],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/8 bg-black/12 px-4 py-3"
                  >
                    <p className="text-[11px] tracking-[0.22em] text-stone-300/55 uppercase">
                      {label}
                    </p>
                    <p className="mt-1 text-sm text-stone-100">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/12 bg-white/[0.02] p-5 text-sm leading-7 text-stone-300/72">
              Select a record once readings have been generated. This panel will
              show the persisted insight, emotional markers, and provider trace.
            </div>
          )}
        </AdminSectionCard>
      </div>
    </div>
  );
}
