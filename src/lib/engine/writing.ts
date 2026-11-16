// Objective, explainable checks on a piece of writing. These are signals,
// not grades: they support the learner's self-review when no AI is configured.

export const WRITING_RUBRIC = [
  { id: "task", label: "Task completion", labelVi: "Hoàn thành yêu cầu", hint: "Did I answer every part of the prompt?" },
  { id: "clarity", label: "Clarity", labelVi: "Rõ ràng", hint: "Is the main idea easy to find?" },
  { id: "organization", label: "Organisation", labelVi: "Bố cục", hint: "Logical order, linking words, paragraphing." },
  { id: "grammar", label: "Grammar", labelVi: "Ngữ pháp", hint: "Verb tenses, articles, agreement, plurals." },
  { id: "vocabulary", label: "Vocabulary", labelVi: "Từ vựng", hint: "Precise words, today's vocabulary, little repetition." },
  { id: "structure", label: "Sentence structure", labelVi: "Cấu trúc câu", hint: "Complete sentences, some variety in length." },
  { id: "naturalness", label: "Naturalness", labelVi: "Tự nhiên", hint: "Sounds like English, not translated word-for-word." },
] as const;

export const WRITING_CHECKLIST = [
  "Did I answer the prompt?",
  "Is my main idea clear?",
  "Are my sentences complete?",
  "Did I use today's vocabulary?",
  "Did I avoid repeating the same words too much?",
  "Are verb tenses consistent?",
  "Can any sentence be simpler and clearer?",
];

const STOP = new Set(
  "a an the and or but so to of in on at for with by from is are was were be been am i you he she it we they my your our their this that these those as if not do does did have has had will would can could should there here then than also very just about into over after before because which who what when where how all any some more most".split(
    " ",
  ),
);

export type WritingAnalysis = {
  words: number;
  sentences: number;
  avgSentenceLength: number;
  longestSentence: number;
  uniqueRatio: number; // lexical variety (content words)
  repeated: { word: string; count: number }[];
  vocabUsed: string[];
  vocabMissing: string[];
  linkers: string[];
  signals: { id: string; ok: boolean; message: string }[];
  autoScore: number; // 0..100, objective component only
};

const LINKERS = [
  "however",
  "therefore",
  "although",
  "even though",
  "because",
  "as a result",
  "for example",
  "for instance",
  "in addition",
  "moreover",
  "on the other hand",
  "first",
  "finally",
  "nevertheless",
  "whereas",
  "consequently",
  "in conclusion",
  "overall",
  "despite",
  "while",
];

export function countWords(text: string): number {
  return (text.match(/[A-Za-zÀ-ỹ0-9'’-]+/g) ?? []).length;
}

function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+|\n+/)
    .map((s) => s.trim())
    .filter((s) => countWords(s) > 0);
}

function termUsed(text: string, term: string): boolean {
  const core = term
    .toLowerCase()
    .split("/")[0]
    .replace(/\(.*?\)/g, "")
    .trim();
  if (!core) return false;
  const words = core.split(/\s+/).filter((w) => !STOP.has(w));
  const lower = text.toLowerCase();
  if (lower.includes(core)) return true;
  // allow inflection of the main content word(s): "approve" → "approved"
  return words.length > 0 && words.every((w) => new RegExp(`\\b${w.slice(0, Math.max(4, w.length - 2))}`, "i").test(lower));
}

export function analyseWriting(text: string, opts: { minWords: number; maxWords: number; vocab?: string[] }): WritingAnalysis {
  const words = countWords(text);
  const sentences = splitSentences(text);
  const lens = sentences.map(countWords);
  const avg = lens.length ? lens.reduce((a, b) => a + b, 0) / lens.length : 0;
  const content = (text.toLowerCase().match(/[a-z'’-]+/g) ?? []).filter((w) => w.length > 2 && !STOP.has(w));
  const freq = new Map<string, number>();
  content.forEach((w) => freq.set(w, (freq.get(w) ?? 0) + 1));
  const uniqueRatio = content.length ? freq.size / content.length : 0;
  const repeated = [...freq.entries()]
    .filter(([, c]) => c >= 3 && c / Math.max(1, content.length) > 0.04)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word, count]) => ({ word, count }));
  const vocab = opts.vocab ?? [];
  const vocabUsed = vocab.filter((t) => termUsed(text, t));
  const vocabMissing = vocab.filter((t) => !vocabUsed.includes(t));
  const lower = ` ${text.toLowerCase()} `;
  const linkers = LINKERS.filter((l) => new RegExp(`\\b${l}\\b`).test(lower));

  const signals: WritingAnalysis["signals"] = [];
  const inRange = words >= opts.minWords && words <= Math.round(opts.maxWords * 1.15);
  signals.push({
    id: "length",
    ok: inRange,
    message: inRange
      ? `Length OK (${words} words, target ${opts.minWords}–${opts.maxWords}).`
      : words < opts.minWords
        ? `Too short: ${words} words (target ${opts.minWords}–${opts.maxWords}). Add an example or a reason.`
        : `Longer than needed: ${words} words. Can you cut repetition?`,
  });
  const longOnes = lens.filter((l) => l > 35).length;
  signals.push({
    id: "sentences",
    ok: longOnes === 0 && (sentences.length < 3 || avg <= 25),
    message:
      longOnes > 0
        ? `${longOnes} very long sentence(s) (35+ words). Split them for clarity.`
        : `Average sentence length ${avg.toFixed(1)} words.`,
  });
  signals.push({
    id: "variety",
    ok: uniqueRatio >= 0.55 || content.length < 20,
    message: repeated.length ? `Repeated often: ${repeated.map((r) => `${r.word} (${r.count})`).join(", ")}. Try a synonym.` : "Good word variety.",
  });
  if (vocab.length) {
    signals.push({
      id: "vocab",
      ok: vocabUsed.length >= Math.min(3, vocab.length),
      message: `Used ${vocabUsed.length}/${vocab.length} of today's words${vocabUsed.length ? `: ${vocabUsed.join(", ")}` : ""}.`,
    });
  }
  signals.push({
    id: "linking",
    ok: linkers.length >= (words > 80 ? 2 : 1),
    message: linkers.length ? `Linking words: ${linkers.join(", ")}.` : "No linking words found — add 'because', 'however', 'for example'…",
  });
  const lowerI = (text.match(/(^|[\s(])i(?=[\s,.'’])/g) ?? []).length;
  if (lowerI > 0) signals.push({ id: "capital-i", ok: false, message: `Write "I" as a capital letter (${lowerI}×).` });
  const noCapital = sentences.filter((s) => /^[a-z]/.test(s)).length;
  if (noCapital > 0) signals.push({ id: "capitals", ok: false, message: `${noCapital} sentence(s) start with a lowercase letter.` });

  const okCount = signals.filter((s) => s.ok).length;
  const autoScore = words === 0 ? 0 : Math.round((okCount / signals.length) * 100);

  return {
    words,
    sentences: sentences.length,
    avgSentenceLength: Math.round(avg * 10) / 10,
    longestSentence: lens.length ? Math.max(...lens) : 0,
    uniqueRatio: Math.round(uniqueRatio * 100) / 100,
    repeated,
    vocabUsed,
    vocabMissing,
    linkers,
    signals,
    autoScore,
  };
}
