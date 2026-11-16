// Gradual adaptation of task demands, plus targeted remediation modules.
// Content progression stays fixed; what adapts is the load and scaffolding.

import type { Difficulty, Skill, WeaknessTag } from "../domain/types";

export type Band = "support" | "core" | "stretch";

export function bandFor(score: number | undefined): Band {
  if (score === undefined) return "core";
  if (score < 60) return "support";
  if (score < 80) return "core";
  return "stretch";
}

export const BAND_INFO: Record<Band, { en: string; vi: string; description: string }> = {
  support: { en: "Support", vi: "Hỗ trợ", description: "Below 60 — slightly lighter tasks, more examples, extra review." },
  core: { en: "On target", vi: "Đúng mức", description: "60–79 — appropriate challenge; keep practising." },
  stretch: { en: "Stretch", vi: "Nâng cao", description: "80+ — longer tasks, less scaffolding, extension challenges." },
};

const DIFFICULTY_FACTOR: Record<Difficulty, number> = { gentle: 0.85, standard: 1, challenging: 1.15 };
const BAND_FACTOR: Record<Band, number> = { support: 0.85, core: 1, stretch: 1.2 };

function round5(n: number) {
  return Math.max(5, Math.round(n / 5) * 5);
}

export type WritingAdaptation = { minWords: number; maxWords: number; band: Band; notes: string[] };
export type SpeakingAdaptation = { targetSeconds: number; band: Band; notes: string[] };
export type ReadingAdaptation = { band: Band; showGlossesFirst: boolean; notes: string[] };

export function adaptWriting(min: number, max: number, score: number | undefined, difficulty: Difficulty): WritingAdaptation {
  const band = bandFor(score);
  const f = BAND_FACTOR[band] * DIFFICULTY_FACTOR[difficulty];
  const notes: string[] = [];
  if (band === "support") notes.push("Lighter target today. Use the model text as a template and focus on complete, correct sentences.");
  if (band === "stretch") notes.push("Stretch: add one complex sentence (although / which / given that) and avoid repeating any content word.");
  return { minWords: round5(min * f), maxWords: round5(max * f), band, notes };
}

export function adaptSpeaking(target: number, score: number | undefined, difficulty: Difficulty): SpeakingAdaptation {
  const band = bandFor(score);
  const f = BAND_FACTOR[band] * DIFFICULTY_FACTOR[difficulty];
  const notes: string[] = [];
  if (band === "support") notes.push("Prepare 3–5 keywords first. It's fine to pause — keep going rather than restarting.");
  if (band === "stretch") notes.push("Stretch: no notes at all, and add a second example or a counter-argument.");
  return { targetSeconds: Math.max(30, Math.round((target * f) / 15) * 15), band, notes };
}

export function adaptReading(score: number | undefined): ReadingAdaptation {
  const band = bandFor(score);
  const notes: string[] = [];
  if (band === "support") notes.push("Read the vocabulary first, then read the text twice: once for the main idea, once for details.");
  if (band === "core") notes.push("Read once for the main idea, then answer the questions and reread only the parts you need.");
  if (band === "stretch") notes.push("Stretch: read without the word list first, then write one inference question of your own.");
  return { band, showGlossesFirst: band === "support", notes };
}

// ── Remediation library ────────────────────────────────────────────────────

export type RemediationModule = {
  tag: WeaknessTag;
  skill: Skill;
  title: string;
  why: string;
  whyVi: string;
  steps: string[];
  minutes: number;
};

export const REMEDIATION: Record<WeaknessTag, RemediationModule> = {
  "reading-inference": {
    tag: "reading-inference",
    skill: "reading",
    title: "Reading between the lines",
    why: "Inference questions ask what the writer suggests but does not state directly.",
    whyVi: "Câu hỏi suy luận hỏi điều tác giả ngụ ý chứ không nói thẳng. Hãy tìm bằng chứng trong câu chữ.",
    steps: [
      "Reread yesterday's passage. For each paragraph, write: 'The writer says… so this suggests…'.",
      "Underline words that show attitude (surprisingly, unfortunately, yet, however). What do they reveal?",
      "For each inference answer you choose, point to the exact sentence that supports it. If you can't, reconsider.",
      "Write two inference questions of your own about the passage and answer them.",
    ],
    minutes: 15,
  },
  "reading-detail": {
    tag: "reading-detail",
    skill: "reading",
    title: "Finding exact details",
    why: "Detail questions often paraphrase the text, so the words in the question differ from the passage.",
    whyVi: "Câu hỏi chi tiết thường diễn đạt lại (paraphrase) — đừng chỉ tìm từ giống hệt.",
    steps: [
      "Take three detail questions you missed. Find the sentence with the answer and copy it.",
      "Compare the question wording with the text: which words were paraphrased?",
      "Scan practice: in your next passage, find all numbers, names and dates in under 60 seconds.",
      "Always eliminate options that are true in real life but not stated in the text.",
    ],
    minutes: 15,
  },
  "reading-main": {
    tag: "reading-main",
    skill: "reading",
    title: "Seeing the big picture",
    why: "Main-idea and purpose questions need the whole text, not one sentence.",
    whyVi: "Ý chính cần nhìn toàn bài: đoạn đầu, câu chủ đề mỗi đoạn và đoạn kết.",
    steps: [
      "Read only the first sentence of each paragraph and the last paragraph. Write the main idea in one sentence.",
      "Check: does your sentence cover ALL paragraphs? If it only covers one, it's a detail.",
      "Ask: why did the writer write this — to explain, persuade, compare, warn?",
      "Practise on two earlier passages from the roadmap.",
    ],
    minutes: 15,
  },
  "reading-vocab": {
    tag: "reading-vocab",
    skill: "reading",
    title: "Guessing meaning from context",
    why: "Many words can be understood from the sentence around them without a dictionary.",
    whyVi: "Đoán nghĩa từ ngữ cảnh: từ loại, từ xung quanh, ví dụ hoặc tương phản trong câu.",
    steps: [
      "For each unknown word: identify its word class (noun, verb, adjective).",
      "Look for clues nearby: an example, a contrast (but, however), or a definition after a comma.",
      "Replace the word with your guess. Does the sentence still make sense?",
      "Only then check the meaning, and add the word to your vocabulary deck with the original sentence.",
    ],
    minutes: 12,
  },
  "writing-grammar": {
    tag: "writing-grammar",
    skill: "writing",
    title: "Grammar accuracy clinic",
    why: "A few repeated errors (tenses, articles, plurals) affect most of your sentences.",
    whyVi: "Một vài lỗi lặp lại (thì, mạo từ a/an/the, số nhiều -s) ảnh hưởng tới nhiều câu. Sửa có hệ thống.",
    steps: [
      "Reread your last three texts. List every grammar mistake you can find (or that feedback found).",
      "Group them: verb tense / -s endings / articles / prepositions / word order. Which group is biggest?",
      "Rewrite five sentences from that group correctly.",
      "Proofreading routine for next texts: check verbs first, then nouns (-s, a/the), then prepositions.",
    ],
    minutes: 15,
  },
  "writing-organization": {
    tag: "writing-organization",
    skill: "writing",
    title: "Organising your ideas",
    why: "Clear writing follows a predictable shape: main point → support → close.",
    whyVi: "Viết rõ ràng theo khung: ý chính → lý do/ví dụ → kết luận. Lập dàn ý 2 phút trước khi viết.",
    steps: [
      "Before writing, spend 2 minutes on an outline: main point, 2 supports, 1 conclusion.",
      "Rewrite your last text: put the main point in the first sentence.",
      "Add linking words between ideas: first, also, however, for example, as a result.",
      "Check: can a reader understand your point from the first and last sentence only?",
    ],
    minutes: 15,
  },
  "writing-vocabulary": {
    tag: "writing-vocabulary",
    skill: "writing",
    title: "Expanding your writing vocabulary",
    why: "Repeating basic words (good, big, very, make) makes writing less precise.",
    whyVi: "Lặp lại từ cơ bản (good, big, very…) làm bài viết kém chính xác. Dùng collocation đã học.",
    steps: [
      "Find the three words you repeat most in your recent writing.",
      "For each, write two more precise alternatives (very important → crucial, essential).",
      "Choose five collocations from your vocabulary deck and write one work-related sentence for each.",
      "Rewrite one earlier text using at least four of them.",
    ],
    minutes: 15,
  },
  "writing-clarity": {
    tag: "writing-clarity",
    skill: "writing",
    title: "Writing clearly and simply",
    why: "Long, translated sentences often hide the main message.",
    whyVi: "Câu dài dịch từ tiếng Việt thường che mất ý chính. Một câu – một ý.",
    steps: [
      "Take your longest sentence and split it into two or three shorter ones.",
      "One sentence = one idea. Put the subject and verb near the start.",
      "Replace vague words (things, stuff, issue) with specific ones.",
      "Read your text aloud: wherever you run out of breath, the sentence is too long.",
    ],
    minutes: 12,
  },
  "speaking-fluency": {
    tag: "speaking-fluency",
    skill: "speaking",
    title: "Fluency builder: keep talking",
    why: "Fluency grows when you practise speaking continuously, even with mistakes.",
    whyVi: "Độ trôi chảy tăng khi bạn nói liên tục, chấp nhận lỗi. Đừng dừng lại để dịch.",
    steps: [
      "4-3-2 technique: speak about one topic for 4 minutes, then the same topic for 3, then 2 minutes.",
      "Never stop to correct yourself — use a filler pause ('let me think') and continue.",
      "Use simple linkers to buy time: 'and another thing is…', 'what I mean is…'.",
      "Record the 2-minute version and compare it with the first: more words, fewer pauses?",
    ],
    minutes: 15,
  },
  "speaking-pronunciation": {
    tag: "speaking-pronunciation",
    skill: "speaking",
    title: "Pronunciation tune-up",
    why: "Final consonants, word stress and -ed endings cause most misunderstandings.",
    whyVi: "Âm cuối, trọng âm từ và đuôi -ed là các lỗi gây hiểu lầm nhiều nhất cho người Việt.",
    steps: [
      "Shadow a short script in the Speaking workspace three times, copying stress and rhythm.",
      "Practise final consonants slowly: checks, reports, approved, asked.",
      "Mark the stressed syllable in ten work words you use daily, then say them in sentences.",
      "Record and listen: write down two sounds to fix next time.",
    ],
    minutes: 15,
  },
  "speaking-coherence": {
    tag: "speaking-coherence",
    skill: "speaking",
    title: "Structuring what you say",
    why: "Listeners follow you more easily when your answer has a clear shape.",
    whyVi: "Câu trả lời có cấu trúc (PREP: Ý – Lý do – Ví dụ – Ý) giúp người nghe dễ theo dõi.",
    steps: [
      "Learn PREP: Point – Reason – Example – Point.",
      "Answer three questions using PREP, with 10 seconds of planning each.",
      "Add signposts: 'The main reason is…', 'For example…', 'So overall…'.",
      "Record one answer and check: can a listener repeat your point in one sentence?",
    ],
    minutes: 15,
  },
  "vocab-retention": {
    tag: "vocab-retention",
    skill: "vocabulary",
    title: "Making words stick",
    why: "Words are remembered when you use them actively, not when you only recognise them.",
    whyVi: "Từ được nhớ lâu khi bạn chủ động dùng chúng — tự đặt câu về công việc của mình.",
    steps: [
      "Open Vocabulary → Difficult. For each word, write a personal sentence about your work or life.",
      "Say each sentence aloud twice without looking.",
      "Use three of these words in today's writing or speaking task.",
      "Review again tomorrow — the system will schedule it automatically.",
    ],
    minutes: 12,
  },
};
