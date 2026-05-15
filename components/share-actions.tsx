"use client";

import { toPng } from "html-to-image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useTransitionController } from "@/components/transition-provider";
import { grantShareReward } from "@/services/energy-service";
import type { ShareModel } from "@/types/share";

type ShareActionsProps = {
  dailyFreeLimit: number;
  isPremium: boolean;
  model: ShareModel;
};

async function copyToClipboard(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return true;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();

  const copied = document.execCommand("copy");
  document.body.removeChild(textarea);

  return copied;
}

export function ShareActions({
  dailyFreeLimit,
  isPremium,
  model,
}: ShareActionsProps) {
  const router = useRouter();
  const { startTransition } = useTransitionController();
  const [isSavingSealPoster, setIsSavingSealPoster] = useState(false);
  const [isSavingRitualCard, setIsSavingRitualCard] = useState(false);
  const [isCopyingSealLink, setIsCopyingSealLink] = useState(false);

  function getEnergyRewardDetail(fallbackMessage: string) {
    const result = grantShareReward(isPremium, dailyFreeLimit);

    return result.granted ? model.energyRewardMessage : fallbackMessage;
  }

  async function handleSaveSealPoster() {
    if (isSavingSealPoster) {
      return;
    }

    setIsSavingSealPoster(true);

    try {
      const posterNode = document.getElementById(`seal-poster-${model.shareId}`);

      if (!posterNode) {
        throw new Error("seal poster not found");
      }

      const dataUrl = await toPng(posterNode, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#090b14",
      });
      const anchor = document.createElement("a");

      anchor.href = dataUrl;
      anchor.download = `sigillab-seal-poster-${model.shareId}.png`;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      startTransition({
        active: true,
        level: "feedback",
        title: model.saveSealPosterSuccessMessage,
        message: getEnergyRewardDetail(model.saveSealPosterDetail),
      });
    } catch {
      startTransition({
        active: true,
        level: "feedback",
        title: model.saveFailureMessage,
        message: model.saveFailureDetail,
      });
    } finally {
      setIsSavingSealPoster(false);
    }
  }

  async function handleCopySealLink() {
    if (isCopyingSealLink) {
      return;
    }

    setIsCopyingSealLink(true);

    try {
      const copied = await copyToClipboard(model.sealLinkLines.join("\n"));

      if (copied) {
        startTransition({
          active: true,
          level: "feedback",
          title: model.copySuccessMessage,
          message: getEnergyRewardDetail(model.copySuccessDetail),
        });
      } else {
        startTransition({
          active: true,
          level: "feedback",
          title: model.shareFailureMessage,
          message: model.saveHint,
        });
      }
    } catch {
      startTransition({
        active: true,
        level: "feedback",
        title: model.shareFailureMessage,
        message: model.saveHint,
      });
    } finally {
      setIsCopyingSealLink(false);
    }
  }

  async function handleSaveRitualCard() {
    if (isSavingRitualCard) {
      return;
    }

    setIsSavingRitualCard(true);

    try {
      const ritualCardNode = document.getElementById(`ritual-card-${model.shareId}`);

      if (!ritualCardNode) {
        throw new Error("ritual card not found");
      }

      const dataUrl = await toPng(ritualCardNode, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#090b14",
      });
      const anchor = document.createElement("a");

      anchor.href = dataUrl;
      anchor.download = `sigillab-ritual-card-${model.shareId}.png`;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      startTransition({
        active: true,
        level: "feedback",
        title: model.saveRitualCardSuccessMessage,
        message: getEnergyRewardDetail(model.saveRitualCardDetail),
      });
    } catch {
      startTransition({
        active: true,
        level: "feedback",
        title: model.saveFailureMessage,
        message: model.saveFailureDetail,
      });
    } finally {
      setIsSavingRitualCard(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        <button
          type="button"
          onClick={handleSaveSealPoster}
          disabled={isSavingSealPoster}
          className="inline-flex min-h-12 items-center justify-center rounded-sm border border-[#b08d57]/28 bg-[linear-gradient(135deg,#9d2b20,#6f1711_54%,#2a1711)] px-5 text-sm font-semibold text-[#fff4d6] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSavingSealPoster
            ? model.savingSealPosterLabel
            : model.saveSealPosterLabel}
        </button>
        <button
          type="button"
          onClick={handleCopySealLink}
          disabled={isCopyingSealLink}
          className="inline-flex min-h-12 items-center justify-center rounded-sm border border-[#80623c]/28 bg-[#120b08]/72 px-5 text-sm font-semibold text-stone-100 transition hover:border-[#b08d57]/45 hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isCopyingSealLink
            ? model.copyingSealLinkLabel
            : model.copySealLinkLabel}
        </button>
        <button
          type="button"
          onClick={handleSaveRitualCard}
          disabled={isSavingRitualCard}
          className="inline-flex min-h-12 items-center justify-center rounded-sm border border-[#80623c]/24 bg-black/28 px-5 text-sm font-semibold text-[#f3e6c5] transition hover:border-[#b08d57]/40 hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSavingRitualCard
            ? model.savingRitualCardLabel
            : isPremium
              ? model.hdExportLabel
              : model.saveRitualCardLabel}
        </button>
        <button
          type="button"
          onClick={() => {
            startTransition({
              active: true,
              level: "instant",
              title: "Return to the circle...",
              message: "Another path is opening.",
            });
            router.push(model.revealCtaHref);
          }}
          className="inline-flex min-h-12 items-center justify-center rounded-sm border border-[#80623c]/22 bg-black/24 px-5 text-sm font-semibold text-stone-200 transition hover:border-[#b08d57]/38 hover:bg-white/[0.04]"
        >
          {model.revealCtaText}
        </button>
      </div>

      <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-center">
        <p className="text-xs tracking-[0.28em] text-amber-100/72 uppercase">
          {model.preserveLabel}
        </p>
        <p className="mt-2 text-sm leading-7 text-stone-200/82">
          {model.saveHint}
        </p>
      </div>

      <div className="rounded-[1.6rem] border border-emerald-200/10 bg-emerald-200/[0.04] px-4 py-4 text-center">
        <p className="text-xs tracking-[0.28em] text-emerald-100/72 uppercase">
          {model.privacyBoundaryLabel}
        </p>
        <p className="mt-2 text-sm leading-7 text-stone-200/82">
          {model.privacyNotice}
        </p>
      </div>

      <div className="rounded-[1.6rem] border border-sky-200/12 bg-sky-200/[0.04] px-4 py-4 text-center">
        <p className="text-xs tracking-[0.28em] text-sky-100/72 uppercase">
          {model.returnOfLightLabel}
        </p>
        <p className="mt-2 text-sm leading-7 text-stone-200/82">
          {model.rewardHint}
        </p>
      </div>

      <div aria-live="polite" className="min-h-1" />
    </div>
  );
}
