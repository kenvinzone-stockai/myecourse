"use client";

// Optional browser speech features. Everything degrades gracefully: the app
// never depends on these being available.

export function canSpeak(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";
}

export function speak(text: string, opts: { rate?: number; variety?: "american" | "british" | "no-preference"; onEnd?: () => void } = {}) {
  if (!canSpeak()) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const lang = opts.variety === "british" ? "en-GB" : "en-US";
  u.lang = lang;
  u.rate = opts.rate ?? 0.95;
  const voices = window.speechSynthesis.getVoices();
  const voice = voices.find((v) => v.lang === lang) ?? voices.find((v) => v.lang.startsWith("en"));
  if (voice) u.voice = voice;
  if (opts.onEnd) u.onend = opts.onEnd;
  window.speechSynthesis.speak(u);
}

export function stopSpeaking() {
  if (canSpeak()) window.speechSynthesis.cancel();
}

// Minimal typing for the (non-standard) Web Speech recognition API.
type RecognitionResultEvent = { resultIndex: number; results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }> };
export type Recognizer = {
  start(): void;
  stop(): void;
  onresult: ((e: RecognitionResultEvent) => void) | null;
  onerror: ((e: unknown) => void) | null;
  onend: (() => void) | null;
  continuous: boolean;
  interimResults: boolean;
  lang: string;
};

export function createRecognizer(lang = "en-US"): Recognizer | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: new () => Recognizer; webkitSpeechRecognition?: new () => Recognizer };
  const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
  if (!Ctor) return null;
  try {
    const r = new Ctor();
    r.continuous = true;
    r.interimResults = true;
    r.lang = lang;
    return r;
  } catch {
    return null;
  }
}

export function canRecord(): boolean {
  return typeof window !== "undefined" && typeof MediaRecorder !== "undefined" && !!navigator.mediaDevices?.getUserMedia;
}

export function formatSeconds(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
}
