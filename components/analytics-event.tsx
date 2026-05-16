"use client";

import { useEffect, useRef } from "react";

import {
  captureEvent,
  getCurrentUtmProperties,
  getReferrerHost,
  type AnalyticsProperties,
} from "@/services/analytics-service";

type AnalyticsEventProps = {
  eventName: string;
  includeLandingProperties?: boolean;
  properties?: AnalyticsProperties;
};

export function AnalyticsEvent({
  eventName,
  includeLandingProperties = false,
  properties,
}: AnalyticsEventProps) {
  const capturedRef = useRef(false);

  useEffect(() => {
    if (capturedRef.current) {
      return;
    }

    capturedRef.current = true;
    captureEvent(eventName, {
      ...(includeLandingProperties
        ? {
            source_path: window.location.pathname,
            referrer_host: getReferrerHost(),
            ...getCurrentUtmProperties(),
          }
        : {}),
      ...properties,
    });
  }, [eventName, includeLandingProperties, properties]);

  return null;
}
