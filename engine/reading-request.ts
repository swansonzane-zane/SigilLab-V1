import {
  readingAgeBands,
  readingIntents,
  readingWesternZodiacs,
  type ReadingInput,
  type ReadingAgeBand,
  type ReadingIntent,
  type ReadingLanguage,
  type ReadingWesternZodiac,
} from "@/types/reading";

const defaultBirthYear = 1992;
const defaultAgeBand: ReadingAgeBand = "30-35";
const defaultWesternZodiac: ReadingWesternZodiac = "Pisces";
const defaultIntent: ReadingIntent = "clarity";
const defaultLanguage: ReadingLanguage = "en";

type SearchParamValue = string | string[] | undefined;

function takeFirstValue(value: SearchParamValue) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export function normalizeReadingIntent(rawValue?: string): ReadingIntent {
  if (!rawValue) {
    return defaultIntent;
  }

  const normalized = rawValue.toLowerCase() as ReadingIntent;

  return readingIntents.includes(normalized) ? normalized : defaultIntent;
}

export function normalizeBirthYear(rawValue?: string): number {
  const parsed = Number.parseInt(rawValue || "", 10);

  if (!Number.isFinite(parsed) || parsed < 1900 || parsed > 2026) {
    return defaultBirthYear;
  }

  return parsed;
}

export function normalizeAgeBand(rawValue?: string): ReadingAgeBand {
  if (!rawValue) {
    return defaultAgeBand;
  }

  const normalized = rawValue as ReadingAgeBand;

  return readingAgeBands.includes(normalized) ? normalized : defaultAgeBand;
}

export function normalizeWesternZodiac(
  rawValue?: string,
): ReadingWesternZodiac {
  if (!rawValue) {
    return defaultWesternZodiac;
  }

  const normalized = rawValue as ReadingWesternZodiac;

  return readingWesternZodiacs.includes(normalized)
    ? normalized
    : defaultWesternZodiac;
}

export function normalizeReadingLanguage(rawValue?: string): ReadingLanguage {
  return rawValue === "en" ? "en" : defaultLanguage;
}

export function buildReadingInputFromSearchParams(params: {
  birthYear?: SearchParamValue;
  ageBand?: SearchParamValue;
  westernZodiac?: SearchParamValue;
  intent?: SearchParamValue;
  language?: SearchParamValue;
}): ReadingInput {
  return {
    birthYear: normalizeBirthYear(takeFirstValue(params.birthYear)),
    ageBand: normalizeAgeBand(takeFirstValue(params.ageBand)),
    westernZodiac: normalizeWesternZodiac(takeFirstValue(params.westernZodiac)),
    intent: normalizeReadingIntent(takeFirstValue(params.intent)),
    language: normalizeReadingLanguage(takeFirstValue(params.language)),
  };
}
