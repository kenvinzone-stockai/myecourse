"use client";

import type { DailyLesson, LessonProgress } from "@/lib/domain/types";
import { completeLesson, updateLesson } from "@/store/store";
import { Badge, ButtonLink, Button, Field, Input, Rating, TextArea } from "@/components/ui";
import { IconArrowRight, IconCheck } from "@/components/ui/icons";

export function ReflectStep({ lesson, progress, nextDay }: { lesson: DailyLesson; progress: LessonProgress; nextDay?: number }) {
  const r = progress.reflection;
  const set = (patch: Partial<typeof r>) => updateLesson(lesson.day, (p) => ({ reflection: { ...p.reflection, ...patch } }));
  const done = progress.status === "completed";

  if (done) {
    return (
      <div className="space-y-5 animate-in">
        <div className="rounded-2xl border border-line bg-good-soft p-6">
          <p className="flex items-center gap-2 font-medium text-good">
            <IconCheck /> Day {lesson.day} completed
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
            {progress.minutes >= 1 && (
              <div>
                <dt className="text-muted">Study time</dt>
                <dd className="font-medium tabular-nums text-ink">{Math.round(progress.minutes)} min</dd>
              </div>
            )}
            {progress.readingScore !== undefined && (
              <div>
                <dt className="text-muted">Reading</dt>
                <dd className="font-medium tabular-nums text-ink">{progress.readingScore}</dd>
              </div>
            )}
            {progress.writingScore !== undefined && (
              <div>
                <dt className="text-muted">Writing</dt>
                <dd className="font-medium tabular-nums text-ink">{progress.writingScore}</dd>
              </div>
            )}
            {progress.speakingScore !== undefined && (
              <div>
                <dt className="text-muted">Speaking</dt>
                <dd className="font-medium tabular-nums text-ink">{progress.speakingScore}</dd>
              </div>
            )}
          </dl>
          <p className="mt-4 text-sm text-muted">Today&apos;s words are now in your vocabulary deck and will come back for review automatically.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {lesson.isReviewDay && (
            <ButtonLink href={`/review/${lesson.week}`}>
              Open Week {lesson.week} review <IconArrowRight />
            </ButtonLink>
          )}
          <ButtonLink href="/vocabulary" variant="secondary">
            Review vocabulary
          </ButtonLink>
          {nextDay && (
            <ButtonLink href={`/day/${nextDay}`} variant="ghost">
              Preview Day {nextDay}
            </ButtonLink>
          )}
          <ButtonLink href="/" variant="ghost">
            Dashboard
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="What was easy today?" htmlFor="r-easy">
          <TextArea id="r-easy" className="min-h-20" value={r.easy} onChange={(e) => set({ easy: e.target.value })} />
        </Field>
        <Field label="What was difficult?" htmlFor="r-diff">
          <TextArea id="r-diff" className="min-h-20" value={r.difficult} onChange={(e) => set({ difficult: e.target.value })} />
        </Field>
      </div>
      <Field label="A new phrase I want to remember" htmlFor="r-phrase">
        <Input id="r-phrase" value={r.phrase} onChange={(e) => set({ phrase: e.target.value })} placeholder="e.g. at your earliest convenience" />
      </Field>
      <Rating label="How confident do you feel today?" value={r.confidence || undefined} onChange={(v) => set({ confidence: v })} lowLabel="Not at all" highLabel="Very" />
      <div className="flex flex-wrap items-center gap-3">
        <Button size="lg" onClick={() => completeLesson(lesson.day)} disabled={!r.confidence}>
          <IconCheck /> Complete Day {lesson.day}
        </Button>
        {!r.confidence && <Badge>Choose a confidence score to finish</Badge>}
      </div>
    </div>
  );
}
