"use client";

import Link from "next/link";
import { useState } from "react";

import {
  grantAdReward,
  grantShareReward,
  type EnergyState,
} from "@/services/energy-service";
import { buildShareMessage } from "@/lib/share-flow";
import type { I18nDictionary } from "@/services/i18n-service";
import { getRecentShareMessage } from "@/services/recent-share-service";

type EnergyExhaustedPanelProps = {
  dictionary: I18nDictionary;
  dailyFreeLimit: number;
  energyState: EnergyState;
  language: string;
  onClose: () => void;
  onReward: (state: EnergyState, message: string) => void;
  sponsorEnabled: boolean;
};

async function shareBlessing(text: string) {
  if (navigator.share) {
    await navigator.share({ text });
    return true;
  }

  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  return false;
}

function buildFallbackBlessing(dictionary: I18nDictionary) {
  const url = typeof window === "undefined" ? "/" : window.location.origin;

  return buildShareMessage(
    {
      shareTitle: "",
      shareTextLines: [dictionary.energy.shareBlessingText],
      openSealPrefix: dictionary.energy.genericBlessingLinkLabel,
    },
    url,
  );
}

export function EnergyExhaustedPanel({
  dictionary,
  dailyFreeLimit,
  energyState,
  language,
  onClose,
  onReward,
  sponsorEnabled,
}: EnergyExhaustedPanelProps) {
  const [isSharing, setIsSharing] = useState(false);
  const [isWatching, setIsWatching] = useState(false);
  const canClaimShare =
    energyState.shareRewardsToday < energyState.shareRewardLimit;

  async function handleShareReward() {
    if (!canClaimShare || isSharing) {
      return;
    }

    setIsSharing(true);

    try {
      await shareBlessing(
        getRecentShareMessage() || buildFallbackBlessing(dictionary),
      );
      const result = grantShareReward(false, dailyFreeLimit);

      if (result.granted) {
        onReward(result.state, dictionary.energy.rewardSuccess);
      }
    } finally {
      setIsSharing(false);
    }
  }

  async function handleSponsorReward() {
    if (isWatching) {
      return;
    }

    setIsWatching(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const nextState = grantAdReward(false, dailyFreeLimit);
    setIsWatching(false);
    onReward(nextState, dictionary.energy.sponsorRewardSuccess);
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/72 px-4 py-6 backdrop-blur-md">
      <section className="w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(19,20,38,0.97),rgba(7,8,16,0.99))] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.6)] sm:p-6">
        <div className="space-y-5">
          <div className="space-y-3 text-center">
            <p className="text-xs font-semibold tracking-[0.3em] text-amber-100/70 uppercase">
              {dictionary.energy.panelEyebrow}
            </p>
            <h2 className="font-heading text-4xl leading-none text-amber-50">
              {dictionary.energy.exhaustedTitle}
            </h2>
            <p className="mx-auto max-w-md text-sm leading-7 text-stone-300/82">
              {dictionary.energy.exhaustedSubtitle}
            </p>
          </div>

          <div className="grid gap-3">
            <button
              type="button"
              onClick={handleShareReward}
              disabled={!canClaimShare || isSharing}
              className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-4 text-left transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="block text-sm font-semibold text-stone-100">
                {isSharing
                  ? dictionary.energy.sharingBlessing
                  : dictionary.energy.shareRewardCta}
              </span>
              <span className="mt-1 block text-sm leading-6 text-stone-300/72">
                {canClaimShare
                  ? dictionary.energy.shareRewardNote
                  : dictionary.energy.shareRewardLimitReached}
              </span>
            </button>

            {sponsorEnabled ? (
              <button
                type="button"
                onClick={handleSponsorReward}
                disabled={isWatching}
                className="rounded-2xl border border-amber-100/14 bg-amber-100/[0.06] px-4 py-4 text-left transition hover:bg-amber-100/[0.09] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="block text-sm font-semibold text-amber-50">
                  {isWatching
                    ? dictionary.energy.sponsorLoading
                    : dictionary.energy.sponsorRewardCta}
                </span>
                <span className="mt-1 block text-sm leading-6 text-stone-300/72">
                  {dictionary.energy.sponsorRewardNote}
                </span>
              </button>
            ) : null}

            <Link
              href={`/premium?${new URLSearchParams({ language }).toString()}`}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f4d7a1,#d6b3ff_54%,#86d9ff)] px-5 text-sm font-semibold text-slate-950 transition hover:brightness-105"
            >
              {dictionary.energy.premiumCta}
            </Link>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full text-sm font-medium text-stone-300/70 transition hover:text-stone-100"
          >
            {dictionary.energy.close}
          </button>
        </div>
      </section>
    </div>
  );
}
