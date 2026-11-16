// Core domain types for the Personal English Learning OS.
// Pure data definitions — no React, no storage concerns.

export type Cefr = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
export const CEFR_LEVELS: Cefr[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

export type Skill = "reading" | "writing" | "speaking" | "vocabulary";
export type ScoreKey = Skill | "consistency";

export type PhaseId = 1 | 2 | 3 | 4 | 5;

/** Weekly rhythm slot. G = weekly review. X = checkpoint/assessment day. */
export type DayType = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "X";

export type StepId = "review" | "learn" | "read" | "write" | "speak" | "reflect";
export const LESSON_STEPS: StepId[] = ["review", "learn", "read", "write", "speak", "reflect"];

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

export type VocabularyItem = {
  id: string; // stable slug, e.g. "d3-follow-up"
  term: string;
  meaning: string; // simple English definition
  vi?: string; // short Vietnamese gloss (shown depending on gloss mode)
  example: string;
  collocation?: string;
  day: number;
};

export type QuestionType = "main" | "detail" | "inference" | "vocab" | "purpose";

export type ReadingQuestion = {
  id: string;
  type: QuestionType;
  prompt: string;
  options: string[];
  answer: number; // index of the correct option
};

export type ReadingActivity = {
  title: string;
  level: Cefr;
  kind: "article" | "model"; // model = short model text for writing days
  text: string;
  wordCount: number;
  readingMinutes: number;
  questions: ReadingQuestion[];
  summaryTask?: string;
};

export type WritingType =
  | "sentences"
  | "paragraph"
  | "email"
  | "summary"
  | "opinion"
  | "comparison"
  | "explanation"
  | "message"
  | "report";

export type WritingActivity = {
  type: WritingType;
  prompt: string;
  minWords: number;
  maxWords: number;
  tips: string[];
};

export type SpeakingType =
  | "read-aloud"
  | "shadowing"
  | "answer"
  | "describe"
  | "explain"
  | "summary"
  | "opinion"
  | "story"
  | "meeting"
  | "presentation";

export type SpeakingActivity = {
  type: SpeakingType;
  prompt: string;
  targetSeconds: number;
  script?: string; // text for read-aloud / shadowing
  criteria: string[];
};

export type GrammarFocus = {
  pattern: string;
  explanation: string;
  explanationVi?: string;
  examples: string[];
};

export type PronunciationFocus = {
  focus: string;
  tip: string;
  items: string[];
};

export type ReviewActivity = {
  instructions: string;
  items: { prompt: string; answer: string }[];
};

export type DailyLesson = {
  id: string;
  day: number;
  week: number;
  phase: PhaseId;
  type: DayType;
  title: string;
  theme: string;
  level: Cefr;
  estimatedMinutes: number;
  objectives: string[];
  skills: Skill[];
  isReviewDay: boolean;
  checkpoint?: "day30" | "day60" | "final";
  vocabulary: VocabularyItem[];
  grammar?: GrammarFocus;
  pronunciation?: PronunciationFocus;
  reading?: ReadingActivity;
  writing?: WritingActivity;
  speaking?: SpeakingActivity;
  review: ReviewActivity;
  integrated: boolean; // Reading → Writing → Speaking pipeline
};

export type Phase = {
  id: PhaseId;
  name: string;
  nameVi: string;
  days: [number, number];
  objectives: string[];
};

// ---------------------------------------------------------------------------
// Learner data
// ---------------------------------------------------------------------------

export type Goal =
  | "business"
  | "everyday"
  | "technical-reading"
  | "emails-reports"
  | "speaking-fluency"
  | "general"
  | "travel"
  | "presentations";

export type Difficulty = "gentle" | "standard" | "challenging";
export type UiLanguage = "vi" | "en";
export type GlossMode = "auto" | "always" | "never";

export type LearnerProfile = {
  name: string;
  selfEstimatedLevel: Cefr | "unsure";
  targetLevel: Cefr;
  goals: Goal[];
  topics: string[];
  dailyMinutes: number;
  preferredTime: "morning" | "lunch" | "evening" | "flexible";
  variety: "american" | "british" | "no-preference";
  strongestSkill: Skill;
  weakestSkill: Skill;
  speakingConfidence: number; // 1-5
  difficulty: Difficulty;
  weekendAvailable: boolean;
  createdAt: string;
};

export type Settings = {
  uiLanguage: UiLanguage;
  glossMode: GlossMode;
  theme: "system" | "light" | "dark";
  planOffsetDays: number; // "move plan forward" after missed days
  simulatedDate?: string; // YYYY-MM-DD, testing aid
};

export type Rubric = Record<string, number>; // criterion -> 1..5

export type AssessmentKind = "baseline" | "day30" | "day60" | "final";

export type AssessmentResult = {
  kind: AssessmentKind;
  completedAt: string;
  reading: { correct: number; total: number; weighted: number; byLevel: Partial<Record<Cefr, [number, number]>> };
  writing: { texts: string[]; rubric: Rubric; wordCounts: number[]; score: number };
  speaking: { rubric: Rubric; seconds: number; recordingIds: string[]; score: number };
  vocabulary: { correct: number; total: number };
  scores: { reading: number; writing: number; speaking: number; vocabulary: number };
  overall: number;
  cefr: Cefr;
};

export type LessonStatus = "not_started" | "in_progress" | "completed" | "skipped";

export type Reflection = {
  easy: string;
  difficult: string;
  phrase: string;
  confidence: number; // 1-5, 0 = not set
};

export type LessonProgress = {
  day: number;
  status: LessonStatus;
  startedAt?: string;
  completedAt?: string;
  steps: Partial<Record<StepId, boolean>>;
  reviewAnswers: Record<string, string>;
  readingAnswers: Record<string, number>;
  readingChecked: boolean;
  readingScore?: number; // 0..100
  summary: string;
  writingDraft: string;
  writingChecklist: Record<string, boolean>;
  writingRubric: Rubric;
  writingSubmittedAt?: string;
  writingScore?: number;
  aiFeedback?: string;
  speakingSessionIds: string[];
  speakingRubric: Rubric;
  speakingScore?: number;
  reflection: Reflection;
  minutes: number;
};

export type VocabStatus = "new" | "learning" | "difficult" | "known";

export type VocabCard = {
  id: string;
  term: string;
  meaning: string;
  vi?: string;
  example: string;
  collocation?: string;
  note: string;
  sourceDay?: number;
  status: VocabStatus;
  stage: number; // index into SRS_INTERVALS
  dueDate: string; // YYYY-MM-DD
  addedAt: string;
  reviews: number;
  lapses: number;
  lastReviewed?: string;
};

export type SpeakingSession = {
  id: string;
  day?: number;
  context: "lesson" | "practice" | "assessment";
  prompt: string;
  createdAt: string;
  seconds: number;
  audioId?: string;
  transcript: string;
  selfScore?: number; // 1-5
  confidence?: number; // 1-5
};

export type SkillEvent = {
  at: string; // ISO timestamp
  date: string; // YYYY-MM-DD local
  day?: number;
  skill: Skill;
  score: number; // 0..100
  source: string;
};

export type WeaknessTag =
  | "reading-inference"
  | "reading-detail"
  | "reading-main"
  | "reading-vocab"
  | "writing-grammar"
  | "writing-organization"
  | "writing-vocabulary"
  | "writing-clarity"
  | "speaking-fluency"
  | "speaking-pronunciation"
  | "speaking-coherence"
  | "vocab-retention";

export type WeaknessEvent = { date: string; day?: number; tag: WeaknessTag };

export type WeeklyReviewEntry = {
  week: number;
  improved: string;
  difficult: string;
  usefulVocab: string;
  focusSkill: Skill | "";
  confidenceVsLastWeek: number; // 1-5
  savedAt?: string;
};

export type AppState = {
  version: 1;
  profile: LearnerProfile | null;
  onboardingComplete: boolean;
  settings: Settings;
  assessments: Partial<Record<AssessmentKind, AssessmentResult>>;
  lessons: Record<string, LessonProgress>;
  vocab: Record<string, VocabCard>;
  speaking: SpeakingSession[];
  skillEvents: SkillEvent[];
  weaknesses: WeaknessEvent[];
  weeklyReviews: Record<string, WeeklyReviewEntry>;
  activity: Record<string, number>; // YYYY-MM-DD -> minutes
  dismissedRemediation: string[]; // "tag@date"
};
