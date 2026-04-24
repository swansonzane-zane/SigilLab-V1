import { listReadingRecords } from "@/services/readings-service";
import { listShareRecords } from "@/services/shares-service";
import { getAppConfig } from "@/services/configs-service";
import type { MetricsSnapshot, ReadingRecord } from "@/types/admin";

type DistributionItem = {
  label: string;
  count: number;
  percentage: number;
};

function round1(value: number) {
  return Math.round(value * 10) / 10;
}

function percentage(part: number, total: number) {
  if (total <= 0) {
    return 0;
  }

  return round1((part / total) * 100);
}

function average(values: number[]) {
  if (values.length === 0) {
    return 0;
  }

  return round1(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function buildDistribution(
  records: ReadingRecord[],
  pickLabel: (record: ReadingRecord) => string,
): DistributionItem[] {
  if (records.length === 0) {
    return [];
  }

  const buckets = new Map<string, number>();

  for (const record of records) {
    const label = pickLabel(record) || "unknown";
    buckets.set(label, (buckets.get(label) || 0) + 1);
  }

  return Array.from(buckets.entries())
    .map(([label, count]) => ({
      label,
      count,
      percentage: percentage(count, records.length),
    }))
    .sort((a, b) => b.count - a.count);
}

function isSameUtcDay(isoDate: string, utcDay: string) {
  return isoDate.slice(0, 10) === utcDay;
}

export async function getMetricsSnapshot(): Promise<MetricsSnapshot> {
  const config = await getAppConfig();
  const readings = await listReadingRecords();
  const shares = await listShareRecords();
  const totalReadings = readings.length;
  const utcDay = new Date().toISOString().slice(0, 10);

  const successCount = readings.filter(
    (record) => record.status === "success",
  ).length;
  const fallbackCount = readings.filter(
    (record) => record.status === "fallback",
  ).length;
  const errorCount = readings.filter((record) => record.status === "error").length;
  const dailyReadings = readings.filter((record) =>
    isSameUtcDay(record.createdAt, utcDay),
  ).length;

  return {
    totalReadings,
    dailyReadings,
    successRate: percentage(successCount, totalReadings),
    fallbackRate: percentage(fallbackCount, totalReadings),
    errorRate: percentage(errorCount, totalReadings),
    averageLatencyMs: average(readings.map((record) => record.totalLatencyMs)),
    averageProviderResponseMs: average(
      readings
        .map((record) => record.providerResponseMs)
        .filter((value): value is number => typeof value === "number"),
    ),
    topIntents: buildDistribution(readings, (record) => record.intent).slice(0, 5),
    languageDistribution: buildDistribution(readings, (record) => record.language),
    ageBandDistribution: buildDistribution(readings, (record) => record.ageBand),
    zodiacDistribution: buildDistribution(readings, (record) => record.westernZodiac),
    shareCount: shares.length,
    premiumVisits: 0,
    upgradeCtaClicks: 0,
    adsEnabled: config.enableAds,
  };
}
