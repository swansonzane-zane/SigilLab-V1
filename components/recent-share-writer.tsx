"use client";

import { useEffect } from "react";

import { saveRecentShare } from "@/services/recent-share-service";
import type { ShareModel } from "@/types/share";

type RecentShareWriterProps = {
  model: ShareModel;
};

export function RecentShareWriter({ model }: RecentShareWriterProps) {
  useEffect(() => {
    saveRecentShare(model);
  }, [model]);

  return null;
}
