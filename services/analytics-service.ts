"use client";

import posthog from "posthog-js";

type AnalyticsPrimitive = string | number | boolean | null;
export type AnalyticsProperties = Record<
  string,
  AnalyticsPrimitive | undefined
>;

const posthogToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

function isAdminPath(pathname: string) {
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
    posthog.capture(eventName, cleanProperties(properties));
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
