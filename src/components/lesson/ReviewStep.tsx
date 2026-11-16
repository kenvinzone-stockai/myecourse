"use client";

import { useState } from "react";
import type { DailyLesson, LessonProgress } from "@/lib/domain/types";
import { allCurriculumVocab } from "@/lib/curriculum";
import { recordSkill, recordWeaknesses, saveVocabItems, updateLesson } from "@/store/store";
import { Badge, Button, cx, Input, TextArea } from "@/components/ui";

function norm(s: string) {
  return s
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9' ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function answerMatches(input: string, expected: string): boolean {
  const a = norm(input);
  if (!a) return false;
  const options = expected.split("/").map(norm).filter(Boolean);
  const strip = (x: string) => x.replace(/^(to|be|a|an|the) /, "");
  return options.some((o) => o === a || strip(o) === strip(a));
}

export function ReviewStep({ lesson, progress, onDone }: { lesson: DailyLesson; progress: LessonProgress; onDone: () => void }) {
  const items = lesson.review.items;
  const answers = progress.reviewAnswers;
  const gradable = items.filter((i) => i.answer);
  const [checked, setChecked] = useState(!!progress.steps.review && gradable.length > 0);
  const correct = gradable.filter((it) => answerMatches(answers[items.indexOf(it)] ?? "", it.answer)).length;

  function setAnswer(i: number, v: string) {
    updateLesson(lesson.day, (p) => ({ reviewAnswers: { ...p.reviewAnswers, [String(i)]: v } }));
  }

  function check() {
    setChecked(true);
    if (!gradable.length) return;
    const pct = Math.round((correct / gradable.length) * 100);
    recordSkill("vocabulary", pct, lesson.isReviewDay ? "weekly-quiz" : "daily-review", lesson.day);
    if (pct < 60) recordWeaknesses(["vocab-retention"], lesson.day);
    const missedTerms = gradable.filter((it) => !answerMatches(answers[items.indexOf(it)] ?? "", it.answer)).map((it) => it.answer.toLowerCase());
    if (missedTerms.length) {
      const pool = lesson.isReviewDay ? lesson.vocabulary : allCurriculumVocab();
      saveVocabItems(
        pool.filter((v) => missedTerms.includes(v.term.toLowerCase())),
        "difficult",
      );
    }
  }

  return (
    <div className="space-y-5">
      <p className="text-sm leading-relaxed text-muted">{lesson.review.instructions}</p>
      <ol className="space-y-4">
        {items.map((it, i) => {
          const val = answers[String(i)] ?? "";
          const ok = checked && it.answer ? answerMatches(val, it.answer) : undefined;
          return (
            <li key={i} className="rounded-xl border border-line p-4">
              <p className="mb-2 text-[15px] leading-relaxed text-ink">
                <span className="mr-2 text-faint tabular-nums">{i + 1}.</span>
                {it.prompt}
              </p>
              {it.answer ? (
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <Input
                    aria-label={`Answer ${i + 1}`}
                    value={val}
                    onChange={(e) => setAnswer(i, e.target.value)}
                    className={cx("sm:max-w-xs", ok === true && "border-good", ok === false && "border-bad")}
                    autoComplete="off"
                    autoCapitalize="none"
                  />
                  {ok === true && <Badge tone="good">Correct</Badge>}
                  {ok === false && (
                    <span className="text-sm text-bad">
                      Answer: <strong className="font-medium">{it.answer}</strong>
                    </span>
                  )}
                </div>
              ) : (
                <TextArea aria-label={`Answer ${i + 1}`} value={val} onChange={(e) => setAnswer(i, e.target.value)} className="min-h-16" />
              )}
            </li>
          );
        })}
      </ol>
      <div className="flex flex-wrap items-center gap-3">
        {gradable.length > 0 && !checked && (
          <Button variant="secondary" onClick={check}>
            Check answers
          </Button>
        )}
        {checked && gradable.length > 0 && (
          <p className="text-sm text-muted">
            Score: <span className="font-medium tabular-nums text-ink">{correct}/{gradable.length}</span>
            {correct < gradable.length && " — missed words were added to your vocabulary deck."}
          </p>
        )}
        <Button onClick={onDone} disabled={gradable.length > 0 && !checked}>
          Continue
        </Button>
      </div>
    </div>
  );
}
