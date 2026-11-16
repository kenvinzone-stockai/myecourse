// Builds the complete 90-day curriculum from authored seeds.
// Pure and deterministic: same input → same lessons.

import { TOTAL_DAYS, weekOfDay } from "../domain/dates";
import type {
  Cefr,
  DailyLesson,
  DayType,
  Phase,
  PhaseId,
  ReadingActivity,
  ReviewActivity,
  Skill,
  SpeakingActivity,
  SpeakingType,
  StepId,
  VocabularyItem,
} from "../domain/types";
import { PHASE1 } from "./content/phase1";
import { PHASE2 } from "./content/phase2";
import { PHASE3 } from "./content/phase3";
import { PHASE4 } from "./content/phase4";
import type { DaySeed } from "./seed";

export const PHASES: Phase[] = [
  {
    id: 1,
    name: "Rebuild the Foundation",
    nameVi: "Xây lại nền tảng",
    days: [1, 21],
    objectives: [
      "Identify weaknesses",
      "Rebuild essential grammar patterns",
      "Strengthen high-frequency vocabulary",
      "Improve reading accuracy",
      "Write clear sentences and paragraphs",
      "Reduce hesitation when speaking",
    ],
  },
  {
    id: 2,
    name: "Skill Expansion",
    nameVi: "Mở rộng kỹ năng",
    days: [22, 45],
    objectives: ["Longer passages", "Vocabulary in context", "Paragraph & short-form writing", "Paraphrasing and summarising", "Expressing opinions", "Describing experiences and processes"],
  },
  {
    id: 3,
    name: "Applied English",
    nameVi: "Tiếng Anh ứng dụng",
    days: [46, 69],
    objectives: ["Professional communication", "Articles and reports", "Emails and proposals", "Structured opinions and discussions", "Presentation-style speaking", "More sophisticated structures"],
  },
  {
    id: 4,
    name: "Advanced Integration",
    nameVi: "Tích hợp nâng cao",
    days: [70, 89],
    objectives: ["Reading → Writing → Speaking pipelines", "Analysing arguments", "Summarising complex material", "Structured writing", "Longer speaking turns", "Thinking directly in English"],
  },
  {
    id: 5,
    name: "Final Assessment & Next Roadmap",
    nameVi: "Đánh giá cuối khóa & lộ trình tiếp theo",
    days: [90, 90],
    objectives: ["Repeat the baseline assessment", "Compare Day 1 and Day 90", "Plan the next 90 days"],
  },
];

export const WEEK_THEMES: { week: number; theme: string; themeVi: string }[] = [
  { week: 1, theme: "Fresh start: habits & routines", themeVi: "Khởi đầu: thói quen & nhịp sinh hoạt" },
  { week: 2, theme: "Workplace communication", themeVi: "Giao tiếp nơi công sở" },
  { week: 3, theme: "Technology in everyday life", themeVi: "Công nghệ trong đời sống" },
  { week: 4, theme: "Money & personal finance", themeVi: "Tiền bạc & tài chính cá nhân" },
  { week: 5, theme: "Health, energy & productivity", themeVi: "Sức khỏe, năng lượng & năng suất" },
  { week: 6, theme: "Travel, culture & cities", themeVi: "Du lịch, văn hóa & thành phố" },
  { week: 7, theme: "Business & how companies work", themeVi: "Kinh doanh & cách doanh nghiệp vận hành" },
  { week: 8, theme: "AI & the future of work", themeVi: "AI & tương lai công việc" },
  { week: 9, theme: "Decisions & psychology", themeVi: "Ra quyết định & tâm lý học" },
  { week: 10, theme: "Leadership, teams & projects", themeVi: "Lãnh đạo, đội nhóm & dự án" },
  { week: 11, theme: "Energy, science & sustainability", themeVi: "Năng lượng, khoa học & phát triển bền vững" },
  { week: 12, theme: "Arguments & modern-life debates", themeVi: "Lập luận & tranh luận đời sống hiện đại" },
  { week: 13, theme: "Capstone: present your ideas", themeVi: "Tổng kết: trình bày ý tưởng của bạn" },
];

export const DAY_TYPE_INFO: Record<DayType, { label: string; labelVi: string; focus: string }> = {
  A: { label: "Read & discuss", labelVi: "Đọc & thảo luận", focus: "Reading + vocabulary + short speaking" },
  B: { label: "Language & writing", labelVi: "Ngữ pháp & viết", focus: "Grammar in context + writing" },
  C: { label: "Read & speak", labelVi: "Đọc & nói", focus: "Reading + speaking" },
  D: { label: "Write & pronounce", labelVi: "Viết & phát âm", focus: "Writing + vocabulary + pronunciation" },
  E: { label: "Integrated R→W→S", labelVi: "Tích hợp Đọc→Viết→Nói", focus: "Read → summarise → speak" },
  F: { label: "Challenge day", labelVi: "Ngày thử thách", focus: "Practical, real-world English" },
  G: { label: "Weekly review", labelVi: "Ôn tập tuần", focus: "Review + reflection + mini assessment" },
  X: { label: "Checkpoint", labelVi: "Mốc đánh giá", focus: "Milestone assessment" },
};

/** Planned minutes per lesson step, by day type. */
export const STEP_MINUTES: Record<DayType, Record<StepId, number>> = {
  A: { review: 5, learn: 10, read: 20, write: 10, speak: 15, reflect: 5 },
  B: { review: 5, learn: 15, read: 8, write: 22, speak: 10, reflect: 5 },
  C: { review: 5, learn: 10, read: 20, write: 10, speak: 20, reflect: 5 },
  D: { review: 5, learn: 15, read: 8, write: 20, speak: 12, reflect: 5 },
  E: { review: 5, learn: 10, read: 18, write: 17, speak: 20, reflect: 5 },
  F: { review: 5, learn: 10, read: 12, write: 18, speak: 20, reflect: 5 },
  G: { review: 15, learn: 5, read: 0, write: 15, speak: 10, reflect: 10 },
  X: { review: 10, learn: 0, read: 0, write: 0, speak: 0, reflect: 5 },
};

const SPEAKING_CRITERIA: Record<SpeakingType, string[]> = {
  "read-aloud": ["Clear final consonants", "Correct word stress", "Natural pauses between chunks", "Steady pace — not too fast"],
  shadowing: ["Match the rhythm of the model", "Copy stress and intonation", "Keep going even if you miss a word"],
  answer: ["Answer every question", "Give a reason or example for each answer", "Keep speaking for the target time", "Few long pauses"],
  describe: ["Clear sequence (first, then, finally)", "Specific details", "Past tenses used correctly", "Today's vocabulary used"],
  explain: ["Simple, clear structure", "One concrete example or comparison", "Listener could repeat the idea", "No reading from notes"],
  summary: ["Main idea stated first", "Key points in your own words", "Did not read the text", "Logical order"],
  opinion: ["Clear position", "At least two reasons", "An example", "A short conclusion"],
  story: ["Clear beginning, middle and end", "Past tenses used correctly", "Something interesting happens", "Natural linking (then, suddenly, in the end)"],
  meeting: ["Polite, professional phrases", "Clear purpose", "Responds to the other person", "Confirms the outcome"],
  presentation: ["Clear opening", "Signposting between points", "Eye contact with the camera / audience", "Memorable close"],
};

const ALL_SEEDS: DaySeed[] = [...PHASE1, ...PHASE2, ...PHASE3, ...PHASE4];
const SEED_BY_DAY = new Map(ALL_SEEDS.map((s) => [s.day, s]));

export const REVIEW_DAYS = Array.from({ length: 12 }, (_, i) => (i + 1) * 7);
export const CHECKPOINT_DAYS: Record<number, "day30" | "day60" | "final"> = { 30: "day30", 60: "day60", 90: "final" };

export function phaseOfDay(day: number): PhaseId {
  const p = PHASES.find((ph) => day >= ph.days[0] && day <= ph.days[1]);
  return (p?.id ?? 4) as PhaseId;
}

export function dayTypeOf(day: number): DayType {
  if (CHECKPOINT_DAYS[day]) return "X";
  return (["A", "B", "C", "D", "E", "F", "G"] as const)[(day - 1) % 7];
}

export function levelOfDay(day: number): Cefr {
  if (day <= 33) return "B1";
  if (day <= 69) return "B2";
  return "C1";
}

function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 40);
}

export function parseVocab(day: number, raw: string): VocabularyItem {
  const [term, meaning, vi, example, collocation] = raw.split("|").map((x) => x.trim());
  return {
    id: `d${day}-${slug(term)}`,
    term,
    meaning,
    vi: vi || undefined,
    example,
    collocation: collocation || undefined,
    day,
  };
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Turn a vocabulary item into a recall prompt (cloze if possible). */
export function clozeFor(item: VocabularyItem): { prompt: string; answer: string } {
  const re = new RegExp(`\\b${escapeRegExp(item.term)}\\b`, "i");
  if (re.test(item.example)) {
    return { prompt: item.example.replace(re, "_____"), answer: item.term };
  }
  return { prompt: `_____ (${item.term[0]}…) — ${item.meaning}`, answer: item.term };
}

function seedVocab(day: number): VocabularyItem[] {
  const s = SEED_BY_DAY.get(day);
  return s ? s.vocab.map((v) => parseVocab(day, v)) : [];
}

function vocabBefore(day: number, offsets: number[]): VocabularyItem[] {
  const out: VocabularyItem[] = [];
  for (const off of offsets) {
    // walk back to the nearest authored day at or before (day - off)
    for (let d = day - off; d >= 1; d--) {
      const v = seedVocab(d);
      if (v.length) {
        out.push(v[(day + off) % v.length]);
        break;
      }
    }
  }
  // de-duplicate
  return out.filter((v, i, arr) => arr.findIndex((x) => x.id === v.id) === i);
}

function buildDailyReview(day: number): ReviewActivity {
  if (day === 1) {
    return {
      instructions: "Warm-up: answer quickly in English (in your head or aloud). No dictionary.",
      items: [
        { prompt: "What did you do yesterday evening? (2 sentences)", answer: "" },
        { prompt: "Name five English words you use at work.", answer: "" },
        { prompt: "Why are you starting this 90-day program?", answer: "" },
      ],
    };
  }
  const items = vocabBefore(day, [1, 3, 7, 14]).map(clozeFor);
  return {
    instructions: "Quick recall from earlier lessons (spaced: 1, 3, 7 and 14 days ago). Type the missing word or phrase, then check.",
    items,
  };
}

function weekVocab(week: number): VocabularyItem[] {
  const out: VocabularyItem[] = [];
  for (let d = (week - 1) * 7 + 1; d <= week * 7; d++) out.push(...seedVocab(d));
  return out;
}

function pickSpread<T>(arr: T[], n: number): T[] {
  if (arr.length <= n) return arr;
  const step = arr.length / n;
  return Array.from({ length: n }, (_, i) => arr[Math.floor(i * step)]);
}

function buildSeedLesson(seed: DaySeed): DailyLesson {
  const day = seed.day;
  const type = dayTypeOf(day);
  const week = weekOfDay(day);
  const phase = phaseOfDay(day);
  const level = levelOfDay(day);
  const vocabulary = seed.vocab.map((v) => parseVocab(day, v));

  let reading: ReadingActivity | undefined;
  if (seed.reading) {
    const wc = countWords(seed.reading.text);
    const isModel = seed.reading.title.toLowerCase().startsWith("model");
    reading = {
      title: seed.reading.title,
      level,
      kind: isModel ? "model" : "article",
      text: seed.reading.text,
      wordCount: wc,
      readingMinutes: Math.max(1, Math.round(wc / 130)),
      questions: seed.reading.q.map(([qType, prompt, options, answer], i) => ({
        id: `d${day}-q${i + 1}`,
        type: qType,
        prompt,
        options,
        answer,
      })),
      summaryTask: seed.reading.summary,
    };
  }

  const speaking: SpeakingActivity = {
    type: seed.speaking.type,
    prompt: seed.speaking.prompt,
    targetSeconds: seed.speaking.sec,
    script: seed.speaking.script,
    criteria: seed.speaking.criteria ?? SPEAKING_CRITERIA[seed.speaking.type],
  };

  const skills: Skill[] = ["vocabulary"];
  if (reading) skills.unshift("reading");
  skills.push("writing", "speaking");

  const base = Object.values(STEP_MINUTES[type]).reduce((a, b) => a + b, 0);
  const integrated = type === "E" || phase === 4 || seed.writing.type === "summary";

  return {
    id: `day-${day}`,
    day,
    week,
    phase,
    type,
    title: seed.title,
    theme: WEEK_THEMES[week - 1]?.theme ?? "",
    level,
    estimatedMinutes: base + (phase >= 4 ? 5 : 0),
    objectives: [seed.objective],
    skills,
    isReviewDay: false,
    vocabulary,
    grammar: seed.grammar ? { pattern: seed.grammar.p, explanation: seed.grammar.e, explanationVi: seed.grammar.vi, examples: seed.grammar.ex } : undefined,
    pronunciation: seed.pron,
    reading,
    writing: { type: seed.writing.type, prompt: seed.writing.prompt, minWords: seed.writing.min, maxWords: seed.writing.max, tips: seed.writing.tips ?? [] },
    speaking,
    review: buildDailyReview(day),
    integrated,
  };
}

function buildReviewDay(day: number): DailyLesson {
  const week = weekOfDay(day);
  const theme = WEEK_THEMES[week - 1]?.theme ?? "";
  const vocab = weekVocab(week);
  const quiz = pickSpread(vocab, 8).map(clozeFor);
  const titles = Array.from({ length: 6 }, (_, i) => SEED_BY_DAY.get(day - 6 + i)?.title).filter(Boolean);
  return {
    id: `day-${day}`,
    day,
    week,
    phase: phaseOfDay(day),
    type: "G",
    title: `Week ${week} review: ${theme}`,
    theme,
    level: levelOfDay(day),
    estimatedMinutes: Object.values(STEP_MINUTES.G).reduce((a, b) => a + b, 0),
    objectives: [
      "Consolidate this week's vocabulary with a mini assessment",
      "Reuse the week's language in writing and speaking",
      "Reflect and set one focus for next week",
    ],
    skills: ["vocabulary", "writing", "speaking"],
    isReviewDay: true,
    vocabulary: vocab,
    writing: {
      type: "paragraph",
      prompt: `Write a short reflection on this week (${titles.slice(0, 3).join(" · ")}…). What was the most useful idea? Use at least five words from this week's list naturally.`,
      minWords: day <= 21 ? 80 : day <= 45 ? 110 : 140,
      maxWords: day <= 21 ? 140 : day <= 45 ? 170 : 210,
      tips: ["Underline (mentally) the five words you reuse.", "Reread one of this week's texts before writing if you need ideas."],
    },
    speaking: {
      type: "summary",
      prompt: `Weekly recap: in ${day <= 21 ? "90 seconds" : "2 minutes"}, explain the most useful idea from this week's theme ("${theme}") to a friend, and say how you will use it.`,
      targetSeconds: day <= 21 ? 90 : 120,
      criteria: SPEAKING_CRITERIA.summary,
    },
    review: {
      instructions: "Mini assessment: 8 items from this week. Type your answers first, then check. Items you miss are added to your vocabulary deck as 'difficult'.",
      items: quiz,
    },
    integrated: false,
  };
}

function buildCheckpointDay(day: number): DailyLesson {
  const kind = CHECKPOINT_DAYS[day];
  const week = weekOfDay(day);
  const recent: VocabularyItem[] = [];
  for (let d = day - 1; d >= Math.max(1, day - 29); d--) recent.push(...seedVocab(d));
  const titles: Record<string, string> = {
    day30: "Checkpoint: Day 30",
    day60: "Checkpoint: Day 60",
    final: "Final assessment & your next 90 days",
  };
  return {
    id: `day-${day}`,
    day,
    week,
    phase: phaseOfDay(day),
    type: "X",
    title: titles[kind],
    theme: WEEK_THEMES[week - 1]?.theme ?? "",
    level: levelOfDay(day),
    estimatedMinutes: kind === "final" ? 60 : 45,
    objectives:
      kind === "day30"
        ? ["Check foundation and reading accuracy", "Check basic writing and speaking confidence", "Review consistency"]
        : kind === "day60"
          ? ["Check vocabulary range and writing organisation", "Check speaking duration and integrated skills"]
          : ["Repeat the baseline assessment", "Compare Day 1 and Day 90", "Get your next 90-day recommendation"],
    skills: ["reading", "writing", "speaking", "vocabulary"],
    isReviewDay: false,
    checkpoint: kind,
    vocabulary: [],
    review: {
      instructions: "Warm-up recall from the past month before the checkpoint.",
      items: pickSpread(recent, 6).map(clozeFor),
    },
    integrated: true,
  };
}

let CACHE: DailyLesson[] | null = null;

export function getCurriculum(): DailyLesson[] {
  if (CACHE) return CACHE;
  const lessons: DailyLesson[] = [];
  for (let day = 1; day <= TOTAL_DAYS; day++) {
    const type = dayTypeOf(day);
    if (type === "X") lessons.push(buildCheckpointDay(day));
    else if (type === "G") lessons.push(buildReviewDay(day));
    else {
      const seed = SEED_BY_DAY.get(day);
      if (!seed) throw new Error(`Missing lesson content for day ${day}`);
      lessons.push(buildSeedLesson(seed));
    }
  }
  CACHE = lessons;
  return lessons;
}

export function getLesson(day: number): DailyLesson | undefined {
  return getCurriculum()[day - 1];
}

export function allCurriculumVocab(): VocabularyItem[] {
  return ALL_SEEDS.flatMap((s) => s.vocab.map((v) => parseVocab(s.day, v)));
}

export function authoredDays(): number[] {
  return ALL_SEEDS.map((s) => s.day).sort((a, b) => a - b);
}
