import type { ShareModel, ShareRecord, ShareSeedInput } from "@/types/share";

function normalizeSeedText(value: string | undefined, fallback: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

function normalizeIntentLabel(value: string | undefined) {
  const trimmed = value?.trim().toLowerCase();
  return trimmed || "clarity";
}

export function createShareRecordPayload(
  seed?: ShareSeedInput,
): Omit<ShareRecord, "shareId" | "createdAt"> {
  return {
    title: normalizeSeedText(seed?.title, "SigilLab"),
    headline: normalizeSeedText(
      seed?.headline,
      "A threshold is opening where old static used to rule.",
    ),
    punchline: normalizeSeedText(
      seed?.punchline,
      "Your signal is asking for honesty before motion and softness before proof.",
    ),
    subtext: normalizeSeedText(
      seed?.subtext,
      "Hold this reading like a private omen: intimate, luminous, and clear enough to carry into the next conversation you cannot avoid.",
    ),
    hashtags: [
      "#SigilLab",
      "#EmotionalSignal",
      "#MysticMirror",
      "#NightRitual",
    ],
    ctaText: "Generate Your Own Signal",
    ctaHref: "/",
    sigilSpec: {
      intentLabel: normalizeIntentLabel(seed?.intent),
    },
    intent: normalizeIntentLabel(seed?.intent),
    zodiac: seed?.zodiac?.trim() || undefined,
  };
}

export function buildShareModelFromRecord(record: ShareRecord): ShareModel {
  return {
    shareId: record.shareId,
    title: record.title,
    headline: record.headline,
    punchline: record.punchline,
    subtext: record.subtext,
    hashtags: record.hashtags,
    revealCtaText: "Reveal Another Path",
    revealCtaHref: "/",
    onlineCtaLabel: "Open this seal online",
    sharedPath: `/shared/${record.shareId}`,
    shareTitle: record.title,
    shareText: "A sigil was revealed for me today. May clarity travel with you.",
    saveSuccessMessage: "The sigil has been sealed into your keeping.",
    saveFailureMessage: "The sigil resisted capture.",
    saveHint:
      "Preserve this sigil before the energy fades. If the seal does not download, hold it on screen and keep a screenshot close.",
    shareSuccessMessage: "The seal now travels beyond your path.",
    copySuccessMessage: "Your blessing has been folded into the clipboard.",
    shareFailureMessage: "The blessing could not leave your device this time.",
    rewardHint: "Share light, and more light may return.",
    privacyNotice: "Only the symbol is shared. Your private details remain with you.",
    sigilIntent: record.sigilSpec.intentLabel,
  };
}
