import type { ShareModel } from "@/types/share";

export function buildMockShareModel(): ShareModel {
  return {
    headline: "A threshold is opening where old static used to rule.",
    punchline:
      "Your signal is asking for honesty before motion and softness before proof.",
    subtext:
      "Hold this reading like a private omen: intimate, luminous, and clear enough to carry into the next conversation you cannot avoid.",
    hashtags: [
      "#SigilLab",
      "#EmotionalSignal",
      "#MysticMirror",
      "#NightRitual",
    ],
    revealCtaText: "Reveal Another Path",
    revealCtaHref: "/",
    qrPlaceholderText: "Scan to open SigilLab",
    shareTitle: "SigilLab",
    shareText: "A sigil was revealed for me today. May clarity travel with you.",
    saveSuccessMessage: "The sigil has been sealed into your keeping.",
    saveFailureMessage: "The sigil resisted capture.",
    saveHint:
      "Preserve this sigil before the energy fades. If the seal does not download, hold it on screen and keep a screenshot close.",
    shareSuccessMessage: "The seal now travels beyond your path.",
    copySuccessMessage: "Your blessing has been folded into the clipboard.",
    shareFailureMessage: "The blessing could not leave your device this time.",
    rewardHint: "Share light, and more light may return.",
  };
}
