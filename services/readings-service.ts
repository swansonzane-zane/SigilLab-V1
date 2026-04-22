import type { ReadingRecord } from "@/types/admin";

const readingRecords: ReadingRecord[] = [
  {
    id: "rdg_001",
    createdAt: "2026-04-22 09:12 UTC",
    birthDate: "1993-04-16",
    intent: "healing",
    language: "en",
    provider: "deepseek",
    model: "deepseek-chat",
    fallback: false,
    title: "Healing Signal",
    insight:
      "A gentler honesty is surfacing. The reading suggests recovery begins when the user stops negotiating with the feeling they already know is present.",
    emotionalState: "Tender but ready",
    emotionalIntensity: 7,
    latencyMs: 1820,
  },
  {
    id: "rdg_002",
    createdAt: "2026-04-22 08:46 UTC",
    birthDate: "1992-03-14",
    intent: "clarity",
    language: "en",
    provider: "mock",
    model: "mock-reading-engine",
    fallback: true,
    title: "Clarity Signal",
    insight:
      "The user appears to be at the edge of a naming moment. The reading favors precision over comfort and invites one difficult truth to be spoken plainly.",
    emotionalState: "Fog lifting",
    emotionalIntensity: 6,
    latencyMs: 42,
  },
  {
    id: "rdg_003",
    createdAt: "2026-04-22 07:58 UTC",
    birthDate: "1988-11-02",
    intent: "focus",
    language: "en",
    provider: "deepseek",
    model: "deepseek-chat",
    fallback: false,
    title: "Focus Signal",
    insight:
      "This reading narrows attention around a single unfinished commitment. The emotional charge is concentrated, deliberate, and better served by discipline than speed.",
    emotionalState: "Concentrated",
    emotionalIntensity: 8,
    latencyMs: 1640,
  },
  {
    id: "rdg_004",
    createdAt: "2026-04-22 07:14 UTC",
    birthDate: "1996-06-28",
    intent: "release",
    language: "en",
    provider: "mock",
    model: "mock-reading-engine",
    fallback: true,
    title: "Release Signal",
    insight:
      "The tone here points toward loosening outdated urgency. The user is likely carrying an obligation that has already finished teaching what it came to teach.",
    emotionalState: "Loosening",
    emotionalIntensity: 5,
    latencyMs: 39,
  },
];

export function listReadingRecords(): ReadingRecord[] {
  return readingRecords;
}

export function getReadingRecordById(id: string): ReadingRecord | undefined {
  return readingRecords.find((record) => record.id === id);
}
