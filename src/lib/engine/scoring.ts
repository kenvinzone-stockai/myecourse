// Skill scores, CEFR estimates and weakness detection.
// Scores are rolling indicators (0–100), not certified proficiency claims.

import { CEFR_LEVELS, type AppState, type Cefr, type Rubric, type ScoreKey, type Skill, type SkillEvent, type WeaknessTag } from "../domain/types";
import { addDays, diffDays, type DateKey } from "../domain/dates";

export const SKILLS: Skill[] = ["reading", "writing", "speaking", "vocabulary"];

export function rubricToScore(rubric: Rubric, criteria?: readonly string[]): number | undefined {
  const keys = criteria ?? Object.keys(rubric);
  const vals = keys.map((k) => rubric[k]).filter((v): v is number => typeof v === "number" && v >= 1 && v <= 5);
  if (!vals.length || (criteria && vals.length < criteria.length)) return undefined;
  const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
  return Math.round(((avg - 1) / 4) * 100);
}

export function readingScore(correct: number, total: number): number {
  return total ? Math.round((correct / total) * 100) : 0;
}

export function writingScore(rubricScore: number | undefined, autoScore: number): number {
  if (rubricScore === undefined) return autoScore;
  return Math.round(rubricScore * 0.7 + autoScore * 0.3);
}

export function speakingScore(rubricScore: number | undefined, seconds: number, targetSeconds: number): number {
  const durationPart = Math.min(1, targetSeconds ? seconds / targetSeconds : 0) * 100;
  if (rubricScore === undefined) return Math.round(durationPart * 0.5);
  return Math.round(rubricScore * 0.75 + durationPart * 0.25);
}

/** Rolling skill score: recency-weighted mean of the last 6 events. */
export function currentSkillScore(events: SkillEvent[], skill: Skill): number | undefined {
  const list = events.filter((e) => e.skill === skill).sort((a, b) => a.at.localeCompare(b.at));
  if (!list.length) return undefined;
  const last = list.slice(-6);
  let wSum = 0;
  let sum = 0;
  last.forEach((e, i) => {
    const w = i + 1;
    wSum += w;
    sum += e.score * w;
  });
  return Math.round(sum / wSum);
}

export function consistencyScore(state: AppState, today: DateKey, startKey: DateKey): number | undefined {
  const elapsed = Math.min(14, diffDays(today, startKey) + 1);
  if (elapsed <= 0) return undefined;
  let studied = 0;
  for (let i = 0; i < elapsed; i++) {
    const d = addDays(today, -i);
    if ((state.activity[d] ?? 0) >= 10) studied++;
  }
  return Math.round((studied / elapsed) * 100);
}

export function allScores(state: AppState, today: DateKey, startKey: DateKey): Partial<Record<ScoreKey, number>> {
  const out: Partial<Record<ScoreKey, number>> = {};
  for (const s of SKILLS) {
    const v = currentSkillScore(state.skillEvents, s);
    if (v !== undefined) out[s] = v;
  }
  const c = consistencyScore(state, today, startKey);
  if (c !== undefined) out.consistency = c;
  return out;
}

export function trend(events: SkillEvent[], skill: Skill): { date: string; score: number }[] {
  return events
    .filter((e) => e.skill === skill)
    .sort((a, b) => a.at.localeCompare(b.at))
    .map((e) => ({ date: e.date, score: e.score }));
}

// ── CEFR estimation ────────────────────────────────────────────────────────

export const LEVEL_WEIGHT: Record<Cefr, number> = { A1: 1, A2: 1, B1: 1.5, B2: 2, C1: 2.5, C2: 3 };

export function overallFromSkills(s: { reading: number; writing: number; speaking: number; vocabulary: number }): number {
  return Math.round(s.reading * 0.3 + s.writing * 0.25 + s.speaking * 0.25 + s.vocabulary * 0.2);
}

export function cefrFromScore(score: number): Cefr {
  if (score < 20) return "A1";
  if (score < 38) return "A2";
  if (score < 58) return "B1";
  if (score < 76) return "B2";
  if (score < 90) return "C1";
  return "C2";
}

export function cefrIndex(c: Cefr): number {
  return CEFR_LEVELS.indexOf(c);
}

export function nextLevel(c: Cefr): Cefr {
  return CEFR_LEVELS[Math.min(CEFR_LEVELS.length - 1, cefrIndex(c) + 1)];
}

// ── Weakness detection ─────────────────────────────────────────────────────

export const WEAKNESS_LABEL: Record<WeaknessTag, { en: string; vi: string; skill: Skill }> = {
  "reading-inference": { en: "Reading: inference", vi: "Đọc: suy luận", skill: "reading" },
  "reading-detail": { en: "Reading: details", vi: "Đọc: chi tiết", skill: "reading" },
  "reading-main": { en: "Reading: main idea", vi: "Đọc: ý chính", skill: "reading" },
  "reading-vocab": { en: "Reading: words in context", vi: "Đọc: từ trong ngữ cảnh", skill: "reading" },
  "writing-grammar": { en: "Writing: grammar accuracy", vi: "Viết: độ chính xác ngữ pháp", skill: "writing" },
  "writing-organization": { en: "Writing: organisation", vi: "Viết: bố cục", skill: "writing" },
  "writing-vocabulary": { en: "Writing: vocabulary range", vi: "Viết: vốn từ", skill: "writing" },
  "writing-clarity": { en: "Writing: clarity", vi: "Viết: sự rõ ràng", skill: "writing" },
  "speaking-fluency": { en: "Speaking: fluency", vi: "Nói: độ trôi chảy", skill: "speaking" },
  "speaking-pronunciation": { en: "Speaking: pronunciation", vi: "Nói: phát âm", skill: "speaking" },
  "speaking-coherence": { en: "Speaking: coherence", vi: "Nói: mạch lạc", skill: "speaking" },
  "vocab-retention": { en: "Vocabulary retention", vi: "Ghi nhớ từ vựng", skill: "vocabulary" },
};

const READING_TAG: Record<string, WeaknessTag> = {
  inference: "reading-inference",
  detail: "reading-detail",
  main: "reading-main",
  purpose: "reading-main",
  vocab: "reading-vocab",
};

export function readingWeaknesses(wrongTypes: string[]): WeaknessTag[] {
  return [...new Set(wrongTypes.map((t) => READING_TAG[t]).filter(Boolean))];
}

export function writingWeaknesses(rubric: Rubric): WeaknessTag[] {
  const out: WeaknessTag[] = [];
  if ((rubric.grammar ?? 5) <= 2) out.push("writing-grammar");
  if ((rubric.organization ?? 5) <= 2) out.push("writing-organization");
  if ((rubric.vocabulary ?? 5) <= 2) out.push("writing-vocabulary");
  if ((rubric.clarity ?? 5) <= 2) out.push("writing-clarity");
  return out;
}

export function speakingWeaknesses(rubric: Rubric): WeaknessTag[] {
  const out: WeaknessTag[] = [];
  if ((rubric.fluency ?? 5) <= 2) out.push("speaking-fluency");
  if ((rubric.pronunciation ?? 5) <= 2) out.push("speaking-pronunciation");
  if ((rubric.coherence ?? 5) <= 2) out.push("speaking-coherence");
  return out;
}

/** Tags that appeared in ≥3 separate sessions in the last 21 days. */
export function recurringWeaknesses(state: AppState, today: DateKey): { tag: WeaknessTag; count: number }[] {
  const since = addDays(today, -21);
  // A completed remediation module resets the counter for that tag.
  const resetAt = new Map<string, string>();
  for (const entry of state.dismissedRemediation) {
    const [tag, date] = entry.split("@");
    if (tag && date && (resetAt.get(tag) ?? "") < date) resetAt.set(tag, date);
  }
  const sessions = new Map<WeaknessTag, Set<string>>();
  for (const w of state.weaknesses) {
    if (w.date < since) continue;
    const reset = resetAt.get(w.tag);
    if (reset && w.date <= reset) continue;
    const key = `${w.date}#${w.day ?? ""}`;
    if (!sessions.has(w.tag)) sessions.set(w.tag, new Set());
    sessions.get(w.tag)!.add(key);
  }
  return [...sessions.entries()]
    .filter(([, s]) => s.size >= 3)
    .map(([tag, s]) => ({ tag, count: s.size }))
    .sort((a, b) => b.count - a.count);
}
