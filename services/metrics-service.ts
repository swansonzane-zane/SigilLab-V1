import type { MetricsSnapshot } from "@/types/admin";

const metricsSnapshot: MetricsSnapshot = {
  dailyReadings: 128,
  successRate: 82,
  fallbackRate: 18,
  averageLatencyMs: 640,
  topIntents: [
    { intent: "clarity", count: 42 },
    { intent: "healing", count: 31 },
    { intent: "focus", count: 24 },
    { intent: "release", count: 18 },
  ],
  languageDistribution: [
    { language: "en", count: 116 },
    { language: "es", count: 12 },
  ],
};

export function getMetricsSnapshot(): MetricsSnapshot {
  return metricsSnapshot;
}
