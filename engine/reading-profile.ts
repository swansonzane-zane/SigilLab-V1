import type {
  DerivedReadingInput,
  ReadingAgeBand,
  ReadingLanguage,
  ReadingWesternZodiac,
} from "@/types/reading";

export function isValidBirthDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00Z`);

  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
}

function getUtcYear(date: Date) {
  return date.getUTCFullYear();
}

function getUtcMonth(date: Date) {
  return date.getUTCMonth() + 1;
}

function getUtcDay(date: Date) {
  return date.getUTCDate();
}

export function deriveBirthYear(birthDate: string): number {
  if (!isValidBirthDate(birthDate)) {
    return 1992;
  }

  return Number.parseInt(birthDate.slice(0, 4), 10);
}

export function deriveAgeBand(birthDate: string): ReadingAgeBand {
  if (!isValidBirthDate(birthDate)) {
    return "30-35";
  }

  const birth = new Date(`${birthDate}T00:00:00Z`);
  const now = new Date();
  let age = getUtcYear(now) - getUtcYear(birth);

  const hasHadBirthdayThisYear =
    getUtcMonth(now) > getUtcMonth(birth) ||
    (getUtcMonth(now) === getUtcMonth(birth) &&
      getUtcDay(now) >= getUtcDay(birth));

  if (!hasHadBirthdayThisYear) {
    age -= 1;
  }

  if (age < 18) {
    return "under-18";
  }

  if (age <= 24) {
    return "18-24";
  }

  if (age <= 29) {
    return "25-29";
  }

  if (age <= 35) {
    return "30-35";
  }

  if (age <= 44) {
    return "36-44";
  }

  return "45+";
}

export function deriveWesternZodiac(
  birthDate: string,
): ReadingWesternZodiac {
  if (!isValidBirthDate(birthDate)) {
    return "Pisces";
  }

  const month = Number.parseInt(birthDate.slice(5, 7), 10);
  const day = Number.parseInt(birthDate.slice(8, 10), 10);

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return "Aries";
  }
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return "Taurus";
  }
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return "Gemini";
  }
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return "Cancer";
  }
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return "Leo";
  }
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return "Virgo";
  }
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return "Libra";
  }
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return "Scorpio";
  }
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return "Sagittarius";
  }
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return "Capricorn";
  }
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return "Aquarius";
  }

  return "Pisces";
}

export function buildDerivedReadingInput(params: {
  birthDate: string;
  intent: string;
  language?: ReadingLanguage;
}): DerivedReadingInput {
  return {
    birthYear: deriveBirthYear(params.birthDate),
    ageBand: deriveAgeBand(params.birthDate),
    westernZodiac: deriveWesternZodiac(params.birthDate),
    intent: params.intent,
    language: params.language || "en",
  };
}
