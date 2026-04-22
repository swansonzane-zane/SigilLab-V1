"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useTransitionController } from "@/components/transition-provider";
import { buildPosterSvg, buildShareMessage } from "@/lib/share-flow";
import type { ShareModel } from "@/types/share";

type ShareActionsProps = {
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

export function ShareActions({ model }: ShareActionsProps) {
  const router = useRouter();
  const { startTransition } = useTransitionController();
  const [isSaving, setIsSaving] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const currentUrl =
    typeof window === "undefined"
      ? model.sharedPath
      : new URL(model.sharedPath, window.location.origin).toString();

  async function handleSaveSigil() {
    if (isSaving) {
      return;
    }

    setIsSaving(true);

    try {
      const svg = buildPosterSvg(model, currentUrl);
      const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
      const blobUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");

      anchor.href = blobUrl;
      anchor.download = `sigillab-${model.shareId}.svg`;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(blobUrl);

      startTransition({
        active: true,
        level: "feedback",
        title: model.saveSuccessMessage,
        message: "Keep it close while the current still answers to your name.",
      });
    } catch {
      startTransition({
        active: true,
        level: "feedback",
        title: model.saveFailureMessage,
        message: model.saveHint,
      });
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSendBlessing() {
    if (isSharing) {
      return;
    }

    setIsSharing(true);

    const shareData = {
      title: model.shareTitle,
      text: model.shareText,
      url: currentUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        startTransition({
          active: true,
          level: "feedback",
          title: model.shareSuccessMessage,
          message: "The blessing now moves beyond your own circle.",
        });
        return;
      }

      const copied = await copyToClipboard(buildShareMessage(model, currentUrl));

      if (copied) {
        startTransition({
          active: true,
          level: "feedback",
          title: model.copySuccessMessage,
          message:
            "The blessing text is ready to be placed wherever you want the seal to travel next.",
        });
      } else {
        startTransition({
          active: true,
          level: "feedback",
          title: model.shareFailureMessage,
          message: model.saveHint,
        });
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        setIsSharing(false);
        return;
      }

      const copied = await copyToClipboard(buildShareMessage(model, currentUrl));

      if (copied) {
        startTransition({
          active: true,
          level: "feedback",
          title: model.copySuccessMessage,
          message:
            "Native share closed its gate, so the blessing has been copied for manual sending instead.",
        });
      } else {
        startTransition({
          active: true,
          level: "feedback",
          title: model.shareFailureMessage,
          message: model.saveHint,
        });
      }
    } finally {
      setIsSharing(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        <button
          type="button"
          onClick={handleSaveSigil}
          disabled={isSaving}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-amber-100/20 bg-[linear-gradient(135deg,rgba(244,215,161,0.96),rgba(214,179,255,0.88)_56%,rgba(134,217,255,0.9))] px-5 text-sm font-semibold text-slate-950 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSaving ? "Sealing the sigil..." : "Save Sigil"}
        </button>
        <button
          type="button"
          onClick={handleSendBlessing}
          disabled={isSharing}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] px-5 text-sm font-semibold text-stone-100 transition hover:border-white/20 hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSharing ? "Sending the blessing..." : "Send Blessing"}
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
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/10 bg-black/20 px-5 text-sm font-semibold text-stone-200 transition hover:border-white/18 hover:bg-white/[0.04]"
        >
          {model.revealCtaText}
        </button>
      </div>

      <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-center">
        <p className="text-xs tracking-[0.28em] text-amber-100/72 uppercase">
          Preserve
        </p>
        <p className="mt-2 text-sm leading-7 text-stone-200/82">
          {model.saveHint}
        </p>
      </div>

      <div className="rounded-[1.6rem] border border-emerald-200/10 bg-emerald-200/[0.04] px-4 py-4 text-center">
        <p className="text-xs tracking-[0.28em] text-emerald-100/72 uppercase">
          Privacy Boundary
        </p>
        <p className="mt-2 text-sm leading-7 text-stone-200/82">
          {model.privacyNotice}
        </p>
      </div>

      <div className="rounded-[1.6rem] border border-sky-200/12 bg-sky-200/[0.04] px-4 py-4 text-center">
        <p className="text-xs tracking-[0.28em] text-sky-100/72 uppercase">
          Return Of Light
        </p>
        <p className="mt-2 text-sm leading-7 text-stone-200/82">
          {model.rewardHint}
        </p>
      </div>

      <div aria-live="polite" className="min-h-1" />
    </div>
  );
}
