// Provider-agnostic AI feedback contract. The app works fully without it;
// when a provider is configured on the server, these become enhancements.

export type AiCapability = "writing-feedback" | "speaking-feedback" | "weekly-coaching";

export type AiStatus = { available: boolean; provider?: string; capabilities: AiCapability[] };

export type WritingFeedbackInput = { prompt: string; text: string; level?: string; vocabulary?: string[] };
export type SpeakingFeedbackInput = { prompt: string; transcript: string; level?: string };
export type WeeklyCoachingInput = { summary: string; level?: string };

export type AiRequest =
  | { capability: "writing-feedback"; input: WritingFeedbackInput }
  | { capability: "speaking-feedback"; input: SpeakingFeedbackInput }
  | { capability: "weekly-coaching"; input: WeeklyCoachingInput };

export type AiResponse = { ok: true; feedback: string } | { ok: false; error: string };

/** Server-side provider. Implementations must never run in the browser. */
export interface AiProvider {
  name: string;
  capabilities: AiCapability[];
  run(req: AiRequest): Promise<string>;
}
