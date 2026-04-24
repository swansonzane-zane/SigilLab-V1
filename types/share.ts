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
  language?: string;
};

export type ShareSeedInput = {
  title?: string;
  headline?: string;
  punchline?: string;
  subtext?: string;
  intent?: string;
  zodiac?: string;
  language?: string;
};

export type ShareModel = {
  shareId: string;
  title: string;
  posterTitle: string;
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
  posterEyebrow: string;
  readingEyebrow: string;
  blessingLabel: string;
  onlineCtaDescription: string;
  sharedLinkLabel: string;
  preserveLabel: string;
  privacyBoundaryLabel: string;
  returnOfLightLabel: string;
  saveSigilLabel: string;
  savingSigilLabel: string;
  sendBlessingLabel: string;
  sendingBlessingLabel: string;
  saveSuccessDetail: string;
  saveFailureDetail: string;
  shareSuccessDetail: string;
  copySuccessDetail: string;
  copyFallbackDetail: string;
  openSealPrefix: string;
  language: string;
  sigilIntent: string;
  qrSvg: string;
};
