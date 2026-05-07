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
  try {
    await mkdir(dataDir, { recursive: true });
    const content = await readFile(sharesFilePath, "utf-8");

    if (!content.trim()) {
      try {
        await writeFile(sharesFilePath, "[]\n", "utf-8");
      } catch {
        return;
      }
    }
  } catch {
    try {
      await writeFile(sharesFilePath, "[]\n", "utf-8");
    } catch {
      return;
    }
  }
}

function buildShareId() {
  return `shr_${randomBytes(4).toString("hex")}`;
}

function normalizeShareRecord(record: ShareRecord): ShareRecord {
  return {
    ...record,
    title: record.title || "SigilLab",
    headline: record.headline || "A threshold is opening where old static used to rule.",
    punchline:
      record.punchline ||
      "Your signal is asking for honesty before motion and softness before proof.",
    ritualPhrase:
      record.ritualPhrase || "The seal turns when stillness meets intent.",
    subtext:
      record.subtext ||
      "Hold this reading like a private omen: intimate, luminous, and clear enough to carry into the next conversation you cannot avoid.",
    hashtags: Array.isArray(record.hashtags) ? record.hashtags : [],
    ctaText: record.ctaText || "Generate Your Own Signal",
    ctaHref: record.ctaHref || "/",
    sigilSpec: record.sigilSpec || {
      intentLabel: record.intent || "clarity",
      zodiac: record.zodiac,
      titleSeed: record.title || "SigilLab",
      headlineSeed:
        record.headline || "A threshold is opening where old static used to rule.",
    },
    language: record.language || "en",
  };
}

export async function listShareRecords(): Promise<ShareRecord[]> {
  await ensureSharesFile();
  let fileContents: string;

  try {
    fileContents = await readFile(sharesFilePath, "utf-8");
  } catch {
    return [];
  }

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

  try {
    await ensureSharesFile();
    await writeFile(
      sharesFilePath,
      `${JSON.stringify([record, ...records], null, 2)}\n`,
      "utf-8",
    );
  } catch {
    return record;
  }

  return record;
}
