"use client";

import Link from "next/link";

import { captureEvent } from "@/services/analytics-service";

type SharedRevealLinkProps = {
  className: string;
  href: string;
  intent?: string;
  language?: string;
  shareId: string;
  text: string;
  zodiac?: string;
};

export function SharedRevealLink({
  className,
  href,
  intent,
  language,
  shareId,
  text,
  zodiac,
}: SharedRevealLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => {
        captureEvent("reveal_your_seal_clicked", {
          source_shareId: shareId,
          intent,
          zodiac,
          language,
        });
      }}
      className={className}
    >
      {text}
    </Link>
  );
}
