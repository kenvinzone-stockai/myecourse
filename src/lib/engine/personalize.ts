import type { AppState, Cefr, DailyLesson, PhaseId } from "../domain/types";
import { adaptReading, adaptSpeaking, adaptWriting } from "./adaptive";
import { cefrIndex, currentSkillScore } from "./scoring";

export function learnerLevel(state: AppState): Cefr | undefined {
  const order = ["final", "day60", "day30", "baseline"] as const;
  for (const k of order) {
    const a = state.assessments[k];
    if (a) return a.cefr;
  }
  const self = state.profile?.selfEstimatedLevel;
  return self && self !== "unsure" ? self : undefined;
}

/** Vietnamese glosses fade out as the learner progresses (unless forced). */
export function showGloss(state: AppState, phase: PhaseId): boolean {
  const mode = state.settings.glossMode;
  if (mode === "always") return true;
  if (mode === "never") return false;
  const lvl = learnerLevel(state);
  if (lvl && cefrIndex(lvl) <= cefrIndex("A2")) return true;
  if (lvl && cefrIndex(lvl) >= cefrIndex("C1")) return false;
  return phase <= 2;
}

export function lessonAdaptations(state: AppState, lesson: DailyLesson) {
  const difficulty = state.profile?.difficulty ?? "standard";
  const r = currentSkillScore(state.skillEvents, "reading");
  const w = currentSkillScore(state.skillEvents, "writing");
  const s = currentSkillScore(state.skillEvents, "speaking");
  return {
    reading: adaptReading(r),
    writing: lesson.writing ? adaptWriting(lesson.writing.minWords, lesson.writing.maxWords, w, difficulty) : undefined,
    speaking: lesson.speaking ? adaptSpeaking(lesson.speaking.targetSeconds, s, difficulty) : undefined,
  };
}
