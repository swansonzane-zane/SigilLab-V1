export const readingIntents = [
  "clarity",
  "healing",
  "focus",
  "balance",
  "release",
  "openness",
] as const;

export const readingLanguages = ["en"] as const;

export type ReadingIntent = (typeof readingIntents)[number];
export type ReadingLanguage = (typeof readingLanguages)[number];

export type ReadingInput = {
  birthDate: string;
  intent: ReadingIntent;
  language: ReadingLanguage;
};

export type ReadingOutput = {
  title: string;
  headline: string;
  punchline: string;
  insight: string;
  journalPrompts: string[];
};
