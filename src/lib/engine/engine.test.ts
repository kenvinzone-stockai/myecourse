import { describe, expect, it } from "vitest";
import type { AppState } from "../domain/types";
import { createInitialState, parseState } from "../storage/schema";
import { readImport, buildExport } from "../storage/repository";
import { planStatus, recommendation, studyStreak } from "./plan";
import { newCard, reviewCard } from "./srs";
import { adaptSpeaking, adaptWriting, bandFor } from "./adaptive";
import { cefrFromScore, currentSkillScore, recurringWeaknesses, rubricToScore } from "./scoring";
import { analyseWriting } from "./writing";
import { scoreAssessment, emptyDraft } from "./assessment";
import { ASSESSMENTS } from "../curriculum/assessments";
import { weeklySummary, finalReport } from "./reports";

function withLessons(done: number[], extra: Partial<AppState> = {}): AppState {
  const s = { ...createInitialState(), onboardingComplete: true, ...extra };
  for (const d of done) {
    s.lessons[String(d)] = {
      day: d, status: "completed", steps: {}, reviewAnswers: {}, readingAnswers: {}, readingChecked: false, summary: "", writingDraft: "",
      writingChecklist: {}, writingRubric: {}, speakingSessionIds: [], speakingRubric: {}, reflection: { easy: "", difficult: "", phrase: "", confidence: 3 }, minutes: 60,
    };
  }
  return s;
}

describe("plan & missed days", () => {
  it("on Day 1 recommends Day 1", () => {
    expect(recommendation(withLessons([]), "2026-11-16")).toEqual({ kind: "continue", day: 1 });
  });
  it("before the start date offers a preview", () => {
    expect(recommendation(withLessons([]), "2026-11-10")).toEqual({ kind: "before-start", daysUntilStart: 6 });
  });
  it("after a completed day says done", () => {
    expect(recommendation(withLessons([1]), "2026-11-16")).toEqual({ kind: "done-today", nextDay: 2 });
  });
  it("missed days: resumes one lesson, never piles up", () => {
    const s = withLessons([1, 2]);
    const ps = planStatus(s, "2026-11-20"); // calendar day 5
    expect(ps.calendarDay).toBe(5);
    expect(ps.missedDays).toEqual([3, 4]);
    expect(recommendation(s, "2026-11-20")).toEqual({ kind: "catch-up", day: 3, behind: 2 });
  });
  it("moving the plan forward clears the backlog", () => {
    const s = withLessons([1, 2]);
    s.settings.planOffsetDays = 2;
    expect(recommendation(s, "2026-11-20")).toEqual({ kind: "continue", day: 3 });
  });
  it("after Day 90 with everything complete reports finished", () => {
    const s = withLessons(Array.from({ length: 90 }, (_, i) => i + 1));
    expect(recommendation(s, "2027-03-01")).toEqual({ kind: "finished" });
  });
  it("after Day 90 with gaps still lets the learner catch up", () => {
    const s = withLessons(Array.from({ length: 80 }, (_, i) => i + 1));
    expect(recommendation(s, "2027-03-01")).toMatchObject({ kind: "catch-up", day: 81 });
  });
  it("streak counts consecutive days with 10+ minutes", () => {
    const s = withLessons([], { activity: { "2026-11-16": 60, "2026-11-17": 30, "2026-11-18": 5 } });
    expect(studyStreak(s, "2026-11-18")).toBe(2);
    expect(studyStreak(s, "2026-11-20")).toBe(0);
  });
});

describe("spaced repetition", () => {
  it("follows 0 → 1 → 3 → 7 → 14 → 30 days", () => {
    let c = newCard({ id: "x", term: "habit", meaning: "m", example: "e" }, "2026-11-16", "t");
    expect(c.dueDate).toBe("2026-11-16");
    const due: string[] = [];
    let today = "2026-11-16";
    for (let i = 0; i < 5; i++) {
      c = reviewCard(c, "good", today);
      due.push(c.dueDate);
      today = c.dueDate;
    }
    expect(due).toEqual(["2026-11-17", "2026-11-20", "2026-11-27", "2026-12-11", "2027-01-10"]);
    expect(c.status).toBe("known");
  });
  it("'again' resets and marks difficult", () => {
    const c = reviewCard({ ...newCard({ id: "x", term: "t", meaning: "m", example: "e" }, "2026-11-16", "t"), stage: 3 }, "again", "2026-12-01");
    expect(c).toMatchObject({ stage: 0, status: "difficult", dueDate: "2026-12-01" });
  });
});

describe("adaptive difficulty & scoring", () => {
  it("bands follow <60 / 60–79 / 80+", () => {
    expect([bandFor(59), bandFor(60), bandFor(79), bandFor(80), bandFor(undefined)]).toEqual(["support", "core", "core", "stretch", "core"]);
  });
  it("adapts gradually", () => {
    expect(adaptWriting(100, 160, 50, "standard")).toMatchObject({ minWords: 85, band: "support" });
    expect(adaptWriting(100, 160, 70, "standard")).toMatchObject({ minWords: 100, maxWords: 160 });
    expect(adaptSpeaking(120, 90, "standard").targetSeconds).toBe(150);
  });
  it("one low score does not collapse the rolling score", () => {
    const ev = [80, 82, 78, 85, 30].map((score, i) => ({ at: `2026-11-${16 + i}T10:00:00Z`, date: `2026-11-${16 + i}`, skill: "reading" as const, score, source: "lesson" }));
    expect(currentSkillScore(ev, "reading")).toBeGreaterThan(60);
  });
  it("rubric and CEFR mapping", () => {
    expect(rubricToScore({ a: 3, b: 5 })).toBe(75);
    expect([cefrFromScore(10), cefrFromScore(45), cefrFromScore(70), cefrFromScore(95)]).toEqual(["A1", "B1", "B2", "C2"]);
  });
  it("creates remediation after the same weakness in 3 sessions, and resets when done", () => {
    const s = withLessons([]);
    s.weaknesses = [1, 2, 3].map((d) => ({ date: `2026-11-${15 + d}`, day: d, tag: "reading-inference" as const }));
    expect(recurringWeaknesses(s, "2026-11-19")).toEqual([{ tag: "reading-inference", count: 3 }]);
    s.dismissedRemediation = ["reading-inference@2026-11-19"];
    expect(recurringWeaknesses(s, "2026-11-19")).toEqual([]);
  });
  it("analyses writing objectively", () => {
    const a = analyseWriting("I check the figures every morning. However, the deadline is tight because we must submit the report on Friday.", { minWords: 15, maxWords: 40, vocab: ["check", "deadline", "submit", "workload"] });
    expect(a.words).toBe(19);
    expect(a.vocabUsed).toEqual(["check", "deadline", "submit"]);
    expect(a.linkers).toContain("however");
  });
});

describe("assessment & reports", () => {
  it("scores a perfect and an empty baseline", () => {
    const def = ASSESSMENTS.baseline;
    const d = emptyDraft();
    expect(scoreAssessment(def, d, "baseline")).toMatchObject({ overall: 0, cefr: "A1" });
    def.passages.forEach((p) => p.questions.forEach((q) => (d.reading[q.id] = q.answer)));
    def.vocab.forEach((v) => (d.vocab[v.id] = v.answer));
    const r = scoreAssessment(def, d, "baseline");
    expect(r.scores.reading).toBe(100);
    expect(r.scores.vocabulary).toBe(100);
  });
  it("final report compares baseline and final", () => {
    const s = withLessons([]);
    const base = scoreAssessment(ASSESSMENTS.baseline, emptyDraft(), "baseline");
    const d = emptyDraft();
    ASSESSMENTS.final.passages.forEach((p) => p.questions.forEach((q) => (d.reading[q.id] = q.answer)));
    s.assessments = { baseline: base, final: scoreAssessment(ASSESSMENTS.final, d, "final") };
    const rep = finalReport(s)!;
    expect(rep.deltas.reading).toBe(100);
    expect(rep.strongestImprovement).toBe("reading");
    expect(rep.nextPlan.length).toBeGreaterThan(3);
  });
  it("weekly summary counts completed lessons and recommends", () => {
    const sum = weeklySummary(withLessons([1, 2, 3]), 1, "2026-11-22");
    expect(sum.completed).toBe(3);
    expect(sum.minutes).toBe(180);
    expect(sum.recommendation.length).toBeGreaterThan(0);
  });
});

describe("persistence validation", () => {
  it("accepts a valid state and rejects corrupted data", () => {
    expect(parseState(JSON.parse(JSON.stringify(withLessons([1])))).ok).toBe(true);
    expect(parseState({ version: 1, lessons: "oops" }).ok).toBe(false);
    expect(parseState(null).ok).toBe(false);
  });
  it("export → import round-trips; foreign files are refused", async () => {
    const s = withLessons([1, 2]);
    const file = await buildExport(s);
    const back = await readImport(JSON.stringify(file));
    expect(back.ok && back.state.lessons["2"].status).toBe("completed");
    expect((await readImport("{not json")).ok).toBe(false);
    expect((await readImport(JSON.stringify({ app: "other" }))).ok).toBe(false);
  });
});
