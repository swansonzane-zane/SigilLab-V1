import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import type { PromptVersion } from "@/types/admin";

const dataDir = path.join(process.cwd(), "data");
const promptsFilePath = path.join(dataDir, "prompts.json");

const defaultPromptVersions: PromptVersion[] = [
  {
    versionId: "pv_2026_04_22_a",
    name: "Core Resonance",
    status: "active",
    systemPrompt:
      "You are SigilLab, an emotionally resonant reading writer. Return JSON only with the exact keys title, headline, punchline, insight, journalPrompts. Write in English. The tone should be concise, mystical, emotionally perceptive, slightly confronting but supportive, and non-deterministic. Do not mention being an AI, a model, a system, or a mock. Do not include markdown fences. Do not make medical, legal, financial, or guaranteed predictive claims. journalPrompts must be an array of 2 or 3 short reflective prompts.",
    userPromptTemplate:
      "Create a reading for this input:\n- birthYear: {{birthYear}}\n- ageBand: {{ageBand}}\n- westernZodiac: {{westernZodiac}}\n- intent: {{intent}}\n- language: {{language}}\n\nOutput valid JSON only in this shape:\n{\n  \"title\": \"string\",\n  \"headline\": \"string\",\n  \"punchline\": \"string\",\n  \"insight\": \"string\",\n  \"journalPrompts\": [\"string\", \"string\", \"string\"]\n}\n\nWriting guidance:\n- Keep punchline vivid and emotionally charged.\n- Make headline complementary, not repetitive.\n- Make insight grounded, intimate, and concise.\n- Keep journal prompts reflective and usable.\n- Avoid technical or developer-facing language.\n- Do not ask for or reference full birth dates, exact month/day values, or hidden personal data.",
    createdAt: "2026-04-22 08:20 UTC",
  },
  {
    versionId: "pv_2026_04_18_b",
    name: "Sharper Mirror",
    status: "inactive",
    systemPrompt:
      "You are SigilLab, a precise and emotionally intelligent reading writer. Return JSON only with the exact keys title, headline, punchline, insight, journalPrompts. Be slightly sharper, direct, and confronting while remaining supportive. Do not mention being an AI or include technical language. Avoid medical, legal, and financial claims.",
    userPromptTemplate:
      "Using birthYear {{birthYear}}, ageBand {{ageBand}}, westernZodiac {{westernZodiac}}, intent {{intent}}, and language {{language}}, write a concise emotional reading in JSON only. Make the punchline vivid, the headline complementary, the insight grounded, and the journalPrompts practical.",
    createdAt: "2026-04-18 11:04 UTC",
  },
];

function isPromptVersionArray(value: unknown): value is PromptVersion[] {
  return Array.isArray(value);
}

async function ensurePromptsFile() {
  await mkdir(dataDir, { recursive: true });

  try {
    const content = await readFile(promptsFilePath, "utf-8");

    if (!content.trim()) {
      await writeFile(
        promptsFilePath,
        `${JSON.stringify(defaultPromptVersions, null, 2)}\n`,
        "utf-8",
      );
    }
  } catch {
    await writeFile(
      promptsFilePath,
      `${JSON.stringify(defaultPromptVersions, null, 2)}\n`,
      "utf-8",
    );
  }
}

async function writePromptVersions(promptVersions: PromptVersion[]) {
  await ensurePromptsFile();
  await writeFile(
    promptsFilePath,
    `${JSON.stringify(promptVersions, null, 2)}\n`,
    "utf-8",
  );
}

export async function listPromptVersions(): Promise<PromptVersion[]> {
  await ensurePromptsFile();
  const fileContents = await readFile(promptsFilePath, "utf-8");
  const trimmed = fileContents.trim();

  if (!trimmed) {
    return defaultPromptVersions;
  }

  try {
    const parsed = JSON.parse(trimmed) as unknown;

    return isPromptVersionArray(parsed) && parsed.length > 0
      ? parsed
      : defaultPromptVersions;
  } catch {
    return defaultPromptVersions;
  }
}

export async function getPromptVersionById(
  versionId: string,
): Promise<PromptVersion | undefined> {
  const promptVersions = await listPromptVersions();

  return promptVersions.find((prompt) => prompt.versionId === versionId);
}

export async function getActivePromptVersion(): Promise<PromptVersion | undefined> {
  const promptVersions = await listPromptVersions();

  return promptVersions.find((prompt) => prompt.status === "active");
}

export async function savePromptVersion(
  prompt: PromptVersion,
): Promise<PromptVersion> {
  const promptVersions = await listPromptVersions();
  const existingIndex = promptVersions.findIndex(
    (item) => item.versionId === prompt.versionId,
  );
  const nextPromptVersions =
    existingIndex >= 0
      ? promptVersions.map((item, index) =>
          index === existingIndex ? prompt : item,
        )
      : [prompt, ...promptVersions];

  await writePromptVersions(nextPromptVersions);

  return prompt;
}

export async function setActivePromptVersion(
  versionId: string,
): Promise<PromptVersion | undefined> {
  const promptVersions = await listPromptVersions();
  const hasTarget = promptVersions.some((prompt) => prompt.versionId === versionId);

  if (!hasTarget) {
    return undefined;
  }

  const nextPromptVersions: PromptVersion[] = promptVersions.map((prompt) => ({
    ...prompt,
    status: prompt.versionId === versionId ? "active" : "inactive",
  }));

  await writePromptVersions(nextPromptVersions);

  return nextPromptVersions.find((prompt) => prompt.versionId === versionId);
}
