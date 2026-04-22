import { NextResponse } from "next/server";

import { getAppConfig, saveAppConfig } from "@/services/configs-service";
import type { AppConfig } from "@/types/admin";

function isConfigCandidate(value: unknown): value is AppConfig {
  if (!value || typeof value !== "object") {
    return false;
  }

  const config = value as Record<string, unknown>;

  return (
    (config.defaultLanguage === "en" || config.defaultLanguage === "es") &&
    typeof config.enableShare === "boolean" &&
    typeof config.enableFallback === "boolean" &&
    typeof config.enablePremiumPlaceholder === "boolean" &&
    typeof config.maxJournalPrompts === "number"
  );
}

export async function GET() {
  const config = await getAppConfig();

  return NextResponse.json(config);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown;

    if (!isConfigCandidate(body)) {
      return NextResponse.json(
        { error: "Invalid config payload." },
        { status: 400 },
      );
    }

    const savedConfig = await saveAppConfig(body);

    return NextResponse.json(savedConfig);
  } catch {
    return NextResponse.json(
      { error: "Unable to save config." },
      { status: 500 },
    );
  }
}
