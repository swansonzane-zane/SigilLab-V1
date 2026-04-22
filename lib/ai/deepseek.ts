type DeepSeekMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export class DeepSeekError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

type CallDeepSeekChatCompletionInput = {
  messages: DeepSeekMessage[];
  temperature?: number;
  maxTokens?: number;
};

type DeepSeekChatCompletionResponse = {
  choices?: Array<{
    message?: {
      content?: string | null;
    };
  }>;
};

export function getDeepSeekRuntimeConfig() {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  const baseUrl = process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com";
  const model = process.env.DEEPSEEK_MODEL || "deepseek-chat";

  return {
    apiKey,
    baseUrl: baseUrl.replace(/\/$/, ""),
    model,
  };
}

export async function callDeepSeekChatCompletion({
  messages,
  temperature = 1.15,
  maxTokens = 900,
}: CallDeepSeekChatCompletionInput): Promise<string> {
  const { apiKey, baseUrl, model } = getDeepSeekRuntimeConfig();

  if (!apiKey) {
    throw new DeepSeekError("missing_api_key", "Missing DEEPSEEK_API_KEY");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        stream: false,
        temperature,
        max_tokens: maxTokens,
        response_format: {
          type: "json_object",
        },
      }),
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorText = await response.text();

      throw new DeepSeekError(
        "provider_http_error",
        `DeepSeek request failed with status ${response.status}: ${errorText}`,
      );
    }

    const data = (await response.json()) as DeepSeekChatCompletionResponse;
    const content = data.choices?.[0]?.message?.content?.trim();

    if (!content) {
      throw new DeepSeekError(
        "empty_response",
        "DeepSeek response did not include message content",
      );
    }

    return content;
  } catch (error) {
    if (error instanceof DeepSeekError) {
      throw error;
    }

    if (error instanceof Error && error.name === "AbortError") {
      throw new DeepSeekError("timeout", "DeepSeek request timed out");
    }

    throw new DeepSeekError(
      "provider_http_error",
      error instanceof Error ? error.message : "Unknown provider failure",
    );
  } finally {
    clearTimeout(timeout);
  }
}
