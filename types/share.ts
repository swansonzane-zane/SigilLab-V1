export type ShareSigilSpec = {
  intentLabel: string;
};

export type ShareRecord = {
  shareId: string;
  createdAt: string;
  title: string;
  headline: string;
  punchline: string;
  subtext: string;
  hashtags: string[];
  ctaText: string;
  ctaHref: string;
  sigilSpec: ShareSigilSpec;
  intent?: string;
  zodiac?: string;
};

export type ShareModel = {
  shareId: string;
  title: string;
  headline: string;
  punchline: string;
  subtext: string;
  hashtags: string[];
  revealCtaText: string;
  revealCtaHref: string;
  onlineCtaLabel: string;
  sharedPath: string;
  shareTitle: string;
  shareText: string;
  saveHint: string;
  shareSuccessMessage: string;
  copySuccessMessage: string;
  saveSuccessMessage: string;
  saveFailureMessage: string;
  shareFailureMessage: string;
  rewardHint: string;
  privacyNotice: string;
  sigilIntent: string;
};
