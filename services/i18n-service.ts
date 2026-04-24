import { readFile } from "node:fs/promises";
import path from "node:path";

import { getAppConfig } from "@/services/configs-service";
import { readingLanguages, type ReadingLanguage } from "@/types/reading";

const i18nDir = path.join(process.cwd(), "content", "i18n");
const hardFallbackLanguage: ReadingLanguage = "en";

export type I18nDictionary = {
  home: {
    eyebrow: string;
    title: string;
    subtitle: string;
    featureCards: string[];
    formEyebrow: string;
    formTitle: string;
    birthDateLabel: string;
    intentLabel: string;
    generateSignal: string;
    generatingSignal: string;
    privacyNote: string;
    transitionTitle: string;
    transitionMessage: string;
    languageLabel: string;
  };
  intents: Record<ReadingIntentKey, string>;
  result: {
    eyebrow: string;
    heroEyebrow: string;
    insightLabel: string;
    journalPrompts: string;
    journalPromptsTitle: string;
    promptLabel: string;
    promptCopySuccess: string;
    promptCopyFailure: string;
    share: string;
    revealAnotherPath: string;
    shareTransitionTitle: string;
    shareTransitionMessage: string;
    returnTransitionTitle: string;
    returnTransitionMessage: string;
    loading: string;
    fallbackNotice: string;
  };
  share: {
    eyebrow: string;
    title: string;
    subtitle: string;
    posterEyebrow: string;
    readingEyebrow: string;
    blessingLabel: string;
    onlineCtaLabel: string;
    onlineCtaDescription: string;
    sharedLinkLabel: string;
    saveSigil: string;
    savingSigil: string;
    sendBlessing: string;
    sendingBlessing: string;
    preserveLabel: string;
    privacyBoundaryLabel: string;
    returnOfLightLabel: string;
    revealCtaText: string;
    shareTitle: string;
    shareTextLines: string[];
    saveSuccessMessage: string;
    saveSuccessDetail: string;
    saveFailureMessage: string;
    saveFailureDetail: string;
    saveHint: string;
    shareSuccessMessage: string;
    shareSuccessDetail: string;
    copySuccessMessage: string;
    copySuccessDetail: string;
    copyFallbackDetail: string;
    shareFailureMessage: string;
    rewardHint: string;
    privacyNotice: string;
    openSealPrefix: string;
    sharedMissingEyebrow: string;
    sharedMissingTitle: string;
    sharedMissingSubtitle: string;
    generateOwnSignal: string;
    sharedSealEyebrow: string;
  };
  monetization: {
    adEyebrow: string;
    adText: string;
    adCta: string;
    premiumBadge: string;
    hdExport: string;
    upgradePitch: string;
    upgradeNote: string;
    upgradeCta: string;
    premiumEyebrow: string;
    premiumTitle: string;
    premiumSubtitle: string;
    whyPremium: string;
    adFreeReadings: string;
    hdSigilExports: string;
    priorityFutureFeatures: string;
    monthlyCta: string;
    yearlyCta: string;
  };
  energy: {
    remainingLabel: string;
    remainingUnlimited: string;
    panelEyebrow: string;
    exhaustedTitle: string;
    exhaustedSubtitle: string;
    shareRewardCta: string;
    shareRewardNote: string;
    shareRewardLimitReached: string;
    sharingBlessing: string;
    shareBlessingText: string;
    genericBlessingLinkLabel: string;
    sponsorRewardCta: string;
    sponsorRewardNote: string;
    sponsorLoading: string;
    premiumCta: string;
    close: string;
    rewardSuccess: string;
    sponsorRewardSuccess: string;
  };
};

type ReadingIntentKey =
  | "clarity"
  | "healing"
  | "focus"
  | "balance"
  | "release"
  | "openness";

function isSupportedLanguage(value: unknown): value is ReadingLanguage {
  return readingLanguages.includes(value as ReadingLanguage);
}

export function getSupportedLanguages(): ReadingLanguage[] {
  return [...readingLanguages];
}

export async function resolveLanguage(
  inputLanguage?: string | string[],
): Promise<ReadingLanguage> {
  const input = Array.isArray(inputLanguage) ? inputLanguage[0] : inputLanguage;

  if (isSupportedLanguage(input)) {
    return input;
  }

  const config = await getAppConfig();

  if (isSupportedLanguage(config.defaultLanguage)) {
    return config.defaultLanguage;
  }

  return hardFallbackLanguage;
}

export async function getDictionary(
  language?: string | string[],
): Promise<I18nDictionary> {
  const resolvedLanguage = await resolveLanguage(language);

  try {
    const fileContents = await readFile(
      path.join(i18nDir, `${resolvedLanguage}.json`),
      "utf-8",
    );

    return JSON.parse(fileContents) as I18nDictionary;
  } catch {
    const fallbackContents = await readFile(
      path.join(i18nDir, `${hardFallbackLanguage}.json`),
      "utf-8",
    );

    return JSON.parse(fallbackContents) as I18nDictionary;
  }
}
