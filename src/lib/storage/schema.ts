// Runtime validation of persisted data. Anything loaded from storage or an
// imported file passes through here before the app uses it.

import { z } from "zod";
import type { AppState } from "../domain/types";

const cefr = z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]);
const skill = z.enum(["reading", "writing", "speaking", "vocabulary"]);
const rubric = z.record(z.string(), z.number().min(0).max(5));
const dateKey = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

const profile = z.object({
  name: z.string().max(80),
  selfEstimatedLevel: z.union([cefr, z.literal("unsure")]),
  targetLevel: cefr,
  goals: z.array(z.enum(["business", "everyday", "technical-reading", "emails-reports", "speaking-fluency", "general", "travel", "presentations"])),
  topics: z.array(z.string()),
  dailyMinutes: z.number().min(10).max(240),
  preferredTime: z.enum(["morning", "lunch", "evening", "flexible"]),
  variety: z.enum(["american", "british", "no-preference"]),
  strongestSkill: skill,
  weakestSkill: skill,
  speakingConfidence: z.number().min(1).max(5),
  difficulty: z.enum(["gentle", "standard", "challenging"]),
  weekendAvailable: z.boolean(),
  createdAt: z.string(),
});

const settings = z.object({
  uiLanguage: z.enum(["vi", "en"]),
  glossMode: z.enum(["auto", "always", "never"]),
  theme: z.enum(["system", "light", "dark"]),
  planOffsetDays: z.number().int().min(0).max(365),
  simulatedDate: dateKey.optional(),
});

const assessment = z.object({
  kind: z.enum(["baseline", "day30", "day60", "final"]),
  completedAt: z.string(),
  reading: z.object({
    correct: z.number(),
    total: z.number(),
    weighted: z.number(),
    byLevel: z.record(z.string(), z.tuple([z.number(), z.number()])),
  }),
  writing: z.object({ texts: z.array(z.string()), rubric, wordCounts: z.array(z.number()), score: z.number() }),
  speaking: z.object({ rubric, seconds: z.number(), recordingIds: z.array(z.string()), score: z.number() }),
  vocabulary: z.object({ correct: z.number(), total: z.number() }),
  scores: z.object({ reading: z.number(), writing: z.number(), speaking: z.number(), vocabulary: z.number() }),
  overall: z.number(),
  cefr,
});

const lesson = z.object({
  day: z.number().int().min(1).max(90),
  status: z.enum(["not_started", "in_progress", "completed", "skipped"]),
  startedAt: z.string().optional(),
  completedAt: z.string().optional(),
  steps: z.record(z.string(), z.boolean()),
  reviewAnswers: z.record(z.string(), z.string()).default({}),
  readingAnswers: z.record(z.string(), z.number()),
  readingChecked: z.boolean(),
  readingScore: z.number().optional(),
  summary: z.string(),
  writingDraft: z.string(),
  writingChecklist: z.record(z.string(), z.boolean()),
  writingRubric: rubric,
  writingSubmittedAt: z.string().optional(),
  writingScore: z.number().optional(),
  aiFeedback: z.string().optional(),
  speakingSessionIds: z.array(z.string()),
  speakingRubric: rubric,
  speakingScore: z.number().optional(),
  reflection: z.object({ easy: z.string(), difficult: z.string(), phrase: z.string(), confidence: z.number().min(0).max(5) }),
  minutes: z.number().min(0),
});

const vocabCard = z.object({
  id: z.string(),
  term: z.string(),
  meaning: z.string(),
  vi: z.string().optional(),
  example: z.string(),
  collocation: z.string().optional(),
  note: z.string(),
  sourceDay: z.number().optional(),
  status: z.enum(["new", "learning", "difficult", "known"]),
  stage: z.number().int().min(0).max(10),
  dueDate: dateKey,
  addedAt: z.string(),
  reviews: z.number(),
  lapses: z.number(),
  lastReviewed: z.string().optional(),
});

const speakingSession = z.object({
  id: z.string(),
  day: z.number().optional(),
  context: z.enum(["lesson", "practice", "assessment"]),
  prompt: z.string(),
  createdAt: z.string(),
  seconds: z.number().min(0),
  audioId: z.string().optional(),
  transcript: z.string(),
  selfScore: z.number().optional(),
  confidence: z.number().optional(),
});

const weakTag = z.enum([
  "reading-inference",
  "reading-detail",
  "reading-main",
  "reading-vocab",
  "writing-grammar",
  "writing-organization",
  "writing-vocabulary",
  "writing-clarity",
  "speaking-fluency",
  "speaking-pronunciation",
  "speaking-coherence",
  "vocab-retention",
]);

export const appStateSchema = z.object({
  version: z.literal(1),
  profile: profile.nullable(),
  onboardingComplete: z.boolean(),
  settings,
  assessments: z.object({ baseline: assessment.optional(), day30: assessment.optional(), day60: assessment.optional(), final: assessment.optional() }),
  lessons: z.record(z.string(), lesson),
  vocab: z.record(z.string(), vocabCard),
  speaking: z.array(speakingSession),
  skillEvents: z.array(z.object({ at: z.string(), date: dateKey, day: z.number().optional(), skill, score: z.number().min(0).max(100), source: z.string() })),
  weaknesses: z.array(z.object({ date: dateKey, day: z.number().optional(), tag: weakTag })),
  weeklyReviews: z.record(
    z.string(),
    z.object({
      week: z.number(),
      improved: z.string(),
      difficult: z.string(),
      usefulVocab: z.string(),
      focusSkill: z.union([skill, z.literal("")]),
      confidenceVsLastWeek: z.number(),
      savedAt: z.string().optional(),
    }),
  ),
  activity: z.record(dateKey, z.number().min(0)),
  dismissedRemediation: z.array(z.string()),
});

export function createInitialState(): AppState {
  return {
    version: 1,
    profile: null,
    onboardingComplete: false,
    settings: { uiLanguage: "vi", glossMode: "auto", theme: "system", planOffsetDays: 0 },
    assessments: {},
    lessons: {},
    vocab: {},
    speaking: [],
    skillEvents: [],
    weaknesses: [],
    weeklyReviews: {},
    activity: {},
    dismissedRemediation: [],
  };
}

export type ParseResult = { ok: true; state: AppState } | { ok: false; error: string };

export function parseState(raw: unknown): ParseResult {
  const res = appStateSchema.safeParse(raw);
  if (res.success) return { ok: true, state: res.data as AppState };
  const first = res.error.issues[0];
  return { ok: false, error: `${first?.path.join(".") || "root"}: ${first?.message ?? "invalid data"}` };
}
