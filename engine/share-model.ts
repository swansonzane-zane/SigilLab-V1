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
    ctaText: "Begin Your Signal",
    ctaHref: "/",
    qrPlaceholderText: "Scan to open SigilLab",
  };
}
