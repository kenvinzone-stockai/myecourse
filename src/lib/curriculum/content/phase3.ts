import type { DaySeed } from "../seed";

// Phase 3 — Applied English (Days 46–69). Original material.

export const PHASE3: DaySeed[] = [
  // ───────────────────────── Week 7 (cont.) · Business
  {
    day: 46,
    title: "Proposing an idea to a client",
    objective: "Write a persuasive proposal email and use intonation to sound engaged, not flat.",
    vocab: [
      "propose | to formally suggest an idea or plan | | We propose a three-month pilot. | propose a solution",
      "benefit | an advantage or helpful result | | The main benefit is faster reporting. | key benefit / benefit from",
      "pilot | a small test before a full launch | | Let's run a pilot with one team first. | run a pilot / pilot project",
      "outline | to describe the main points | | I've outlined the plan below. | outline a proposal",
      "feasible | possible and practical to do | | Is this timeline feasible? | technically feasible",
      "look forward to | to be pleased about something in the future (+ -ing) | | I look forward to hearing from you. | ",
    ],
    pron: {
      focus: "Intonation: rising and falling",
      tip: "Yes/no questions usually rise at the end (Is that feasible?↗). Wh- questions and statements usually fall (What do you think?↘). In lists, rise on each item and fall on the last (cost↗, time↗ and quality↘). Flat intonation can sound bored or unfriendly in English.",
      items: ["Would that work for you? ↗", "What's your main concern? ↘", "We looked at cost ↗, time ↗, and risk ↘.", "I think that's feasible ↘ — don't you? ↗"],
    },
    reading: {
      title: "Model text: a short proposal email",
      text: `Subject: Proposal: 3-month pilot for automated monthly reporting

Dear Ms. Smith,

Following our call last week, I'd like to propose a three-month pilot to automate your monthly cost reports. I've outlined the main points below:

• Scope: one business unit, starting in January
• Benefit: reports ready on day 3 instead of day 8
• Effort: two short workshops with your finance team

We believe this is feasible with your current systems and low-risk, since the existing process will continue in parallel. If the results are positive, we can discuss a full rollout in April.

I look forward to hearing your thoughts.

Kind regards,
Hieu`,
      q: [
        ["detail", "What is the main benefit of the proposal?", ["Lower prices", "Reports ready five days earlier", "Fewer staff", "A new office"], 1],
        ["inference", "Why does the writer mention that the existing process will continue in parallel?", ["To reduce the client's sense of risk", "To double the work", "To delay the project", "To increase the price"], 0],
        ["purpose", "Why is the proposal presented in bullet points?", ["To make the key facts quick to scan", "Because emails must have bullets", "To look informal", "To hide details"], 0],
      ],
    },
    writing: {
      type: "email",
      prompt: "Write a proposal email suggesting a small improvement at your workplace (a tool, a process change, a training). Include: context, the proposal, 3 bullet points (scope, benefit, effort), why it is low-risk, and a clear next step.",
      min: 110,
      max: 170,
    },
    speaking: {
      type: "presentation",
      prompt: "Pitch your proposal in 90 seconds to a decision-maker. Use rising/falling intonation deliberately, especially in your list of benefits and your closing question.",
      sec: 90,
    },
  },
  {
    day: 47,
    title: "The real cost of a late payment",
    objective: "Integrated: read an analytical article, write a structured summary, then explain the argument aloud.",
    vocab: [
      "cash flow | the movement of money into and out of a business | | Late payments hurt cash flow. | positive / negative cash flow",
      "liquidity | the ability to pay short-term obligations | | Small firms have limited liquidity. | liquidity risk",
      "knock-on effect | an indirect result that spreads | | The delay had a knock-on effect on suppliers. | ",
      "payment terms | the agreed conditions for paying | | Our payment terms are 30 days. | negotiate payment terms",
      "chase | to remind someone repeatedly to do something | | We had to chase the invoice three times. | chase a payment",
      "working capital | the money available for daily operations | | Strong working capital gives flexibility. | ",
    ],
    reading: {
      title: "The real cost of a late payment",
      text: `On paper, a customer who pays thirty days late has not cost anything. The invoice is eventually paid in full, and the revenue appears in the accounts as planned. In reality, late payment is one of the most underestimated costs in business, especially for small and medium-sized companies.

The first cost is liquidity. A company still has to pay salaries, rent and suppliers on time. If the money it expects does not arrive, it must use its reserves or borrow, often at high interest rates. For a business with limited working capital, a few large late payments can create a crisis even when the business is profitable.

The second cost is time. Finance staff spend hours chasing invoices, checking disputes and updating forecasts. These are hours not spent on analysis that could improve the business. The third cost is the knock-on effect. A company that is paid late often pays its own suppliers late, and the delay moves down the supply chain, hurting the smallest firms most.

There are practical defences. Clear payment terms agreed before work begins, accurate invoices sent promptly, and a polite but systematic reminder process all reduce delays. Some companies offer a small discount for early payment; others charge interest on overdue amounts. Perhaps most importantly, they monitor cash flow weekly rather than monthly, so problems are visible before they become emergencies.`,
      q: [
        ["main", "What is the writer's main argument?", ["Late payments have no real cost", "Late payments have hidden costs in liquidity, time and knock-on effects", "Small companies should never give credit", "Interest rates are too high"], 1],
        ["detail", "Why can a profitable business have a crisis?", ["Because its revenue is low", "Because it lacks cash when payments are late", "Because it pays too much tax", "Because it has too many customers"], 1],
        ["detail", "Who is hurt most by the knock-on effect?", ["Banks", "Large customers", "The smallest firms", "Finance staff"], 2],
        ["inference", "Why monitor cash flow weekly?", ["To see problems early", "Because monthly reports are illegal", "To reduce staff", "To charge more interest"], 0],
        ["vocab", "'Underestimated' means…", ["considered less important than it really is", "calculated exactly", "ignored by law", "too expensive"], 0],
      ],
      summary: "Summarise the three costs and two defences.",
    },
    writing: {
      type: "summary",
      prompt: "Write a structured summary (120–150 words) with the claim, the three costs, and the main defences. Then add 1–2 sentences connecting it to your own work experience.",
      min: 120,
      max: 170,
    },
    speaking: {
      type: "summary",
      prompt: "Explain to a non-finance colleague (e.g. in sales) why late customer payments matter and what they can do to help. Without notes, 2 minutes.",
      sec: 120,
    },
  },
  {
    day: 48,
    title: "Challenge: negotiating payment terms",
    objective: "Use negotiation language to reach a balanced agreement politely.",
    vocab: [
      "meet halfway | to compromise | | Could we meet halfway at 45 days? | ",
      "in return | as an exchange | | In return, we can offer faster delivery. | in return for",
      "on condition that | only if | | We'll agree on condition that payment is on time. | ",
      "that's a fair point | polite acknowledgement before disagreeing | | That's a fair point, but… | ",
      "flexibility | willingness to change | | We have some flexibility on price. | show flexibility",
      "deal | an agreement | | I think we have a deal. | close a deal / a fair deal",
    ],
    reading: {
      title: "Model dialogue: agreeing payment terms",
      text: `Client: We'd like to move to 90-day payment terms for all invoices.
Supplier: I understand cash flow is important for you. However, 90 days is very difficult for us, as we pay our crew and fuel within 30 days.
Client: That's a fair point, but our policy is now 90 days for all suppliers.
Supplier: Could we meet halfway? We could accept 60 days on condition that payments are made on time. In return, we can offer a 1% discount for payment within 30 days.
Client: Hmm, that sounds interesting. Could you put that in writing?
Supplier: Of course. I'll send a summary today, including the late-payment interest rate we discussed.
Client: Then I think we have a deal.`,
      q: [
        ["detail", "What is the final agreement?", ["90 days", "30 days only", "60 days, with a discount for early payment", "No change"], 2],
        ["inference", "Why does the supplier mention paying crew and fuel within 30 days?", ["To justify why 90 days is a problem", "To complain about staff", "To ask for a loan", "To end the negotiation"], 0],
      ],
    },
    writing: {
      type: "email",
      prompt: "Write the follow-up email from the supplier summarising the negotiated terms: payment period, discount, late-payment interest, start date, and a request to confirm.",
      min: 90,
      max: 150,
    },
    speaking: {
      type: "meeting",
      prompt: "Negotiate: a supplier wants payment in 15 days; your company's standard is 45. Acknowledge their concern, explain your position, propose a compromise with a condition, and close the deal.",
      sec: 120,
    },
  },

  // ───────────────────────── Week 8 · AI & the future of work
  {
    day: 50,
    title: "What AI is good at — and what it isn't",
    objective: "Read a nuanced article about AI capabilities and discuss your own use of AI tools.",
    vocab: [
      "generate | to produce or create | | AI can generate a first draft in seconds. | generate ideas / generate a report",
      "accurate | correct and exact | | The figures must be accurate. | highly accurate / accuracy",
      "verify | to check that something is true | | Always verify AI answers with the source. | verify information",
      "judgement | the ability to make good decisions | | Final decisions require human judgement. | use your judgement / good judgement",
      "routine task | a regular, repetitive task | | AI handles routine tasks well. | automate routine tasks",
      "confident | (here) sounding certain, even when wrong | | The tool gave a confident but wrong answer. | ",
    ],
    reading: {
      title: "What AI is good at — and what it isn't",
      text: `Modern AI tools can write emails, summarise long documents, translate, draft code and explain complex ideas in seconds. For many office workers, they already save hours each week. But using them well requires a clear understanding of their strengths and weaknesses.

AI is strongest at tasks involving language patterns: producing a first draft, rewriting text in a different tone, summarising, brainstorming options and explaining concepts at different levels. It is also very good at routine tasks with clear instructions, such as reformatting data or writing standard formulas.

Its weaknesses are less obvious. AI tools can produce answers that sound completely confident but contain errors — an invented reference, a wrong calculation, or an outdated rule. Because the language is fluent, these mistakes are easy to miss. AI also lacks context about your organisation unless you provide it: it doesn't know your client's history, your company's politics, or what your manager really meant.

The practical conclusion is that AI is best treated as a fast, capable assistant rather than an authority. The human remains responsible for verifying facts, checking numbers and making judgements. Professionals who benefit most tend to give clear instructions, provide relevant context, and review the output critically — the same skills that make someone good at delegating to a junior colleague.`,
      q: [
        ["main", "What is the writer's overall view?", ["AI can replace professionals", "AI is a useful assistant, but humans must verify and judge", "AI is useless for office work", "AI always gives accurate answers"], 1],
        ["detail", "Why are AI mistakes 'easy to miss'?", ["They are hidden in code", "The language sounds fluent and confident", "They appear rarely", "They are in other languages"], 1],
        ["detail", "Which is described as a strength?", ["Knowing company politics", "Making final decisions", "Rewriting text in a different tone", "Verifying references"], 2],
        ["inference", "Why does the writer compare using AI to delegating to a junior colleague?", ["Both need clear instructions, context and review", "Both are cheap", "Junior colleagues use AI", "Both make no mistakes"], 0],
      ],
      summary: "List two strengths and two weaknesses of AI, and the writer's conclusion.",
    },
    writing: {
      type: "paragraph",
      prompt: "How do you use AI tools (or how could you) in your work? Describe one task where AI helps, one task where you would not trust it, and how you check its output.",
      min: 120,
      max: 180,
    },
    speaking: {
      type: "answer",
      prompt: "Answer as in an interview: 'How do you use AI in your work, and how do you make sure the results are reliable?' Give a concrete example.",
      sec: 120,
    },
  },
  {
    day: 51,
    title: "Talking about possible futures: conditionals",
    objective: "Use first and second conditionals to discuss realistic and hypothetical situations.",
    vocab: [
      "automate | to make a process work automatically | | If we automate data entry, we'll save time. | ",
      "replace | to take the place of | | AI won't replace accountants, but it will change the job. | ",
      "reskill | to learn new skills for a different job | | Many workers will need to reskill. | ",
      "hypothetically | in an imagined situation | | Hypothetically, if AI wrote all reports, what would we do? | ",
      "be likely to | probably will | | Routine jobs are likely to change first. | ",
      "unless | if not | | Nothing will change unless we act. | ",
    ],
    grammar: {
      p: "First vs second conditional",
      e: "First conditional — real, likely situations: If + present simple, will + verb. 'If we automate the reports, we will save two days.' Second conditional — imaginary or unlikely situations: If + past simple, would + verb. 'If AI did all the analysis, we would need fewer analysts.' Use 'were' for all persons in formal style: 'If I were the CFO, I would invest in training.' 'Unless' = if… not.",
      vi: "Điều kiện loại 1: có khả năng xảy ra (If + hiện tại, will). Loại 2: giả định, khó xảy ra (If + quá khứ, would). Đừng dùng 'will' sau 'if'.",
      ex: ["If the pilot succeeds, we'll roll it out in April.", "If I had more time, I would learn Python.", "If AI wrote our audit reports, who would be responsible for mistakes?", "Unless we train the team, the new tool won't be used."],
    },
    reading: {
      title: "Model text: imagining the finance team in 2030",
      text: `If current trends continue, routine work in finance will be largely automated by 2030. If invoices are processed automatically, accountants will spend less time on data entry and more on analysis. But imagine a more extreme scenario: if AI prepared the entire monthly report, what would the team do? I think we would become advisers — explaining numbers, challenging assumptions and supporting decisions. That would require very different skills, so unless we start reskilling now, we won't be ready.`,
      q: [
        ["detail", "Which sentence describes a hypothetical, extreme scenario?", ["If current trends continue, routine work will be automated.", "If AI prepared the entire monthly report, what would the team do?", "Unless we start reskilling now, we won't be ready.", "If invoices are processed automatically, accountants will spend less time…"], 1],
        ["inference", "What does the writer believe accountants should do now?", ["Nothing", "Start reskilling", "Stop using AI", "Change jobs"], 1],
      ],
    },
    writing: {
      type: "opinion",
      prompt: "Write about the future of your job: two first-conditional sentences about realistic changes, two second-conditional sentences about hypothetical situations, and a conclusion with 'unless'.",
      min: 110,
      max: 170,
    },
    speaking: {
      type: "answer",
      prompt: "Answer quickly, using conditionals: If you could automate one task tomorrow, what would it be? If AI made a costly mistake in a report, who would be responsible? What will you do if your company introduces a new AI tool next year?",
      sec: 100,
    },
  },
  {
    day: 52,
    title: "Prompting is a communication skill",
    objective: "Read about writing good instructions; explain the principles with examples.",
    vocab: [
      "instruction | a statement telling someone what to do | | Clear instructions get better results. | give instructions / follow instructions",
      "specify | to state clearly and exactly | | Specify the format you want. | specify a deadline",
      "ambiguous | having more than one possible meaning | | 'Make it better' is ambiguous. | ambiguous wording",
      "constraint | a limit or restriction | | Mention any constraints, such as word count. | time constraints / budget constraints",
      "iterate | to repeat a process to improve the result | | We iterated three times before the final version. | ",
      "audience | the people who will read or hear something | | Who is the audience for this report? | target audience",
    ],
    reading: {
      title: "Prompting is a communication skill",
      text: `When people first use AI tools, they often type short requests such as "Write an email about the delay" and are disappointed by the generic result. The problem is usually not the tool. It is the instruction. Writing good prompts turns out to be very similar to briefing a human colleague.

A useful prompt answers the questions a smart new assistant would ask. Who is the audience? What is the goal — to inform, to apologise, to persuade? What do you already know that the reader doesn't, such as the reason for the delay and the new date? Are there constraints, like a maximum length, a formal tone, or words that must be avoided? What format do you need?

Compare two requests. "Make this report better" is ambiguous; better could mean shorter, clearer, more formal or more persuasive. "Rewrite this for the board: maximum 150 words, lead with the cash impact, remove technical terms" leaves little room for misunderstanding.

Good communicators also iterate. They review the first result, explain what is missing, and ask for a revision, rather than starting again from zero. Interestingly, people who become good at prompting often report that their emails and delegation to colleagues improve too. The underlying skill — thinking clearly about what you want and why — is the same.`,
      q: [
        ["main", "What is the main point?", ["AI tools are generic", "Good prompts require the same clarity as briefing a colleague", "Short prompts are best", "Only experts can use AI"], 1],
        ["detail", "Which question does a useful prompt answer?", ["What is the weather?", "Who is the audience?", "How old is the writer?", "Which AI company is best?"], 1],
        ["inference", "Why is 'Make this report better' a weak instruction?", ["It's too polite", "'Better' can mean many different things", "It's too long", "It mentions a report"], 1],
        ["detail", "What extra benefit do good prompters report?", ["Faster computers", "Better emails and delegation", "Higher salaries", "Fewer meetings"], 1],
      ],
      summary: "Summarise the elements of a good instruction in one sentence.",
    },
    writing: {
      type: "sentences",
      prompt: "Write two versions of an instruction for a real task (to an AI tool or to a colleague): first a weak one, then a strong one that specifies audience, goal, context, constraints and format. Then explain the difference in 2–3 sentences.",
      min: 90,
      max: 160,
    },
    speaking: {
      type: "explain",
      prompt: "Teach a colleague how to write a good instruction in under 2 minutes. Use the weak vs strong example you wrote, without reading it word for word.",
      sec: 110,
    },
  },
  {
    day: 53,
    title: "Writing an internal proposal memo",
    objective: "Structure a short memo with a recommendation, and practise intonation in presentations.",
    vocab: [
      "recommendation | a suggestion about the best thing to do | | Our recommendation is to start a pilot. | make a recommendation",
      "rationale | the reasons for a decision | | The rationale is explained in section 2. | ",
      "risk | the possibility of something bad happening | | The main risk is data privacy. | mitigate a risk / high risk",
      "mitigate | to make something less severe | | We can mitigate this risk with clear rules. | ",
      "estimate | an approximate calculation | | We estimate savings of 200 hours a year. | rough estimate",
      "approval | official permission | | We are seeking approval for a budget of 50 million. | seek approval / get approval",
    ],
    pron: {
      focus: "Chunking & pausing",
      tip: "Speak in meaningful chunks of 3–7 words, with a short pause between them. Pause before important numbers and after key points. Chunking makes you sound confident and gives you time to think. Mark pauses with / when you practise.",
      items: ["Our recommendation / is to start a pilot / in January.", "We estimate / savings of / two hundred hours a year.", "The main risk / is data privacy, / and we can mitigate it / with clear rules."],
    },
    reading: {
      title: "Model text: proposal memo",
      text: `To: Finance Director
From: Reporting Team
Subject: Proposal – AI-assisted variance commentary (pilot)

Recommendation: Approve a 3-month pilot using an approved AI tool to draft monthly variance comments.

Rationale: Writing comments currently takes about 20 hours per month. We estimate the tool could reduce this by half, while analysts keep full responsibility for checking every figure.

Risks: Data privacy and inaccurate drafts. We will mitigate these by using only company-approved tools, removing sensitive data, and requiring human review before any comment is sent.

Approval needed: 15 million VND for licences and training.`,
      q: [
        ["detail", "How much time could be saved per month?", ["About 20 hours", "About 10 hours", "3 months", "15 hours"], 1],
        ["purpose", "Why does the memo start with the recommendation?", ["Busy readers see the decision needed immediately", "Recommendations must always be first by law", "To hide the risks", "To be polite"], 0],
      ],
    },
    writing: {
      type: "report",
      prompt: "Write a short internal memo proposing one change (a tool, training, process). Use the structure: Recommendation · Rationale (with an estimate) · Risks and how to mitigate them · Approval needed.",
      min: 110,
      max: 170,
    },
    speaking: {
      type: "presentation",
      prompt: "Present your memo in 90 seconds, using chunking and pauses. Mark your pauses with '/' on paper first, then speak from keywords only.",
      sec: 90,
    },
  },
  {
    day: 54,
    title: "Will AI replace accountants?",
    objective: "Integrated: analyse a balanced article, summarise both positions, and argue your view.",
    vocab: [
      "augment | to increase or improve by adding to | | AI will augment, not replace, most professionals. | augment human skills",
      "displace | to force out of a position | | Some clerical roles may be displaced. | ",
      "oversight | the responsibility of supervising | | Human oversight is still required. | ",
      "advisory | giving advice | | Accountants may move into advisory roles. | advisory services",
      "entry-level | at the lowest level of a career | | Entry-level jobs may change the most. | entry-level position",
      "accountability | being responsible for decisions and results | | Accountability can't be delegated to software. | ",
    ],
    reading: {
      title: "Will AI replace accountants?",
      text: `Few professions have been discussed as often in debates about automation as accounting. Much of the work — recording transactions, matching invoices, reconciling accounts — follows clear rules, which is exactly what software does well. Some analysts therefore predict that a large share of accounting tasks will be automated within a decade.

Those who expect major job losses point to the speed of recent progress. Systems can now read invoices, classify expenses and flag unusual transactions with little human input. If one person with good tools can do the work of three, firms may simply hire fewer people. Entry-level roles, which traditionally involve the most routine work, appear especially vulnerable.

Others argue that this view misunderstands the profession. Automation has been changing accounting for decades — spreadsheets did not eliminate accountants; they changed what accountants do. In this view, AI will augment rather than displace professionals, removing routine tasks and increasing demand for interpretation, advisory work and judgement. Regulation also matters: someone must sign the accounts and be accountable for them, and oversight of automated systems creates new work.

The most realistic conclusion may combine both views. The number of people doing routine processing is likely to fall, while the value of those who can explain numbers, design controls and advise managers rises. The key uncertainty is how new accountants will learn the basics if routine entry-level work disappears — a question the profession has not yet answered.`,
      q: [
        ["main", "How is the article organised?", ["Problem → solution", "One view → opposite view → balanced conclusion", "History only", "A personal story"], 1],
        ["detail", "Why are entry-level roles 'especially vulnerable'?", ["They are paid more", "They involve the most routine work", "They require regulation", "They are new"], 1],
        ["detail", "What example supports the 'augment' view?", ["Spreadsheets changed but did not eliminate accountants", "Invoices can be read automatically", "Firms hire fewer people", "AI flags transactions"], 0],
        ["inference", "What is the 'key uncertainty' at the end?", ["Whether AI is legal", "How new accountants will gain basic experience", "Whether firms will use AI", "How much software costs"], 1],
        ["vocab", "'Accountable for' means…", ["responsible for and must explain", "paid for", "counting", "unaware of"], 0],
      ],
      summary: "Summarise both positions and the conclusion in 120–150 words.",
    },
    writing: {
      type: "summary",
      prompt: "Write a 120–150 word summary presenting both positions fairly and the writer's conclusion. Use reporting verbs: argue, predict, point out, suggest.",
      min: 120,
      max: 170,
    },
    speaking: {
      type: "opinion",
      prompt: "Give a 2-minute mini-talk: 'How will AI change my profession in the next five years?' State your position, refer to one argument from the article, add your own example, and end with what you are doing to prepare.",
      sec: 120,
    },
  },
  {
    day: 55,
    title: "Challenge: opening a presentation",
    objective: "Open a presentation strongly and guide listeners with signposting language.",
    vocab: [
      "signpost | to tell listeners where you are in a talk | | Signposting helps the audience follow. | signposting language",
      "outline | a short summary of the structure | | I'll start with a quick outline. | give an outline",
      "move on to | to change to the next point | | Let's move on to the results. | ",
      "highlight | to draw attention to something important | | I'd like to highlight three trends. | ",
      "to sum up | to summarise | | To sum up, the pilot was successful. | ",
      "take questions | to answer questions from the audience | | I'll take questions at the end. | ",
    ],
    reading: {
      title: "Model text: a strong presentation opening",
      text: `Good morning, everyone. Last year, our team spent around 240 hours writing monthly reports by hand. Today I'd like to show you how we cut that time in half — and what we learned along the way.

I'll start with a quick outline. First, I'll explain the problem we had. Then I'll move on to the pilot we ran and its results. Finally, I'll highlight three lessons that could help other teams. The whole talk will take about ten minutes, and I'll take questions at the end.

So, let's start with the problem…`,
      q: [
        ["purpose", "Why does the speaker start with '240 hours'?", ["To get attention with a concrete number", "To complain", "To show the team is slow", "To end the talk"], 0],
        ["detail", "When will the speaker take questions?", ["At the beginning", "During each section", "At the end", "Never"], 2],
      ],
    },
    writing: {
      type: "sentences",
      prompt: "Write the opening (hook + purpose + outline + timing + questions) and closing (to sum up + key message + thank you) for a 5-minute talk on a topic from your work or this course.",
      min: 100,
      max: 170,
    },
    speaking: {
      type: "presentation",
      prompt: "Deliver the opening and the first section of your talk, using at least four signposting phrases. Stand up if possible, look at the camera, and speak without reading.",
      sec: 150,
    },
  },

  // ───────────────────────── Week 9 · Decisions & psychology
  {
    day: 57,
    title: "The sunk cost trap",
    objective: "Understand a psychological concept and apply it to decisions you have seen.",
    vocab: [
      "sunk cost | money or effort already spent that cannot be recovered | | The 2 billion already spent is a sunk cost. | sunk cost fallacy",
      "irrational | not based on clear reasoning | | It's irrational to continue just because we started. | ",
      "cut your losses | to stop something failing before you lose more | | Sometimes it's wiser to cut your losses. | ",
      "justify | to give a good reason for something | | How can we justify more spending? | justify a decision",
      "commit to | to promise to support or continue something | | They committed to the project too early. | ",
      "objectively | based on facts, not feelings | | Look at the options objectively. | ",
    ],
    reading: {
      title: "The sunk cost trap",
      text: `Imagine you paid for a non-refundable concert ticket, but on the day you feel ill and it is raining heavily. Many people go anyway, saying, "I've already paid for it." Yet the money is gone whether they go or not. The only real question is whether going will make the evening better or worse.

Economists call money, time or effort that has already been spent and cannot be recovered a sunk cost. Rationally, sunk costs should not affect future decisions. In practice, they strongly influence us. We continue reading boring books, keep failing projects alive and stay in bad investments because stopping feels like admitting that the past spending was wasted.

Organisations are especially vulnerable. A manager who committed to a project publicly may find it hard to stop it, even when new information shows it will not succeed. Each additional month of spending makes the earlier spending seem even harder to "waste", and teams invent reasons to justify continuing. Large public projects with huge budget overruns often show this pattern.

The way out is to ask a different question. Instead of "How much have we invested so far?", ask "If we were starting today, knowing what we know now, would we choose this option?" If the answer is no, the wisest decision may be to cut your losses. This is not easy, but looking at the future objectively — rather than protecting the past — is a mark of good judgement.`,
      q: [
        ["main", "What is the main idea?", ["Concert tickets should be refundable", "Past spending often wrongly influences future decisions", "Projects should never be stopped", "Economists are irrational"], 1],
        ["detail", "Why do people keep failing projects alive?", ["They are sure the project will succeed", "Stopping feels like admitting past spending was wasted", "They have no information", "It's cheaper"], 1],
        ["detail", "What question does the writer recommend?", ["How much have we spent?", "Who started the project?", "If we were starting today, would we choose this?", "How long has it taken?"], 2],
        ["inference", "Why are managers who committed publicly especially vulnerable?", ["Stopping may damage their reputation, so they resist", "They have more money", "They don't understand numbers", "They are not responsible"], 0],
      ],
      summary: "Define 'sunk cost' and give the writer's solution in two sentences.",
    },
    writing: {
      type: "paragraph",
      prompt: "Describe a situation (personal or professional) where you or others continued something because of a sunk cost. What happened? What would the 'starting today' question have suggested?",
      min: 120,
      max: 180,
    },
    speaking: {
      type: "explain",
      prompt: "Explain the sunk cost trap to a colleague using your own example, and give the one question that helps avoid it.",
      sec: 110,
    },
  },
  {
    day: 58,
    title: "Lessons learned: should have, could have, must have",
    objective: "Use past modals to reflect on decisions, regrets and deductions.",
    vocab: [
      "in retrospect | looking back on a past event | | In retrospect, we should have tested it first. | ",
      "lesson learned | knowledge gained from experience | | The main lesson learned is to plan for delays. | lessons learned report",
      "overlook | to fail to notice | | We overlooked a key risk. | ",
      "foresee | to know about something before it happens | | Nobody could have foreseen the storm. | ",
      "avoidable | possible to prevent | | The delay was completely avoidable. | ",
      "post-mortem | an analysis after something has ended (often a failure) | | We held a post-mortem on the project. | ",
    ],
    grammar: {
      p: "Past modals: should have / could have / must have / might have + V3",
      e: "should have done = it was the right thing, but we didn't (regret/criticism). could have done = it was possible, but we didn't. must have done = a confident guess about the past. might/may have done = a possible explanation. couldn't have done = it was impossible.",
      vi: "should have + V3: lẽ ra nên; could have + V3: lẽ ra có thể; must have + V3: chắc hẳn đã; might have + V3: có lẽ đã.",
      ex: ["We should have involved the IT team earlier.", "We could have saved two weeks with better planning.", "The supplier must have misunderstood the specification.", "Nobody could have foreseen such a sharp price increase."],
    },
    reading: {
      title: "Model text: a lessons-learned paragraph",
      text: `In retrospect, the system migration took twice as long as planned for three reasons. First, we should have tested the data earlier; we overlooked that old records used a different format. Second, the vendor must have underestimated the work, because their team changed twice. Third, we could have reduced the pressure by moving the go-live date away from year-end. Not everything was avoidable — nobody could have foreseen the server failure in week six — but the main lesson learned is clear: test early and plan around busy periods.`,
      q: [
        ["detail", "Which problem was not avoidable?", ["Testing data late", "The vendor underestimating the work", "The go-live date", "The server failure"], 3],
        ["vocab", "'The vendor must have underestimated the work' expresses…", ["a confident guess", "a regret", "an obligation", "a future plan"], 0],
      ],
    },
    writing: {
      type: "report",
      prompt: "Write a 'lessons learned' paragraph about a project, event or decision you were part of. Use at least four past modals (should have, could have, must have, couldn't have) and end with one clear lesson.",
      min: 110,
      max: 170,
    },
    speaking: {
      type: "story",
      prompt: "Tell a story about a mistake (at work or in life) and what you learned. Use past modals naturally. Keep it honest and constructive — not just negative.",
      sec: 110,
    },
  },
  {
    day: 59,
    title: "Confirmation bias at work",
    objective: "Analyse an argument about thinking errors and discuss how teams can avoid them.",
    vocab: [
      "bias | a tendency to prefer one thing unfairly | | Everyone has some bias. | unconscious bias",
      "contradict | to say or show the opposite | | The new data contradicts our forecast. | ",
      "assumption | something accepted as true without proof | | Let's check our assumptions. | challenge an assumption",
      "dismiss | to decide something is not important | | They dismissed the warning too quickly. | dismiss an idea",
      "devil's advocate | someone who argues the opposite to test an idea | | Let me play devil's advocate. | play devil's advocate",
      "dissent | disagreement with an official view | | Good teams welcome dissent. | ",
    ],
    reading: {
      title: "Confirmation bias: why smart teams miss obvious problems",
      text: `Once we believe something, we tend to notice information that supports it and ignore information that contradicts it. Psychologists call this confirmation bias, and it affects intelligent, experienced people as much as anyone else. In fact, experts may be more vulnerable, because they are skilled at finding reasons why their existing view is correct.

At work, confirmation bias often appears in forecasts and investment decisions. A team that expects a new product to succeed will read positive customer comments as proof and dismiss negative ones as exceptions. A manager convinced that a supplier is unreliable will remember every late delivery and forget the many that arrived on time. Over time, the original assumption becomes stronger, even if the evidence does not support it.

Groups can make the problem worse. When team members share the same view, nobody looks for contrary evidence, and anyone who disagrees may stay silent to avoid conflict. Decisions then feel confident and unanimous, which makes the risk harder to see.

Several practical habits help. Before a decision, teams can ask, "What evidence would change our mind?" and actively look for it. Someone can be formally asked to play devil's advocate, so that dissent is expected rather than personal. Finally, leaders can share their own opinion last, after hearing others, to avoid signalling which answer they prefer.`,
      q: [
        ["main", "What is the main topic?", ["How to forecast sales", "How confirmation bias affects decisions and how to reduce it", "Why experts are always right", "How to choose suppliers"], 1],
        ["detail", "Why may experts be more vulnerable?", ["They have less information", "They are good at finding reasons to support their view", "They work alone", "They avoid decisions"], 1],
        ["inference", "Why should leaders share their opinion last?", ["So others don't simply follow the leader's view", "Because leaders are shy", "To save time", "Because their opinion doesn't matter"], 0],
        ["detail", "What does the devil's advocate role do?", ["Makes disagreement expected and less personal", "Ends the meeting", "Supports the leader", "Records decisions"], 0],
        ["vocab", "'Unanimous' means…", ["everyone agrees", "nobody agrees", "secret", "very fast"], 0],
      ],
      summary: "Explain confirmation bias and two ways to reduce it.",
    },
    writing: {
      type: "opinion",
      prompt: "Does your team (or family, or a group you know) welcome disagreement? Write about a time when someone challenged an assumption — or should have — and what happened.",
      min: 120,
      max: 180,
    },
    speaking: {
      type: "meeting",
      prompt: "Play devil's advocate: a team wants to launch a new service next month. Politely challenge three assumptions using phrases like 'Let me play devil's advocate…', 'What if…?', 'Have we considered…?'",
      sec: 120,
    },
  },
  {
    day: 61,
    title: "The pre-mortem",
    objective: "Integrated: read about a planning technique, summarise it as a procedure, and run one aloud.",
    vocab: [
      "pre-mortem | imagining a future failure to find risks before starting | | We ran a pre-mortem before launch. | run a pre-mortem",
      "hindsight | understanding after something has happened | | Hindsight is easy. | with hindsight / in hindsight",
      "surface | to bring something hidden into view | | The session surfaced several risks. | surface concerns",
      "candid | honest and direct | | People were more candid than usual. | a candid discussion",
      "contingency plan | a plan for if something goes wrong | | We prepared a contingency plan. | ",
      "overconfident | too sure of success | | The team was overconfident. | ",
    ],
    reading: {
      title: "The pre-mortem: imagining failure before it happens",
      text: `After a project fails, organisations often hold a post-mortem to understand what went wrong. The insights are useful, but they arrive too late. The psychologist Gary Klein proposed a simple alternative: the pre-mortem, which applies the power of hindsight before the project begins.

The method takes about thirty minutes. The team gathers once the plan is ready but before it is launched. The leader says: "Imagine it is one year from now. The project has failed completely. Take five minutes and write down every reason why it failed." Each person then shares one reason at a time until all ideas have been collected. Finally, the team decides which risks are serious and what actions or contingency plans would reduce them.

The technique works because it changes the social situation. In a normal planning meeting, raising doubts can seem negative or disloyal, especially when the plan belongs to a senior manager. In a pre-mortem, finding reasons for failure is the task, so people become more candid. Imagining that failure has already happened also makes risks feel concrete, which helps overconfident teams take them seriously.

Teams that use pre-mortems often surface problems no one had mentioned: a key person who might leave, a supplier with limited capacity, a regulation that could change. Not every risk can be removed, but each one that is identified early is cheaper to manage than one discovered in the middle of a crisis.`,
      q: [
        ["main", "What is a pre-mortem?", ["An analysis after failure", "Imagining future failure before starting, to identify risks", "A medical examination", "A celebration after success"], 1],
        ["detail", "When should the pre-mortem happen?", ["After the project fails", "Before the plan is written", "When the plan is ready but not launched", "At the end of the year"], 2],
        ["inference", "Why are people more candid in a pre-mortem?", ["Finding failure reasons is the official task, so it isn't disloyal", "The manager is absent", "It's anonymous by law", "They are paid extra"], 0],
        ["detail", "Which risk is given as an example?", ["A key person might leave", "Bad weather", "A competitor's advertising", "A holiday"], 0],
      ],
      summary: "Write the pre-mortem method as numbered steps.",
    },
    writing: {
      type: "explanation",
      prompt: "Write (1) the pre-mortem procedure in 4–5 numbered steps, and (2) a short pre-mortem for your own 90-day English plan: three reasons it could fail and one contingency plan for each.",
      min: 120,
      max: 180,
    },
    speaking: {
      type: "presentation",
      prompt: "Lead a pre-mortem aloud: introduce the method to your 'team', give the instruction, then share three possible failure reasons for a real project and the actions you would take.",
      sec: 150,
    },
  },
  {
    day: 62,
    title: "Challenge: agreeing and disagreeing in a discussion",
    objective: "Take part in a discussion: agree, disagree diplomatically, and build on others' ideas.",
    vocab: [
      "I see your point, but | polite disagreement | | I see your point, but the cost is too high. | ",
      "I couldn't agree more | strong agreement | | I couldn't agree more — timing is everything. | ",
      "building on that | adding to someone's idea | | Building on that, we could also… | ",
      "I'm not sure I agree | soft disagreement | | I'm not sure I agree that it's urgent. | ",
      "to some extent | partly | | I agree to some extent. | ",
      "from my perspective | in my opinion (based on my role) | | From my perspective, cash flow is the priority. | ",
    ],
    reading: {
      title: "Model dialogue: a team discussion",
      text: `Manager: Should we move all supplier payments to a fixed weekly run?
An: I couldn't agree more. It would make cash flow much easier to forecast.
Binh: I see your point, but some suppliers have urgent payments, like port fees.
An: That's true. Building on that, we could keep an exception process for urgent cases.
Chi: From my perspective, the bigger issue is approvals. If approvals are late, a weekly run won't help much.
Manager: That's a fair point. So, to some extent we all agree. Let's pilot a weekly run with an exception rule and check approval times.`,
      q: [
        ["detail", "What is Binh's concern?", ["Cash flow", "Urgent payments like port fees", "Approvals", "The pilot"], 1],
        ["detail", "What does the manager decide?", ["Cancel the idea", "Pilot a weekly run with exceptions and check approvals", "Pay daily", "Only pay port fees"], 1],
      ],
    },
    writing: {
      type: "opinion",
      prompt: "Choose a debatable work topic (e.g. 'All meetings should be under 30 minutes'). Write a short dialogue of 6–8 lines between three colleagues who agree, disagree, and build on each other's ideas.",
      min: 100,
      max: 170,
    },
    speaking: {
      type: "meeting",
      prompt: "Respond aloud to each statement, using a different agree/disagree phrase each time and a reason: (1) 'Working from home reduces productivity.' (2) 'Finance should report to operations.' (3) 'Every employee should learn basic coding.' (4) 'Annual budgets are outdated.'",
      sec: 150,
    },
  },

  // ───────────────────────── Week 10 · Leadership, teams & projects
  {
    day: 64,
    title: "Psychological safety",
    objective: "Read a research-based article about teams and discuss team culture critically.",
    vocab: [
      "psychological safety | a belief that you won't be punished for speaking up | | High-performing teams have psychological safety. | ",
      "speak up | to say what you think, especially about a problem | | Junior staff rarely speak up. | ",
      "admit | to agree that something is true, often unwillingly | | It's hard to admit a mistake. | admit a mistake",
      "blame | to say someone is responsible for a problem | | The culture is to blame people. | blame culture",
      "foster | to encourage the development of something | | Leaders foster trust by listening. | foster a culture",
      "high-performing | achieving very good results | | high-performing teams | ",
    ],
    reading: {
      title: "Psychological safety: the hidden ingredient of good teams",
      text: `When Google studied what made some of its teams more effective than others, researchers expected to find that the best teams contained the smartest or most experienced people. Instead, the most important factor was something less visible: psychological safety — a shared belief that it is safe to take interpersonal risks, such as asking a basic question, admitting a mistake or disagreeing with a senior colleague.

The idea was developed by Harvard professor Amy Edmondson, who noticed something surprising in hospital teams. The better teams reported more errors, not fewer. They were not making more mistakes; they were more willing to talk about them, so problems were found and fixed earlier. In teams with a blame culture, mistakes were hidden until they became serious.

Psychological safety is sometimes misunderstood as being "nice" or avoiding conflict. In fact, it makes honest conflict possible. When people trust that they will not be humiliated or punished, they speak up about risks and challenge weak ideas. Standards can remain high — the point is that the conversation about meeting them is open.

Leaders foster this climate through small, repeated behaviours: asking for input before giving their own view, responding to bad news with curiosity rather than anger, and admitting their own mistakes. These actions cost nothing, but they signal what is acceptable. In cultures where respect for seniority is strong, this signal may need to be especially clear and frequent.`,
      q: [
        ["main", "What is the main point?", ["Smart people make the best teams", "Psychological safety — feeling safe to take interpersonal risks — makes teams more effective", "Hospitals make many mistakes", "Teams should avoid conflict"], 1],
        ["detail", "Why did better hospital teams report more errors?", ["They made more mistakes", "They were more willing to talk about mistakes", "They worked longer hours", "They had less training"], 1],
        ["detail", "What misunderstanding does the writer correct?", ["That safety means lower standards or no conflict", "That Google studies teams", "That leaders matter", "That errors are bad"], 0],
        ["inference", "Why might the signal need to be stronger in cultures with strong respect for seniority?", ["Junior staff may be less likely to challenge seniors", "Seniors make more mistakes", "Teams are larger", "There is less conflict"], 0],
      ],
      summary: "Define psychological safety and give two leader behaviours that build it.",
    },
    writing: {
      type: "opinion",
      prompt: "How psychologically safe is your current team? Give evidence (what happens when someone makes a mistake or disagrees?), and suggest two realistic actions to improve it.",
      min: 130,
      max: 190,
    },
    speaking: {
      type: "opinion",
      prompt: "Is psychological safety harder to build in Vietnamese workplaces than in Western ones? Give a balanced opinion with examples for 2 minutes.",
      sec: 120,
    },
  },
  {
    day: 65,
    title: "Reporting what people said",
    objective: "Use reported speech accurately to summarise meetings and conversations.",
    vocab: [
      "point out | to mention a fact, often one others missed | | She pointed out that the deadline was unrealistic. | ",
      "suggest | to propose an idea (+ -ing / that) | | He suggested postponing the launch. | ",
      "raise a concern | to mention a worry | | The auditor raised a concern about controls. | ",
      "confirm | to state that something is true or agreed | | The client confirmed that they would sign. | ",
      "ask whether | to report a yes/no question | | She asked whether the budget had been approved. | ",
      "emphasise | to give special importance to something | | The director emphasised the need for accuracy. | ",
    ],
    grammar: {
      p: "Reported speech & reporting verbs",
      e: "When reporting past speech, tenses usually move one step back: 'We are late' → She said (that) they were late. 'We will finish' → He said they would finish. Questions become statements: 'Is it approved?' → She asked whether it was approved. 'When will you send it?' → He asked when I would send it. Use precise reporting verbs instead of always 'said': pointed out, suggested, confirmed, emphasised, raised a concern.",
      vi: "Câu tường thuật: lùi thì (is → was, will → would), câu hỏi chuyển về trật tự câu khẳng định. Dùng động từ tường thuật đa dạng.",
      ex: ["The client said that they needed the report by Friday.", "Lan pointed out that the figures didn't include VAT.", "The director asked whether we had considered other suppliers.", "Minh suggested running a pilot first."],
    },
    reading: {
      title: "Model text: meeting notes in reported speech",
      text: `At the project meeting, the site manager pointed out that the equipment had arrived two weeks late. The finance director asked whether the delay would affect the budget. The project lead confirmed that costs would rise by about 3%, mainly because of extra rental fees. Ms. Hoa raised a concern about the year-end closing, and suggested moving the final inspection to January. The director emphasised that safety checks must not be shortened under any circumstances.`,
      q: [
        ["detail", "How much will costs rise?", ["About 2%", "About 3%", "About 10%", "Not at all"], 1],
        ["vocab", "'The director asked whether the delay would affect the budget' — what was the original question?", ["Will the delay affect the budget?", "Did the delay affect the budget?", "The delay affects the budget.", "Would you affect the budget?"], 0],
      ],
    },
    writing: {
      type: "report",
      prompt: "Write meeting notes in reported speech for a real or imaginary meeting with 4 participants. Use at least five different reporting verbs and one reported question.",
      min: 110,
      max: 170,
    },
    speaking: {
      type: "summary",
      prompt: "A colleague missed the meeting. Tell them what everyone said, using reported speech naturally (you can use the model or your own notes).",
      sec: 100,
    },
  },
  {
    day: 66,
    title: "Why projects run late",
    objective: "Analyse an argument about planning errors and discuss estimation in your work.",
    vocab: [
      "planning fallacy | the tendency to underestimate time and cost | | The planning fallacy affects almost everyone. | ",
      "underestimate | to think something is smaller than it is | | We underestimated the effort. | ",
      "reference class | a group of similar past cases used for comparison | | Use a reference class to estimate. | ",
      "overrun | an amount over the planned time or budget | | The project had a 40% cost overrun. | cost overrun / time overrun",
      "best-case scenario | the most positive possible outcome | | Our plan assumed the best-case scenario. | ",
      "buffer | extra time or money kept for problems | | Add a buffer of 20%. | build in a buffer",
    ],
    reading: {
      title: "Why projects run late — and how to estimate better",
      text: `Large projects are notorious for running late and over budget, but the pattern is not limited to bridges and IT systems. Ask students how long their thesis will take, or ask a team how long a system upgrade will need, and most will underestimate. The psychologists Daniel Kahneman and Amos Tversky called this the planning fallacy.

Its cause lies in how we imagine the future. When we plan, we picture the steps of our own project and how they should go. We naturally build a best-case scenario: approvals arrive on time, nobody is sick, the data is clean. We rarely include the many small problems that, in reality, almost always occur — even though we know from experience that they happen.

A powerful correction is to take an "outside view". Instead of starting from the details of your plan, start from a reference class: how long did similar projects actually take? If past system migrations in your company took eight months on average, a plan for four months needs a very good explanation. The specific details can then adjust this starting estimate up or down.

Organisations that estimate well also separate estimates from targets. A target is what we hope for; an estimate is what we honestly expect. Mixing them creates pressure to produce optimistic numbers. Building in a realistic buffer, and reviewing past overruns openly, may seem less ambitious, but it produces plans that people can actually trust.`,
      q: [
        ["main", "What is the main argument?", ["Large projects are always failures", "People underestimate time because they imagine best-case scenarios; an outside view helps", "Students are bad planners", "Targets should be higher"], 1],
        ["detail", "What is an 'outside view'?", ["Asking an external consultant", "Starting from how long similar projects actually took", "Working outdoors", "Ignoring the details"], 1],
        ["inference", "Why does mixing targets and estimates create a problem?", ["People feel pressure to give optimistic estimates", "Targets are always too low", "Estimates become targets automatically", "It takes more time"], 0],
        ["vocab", "'Notorious for' means…", ["famous for something bad", "unaware of", "proud of", "paid for"], 0],
      ],
      summary: "Explain the planning fallacy, its cause and one solution.",
    },
    writing: {
      type: "paragraph",
      prompt: "Describe a task or project that took longer than planned. Explain why, using ideas from the text, and describe how you would estimate it next time.",
      min: 130,
      max: 190,
    },
    speaking: {
      type: "explain",
      prompt: "Your manager asks: 'Can we finish the system upgrade in three months?' Respond professionally using the outside view: reference past projects, explain risks, and propose a realistic estimate with a buffer.",
      sec: 120,
    },
  },
  {
    day: 67,
    title: "A clear project status update",
    objective: "Write a concise RAG status update and speak in well-paced chunks.",
    vocab: [
      "on track | progressing as planned | | Phase 1 is on track. | ",
      "at risk | in danger of missing the plan | | The go-live date is at risk. | ",
      "behind schedule | later than planned | | We are two weeks behind schedule. | ",
      "milestone | an important stage in a project | | We reached the first milestone. | hit a milestone",
      "escalate | to pass an issue to a higher level | | I'll escalate the vendor issue. | escalate an issue",
      "dependency | something that must happen before another task can | | Testing has a dependency on data migration. | ",
    ],
    pron: {
      focus: "Pace & emphasis in status updates",
      tip: "Status updates are listened to by busy people. Say the status word with strong stress (on TRACK, at RISK), pause after it, then give the reason. Slow down for dates and numbers. Keep your voice falling at the end of statements so you sound sure.",
      items: ["Overall status: / AMBER.", "Data migration / is on TRACK.", "Testing / is at RISK / because of a delay / in the vendor's work.", "The next milestone / is the fifteenth of JANuary."],
    },
    reading: {
      title: "Model text: weekly status update",
      text: `Project: New expense system — Week 6 status: AMBER

• Data migration: GREEN — completed, on track.
• User testing: AMBER — one week behind schedule because the vendor delivered the test version late. Dependency: training cannot start until testing is complete.
• Training: GREEN — materials ready.

Next milestone: go-live on 15 January (at risk if testing slips another week).
Decision needed: approve two extra testing days with the vendor (cost: 20 million VND). If not resolved by Friday, I will escalate to the steering committee.`,
      q: [
        ["detail", "Why is user testing amber?", ["Training materials are late", "The vendor delivered the test version late", "Data migration failed", "Budget was cut"], 1],
        ["detail", "What decision is needed?", ["Cancel the project", "Approve two extra testing days", "Change the vendor", "Start training immediately"], 1],
      ],
    },
    writing: {
      type: "report",
      prompt: "Write a status update for a real or imaginary project (it can be your 90-day English plan!). Include overall RAG status, 3 workstreams, one dependency, the next milestone, and one decision or support needed.",
      min: 100,
      max: 160,
    },
    speaking: {
      type: "presentation",
      prompt: "Give your status update in a 'stand-up meeting' in 90 seconds. Use stress and pauses for status words, dates and numbers.",
      sec: 90,
    },
  },
  {
    day: 68,
    title: "Feedback that actually helps",
    objective: "Integrated: read, summarise a feedback model, then give spoken feedback using it.",
    vocab: [
      "constructive | intended to help or improve | | Thanks for the constructive feedback. | constructive criticism",
      "specific | clear and exact | | Make feedback specific. | ",
      "impact | the effect something has | | Explain the impact of the behaviour. | have an impact on",
      "defensive | reacting as if being attacked | | He became defensive. | get defensive",
      "behaviour | the way someone acts | | Comment on behaviour, not personality. | ",
      "follow through | to complete what you promised | | Follow through on agreed actions. | ",
    ],
    reading: {
      title: "Feedback that actually helps",
      text: `Most people say they want feedback, yet both giving and receiving it are uncomfortable. Managers avoid it, delay it until the annual review, or soften it so much that the message disappears. When feedback finally comes, it is often vague — "You need to be more proactive" — and the receiver becomes defensive because they don't know exactly what to change.

A widely used model, often called SBI (Situation–Behaviour–Impact), makes feedback more specific and less personal. First, describe the situation: when and where. Second, describe the observable behaviour — what the person actually did or said, not your interpretation of their character. Third, explain the impact of that behaviour on you, the team or the result.

Compare: "You're careless" with "In yesterday's client report (situation), the totals in table 3 didn't match the summary (behaviour). The client noticed and asked whether our other figures were reliable (impact)." The second version is harder to argue with, and it points directly to what needs to change.

The model works for positive feedback too, which is just as important and often neglected. "In the meeting, you explained the variance using one simple chart, and the director approved the budget in five minutes" tells the person exactly what to repeat. Effective feedback ends with a conversation, not a verdict: asking for the other person's view and agreeing on next steps — then following through.`,
      q: [
        ["main", "What is the article mainly about?", ["Why annual reviews are useful", "A model for giving specific, less personal feedback", "How to avoid feedback", "Why managers are careless"], 1],
        ["detail", "What are the three parts of SBI?", ["Situation, Behaviour, Impact", "Skills, Benefits, Ideas", "Summary, Background, Improvement", "Speed, Balance, Insight"], 0],
        ["inference", "Why is 'You're careless' less effective?", ["It judges character and doesn't say what to change", "It's too long", "It's positive", "It describes impact"], 0],
        ["detail", "How should effective feedback end?", ["With a final verdict", "With a conversation and agreed next steps", "With a warning", "With a score"], 1],
      ],
      summary: "Summarise the SBI model with one example.",
    },
    writing: {
      type: "summary",
      prompt: "Summarise the article in 120–150 words. Then write two pieces of feedback using SBI: one positive, one constructive (for a real or imaginary colleague).",
      min: 130,
      max: 190,
    },
    speaking: {
      type: "meeting",
      prompt: "Deliver both pieces of SBI feedback aloud as if in a one-to-one meeting. After the constructive one, ask for the other person's view and agree a next step.",
      sec: 120,
    },
  },
  {
    day: 69,
    title: "Challenge: chairing a short meeting",
    objective: "Chair a meeting: open, manage time and participants, summarise and close.",
    vocab: [
      "kick off | to start | | Let's kick off with a quick update. | ",
      "get back to | to return to a topic | | Let's get back to the main question. | ",
      "park | to postpone a topic for later | | Can we park that for now? | ",
      "hear from | to listen to someone's opinion | | I'd like to hear from Lan. | ",
      "run through | to go through something quickly | | Let me run through the action items. | ",
      "on that note | used to finish a meeting | | On that note, thanks everyone. | ",
    ],
    reading: {
      title: "Model text: the chair's key phrases",
      text: `Opening: "Thanks for joining. We have 30 minutes and one decision to make: which reporting tool to choose. Let's kick off with Minh's comparison."
Managing: "That's an interesting point, but can we park it for now and get back to the main question?" / "Lan, we haven't heard from you yet — what's your view?" / "We have five minutes left, so let's move towards a decision."
Closing: "So, to sum up, we've agreed on Tool B. Let me run through the action items: Minh will contact the vendor by Wednesday; Lan will prepare the training plan by next Friday. On that note, thank you all."`,
      q: [
        ["purpose", "Why does the chair say 'can we park it for now'?", ["To keep the meeting focused on the main question", "To end the meeting", "To criticise Minh", "To change the decision"], 0],
        ["detail", "What did the meeting decide?", ["To delay the decision", "Tool B", "Tool A", "To hire Minh"], 1],
      ],
    },
    writing: {
      type: "sentences",
      prompt: "Prepare a chair's script for a 20-minute meeting on a real topic: opening (purpose, time, decision), two managing phrases you'll need, and a closing with three action items.",
      min: 100,
      max: 160,
    },
    speaking: {
      type: "meeting",
      prompt: "Simulate chairing the meeting: open it, invite two people to speak, park an off-topic point, warn about time, summarise, and close with action items. Speak continuously for 2–3 minutes.",
      sec: 150,
    },
  },
];
