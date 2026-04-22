import { NextResponse } from "next/server";

import { generateReadingWithMeta } from "@/engine/generate-reading";
import {
  buildReadingInputFromBody,
  hasValidReadingInputShape,
  isReadingInputCandidate,
} from "@/engine/reading-request";
import { createReadingRecord } from "@/services/readings-service";

const RATE_LIMIT_WINDOW_MS = 30_000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const rateLimitStore = new Map<string, number[]>();

function getClientIdentifier(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(clientId: string) {
  const now = Date.now();
  const recentHits = (rateLimitStore.get(clientId) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  recentHits.push(now);
  rateLimitStore.set(clientId, recentHits);

  return recentHits.length > RATE_LIMIT_MAX_REQUESTS;
}

function errorJson(status: number, code: string, message: string) {
  return NextResponse.json(
    {
      ok: false,
      code,
      message,
    },
    { status },
  );
}

export async function POST(request: Request) {
  try {
    const clientId = getClientIdentifier(request);

    if (isRateLimited(clientId)) {
      return errorJson(
        429,
        "rate_limited",
        "Too many reading requests. Please wait a moment and try again.",
      );
    }

    const body = (await request.json()) as unknown;

    if (!isReadingInputCandidate(body) || !hasValidReadingInputShape(body)) {
      return errorJson(
        400,
        "invalid_input",
        "Invalid reading input. Expected birthYear, ageBand, westernZodiac, intent, and language.",
      );
    }

    const input = buildReadingInputFromBody(body);
    const { output, meta } = await generateReadingWithMeta(input);

    await createReadingRecord({
      input,
      output,
      meta,
    });

    if (meta.status === "error") {
      return errorJson(
        503,
        meta.errorReason || "reading_unavailable",
        "Reading generation is temporarily unavailable. Please try again shortly.",
      );
    }

    return NextResponse.json(output);
  } catch {
    return errorJson(
      500,
      "reading_request_failed",
      "Unable to generate reading.",
    );
  }
}
