import posthog from "posthog-js";
import type { CaptureResult } from "@posthog/types";

type AnalyticsPrimitive = string | number | boolean | null;
export type AnalyticsProperties = Record<
  string,
  AnalyticsPrimitive | undefined
>;

const posthogToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const MANUAL_PROPERTY_ALLOWLIST = new Set([
  "intent",
  "westernZodiac",
  "zodiac",
  "ageBand",
  "language",
  "shareId",
  "status",
  "fallbackReason",
  "providerResponseMs",
  "totalLatencyMs",
  "source_path",
  "referrer_host",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "usedToday",
  "dailyFreeLimit",
]);
const SENSITIVE_PROPERTY_KEYS = new Set([
  "birthDate",
  "birthYear",
  "title",
  "headline",
  "punchline",
  "ritualPhrase",
  "subtext",
]);
const URL_PROPERTY_KEYS = new Set([
  "$current_url",
  "$pathname",
  "$referrer",
  "current_url",
  "currentUrl",
  "url",
  "Url",
  "Current URL",
  "Screen",
  "screen",
]);

export function isAdminPath(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

function getCurrentPathname() {
  if (typeof window === "undefined") {
    return "";
  }

  return window.location.pathname;
}

function cleanProperties(properties?: AnalyticsProperties) {
  if (!properties) {
    return undefined;
  }

  return Object.fromEntries(
    Object.entries(properties).filter(([, value]) => value !== undefined),
  );
}

function sanitizePathname(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return "/";
  }

  const fallbackOrigin =
    typeof window !== "undefined" ? window.location.origin : "http://localhost";

  try {
    const parsed = trimmed.startsWith("/")
      ? new URL(trimmed, fallbackOrigin)
      : new URL(trimmed);

    if (
      typeof window !== "undefined" &&
      parsed.origin === window.location.origin
    ) {
      return parsed.pathname || "/";
    }

    return `${parsed.origin}${parsed.pathname || "/"}`;
  } catch {
    if (trimmed.startsWith("/")) {
      const [pathname] = trimmed.split(/[?#]/, 1);

      return pathname || "/";
    }

    return trimmed.split(/[?#]/, 1)[0] || "/";
  }
}

function sanitizeUrlProperty(value: unknown) {
  if (typeof value !== "string") {
    return undefined;
  }

  return sanitizePathname(value);
}

export function sanitizePostHogProperties(
  properties?: Record<string, unknown>,
) {
  if (!properties) {
    return undefined;
  }

  const sanitizedEntries = Object.entries(properties).flatMap(([key, value]) => {
    if (SENSITIVE_PROPERTY_KEYS.has(key)) {
      return [];
    }

    if (URL_PROPERTY_KEYS.has(key)) {
      const sanitizedUrl = sanitizeUrlProperty(value);

      return sanitizedUrl ? [[key, sanitizedUrl] as const] : [];
    }

    return [[key, value] as const];
  });

  return Object.fromEntries(sanitizedEntries);
}

export function sanitizeCaptureResult(
  captureResult: CaptureResult | null,
): CaptureResult | null {
  if (!captureResult) {
    return null;
  }

  const sanitizedProperties = sanitizePostHogProperties(captureResult.properties);
  const pathname =
    typeof sanitizedProperties?.$pathname === "string"
      ? sanitizedProperties.$pathname
      : getCurrentPathname();

  if (isAdminPath(pathname)) {
    return null;
  }

  return {
    ...captureResult,
    properties: sanitizedProperties || {},
    $set: sanitizePostHogProperties(captureResult.$set),
    $set_once: sanitizePostHogProperties(captureResult.$set_once),
  };
}

function sanitizeManualProperties(properties?: AnalyticsProperties) {
  if (!properties) {
    return undefined;
  }

  const sanitizedEntries = Object.entries(properties).flatMap(([key, value]) => {
    if (
      value === undefined ||
      !MANUAL_PROPERTY_ALLOWLIST.has(key) ||
      SENSITIVE_PROPERTY_KEYS.has(key)
    ) {
      return [];
    }

    if (key === "source_path" && typeof value === "string") {
      return [[key, sanitizePathname(value)] as const];
    }

    return [[key, value] as const];
  });

  return Object.fromEntries(sanitizedEntries) as AnalyticsProperties;
}

export function isAnalyticsEnabled() {
  return Boolean(
    posthogToken &&
      typeof window !== "undefined" &&
      !isAdminPath(getCurrentPathname()),
  );
}

export function captureEvent(
  eventName: string,
  properties?: AnalyticsProperties,
) {
  if (!isAnalyticsEnabled()) {
    return;
  }

  try {
    posthog.capture(
      eventName,
      cleanProperties(sanitizeManualProperties(properties)),
    );
  } catch {
    return;
  }
}

export function getReferrerHost() {
  if (typeof document === "undefined" || !document.referrer) {
    return null;
  }

  try {
    return new URL(document.referrer).host;
  } catch {
    return null;
  }
}

export function getCurrentUtmProperties() {
  if (typeof window === "undefined") {
    return {};
  }

  const searchParams = new URLSearchParams(window.location.search);

  return {
    utm_source: searchParams.get("utm_source"),
    utm_medium: searchParams.get("utm_medium"),
    utm_campaign: searchParams.get("utm_campaign"),
  };
}
