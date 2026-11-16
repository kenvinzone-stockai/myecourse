// Compact authoring format for daily lesson content. The builder in
// ./index.ts expands seeds into full DailyLesson objects.

import type { QuestionType, SpeakingType, WritingType } from "../domain/types";

/** "term | meaning | vi | example | collocation" (vi and collocation may be empty) */
export type VocabSeed = string;

/** [type, prompt, options, correctIndex] */
export type QuestionSeed = [QuestionType, string, string[], number];

export type DaySeed = {
  day: number;
  title: string;
  objective: string;
  vocab: VocabSeed[];
  grammar?: { p: string; e: string; vi?: string; ex: string[] };
  pron?: { focus: string; tip: string; items: string[] };
  reading?: { title: string; text: string; q: QuestionSeed[]; summary?: string };
  writing: { type: WritingType; prompt: string; min: number; max: number; tips?: string[] };
  speaking: { type: SpeakingType; prompt: string; sec: number; script?: string; criteria?: string[] };
};
