"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import type { PromptVersion } from "@/types/admin";

type AdminPromptsEditorProps = {
  prompt: PromptVersion;
};

export function AdminPromptsEditor({ prompt }: AdminPromptsEditorProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState(prompt.name);
  const [systemPrompt, setSystemPrompt] = useState(prompt.systemPrompt);
  const [userPromptTemplate, setUserPromptTemplate] = useState(
    prompt.userPromptTemplate,
  );
  const [message, setMessage] = useState<string | null>(null);

  async function handleSave() {
    setMessage(null);

    const response = await fetch("/api/admin/prompts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...prompt,
        name,
        systemPrompt,
        userPromptTemplate,
      }),
    });

    if (!response.ok) {
      setMessage("Unable to save prompt version.");
      return;
    }

    setMessage("Prompt version saved.");
    startTransition(() => {
      router.refresh();
    });
  }

  async function handleSetActive() {
    setMessage(null);

    const response = await fetch("/api/admin/prompts", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        versionId: prompt.versionId,
      }),
    });

    if (!response.ok) {
      setMessage("Unable to set active prompt.");
      return;
    }

    setMessage("Active prompt updated.");
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="font-heading text-3xl text-stone-50">{prompt.name}</h2>
        {prompt.status === "active" ? (
          <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-[11px] tracking-[0.24em] text-emerald-100 uppercase">
            Active Prompt
          </span>
        ) : null}
      </div>

      <label className="block space-y-2">
        <span className="text-[11px] tracking-[0.22em] text-stone-300/55 uppercase">
          Name
        </span>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-stone-100 outline-none transition focus:border-amber-200/35"
        />
      </label>

      <label className="block space-y-2">
        <span className="text-[11px] tracking-[0.22em] text-stone-300/55 uppercase">
          System Prompt
        </span>
        <textarea
          value={systemPrompt}
          onChange={(event) => setSystemPrompt(event.target.value)}
          rows={8}
          className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm leading-7 text-stone-100 outline-none transition focus:border-amber-200/35"
        />
      </label>

      <label className="block space-y-2">
        <span className="text-[11px] tracking-[0.22em] text-stone-300/55 uppercase">
          User Prompt Template
        </span>
        <textarea
          value={userPromptTemplate}
          onChange={(event) => setUserPromptTemplate(event.target.value)}
          rows={10}
          className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm leading-7 text-stone-100 outline-none transition focus:border-amber-200/35"
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleSave}
          disabled={isPending}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f4d7a1,#d6b3ff_54%,#86d9ff)] px-5 text-sm font-semibold text-slate-950 transition hover:brightness-105 disabled:opacity-60"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleSetActive}
          disabled={isPending || prompt.status === "active"}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] px-5 text-sm font-medium text-stone-100 transition hover:bg-white/[0.08] disabled:opacity-60"
        >
          Set Active
        </button>
      </div>

      {message ? (
        <p className="text-sm text-stone-300/76">{message}</p>
      ) : (
        <p className="text-sm text-stone-300/66">
          Use placeholder tokens like `{"{{birthYear}}"}`, `{"{{ageBand}}"}`,
          `{"{{westernZodiac}}"}`, `{"{{intent}}"}`, and `{"{{language}}"}` in
          the user prompt template.
        </p>
      )}
    </div>
  );
}
