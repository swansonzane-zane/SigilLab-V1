import QRCode from "qrcode";

import type { I18nDictionary } from "@/services/i18n-service";
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
    language: seed?.language?.trim() || undefined,
  };
}

async function buildQrSvg(url: string) {
  const svg = await QRCode.toString(url, {
    type: "svg",
    margin: 1,
    width: 168,
    color: {
      dark: "#111827",
      light: "#ffffff",
    },
  });

  return svg.replace(
    /<svg([^>]*?)width="[^"]+"([^>]*?)height="[^"]+"([^>]*?)>/,
    '<svg$1width="100%"$2height="100%"$3 preserveAspectRatio="xMidYMid meet">',
  );
}

export async function buildShareModelFromRecord(
  record: ShareRecord,
  dictionary: I18nDictionary,
): Promise<ShareModel> {
  const sharedPath = `/shared/${record.shareId}`;

  return {
    shareId: record.shareId,
    title: record.title,
    posterTitle: record.punchline,
    headline: record.headline,
    punchline: record.punchline,
    subtext: record.subtext,
    hashtags: record.hashtags,
    revealCtaText: dictionary.share.revealCtaText,
    revealCtaHref: `/?${new URLSearchParams({
      language: record.language || "en",
    }).toString()}`,
    onlineCtaLabel: dictionary.share.onlineCtaLabel,
    sharedPath,
    shareTitle: dictionary.share.shareTitle,
    shareTextLines: dictionary.share.shareTextLines,
    saveSuccessMessage: dictionary.share.saveSuccessMessage,
    saveFailureMessage: dictionary.share.saveFailureMessage,
    saveHint: dictionary.share.saveHint,
    shareSuccessMessage: dictionary.share.shareSuccessMessage,
    copySuccessMessage: dictionary.share.copySuccessMessage,
    shareFailureMessage: dictionary.share.shareFailureMessage,
    rewardHint: dictionary.share.rewardHint,
    privacyNotice: dictionary.share.privacyNotice,
    posterEyebrow: dictionary.share.posterEyebrow,
    readingEyebrow: dictionary.share.readingEyebrow,
    blessingLabel: dictionary.share.blessingLabel,
    onlineCtaDescription: dictionary.share.onlineCtaDescription,
    sharedLinkLabel: dictionary.share.sharedLinkLabel,
    preserveLabel: dictionary.share.preserveLabel,
    privacyBoundaryLabel: dictionary.share.privacyBoundaryLabel,
    returnOfLightLabel: dictionary.share.returnOfLightLabel,
    saveSigilLabel: dictionary.share.saveSigil,
    savingSigilLabel: dictionary.share.savingSigil,
    sendBlessingLabel: dictionary.share.sendBlessing,
    sendingBlessingLabel: dictionary.share.sendingBlessing,
    saveSuccessDetail: dictionary.share.saveSuccessDetail,
    saveFailureDetail: dictionary.share.saveFailureDetail,
    shareSuccessDetail: dictionary.share.shareSuccessDetail,
    copySuccessDetail: dictionary.share.copySuccessDetail,
    copyFallbackDetail: dictionary.share.copyFallbackDetail,
    openSealPrefix: dictionary.share.openSealPrefix,
    language: record.language || "en",
    sigilIntent: record.sigilSpec.intentLabel,
    qrSvg: await buildQrSvg(sharedPath),
  };
}
