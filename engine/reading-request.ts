import {
  readingAgeBands,
  readingIntents,
  readingLanguages,
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
type ReadingInputCandidate = Partial<{
  birthYear: unknown;
  ageBand: unknown;
  westernZodiac: unknown;
  intent: unknown;
  language: unknown;
}>;

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
  return readingLanguages.includes((rawValue || "") as ReadingLanguage)
    ? ((rawValue || "") as ReadingLanguage)
    : defaultLanguage;
}

export function normalizeReadingLanguageWithDefault(
  rawValue: string | undefined,
  configuredDefaultLanguage: ReadingLanguage,
): ReadingLanguage {
  return readingLanguages.includes((rawValue || "") as ReadingLanguage)
    ? ((rawValue || "") as ReadingLanguage)
    : configuredDefaultLanguage;
}

export function buildReadingInputFromSearchParams(params: {
  birthYear?: SearchParamValue;
  ageBand?: SearchParamValue;
  westernZodiac?: SearchParamValue;
  intent?: SearchParamValue;
  language?: SearchParamValue;
}, configuredDefaultLanguage: ReadingLanguage = defaultLanguage): ReadingInput {
  return {
    birthYear: normalizeBirthYear(takeFirstValue(params.birthYear)),
    ageBand: normalizeAgeBand(takeFirstValue(params.ageBand)),
    westernZodiac: normalizeWesternZodiac(takeFirstValue(params.westernZodiac)),
    intent: normalizeReadingIntent(takeFirstValue(params.intent)),
    language: normalizeReadingLanguageWithDefault(
      takeFirstValue(params.language),
      configuredDefaultLanguage,
    ),
  };
}

export function isReadingInputCandidate(
  value: unknown,
): value is ReadingInputCandidate {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.birthYear !== "undefined" &&
    typeof candidate.ageBand !== "undefined" &&
    typeof candidate.westernZodiac !== "undefined" &&
    typeof candidate.intent !== "undefined" &&
    typeof candidate.language !== "undefined"
  );
}

export function buildReadingInputFromBody(body: ReadingInputCandidate): ReadingInput {
  return {
    birthYear: normalizeBirthYear(
      typeof body.birthYear === "number"
        ? String(body.birthYear)
        : typeof body.birthYear === "string"
          ? body.birthYear
          : undefined,
    ),
    ageBand: normalizeAgeBand(
      typeof body.ageBand === "string" ? body.ageBand : undefined,
    ),
    westernZodiac: normalizeWesternZodiac(
      typeof body.westernZodiac === "string" ? body.westernZodiac : undefined,
    ),
    intent: normalizeReadingIntent(
      typeof body.intent === "string" ? body.intent : undefined,
    ),
    language: normalizeReadingLanguage(
      typeof body.language === "string" ? body.language : undefined,
    ),
  };
}

export function hasValidReadingInputShape(body: ReadingInputCandidate): boolean {
  return (
    typeof body.birthYear === "number" &&
    typeof body.ageBand === "string" &&
    typeof body.westernZodiac === "string" &&
    typeof body.intent === "string" &&
    typeof body.language === "string"
  );
}
