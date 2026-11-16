// Where the learner is in the plan, what to do next, and how to recover
// from missed days without piling up lessons.

import { addDays, dateForDay, programPosition, TOTAL_DAYS, type DateKey, type ProgramPosition } from "../domain/dates";
import type { AppState, LessonProgress, LessonStatus } from "../domain/types";
import { CHECKPOINT_DAYS, REVIEW_DAYS } from "../curriculum";

export type DayVisualState = "completed" | "today" | "upcoming" | "missed" | "in_progress" | "skipped";

export function lessonStatus(state: AppState, day: number): LessonStatus {
  return state.lessons[String(day)]?.status ?? "not_started";
}

export function isDone(status: LessonStatus) {
  return status === "completed" || status === "skipped";
}

export function dayVisualState(state: AppState, day: number, calendarDay: number): DayVisualState {
  const st = lessonStatus(state, day);
  if (st === "completed") return "completed";
  if (st === "skipped") return "skipped";
  if (day === calendarDay) return st === "in_progress" ? "in_progress" : "today";
  if (day < calendarDay) return "missed";
  return st === "in_progress" ? "in_progress" : "upcoming";
}

export type PlanStatus = {
  position: ProgramPosition;
  calendarDay: number; // 0 before start
  currentDay: number; // the lesson the learner should open now
  behind: number; // incomplete lessons scheduled before today
  missedDays: number[];
  completedCount: number;
  todayDone: boolean;
  finished: boolean; // all 90 lessons done
};

export function planStatus(state: AppState, today: DateKey): PlanStatus {
  const offset = state.settings.planOffsetDays;
  const position = programPosition(today, offset);
  const calendarDay = position.calendarDay;
  const completedCount = Object.values(state.lessons).filter((l) => l.status === "completed").length;
  const missedDays: number[] = [];
  for (let d = 1; d < calendarDay; d++) if (!isDone(lessonStatus(state, d))) missedDays.push(d);

  // The learner always resumes the earliest unfinished lesson (never several at once).
  const firstIncomplete = Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1).find((d) => !isDone(lessonStatus(state, d)));
  const currentDay = firstIncomplete ?? TOTAL_DAYS;

  const todayDone = calendarDay > 0 && isDone(lessonStatus(state, calendarDay)) && missedDays.length === 0;
  return {
    position,
    calendarDay,
    currentDay,
    behind: missedDays.length,
    missedDays,
    completedCount,
    todayDone,
    finished: firstIncomplete === undefined,
  };
}

/** Consecutive days (ending today or yesterday) with ≥10 study minutes. */
export function studyStreak(state: AppState, today: DateKey): number {
  let streak = 0;
  let d = (state.activity[today] ?? 0) >= 10 ? today : addDays(today, -1);
  while ((state.activity[d] ?? 0) >= 10) {
    streak++;
    d = addDays(d, -1);
  }
  return streak;
}

export function totalMinutes(state: AppState): number {
  return Object.values(state.activity).reduce((a, b) => a + b, 0);
}

export function dateOfLesson(state: AppState, day: number): DateKey {
  return dateForDay(day, state.settings.planOffsetDays);
}

export function isReviewDay(day: number) {
  return REVIEW_DAYS.includes(day);
}

export function checkpointOf(day: number) {
  return CHECKPOINT_DAYS[day];
}

export function lessonProgressFraction(p: LessonProgress | undefined, stepCount: number): number {
  if (!p) return 0;
  if (p.status === "completed") return 1;
  const done = Object.values(p.steps).filter(Boolean).length;
  return Math.min(1, done / stepCount);
}

export type Recommendation =
  | { kind: "onboarding" }
  | { kind: "before-start"; daysUntilStart: number }
  | { kind: "continue"; day: number }
  | { kind: "catch-up"; day: number; behind: number }
  | { kind: "done-today"; nextDay?: number }
  | { kind: "finished" };

export function recommendation(state: AppState, today: DateKey): Recommendation {
  if (!state.onboardingComplete) return { kind: "onboarding" };
  const ps = planStatus(state, today);
  if (ps.finished) return { kind: "finished" };
  if (ps.position.kind === "before") return { kind: "before-start", daysUntilStart: ps.position.daysUntilStart };
  if (ps.behind >= 1) return { kind: "catch-up", day: ps.currentDay, behind: ps.behind };
  if (ps.todayDone) return { kind: "done-today", nextDay: ps.calendarDay < TOTAL_DAYS ? ps.calendarDay + 1 : undefined };
  return { kind: "continue", day: ps.currentDay };
}
