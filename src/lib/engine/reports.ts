// Weekly summaries and the Day-90 comparison report.

import type { AppState, AssessmentResult, Cefr, Skill } from "../domain/types";
import { addDays, type DateKey } from "../domain/dates";
import { getLesson } from "../curriculum";
import { cefrFromScore, nextLevel, recurringWeaknesses, SKILLS, WEAKNESS_LABEL } from "./scoring";
import { dateOfLesson } from "./plan";

export type WeeklySummary = {
  week: number;
  days: number[];
  completed: number;
  minutes: number;
  readingAvg?: number;
  writingCount: number;
  writingWords: number;
  speakingSeconds: number;
  speakingCount: number;
  vocabAdded: number;
  skillAvg: Partial<Record<Skill, number>>;
  strongest?: Skill;
  weakest?: Skill;
  recommendation: string[];
};

export const SKILL_LABEL: Record<Skill, { en: string; vi: string }> = {
  reading: { en: "Reading", vi: "Đọc" },
  writing: { en: "Writing", vi: "Viết" },
  speaking: { en: "Speaking", vi: "Nói" },
  vocabulary: { en: "Vocabulary", vi: "Từ vựng" },
};

export function weeklySummary(state: AppState, week: number, today: DateKey): WeeklySummary {
  const days = Array.from({ length: 7 }, (_, i) => (week - 1) * 7 + i + 1).filter((d) => d <= 90);
  const first = dateOfLesson(state, days[0]);
  const last = addDays(first, 6);
  const progress = days.map((d) => state.lessons[String(d)]).filter(Boolean);
  const completed = progress.filter((p) => p.status === "completed").length;
  let minutes = 0;
  for (let i = 0; i < 7; i++) minutes += state.activity[addDays(first, i)] ?? 0;
  const lessonMinutes = progress.reduce((a, p) => a + (p.minutes || 0), 0);
  minutes = Math.max(minutes, lessonMinutes);

  const readingScores = progress.map((p) => p.readingScore).filter((x): x is number => typeof x === "number");
  const writings = progress.filter((p) => p.writingSubmittedAt);
  const writingWords = writings.reduce((a, p) => a + (p.writingDraft.trim() ? p.writingDraft.trim().split(/\s+/).length : 0), 0);
  const sessions = state.speaking.filter((s) => s.day !== undefined && days.includes(s.day));
  const speakingSeconds = sessions.reduce((a, s) => a + s.seconds, 0);
  const vocabAdded = Object.values(state.vocab).filter((c) => c.addedAt.slice(0, 10) >= first && c.addedAt.slice(0, 10) <= last).length;

  const skillAvg: Partial<Record<Skill, number>> = {};
  for (const s of SKILLS) {
    const ev = state.skillEvents.filter((e) => e.skill === s && ((e.day !== undefined && days.includes(e.day)) || (e.date >= first && e.date <= last)));
    if (ev.length) skillAvg[s] = Math.round(ev.reduce((a, e) => a + e.score, 0) / ev.length);
  }
  const ranked = (Object.entries(skillAvg) as [Skill, number][]).sort((a, b) => b[1] - a[1]);
  const strongest = ranked[0]?.[0];
  const weakest = ranked.length > 1 ? ranked[ranked.length - 1][0] : undefined;

  const rec: string[] = [];
  const plannedSoFar = days.filter((d) => dateOfLesson(state, d) <= today).length;
  if (plannedSoFar > 0 && completed / plannedSoFar < 0.6) {
    rec.push("Consistency first: next week, protect a short daily slot. On busy days, do only Review + Speak (about 20 minutes).");
  }
  if (weakest) {
    const tips: Record<Skill, string> = {
      reading: "Reading needs attention: read each passage twice and justify every answer with a sentence from the text.",
      writing: "Writing needs attention: write a 2-minute outline before every task and use the self-review checklist before submitting.",
      speaking: "Speaking needs attention: record every speaking task at least twice and aim to reach the target time without stopping.",
      vocabulary: "Vocabulary needs attention: clear your due reviews every day and write one personal sentence for each difficult word.",
    };
    rec.push(tips[weakest]);
  }
  const recurring = recurringWeaknesses(state, today);
  if (recurring.length) rec.push(`Recurring pattern: ${WEAKNESS_LABEL[recurring[0].tag].en}. A targeted practice module is available on the Today page.`);
  if (speakingSeconds < 300 && completed >= 3) rec.push("Aim for at least 10 minutes of recorded speaking next week — speaking improves fastest with volume.");
  if (!rec.length) rec.push("Good balance this week. Keep the same rhythm and try the stretch suggestions in each lesson.");

  return {
    week,
    days,
    completed,
    minutes,
    readingAvg: readingScores.length ? Math.round(readingScores.reduce((a, b) => a + b, 0) / readingScores.length) : undefined,
    writingCount: writings.length,
    writingWords,
    speakingSeconds,
    speakingCount: sessions.length,
    vocabAdded,
    skillAvg,
    strongest,
    weakest,
    recommendation: rec,
  };
}

export type FinalReport = {
  baseline: AssessmentResult;
  final: AssessmentResult;
  deltas: Record<Skill, number>;
  overallDelta: number;
  strongestImprovement: Skill;
  remainingWeakness: Skill;
  nextTarget: Cefr;
  nextPlan: string[];
};

export function finalReport(state: AppState): FinalReport | undefined {
  const baseline = state.assessments.baseline;
  const final = state.assessments.final;
  if (!baseline || !final) return undefined;
  const deltas = Object.fromEntries(SKILLS.map((s) => [s, final.scores[s] - baseline.scores[s]])) as Record<Skill, number>;
  const strongestImprovement = [...SKILLS].sort((a, b) => deltas[b] - deltas[a])[0];
  const remainingWeakness = [...SKILLS].sort((a, b) => final.scores[a] - final.scores[b])[0];
  const nextTarget = nextLevel(cefrFromScore(final.overall));
  const plan = [
    `Target: move from an estimated ${final.cefr} towards ${nextTarget} over the next 90 days.`,
    `Main focus: ${SKILL_LABEL[remainingWeakness].en} (your lowest final score: ${final.scores[remainingWeakness]}).`,
    "Daily (15–20 min): one article in your field + 5 vocabulary reviews + a 1-minute recorded summary.",
    "Weekly (2 × 30 min): deliberate practice on your focus skill, using the remediation modules and the Speaking workspace.",
    "Monthly: one real-world challenge — present in a meeting, write a report in English, or join an international call.",
    "Every 30 days: repeat a checkpoint and compare recordings to keep a visible feedback loop.",
  ];
  return {
    baseline,
    final,
    deltas,
    overallDelta: final.overall - baseline.overall,
    strongestImprovement,
    remainingWeakness,
    nextTarget,
    nextPlan: plan,
  };
}

export function lessonTitle(day: number): string {
  return getLesson(day)?.title ?? `Day ${day}`;
}
