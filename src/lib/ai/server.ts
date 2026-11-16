import "server-only";
import { buildPrompt } from "./prompts";
import type { AiCapability, AiProvider, AiRequest } from "./types";

// Anthropic (Claude) provider, configured only through server environment
// variables. Keys never reach the browser.
class AnthropicProvider implements AiProvider {
  name = "anthropic";
  capabilities: AiCapability[] = ["writing-feedback", "speaking-feedback", "weekly-coaching"];
  constructor(
    private apiKey: string,
    private model: string,
  ) {}

  async run(req: AiRequest): Promise<string> {
    const { system, user } = buildPrompt(req);
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": this.apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({ model: this.model, max_tokens: 900, system, messages: [{ role: "user", content: user }] }),
    });
    if (!res.ok) throw new Error(`AI provider error (${res.status})`);
    const data = (await res.json()) as { content?: { type: string; text?: string }[] };
    return (data.content ?? []).map((c) => c.text ?? "").join("\n").trim();
  }
}

export function getProvider(): AiProvider | null {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;
  return new AnthropicProvider(key, process.env.AI_MODEL || "claude-sonnet-5-5");
}
