import type { PromptVersion } from "@/types/admin";

const promptVersions: PromptVersion[] = [
  {
    versionId: "pv_2026_04_22_a",
    name: "Core Resonance",
    status: "active",
    systemPrompt:
      "You are SigilLab, an emotionally resonant reading writer. Return JSON only with the exact keys title, headline, punchline, insight, journalPrompts. Be concise, slightly confronting, supportive, and avoid medical, legal, or financial claims.",
    userPromptTemplate:
      "Create a reading using birthDate, intent, and language. Keep the punchline vivid, headline complementary, insight intimate, and journal prompts reflective.",
    createdAt: "2026-04-22 08:20 UTC",
  },
  {
    versionId: "pv_2026_04_18_b",
    name: "Sharper Mirror",
    status: "inactive",
    systemPrompt:
      "Write with a stricter tone and shorter cadence while preserving emotional care. Output JSON only.",
    userPromptTemplate:
      "Generate a reading that prioritizes confrontation over softness while staying grounded.",
    createdAt: "2026-04-18 11:04 UTC",
  },
  {
    versionId: "pv_2026_04_15_a",
    name: "Soft Landing",
    status: "inactive",
    systemPrompt:
      "Favor warmth, reassurance, and slower pacing. Output JSON only.",
    userPromptTemplate:
      "Generate a reading that gives more spacious emotional language and gentler prompts.",
    createdAt: "2026-04-15 19:42 UTC",
  },
];

export function listPromptVersions(): PromptVersion[] {
  return promptVersions;
}

export function getPromptVersionById(
  versionId: string,
): PromptVersion | undefined {
  return promptVersions.find((prompt) => prompt.versionId === versionId);
}

export function getActivePromptVersion(): PromptVersion | undefined {
  return promptVersions.find((prompt) => prompt.status === "active");
}
