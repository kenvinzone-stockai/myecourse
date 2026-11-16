"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { AppState, DailyLesson, StepId } from "@/lib/domain/types";
import { DAY_TYPE_INFO, PHASES, STEP_MINUTES } from "@/lib/curriculum";
import { formatDmy, TOTAL_DAYS, weekdayShort } from "@/lib/domain/dates";
import { dateOfLesson, lessonProgressFraction } from "@/lib/engine/plan";
import { lessonAdaptations, showGloss } from "@/lib/engine/personalize";
import { emptyProgress, markStep, reopenLesson } from "@/store/store";
import { useStudyTimer } from "@/hooks/useStudyTimer";
import { pick } from "@/lib/i18n";
import { Badge, ButtonLink, cx, ProgressBar } from "@/components/ui";
import { IconArrowLeft, IconArrowRight, IconCheck } from "@/components/ui/icons";
import { ReviewStep } from "./ReviewStep";
import { LearnStep } from "./LearnStep";
import { ReadStep } from "./ReadStep";
import { WriteStep } from "./WriteStep";
import { SpeakStep } from "./SpeakStep";
import { ReflectStep } from "./ReflectStep";
import { ASSESSMENTS } from "@/lib/curriculum/assessments";

const STEP_LABEL: Record<StepId, { en: string; vi: string }> = {
  review: { en: "Review", vi: "Ôn lại" },
  learn: { en: "Learn", vi: "Học" },
  read: { en: "Read", vi: "Đọc" },
  write: { en: "Write", vi: "Viết" },
  speak: { en: "Speak", vi: "Nói" },
  reflect: { en: "Reflect", vi: "Tự đánh giá" },
};

export function stepsFor(lesson: DailyLesson): StepId[] {
  if (lesson.checkpoint) return ["review"];
  const s: StepId[] = ["review", "learn"];
  if (lesson.reading) s.push("read");
  if (lesson.writing) s.push("write");
  if (lesson.speaking) s.push("speak");
  s.push("reflect");
  return s;
}

export function LessonView({ lesson, state, isCurrent }: { lesson: DailyLesson; state: AppState; isCurrent: boolean }) {
  const progress = state.lessons[String(lesson.day)] ?? emptyProgress(lesson.day);
  const steps = stepsFor(lesson);
  const firstOpen = steps.find((s) => !progress.steps[s]) ?? steps[steps.length - 1];
  const [active, setActive] = useState<StepId>(progress.status === "completed" ? steps[steps.length - 1] : firstOpen);
  const lang = state.settings.uiLanguage;
  const topRef = useRef<HTMLDivElement>(null);
  const phase = PHASES.find((p) => p.id === lesson.phase)!;
  const date = dateOfLesson(state, lesson.day);
  const adapt = lessonAdaptations(state, lesson);
  const gloss = showGloss(state, lesson.phase);
  const done = progress.status === "completed";
  useStudyTimer(lesson.day, !done);

  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [active]);

  function finish(step: StepId) {
    markStep(lesson.day, step);
    const idx = steps.indexOf(step);
    if (idx < steps.length - 1) setActive(steps[idx + 1]);
  }

  const fraction = lessonProgressFraction(progress, steps.length);

  return (
    <div className="space-y-6">
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          <span className="font-medium text-ink">
            {pick(lang, "Ngày", "Day")} {lesson.day} / {TOTAL_DAYS}
          </span>
          <span>
            {weekdayShort(date, lang)} {formatDmy(date)}
          </span>
          <span className="hidden sm:inline">·</span>
          <span>
            {pick(lang, "Giai đoạn", "Phase")} {lesson.phase}: {pick(lang, phase.nameVi, phase.name)}
          </span>
        </div>
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-faint">
            {pick(lang, DAY_TYPE_INFO[lesson.type].labelVi, DAY_TYPE_INFO[lesson.type].label)} · {lesson.theme}
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{lesson.title}</h1>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted">{lesson.objectives[0]}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge>~{lesson.estimatedMinutes} min</Badge>
          <Badge>Level {lesson.level}</Badge>
          {lesson.integrated && <Badge tone="info">Reading → Writing → Speaking</Badge>}
          {done ? <Badge tone="good">{pick(lang, "Đã hoàn thành", "Completed")}</Badge> : progress.status === "in_progress" ? <Badge tone="accent">{pick(lang, "Đang học", "In progress")}</Badge> : <Badge>{pick(lang, "Chưa bắt đầu", "Not started")}</Badge>}
          {progress.status === "skipped" && <Badge tone="warn">{pick(lang, "Đã bỏ qua — vẫn có thể học", "Skipped — still available")}</Badge>}
        </div>
        {!isCurrent && !done && <p className="rounded-lg bg-surface-2 px-3 py-2 text-xs text-muted">{pick(lang, "Đây không phải bài hiện tại của bạn — bạn vẫn có thể xem trước hoặc học bù.", "This isn't your current lesson — you can still preview or catch up on it.")}</p>}
      </header>

      <div ref={topRef} className="scroll-mt-24" />

      {/* Stepper */}
      {!lesson.checkpoint && (
        <nav aria-label="Lesson steps" className="sticky top-[57px] z-20 -mx-4 border-b border-line bg-bg/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-xl sm:border sm:px-3 lg:top-0">
          <ol className="flex items-center gap-1 overflow-x-auto">
            {steps.map((s, i) => {
              const isDone = !!progress.steps[s] || (s === "reflect" && done);
              return (
                <li key={s} className="flex items-center">
                  <button
                    onClick={() => setActive(s)}
                    aria-current={active === s ? "step" : undefined}
                    className={cx(
                      "flex items-center gap-2 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-sm transition-colors",
                      active === s ? "bg-accent-soft font-medium text-accent" : "text-muted hover:text-ink",
                    )}
                  >
                    <span className={cx("grid h-5 w-5 place-items-center rounded-full text-[11px] tabular-nums", isDone ? "bg-good text-white" : active === s ? "bg-accent text-accent-ink" : "bg-surface-2 text-muted")}>
                      {isDone ? <IconCheck width={12} height={12} /> : i + 1}
                    </span>
                    {pick(lang, STEP_LABEL[s].vi, STEP_LABEL[s].en)}
                    <span className="hidden text-xs text-faint md:inline">{STEP_MINUTES[lesson.type][s] ? `${STEP_MINUTES[lesson.type][s]}′` : ""}</span>
                  </button>
                  {i < steps.length - 1 && <span className="mx-0.5 h-px w-3 bg-line" aria-hidden />}
                </li>
              );
            })}
            <li className="ml-1 flex items-center whitespace-nowrap px-2 text-sm text-faint">{done ? <span className="text-good">✓ {pick(lang, "Hoàn thành", "Complete")}</span> : pick(lang, "→ Hoàn thành", "→ Complete")}</li>
          </ol>
          <ProgressBar value={fraction * 100} className="mt-2" label="Lesson progress" />
        </nav>
      )}

      <section aria-label={STEP_LABEL[active].en} className="animate-in" key={active}>
        <h2 className="mb-4 text-lg font-semibold text-ink">
          {pick(lang, STEP_LABEL[active].vi, STEP_LABEL[active].en)}
          {lesson.checkpoint && <span className="ml-2 text-sm font-normal text-muted">— warm-up</span>}
        </h2>
        {active === "review" && <ReviewStep lesson={lesson} progress={progress} onDone={() => finish("review")} />}
        {active === "learn" && <LearnStep lesson={lesson} showVi={gloss} onDone={() => finish("learn")} />}
        {active === "read" && lesson.reading && <ReadStep lesson={lesson} progress={progress} adaptation={adapt.reading} onDone={() => finish("read")} />}
        {active === "write" && lesson.writing && adapt.writing && <WriteStep lesson={lesson} progress={progress} adaptation={adapt.writing} onDone={() => finish("write")} />}
        {active === "speak" && lesson.speaking && adapt.speaking && <SpeakStep lesson={lesson} progress={progress} adaptation={adapt.speaking} onDone={() => finish("speak")} />}
        {active === "reflect" && <ReflectStep lesson={lesson} progress={progress} nextDay={lesson.day < TOTAL_DAYS ? lesson.day + 1 : undefined} />}
      </section>

      {lesson.checkpoint && <CheckpointPanel lesson={lesson} state={state} />}

      <footer className="flex items-center justify-between border-t border-line pt-4 text-sm">
        {lesson.day > 1 ? (
          <Link href={`/day/${lesson.day - 1}`} className="inline-flex items-center gap-1 text-muted hover:text-ink">
            <IconArrowLeft /> {pick(lang, "Ngày", "Day")} {lesson.day - 1}
          </Link>
        ) : (
          <span />
        )}
        {done && (
          <button className="text-xs text-faint underline" onClick={() => reopenLesson(lesson.day)}>
            {pick(lang, "Mở lại bài để chỉnh sửa", "Reopen to edit")}
          </button>
        )}
        {lesson.day < TOTAL_DAYS ? (
          <Link href={`/day/${lesson.day + 1}`} className="inline-flex items-center gap-1 text-muted hover:text-ink">
            {pick(lang, "Ngày", "Day")} {lesson.day + 1} <IconArrowRight />
          </Link>
        ) : (
          <span />
        )}
      </footer>
    </div>
  );
}

function CheckpointPanel({ lesson, state }: { lesson: DailyLesson; state: AppState }) {
  const kind = lesson.checkpoint!;
  const def = ASSESSMENTS[kind];
  const result = state.assessments[kind];
  const lang = state.settings.uiLanguage;
  return (
    <section className="rounded-2xl border border-line bg-surface p-6">
      <Badge tone="info">{pick(lang, "Mốc đánh giá", "Checkpoint")}</Badge>
      <h2 className="mt-2 text-lg font-semibold text-ink">{pick(lang, def.titleVi, def.title)}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{def.intro}</p>
      <ul className="mt-3 space-y-1 text-sm text-ink">
        {lesson.objectives.map((o) => (
          <li key={o}>• {o}</li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap gap-3">
        {result ? (
          <>
            <Badge tone="good">
              Completed · overall {result.overall} · estimate {result.cefr}
            </Badge>
            {kind === "final" ? <ButtonLink href="/report">{pick(lang, "Xem báo cáo cuối khóa", "Open final report")}</ButtonLink> : <ButtonLink href="/progress" variant="secondary">{pick(lang, "Xem tiến độ", "See progress")}</ButtonLink>}
            <ButtonLink href={`/assessment/${kind}`} variant="ghost">
              {pick(lang, "Làm lại", "Retake")}
            </ButtonLink>
          </>
        ) : (
          <ButtonLink href={`/assessment/${kind}`} size="lg">
            {pick(lang, "Bắt đầu bài đánh giá", "Start the assessment")} <IconArrowRight />
          </ButtonLink>
        )}
      </div>
    </section>
  );
}
