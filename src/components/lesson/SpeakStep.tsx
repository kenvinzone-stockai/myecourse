"use client";

import { useState } from "react";
import type { DailyLesson, LessonProgress, Rubric } from "@/lib/domain/types";
import type { SpeakingAdaptation } from "@/lib/engine/adaptive";
import { rubricToScore, speakingScore, speakingWeaknesses } from "@/lib/engine/scoring";
import { recordSkill, recordWeaknesses, updateLesson, useAppState } from "@/store/store";
import { Recorder } from "@/components/speaking/Recorder";
import { ListenButton } from "./LearnStep";
import { Passage } from "./ReadStep";
import { Badge, Button, Checkbox, Rating } from "@/components/ui";
import { formatSeconds } from "@/lib/speech";
import { requestAi } from "@/lib/ai/client";
import { useAiStatus } from "@/components/writing/WritingEditor";

export const SPEAKING_RUBRIC = [
  { id: "fluency", label: "Fluency", hint: "Few long pauses; kept going" },
  { id: "pronunciation", label: "Pronunciation", hint: "Clear sounds, endings, stress" },
  { id: "vocabulary", label: "Vocabulary", hint: "Used today's words" },
  { id: "grammar", label: "Grammatical accuracy", hint: "Tenses, agreement" },
  { id: "coherence", label: "Coherence", hint: "Clear structure, linking" },
  { id: "confidence", label: "Confidence", hint: "How confident did you feel?" },
] as const;

export function SpeakingRubric({ rubric, onChange }: { rubric: Rubric; onChange: (r: Rubric) => void }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {SPEAKING_RUBRIC.map((c) => (
        <Rating key={c.id} label={c.label} hint={c.hint} value={rubric[c.id]} onChange={(v) => onChange({ ...rubric, [c.id]: v })} />
      ))}
    </div>
  );
}

export function SpeakStep({ lesson, progress, adaptation, onDone }: { lesson: DailyLesson; progress: LessonProgress; adaptation: SpeakingAdaptation; onDone: () => void }) {
  const sp = lesson.speaking!;
  const state = useAppState();
  const ai = useAiStatus();
  const [criteriaDone, setCriteriaDone] = useState<Record<string, boolean>>({});
  const [aiText, setAiText] = useState<string | null>(null);
  const [aiBusy, setAiBusy] = useState(false);
  const sessions = (state?.speaking ?? []).filter((s) => progress.speakingSessionIds.includes(s.id));
  const best = sessions.reduce((m, s) => Math.max(m, s.seconds), 0);
  const transcript = sessions.map((s) => s.transcript).filter(Boolean).at(-1);
  const rubricDone = SPEAKING_RUBRIC.every((c) => (progress.speakingRubric[c.id] ?? 0) >= 1);
  const rated = progress.speakingScore !== undefined;

  function saveRating() {
    const r = rubricToScore(progress.speakingRubric, SPEAKING_RUBRIC.map((c) => c.id));
    const score = speakingScore(r, best, adaptation.targetSeconds);
    const first = progress.speakingScore === undefined;
    updateLesson(lesson.day, { speakingScore: score });
    if (first) {
      recordSkill("speaking", score, "lesson", lesson.day);
      recordWeaknesses(speakingWeaknesses(progress.speakingRubric), lesson.day);
    }
  }

  async function aiFeedback() {
    if (!transcript) return;
    setAiBusy(true);
    const r = await requestAi({ capability: "speaking-feedback", input: { prompt: sp.prompt, transcript, level: lesson.level } });
    setAiBusy(false);
    setAiText(r.ok ? r.feedback : r.error);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-line bg-surface-2/40 p-4">
        <div className="mb-2 flex flex-wrap gap-2">
          <Badge tone="accent">{sp.type.replace("-", " ")}</Badge>
          <Badge>Target {formatSeconds(adaptation.targetSeconds)}</Badge>
          {adaptation.band !== "core" && <Badge tone={adaptation.band === "support" ? "warn" : "good"}>{adaptation.band === "support" ? "Supported" : "Stretch"}</Badge>}
        </div>
        <p className="text-[15px] leading-relaxed text-ink">{sp.prompt}</p>
        {adaptation.notes.map((n) => (
          <p key={n} className="mt-2 text-xs text-muted">
            {n}
          </p>
        ))}
      </div>

      {sp.script && (
        <div className="rounded-xl border border-line p-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-medium text-ink">Script</p>
            <div className="flex gap-1">
              <ListenButton text={sp.script} label="Normal" />
              <ListenButton text={sp.script} label="Slow" rate={0.75} />
            </div>
          </div>
          <p className="font-serif text-[16px] leading-relaxed text-ink">{sp.script}</p>
          <p className="mt-2 text-xs text-muted">Listen once, then read aloud with the audio (shadowing), then record yourself alone.</p>
        </div>
      )}

      {!sp.script && lesson.reading && sp.type === "summary" && (
        <details className="rounded-xl border border-line px-4 py-3">
          <summary className="cursor-pointer text-sm text-muted">Glance at the text before you start (then close it)</summary>
          <div className="mt-3 max-h-72 overflow-y-auto">
            <Passage text={lesson.reading.text} />
          </div>
        </details>
      )}

      <div>
        <p className="mb-1 text-sm font-medium text-ink">Success criteria</p>
        <div className="grid gap-0.5 sm:grid-cols-2">
          {sp.criteria.map((c) => (
            <Checkbox key={c} label={c} checked={!!criteriaDone[c]} onChange={(v) => setCriteriaDone((s) => ({ ...s, [c]: v }))} />
          ))}
        </div>
      </div>

      <Recorder prompt={sp.prompt} targetSeconds={adaptation.targetSeconds} context="lesson" day={lesson.day} />

      {ai?.available && transcript && (
        <div className="rounded-xl border border-line p-4">
          <Button size="sm" variant="secondary" onClick={aiFeedback} disabled={aiBusy}>
            {aiBusy ? "Asking…" : "AI feedback on my transcript"}
          </Button>
          {aiText && <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed">{aiText}</pre>}
        </div>
      )}

      <div>
        <p className="mb-1 text-sm font-medium text-ink">Self-assessment</p>
        <p className="mb-3 text-xs text-muted">Listen to your best take, then rate it honestly (1 = weak, 5 = strong).</p>
        <SpeakingRubric rubric={progress.speakingRubric} onChange={(r) => updateLesson(lesson.day, { speakingRubric: r })} />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button variant={rated ? "secondary" : "primary"} onClick={saveRating} disabled={!rubricDone}>
          {rated ? "Update rating" : "Save rating"}
        </Button>
        {rated && <Button onClick={onDone}>Continue</Button>}
        {!sessions.length && <span className="text-xs text-muted">Tip: record at least one take before rating.</span>}
      </div>
    </div>
  );
}
