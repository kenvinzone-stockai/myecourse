"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Rubric } from "@/lib/domain/types";
import { analyseWriting, countWords, WRITING_CHECKLIST, WRITING_RUBRIC } from "@/lib/engine/writing";
import { getAiStatus, requestAi } from "@/lib/ai/client";
import type { AiStatus } from "@/lib/ai/types";
import { Badge, Button, Checkbox, cx, Rating, TextArea } from "@/components/ui";
import { IconCheck, IconSparkle } from "@/components/ui/icons";

export function useAiStatus() {
  const [status, setStatus] = useState<AiStatus | null>(null);
  useEffect(() => {
    let alive = true;
    getAiStatus().then((s) => alive && setStatus(s));
    return () => {
      alive = false;
    };
  }, []);
  return status;
}

/** Debounced text editor that persists through `onSave`. */
export function AutosaveTextArea({
  value,
  onSave,
  className,
  placeholder,
  ariaLabel,
  minHeight = "min-h-64",
  onLiveChange,
}: {
  value: string;
  onSave: (v: string) => void;
  className?: string;
  placeholder?: string;
  ariaLabel: string;
  minHeight?: string;
  onLiveChange?: (v: string) => void;
}) {
  const [text, setText] = useState(value);
  const [saved, setSaved] = useState(true);
  const t = useRef<number | null>(null);
  const latest = useRef(text);
  const save = useRef(onSave);
  useEffect(() => {
    latest.current = text;
    save.current = onSave;
  });

  useEffect(
    () => () => {
      if (t.current) {
        window.clearTimeout(t.current);
        save.current(latest.current);
      }
    },
    [],
  );

  return (
    <div className="relative">
      <TextArea
        aria-label={ariaLabel}
        value={text}
        placeholder={placeholder}
        spellCheck
        onChange={(e) => {
          const v = e.target.value;
          setText(v);
          onLiveChange?.(v);
          setSaved(false);
          if (t.current) window.clearTimeout(t.current);
          t.current = window.setTimeout(() => {
            save.current(v);
            t.current = null;
            setSaved(true);
          }, 600);
        }}
        className={cx(minHeight, "font-serif text-[15px]", className)}
      />
      <span className="pointer-events-none absolute bottom-2 right-3 text-[11px] text-faint" aria-live="polite">
        {saved ? "Saved" : "Saving…"}
      </span>
    </div>
  );
}

export function WritingEditor({
  draft,
  onDraft,
  minWords,
  maxWords,
  vocab,
  prompt,
  level,
  checklist,
  onChecklist,
  rubric,
  onRubric,
  aiFeedback,
  onAiFeedback,
  submitted,
  onSubmit,
  submitLabel = "Submit writing",
}: {
  draft: string;
  onDraft: (v: string) => void;
  minWords: number;
  maxWords: number;
  vocab?: string[];
  prompt: string;
  level?: string;
  checklist?: Record<string, boolean>;
  onChecklist?: (c: Record<string, boolean>) => void;
  rubric: Rubric;
  onRubric: (r: Rubric) => void;
  aiFeedback?: string;
  onAiFeedback?: (f: string) => void;
  submitted?: boolean;
  onSubmit?: (analysisScore: number) => void;
  submitLabel?: string;
}) {
  const [live, setLive] = useState(draft);
  const words = countWords(live);
  const analysis = useMemo(() => analyseWriting(live, { minWords, maxWords, vocab }), [live, minWords, maxWords, vocab]);
  const [showReview, setShowReview] = useState(submitted || words >= minWords);
  const ai = useAiStatus();
  const [aiBusy, setAiBusy] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const rubricComplete = WRITING_RUBRIC.every((c) => (rubric[c.id] ?? 0) >= 1);

  async function getFeedback() {
    setAiBusy(true);
    setAiError(null);
    const r = await requestAi({ capability: "writing-feedback", input: { prompt, text: live, level, vocabulary: vocab } });
    setAiBusy(false);
    if (r.ok) onAiFeedback?.(r.feedback);
    else setAiError(r.error);
  }

  const wordTone = words === 0 ? "neutral" : words < minWords ? "warn" : words > maxWords * 1.15 ? "warn" : "good";

  return (
    <div className="space-y-5">
      <div>
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-muted">
            Target: {minWords}–{maxWords} words
          </span>
          <Badge tone={wordTone}>
            <span className="tabular-nums">{words}</span> words
          </Badge>
        </div>
        <AutosaveTextArea value={draft} onSave={onDraft} onLiveChange={setLive} ariaLabel="Your writing" placeholder="Start writing in English. Your draft saves automatically." />
      </div>

      {!showReview && words > 0 && (
        <Button variant="secondary" onClick={() => setShowReview(true)}>
          I&apos;ve finished my draft — review it
        </Button>
      )}

      {showReview && (
        <div className="space-y-5 animate-in">
          <div className="rounded-xl border border-line p-4">
            <p className="mb-2 text-sm font-medium text-ink">Automatic checks</p>
            <ul className="space-y-1.5 text-sm">
              {analysis.signals.map((s) => (
                <li key={s.id} className="flex gap-2">
                  <span className={cx("mt-0.5 shrink-0", s.ok ? "text-good" : "text-warn")} aria-hidden>
                    {s.ok ? "✓" : "•"}
                  </span>
                  <span className={s.ok ? "text-muted" : "text-ink"}>{s.message}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-faint">These are simple text signals, not a grammar check. Use them with the checklist below.</p>
          </div>

          {onChecklist && checklist && (
            <div>
              <p className="mb-1 text-sm font-medium text-ink">Self-review checklist</p>
              <div className="grid gap-0.5 sm:grid-cols-2">
                {WRITING_CHECKLIST.map((c) => (
                  <Checkbox key={c} label={c} checked={!!checklist[c]} onChange={(v) => onChecklist({ ...checklist, [c]: v })} />
                ))}
              </div>
            </div>
          )}

          {ai?.available && onAiFeedback && (
            <div className="rounded-xl border border-line p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium text-ink">AI feedback (optional)</p>
                <Button size="sm" variant="secondary" onClick={getFeedback} disabled={aiBusy || words < 10}>
                  <IconSparkle /> {aiBusy ? "Asking…" : aiFeedback ? "Ask again" : "Get feedback"}
                </Button>
              </div>
              {aiError && <p className="mt-2 text-sm text-bad">{aiError}</p>}
              {aiFeedback && <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed text-ink">{aiFeedback}</pre>}
            </div>
          )}

          <div>
            <p className="mb-3 text-sm font-medium text-ink">Rate your writing (1 = weak, 5 = strong)</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {WRITING_RUBRIC.map((c) => (
                <Rating key={c.id} label={c.label} hint={c.hint} value={rubric[c.id]} onChange={(v) => onRubric({ ...rubric, [c.id]: v })} />
              ))}
            </div>
          </div>

          {onSubmit && (
            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={() => onSubmit(analysis.autoScore)} disabled={!rubricComplete || words < Math.min(20, minWords)}>
                <IconCheck /> {submitted ? "Update submission" : submitLabel}
              </Button>
              {!rubricComplete && <span className="text-xs text-muted">Rate all 7 criteria to submit.</span>}
              {submitted && <Badge tone="good">Submitted</Badge>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
