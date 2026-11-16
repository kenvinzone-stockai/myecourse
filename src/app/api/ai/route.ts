import { getProvider } from "@/lib/ai/server";
import type { AiRequest, AiResponse, AiStatus } from "@/lib/ai/types";

export async function GET() {
  const provider = getProvider();
  const status: AiStatus = provider ? { available: true, provider: provider.name, capabilities: provider.capabilities } : { available: false, capabilities: [] };
  return Response.json(status);
}

const MAX_TEXT = 6000;

export async function POST(request: Request) {
  const provider = getProvider();
  if (!provider) return Response.json({ ok: false, error: "No AI provider is configured. Use the self-review rubric." } satisfies AiResponse, { status: 501 });
  let body: AiRequest;
  try {
    body = (await request.json()) as AiRequest;
  } catch {
    return Response.json({ ok: false, error: "Invalid request." } satisfies AiResponse, { status: 400 });
  }
  if (!body || !provider.capabilities.includes(body.capability)) {
    return Response.json({ ok: false, error: "Unsupported capability." } satisfies AiResponse, { status: 400 });
  }
  if (JSON.stringify(body.input ?? {}).length > MAX_TEXT) {
    return Response.json({ ok: false, error: "Text is too long for feedback." } satisfies AiResponse, { status: 413 });
  }
  try {
    const feedback = await provider.run(body);
    return Response.json({ ok: true, feedback } satisfies AiResponse);
  } catch (e) {
    return Response.json({ ok: false, error: e instanceof Error ? e.message : "AI request failed." } satisfies AiResponse, { status: 502 });
  }
}
