"use client";

import { buildShareMessage } from "@/lib/share-flow";
import type { ShareMessageModel, ShareModel } from "@/types/share";

const recentShareStorageKey = "sigillab-recent-share-v1";

type RecentSharePayload = ShareMessageModel & {
  sharedPath: string;
  sharedUrl?: string;
  savedAt: string;
};

function getShareUrl(sharedPath: string) {
  if (!sharedPath.startsWith("/shared/")) {
    return null;
  }

  return new URL(sharedPath, window.location.origin).toString();
}

export function saveRecentShare(model: ShareModel) {
  if (typeof window === "undefined") {
    return;
  }

  if (!model.sharedPath.startsWith("/shared/")) {
    return;
  }

  const payload: RecentSharePayload = {
    shareTitle: model.shareTitle,
    shareTextLines: model.shareTextLines,
    openSealPrefix: model.openSealPrefix,
    sharedPath: model.sharedPath,
    savedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(recentShareStorageKey, JSON.stringify(payload));
}

export function getRecentShareMessage() {
  try {
    if (typeof window === "undefined") {
      return null;
    }

    const rawValue = window.localStorage.getItem(recentShareStorageKey);

    if (!rawValue) {
      return null;
    }

    const parsed = JSON.parse(rawValue) as Partial<RecentSharePayload>;
    const sharedUrl =
      typeof parsed.sharedPath === "string"
        ? getShareUrl(parsed.sharedPath)
        : typeof parsed.sharedUrl === "string" &&
            parsed.sharedUrl.includes("/shared/")
          ? parsed.sharedUrl
          : null;

    if (
      typeof parsed.shareTitle !== "string" ||
      !Array.isArray(parsed.shareTextLines) ||
      typeof parsed.openSealPrefix !== "string" ||
      !sharedUrl
    ) {
      return null;
    }

    return buildShareMessage(
      {
        shareTitle: parsed.shareTitle,
        shareTextLines: parsed.shareTextLines.filter(
          (line): line is string => typeof line === "string",
        ),
        openSealPrefix: parsed.openSealPrefix,
      },
      sharedUrl,
    );
  } catch {
    return null;
  }
}
