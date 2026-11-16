"use client";

import { Fragment, type ReactNode } from "react";
import type { DailyLesson, LessonProgress, ReadingActivity, ReadingQuestion } from "@/lib/domain/types";
import { readingScore, readingWeaknesses } from "@/lib/engine/scoring";
import type { ReadingAdaptation } from "@/lib/engine/adaptive";
import { recordSkill, recordWeaknesses, updateLesson } from "@/store/store";
import { AutosaveTextArea } from "@/components/writing/WritingEditor";
import { ListenButton } from "./LearnStep";
import { Badge, Button, cx } from "@/components/ui";

const Q_LABEL: Record<string, string> = { main: "Main idea", detail: "Detail", inference: "Inference", vocab: "Vocabulary in context", purpose: "Purpose" };

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function Passage({ text, terms = [] }: { text: string; terms?: string[] }) {
  const usable = terms
    .map((t) => t.split("/")[0].trim())
    .filter((t) => t.length > 2)
    .sort((a, b) => b.length - a.length);
  const re = usable.length ? new RegExp(`\\b(${usable.map(escapeRe).join("|")})\\b`, "gi") : null;
  const renderPara = (p: string): ReactNode => {
    if (!re) return p;
    const parts = p.split(re);
    return parts.map((part, i) => (i % 2 === 1 ? <mark key={i} className="rounded bg-accent-soft px-0.5 text-ink">{part}</mark> : <Fragment key={i}>{part}</Fragment>));
  };
  return (
    <div className="prose-reading font-serif text-[17px] leading-[1.75] text-ink">
      {text.split(/\n\s*\n/).map((para, i) => (
        <p key={i} className="whitespace-pre-line">
          {renderPara(para)}
        </p>
      ))}
    </div>
  );
}

export function QuestionBlock({
  questions,
  answers,
  checked,
  onAnswer,
}: {
  questions: ReadingQuestion[];
  answers: Record<string, number>;
  checked: boolean;
  onAnswer: (id: string, i: number) => void;
}) {
  return (
    <ol className="space-y-5">
      {questions.map((q, qi) => (
        <li key={q.id}>
          <fieldset>
            <legend className="mb-2 text-[15px] font-medium leading-relaxed text-ink">
              <span className="mr-2 text-faint tabular-nums">{qi + 1}.</span>
              {q.prompt}
              <span className="ml-2 align-middle text-[11px] font-normal uppercase tracking-wide text-faint">{Q_LABEL[q.type]}</span>
            </legend>
            <div className="grid gap-2">
              {q.options.map((opt, oi) => {
                const selected = answers[q.id] === oi;
                const isCorrect = oi === q.answer;
                return (
                  <label
                    key={oi}
                    className={cx(
                      "flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 text-sm transition-colors",
                      !checked && selected && "border-accent bg-accent-soft",
                      !checked && !selected && "border-line hover:bg-surface-2",
                      checked && isCorrect && "border-good bg-good-soft",
                      checked && selected && !isCorrect && "border-bad bg-bad-soft",
                      checked && !selected && !isCorrect && "border-line opacity-70",
                    )}
                  >
                    <input type="radio" name={q.id} checked={selected} disabled={checked} onChange={() => onAnswer(q.id, oi)} className="mt-0.5 accent-[var(--accent)]" />
                    <span className="text-ink">{opt}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        </li>
      ))}
    </ol>
  );
}

export function ReadingHeader({ reading }: { reading: ReadingActivity }) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-muted">
      <Badge tone="accent">{reading.kind === "model" ? "Model text" : "Article"}</Badge>
      <Badge>Level {reading.level}</Badge>
      <span className="tabular-nums">{reading.wordCount} words</span>
      <span>· ~{reading.readingMinutes} min</span>
      <ListenButton text={reading.text} label="Listen to the text" rate={0.92} />
    </div>
  );
}

export function ReadStep({
  lesson,
  progress,
  adaptation,
  onDone,
}: {
  lesson: DailyLesson;
  progress: LessonProgress;
  adaptation: ReadingAdaptation;
  onDone: () => void;
}) {
  const reading = lesson.reading!;
  const answers = progress.readingAnswers;
  const allAnswered = reading.questions.every((q) => answers[q.id] !== undefined);
  const correct = reading.questions.filter((q) => answers[q.id] === q.answer).length;

  function check() {
    const score = readingScore(correct, reading.questions.length);
    updateLesson(lesson.day, { readingChecked: true, readingScore: score });
    recordSkill("reading", score, "lesson", lesson.day);
    const wrongTypes = reading.questions.filter((q) => answers[q.id] !== q.answer).map((q) => q.type);
    recordWeaknesses(readingWeaknesses(wrongTypes), lesson.day);
  }

  return (
    <div className="space-y-6">
      {adaptation.notes.length > 0 && <p className="rounded-lg bg-surface-2 px-3 py-2 text-xs text-muted">{adaptation.notes.join(" ")}</p>}
      <article className="rounded-2xl border border-line bg-surface px-5 py-6 sm:px-8">
        <h3 className="mb-1 font-serif text-xl font-semibold text-ink">{reading.title}</h3>
        <ReadingHeader reading={reading} />
        <Passage text={reading.text} terms={lesson.vocabulary.map((v) => v.term)} />
      </article>

      <section aria-labelledby="q-title">
        <h3 id="q-title" className="mb-3 text-sm font-medium text-ink">
          Comprehension
        </h3>
        <QuestionBlock
          questions={reading.questions}
          answers={answers}
          checked={progress.readingChecked}
          onAnswer={(id, i) => updateLesson(lesson.day, (p) => ({ readingAnswers: { ...p.readingAnswers, [id]: i } }))}
        />
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {!progress.readingChecked ? (
            <Button variant="secondary" onClick={check} disabled={!allAnswered}>
              Check answers
            </Button>
          ) : (
            <p className="text-sm text-muted">
              Score: <span className="font-medium tabular-nums text-ink">{correct}/{reading.questions.length}</span>
              {correct < reading.questions.length && " — reread the paragraph that contains each correct answer."}
            </p>
          )}
          {progress.readingChecked && (
            <button className="text-xs text-muted underline" onClick={() => updateLesson(lesson.day, { readingChecked: false, readingAnswers: {} })}>
              Try again
            </button>
          )}
        </div>
      </section>

      {reading.summaryTask && (
        <section>
          <h3 className="mb-1 text-sm font-medium text-ink">Summary task</h3>
          <p className="mb-2 text-sm text-muted">{reading.summaryTask}</p>
          <AutosaveTextArea
            value={progress.summary}
            onSave={(v) => updateLesson(lesson.day, { summary: v })}
            ariaLabel="Summary"
            minHeight="min-h-24"
            placeholder="Write in your own words — cover the text first."
          />
        </section>
      )}

      <Button onClick={onDone} disabled={!progress.readingChecked}>
        Continue
      </Button>
    </div>
  );
}
