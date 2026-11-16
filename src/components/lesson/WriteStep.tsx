"use client";

import type { DailyLesson, LessonProgress } from "@/lib/domain/types";
import type { WritingAdaptation } from "@/lib/engine/adaptive";
import { rubricToScore, writingScore, writingWeaknesses } from "@/lib/engine/scoring";
import { WRITING_RUBRIC } from "@/lib/engine/writing";
import { recordSkill, recordWeaknesses, updateLesson } from "@/store/store";
import { WritingEditor } from "@/components/writing/WritingEditor";
import { Passage } from "./ReadStep";
import { Badge, Button } from "@/components/ui";

export function WriteStep({ lesson, progress, adaptation, onDone }: { lesson: DailyLesson; progress: LessonProgress; adaptation: WritingAdaptation; onDone: () => void }) {
  const w = lesson.writing!;
  const submitted = !!progress.writingSubmittedAt;

  function submit(autoScore: number) {
    const rubricScore = rubricToScore(progress.writingRubric, WRITING_RUBRIC.map((c) => c.id));
    const score = writingScore(rubricScore, autoScore);
    const first = !progress.writingSubmittedAt;
    updateLesson(lesson.day, { writingSubmittedAt: new Date().toISOString(), writingScore: score });
    if (first) {
      recordSkill("writing", score, "lesson", lesson.day);
      recordWeaknesses(writingWeaknesses(progress.writingRubric), lesson.day);
    }
  }

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-line bg-surface-2/40 p-4">
        <div className="mb-2 flex flex-wrap gap-2">
          <Badge tone="accent">{w.type}</Badge>
          {adaptation.band !== "core" && <Badge tone={adaptation.band === "support" ? "warn" : "good"}>{adaptation.band === "support" ? "Supported" : "Stretch"}</Badge>}
        </div>
        <p className="text-[15px] leading-relaxed text-ink">{w.prompt}</p>
        {w.tips.length > 0 && (
          <ul className="mt-3 space-y-1 text-sm text-muted">
            {w.tips.map((t) => (
              <li key={t}>• {t}</li>
            ))}
          </ul>
        )}
        {adaptation.notes.map((n) => (
          <p key={n} className="mt-2 text-xs text-muted">
            {n}
          </p>
        ))}
      </div>

      {lesson.reading && (lesson.integrated || lesson.reading.kind === "model") && (
        <details className="rounded-xl border border-line px-4 py-3">
          <summary className="cursor-pointer text-sm text-muted">{lesson.reading.kind === "model" ? "Show the model text" : "Reread today's text"}</summary>
          <div className="mt-3 max-h-80 overflow-y-auto">
            <Passage text={lesson.reading.text} />
          </div>
        </details>
      )}

      <WritingEditor
        draft={progress.writingDraft}
        onDraft={(v) => updateLesson(lesson.day, { writingDraft: v })}
        minWords={adaptation.minWords}
        maxWords={adaptation.maxWords}
        vocab={lesson.vocabulary.map((v) => v.term)}
        prompt={w.prompt}
        level={lesson.level}
        checklist={progress.writingChecklist}
        onChecklist={(c) => updateLesson(lesson.day, { writingChecklist: c })}
        rubric={progress.writingRubric}
        onRubric={(r) => updateLesson(lesson.day, { writingRubric: r })}
        aiFeedback={progress.aiFeedback}
        onAiFeedback={(f) => updateLesson(lesson.day, { aiFeedback: f })}
        submitted={submitted}
        onSubmit={submit}
      />

      {submitted && <Button onClick={onDone}>Continue</Button>}
    </div>
  );
}
