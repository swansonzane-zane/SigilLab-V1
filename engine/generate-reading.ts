import {
  callDeepSeekChatCompletion,
  DeepSeekError,
  getDeepSeekRuntimeConfig,
} from "@/lib/ai/deepseek";
import { buildReadingPrompt } from "@/engine/reading-prompt";
import { getAppConfig } from "@/services/configs-service";
import type {
  ReadingGenerationResult,
  ReadingInput,
  ReadingOutput,
} from "@/types/reading";

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

function getBirthYearSignal(birthYear: number) {
  return Number.parseInt(String(birthYear).slice(-2), 10);
}

function getAgeBandSignal(ageBand: ReadingInput["ageBand"]) {
  const bandValues: Record<ReadingInput["ageBand"], number> = {
    "under-18": 1,
    "18-24": 2,
    "25-29": 3,
    "30-35": 4,
    "36-44": 5,
    "45+": 6,
  };

  return bandValues[ageBand];
}

function getZodiacSignal(zodiac: ReadingInput["westernZodiac"]) {
  const zodiacValues: Record<ReadingInput["westernZodiac"], number> = {
    Aries: 1,
    Taurus: 2,
    Gemini: 3,
    Cancer: 4,
    Leo: 5,
    Virgo: 6,
    Libra: 7,
    Scorpio: 8,
    Sagittarius: 9,
    Capricorn: 10,
    Aquarius: 11,
    Pisces: 12,
  };

  return zodiacValues[zodiac];
}

export function buildMockReadingOutput(input: ReadingInput): ReadingOutput {
  const theme = intentThemes[input.intent];
  const yearSignal = getBirthYearSignal(input.birthYear);
  const ageSignal = getAgeBandSignal(input.ageBand);
  const zodiacSignal = getZodiacSignal(input.westernZodiac);
  const resonance = ((yearSignal + ageSignal * 2 + zodiacSignal) % 9) + 1;

  return {
    title: `${input.intent[0].toUpperCase()}${input.intent.slice(1)} Signal`,
    headline: `A ${theme.aura} is rising around your ${input.westernZodiac.toLowerCase()} current.`,
    punchline: `Your emotional field ${theme.verb} and points toward resonance level ${resonance}.`,
    insight: `With a birth year of ${input.birthYear}, an age band of ${input.ageBand}, and a ${input.westernZodiac} signature, you are arriving at this reading with a pattern that favors reflection before movement. The current ${input.intent} pulse suggests that your next shift comes from naming the feeling underneath the story, then choosing one action that matches the quieter truth you already sense.`,
    journalPrompts: [
      `Where in my life do I already feel the first signs of ${input.intent}, even if they are subtle?`,
      `What would change this week if I trusted the ${theme.aura} of my ${input.westernZodiac} pattern instead of reacting to urgency?`,
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
  let parsed: Partial<ReadingOutput>;

  try {
    parsed = JSON.parse(rawText) as Partial<ReadingOutput>;
  } catch {
    throw new DeepSeekError("invalid_json", "Provider returned invalid JSON");
  }

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
    throw new DeepSeekError(
      "invalid_schema",
      "DeepSeek reading output failed validation",
    );
  }

  try {
    assertNonEmptyString(title);
    assertNonEmptyString(headline);
    assertNonEmptyString(punchline);
    assertNonEmptyString(insight);
  } catch {
    throw new DeepSeekError(
      "invalid_schema",
      "DeepSeek reading output failed validation",
    );
  }

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

function classifyGenerationError(error: unknown) {
  if (error instanceof DeepSeekError) {
    return error.code;
  }

  return "provider_http_error";
}

export async function generateReading(
  input: ReadingInput,
): Promise<ReadingOutput> {
  const result = await generateReadingWithMeta(input);

  return result.output;
}

export async function generateReadingWithMeta(
  input: ReadingInput,
): Promise<ReadingGenerationResult> {
  const { systemPrompt, userPrompt } = await buildReadingPrompt(input);
  const startedAt = Date.now();
  const deepSeekConfig = getDeepSeekRuntimeConfig();
  const config = await getAppConfig();
  let providerResponseMs: number | null = null;

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
    providerResponseMs = Date.now() - startedAt;

    return {
      output: parseReadingOutput(rawOutput),
      meta: {
        provider: "deepseek",
        model: deepSeekConfig.model,
        status: "success",
        fallback: false,
        errorReason: null,
        fallbackReason: null,
        providerResponseMs,
        totalLatencyMs: Date.now() - startedAt,
        failed: false,
      },
    };
  } catch (error) {
    const reason = classifyGenerationError(error);
    providerResponseMs ??= reason === "missing_api_key" ? null : Date.now() - startedAt;

    if (!config.enableFallback) {
      return {
        output: {
          title: "Signal Temporarily Unavailable",
          headline: "The reading channel is quiet for a moment.",
          punchline:
            "We couldn't complete your signal right now, but your intent is still held.",
          insight:
            "The live reading model did not return a usable result and fallback mode is currently disabled. Please try again shortly or return to the ritual and generate another signal.",
          journalPrompts: [
            "What feeling needed this reading most right now?",
            "What truth can I name even without a generated signal?",
          ],
        },
        meta: {
          provider: "deepseek",
          model: deepSeekConfig.model,
          status: "error",
          fallback: false,
          errorReason: reason,
          fallbackReason: null,
          providerResponseMs,
          totalLatencyMs: Date.now() - startedAt,
          failed: true,
        },
      };
    }

    return {
      output: buildMockReadingOutput(input),
      meta: {
        provider: "mock",
        model: "mock-reading-engine",
        status: "fallback",
        fallback: true,
        errorReason: null,
        fallbackReason: reason,
        providerResponseMs,
        totalLatencyMs: Date.now() - startedAt,
        failed: false,
      },
    };
  }
}
