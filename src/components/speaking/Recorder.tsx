"use client";

import { useEffect, useRef, useState } from "react";
import type { SpeakingSession } from "@/lib/domain/types";
import { addSpeakingSession, audioStore, deleteSpeakingSession, updateSpeakingSession, useAppState } from "@/store/store";
import { canRecord, createRecognizer, formatSeconds, type Recognizer } from "@/lib/speech";
import { Badge, Button, cx, ProgressBar, TextArea } from "@/components/ui";
import { IconMic, IconStop, IconTrash } from "@/components/ui/icons";

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function AudioPlayer({ audioId }: { audioId: string }) {
  const [url, setUrl] = useState<string | null>(null);
  const [missing, setMissing] = useState(false);
  useEffect(() => {
    let revoked: string | null = null;
    let alive = true;
    audioStore
      .get(audioId)
      .then((blob) => {
        if (!alive) return;
        if (!blob) return setMissing(true);
        revoked = URL.createObjectURL(blob);
        setUrl(revoked);
      })
      .catch(() => alive && setMissing(true));
    return () => {
      alive = false;
      if (revoked) URL.revokeObjectURL(revoked);
    };
  }, [audioId]);
  if (missing) return <p className="text-xs text-faint">Audio not available on this device.</p>;
  if (!url) return <div className="h-10 animate-pulse rounded-lg bg-surface-2" />;
  return <audio controls src={url} className="h-10 w-full" preload="metadata" />;
}

export function SessionList({ sessions, editable = true }: { sessions: SpeakingSession[]; editable?: boolean }) {
  if (!sessions.length) return null;
  return (
    <ol className="space-y-3">
      {sessions
        .slice()
        .reverse()
        .map((s, i) => (
          <li key={s.id} className="rounded-xl border border-line p-3">
            <div className="mb-2 flex items-center justify-between gap-2 text-xs text-muted">
              <span>
                Take {sessions.length - i} · <span className="tabular-nums">{formatSeconds(s.seconds)}</span> · {new Date(s.createdAt).toLocaleString()}
              </span>
              {editable && (
                <button className="rounded p-1 text-faint hover:text-bad" aria-label="Delete recording" onClick={() => deleteSpeakingSession(s.id)}>
                  <IconTrash width={16} height={16} />
                </button>
              )}
            </div>
            {s.audioId ? <AudioPlayer audioId={s.audioId} /> : <p className="text-xs text-faint">Timed practice (no audio recorded)</p>}
            {editable && (
              <TextArea
                aria-label="Transcript (optional)"
                placeholder="Transcript (optional) — type or paste what you said"
                className="mt-2 min-h-16 text-xs"
                defaultValue={s.transcript}
                onBlur={(e) => e.target.value !== s.transcript && updateSpeakingSession(s.id, { transcript: e.target.value })}
              />
            )}
          </li>
        ))}
    </ol>
  );
}

export function Recorder({
  prompt,
  targetSeconds,
  context,
  day,
  onSaved,
  showSessions = true,
  sessionFilter,
}: {
  prompt: string;
  targetSeconds: number;
  context: SpeakingSession["context"];
  day?: number;
  onSaved?: (s: SpeakingSession) => void;
  showSessions?: boolean;
  sessionFilter?: (s: SpeakingSession) => boolean;
}) {
  const state = useAppState();
  const [supported] = useState(() => canRecord());
  const [mode, setMode] = useState<"record" | "timer">(supported ? "record" : "timer");
  const [status, setStatus] = useState<"idle" | "recording" | "saving">("idle");
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [liveText, setLiveText] = useState("");
  const [useLive, setUseLive] = useState(false);
  const [recognizerAvailable] = useState(() => createRecognizer() !== null);

  const recRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const startedAt = useRef(0);
  const timer = useRef<number | null>(null);
  const recognizer = useRef<Recognizer | null>(null);
  const finalText = useRef("");

  useEffect(
    () => () => {
      if (timer.current) window.clearInterval(timer.current);
      recRef.current?.stream.getTracks().forEach((t) => t.stop());
      recognizer.current?.stop();
    },
    [],
  );

  function startTimer() {
    startedAt.current = Date.now();
    setElapsed(0);
    timer.current = window.setInterval(() => setElapsed((Date.now() - startedAt.current) / 1000), 250);
  }

  function startRecognition() {
    if (!useLive) return;
    const r = createRecognizer(state?.profile?.variety === "british" ? "en-GB" : "en-US");
    if (!r) return;
    finalText.current = "";
    setLiveText("");
    r.onresult = (e) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i];
        if (res.isFinal) finalText.current += res[0].transcript + " ";
        else interim += res[0].transcript;
      }
      setLiveText((finalText.current + interim).trim());
    };
    r.onerror = () => undefined;
    try {
      r.start();
      recognizer.current = r;
    } catch {
      recognizer.current = null;
    }
  }

  async function start() {
    setError(null);
    if (mode === "timer") {
      setStatus("recording");
      startTimer();
      startRecognition();
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mime = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg"].find((m) => MediaRecorder.isTypeSupported?.(m));
      const rec = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
      chunks.current = [];
      rec.ondataavailable = (e) => e.data.size > 0 && chunks.current.push(e.data);
      rec.start(1000);
      recRef.current = rec;
      setStatus("recording");
      startTimer();
      startRecognition();
    } catch {
      setError("Microphone access was blocked or is unavailable. You can still practise with the timer and rate yourself.");
      setMode("timer");
    }
  }

  async function stop() {
    if (timer.current) window.clearInterval(timer.current);
    timer.current = null;
    const seconds = Math.round((Date.now() - startedAt.current) / 1000);
    recognizer.current?.stop();
    recognizer.current = null;
    const transcript = (finalText.current || liveText).trim();
    setStatus("saving");
    let audioId: string | undefined;
    const rec = recRef.current;
    if (rec) {
      const blob: Blob = await new Promise((resolve) => {
        rec.onstop = () => resolve(new Blob(chunks.current, { type: rec.mimeType || "audio/webm" }));
        rec.stop();
      });
      rec.stream.getTracks().forEach((t) => t.stop());
      recRef.current = null;
      if (blob.size > 0) {
        audioId = `audio-${uid()}`;
        try {
          await audioStore.put(audioId, blob);
        } catch {
          audioId = undefined;
          setError("The recording could not be stored on this device (storage unavailable). Duration was saved.");
        }
      }
    }
    const session: SpeakingSession = {
      id: `sp-${uid()}`,
      day,
      context,
      prompt,
      createdAt: new Date().toISOString(),
      seconds,
      audioId,
      transcript,
    };
    addSpeakingSession(session);
    onSaved?.(session);
    setStatus("idle");
    setElapsed(0);
  }

  const sessions = (state?.speaking ?? []).filter(sessionFilter ?? ((s) => s.prompt === prompt && s.day === day));
  const pct = Math.min(100, (elapsed / targetSeconds) * 100);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-line bg-surface-2/50 p-4">
        <div className="flex flex-wrap items-center gap-3">
          {status !== "recording" ? (
            <Button onClick={start} disabled={status === "saving"} aria-label={mode === "record" ? "Start recording" : "Start timer"}>
              <IconMic /> {mode === "record" ? "Record" : "Start timer"}
            </Button>
          ) : (
            <Button variant="danger" onClick={stop} aria-label="Stop and save">
              <IconStop /> Stop & save
            </Button>
          )}
          <div className="flex items-center gap-2 text-sm tabular-nums" aria-live="polite">
            {status === "recording" && <span className="rec-dot h-2.5 w-2.5 rounded-full bg-bad" aria-hidden />}
            <span className="font-medium text-ink">{formatSeconds(elapsed)}</span>
            <span className="text-faint">/ target {formatSeconds(targetSeconds)}</span>
          </div>
          {status === "saving" && <Badge>Saving…</Badge>}
          {elapsed >= targetSeconds && status === "recording" && <Badge tone="good">Target reached</Badge>}
        </div>
        <ProgressBar value={pct} className="mt-3" tone={elapsed >= targetSeconds ? "good" : "accent"} label="Speaking time vs target" />
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
          {!supported && <span>Recording is not supported in this browser — timer mode.</span>}
          {supported && mode === "timer" && (
            <button className="underline" onClick={() => setMode("record")}>
              Switch to audio recording
            </button>
          )}
          {recognizerAvailable && (
            <label className="inline-flex cursor-pointer items-center gap-1.5">
              <input type="checkbox" checked={useLive} disabled={status === "recording"} onChange={(e) => setUseLive(e.target.checked)} className="accent-[var(--accent)]" />
              Live transcript (browser speech recognition, optional)
            </label>
          )}
        </div>
        {useLive && (status === "recording" || liveText) && (
          <p className={cx("mt-3 rounded-lg bg-surface p-3 text-sm leading-relaxed", liveText ? "text-ink" : "text-faint")}>{liveText || "Listening…"}</p>
        )}
        {error && <p className="mt-3 text-sm text-bad">{error}</p>}
      </div>
      {showSessions && <SessionList sessions={sessions} />}
    </div>
  );
}
