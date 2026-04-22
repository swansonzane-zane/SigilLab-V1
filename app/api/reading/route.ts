import { NextResponse } from "next/server";

import { generateReadingWithMeta } from "@/engine/generate-reading";
import {
  buildReadingInputFromBody,
  hasValidReadingInputShape,
  isReadingInputCandidate,
} from "@/engine/reading-request";
import { createReadingRecord } from "@/services/readings-service";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown;

    if (!isReadingInputCandidate(body) || !hasValidReadingInputShape(body)) {
      return NextResponse.json(
        {
          error:
            "Invalid reading input. Expected birthYear, ageBand, westernZodiac, intent, and language.",
        },
        { status: 400 },
      );
    }

    const input = buildReadingInputFromBody(body);
    const { output, meta } = await generateReadingWithMeta(input);

    await createReadingRecord({
      input,
      output,
      meta,
    });

    return NextResponse.json(output);
  } catch {
    return NextResponse.json(
      { error: "Unable to generate reading." },
      { status: 500 },
    );
  }
}
