import { NextResponse } from "next/server";

import {
  savePromptVersion,
  setActivePromptVersion,
} from "@/services/prompts-service";
import type { PromptVersion } from "@/types/admin";

function isPromptStatus(value: unknown): value is PromptVersion["status"] {
  return value === "active" || value === "inactive";
}

function isPromptVersionCandidate(value: unknown): value is PromptVersion {
  if (!value || typeof value !== "object") {
    return false;
  }

  const prompt = value as Record<string, unknown>;

  return (
    typeof prompt.versionId === "string" &&
    typeof prompt.name === "string" &&
    isPromptStatus(prompt.status) &&
    typeof prompt.systemPrompt === "string" &&
    typeof prompt.userPromptTemplate === "string" &&
    typeof prompt.createdAt === "string"
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown;

    if (!isPromptVersionCandidate(body)) {
      return NextResponse.json(
        { error: "Invalid prompt payload." },
        { status: 400 },
      );
    }

    const savedPrompt = await savePromptVersion(body);

    return NextResponse.json(savedPrompt);
  } catch {
    return NextResponse.json(
      { error: "Unable to save prompt version." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = (await request.json()) as unknown;

    if (
      !body ||
      typeof body !== "object" ||
      typeof (body as { versionId?: unknown }).versionId !== "string"
    ) {
      return NextResponse.json(
        { error: "Invalid active prompt request." },
        { status: 400 },
      );
    }

    const updatedPrompt = await setActivePromptVersion(
      (body as { versionId: string }).versionId,
    );

    if (!updatedPrompt) {
      return NextResponse.json(
        { error: "Prompt version not found." },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedPrompt);
  } catch {
    return NextResponse.json(
      { error: "Unable to update active prompt." },
      { status: 500 },
    );
  }
}
