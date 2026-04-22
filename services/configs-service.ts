import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import type { AppConfig } from "@/types/admin";

const dataDir = path.join(process.cwd(), "data");
const configsFilePath = path.join(dataDir, "configs.json");

const defaultAppConfig: AppConfig = {
  defaultLanguage: "en",
  enableShare: true,
  enableFallback: true,
  enablePremiumPlaceholder: true,
  maxJournalPrompts: 3,
};

async function ensureConfigsFile() {
  await mkdir(dataDir, { recursive: true });

  try {
    const content = await readFile(configsFilePath, "utf-8");

    if (!content.trim()) {
      await writeFile(
        configsFilePath,
        `${JSON.stringify(defaultAppConfig, null, 2)}\n`,
        "utf-8",
      );
    }
  } catch {
    await writeFile(
      configsFilePath,
      `${JSON.stringify(defaultAppConfig, null, 2)}\n`,
      "utf-8",
    );
  }
}

function isLanguage(value: unknown): value is AppConfig["defaultLanguage"] {
  return value === "en" || value === "es";
}

function normalizeAppConfig(value: unknown): AppConfig {
  if (!value || typeof value !== "object") {
    return defaultAppConfig;
  }

  const config = value as Record<string, unknown>;

  return {
    defaultLanguage: isLanguage(config.defaultLanguage)
      ? config.defaultLanguage
      : defaultAppConfig.defaultLanguage,
    enableShare:
      typeof config.enableShare === "boolean"
        ? config.enableShare
        : defaultAppConfig.enableShare,
    enableFallback:
      typeof config.enableFallback === "boolean"
        ? config.enableFallback
        : defaultAppConfig.enableFallback,
    enablePremiumPlaceholder:
      typeof config.enablePremiumPlaceholder === "boolean"
        ? config.enablePremiumPlaceholder
        : defaultAppConfig.enablePremiumPlaceholder,
    maxJournalPrompts:
      typeof config.maxJournalPrompts === "number" &&
      Number.isFinite(config.maxJournalPrompts)
        ? Math.min(5, Math.max(1, Math.round(config.maxJournalPrompts)))
        : defaultAppConfig.maxJournalPrompts,
  };
}

export async function getAppConfig(): Promise<AppConfig> {
  await ensureConfigsFile();
  const fileContents = await readFile(configsFilePath, "utf-8");
  const trimmed = fileContents.trim();

  if (!trimmed) {
    return defaultAppConfig;
  }

  try {
    return normalizeAppConfig(JSON.parse(trimmed));
  } catch {
    return defaultAppConfig;
  }
}

export async function saveAppConfig(config: AppConfig): Promise<AppConfig> {
  const normalizedConfig = normalizeAppConfig(config);

  await ensureConfigsFile();
  await writeFile(
    configsFilePath,
    `${JSON.stringify(normalizedConfig, null, 2)}\n`,
    "utf-8",
  );

  return normalizedConfig;
}
