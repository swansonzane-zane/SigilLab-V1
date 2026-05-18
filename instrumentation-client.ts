import posthog from "posthog-js";

import { sanitizeCaptureResult } from "@/services/analytics-service";

const posthogToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const posthogHost =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
const customPersonalDataProperties = [
  "title",
  "headline",
  "punchline",
  "ritualPhrase",
  "subtext",
  "birthDate",
  "birthYear",
  "ageBand",
  "westernZodiac",
  "zodiac",
  "intent",
  "language",
];

function isAdminPath(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

try {
  if (
    posthogToken &&
    typeof window !== "undefined" &&
    !isAdminPath(window.location.pathname)
  ) {
    posthog.init(posthogToken, {
      api_host: posthogHost,
      autocapture: false,
      capture_pageview: false,
      capture_pageleave: false,
      before_send: (captureResult) => sanitizeCaptureResult(captureResult),
      disable_session_recording: true,
      disable_surveys: true,
      advanced_disable_flags: true,
      mask_personal_data_properties: true,
      custom_personal_data_properties: customPersonalDataProperties,
      person_profiles: "identified_only",
    });
  }
} catch {
  // Analytics must never block the public ritual flow.
}
