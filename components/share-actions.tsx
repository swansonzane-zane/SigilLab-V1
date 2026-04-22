"use client";

import Link from "next/link";
import { useState } from "react";

import type { ShareModel } from "@/types/share";

type ShareActionsProps = {
  model: ShareModel;
};

function buildShareMessage(model: ShareModel, url: string) {
  return `${model.shareText}\n\n${url}`;
}

function buildPosterSvg(model: ShareModel, url: string) {
  const hashtags = model.hashtags.join("   ");

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1800" viewBox="0 0 1200 1800" role="img" aria-label="SigilLab share sigil">
      <defs>
        <linearGradient id="card" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#121323" />
          <stop offset="100%" stop-color="#070810" />
        </linearGradient>
        <radialGradient id="haloGold" cx="50%" cy="20%" r="60%">
          <stop offset="0%" stop-color="rgba(251,191,36,0.34)" />
          <stop offset="100%" stop-color="rgba(251,191,36,0)" />
        </radialGradient>
        <radialGradient id="haloBlue" cx="78%" cy="18%" r="36%">
          <stop offset="0%" stop-color="rgba(125,211,252,0.2)" />
          <stop offset="100%" stop-color="rgba(125,211,252,0)" />
        </radialGradient>
        <radialGradient id="haloViolet" cx="50%" cy="100%" r="52%">
          <stop offset="0%" stop-color="rgba(168,85,247,0.28)" />
          <stop offset="100%" stop-color="rgba(168,85,247,0)" />
        </radialGradient>
      </defs>
      <rect width="1200" height="1800" fill="#05060d" />
      <rect width="1200" height="1800" fill="url(#haloGold)" />
      <rect width="1200" height="1800" fill="url(#haloBlue)" />
      <rect width="1200" height="1800" fill="url(#haloViolet)" />
      <rect x="88" y="88" width="1024" height="1624" rx="72" fill="url(#card)" stroke="rgba(255,255,255,0.12)" />
      <rect x="140" y="146" width="244" height="52" rx="26" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" />
      <circle cx="176" cy="172" r="8" fill="#f5d58a" />
      <text x="200" y="180" fill="#f7e8bd" font-size="24" font-family="Georgia, serif" letter-spacing="8">SIGILLAB</text>
      <text x="600" y="296" text-anchor="middle" fill="rgba(186,230,253,0.86)" font-size="24" font-family="Georgia, serif" letter-spacing="10">EMOTIONAL READING</text>
      <circle cx="600" cy="680" r="252" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.12)" />
      <circle cx="600" cy="680" r="210" fill="none" stroke="rgba(245,215,138,0.2)" />
      <circle cx="600" cy="680" r="166" fill="none" stroke="rgba(125,211,252,0.14)" />
      <circle cx="600" cy="680" r="122" fill="none" stroke="rgba(216,180,254,0.16)" />
      <line x1="420" y1="680" x2="780" y2="680" stroke="rgba(255,255,255,0.34)" />
      <line x1="600" y1="500" x2="600" y2="860" stroke="rgba(255,255,255,0.34)" />
      <rect x="490" y="570" width="220" height="220" transform="rotate(45 600 680)" fill="none" stroke="rgba(255,255,255,0.18)" />
      <circle cx="600" cy="680" r="82" fill="none" stroke="rgba(255,255,255,0.28)" />
      <path d="M600 462 L660 598 L798 680 L660 762 L600 898 L540 762 L402 680 L540 598 Z" fill="none" stroke="rgba(255,255,255,0.76)" stroke-width="4" />
      <path d="M600 538 L718 680 L600 822 L482 680 Z" fill="none" stroke="rgba(255,255,255,0.58)" stroke-width="4" />
      <circle cx="600" cy="680" r="16" fill="#fff9eb" />
      <text x="600" y="1068" text-anchor="middle" fill="#fff5df" font-size="78" font-weight="600" font-family="Georgia, serif">${model.punchline}</text>
      <foreignObject x="188" y="1126" width="824" height="128">
        <div xmlns="http://www.w3.org/1999/xhtml" style="color:rgba(245,245,244,0.88);font:36px Georgia, serif;text-align:center;line-height:1.6;">${model.headline}</div>
      </foreignObject>
      <foreignObject x="190" y="1268" width="820" height="160">
        <div xmlns="http://www.w3.org/1999/xhtml" style="color:rgba(214,211,209,0.8);font:28px Georgia, serif;text-align:center;line-height:1.8;">${model.subtext}</div>
      </foreignObject>
      <text x="600" y="1498" text-anchor="middle" fill="rgba(231,229,228,0.74)" font-size="24" font-family="Georgia, serif">${hashtags}</text>
      <rect x="438" y="1560" width="324" height="74" rx="37" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)" />
      <text x="600" y="1606" text-anchor="middle" fill="#f4ead6" font-size="26" font-family="Georgia, serif" letter-spacing="5">${model.qrPlaceholderText}</text>
      <text x="600" y="1692" text-anchor="middle" fill="rgba(214,211,209,0.58)" font-size="22" font-family="Georgia, serif">${url}</text>
    </svg>
  `.trim();
}

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
  const [feedback, setFeedback] = useState<string | null>(null);

  const currentUrl =
    typeof window === "undefined" ? model.revealCtaHref : window.location.href;

  async function handleSaveSigil() {
    try {
      const svg = buildPosterSvg(model, currentUrl);
      const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
      const blobUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");

      anchor.href = blobUrl;
      anchor.download = "sigillab-share-sigil.svg";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(blobUrl);

      setFeedback("The sigil has been sealed into your keeping.");
    } catch {
      setFeedback(model.saveHint);
    }
  }

  async function handleSendBlessing() {
    const shareData = {
      title: model.shareTitle,
      text: model.shareText,
      url: currentUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setFeedback(model.shareSuccessMessage);
        return;
      }

      const copied = await copyToClipboard(buildShareMessage(model, currentUrl));
      setFeedback(copied ? model.copySuccessMessage : model.saveHint);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      const copied = await copyToClipboard(buildShareMessage(model, currentUrl));
      setFeedback(copied ? model.copySuccessMessage : model.saveHint);
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        <button
          type="button"
          onClick={handleSaveSigil}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-amber-100/20 bg-[linear-gradient(135deg,rgba(244,215,161,0.96),rgba(214,179,255,0.88)_56%,rgba(134,217,255,0.9))] px-5 text-sm font-semibold text-slate-950 transition hover:brightness-105"
        >
          Save Sigil
        </button>
        <button
          type="button"
          onClick={handleSendBlessing}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] px-5 text-sm font-semibold text-stone-100 transition hover:border-white/20 hover:bg-white/[0.08]"
        >
          Send Blessing
        </button>
        <Link
          href={model.revealCtaHref}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/10 bg-black/20 px-5 text-sm font-semibold text-stone-200 transition hover:border-white/18 hover:bg-white/[0.04]"
        >
          {model.revealCtaText}
        </Link>
      </div>

      <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-center">
        <p className="text-xs tracking-[0.28em] text-amber-100/72 uppercase">
          Preserve
        </p>
        <p className="mt-2 text-sm leading-7 text-stone-200/82">
          {model.saveHint}
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

      <div
        aria-live="polite"
        className="min-h-6 text-center text-sm text-amber-50/88"
      >
        {feedback}
      </div>
    </div>
  );
}
