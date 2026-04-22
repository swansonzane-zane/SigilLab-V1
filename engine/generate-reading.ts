import { callDeepSeekChatCompletion } from "@/lib/ai/deepseek";
import { buildReadingPrompt } from "@/engine/reading-prompt";
import type { ReadingInput, ReadingOutput } from "@/types/reading";

const intentThemes = {
  clarity: {
    aura: "lucid horizon",
    verb: "separates signal from static",
    promptSeed: "what is already true",
  },
  healing: {
    aura: "restorative tide",
    verb: "softens what has stayed guarded",
    promptSeed: "what is ready to mend",
  },
  focus: {
    aura: "concentrated beam",
    verb: "gathers scattered attention",
    promptSeed: "what deserves devotion",
  },
  balance: {
    aura: "equilibrium arc",
    verb: "brings opposing currents into dialogue",
    promptSeed: "what wants steadiness",
  },
  release: {
    aura: "waning ember",
    verb: "loosens the grip of stale patterns",
    promptSeed: "what can be set down",
  },
  openness: {
    aura: "threshold light",
    verb: "widens the gate for new contact",
    promptSeed: "what can be welcomed",
  },
} as const;

function getDayNumber(birthDate: string) {
  return Number.parseInt(birthDate.slice(-2), 10);
}

function getMonthNumber(birthDate: string) {
  return Number.parseInt(birthDate.slice(5, 7), 10);
}

export function buildMockReadingOutput(input: ReadingInput): ReadingOutput {
  const theme = intentThemes[input.intent];
  const day = getDayNumber(input.birthDate);
  const month = getMonthNumber(input.birthDate);
  const resonance = ((day + month * 3) % 9) + 1;

  return {
    title: `${input.intent[0].toUpperCase()}${input.intent.slice(1)} Signal`,
    headline: `A ${theme.aura} is rising around your current intention.`,
    punchline: `Your emotional field ${theme.verb} and points toward resonance level ${resonance}.`,
    insight: `Born on ${input.birthDate}, you are arriving at this reading with a pattern that favors reflection before movement. The current ${input.intent} pulse suggests that your next shift comes from naming the feeling underneath the story, then choosing one action that matches the quieter truth you already sense.`,
    journalPrompts: [
      `Where in my life do I already feel the first signs of ${input.intent}, even if they are subtle?`,
      `What would change this week if I trusted the ${theme.aura} instead of reacting to urgency?`,
      `What single ritual, boundary, or conversation would help me honor ${theme.promptSeed}?`,
    ],
  };
}

function isNonEmptyString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

function assertNonEmptyString(value: unknown): asserts value is string {
  if (!isNonEmptyString(value)) {
    throw new Error("DeepSeek reading output failed validation");
  }
}

function parseReadingOutput(rawText: string): ReadingOutput {
  const parsed = JSON.parse(rawText) as Partial<ReadingOutput>;
  const title = parsed.title;
  const headline = parsed.headline;
  const punchline = parsed.punchline;
  const insight = parsed.insight;
  const journalPrompts = Array.isArray(parsed.journalPrompts)
    ? parsed.journalPrompts
        .filter((prompt): prompt is string => isNonEmptyString(prompt))
        .slice(0, 3)
    : [];

  if (journalPrompts.length < 2) {
    throw new Error("DeepSeek reading output failed validation");
  }

  assertNonEmptyString(title);
  assertNonEmptyString(headline);
  assertNonEmptyString(punchline);
  assertNonEmptyString(insight);

  const normalizedTitle = title.trim();
  const normalizedHeadline = headline.trim();
  const normalizedPunchline = punchline.trim();
  const normalizedInsight = insight.trim();

  return {
    title: normalizedTitle,
    headline: normalizedHeadline,
    punchline: normalizedPunchline,
    insight: normalizedInsight,
    journalPrompts: journalPrompts.map((prompt) => prompt.trim()),
  };
}

export async function generateReading(
  input: ReadingInput,
): Promise<ReadingOutput> {
  const { systemPrompt, userPrompt } = buildReadingPrompt(input);

  try {
    const rawOutput = await callDeepSeekChatCompletion({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    return parseReadingOutput(rawOutput);
  } catch {
    return buildMockReadingOutput(input);
  }
}
