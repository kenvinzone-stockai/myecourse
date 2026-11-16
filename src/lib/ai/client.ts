import type { AiRequest, AiResponse, AiStatus } from "./types";

// Browser-side helper. Always resolves; never throws to the UI.
let cached: Promise<AiStatus> | null = null;

export function getAiStatus(): Promise<AiStatus> {
  // Static hosting (GitHub Pages) has no server route: AI feedback is simply off.
  if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "1") return Promise.resolve({ available: false, capabilities: [] });
  if (!cached) {
    cached = fetch("/api/ai", { cache: "no-store" })
      .then((r) => (r.ok ? (r.json() as Promise<AiStatus>) : { available: false, capabilities: [] }))
      .catch(() => ({ available: false, capabilities: [] }));
  }
  return cached;
}

export async function requestAi(req: AiRequest): Promise<AiResponse> {
  try {
    const r = await fetch("/api/ai", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(req) });
    return (await r.json()) as AiResponse;
  } catch {
    return { ok: false, error: "Network error — AI feedback is unavailable right now." };
  }
}
