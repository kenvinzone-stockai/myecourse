import type { AssessmentKind, AssessmentResult, Cefr, Rubric } from "../domain/types";
import type { AssessmentDefinition } from "../curriculum/assessments";
import { analyseWriting, countWords, WRITING_RUBRIC } from "./writing";
import { cefrFromScore, LEVEL_WEIGHT, overallFromSkills, rubricToScore, speakingScore, writingScore } from "./scoring";

export type AssessmentDraft = {
  section: number;
  reading: Record<string, number>;
  vocab: Record<string, number>;
  texts: Record<string, string>;
  writingRubric: Rubric;
  speakingRubric: Rubric;
  speakingSeconds: Record<string, number>;
  recordingIds: string[];
};

export function emptyDraft(): AssessmentDraft {
  return { section: 0, reading: {}, vocab: {}, texts: {}, writingRubric: {}, speakingRubric: {}, speakingSeconds: {}, recordingIds: [] };
}

export const SPEAKING_KEYS = ["fluency", "pronunciation", "vocabulary", "grammar", "coherence", "confidence"];

export function scoreAssessment(def: AssessmentDefinition, d: AssessmentDraft, kind: AssessmentKind): AssessmentResult {
  // Reading — weighted by passage level, so harder texts count more.
  let wCorrect = 0;
  let wTotal = 0;
  let correct = 0;
  let total = 0;
  const byLevel: Partial<Record<Cefr, [number, number]>> = {};
  for (const p of def.passages) {
    const w = LEVEL_WEIGHT[p.level];
    for (const q of p.questions) {
      const ok = d.reading[q.id] === q.answer ? 1 : 0;
      correct += ok;
      total += 1;
      wCorrect += ok * w;
      wTotal += w;
      const cur = byLevel[p.level] ?? [0, 0];
      byLevel[p.level] = [cur[0] + ok, cur[1] + 1];
    }
  }
  const reading = wTotal ? Math.round((wCorrect / wTotal) * 100) : 0;

  // Vocabulary — also level-weighted.
  let vC = 0;
  let vT = 0;
  let vCorrect = 0;
  for (const v of def.vocab) {
    const w = LEVEL_WEIGHT[v.level];
    const ok = d.vocab[v.id] === v.answer ? 1 : 0;
    vCorrect += ok;
    vC += ok * w;
    vT += w;
  }
  const vocabulary = vT ? Math.round((vC / vT) * 100) : 0;

  // Writing — self-rubric (70%) + objective text signals (30%).
  const texts = def.writing.map((w) => d.texts[w.id] ?? "");
  const autos = def.writing.map((w, i) => analyseWriting(texts[i], { minWords: w.minWords, maxWords: w.maxWords }).autoScore);
  const autoAvg = autos.length ? autos.reduce((a, b) => a + b, 0) / autos.length : 0;
  const wRub = rubricToScore(d.writingRubric, WRITING_RUBRIC.map((c) => c.id));
  const writing = texts.every((t) => countWords(t) === 0) ? 0 : writingScore(wRub, Math.round(autoAvg));

  // Speaking — self-rubric (75%) + duration achieved vs targets (25%).
  const seconds = def.speaking.reduce((a, s) => a + Math.min(d.speakingSeconds[s.id] ?? 0, s.targetSeconds), 0);
  const target = def.speaking.reduce((a, s) => a + s.targetSeconds, 0);
  const sRub = rubricToScore(d.speakingRubric, SPEAKING_KEYS);
  const speaking = seconds === 0 && sRub === undefined ? 0 : speakingScore(sRub, seconds, target);

  const scores = { reading, writing, speaking, vocabulary };
  const overall = overallFromSkills(scores);
  return {
    kind,
    completedAt: new Date().toISOString(),
    reading: { correct, total, weighted: reading, byLevel },
    writing: { texts, rubric: d.writingRubric, wordCounts: texts.map(countWords), score: writing },
    speaking: { rubric: d.speakingRubric, seconds, recordingIds: d.recordingIds, score: speaking },
    vocabulary: { correct: vCorrect, total: def.vocab.length },
    scores,
    overall,
    cefr: cefrFromScore(overall),
  };
}
