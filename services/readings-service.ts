import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import type { ReadingRecord } from "@/types/admin";
import type { ReadingGenerationMeta, ReadingInput, ReadingOutput } from "@/types/reading";

const dataDir = path.join(process.cwd(), "data");
const readingsFilePath = path.join(dataDir, "readings.json");

function isRecordArray(value: unknown): value is ReadingRecord[] {
  return Array.isArray(value);
}

async function ensureReadingsFile() {
  await mkdir(dataDir, { recursive: true });

  try {
    await readFile(readingsFilePath, "utf-8");
  } catch {
    await writeFile(readingsFilePath, "[]\n", "utf-8");
  }
}

function deriveEmotionalState(input: ReadingInput, output: ReadingOutput) {
  const byIntent: Record<ReadingInput["intent"], string> = {
    clarity: "Clearing and alert",
    healing: "Tender but ready",
    focus: "Concentrated",
    balance: "Re-centering",
    release: "Loosening",
    openness: "Receptive",
  };

  if (output.punchline.toLowerCase().includes("soft")) {
    return "Softening";
  }

  return byIntent[input.intent];
}

function deriveEmotionalIntensity(input: ReadingInput, output: ReadingOutput) {
  const byIntent: Record<ReadingInput["intent"], number> = {
    clarity: 6,
    healing: 7,
    focus: 8,
    balance: 6,
    release: 5,
    openness: 7,
  };

  const bonus = output.punchline.includes("!") ? 1 : 0;

  return Math.min(10, byIntent[input.intent] + bonus);
}

function normalizeReadingRecord(record: ReadingRecord): ReadingRecord {
  return {
    ...record,
    status: record.status || (record.fallback ? "fallback" : "success"),
    errorReason: record.errorReason ?? null,
    fallbackReason: record.fallbackReason ?? null,
    providerResponseMs: record.providerResponseMs ?? null,
    totalLatencyMs:
      record.totalLatencyMs ??
      ("latencyMs" in record && typeof (record as { latencyMs?: unknown }).latencyMs === "number"
        ? ((record as { latencyMs: number }).latencyMs)
        : 0),
  };
}

export async function listReadingRecords(): Promise<ReadingRecord[]> {
  await ensureReadingsFile();

  const fileContents = await readFile(readingsFilePath, "utf-8");
  const trimmed = fileContents.trim();

  if (!trimmed) {
    return [];
  }

  try {
    const parsed = JSON.parse(trimmed) as unknown;

    return isRecordArray(parsed) ? parsed.map(normalizeReadingRecord) : [];
  } catch {
    return [];
  }
}

export async function getReadingRecordById(
  id: string,
): Promise<ReadingRecord | undefined> {
  const records = await listReadingRecords();

  return records.find((record) => record.id === id);
}

export async function createReadingRecord(params: {
  input: ReadingInput;
  output: ReadingOutput;
  meta: ReadingGenerationMeta;
}): Promise<ReadingRecord> {
  const records = await listReadingRecords();
  const record: ReadingRecord = {
    id: `rdg_${Date.now()}`,
    createdAt: new Date().toISOString(),
    birthYear: params.input.birthYear,
    ageBand: params.input.ageBand,
    westernZodiac: params.input.westernZodiac,
    intent: params.input.intent,
    language: params.input.language,
    provider: params.meta.provider,
    model: params.meta.model,
    status: params.meta.status,
    fallback: params.meta.fallback,
    errorReason: params.meta.errorReason,
    fallbackReason: params.meta.fallbackReason,
    providerResponseMs: params.meta.providerResponseMs,
    totalLatencyMs: params.meta.totalLatencyMs,
    title: params.output.title,
    insight: params.output.insight,
    emotionalState: deriveEmotionalState(params.input, params.output),
    emotionalIntensity: deriveEmotionalIntensity(params.input, params.output),
  };

  const nextRecords = [record, ...records];

  await writeFile(
    readingsFilePath,
    `${JSON.stringify(nextRecords, null, 2)}\n`,
    "utf-8",
  );

  return record;
}
