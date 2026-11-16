import { describe, expect, it } from "vitest";
import { getCurriculum, dayTypeOf, REVIEW_DAYS, authoredDays } from "./index";
import { ASSESSMENTS } from "./assessments";

const BANNED = /lorem ipsum|\bTODO\b|exercise goes here|add content later/i;

describe("90-day curriculum", () => {
  const lessons = getCurriculum();

  it("has 90 lessons in order", () => {
    expect(lessons).toHaveLength(90);
    lessons.forEach((l, i) => expect(l.day).toBe(i + 1));
  });

  it("has weekly review days and checkpoints at 30, 60, 90", () => {
    REVIEW_DAYS.forEach((d) => expect(dayTypeOf(d)).toBe("G"));
    expect(lessons[29].checkpoint).toBe("day30");
    expect(lessons[59].checkpoint).toBe("day60");
    expect(lessons[89].checkpoint).toBe("final");
  });

  it("every regular day has real reading, writing and speaking content", () => {
    const regular = lessons.filter((l) => !l.isReviewDay && !l.checkpoint);
    expect(regular).toHaveLength(75);
    expect(authoredDays()).toHaveLength(75);
    for (const l of regular) {
      expect(l.reading?.text.length, `day ${l.day} reading`).toBeGreaterThan(200);
      expect(l.reading?.questions.length, `day ${l.day} questions`).toBeGreaterThanOrEqual(2);
      l.reading?.questions.forEach((q) => expect(q.answer).toBeLessThan(q.options.length));
      expect(l.writing?.prompt.length).toBeGreaterThan(40);
      expect(l.speaking?.prompt.length).toBeGreaterThan(40);
      expect(l.vocabulary.length).toBeGreaterThanOrEqual(5);
    }
  });

  it("titles are distinct and no placeholders exist", () => {
    const titles = new Set(lessons.map((l) => l.title));
    expect(titles.size).toBe(90);
    expect(JSON.stringify(lessons)).not.toMatch(BANNED);
    expect(JSON.stringify(ASSESSMENTS)).not.toMatch(BANNED);
  });

  it("vocabulary ids are unique", () => {
    const ids = lessons.filter((l) => !l.isReviewDay).flatMap((l) => l.vocabulary.map((v) => v.id));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("main articles get longer as the course progresses", () => {
    const avg = (from: number, to: number) => {
      const xs = lessons.filter((l) => l.day >= from && l.day <= to && l.reading?.kind === "article").map((l) => l.reading!.wordCount);
      return xs.reduce((a, b) => a + b, 0) / xs.length;
    };
    expect(avg(1, 21)).toBeLessThan(avg(22, 45));
    expect(avg(22, 45)).toBeLessThan(avg(46, 69));
    expect(avg(46, 69)).toBeLessThan(avg(70, 89));
  });

  it("review items have answers on review days", () => {
    lessons.filter((l) => l.isReviewDay).forEach((l) => {
      expect(l.review.items.length).toBeGreaterThanOrEqual(6);
      l.review.items.forEach((it) => expect(it.answer.length).toBeGreaterThan(0));
    });
  });

  it("assessment answers are valid", () => {
    for (const a of Object.values(ASSESSMENTS)) {
      a.passages.forEach((p) => p.questions.forEach((q) => expect(q.answer).toBeLessThan(q.options.length)));
      a.vocab.forEach((v) => expect(v.answer).toBeLessThan(v.options.length));
    }
  });
});
