import type { DaySeed } from "../seed";

// Phase 1 — Rebuild the Foundation (Days 1–21). Original material.

export const PHASE1: DaySeed[] = [
  // ───────────────────────── Week 1 · Fresh start: habits & routines
  {
    day: 1,
    title: "Small habits, big results",
    objective: "Read a short article about habits and talk about your own routine.",
    vocab: [
      "habit | something you do regularly, often without thinking | thói quen | Checking email first thing is a habit for many people. | break a habit / form a habit",
      "routine | the usual order in which you do things | lịch sinh hoạt cố định | My morning routine takes about forty minutes. | daily routine",
      "consistent | always behaving or happening in the same way | đều đặn, nhất quán | Consistent practice matters more than long sessions. | stay consistent",
      "set aside | to keep time or money for a particular purpose | dành ra | I set aside twenty minutes for English after lunch. | set aside time",
      "make progress | to improve or move forward | tiến bộ | You will make progress if you practise a little every day. | make steady progress",
      "commitment | a promise to do something | cam kết | Ninety days is a real commitment. | make a commitment",
    ],
    reading: {
      title: "Small habits, big results",
      text: `Most people who want to improve a skill start with a big plan. They promise to study for two hours every evening, and for a few days they do. Then work gets busy, a child gets sick, or they simply feel tired, and the plan disappears.

People who make real progress usually do something different. They build a small habit and protect it. Instead of two hours, they set aside twenty minutes at the same time every day. The time is short, so it is easy to keep the commitment even on a bad day.

The secret is not the length of each session. It is the number of sessions. Twenty minutes a day for ninety days is thirty hours of practice. More importantly, the learner becomes a person who studies every day. That identity makes the next session easier.

A good routine also removes decisions. If you know exactly what to do when you sit down, you do not waste energy choosing. You just start. Over time, being consistent becomes automatic, and small daily steps turn into results you can see.`,
      q: [
        ["main", "What is the main idea of the article?", ["Long study sessions are the best way to learn", "Small, protected daily habits lead to real progress", "Busy people cannot learn new skills", "Learners should change their routine often"], 1],
        ["detail", "How much practice is twenty minutes a day for ninety days?", ["Twenty hours", "Ninety hours", "Thirty hours", "Two hours"], 2],
        ["inference", "Why does the writer say a short session is easier to keep?", ["Because it can be done even on a difficult day", "Because short sessions are more fun", "Because teachers prefer them", "Because long sessions are not allowed"], 0],
        ["vocab", "In the text, \"removes decisions\" means a routine…", ["makes you decide more carefully", "means you don't have to choose what to do", "forces you to stop studying", "changes your goals"], 1],
      ],
      summary: "In one or two sentences, explain why small habits work better than big plans.",
    },
    writing: {
      type: "sentences",
      prompt: "Write 5–6 sentences about your current daily routine. When do you start work? When could you set aside time for English? Use at least three of today's words.",
      min: 50,
      max: 100,
      tips: ["Use the present simple for routines: I start work at 7:30.", "Add time expressions: usually, after lunch, before bed."],
    },
    speaking: {
      type: "answer",
      prompt: "Describe your typical weekday from morning to evening. Then say when you will practise English during these 90 days and why that time works for you.",
      sec: 60,
    },
  },
  {
    day: 2,
    title: "Introducing yourself at work",
    objective: "Use the present simple and present continuous correctly to describe your job and current projects.",
    vocab: [
      "be responsible for | to have the duty of dealing with something | chịu trách nhiệm | I'm responsible for monthly financial reports. | be fully responsible for",
      "currently | at the present time | hiện tại | We are currently reviewing our budget. | currently working on",
      "deal with | to take action to solve a problem or handle a task | xử lý | She deals with supplier invoices. | deal with requests",
      "department | a section of a large organisation | phòng ban | Our department has twelve people. | finance department",
      "work closely with | to cooperate often and directly | phối hợp chặt chẽ | I work closely with the project team. | work closely together",
      "be based in | to live or work mainly in a place | làm việc tại | The company is based in Vung Tau. | be based in the head office",
    ],
    grammar: {
      p: "Present simple vs present continuous",
      e: "Use the present simple for facts, routines and permanent situations (I work in finance). Use the present continuous for actions happening now or temporary projects (This month I'm preparing the annual budget).",
      vi: "Hiện tại đơn: sự thật, thói quen, công việc ổn định. Hiện tại tiếp diễn: việc đang diễn ra hoặc dự án tạm thời trong giai đoạn này.",
      ex: ["I usually check the bank statements on Monday mornings.", "At the moment, I'm learning to use a new reporting tool.", "We don't usually work late, but this week we're closing the quarter."],
    },
    reading: {
      title: "Model text: a short professional introduction",
      text: `Hi everyone, I'm Lan. I work in the finance department, and I'm responsible for supplier payments and monthly reports. I'm based in our Ho Chi Minh City office, but I work closely with the site teams in Vung Tau. I usually deal with invoices in the morning and spend the afternoon on reports. This quarter, I'm also helping the IT team test a new accounting system, so I'm learning a lot about automation. Outside work, I'm currently improving my English because I want to present our results more confidently.`,
      q: [
        ["detail", "What is Lan doing this quarter that is temporary?", ["Paying suppliers", "Testing a new accounting system", "Working in Ho Chi Minh City", "Writing monthly reports"], 1],
        ["detail", "Which sentence describes a routine?", ["I'm learning a lot about automation.", "I usually deal with invoices in the morning.", "I'm currently improving my English.", "I'm also helping the IT team."], 1],
        ["purpose", "What is the purpose of this text?", ["To complain about work", "To introduce herself to colleagues", "To ask for a new job", "To explain accounting rules"], 1],
      ],
    },
    writing: {
      type: "paragraph",
      prompt: "Write a short professional introduction (like the model) for a new international colleague. Include: your role, what you are responsible for, who you work with, one routine task, and one thing you are currently working on.",
      min: 70,
      max: 120,
      tips: ["Mix both tenses on purpose: one routine + one current project.", "Avoid translating word-for-word from Vietnamese — keep sentences short."],
    },
    speaking: {
      type: "presentation",
      prompt: "Introduce yourself as if you are joining a video meeting with a new foreign partner. Do not read your paragraph — use only keywords.",
      sec: 60,
    },
  },
  {
    day: 3,
    title: "Why adults learn differently",
    objective: "Understand an article about adult learning and explain your own reasons for learning English.",
    vocab: [
      "motivation | the reason or desire to do something | động lực | My motivation is to communicate with clients directly. | lose motivation / keep motivation",
      "advantage | something that helps you succeed | lợi thế | Adults have the advantage of experience. | have an advantage over",
      "relevant | connected to what is happening or being discussed | liên quan, phù hợp | Choose material that is relevant to your job. | highly relevant",
      "make mistakes | to do or say something wrong | mắc lỗi | Everyone makes mistakes when they speak a new language. | afraid of making mistakes",
      "in context | as part of a real situation, not alone | trong ngữ cảnh | Learn new words in context, not from lists. | use words in context",
      "fluent | able to speak easily and smoothly | trôi chảy | She became fluent after living abroad. | fluent in English",
    ],
    reading: {
      title: "Why adults learn languages differently",
      text: `Many adults believe that children learn languages more easily. In some ways, this is true. Young children copy sounds naturally and are rarely afraid of making mistakes. However, adults have important advantages that children do not have.

First, adults understand how language works. They can notice patterns, compare English with their first language, and use grammar rules to check their sentences. Second, adults usually have clear motivation. They want a better job, need to read reports, or want to talk with partners without an interpreter. A clear reason helps them keep going when learning becomes difficult.

Third, adults have experience and knowledge. An accountant who already understands budgets can read about budgets in English and guess many new words from context. Material that is relevant to your life is easier to remember because your brain connects it to something you already know.

The biggest problem for adults is often fear. They worry about sounding silly, so they stay quiet. But nobody becomes fluent without speaking imperfectly first. The adults who improve fastest accept mistakes as a normal part of the process.`,
      q: [
        ["main", "What is the main point of the article?", ["Children are always better language learners", "Adults have real advantages but often struggle with fear", "Grammar is not important for adults", "Adults should learn English like children"], 1],
        ["detail", "Which is NOT mentioned as an adult advantage?", ["Understanding how language works", "Clear motivation", "Better pronunciation than children", "Experience and knowledge"], 2],
        ["inference", "Why does the writer mention an accountant?", ["To show that relevant knowledge helps learners guess meaning", "To say accountants are good at English", "To explain how budgets work", "To describe the writer's job"], 0],
        ["vocab", "\"Speaking imperfectly\" is closest in meaning to…", ["speaking very fast", "speaking with some mistakes", "speaking only in meetings", "speaking with an interpreter"], 1],
      ],
      summary: "Write one sentence about the biggest problem for adult learners, according to the text.",
    },
    writing: {
      type: "paragraph",
      prompt: "Why are you learning English now? Write a paragraph explaining your main motivation, one advantage you have as an adult learner, and one fear you want to overcome.",
      min: 70,
      max: 120,
      tips: ["Use 'First…', 'Also…', 'However…' to organise your ideas."],
    },
    speaking: {
      type: "explain",
      prompt: "Explain to a friend why you are learning English and what you want to be able to do in 90 days. Give at least two concrete examples (e.g. a meeting, a report, a trip).",
      sec: 90,
    },
  },
  {
    day: 4,
    title: "Describing a workday clearly",
    objective: "Practise clear sentences about your work and pronounce final consonants.",
    vocab: [
      "check | to look at something to make sure it is correct | kiểm tra | I check the figures before I send the report. | double-check",
      "submit | to give a document to someone for a decision | nộp | Please submit your expense claims by Friday. | submit a report",
      "deadline | the time by which something must be done | hạn chót | The deadline for the tax report is the 20th. | meet a deadline / miss a deadline",
      "approve | to officially accept something | phê duyệt | My manager approves all payments over 50 million. | approve a request",
      "follow up | to contact someone again to continue something | theo dõi, nhắc lại | I'll follow up with the supplier tomorrow. | follow up on an email",
      "workload | the amount of work a person has to do | khối lượng công việc | My workload is heavy at the end of the month. | manage your workload",
    ],
    pron: {
      focus: "Final consonants: /s/, /t/, /k/, /d/",
      tip: "Vietnamese words rarely end with clear consonant sounds, so English endings often disappear. Say the last sound clearly: check-s, submit-s, approve-d. Practise slowly first, then at normal speed.",
      items: ["checks · submits · approves", "deadlines · workloads · reports", "I checked the report.", "She submitted it last week.", "We missed the deadline twice."],
    },
    reading: {
      title: "Model text: a message about your day",
      text: `Hi Minh, just a quick update. This morning I checked the payment list and submitted it to Mr. Duy for approval. He approved most items, but two invoices need more documents, so I'll follow up with the supplier this afternoon. My workload is quite heavy this week because the monthly report deadline is on Friday. If you need anything from me, please send it before Thursday. Thanks!`,
      q: [
        ["detail", "Why will the writer contact the supplier?", ["To pay them early", "Because two invoices need more documents", "To change the deadline", "To ask about Mr. Duy"], 1],
        ["inference", "Why should Minh send requests before Thursday?", ["The writer is on holiday Thursday", "The writer will be busy finishing the report", "Thursday is a public holiday", "Minh's deadline is Thursday"], 1],
      ],
    },
    writing: {
      type: "message",
      prompt: "Write a short update message (like the model) to a colleague describing what you did today, one problem, and what you will do next. Use past simple for finished actions and 'will' for next steps.",
      min: 60,
      max: 110,
      tips: ["Check every final -s and -ed in your text — say them aloud as you reread."],
    },
    speaking: {
      type: "read-aloud",
      prompt: "Read the model message aloud twice. Focus on final consonants (checked, submitted, approved, documents). Then record yourself telling the same update in your own words.",
      sec: 60,
      script: "This morning I checked the payment list and submitted it for approval. My manager approved most items, but two invoices need more documents, so I'll follow up with the supplier this afternoon.",
    },
  },
  {
    day: 5,
    title: "The two-minute rule",
    objective: "Read → summarise → explain: your first integrated Reading → Writing → Speaking task.",
    vocab: [
      "postpone | to move something to a later time | trì hoãn | We postponed the meeting until next week. | postpone a decision",
      "get started | to begin doing something | bắt đầu | The hardest part is getting started. | get started on a task",
      "pile up | to increase in quantity, often too much | chồng chất | Small tasks pile up if you ignore them. | emails pile up",
      "overwhelmed | feeling there is too much to deal with | quá tải | I felt overwhelmed by the number of requests. | feel overwhelmed",
      "momentum | the energy that keeps something moving forward | đà | Finishing one task gives you momentum. | build momentum / lose momentum",
      "in practice | in real situations, not in theory | trên thực tế | In practice, the rule saves a lot of time. | put into practice",
    ],
    reading: {
      title: "The two-minute rule",
      text: `Many small tasks are not difficult. Replying to a short email, saving a file in the right folder, or writing a quick note takes less than two minutes. Yet people often postpone these tasks, and they pile up. By the end of the week, fifty small tasks feel like one huge problem, and we feel overwhelmed.

The two-minute rule is a simple solution. If a task takes less than two minutes, do it immediately. Do not write it on a list, and do not tell yourself you will do it later. Just finish it.

The rule has a second version for bigger goals: when you want to build a new habit, start with a two-minute version of it. Instead of "study English for an hour", the goal becomes "open my English lesson and read the first paragraph". This sounds too easy, but that is the point. The hardest part of most activities is getting started. Once you begin, momentum usually carries you forward.

In practice, people who use the rule say their desks and inboxes stay cleaner, and they feel more in control of their day.`,
      q: [
        ["main", "What are the two versions of the rule?", ["Work two hours and rest two minutes", "Do quick tasks immediately; start big habits with a tiny step", "Answer emails twice a day; study for two minutes", "Write everything on a list; check it every two minutes"], 1],
        ["detail", "What happens when small tasks are postponed?", ["They disappear", "They become more difficult individually", "They pile up and make people feel overwhelmed", "Other people do them"], 2],
        ["inference", "Why does the writer say 'this sounds too easy, but that is the point'?", ["Because easy goals remove the barrier of starting", "Because hard goals are never useful", "Because English is easy", "Because the writer is joking"], 0],
        ["vocab", "'Momentum' in this text is closest to…", ["a deadline", "a feeling of being tired", "the energy to continue", "a type of list"], 2],
      ],
      summary: "Summarise the article in 50–70 words for a colleague who has not read it.",
    },
    writing: {
      type: "summary",
      prompt: "Write a 50–70 word summary of 'The two-minute rule'. Include: the problem, the rule, and the second version for habits. Use your own words — do not copy full sentences.",
      min: 50,
      max: 80,
      tips: ["Start with: 'The article explains…'", "Cover the text when you write, then check it afterwards."],
    },
    speaking: {
      type: "summary",
      prompt: "Without looking at your summary, explain the two-minute rule to a colleague in about 90 seconds. Add one example of how you could use it at work this week.",
      sec: 90,
    },
  },
  {
    day: 6,
    title: "Challenge: a plan that survives a busy week",
    objective: "Apply the week's language to a real task: create and present your own study plan.",
    vocab: [
      "realistic | sensible and possible to achieve | thực tế, khả thi | Set realistic goals for busy weeks. | a realistic target",
      "priority | something that is more important than other things | ưu tiên | My first priority is speaking. | top priority / set priorities",
      "flexible | able to change easily | linh hoạt | Keep your plan flexible for travel days. | flexible schedule",
      "back-up plan | a second plan if the first one fails | kế hoạch dự phòng | My back-up plan is a 15-minute lesson on my phone. | have a back-up plan",
      "track | to record progress over time | theo dõi | I track my study minutes every day. | keep track of",
      "on track | making the expected progress | đúng tiến độ | If I study five days a week, I'll stay on track. | stay on track / get back on track",
    ],
    reading: {
      title: "How to plan for a week you can't control",
      text: `A study plan usually fails on the first unusual day: an urgent report, a business trip, or an evening event. The solution is not a stronger plan, but a more flexible one.

Start with priorities. Decide which part of your learning matters most this week, for example speaking. Then plan a realistic "normal day" of about an hour. Next, create a back-up plan: a fifteen-minute version you can do anywhere, such as reviewing vocabulary on your phone or recording one short answer.

Finally, track what you actually do, not what you hoped to do. If you miss a day, do not try to repeat two lessons tomorrow. Do the next lesson and add a short review. The goal is to get back on track quickly, not to be perfect.`,
      q: [
        ["main", "According to the text, what makes a plan survive a busy week?", ["Studying more on weekends", "Flexibility and a back-up plan", "Never missing a day", "Avoiding business trips"], 1],
        ["detail", "What should you do after missing a day?", ["Do two lessons the next day", "Start the program again", "Do the next lesson with a short review", "Stop tracking"], 2],
        ["vocab", "'Get back on track' means…", ["return to the expected progress", "take a train", "change your goal", "repeat the week"], 0],
      ],
    },
    writing: {
      type: "report",
      prompt: "Write your personal plan for next week: your top priority, your normal study day, your back-up plan, and how you will track progress. Use headings or short bullet points if you like.",
      min: 80,
      max: 140,
      tips: ["Use 'will' and 'going to' for plans.", "Be specific: times, places, minutes."],
    },
    speaking: {
      type: "presentation",
      prompt: "Present your weekly plan as if to a coach in 90 seconds: priority, normal day, back-up plan. End with one sentence about what success looks like by Sunday.",
      sec: 90,
    },
  },

  // ───────────────────────── Week 2 · Workplace communication
  {
    day: 8,
    title: "Emails that are easy to answer",
    objective: "Identify what makes a professional email clear and talk about your own email habits.",
    vocab: [
      "subject line | the title of an email | tiêu đề email | A clear subject line saves time. | write a clear subject line",
      "get to the point | to talk about the most important thing directly | đi thẳng vào vấn đề | Get to the point in the first sentence. | get straight to the point",
      "request | the act of asking for something politely | yêu cầu | I have a small request about the report. | make a request / urgent request",
      "attach | to add a file to an email | đính kèm | I've attached the signed contract. | attach a file",
      "clarify | to make something easier to understand | làm rõ | Could you clarify the deadline? | clarify a point",
      "respond | to reply | phản hồi | Please respond by Thursday. | respond to an email / respond quickly",
    ],
    reading: {
      title: "What makes an email easy to answer?",
      text: `Most of us receive dozens of emails every day, and we decide very quickly which ones to answer first. The emails that get fast replies usually share three features.

First, they have a clear subject line. "Question" tells the reader nothing. "Approval needed: Q4 travel budget by Friday" tells the reader the topic, the action, and the deadline before they even open the message.

Second, they get to the point. The request appears in the first two sentences, not after a long introduction. Background information is useful, but it should come after the reader knows what you need.

Third, they make the reply easy. Instead of asking "What do you think?", a good email offers options: "Should we choose option A or B?" If there is a file, it is attached and named clearly. If something might be confusing, the writer clarifies it in advance.

A useful test is to imagine the reader on a phone between two meetings. Can they understand your request and respond in thirty seconds? If not, the email probably needs to be shorter and clearer.`,
      q: [
        ["main", "What is the article mainly about?", ["How to write longer emails", "Features of emails that get quick replies", "Why people ignore email", "How to use email on a phone"], 1],
        ["detail", "Where should the request appear?", ["In the subject line only", "At the end of the email", "In the first two sentences", "In the attachment"], 2],
        ["inference", "Why is 'Should we choose option A or B?' better than 'What do you think?'", ["It sounds more polite", "It is easier and faster to answer", "It is longer", "It includes a deadline"], 1],
        ["purpose", "Why does the writer mention a reader 'on a phone between two meetings'?", ["To give a practical test for clarity", "To complain about meetings", "To recommend using phones", "To describe the writer's day"], 0],
      ],
      summary: "List the three features of easy-to-answer emails in one sentence.",
    },
    writing: {
      type: "sentences",
      prompt: "Rewrite these three weak subject lines into clear ones: (1) 'Question' (2) 'Report' (3) 'Urgent!!!'. Then write two sentences explaining what you changed and why.",
      min: 40,
      max: 90,
      tips: ["A strong subject line = topic + action + deadline."],
    },
    speaking: {
      type: "answer",
      prompt: "Answer these questions: How many emails do you get each day? Which emails do you answer first? What is one email habit you want to change?",
      sec: 75,
    },
  },
  {
    day: 9,
    title: "Polite requests that sound natural",
    objective: "Use polite request structures appropriately in emails and conversation.",
    vocab: [
      "would you mind | a polite way to ask someone to do something (+ -ing) | bạn có phiền… không | Would you mind checking these figures? | would you mind sending",
      "I was wondering if | a very polite way to ask for something | tôi muốn hỏi liệu… | I was wondering if we could move the meeting. | I was wondering whether",
      "at your earliest convenience | as soon as you can (formal) | sớm nhất khi có thể | Please reply at your earliest convenience. | ",
      "appreciate | to be grateful for something | trân trọng, cảm kích | I really appreciate your help. | appreciate it if",
      "let me know | tell me (informal but professional) | cho tôi biết | Let me know if you have any questions. | please let me know",
      "in advance | before something happens | trước | Thank you in advance for your support. | thanks in advance / plan in advance",
    ],
    grammar: {
      p: "Polite requests: Could you… / Would you mind + -ing / I was wondering if…",
      e: "English speakers soften requests, especially to people outside their team. 'Send me the file' sounds rude in most emails. Use: Could you + verb (neutral), Would you mind + verb-ing (polite), I was wondering if you could + verb (very polite, good for bigger requests).",
      vi: "Tiếng Việt dùng 'anh/chị vui lòng…' — tiếng Anh dùng cấu trúc câu để làm mềm. Chú ý: 'Would you mind' đi với V-ing.",
      ex: ["Could you send me the updated file by 3 p.m.?", "Would you mind reviewing section 2 before Friday?", "I was wondering if you could join the call on Tuesday.", "I'd appreciate it if you could confirm the amount."],
    },
    reading: {
      title: "Model text: a polite request email",
      text: `Subject: Request: updated cost figures for Q4 report by Wed

Dear Mr. Tan,

I hope you're well. I'm preparing the Q4 cost report and I was wondering if you could send me the updated maintenance figures by Wednesday afternoon. Would you mind including the breakdown by vessel as well? It would help us explain the changes to management.

If Wednesday is difficult, please let me know and we can find another time. I really appreciate your help.

Best regards,
Hieu`,
      q: [
        ["detail", "What does the writer need?", ["A meeting with Mr. Tan", "Updated maintenance figures with a breakdown", "Approval for a payment", "A new deadline"], 1],
        ["detail", "Which phrase makes the deadline flexible?", ["I hope you're well.", "If Wednesday is difficult, please let me know", "Best regards", "It would help us explain"], 1],
        ["vocab", "Which request is the most polite?", ["Send me the figures.", "I was wondering if you could send me the figures.", "You must send the figures.", "Figures, please."], 1],
      ],
    },
    writing: {
      type: "email",
      prompt: "Write a polite email to a colleague in another department asking for information you need for a report. Include: a clear subject line, your request in the first two sentences, a reason, a deadline, and a flexible option.",
      min: 70,
      max: 130,
      tips: ["Use at least two different request structures.", "Check: 'Would you mind + V-ing'."],
    },
    speaking: {
      type: "meeting",
      prompt: "Role-play: You are on a call. Make three polite requests to a colleague: (1) send a file, (2) move a meeting, (3) check some numbers. Use a different structure each time and give a reason.",
      sec: 75,
    },
  },
  {
    day: 10,
    title: "Meetings that end on time",
    objective: "Read about effective meetings and describe a real meeting you attended.",
    vocab: [
      "agenda | a list of topics to discuss in a meeting | chương trình họp | Please send the agenda a day before. | set the agenda / on the agenda",
      "run over | to continue longer than planned | kéo dài quá giờ | Our meetings often run over by 20 minutes. | run over time",
      "outcome | the result of a discussion or action | kết quả | What was the outcome of the meeting? | expected outcome",
      "action item | a specific task agreed in a meeting | đầu việc cần làm | Each action item needs an owner and a date. | list of action items",
      "stay on topic | to keep discussing the subject planned | bám sát chủ đề | Let's try to stay on topic. | ",
      "wrap up | to finish something | kết thúc | Let's wrap up with the next steps. | wrap up a meeting",
    ],
    reading: {
      title: "Meetings that end on time",
      text: `Almost everyone has attended a meeting that ran over by thirty minutes and ended without a clear result. Good meetings are not an accident. They are designed.

A useful meeting begins before anyone enters the room. The organiser shares an agenda that lists not only topics but also the outcome expected for each one: "Decide which supplier to use", not just "Suppliers". When people know what decision is needed, they prepare better and stay on topic.

During the meeting, one person watches the time. When a discussion becomes too long, they suggest continuing it later with only the people who are directly involved. This protects everyone else's time.

The last five minutes are the most important. A good chair wraps up by reading the action items aloud: who will do what, and by when. These items are then sent in a short email within an hour. Without this step, people leave with different memories of what was agreed, and the same topics return at the next meeting.

Shorter meetings are not always better meetings. But meetings with a clear purpose and clear action items almost always are.`,
      q: [
        ["main", "What is the main message?", ["Meetings should be cancelled", "Good meetings are planned and end with clear actions", "Meetings should be under ten minutes", "Only managers should run meetings"], 1],
        ["detail", "What should an agenda include besides topics?", ["The expected outcome for each topic", "The names of all employees", "A list of snacks", "Last month's results"], 0],
        ["detail", "When should the action items be emailed?", ["The next day", "Within an hour", "At the next meeting", "Only if someone asks"], 1],
        ["inference", "What problem happens without the follow-up email?", ["People forget to come", "People remember the decisions differently", "Meetings become shorter", "The chair loses their job"], 1],
      ],
      summary: "Explain in two sentences why the last five minutes of a meeting matter.",
    },
    writing: {
      type: "paragraph",
      prompt: "Describe a recent meeting you attended. What was its purpose? Did it run over? What was the outcome? What would you change to make it more effective?",
      min: 80,
      max: 140,
      tips: ["Use past simple for the story, 'would' for your suggestions."],
    },
    speaking: {
      type: "describe",
      prompt: "Describe the best or worst meeting you remember. Explain what happened and what made it good or bad. Use at least four of today's words.",
      sec: 90,
    },
  },
  {
    day: 11,
    title: "Following up after a meeting",
    objective: "Write a clear follow-up email and practise word stress in common business words.",
    vocab: [
      "as discussed | referring to something talked about earlier | như đã trao đổi | As discussed, I've attached the revised plan. | as discussed in the meeting",
      "agree on | to reach the same decision together | thống nhất về | We agreed on a new timeline. | agree on a date",
      "next steps | the actions that will happen next | các bước tiếp theo | Here are the next steps. | agree on next steps",
      "owner | the person responsible for a task | người phụ trách | The owner of this action is Mai. | task owner",
      "by end of day | before the end of the working day | trước cuối ngày | I'll send it by end of day. | by end of day Friday",
      "confirm | to say that something is true or agreed | xác nhận | Please confirm that the numbers are correct. | confirm a booking / confirm receipt",
    ],
    pron: {
      focus: "Word stress in business words",
      tip: "English words have one strongly stressed syllable. Wrong stress can make a correct word hard to understand. Stress is marked in CAPITALS. Notice how stress moves: deVElop → deVElopment, but ANalyse → aNAlysis.",
      items: ["deVElop · deVElopment", "ANalyse · aNAlysis · anaLYtical", "acCOUNtant · acCOUNting", "FInance · fiNANcial", "Agenda · CONfirm? → conFIRM", "PROject (noun) · proJECT (verb)"],
    },
    reading: {
      title: "Model text: a meeting follow-up",
      text: `Subject: Follow-up: budget review meeting – next steps

Hi all,

Thanks for your time this morning. As discussed, we agreed on three next steps:

1. Mai will update the cost forecast by end of day Wednesday.
2. Khoa will confirm the new supplier prices with procurement by Thursday.
3. I will prepare the final summary for management on Friday.

If I've missed anything, please let me know today.

Best,
Ha`,
      q: [
        ["detail", "Who will confirm supplier prices?", ["Mai", "Khoa", "Ha", "Procurement"], 1],
        ["purpose", "Why does Ha write 'If I've missed anything, please let me know today'?", ["To check that the summary is complete and correct", "To ask for a new meeting", "To complain", "To change the deadlines"], 0],
      ],
    },
    writing: {
      type: "email",
      prompt: "Write a follow-up email after an imaginary (or real) meeting. Include: a subject line, a thank-you line, 3 numbered action items with an owner and a deadline, and a closing line asking for corrections.",
      min: 70,
      max: 130,
      tips: ["Every action item = person + will + verb + deadline."],
    },
    speaking: {
      type: "read-aloud",
      prompt: "Read the word-stress list aloud slowly, then at normal speed. Then read your follow-up email aloud as if you are summarising the meeting at the end of a call.",
      sec: 60,
      script: "As discussed, we agreed on three next steps. Mai will update the cost forecast by end of day Wednesday. Khoa will confirm the new supplier prices by Thursday. I will prepare the final summary for management on Friday.",
    },
  },
  {
    day: 12,
    title: "Saying no without damaging relationships",
    objective: "Integrated task: read about saying no politely, summarise it, then explain the strategy aloud.",
    vocab: [
      "turn down | to refuse an offer or request | từ chối | She turned down the extra project politely. | turn down a request",
      "capacity | the amount of work someone can handle | khả năng đảm nhận | I don't have the capacity this week. | at full capacity",
      "alternative | another possible choice | phương án khác | Can I suggest an alternative? | offer an alternative",
      "trade-off | a balance between two things you cannot have together | sự đánh đổi | There's a trade-off between speed and quality. | make a trade-off",
      "relationship | the way people feel and behave towards each other | mối quan hệ | Good working relationships take time. | build a relationship / damage a relationship",
      "reasonable | fair and sensible | hợp lý | That's a reasonable request. | a reasonable deadline",
    ],
    reading: {
      title: "How to say no without damaging relationships",
      text: `In many workplaces, saying no feels rude. People accept every request, then work late, miss deadlines, or deliver lower-quality work. In the end, saying yes to everything can damage relationships more than a polite no.

A professional no has three parts. First, show that you understand the request: "I can see this report is important for the board meeting." Second, explain your capacity honestly and briefly: "This week I'm finishing the quarterly close, so I can't give it the attention it needs." You do not need a long excuse; a short, true reason is enough.

Third, and most importantly, offer an alternative. You might suggest a later date, a smaller version of the task, or another person who could help. You can also make the trade-off clear to your manager: "If I take this on, the cash-flow forecast will be two days late. Which is the priority?" This turns a refusal into a shared decision.

Most people respect a clear and reasonable answer. What frustrates them is a yes that later becomes a silent no.`,
      q: [
        ["main", "What does the article recommend?", ["Never refuse requests", "Refuse politely with understanding, a reason, and an alternative", "Give long excuses", "Ask your manager to say no for you"], 1],
        ["detail", "Which part does the writer call 'most important'?", ["Showing understanding", "Explaining capacity", "Offering an alternative", "Apologising"], 2],
        ["inference", "What is 'a yes that later becomes a silent no'?", ["Accepting a task but not doing it", "Saying no very quietly", "A polite refusal", "Asking your manager"], 0],
        ["vocab", "'Make the trade-off clear' means…", ["show what will be lost if you accept", "sell something", "work faster", "hide the problem"], 0],
      ],
      summary: "Summarise the three parts of a professional 'no' in 60–80 words.",
    },
    writing: {
      type: "summary",
      prompt: "Summarise the article in 60–80 words. Then add one sentence: a polite 'no' you could actually use at work this month.",
      min: 60,
      max: 100,
      tips: ["Don't copy whole sentences — change the structure."],
    },
    speaking: {
      type: "meeting",
      prompt: "Without notes: your manager asks you to prepare an extra report by tomorrow, but you are already busy. Say no politely using the three-part method, and propose an alternative.",
      sec: 75,
    },
  },
  {
    day: 13,
    title: "Challenge: rescheduling on a call",
    objective: "Handle a short phone or video call: explain a problem, propose new times, confirm details.",
    vocab: [
      "reschedule | to change the time of a planned event | dời lịch | Can we reschedule our call to Thursday? | reschedule a meeting",
      "come up | to happen unexpectedly | phát sinh | Something urgent has come up. | something came up",
      "work for (someone) | to be convenient for someone | phù hợp với | Does 3 p.m. work for you? | that works for me",
      "double-check | to check again to be sure | kiểm tra lại | Let me double-check my calendar. | ",
      "send an invite | to send a calendar invitation | gửi lời mời họp | I'll send an updated invite. | send a calendar invite",
      "sorry for the short notice | apology for telling someone late | xin lỗi vì báo gấp | Sorry for the short notice. | at short notice",
    ],
    reading: {
      title: "Model dialogue: moving a meeting",
      text: `A: Hi Linh, it's Nam. Do you have a minute?
B: Sure, go ahead.
A: I'm afraid something urgent has come up and I can't make our meeting at 2 tomorrow. Sorry for the short notice. Could we reschedule?
B: No problem. What works for you?
A: Would Thursday morning work? Maybe 9:30?
B: Let me double-check… I have a call until 10. How about 10:30?
A: 10:30 works for me. I'll send an updated invite right after this call.
B: Great. Same room or online?
A: Let's do it online, so it's easier for the site team to join.
B: Perfect. See you Thursday.`,
      q: [
        ["detail", "What time do they finally agree on?", ["2 p.m. tomorrow", "9:30 Thursday", "10:30 Thursday", "10:00 Thursday"], 2],
        ["inference", "Why does Nam suggest meeting online?", ["The room is too small", "It's easier for the site team to join", "Linh is sick", "It's cheaper"], 1],
      ],
    },
    writing: {
      type: "message",
      prompt: "Write the short chat message you would send after the call to confirm the new meeting (time, place/link, purpose). Then write one more message to apologise to a client for rescheduling.",
      min: 50,
      max: 110,
      tips: ["Keep messages short and complete: who, when, where, why."],
    },
    speaking: {
      type: "meeting",
      prompt: "Play both roles or imagine the other person: call a colleague, explain that something has come up, propose two new times, agree on one, and confirm the next step. Speak naturally without reading.",
      sec: 90,
    },
  },

  // ───────────────────────── Week 3 · Technology in everyday life
  {
    day: 15,
    title: "The hidden cost of notifications",
    objective: "Read about attention and technology; talk about your own phone habits.",
    vocab: [
      "notification | a message on your phone or computer telling you about something new | thông báo | I turned off most notifications. | turn off notifications",
      "interrupt | to stop someone while they are doing something | làm gián đoạn | Calls interrupt my concentration. | constantly interrupt",
      "concentrate | to give all your attention to something | tập trung | It's hard to concentrate in an open office. | concentrate on",
      "distraction | something that takes your attention away | sự xao nhãng | My phone is my biggest distraction. | avoid distractions",
      "on average | usually; calculated as an average | trung bình | On average, I check my phone 80 times a day. | ",
      "deliberately | on purpose; intentionally | một cách có chủ ý | I deliberately leave my phone in another room. | ",
    ],
    reading: {
      title: "The hidden cost of notifications",
      text: `A notification takes only a second to read. So why do so many people feel tired and unproductive at the end of a day full of short messages?

The answer is that the real cost is not the second we spend reading. It is the time our brain needs to return to deep work. When we are interrupted while writing a report or analysing data, we lose our place. Researchers who study attention say it can take several minutes to concentrate fully again. If this happens twenty times a day, a large part of the working day is spent "restarting".

Notifications are also designed to be hard to ignore. Bright colours, sounds and small red numbers create a feeling that something important is waiting. On average, people check their phones dozens of times a day, often without any notification at all — the habit itself has become a distraction.

The solution is not to throw away our phones. Many people simply turn off non-essential notifications, check messages at planned times, and deliberately create blocks of focused time. They report that they don't miss anything important, and they finish demanding tasks faster.`,
      q: [
        ["main", "What is the 'hidden cost' of notifications?", ["The price of the phone", "The time needed to refocus after interruption", "The cost of mobile data", "The second it takes to read them"], 1],
        ["detail", "How are notifications designed?", ["To be easy to ignore", "To create a feeling that something important is waiting", "To save battery", "To help us concentrate"], 1],
        ["inference", "What does 'often without any notification at all' suggest?", ["Phones are broken", "Checking the phone has become a habit", "People receive fewer messages", "Notifications are silent"], 1],
        ["detail", "Which solution is NOT suggested?", ["Turning off non-essential notifications", "Throwing away the phone", "Checking messages at planned times", "Creating blocks of focused time"], 1],
      ],
      summary: "In two sentences, explain why notifications reduce productivity.",
    },
    writing: {
      type: "paragraph",
      prompt: "Describe your relationship with your phone during the working day. How often do notifications interrupt you? What is one change you will try this week, and why?",
      min: 80,
      max: 140,
      tips: ["Use frequency adverbs: rarely, sometimes, constantly, every few minutes."],
    },
    speaking: {
      type: "answer",
      prompt: "Answer without notes: Which apps interrupt you most? When is it hardest for you to concentrate? Do you think people today are more distracted than ten years ago? Why?",
      sec: 90,
    },
  },
  {
    day: 16,
    title: "Tools that changed how I work",
    objective: "Use the past simple and present perfect correctly to talk about experience with technology.",
    vocab: [
      "switch to | to change from one thing to another | chuyển sang | We switched to cloud accounting last year. | switch to a new system",
      "get used to | to become familiar with something new | quen với | It took me a month to get used to the new software. | get used to + V-ing",
      "save time | to reduce the time needed | tiết kiệm thời gian | Templates save a lot of time. | save time on",
      "feature | an important part or function of a product | tính năng | The best feature is automatic reconciliation. | key feature / new feature",
      "user-friendly | easy to use | dễ sử dụng | The new app is very user-friendly. | ",
      "so far | until now | cho đến nay | So far, the system has worked well. | so far so good",
    ],
    grammar: {
      p: "Past simple vs present perfect",
      e: "Past simple = a finished time (last year, in 2020, yesterday): We switched to a new system last year. Present perfect = experience or result connected to now, no specific past time: I've used Excel for 15 years. The system has saved us hours. Use 'for/since' and 'so far' with the present perfect.",
      vi: "Có mốc thời gian quá khứ cụ thể → quá khứ đơn. Kết quả/kinh nghiệm liên quan đến hiện tại → hiện tại hoàn thành (have/has + V3).",
      ex: ["I started using Power BI in 2023.", "I've built more than twenty dashboards since then.", "Last month we had problems, but so far this month the system has worked perfectly.", "Have you ever used a password manager?"],
    },
    reading: {
      title: "Model text: a tool that changed my work",
      text: `I've used spreadsheets for my whole career, but the tool that changed my work most is a simple automation tool. Two years ago, I spent about four hours every month copying bank data into our reports. Then a colleague showed me how to automate the process. It took me a few weeks to get used to it, but since then I've saved roughly forty hours. The best feature is that it checks for errors automatically. So far, it hasn't missed a single one.`,
      q: [
        ["detail", "How much time has the writer saved?", ["Four hours", "Roughly forty hours", "A few weeks", "Two years"], 1],
        ["vocab", "Which sentence uses the present perfect for an experience up to now?", ["Two years ago, I spent about four hours…", "Then a colleague showed me…", "I've used spreadsheets for my whole career", "It took me a few weeks"], 2],
      ],
    },
    writing: {
      type: "paragraph",
      prompt: "Write about a tool or technology that changed how you work or live. When did you start using it (past simple)? What has changed since then (present perfect)? What is its best feature?",
      min: 80,
      max: 140,
      tips: ["Include at least two past simple and two present perfect sentences.", "Use 'since' or 'so far' once."],
    },
    speaking: {
      type: "story",
      prompt: "Tell the story of the first time you used a new technology at work (what happened, what went wrong, how you feel about it now).",
      sec: 90,
    },
  },
  {
    day: 17,
    title: "Cloud storage, explained simply",
    objective: "Understand an explanatory text and explain a technical idea in simple English.",
    vocab: [
      "store | to keep something for future use | lưu trữ | We store all invoices in the cloud. | store data",
      "access | to be able to use or see something | truy cập | You can access the files from any device. | access to / have access",
      "back up | to make an extra copy of data | sao lưu | Back up your files every week. | back up data",
      "sync | to make data the same on several devices | đồng bộ | My phone syncs with my laptop. | sync files",
      "share | to let other people see or use something | chia sẻ | I shared the folder with the audit team. | share a link",
      "permission | the right to see or change something | quyền truy cập | Only managers have edit permission. | give permission / view-only permission",
    ],
    reading: {
      title: "What is 'the cloud', really?",
      text: `People talk about "the cloud" as if it were something in the sky. In reality, it is simply someone else's computer — usually a very large group of computers in a data centre owned by a company such as Microsoft, Google or Amazon.

When you save a file to the cloud, it is sent over the internet and stored on those computers. Because the file is not only on your laptop, you can access it from your phone, from another office, or from home. If your laptop breaks, your files are safe, because the cloud provider automatically backs them up in more than one place.

Cloud services can also sync your files. If you edit a document on your computer, the change appears on your phone a few seconds later. This makes it easy to share work. Instead of sending a file as an attachment, you send a link, and everyone sees the latest version.

The main risk is control. Whoever has permission to a folder can see what is inside. That is why companies decide carefully who can view or edit each file, and why strong passwords matter more than ever.`,
      q: [
        ["main", "What is the text's main purpose?", ["To sell cloud services", "To explain what the cloud is in simple terms", "To warn people not to use the cloud", "To compare cloud companies"], 1],
        ["detail", "Why are cloud files safe if your laptop breaks?", ["They are printed", "The provider backs them up in several places", "They are on a USB drive", "They are deleted"], 1],
        ["detail", "What is the advantage of sending a link instead of an attachment?", ["It is more secure", "Everyone sees the latest version", "It is faster to type", "Files become smaller"], 1],
        ["inference", "Why do strong passwords 'matter more than ever'?", ["Because anyone with access can see the files", "Because data centres are in the sky", "Because sync is slow", "Because laptops break"], 0],
      ],
      summary: "Explain the cloud in two simple sentences for someone who has never used it.",
    },
    writing: {
      type: "explanation",
      prompt: "Write a simple explanation of one technology you use at work (e.g. cloud storage, ERP, online banking) for a person who has never used it. Use short sentences and one everyday comparison.",
      min: 80,
      max: 140,
      tips: ["Use comparisons: 'It's like a shared folder that…'", "Avoid jargon or explain it immediately."],
    },
    speaking: {
      type: "explain",
      prompt: "Explain the cloud (or another technology) to an older relative who is not technical. Use a comparison and one real example. Speak slowly and clearly.",
      sec: 90,
    },
  },
  {
    day: 18,
    title: "Writing a short app review",
    objective: "Give balanced opinions about a product and practise the 'th' sounds.",
    vocab: [
      "reliable | can be trusted to work well | đáng tin cậy | The app is fast and reliable. | highly reliable",
      "drawback | a disadvantage | nhược điểm | The main drawback is the price. | major drawback",
      "worth it | good enough to justify the cost or effort | đáng giá | Is the paid version worth it? | well worth it",
      "intuitive | easy to understand without instructions | trực quan | The menu is very intuitive. | intuitive design",
      "crash | (of software) to stop working suddenly | bị treo, sập | The app crashed twice yesterday. | keep crashing",
      "recommend | to suggest that something is good | giới thiệu, khuyên dùng | I'd recommend it to small businesses. | highly recommend",
    ],
    pron: {
      focus: "TH sounds: /θ/ (think) and /ð/ (this)",
      tip: "Put your tongue lightly between your teeth and blow air. /θ/ has no voice (think, three, month); /ð/ has voice (this, that, the, although). Don't replace them with /t/, /d/ or /s/: 'think' ≠ 'tink' ≠ 'sink'.",
      items: ["think · thank · three · thousand · month", "this · that · these · the · although", "three thousand", "the other thing", "I think this is worth it."],
    },
    reading: {
      title: "Model text: a balanced app review",
      text: `★★★★☆ Useful, with one drawback

I've used this expense app for three months, and overall I think it's worth it. The design is intuitive: you take a photo of a receipt and the app fills in the amount and date automatically. It's also reliable — it has only crashed once. The main drawback is that it can't read handwritten receipts, so I still enter those by hand. Although it isn't perfect, I'd recommend it to anyone who submits expense claims every month.`,
      q: [
        ["detail", "What is the main drawback?", ["It crashes often", "It can't read handwritten receipts", "It's expensive", "It's hard to use"], 1],
        ["purpose", "Why does the writer use 'Although it isn't perfect'?", ["To give a balanced final opinion", "To complain", "To change the topic", "To ask a question"], 0],
      ],
    },
    writing: {
      type: "opinion",
      prompt: "Write a balanced review (4 parts) of an app or tool you use: overall opinion, two strengths, one drawback, and a recommendation (who should use it?).",
      min: 70,
      max: 130,
      tips: ["Use 'Although…', 'However…', 'Overall…'."],
    },
    speaking: {
      type: "read-aloud",
      prompt: "Practise the TH list, then read the model review aloud. Finally, record your own review from memory.",
      sec: 60,
      script: "I think this app is worth it. Although it isn't perfect, the three things I like are the design, the speed, and the thoughtful features.",
    },
  },
  {
    day: 19,
    title: "Passwords, passkeys and protecting your accounts",
    objective: "Integrated task: read a security article, summarise it, then explain it aloud as advice.",
    vocab: [
      "account | your access to a service with a username and password | tài khoản | My email account was hacked last year. | log in to an account",
      "hack | to get into a computer system illegally | xâm nhập trái phép | Hackers stole thousands of passwords. | get hacked",
      "two-factor authentication | a login needing two types of proof | xác thực hai lớp | Turn on two-factor authentication. | enable two-factor authentication",
      "vulnerable | easy to attack or harm | dễ bị tấn công | Reused passwords make you vulnerable. | vulnerable to",
      "phishing | fake emails or messages that try to steal information | lừa đảo qua email | That was a phishing email. | phishing attack",
      "suspicious | making you feel something is wrong | đáng ngờ | Don't click suspicious links. | look suspicious",
    ],
    reading: {
      title: "Protecting your accounts in three steps",
      text: `Most accounts are not hacked by geniuses. They are hacked because people reuse the same password everywhere. When one website is attacked and its passwords are stolen, criminals try those passwords on email, banking and work accounts. If you use one password for everything, one leak makes all of your accounts vulnerable.

Security experts recommend three simple steps. First, use a password manager. It creates a different, strong password for every site and remembers them for you, so you only need to remember one.

Second, turn on two-factor authentication, especially for email and banking. Even if someone steals your password, they also need a code from your phone. Many services now offer passkeys, which use your phone's fingerprint or face recognition instead of a password and cannot be stolen by a fake website.

Third, learn to recognise phishing. Be suspicious of any message that creates urgency ("Your account will be closed today!") and asks you to click a link or share a code. A real bank or IT department will not ask for your password. When in doubt, open the website yourself instead of clicking the link.`,
      q: [
        ["main", "What is the article mainly about?", ["How hackers become experts", "Three practical ways to protect your accounts", "Why banks are unsafe", "How to create one perfect password"], 1],
        ["detail", "Why is reusing passwords dangerous?", ["It's hard to remember", "One leak can expose all your accounts", "Websites don't allow it", "It slows down your computer"], 1],
        ["detail", "What is special about passkeys?", ["They are longer passwords", "They can't be stolen by a fake website", "They are free", "They are written on paper"], 1],
        ["inference", "What should you do with an urgent message asking you to click a link?", ["Click quickly before the account closes", "Forward it to everyone", "Go to the official website yourself", "Reply with your code"], 2],
      ],
      summary: "Summarise the three steps in 60–80 words.",
    },
    writing: {
      type: "summary",
      prompt: "Write a 60–80 word summary of the three steps. Then add one sentence about which step you will take this week.",
      min: 60,
      max: 100,
    },
    speaking: {
      type: "explain",
      prompt: "Give security advice to a colleague who uses the same password for everything. Explain the risk and the three steps in your own words, without reading.",
      sec: 90,
    },
  },
  {
    day: 20,
    title: "Challenge: a clear IT support request",
    objective: "Describe a technical problem precisely in writing and on a call.",
    vocab: [
      "error message | a message showing that something went wrong | thông báo lỗi | I got an error message when I tried to log in. | display an error message",
      "issue | a problem | sự cố, vấn đề | We have an issue with the printer. | fix an issue / technical issue",
      "steps to reproduce | the actions that make a problem happen again | các bước tái hiện lỗi | Please include the steps to reproduce the error. | ",
      "screenshot | an image of your screen | ảnh chụp màn hình | I've attached a screenshot. | take a screenshot",
      "urgent | needing immediate attention | khẩn cấp | It's urgent because payroll runs tomorrow. | urgent request",
      "workaround | a temporary way to avoid a problem | cách xử lý tạm thời | Is there a workaround until it's fixed? | find a workaround",
    ],
    reading: {
      title: "Model text: a support ticket that gets fixed fast",
      text: `Subject: Error when exporting payroll report – needed by 4 p.m. today

Hi IT team,

Since this morning, I get an error message ("Export failed – code 503") when I export the payroll report from the HR system.

Steps to reproduce:
1. Open Reports > Payroll > October.
2. Click Export to Excel.
3. The error appears after about 10 seconds.

I've attached a screenshot. Other reports export normally. This is urgent because payroll must be sent to the bank by 4 p.m. If there's a workaround (for example, exporting to PDF), please let me know.

Thanks,
Thu`,
      q: [
        ["detail", "When did the problem start?", ["Yesterday", "Since this morning", "Last month", "At 4 p.m."], 1],
        ["inference", "Why does Thu mention that other reports export normally?", ["To help IT narrow down the cause", "To complain about other reports", "To show she is busy", "To ask for a new computer"], 0],
        ["purpose", "Why are the steps numbered?", ["To make it easy to repeat the problem", "Because emails must have numbers", "To look formal", "To make it longer"], 0],
      ],
    },
    writing: {
      type: "email",
      prompt: "Write a support request about a real or imaginary technical problem. Include: a specific subject line, what happens, when it started, numbered steps to reproduce, why it's urgent, and a request for a workaround.",
      min: 80,
      max: 140,
    },
    speaking: {
      type: "meeting",
      prompt: "Call the IT help desk: describe the problem clearly, answer likely questions (When did it start? What did you try?), and agree on the next step. Speak without reading your email.",
      sec: 90,
    },
  },
];
