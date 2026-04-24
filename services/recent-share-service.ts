"use client";

import { buildShareMessage } from "@/lib/share-flow";
import type { ShareMessageModel, ShareModel } from "@/types/share";

const recentShareStorageKey = "sigillab-recent-share-v1";

type RecentSharePayload = ShareMessageModel & {
  sharedUrl: string;
  savedAt: string;
};

export function saveRecentShare(model: ShareModel, sharedUrl: string) {
  const payload: RecentSharePayload = {
    shareTitle: model.shareTitle,
    shareTextLines: model.shareTextLines,
    openSealPrefix: model.openSealPrefix,
    sharedUrl,
    savedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(recentShareStorageKey, JSON.stringify(payload));
}

export function getRecentShareMessage() {
  try {
    const rawValue = window.localStorage.getItem(recentShareStorageKey);

    if (!rawValue) {
      return null;
    }

    const parsed = JSON.parse(rawValue) as Partial<RecentSharePayload>;

    if (
      typeof parsed.shareTitle !== "string" ||
      !Array.isArray(parsed.shareTextLines) ||
      typeof parsed.openSealPrefix !== "string" ||
      typeof parsed.sharedUrl !== "string" ||
      !parsed.sharedUrl.includes("/shared/")
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
      parsed.sharedUrl,
    );
  } catch {
    return null;
  }
}
