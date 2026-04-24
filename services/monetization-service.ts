import type { AppConfig } from "@/types/admin";

type PremiumParam = string | string[] | undefined;

export function resolvePremiumState(
  inputPremium: PremiumParam,
  config: AppConfig,
) {
  const value = Array.isArray(inputPremium) ? inputPremium[0] : inputPremium;

  return config.enablePremium && value === "1";
}

export function shouldShowAds(config: AppConfig, isPremium: boolean) {
  return config.enableAds && !isPremium;
}

export function buildPremiumSearchParam(isPremium: boolean) {
  return isPremium ? { premium: "1" } : {};
}
