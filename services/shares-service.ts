import { randomBytes } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { createShareRecordPayload } from "@/engine/share-model";
import type { ShareRecord, ShareSeedInput } from "@/types/share";

const dataDir = path.join(process.cwd(), "data");
const sharesFilePath = path.join(dataDir, "shares.json");

function isShareRecordArray(value: unknown): value is ShareRecord[] {
  return Array.isArray(value);
}

async function ensureSharesFile() {
  await mkdir(dataDir, { recursive: true });

  try {
    const content = await readFile(sharesFilePath, "utf-8");

    if (!content.trim()) {
      await writeFile(sharesFilePath, "[]\n", "utf-8");
    }
  } catch {
    await writeFile(sharesFilePath, "[]\n", "utf-8");
  }
}

function buildShareId() {
  return `shr_${randomBytes(4).toString("hex")}`;
}

function normalizeShareRecord(record: ShareRecord): ShareRecord {
  return {
    ...record,
    title: record.title || "SigilLab",
    hashtags: Array.isArray(record.hashtags) ? record.hashtags : [],
    ctaText: record.ctaText || "Generate Your Own Signal",
    ctaHref: record.ctaHref || "/",
    sigilSpec: record.sigilSpec || { intentLabel: "share" },
    language: record.language || "en",
  };
}

export async function listShareRecords(): Promise<ShareRecord[]> {
  await ensureSharesFile();
  const fileContents = await readFile(sharesFilePath, "utf-8");
  const trimmed = fileContents.trim();

  if (!trimmed) {
    return [];
  }

  try {
    const parsed = JSON.parse(trimmed) as unknown;
    return isShareRecordArray(parsed) ? parsed.map(normalizeShareRecord) : [];
  } catch {
    return [];
  }
}

export async function getShareRecordById(
  shareId: string,
): Promise<ShareRecord | undefined> {
  const records = await listShareRecords();
  return records.find((record) => record.shareId === shareId);
}

export async function createShareRecord(seed?: ShareSeedInput): Promise<ShareRecord> {
  const records = await listShareRecords();
  const payload = createShareRecordPayload(seed);
  const record: ShareRecord = {
    shareId: buildShareId(),
    createdAt: new Date().toISOString(),
    ...payload,
  };

  await writeFile(
    sharesFilePath,
    `${JSON.stringify([record, ...records], null, 2)}\n`,
    "utf-8",
  );

  return record;
}
