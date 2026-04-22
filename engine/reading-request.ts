import {
  readingIntents,
  type ReadingInput,
  type ReadingIntent,
  type ReadingLanguage,
} from "@/types/reading";

const defaultBirthDate = "1992-03-14";
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

export function isValidBirthDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00Z`);

  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
}

export function normalizeReadingLanguage(rawValue?: string): ReadingLanguage {
  return rawValue === "en" ? "en" : defaultLanguage;
}

export function buildReadingInputFromSearchParams(params: {
  birthDate?: SearchParamValue;
  intent?: SearchParamValue;
  language?: SearchParamValue;
}): ReadingInput {
  const rawBirthDate = takeFirstValue(params.birthDate);
  const birthDate =
    rawBirthDate && isValidBirthDate(rawBirthDate)
      ? rawBirthDate
      : defaultBirthDate;

  return {
    birthDate,
    intent: normalizeReadingIntent(takeFirstValue(params.intent)),
    language: normalizeReadingLanguage(takeFirstValue(params.language)),
  };
}
