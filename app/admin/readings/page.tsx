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
  const records = listReadingRecords();
  const selectedRecordId = getSelectedRecordId((await searchParams).record);
  const selectedRecord =
    (selectedRecordId && getReadingRecordById(selectedRecordId)) || records[0];

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
          description="List view with quick operational details and direct selection into the record panel."
        >
          <div className="space-y-3">
            {records.map((record) => {
              const isSelected = selectedRecord?.id === record.id;

              return (
                <a
                  key={record.id}
                  href={`/admin/readings?record=${record.id}`}
                  className={[
                    "grid gap-3 rounded-2xl border px-4 py-4 text-sm transition sm:grid-cols-[1.05fr_0.7fr_0.95fr_0.55fr_1.1fr_0.45fr]",
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
                      Fallback
                    </p>
                    <p className="mt-1">{record.fallback ? "Yes" : "No"}</p>
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
                      Latency
                    </p>
                    <p className="mt-1">{record.latencyMs}ms</p>
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
                  ["Emotional State", selectedRecord.emotionalState],
                  [
                    "Emotional Intensity",
                    `${selectedRecord.emotionalIntensity}/10`,
                  ],
                  ["Fallback", selectedRecord.fallback ? "Yes" : "No"],
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
          ) : null}
        </AdminSectionCard>
      </div>
    </div>
  );
}
