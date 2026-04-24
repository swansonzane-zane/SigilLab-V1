"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import type { AppConfig } from "@/types/admin";

type AdminConfigsEditorProps = {
  config: AppConfig;
};

const toggleFields = [
  {
    key: "enableShare",
    label: "Enable Share",
    note: "Controls whether the result page exposes the share action.",
  },
  {
    key: "enableFallback",
    label: "Enable Fallback",
    note: "Allows mock reading fallback when AI generation fails.",
  },
  {
    key: "enablePremiumPlaceholder",
    label: "Enable Premium Placeholder",
    note: "Stored for future premium surface toggles.",
  },
  {
    key: "enableAds",
    label: "Enable Ads",
    note: "Controls sponsored placeholders for non-premium front-end users.",
  },
  {
    key: "enablePremium",
    label: "Enable Premium",
    note: "Allows the mock premium URL flag and upgrade entry points.",
  },
] as const;

export function AdminConfigsEditor({ config }: AdminConfigsEditorProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [formState, setFormState] = useState<AppConfig>(config);

  function updateField<K extends keyof AppConfig>(key: K, value: AppConfig[K]) {
    setFormState((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function toggleField(
    key: (typeof toggleFields)[number]["key"],
  ) {
    updateField(key, !formState[key]);
  }

  async function handleSave() {
    setMessage(null);

    const response = await fetch("/api/admin/configs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    });

    if (!response.ok) {
      setMessage("Unable to save config.");
      return;
    }

    setMessage("Config saved.");
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-[11px] tracking-[0.22em] text-stone-300/55 uppercase">
            Default Language
          </span>
          <select
            value={formState.defaultLanguage}
            onChange={(event) =>
              updateField("defaultLanguage", event.target.value as "en" | "es")
            }
            className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-stone-100 outline-none transition focus:border-amber-200/35"
          >
            <option value="en">EN</option>
            <option value="es">ES</option>
          </select>
        </label>

        <label className="block space-y-2">
          <span className="text-[11px] tracking-[0.22em] text-stone-300/55 uppercase">
            Max Journal Prompts
          </span>
          <input
            type="number"
            min={1}
            max={5}
            value={formState.maxJournalPrompts}
            onChange={(event) =>
              updateField(
                "maxJournalPrompts",
                Math.min(5, Math.max(1, Number.parseInt(event.target.value, 10) || 1)),
              )
            }
            className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-stone-100 outline-none transition focus:border-amber-200/35"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-[11px] tracking-[0.22em] text-stone-300/55 uppercase">
            Daily Free Limit
          </span>
          <input
            type="number"
            min={0}
            max={20}
            value={formState.dailyFreeLimit}
            onChange={(event) =>
              updateField(
                "dailyFreeLimit",
                Math.min(
                  20,
                  Math.max(0, Number.parseInt(event.target.value, 10) || 0),
                ),
              )
            }
            className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-stone-100 outline-none transition focus:border-amber-200/35"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-[11px] tracking-[0.22em] text-stone-300/55 uppercase">
            Monthly Premium Price
          </span>
          <input
            type="number"
            min={0}
            step={0.01}
            value={formState.premiumMonthlyPrice}
            onChange={(event) =>
              updateField(
                "premiumMonthlyPrice",
                Number.parseFloat(event.target.value) || 0,
              )
            }
            className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-stone-100 outline-none transition focus:border-amber-200/35"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-[11px] tracking-[0.22em] text-stone-300/55 uppercase">
            Yearly Premium Price
          </span>
          <input
            type="number"
            min={0}
            step={0.01}
            value={formState.premiumYearlyPrice}
            onChange={(event) =>
              updateField(
                "premiumYearlyPrice",
                Number.parseFloat(event.target.value) || 0,
              )
            }
            className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-stone-100 outline-none transition focus:border-amber-200/35"
          />
        </label>
      </div>

      <div className="grid gap-3">
        {toggleFields.map((item) => (
          <label
            key={item.key}
            className="flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4"
          >
            <div>
              <p className="text-sm font-medium text-stone-100">{item.label}</p>
              <p className="mt-1 text-sm leading-6 text-stone-300/72">
                {item.note}
              </p>
            </div>
            <button
              type="button"
              onClick={() => toggleField(item.key)}
              className={[
                "inline-flex min-w-20 items-center justify-center rounded-full border px-4 py-2 text-sm font-medium transition",
                formState[item.key]
                  ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-100"
                  : "border-white/10 bg-white/[0.04] text-stone-300/76",
              ].join(" ")}
            >
              {formState[item.key] ? "On" : "Off"}
            </button>
          </label>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={handleSave}
          disabled={isPending}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f4d7a1,#d6b3ff_54%,#86d9ff)] px-5 text-sm font-semibold text-slate-950 transition hover:brightness-105 disabled:opacity-60"
        >
          Save Config
        </button>
        <p className="text-sm text-stone-300/72">
          {message || "Changes persist to the local config file and refresh the admin surface."}
        </p>
      </div>
    </div>
  );
}
