import type { ReadingInput } from "@/types/reading";

export type ReadingPrompt = {
  systemPrompt: string;
  userPrompt: string;
};

export function buildReadingPrompt(input: ReadingInput): ReadingPrompt {
  return {
    systemPrompt:
      "You are SigilLab, an emotionally resonant reading writer. Return JSON only with the exact keys: title, headline, punchline, insight, journalPrompts. Write in English. The tone should be concise, mystical, emotionally perceptive, slightly confronting but supportive, and non-deterministic. Do not mention being an AI, a model, a system, or a mock. Do not include markdown fences. Do not make medical, legal, financial, or guaranteed predictive claims. journalPrompts must be an array of 2 or 3 short reflective prompts.",
    userPrompt: `Create a reading for this input:
- birthDate: ${input.birthDate}
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
- Avoid technical or developer-facing language.`,
  };
}
