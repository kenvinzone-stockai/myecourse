// Assessment content: baseline (Day 0/1), Day 30, Day 60, final (Day 90).
// Baseline and final share the same structure, levels and productive tasks,
// with different reading/vocabulary items, so results are comparable.

import type { AssessmentKind, Cefr, ReadingQuestion } from "../domain/types";

export type AssessmentPassage = {
  id: string;
  level: Cefr;
  title: string;
  text: string;
  questions: ReadingQuestion[];
};

export type VocabQuestion = {
  id: string;
  level: Cefr;
  sentence: string; // contains ___
  options: string[];
  answer: number;
};

export type AssessmentWritingTask = { id: string; prompt: string; minWords: number; maxWords: number };
export type AssessmentSpeakingTask = { id: string; prompt: string; targetSeconds: number };

export type AssessmentDefinition = {
  kind: AssessmentKind;
  title: string;
  titleVi: string;
  intro: string;
  passages: AssessmentPassage[];
  vocab: VocabQuestion[];
  writing: AssessmentWritingTask[];
  speaking: AssessmentSpeakingTask[];
};

const q = (id: string, type: ReadingQuestion["type"], prompt: string, options: string[], answer: number): ReadingQuestion => ({
  id,
  type,
  prompt,
  options,
  answer,
});

// ── Shared productive tasks (identical in baseline and final for comparison)
const CORE_WRITING: AssessmentWritingTask[] = [
  {
    id: "w-email",
    prompt:
      "Write an email to a colleague in another department. You need some information for a report by Friday. Explain what you need, why you need it, and offer to help if they are busy.",
    minWords: 60,
    maxWords: 110,
  },
  {
    id: "w-opinion",
    prompt:
      "Some people say that technology makes us more productive at work; others say it makes us more distracted. What is your opinion? Give reasons and at least one example from your experience.",
    minWords: 120,
    maxWords: 200,
  },
];

const CORE_SPEAKING: AssessmentSpeakingTask[] = [
  { id: "s-intro", prompt: "Introduce yourself: your job, what you do on a typical day, and why you want to improve your English.", targetSeconds: 60 },
  { id: "s-describe", prompt: "Describe a challenge you faced at work or in your studies. What happened, what did you do, and what did you learn?", targetSeconds: 90 },
  { id: "s-opinion", prompt: "Do you think AI will change your job in the next five years? Explain your opinion with reasons and examples.", targetSeconds: 90 },
];

// ── Baseline passages (Set A)
const BASELINE_PASSAGES: AssessmentPassage[] = [
  {
    id: "a1",
    level: "A2",
    title: "A new office",
    text: `Our company moved to a new office last month. The new building is near the river, and it is bigger than the old one. Every team has its own room, and there is a kitchen on each floor. The only problem is parking. There are not many spaces, so many people now come to work by bus or by bike. My manager says this is good for the environment.`,
    questions: [
      q("a1-1", "detail", "Where is the new office?", ["Near the river", "Near the airport", "In the old building", "Next to a bus station"], 0),
      q("a1-2", "detail", "What is the problem with the new office?", ["It is small", "There is no kitchen", "There is not much parking", "It is far from the river"], 2),
      q("a1-3", "inference", "Why do more people come by bus or bike now?", ["They like exercise", "It is difficult to park", "Buses are free", "The manager told them to"], 1),
    ],
  },
  {
    id: "b1",
    level: "B1",
    title: "Working from home",
    text: `When Minh's company allowed employees to work from home two days a week, he was excited. He imagined saving an hour of travel each day and having more time with his family. After a few months, his experience was more mixed. He did save time, and he finished long reports faster at home because there were fewer interruptions. However, he found it harder to stop working in the evening, and he missed the quick conversations with colleagues that often solved small problems. Now he plans his home days carefully: he does focused work at home and saves meetings and teamwork for the office.`,
    questions: [
      q("b1-1", "main", "What is the main idea of the text?", ["Working from home is always better", "Minh's experience of working from home had advantages and disadvantages", "Minh wants to change his job", "Offices are too noisy"], 1),
      q("b1-2", "detail", "What did Minh find easier at home?", ["Stopping work in the evening", "Finishing long reports", "Talking to colleagues", "Attending meetings"], 1),
      q("b1-3", "inference", "Why does Minh now save teamwork for the office?", ["Because small problems are solved faster when talking face to face", "Because his manager told him", "Because his internet is slow", "Because he doesn't like his family"], 0),
    ],
  },
  {
    id: "b2",
    level: "B2",
    title: "The hidden value of boring tasks",
    text: `Organisations tend to celebrate visible achievements: a new product, a major contract, a successful launch. The routine work that makes these achievements possible — maintaining accurate records, checking contracts, updating procedures — rarely receives the same attention. Yet when this "boring" work is neglected, the consequences can be severe. A missing approval or an outdated safety procedure may go unnoticed for months, until a single incident exposes it. Some companies have started to recognise this by measuring and rewarding preventive work, not just results. The challenge is that success in this area is mostly invisible: when everything works, nobody notices.`,
    questions: [
      q("b2-1", "main", "What is the writer's main point?", ["Routine work is often undervalued even though it is essential", "New products are more important than records", "Safety procedures are always outdated", "Companies should stop celebrating achievements"], 0),
      q("b2-2", "vocab", "In the text, 'neglected' means…", ["not given enough attention", "done too often", "celebrated", "measured accurately"], 0),
      q("b2-3", "inference", "Why is it difficult to reward preventive work?", ["It is too expensive", "When it succeeds, nothing visible happens", "Employees don't want rewards", "It is not measurable by law"], 1),
    ],
  },
  {
    id: "c1",
    level: "C1",
    title: "Metrics and their unintended effects",
    text: `Any measure used to judge performance risks changing the behaviour it was designed to observe. When a call centre evaluates staff on the length of calls, employees may hurry customers off the phone, shortening calls while leaving problems unresolved. This phenomenon, often summarised as "when a measure becomes a target, it ceases to be a good measure", does not imply that organisations should abandon metrics. Rather, it suggests that metrics should be interpreted alongside qualitative judgement, rotated periodically, and combined in ways that make it difficult to improve one figure at the expense of the underlying goal.`,
    questions: [
      q("c1-1", "main", "What does the writer conclude about metrics?", ["They should be abandoned", "They are useful if combined with judgement and designed carefully", "Call centres should not use them", "They always measure behaviour accurately"], 1),
      q("c1-2", "detail", "What is the problem with measuring call length?", ["Calls become longer", "Staff may end calls quickly without solving problems", "Customers stop calling", "It is too expensive"], 1),
      q("c1-3", "vocab", "'At the expense of' is closest in meaning to…", ["by paying for", "while damaging", "in addition to", "in order to support"], 1),
    ],
  },
];

// ── Final passages (Set B) — same levels and question types
const FINAL_PASSAGES: AssessmentPassage[] = [
  {
    id: "fa1",
    level: "A2",
    title: "Lunch at work",
    text: `At my company, most people eat lunch at their desks. Last month, our team started a new habit. Every Wednesday, we eat together in the meeting room. Each person brings one dish to share. At first, some people were too busy to come, but now almost everyone joins. We talk about our families and our weekends, not about work. I think our team is friendlier now.`,
    questions: [
      q("fa1-1", "detail", "When does the team eat together?", ["Every day", "Every Wednesday", "At weekends", "Once a month"], 1),
      q("fa1-2", "detail", "What does each person bring?", ["Money", "A dish to share", "A report", "A gift"], 1),
      q("fa1-3", "inference", "What is the result of the new habit?", ["People work more", "The team is friendlier", "Lunch is more expensive", "Nobody comes"], 1),
    ],
  },
  {
    id: "fb1",
    level: "B1",
    title: "Learning a new system",
    text: `When Hoa's department introduced new accounting software, many people were worried. The old system was slow, but everyone knew how to use it. During the first two weeks, mistakes increased and some reports were late. Hoa decided to write a short guide with screenshots for the most common tasks and shared it with her team. She also organised fifteen-minute sessions every Friday where people could ask questions. By the end of the second month, the team was faster than before, and the manager asked Hoa to share her guide with other departments.`,
    questions: [
      q("fb1-1", "main", "What is the text mainly about?", ["Why the old system was better", "How Hoa helped her team adapt to new software", "Why reports are always late", "How to take screenshots"], 1),
      q("fb1-2", "detail", "What happened in the first two weeks?", ["The team became faster", "Mistakes increased", "Hoa left the company", "The software was removed"], 1),
      q("fb1-3", "inference", "Why did the manager ask Hoa to share her guide?", ["Because her approach worked well", "Because she asked to", "Because other departments had no software", "Because the guide was long"], 0),
    ],
  },
  {
    id: "fb2",
    level: "B2",
    title: "Why some meetings never end",
    text: `Recurring meetings are created for good reasons: a project starts, a problem needs regular attention, or a new team needs coordination. The difficulty is that they are rarely cancelled when those reasons disappear. Over time, a weekly meeting that once solved urgent problems becomes a habit, attended out of obligation rather than need. Because no single meeting seems very costly, nobody questions the total. Some organisations now review every recurring meeting each quarter, asking a simple question: if this meeting did not exist, would we create it today? Surprisingly often, the answer is no.`,
    questions: [
      q("fb2-1", "main", "What is the main problem described?", ["Meetings start too late", "Recurring meetings continue after they stop being useful", "Teams have no meetings", "Projects are too short"], 1),
      q("fb2-2", "vocab", "'Out of obligation' means…", ["because people feel they must", "because it is enjoyable", "because it is urgent", "because it is cheap"], 0),
      q("fb2-3", "inference", "Why does nobody question the total cost?", ["Each meeting seems small in cost", "Meetings are free", "Managers forbid it", "The total is published"], 0),
    ],
  },
  {
    id: "fc1",
    level: "C1",
    title: "The limits of best practice",
    text: `Organisations frequently import "best practices" from successful competitors, assuming that what worked elsewhere will work for them. The evidence for this assumption is weaker than its popularity suggests. Practices emerge within particular contexts — a specific culture, market, set of skills and history — and their effectiveness often depends on conditions that are invisible to outsiders. Copying the visible procedure without the underlying conditions can therefore produce disappointing results. A more defensible approach is to treat external practices as hypotheses to be tested locally, adapting them deliberately rather than adopting them wholesale.`,
    questions: [
      q("fc1-1", "main", "What is the writer's position?", ["Best practices always work", "External practices should be tested and adapted, not copied blindly", "Organisations should never learn from competitors", "Culture doesn't matter"], 1),
      q("fc1-2", "detail", "Why can copying a practice fail?", ["It depends on conditions that are not visible to outsiders", "Competitors hide procedures", "It is illegal", "It is always too expensive"], 0),
      q("fc1-3", "vocab", "'Adopting them wholesale' means…", ["buying them cheaply", "taking them completely without change", "selling them", "testing them locally"], 1),
    ],
  },
];

const BASELINE_VOCAB: VocabQuestion[] = [
  { id: "v1", level: "A2", sentence: "Could you ___ me the report by email, please?", options: ["send", "say", "speak", "tell"], answer: 0 },
  { id: "v2", level: "A2", sentence: "I usually ___ work at 5:30 p.m.", options: ["finish", "end up", "close", "stop up"], answer: 0 },
  { id: "v3", level: "B1", sentence: "We need to ___ a decision before the end of the week.", options: ["do", "make", "take up", "have"], answer: 1 },
  { id: "v4", level: "B1", sentence: "The meeting was ___ until next Monday.", options: ["postponed", "prevented", "promoted", "provided"], answer: 0 },
  { id: "v5", level: "B1", sentence: "I'm ___ for checking all the invoices.", options: ["responsible", "possible", "reliable", "available"], answer: 0 },
  { id: "v6", level: "B2", sentence: "Costs rose ___ in the third quarter, by almost 30%.", options: ["slightly", "significantly", "hardly", "nearly"], answer: 1 },
  { id: "v7", level: "B2", sentence: "We need to ___ the risks before we sign the contract.", options: ["assess", "access", "assist", "assume"], answer: 0 },
  { id: "v8", level: "B2", sentence: "The new policy had an unexpected ___ on staff morale.", options: ["affect", "impact", "influence on", "result to"], answer: 1 },
  { id: "v9", level: "C1", sentence: "The evidence is ___ — it could support either conclusion.", options: ["ambiguous", "ambitious", "anonymous", "abundant"], answer: 0 },
  { id: "v10", level: "C1", sentence: "Higher sales partly ___ the increase in fuel costs.", options: ["offset", "overcame", "outran", "outlined"], answer: 0 },
];

const FINAL_VOCAB: VocabQuestion[] = [
  { id: "fv1", level: "A2", sentence: "Can you ___ me with this box? It's heavy.", options: ["help", "support to", "assist to", "carry"], answer: 0 },
  { id: "fv2", level: "A2", sentence: "I ___ my emails every morning.", options: ["check", "look", "see at", "watch"], answer: 0 },
  { id: "fv3", level: "B1", sentence: "Please ___ the form and return it by Friday.", options: ["fill in", "fill up", "fill on", "fill at"], answer: 0 },
  { id: "fv4", level: "B1", sentence: "We have to ___ the deadline — the client is waiting.", options: ["meet", "touch", "reach out", "arrive"], answer: 0 },
  { id: "fv5", level: "B1", sentence: "She ___ the job offer because the salary was too low.", options: ["turned down", "turned up", "turned off", "turned over"], answer: 0 },
  { id: "fv6", level: "B2", sentence: "The variance was ___ due to a one-off repair.", options: ["mainly", "mostly of", "mainly of", "majorly by"], answer: 0 },
  { id: "fv7", level: "B2", sentence: "Let's ___ the main points before we finish.", options: ["sum up", "add up", "take up", "make up"], answer: 0 },
  { id: "fv8", level: "B2", sentence: "We should ___ this risk by adding a buffer.", options: ["mitigate", "migrate", "motivate", "mediate"], answer: 0 },
  { id: "fv9", level: "C1", sentence: "His argument was ___, but it rested on a weak assumption.", options: ["compelling", "compulsive", "competing", "complying"], answer: 0 },
  { id: "fv10", level: "C1", sentence: "The benefits were only ___ years after the investment.", options: ["realised", "recognised for", "released", "reached at"], answer: 0 },
];

export const ASSESSMENTS: Record<AssessmentKind, AssessmentDefinition> = {
  baseline: {
    kind: "baseline",
    title: "Baseline assessment",
    titleVi: "Đánh giá đầu vào",
    intro:
      "This short assessment (about 35–45 minutes) estimates your starting level in Reading, Writing, Speaking and Vocabulary. It is not an exam — answer honestly so the 90-day plan fits you.",
    passages: BASELINE_PASSAGES,
    vocab: BASELINE_VOCAB,
    writing: CORE_WRITING,
    speaking: CORE_SPEAKING,
  },
  day30: {
    kind: "day30",
    title: "Day 30 checkpoint",
    titleVi: "Kiểm tra mốc Ngày 30",
    intro:
      "Checkpoint 1: foundation, reading accuracy, basic writing and speaking confidence. About 25–30 minutes.",
    passages: [BASELINE_PASSAGES[1], FINAL_PASSAGES[2]].map((p) => ({ ...p, id: `d30-${p.id}`, questions: p.questions.map((x) => ({ ...x, id: `d30-${x.id}` })) })),
    vocab: [...BASELINE_VOCAB.slice(2, 6), ...FINAL_VOCAB.slice(2, 6)].map((v) => ({ ...v, id: `d30-${v.id}` })),
    writing: [
      {
        id: "w-d30",
        prompt:
          "Write a short email to your manager summarising your first month of English study: what you have done, what has improved, what is still difficult, and your plan for the next month.",
        minWords: 90,
        maxWords: 150,
      },
    ],
    speaking: [
      { id: "s-d30-a", prompt: "Explain one useful idea you learned in the first month (e.g. the two-minute rule, polite requests, a good meeting) as if to a colleague.", targetSeconds: 90 },
      { id: "s-d30-b", prompt: "Describe your typical study day now, compared with Day 1. What has changed?", targetSeconds: 75 },
    ],
  },
  day60: {
    kind: "day60",
    title: "Day 60 checkpoint",
    titleVi: "Kiểm tra mốc Ngày 60",
    intro:
      "Checkpoint 2: higher complexity, vocabulary range, writing organisation, longer speaking and integrated skills. About 30–35 minutes.",
    passages: [BASELINE_PASSAGES[2], FINAL_PASSAGES[3]].map((p) => ({ ...p, id: `d60-${p.id}`, questions: p.questions.map((x) => ({ ...x, id: `d60-${x.id}` })) })),
    vocab: [...BASELINE_VOCAB.slice(5), ...FINAL_VOCAB.slice(5)].map((v) => ({ ...v, id: `d60-${v.id}` })),
    writing: [
      {
        id: "w-d60",
        prompt:
          "Read the passage 'The limits of best practice' again. Write a 150–200 word summary-response: summarise the argument, then explain whether it applies to an idea your company copied from somewhere else.",
        minWords: 150,
        maxWords: 210,
      },
    ],
    speaking: [
      { id: "s-d60-a", prompt: "Summarise 'Why some meetings never end' or 'The hidden value of boring tasks' without looking, then give your opinion.", targetSeconds: 120 },
      { id: "s-d60-b", prompt: "Give a 2-minute mini-presentation: 'One change that would make my workplace more effective'. Use an opening, two points and a conclusion.", targetSeconds: 120 },
    ],
  },
  final: {
    kind: "final",
    title: "Final assessment — Day 90",
    titleVi: "Đánh giá cuối khóa — Ngày 90",
    intro:
      "The final assessment mirrors the baseline: same levels and the same writing and speaking tasks, with new reading and vocabulary items, so you can compare Day 1 and Day 90 directly.",
    passages: FINAL_PASSAGES,
    vocab: FINAL_VOCAB,
    writing: CORE_WRITING,
    speaking: CORE_SPEAKING,
  },
};

export const ASSESSMENT_DAY: Record<AssessmentKind, number> = { baseline: 0, day30: 30, day60: 60, final: 90 };
