export const readingIntents = [
  "clarity",
  "healing",
  "focus",
  "balance",
  "release",
  "openness",
] as const;

export const readingLanguages = ["en"] as const;
export const readingAgeBands = [
  "under-18",
  "18-24",
  "25-29",
  "30-35",
  "36-44",
  "45+",
] as const;
export const readingWesternZodiacs = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
] as const;

export type ReadingIntent = (typeof readingIntents)[number];
export type ReadingLanguage = (typeof readingLanguages)[number];
export type ReadingAgeBand = (typeof readingAgeBands)[number];
export type ReadingWesternZodiac = (typeof readingWesternZodiacs)[number];

export type ReadingInput = {
  birthYear: number;
  ageBand: ReadingAgeBand;
  westernZodiac: ReadingWesternZodiac;
  intent: ReadingIntent;
  language: ReadingLanguage;
};

export type DerivedReadingInput = {
  birthYear: number;
  ageBand: ReadingAgeBand;
  westernZodiac: ReadingWesternZodiac;
  intent: string;
  language: ReadingLanguage;
};

export type ReadingOutput = {
  title: string;
  headline: string;
  punchline: string;
  insight: string;
  journalPrompts: string[];
};
