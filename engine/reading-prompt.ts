import { getActivePromptVersion } from "@/services/prompts-service";
import type { ReadingInput } from "@/types/reading";

export type ReadingPrompt = {
  systemPrompt: string;
  userPrompt: string;
};

function fillPromptTemplate(template: string, input: ReadingInput) {
  return template
    .replaceAll("{{birthYear}}", String(input.birthYear))
    .replaceAll("{{ageBand}}", input.ageBand)
    .replaceAll("{{westernZodiac}}", input.westernZodiac)
    .replaceAll("{{intent}}", input.intent)
    .replaceAll("{{language}}", input.language);
}

export async function buildReadingPrompt(
  input: ReadingInput,
): Promise<ReadingPrompt> {
  const activePrompt = await getActivePromptVersion();

  if (activePrompt) {
    return {
      systemPrompt: activePrompt.systemPrompt,
      userPrompt: fillPromptTemplate(activePrompt.userPromptTemplate, input),
    };
  }

  return {
    systemPrompt:
      "You are SigilLab, an emotionally resonant reading writer. Return JSON only with the exact keys: title, headline, punchline, insight, journalPrompts. Write in English. The tone should be concise, mystical, emotionally perceptive, slightly confronting but supportive, and non-deterministic. Do not mention being an AI, a model, a system, or a mock. Do not include markdown fences. Do not make medical, legal, financial, or guaranteed predictive claims. journalPrompts must be an array of 2 or 3 short reflective prompts.",
    userPrompt: `Create a reading for this input:
- birthYear: ${input.birthYear}
- ageBand: ${input.ageBand}
- westernZodiac: ${input.westernZodiac}
- intent: ${input.intent}
- language: ${input.language}

Output valid JSON only in this shape:
{
  "title": "string",
  "headline": "string",
  "punchline": "string",
  "insight": "string",
  "journalPrompts": ["string", "string", "string"]
}

Writing guidance:
- Keep punchline vivid and emotionally charged.
- Make headline complementary, not repetitive.
- Make insight grounded, intimate, and concise.
- Keep journal prompts reflective and usable.
- Avoid technical or developer-facing language.
- Do not ask for or reference full birth dates, exact month/day values, or hidden personal data.`,
  };
}
