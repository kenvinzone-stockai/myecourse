import type { DaySeed } from "../seed";

// Phase 2 — Skill Expansion (Days 22–45). Original material.

export const PHASE2: DaySeed[] = [
  // ───────────────────────── Week 4 · Money & personal finance
  {
    day: 22,
    title: "Why most budgets fail",
    objective: "Read a longer article, identify the writer's argument, and discuss budgeting habits.",
    vocab: [
      "budget | a plan for how to spend money | ngân sách | We set a monthly budget for food. | stick to a budget / over budget",
      "expense | money spent on something | chi phí | Rent is my biggest expense. | cover expenses / fixed expenses",
      "unexpected | not expected or planned | bất ngờ | An unexpected repair cost two million. | unexpected cost",
      "restrictive | limiting too much | gò bó | A very restrictive budget is hard to follow. | ",
      "buffer | an extra amount kept for safety | khoản dự phòng | Keep a small buffer for surprises. | build a buffer",
      "adjust | to change something slightly | điều chỉnh | We adjust the budget every quarter. | adjust to / make adjustments",
    ],
    reading: {
      title: "Why most personal budgets fail — and what works instead",
      text: `Every January, millions of people create a detailed budget. They list every expense, set strict limits for coffee and clothes, and promise to follow the plan. By March, most of those budgets have been abandoned. Why?

The first reason is that many budgets are too restrictive. A plan that leaves no room for small pleasures feels like a punishment, and people eventually rebel against it. One expensive dinner "breaks" the budget, and the person decides the whole system has failed.

The second reason is that life is irregular, but budgets are often designed as if every month were the same. Car repairs, weddings, medical bills and annual insurance payments are not truly unexpected — they happen every year — yet they are rarely included. When they arrive, the budget collapses.

People who manage money successfully tend to do three things differently. They plan for irregular costs by saving a small amount each month into a separate buffer. They allow a reasonable amount of "free" money that requires no justification. And they review and adjust their budget regularly instead of treating it as a set of fixed rules.

In other words, a good budget is less like a law and more like a map. It does not prevent every wrong turn, but it helps you see where you are and find your way back.`,
      q: [
        ["main", "What is the writer's main argument?", ["People should never spend money on pleasure", "Budgets fail when they are too strict and ignore irregular costs; flexible ones work better", "Budgets are useless", "Only experts can create budgets"], 1],
        ["detail", "Why are car repairs and weddings 'not truly unexpected'?", ["They are cheap", "They happen regularly over a year", "Insurance pays for them", "They are always in January"], 1],
        ["detail", "Which is NOT one of the three things successful people do?", ["Save for irregular costs", "Allow some free money", "Review and adjust", "Record every coffee in a notebook"], 3],
        ["inference", "What does the map comparison suggest?", ["A budget guides you but allows mistakes", "Budgets are confusing", "You should travel less", "Rules must be followed exactly"], 0],
        ["vocab", "'Abandoned' in paragraph 1 means…", ["improved", "stopped being used", "printed", "shared"], 1],
      ],
      summary: "State the writer's argument and the three solutions in 2–3 sentences.",
    },
    writing: {
      type: "opinion",
      prompt: "Do you agree that a budget should be 'less like a law and more like a map'? Write a paragraph giving your opinion with one personal or professional example.",
      min: 100,
      max: 160,
      tips: ["Structure: opinion → reason → example → conclusion."],
    },
    speaking: {
      type: "opinion",
      prompt: "Give your opinion: Should people track every expense, or is a simple approach better? Speak for 90 seconds with a clear position, two reasons and an example.",
      sec: 90,
    },
  },
  {
    day: 23,
    title: "Comparing numbers precisely",
    objective: "Use comparatives, superlatives and degree words to compare figures accurately.",
    vocab: [
      "slightly | a little | hơi, nhẹ | Costs were slightly higher in October. | slightly higher / slightly lower",
      "significantly | by a large or important amount | đáng kể | Revenue increased significantly. | significantly more",
      "twice as much as | two times the amount | gấp đôi | We spent twice as much as last year. | three times as much as",
      "compared with | when comparing to | so với | Compared with Q2, sales rose by 8%. | compared to",
      "the highest / the lowest | superlative forms for the top or bottom value | cao nhất / thấp nhất | August had the highest costs of the year. | the highest level since",
      "roughly | approximately | khoảng, xấp xỉ | Roughly 40% of our costs are fixed. | roughly the same",
    ],
    grammar: {
      p: "Comparatives, superlatives & degree words",
      e: "Short adjectives: high → higher → the highest. Long adjectives: expensive → more expensive → the most expensive. Add precision with degree words: slightly / a little (small difference), much / significantly / considerably (big difference). Equal or multiple: as… as, twice as much as, three times higher than.",
      vi: "Khi so sánh số liệu, thêm từ chỉ mức độ để chính xác: slightly (một chút), significantly (đáng kể). Chú ý: 'than' sau so sánh hơn, 'as…as' cho so sánh bằng.",
      ex: ["Travel costs were slightly lower than in September.", "Maintenance was significantly more expensive this quarter.", "We spent twice as much on training as last year.", "December was the busiest month, and February was the quietest."],
    },
    reading: {
      title: "Model text: comparing two quarters",
      text: `Compared with Q2, total operating costs in Q3 were slightly higher, at roughly 12.4 billion VND (+3%). Staff costs remained almost the same, but maintenance was significantly more expensive because two vessels needed unplanned repairs. In fact, maintenance spending was twice as high as in Q2. On the other hand, travel costs fell by 15%, the lowest level this year, thanks to more online meetings.`,
      q: [
        ["detail", "Which cost doubled?", ["Staff costs", "Travel costs", "Maintenance", "Total operating costs"], 2],
        ["detail", "How did total operating costs change?", ["Rose slightly", "Rose significantly", "Fell by 15%", "Stayed the same"], 0],
        ["inference", "Why did travel costs fall?", ["Fewer employees", "More online meetings", "Cheaper flights", "Unplanned repairs"], 1],
      ],
    },
    writing: {
      type: "comparison",
      prompt: "Compare two periods (two months, quarters or years) using real or invented numbers from your life or work: e.g. household spending, sales, working hours. Use at least 3 comparatives, 1 superlative and 2 degree words.",
      min: 90,
      max: 150,
      tips: ["Always give the reason for an important difference."],
    },
    speaking: {
      type: "presentation",
      prompt: "Present your comparison as if in a short meeting: main change first, then two details with reasons. Use 'slightly', 'significantly', and one 'as…as' structure.",
      sec: 90,
    },
  },
  {
    day: 24,
    title: "Inflation, explained without jargon",
    objective: "Understand an explanatory economics text and explain a concept with an example.",
    vocab: [
      "inflation | the general rise in prices over time | lạm phát | Inflation reached 4% last year. | high inflation / rate of inflation",
      "purchasing power | how much your money can buy | sức mua | Inflation reduces purchasing power. | lose purchasing power",
      "interest rate | the percentage charged or paid for borrowing or saving money | lãi suất | The central bank raised interest rates. | raise / cut interest rates",
      "demand | how much people want to buy something | nhu cầu | Demand for housing is strong. | high demand / meet demand",
      "supply | the amount of something available | nguồn cung | Supply problems pushed prices up. | supply chain / in short supply",
      "erode | to gradually reduce or destroy | bào mòn | Inflation erodes the value of savings. | erode trust / erode value",
    ],
    reading: {
      title: "Inflation, explained without jargon",
      text: `Imagine that a bowl of pho cost 40,000 dong five years ago and costs 55,000 dong today. The pho has not changed, but your money buys less of it. That is inflation: a general rise in prices across the economy, which means each unit of money has less purchasing power.

Inflation usually happens for two broad reasons. Sometimes demand grows faster than supply. If many people want to buy houses but few new houses are built, sellers can raise prices. At other times, the cost of producing goods rises. When fuel becomes more expensive, transport costs increase, and almost every product that is transported becomes more expensive too.

A little inflation is considered normal and even healthy in a growing economy. Problems begin when it is high or unpredictable. Workers find that their salaries buy less each month, and savings kept in cash slowly erode. Businesses find it harder to plan because they do not know what their costs will be next year.

To control inflation, central banks often raise interest rates. Borrowing becomes more expensive, so people and companies spend and invest less. Lower demand reduces the pressure on prices. The difficult part is timing: raise rates too much and the economy can slow down sharply; too little, and prices keep climbing.`,
      q: [
        ["main", "What does the text mainly do?", ["Argue that inflation is always bad", "Explain what inflation is, why it happens and how it is controlled", "Predict next year's inflation", "Compare pho prices in different cities"], 1],
        ["detail", "Which is given as a cause of inflation?", ["Demand growing faster than supply", "Lower interest rates only", "Fewer workers", "More savings"], 0],
        ["detail", "How do higher interest rates reduce inflation?", ["They make goods cheaper to produce", "They reduce borrowing and spending, lowering demand", "They increase salaries", "They increase supply of houses"], 1],
        ["inference", "Why does the writer begin with a bowl of pho?", ["To give a familiar, concrete example", "To recommend a restaurant", "To discuss food quality", "To show that pho is expensive"], 0],
        ["vocab", "'Savings… slowly erode' means savings…", ["grow quickly", "lose value gradually", "disappear immediately", "are stolen"], 1],
      ],
      summary: "Explain inflation, one cause and one solution in 3 sentences.",
    },
    writing: {
      type: "explanation",
      prompt: "Explain one economic or financial concept you know well (inflation, interest, depreciation, cash flow…) to a non-specialist. Start with a concrete everyday example, then give the definition, then one consequence.",
      min: 100,
      max: 160,
    },
    speaking: {
      type: "explain",
      prompt: "Explain inflation to a teenager using your own example (not pho). Include why it happens and why a little inflation is normal.",
      sec: 100,
    },
  },
  {
    day: 25,
    title: "Explaining a variance",
    objective: "Explain why numbers changed, and pronounce numbers clearly.",
    vocab: [
      "variance | the difference between planned and actual figures | chênh lệch | There is a 5% variance against budget. | budget variance / explain a variance",
      "mainly due to | mostly caused by | chủ yếu do | The increase was mainly due to higher fuel prices. | partly due to",
      "offset | to balance one effect with an opposite one | bù trừ | Higher sales offset the rise in costs. | partly offset",
      "one-off | happening only once | phát sinh một lần | This was a one-off payment. | one-off cost",
      "in line with | consistent with; as expected | phù hợp với | Revenue was in line with forecast. | in line with expectations",
      "account for | to form a part or amount of something | chiếm | Fuel accounts for 30% of costs. | account for the difference",
    ],
    pron: {
      focus: "Numbers: -teen vs -ty, large numbers, percentages",
      tip: "Stress -TEEN at the end (thirTEEN, fifTEEN) but the first syllable in -ty (THIRty, FIFty). Read large numbers in groups: 12,450,000 = twelve million, four hundred and fifty thousand. Say 'per cent' clearly: 3.5% = three point five per cent.",
      items: ["thirTEEN · THIRty", "fifTEEN · FIFty", "eighTEEN · EIGHty", "12.4 billion — twelve point four billion", "a variance of 3.5 per cent", "1,250,000 — one million, two hundred and fifty thousand"],
    },
    reading: {
      title: "Model text: a variance comment",
      text: `Actual costs for October were 8.6 billion VND, 4% above budget. The variance was mainly due to a one-off repair on vessel A (around 280 million VND). Fuel costs, which account for roughly 30% of the total, were in line with the forecast. Higher service revenue partly offset the extra costs, so the overall margin was only slightly below plan.`,
      q: [
        ["detail", "What mainly caused the variance?", ["Fuel prices", "A one-off repair", "Lower revenue", "Salaries"], 1],
        ["vocab", "'Partly offset the extra costs' means…", ["completely removed the costs", "balanced some of the costs", "increased the costs", "delayed the costs"], 1],
      ],
    },
    writing: {
      type: "report",
      prompt: "Write a short variance comment (like the model) about a real or invented situation: actual vs plan, the main reason, one item that was in line with expectations, and the overall result.",
      min: 70,
      max: 130,
      tips: ["Put the most important number and reason first."],
    },
    speaking: {
      type: "read-aloud",
      prompt: "Read the number list, then the model comment, aloud. Then explain your own variance comment from notes as if speaking to a manager who asks 'Why are we over budget?'",
      sec: 75,
      script: "Actual costs for October were eight point six billion dong, four per cent above budget. The variance was mainly due to a one-off repair of around two hundred and eighty million dong.",
    },
  },
  {
    day: 26,
    title: "Pay yourself first",
    objective: "Integrated task: read → write a structured summary → explain and evaluate the idea aloud.",
    vocab: [
      "automatic transfer | money moved regularly without action each time | chuyển khoản tự động | I set up an automatic transfer on payday. | set up an automatic transfer",
      "leftover | remaining after the rest is used | còn lại | People save whatever is leftover. | leftover money",
      "emergency fund | savings kept for unexpected problems | quỹ khẩn cấp | Aim for three months of expenses in an emergency fund. | build an emergency fund",
      "willpower | the ability to control your actions | ý chí | Saving shouldn't depend on willpower. | rely on willpower",
      "compound | (of interest) to grow on itself over time | lãi kép | Your savings compound over many years. | compound interest",
      "lifestyle | the way a person lives | lối sống | His lifestyle became more expensive with his salary. | lifestyle inflation",
    ],
    reading: {
      title: "Pay yourself first",
      text: `Most people try to save money in the same way: they pay their bills, live their life, and save whatever is leftover at the end of the month. The problem is that there is rarely anything left. Spending tends to expand to fill the money available — a pattern sometimes called lifestyle inflation.

"Pay yourself first" reverses the order. On the day your salary arrives, a fixed percentage — say 10 or 15 percent — moves automatically into a separate savings account. Only then do you pay bills and spend. Because the transfer is automatic, saving no longer depends on willpower or on remembering to do it.

Supporters of the method say it works for psychological reasons. Money you never see in your main account is much easier not to spend. Over time, people adjust their lifestyle to the amount that remains, and they hardly notice the difference.

Critics point out that it is not realistic for everyone. Families with low incomes or high debts may not be able to save 10 percent at first. Even so, most financial advisers agree the principle can be adapted: start with 2 or 3 percent, build an emergency fund, and increase the amount each time your income rises. Because savings compound, the habit matters more than the starting amount.`,
      q: [
        ["main", "What is the main idea of 'pay yourself first'?", ["Save before spending, automatically", "Pay bills before saving", "Spend less on lifestyle", "Ask your employer for a raise"], 0],
        ["detail", "Why does the method not depend on willpower?", ["Because the transfer is automatic", "Because people are disciplined", "Because banks force it", "Because it's only 2%"], 0],
        ["detail", "What do critics say?", ["It's illegal", "It may not be realistic for low-income or indebted families", "It never works", "It's too slow"], 1],
        ["inference", "Why does 'the habit matter more than the starting amount'?", ["Because small savings grow over time and can be increased", "Because amounts don't matter at all", "Because banks prefer small amounts", "Because debts disappear"], 0],
      ],
      summary: "Summarise: the problem, the method, why it works, and one limitation.",
    },
    writing: {
      type: "summary",
      prompt: "Write a structured summary (90–120 words) with four parts: the usual problem, the method, why it works, and the critics' view. End with your one-sentence evaluation.",
      min: 90,
      max: 130,
    },
    speaking: {
      type: "summary",
      prompt: "Explain 'pay yourself first' to a friend in your own words (without your summary), then give your opinion: would it work for you? Why or why not?",
      sec: 120,
    },
  },
  {
    day: 27,
    title: "Challenge: describing trends in a chart",
    objective: "Describe a trend clearly — rises, falls, peaks — and present it confidently.",
    vocab: [
      "rise / increase | to go up | tăng | Sales rose steadily throughout the year. | rise sharply / a steady increase",
      "fall / decrease | to go down | giảm | Costs fell by 10% in March. | fall slightly / a sharp decrease",
      "peak | the highest point | đỉnh | Demand peaked in December. | reach a peak",
      "remain stable | to stay at the same level | duy trì ổn định | Prices remained stable in Q2. | ",
      "fluctuate | to go up and down irregularly | biến động | Fuel prices fluctuated during the year. | fluctuate between",
      "overall trend | the general direction over a period | xu hướng chung | The overall trend is upward. | ",
    ],
    reading: {
      title: "Model text: describing a line chart",
      text: `The chart shows monthly revenue from January to December. Overall, revenue rose over the year, despite some fluctuations. It started at about 5 billion VND in January and remained stable until April. It then increased sharply, reaching a peak of 9 billion in August. After that, revenue fell slightly in September and October before recovering to around 8.5 billion in December. The strongest growth happened between April and August.`,
      q: [
        ["detail", "When did revenue reach its highest point?", ["January", "April", "August", "December"], 2],
        ["main", "What is the overall trend?", ["Downward", "Upward with some fluctuations", "Completely stable", "Impossible to say"], 1],
        ["purpose", "Why does the description start with 'Overall…'?", ["To give the big picture before the details", "To end the description", "To show an exception", "To compare two charts"], 0],
      ],
    },
    writing: {
      type: "report",
      prompt: "Draw a simple line (on paper) for something that changes over 12 months — your savings, a company's sales, study minutes, temperature. Then describe it: overview first, then the start, main changes, peak/lowest point and end.",
      min: 90,
      max: 150,
      tips: ["Verb + adverb: rose sharply, fell slightly, grew steadily.", "Use past simple for completed periods."],
    },
    speaking: {
      type: "presentation",
      prompt: "Present your chart as if on a screen in a meeting: 'As you can see…'. Overview first, then two key movements and the reason for the biggest change.",
      sec: 90,
    },
  },

  // ───────────────────────── Week 5 · Health, energy & productivity
  {
    day: 29,
    title: "Sleep is a performance tool",
    objective: "Read an evidence-based article, distinguish claims from evidence, and discuss your routine.",
    vocab: [
      "deprived | not having enough of something you need | thiếu | Sleep-deprived workers make more mistakes. | sleep-deprived",
      "productivity | the amount of useful work done | năng suất | Poor sleep reduces productivity. | boost productivity",
      "impair | to make something weaker or worse | làm suy giảm | Tiredness impairs judgement. | impair performance",
      "recover | to return to a normal state | hồi phục | The brain recovers during sleep. | recover from",
      "trade off (against) | to give up one thing to get another | đánh đổi | Don't trade sleep off against work hours. | ",
      "evidence | facts that show something is true | bằng chứng | There is strong evidence for this. | evidence suggests / scientific evidence",
    ],
    reading: {
      title: "Sleep is a performance tool, not a luxury",
      text: `In many workplaces, sleeping less is quietly admired. People talk about answering emails at midnight as if it proved their commitment. Yet a large body of evidence suggests that this habit damages exactly the qualities that make professionals valuable.

Studies of sleep-deprived adults show that after several nights of six hours' sleep or less, attention and reaction time are impaired almost as much as after a full night without sleep. Importantly, the people in these studies often did not feel very tired. They believed they were performing normally, while their test results said otherwise. This is the real danger: we are poor judges of our own tiredness.

Sleep also affects decision-making and emotional control. When we are tired, we are more likely to take unnecessary risks, react angrily to small problems, and misread other people's intentions. For anyone who manages people, money or safety, these effects matter.

None of this means that every late night is a disaster. But it does suggest that trading sleep off against working hours is usually a bad deal. An extra hour of work at midnight may cost more than an hour of productivity the next day. Treating sleep as part of the job — like preparation or training — is not laziness. It is professionalism.`,
      q: [
        ["main", "What is the writer's position?", ["Sleep is a luxury for busy people", "Sleep is essential for professional performance", "Everyone should sleep ten hours", "Late nights are always a disaster"], 1],
        ["detail", "What surprising result is described?", ["Tired people felt very tired", "Tired people performed well", "Tired people believed they were performing normally but weren't", "Six hours of sleep is enough"], 2],
        ["inference", "Why does the writer mention people who manage money or safety?", ["Because tiredness increases risky decisions that matter in these jobs", "Because they sleep less", "Because they are paid more", "Because they work at night"], 0],
        ["purpose", "In the last paragraph, why does the writer say 'None of this means…'?", ["To avoid exaggerating the argument", "To change opinion completely", "To introduce a new study", "To criticise managers"], 0],
        ["vocab", "'We are poor judges of our own tiredness' means…", ["We can't accurately tell how tired we are", "We are bad at our jobs", "Judges are tired", "We sleep badly"], 0],
      ],
      summary: "Separate one claim and one piece of evidence from the text.",
    },
    writing: {
      type: "opinion",
      prompt: "'Working late shows commitment.' Write a paragraph agreeing or disagreeing, using one idea from the text and one example from your experience.",
      min: 100,
      max: 160,
    },
    speaking: {
      type: "answer",
      prompt: "Answer: How many hours do you usually sleep? How do you feel when you sleep less? What would make it easier for you to sleep well during these 90 days?",
      sec: 90,
    },
  },
  {
    day: 31,
    title: "Deep work in a noisy office",
    objective: "Read about focused work; describe your working environment and propose improvements.",
    vocab: [
      "deep work | long, focused work on a demanding task | làm việc sâu, tập trung cao | I do deep work before 10 a.m. | a block of deep work",
      "open-plan office | an office without walls between desks | văn phòng mở | Open-plan offices can be noisy. | ",
      "block out | to keep time free; to stop something from affecting you | chặn, dành riêng | I block out two hours in my calendar. | block out noise / block out time",
      "demanding | needing a lot of effort or skill | đòi hỏi cao | Closing the accounts is demanding work. | a demanding task",
      "shallow work | easy tasks that don't need deep concentration | việc vụn vặt | Emails are mostly shallow work. | ",
      "boundary | a limit that protects your time or space | ranh giới | Set clear boundaries with your team. | set boundaries",
    ],
    reading: {
      title: "Finding deep work in a noisy office",
      text: `Some tasks can be done while chatting with colleagues: sorting emails, booking meetings, updating a tracker. Others — writing an analysis, designing a system, preparing a difficult presentation — require long periods of uninterrupted thinking. The writer Cal Newport calls this second type "deep work", and argues that it produces most of the value in knowledge jobs.

The problem is that modern offices are designed for constant contact. In an open-plan office, every conversation is a possible interruption, and messaging apps make everyone available all day. As a result, many professionals spend their days on shallow work and do demanding tasks in the evening, when they are already tired.

People who protect deep work usually set clear boundaries. They block out two- or three-hour periods in their calendar and treat them like meetings with themselves. During these blocks, they close email, silence their phone and, if possible, move to a quieter place. Some teams agree on "quiet mornings" when no internal meetings are scheduled.

This does not make them unhelpful. They answer messages later, in batches, and they explain their system to colleagues. Most people accept a short delay when they know it leads to better work.`,
      q: [
        ["main", "What is the main topic?", ["How to decorate an office", "Why deep work matters and how people protect it", "Why open-plan offices should be banned", "How to answer messages faster"], 1],
        ["detail", "Which is an example of deep work?", ["Sorting emails", "Booking meetings", "Writing an analysis", "Updating a tracker"], 2],
        ["detail", "What is a 'quiet morning'?", ["A morning with no internal meetings", "A day off", "A meditation session", "A morning without coffee"], 0],
        ["inference", "Why do people explain their system to colleagues?", ["So colleagues accept delayed replies", "To complain", "To get a promotion", "To avoid all work"], 0],
      ],
      summary: "Explain the difference between deep and shallow work with one example of each.",
    },
    writing: {
      type: "paragraph",
      prompt: "Describe your working environment honestly. When can you do deep work? What interrupts you? Propose two specific changes you could try next week.",
      min: 100,
      max: 160,
    },
    speaking: {
      type: "meeting",
      prompt: "Suggest to your team (or manager) a 'quiet morning' or focus block. Explain the problem, your proposal, and how urgent requests would still be handled. Be persuasive but polite.",
      sec: 100,
    },
  },
  {
    day: 32,
    title: "Giving advice naturally",
    objective: "Use a range of advice structures and practise sentence stress and linking.",
    vocab: [
      "it might help to | a gentle way to suggest something | có lẽ sẽ hữu ích nếu | It might help to take short breaks. | ",
      "have you tried | a friendly way to suggest something (+ -ing) | bạn đã thử… chưa | Have you tried turning off notifications? | ",
      "if I were you | a way to give personal advice | nếu tôi là bạn | If I were you, I'd talk to your manager. | ",
      "burnout | extreme tiredness from too much work or stress | kiệt sức | He's close to burnout. | suffer from burnout / avoid burnout",
      "prioritise | to decide what is most important and do it first | ưu tiên | Prioritise the tasks with deadlines. | prioritise tasks",
      "take time off | to have a break from work | nghỉ phép | You should take some time off. | take a day off",
    ],
    pron: {
      focus: "Sentence stress & linking",
      tip: "Stress the content words (nouns, main verbs, adjectives) and say small words (to, a, of, have) quickly. Link a final consonant to a next vowel: 'take_it_easy', 'turn_off', 'have_you_tried'. This makes speech smoother and easier to follow.",
      items: ["Have you TRIED turning OFF your PHONE?", "It might HELP to take a SHORT BREAK.", "If I WERE you, I'd TALK to your MANager.", "turn_off · take_it · look_at_it · a lot_of_emails"],
    },
    reading: {
      title: "Model text: advice to a stressed colleague",
      text: `Hi Duc, I noticed you've been working very late recently, and I just wanted to check you're OK. I've been close to burnout before, so I understand. If I were you, I'd talk to Ms. Hoa about prioritising the tasks — not everything can be urgent. It might also help to take a day off after the audit finishes. And have you tried blocking out an hour each morning for the most difficult work? Let me know if I can help with anything.`,
      q: [
        ["purpose", "What is the main purpose of the message?", ["To complain about Duc", "To show concern and give practical advice", "To ask for help with the audit", "To give Duc new tasks"], 1],
        ["detail", "How many different pieces of advice are given?", ["One", "Two", "Three", "Five"], 2],
      ],
    },
    writing: {
      type: "message",
      prompt: "A colleague or friend is stressed and overloaded. Write a supportive message with three pieces of advice, each using a different structure (should / it might help to / have you tried / if I were you).",
      min: 70,
      max: 130,
    },
    speaking: {
      type: "read-aloud",
      prompt: "Read the stress-and-linking sentences, then read your own message aloud with natural stress. Finally, give the same advice spontaneously as if talking face-to-face.",
      sec: 75,
      script: "If I were you, I'd talk to your manager about priorities. It might also help to take a day off after the audit. And have you tried blocking out an hour each morning?",
    },
  },
  {
    day: 33,
    title: "Walking meetings",
    objective: "Integrated: read a balanced article, summarise both sides, then give your spoken opinion.",
    vocab: [
      "sedentary | involving a lot of sitting | ít vận động | Office work is very sedentary. | sedentary lifestyle",
      "informal | relaxed, not official | thân mật, không trang trọng | Walking meetings feel more informal. | an informal chat",
      "hierarchy | a system where people have different levels of authority | thứ bậc | Walking side by side reduces the feeling of hierarchy. | strict hierarchy",
      "suitable | right for a particular purpose | phù hợp | It's not suitable for detailed discussions. | suitable for",
      "note-taking | writing down key points | ghi chép | Note-taking is harder while walking. | ",
      "on the move | while walking or travelling | khi đang di chuyển | We discussed the plan on the move. | ",
    ],
    reading: {
      title: "Should we hold meetings on the move?",
      text: `Office work is mostly sedentary. Many employees sit for eight or more hours a day, and health experts warn that long periods of sitting are linked to back pain, weight gain and lower energy. One simple idea to break this pattern is the walking meeting: instead of sitting around a table, two or three people discuss a topic while walking.

Supporters say the benefits go beyond health. Walking side by side feels more informal than sitting across a desk, which reduces the sense of hierarchy and can make difficult conversations easier. Some research has found that people produce more creative ideas while walking than while sitting. Many people also report that walking meetings are shorter and more focused, because there are no screens to check.

However, walking meetings are not suitable for every purpose. Note-taking is difficult on the move, so they work poorly for detailed financial reviews or anything that requires documents. Weather, noise and safety can be problems, and they are not inclusive if a colleague has difficulty walking. Groups larger than three tend to split into separate conversations.

The most practical approach seems to be selective: use walking meetings for one-to-one conversations, brainstorming and coaching, and keep traditional meetings for decisions that require data and a written record.`,
      q: [
        ["main", "What is the writer's overall conclusion?", ["All meetings should be walking meetings", "Walking meetings are useful for some purposes but not all", "Walking meetings are dangerous", "Sitting is healthier than walking"], 1],
        ["detail", "Which is NOT a benefit mentioned?", ["Less sense of hierarchy", "More creative ideas", "Better note-taking", "Shorter, more focused meetings"], 2],
        ["detail", "Why are walking meetings not good for detailed financial reviews?", ["Note-taking and using documents is difficult", "Accountants don't like walking", "They take too long", "They are too creative"], 0],
        ["vocab", "'Selective' in the last paragraph means…", ["used only in carefully chosen situations", "used every day", "never used", "chosen by managers only"], 0],
      ],
      summary: "Summarise the advantages, disadvantages and the writer's recommendation.",
    },
    writing: {
      type: "summary",
      prompt: "Write a balanced summary (100–130 words): what walking meetings are, two advantages, two disadvantages, and the recommendation. Use linking words: however, on the other hand, as a result.",
      min: 100,
      max: 140,
    },
    speaking: {
      type: "opinion",
      prompt: "Without notes: Would walking meetings work in your company? Give your opinion with reasons and say which type of meeting you would try first.",
      sec: 120,
    },
  },
  {
    day: 34,
    title: "Challenge: explaining a process step by step",
    objective: "Explain a work process clearly using sequencing language.",
    vocab: [
      "first of all | used to introduce the first step | trước hết | First of all, we collect all invoices. | ",
      "once | as soon as; after | một khi | Once the data is checked, we post the entries. | ",
      "at this stage | at this point in the process | ở bước này | At this stage, the manager reviews the figures. | ",
      "reconcile | to check that two sets of records match | đối chiếu | We reconcile the bank accounts weekly. | reconcile accounts",
      "sign off | to give final approval | ký duyệt | The chief accountant signs off the report. | sign off on",
      "finally | used to introduce the last step | cuối cùng | Finally, the report is sent to the board. | ",
    ],
    reading: {
      title: "Model text: how our month-end close works",
      text: `Our month-end close takes about five working days. First of all, each team sends its invoices and expense claims by the second working day. Once all documents are in, we post the accruals and reconcile the bank and supplier accounts. At this stage, any difference larger than 10 million VND has to be explained in writing. After that, we prepare the draft financial statements and review the main variances with the managers. Finally, the chief accountant signs off the report, and it is sent to head office.`,
      q: [
        ["detail", "When must teams send their documents?", ["The first day", "By the second working day", "After reconciliation", "On the fifth day"], 1],
        ["detail", "What happens to differences above 10 million VND?", ["They are ignored", "They must be explained in writing", "They are sent to head office", "They are posted as accruals"], 1],
      ],
    },
    writing: {
      type: "explanation",
      prompt: "Explain a process you know well (at work or at home: e.g. paying a supplier, onboarding a new employee, cooking a family dish) in 5–7 clear steps using sequencing words.",
      min: 90,
      max: 150,
      tips: ["Passive voice is natural for processes: 'the report is approved'."],
    },
    speaking: {
      type: "explain",
      prompt: "Explain your process to a new colleague who starts next week. Use sequencing words, and add one tip or common mistake at the most difficult step.",
      sec: 120,
    },
  },

  // ───────────────────────── Week 6 · Travel, culture & cities
  {
    day: 36,
    title: "Why we remember trips, not things",
    objective: "Read about experiences vs possessions and talk about a memorable trip.",
    vocab: [
      "possession | something you own | tài sản, đồ sở hữu | A new phone is a possession; a trip is an experience. | material possessions",
      "anticipation | the feeling of looking forward to something | sự mong đợi | Half the pleasure of a trip is the anticipation. | ",
      "fade | to become weaker over time | phai nhạt | The excitement of a new car fades quickly. | fade away",
      "memorable | worth remembering | đáng nhớ | It was the most memorable trip of my life. | a memorable experience",
      "bond | a close connection between people | sự gắn kết | Shared trips create strong bonds. | bond with / a strong bond",
      "in hindsight | when looking back at the past | khi nhìn lại | In hindsight, the rainy day was the best part. | ",
    ],
    reading: {
      title: "Why we remember trips better than things",
      text: `If you had an extra twenty million dong, would you buy a new phone or take a short trip? Many people choose the phone because it lasts longer. Yet psychologists who study happiness have found that, over time, experiences usually bring more satisfaction than possessions.

One reason is that we quickly get used to new things. A new phone is exciting for a few weeks; then it becomes normal, and the pleasure fades. Experiences, by contrast, become part of our personal story. We retell them, and each time we remember them a little more positively. In hindsight, even problems — a missed bus, a sudden storm — often become funny or meaningful parts of the story.

Experiences also connect us with other people. Trips taken with family or friends create shared memories and strengthen bonds, while possessions are more often compared with what other people own, which can make us feel worse rather than better.

Finally, part of the value of an experience comes before it begins. The anticipation of a holiday — planning, imagining, talking about it — is itself a source of happiness. This suggests a simple strategy: if you want more joy from your money, spend some of it on memorable experiences, and plan them well in advance.`,
      q: [
        ["main", "What is the main claim of the article?", ["Phones are a waste of money", "Experiences usually bring more lasting happiness than possessions", "People should travel every month", "Possessions make relationships stronger"], 1],
        ["detail", "What happens to the pleasure of a new possession?", ["It increases", "It fades as we get used to it", "It stays the same", "It becomes a story"], 1],
        ["inference", "Why might a missed bus become a positive memory?", ["Because we retell experiences more positively over time", "Because buses are fun", "Because it saved money", "Because we forget it"], 0],
        ["detail", "What practical advice does the writer give?", ["Never buy phones", "Spend some money on experiences and plan them in advance", "Travel alone", "Compare your possessions with others"], 1],
      ],
      summary: "Give the three reasons experiences bring more happiness, in one sentence each.",
    },
    writing: {
      type: "paragraph",
      prompt: "Describe the most memorable trip of your life. Where did you go, who were you with, what happened, and why do you still remember it?",
      min: 100,
      max: 160,
    },
    speaking: {
      type: "story",
      prompt: "Tell the story of a memorable trip with a clear beginning, middle (something unexpected happened) and end (why it matters to you now).",
      sec: 120,
    },
  },
  {
    day: 37,
    title: "Telling a story in the past",
    objective: "Use the past continuous and past simple together to tell engaging stories.",
    vocab: [
      "all of a sudden | suddenly | bỗng nhiên | All of a sudden, the lights went out. | ",
      "it turned out that | used to say what was discovered later | hóa ra là | It turned out that the flight was cancelled. | ",
      "luckily | fortunately | may mắn thay | Luckily, a stranger helped us. | ",
      "in the end | finally, after a series of events | cuối cùng | In the end, we arrived three hours late. | ",
      "realise | to understand something suddenly | nhận ra | I realised I had left my passport at the hotel. | suddenly realise",
      "on the way | during the journey | trên đường | On the way to the airport, the car broke down. | on the way to / home",
    ],
    grammar: {
      p: "Past continuous + past simple (background vs event)",
      e: "Use the past continuous (was/were + V-ing) for the background — an action in progress. Use the past simple for the event that interrupted it. 'We were driving to the airport when the car broke down.' Use 'while' + past continuous, 'when' + past simple. Use the past perfect (had + V3) for something earlier: 'I realised I had left my passport.'",
      vi: "Hành động đang diễn ra (bối cảnh) → quá khứ tiếp diễn; hành động xen vào → quá khứ đơn. Việc xảy ra trước nữa → quá khứ hoàn thành.",
      ex: ["I was waiting at the gate when they announced the delay.", "While we were walking in the old town, it started to rain.", "When we got to the hotel, we realised we had booked the wrong date."],
    },
    reading: {
      title: "Model text: a short travel story",
      text: `Last year, my family and I were travelling to Da Lat for a long weekend. We were driving up the mountain road when, all of a sudden, the car started making a strange noise. We stopped and waited for about an hour. Luckily, a local mechanic was passing by. It turned out that a small part was broken, and he fixed it in twenty minutes. In the end, we arrived late, but the children still talk about "the mechanic who saved our holiday".`,
      q: [
        ["detail", "What were they doing when the noise started?", ["Waiting at a hotel", "Driving up the mountain road", "Eating dinner", "Walking in Da Lat"], 1],
        ["vocab", "Which phrase introduces something discovered later?", ["all of a sudden", "luckily", "it turned out that", "in the end"], 2],
      ],
    },
    writing: {
      type: "paragraph",
      prompt: "Write a short story about something unexpected that happened during a journey (or at work). Use at least two 'was/were + V-ing … when …' sentences and three of today's phrases.",
      min: 100,
      max: 160,
    },
    speaking: {
      type: "story",
      prompt: "Tell your story aloud without reading. Make the listener feel the moment: set the scene (past continuous), the sudden event, what you did, how it ended.",
      sec: 100,
    },
  },
  {
    day: 38,
    title: "Small talk across cultures",
    objective: "Understand cultural differences in small talk and practise safe conversation openers.",
    vocab: [
      "small talk | light, polite conversation about unimportant topics | chuyện phiếm xã giao | Small talk helps build trust before business. | make small talk",
      "break the ice | to make people feel more relaxed at the start | phá băng | A question about the trip breaks the ice. | ",
      "sensitive | needing care because it may upset people | nhạy cảm | Salary is a sensitive topic in many countries. | a sensitive topic",
      "follow-up question | a question that continues the topic | câu hỏi nối tiếp | Ask follow-up questions to show interest. | ",
      "awkward | uncomfortable or embarrassing | ngượng ngùng | There was an awkward silence. | awkward silence / feel awkward",
      "rapport | a good understanding between people | sự thân thiện, hòa hợp | She builds rapport quickly with clients. | build rapport",
    ],
    reading: {
      title: "Small talk: the conversation before the conversation",
      text: `In international business, the first five minutes of a meeting are often not about business at all. People talk about the weather, the trip, the food or the weekend. This small talk can seem like a waste of time, but its purpose is serious: it builds rapport and trust before people discuss money or problems.

What counts as good small talk differs across cultures. In many English-speaking countries, the weather, travel and sport are safe topics. Asking someone's age, salary or marital status — common in some Asian cultures as a sign of friendly interest — may feel too personal and create an awkward moment. Politics and religion are risky almost everywhere.

The technique matters as much as the topic. Good small talk is a short exchange, not an interview. Instead of asking a series of yes/no questions, ask open questions and follow-up questions: "How was your flight?" → "Oh, long? Where did you fly from?" Share a little about yourself too, so the other person doesn't feel questioned.

For non-native speakers, small talk can feel harder than the business discussion itself, because the vocabulary is unpredictable. Preparing a few reliable openers and two or three personal stories helps. You don't need to be funny or clever. You only need to be interested, friendly and relaxed enough to break the ice.`,
      q: [
        ["main", "What is the main purpose of small talk, according to the text?", ["To fill time before the meeting", "To build rapport and trust", "To find out personal information", "To practise English"], 1],
        ["detail", "Which topic may feel too personal in English-speaking countries?", ["The weather", "Travel", "Salary", "Food"], 2],
        ["detail", "What technique is recommended?", ["Ask many yes/no questions", "Ask open and follow-up questions and share about yourself", "Talk only about business", "Tell jokes"], 1],
        ["inference", "Why might small talk be harder than business talk for non-native speakers?", ["The vocabulary is unpredictable", "It's longer", "It's more formal", "It requires numbers"], 0],
      ],
      summary: "Give two dos and two don'ts of small talk based on the text.",
    },
    writing: {
      type: "sentences",
      prompt: "Prepare your small-talk toolkit: write 4 opening questions, 4 follow-up questions, and 2 short personal 'mini-stories' (2–3 sentences each) you could share with a foreign visitor.",
      min: 90,
      max: 160,
    },
    speaking: {
      type: "meeting",
      prompt: "Imagine meeting a foreign partner at the airport. Start small talk, ask follow-up questions, share one mini-story, then move naturally to business: 'Shall we talk about the plan for tomorrow?'",
      sec: 120,
    },
  },
  {
    day: 39,
    title: "A polite complaint that gets results",
    objective: "Write an effective complaint email and pronounce -ed endings correctly.",
    vocab: [
      "complaint | a statement that something is wrong or not satisfactory | lời phàn nàn, khiếu nại | We received a complaint about the delay. | make a complaint",
      "disappointed | unhappy because something was not as good as expected | thất vọng | I was disappointed with the service. | disappointed with / by",
      "refund | money returned to a customer | hoàn tiền | I would like a full refund. | ask for a refund / full refund",
      "resolve | to solve or end a problem | giải quyết | I hope we can resolve this quickly. | resolve an issue",
      "booking reference | the code for a reservation | mã đặt chỗ | My booking reference is HN4521. | ",
      "compensation | something given to make up for a loss | bồi thường | We requested compensation for the cancelled night. | offer compensation",
    ],
    pron: {
      focus: "-ed endings: /t/, /d/, /ɪd/",
      tip: "After voiceless sounds (k, p, s, sh, ch, f) → /t/: booked, stopped, checked. After voiced sounds → /d/: arrived, cleaned, stayed. After t or d → /ɪd/ (extra syllable): waited, needed, requested. Never add an extra syllable to 'booked' (NOT book-ed).",
      items: ["/t/: booked · checked · asked · stopped", "/d/: arrived · stayed · cleaned · changed", "/ɪd/: waited · needed · requested · decided", "We booked a quiet room but waited two hours."],
    },
    reading: {
      title: "Model text: a hotel complaint",
      text: `Subject: Complaint about stay on 12–14 March – booking reference HN4521

Dear Customer Service Team,

I stayed at your hotel from 12 to 14 March. I booked a quiet room with a sea view, but on arrival I was given a room above the kitchen. When I asked to change rooms, I waited for two hours and was finally told no other room was available.

I was disappointed, as I needed to work in the evenings and the noise continued until midnight. I would appreciate a partial refund or compensation for the first night. I hope we can resolve this quickly, as I have stayed with you several times before and enjoyed it.

Yours faithfully,
Nguyen Thanh`,
      q: [
        ["detail", "What was the main problem?", ["The price", "A noisy room instead of the quiet room booked", "Bad food", "A cancelled booking"], 1],
        ["purpose", "Why does the writer mention staying several times before?", ["To show loyalty and encourage a good solution", "To ask for a discount next time", "To complain about past stays", "To book again"], 0],
      ],
    },
    writing: {
      type: "email",
      prompt: "Write a complaint email about a real or imaginary problem (hotel, delivery, online order, service). Include: reference details, what happened (facts), the impact on you, what you want, and a polite closing.",
      min: 100,
      max: 160,
      tips: ["Facts first, feelings briefly, request clearly.", "Check your -ed verbs — and say them aloud."],
    },
    speaking: {
      type: "meeting",
      prompt: "Call the company instead: explain the problem, stay calm and polite, ask for a specific solution, and respond if they offer something smaller than you wanted.",
      sec: 100,
    },
  },
  {
    day: 40,
    title: "The rise of the 'workcation'",
    objective: "Integrated: read a trend article, summarise it, then argue for or against it.",
    vocab: [
      "remote work | working from a location outside the office | làm việc từ xa | Remote work became common after 2020. | ",
      "blur | to make the difference between things less clear | làm mờ ranh giới | Workcations blur the line between work and rest. | blur the line",
      "time zone | a region with the same standard time | múi giờ | Working across time zones is tiring. | different time zones",
      "recharge | to regain energy | nạp lại năng lượng | Holidays help us recharge. | recharge your batteries",
      "employer | a person or company that employs people | nhà tuyển dụng, người sử dụng lao động | My employer allows two remote weeks a year. | ",
      "appealing | attractive, interesting | hấp dẫn | The idea is appealing but risky. | an appealing option",
    ],
    reading: {
      title: "The rise of the 'workcation'",
      text: `A "workcation" — a combination of work and vacation — means working remotely from a holiday destination for a week or more. Instead of taking leave, an employee might spend two weeks in Phu Quoc, working normal hours on a laptop and enjoying the beach in the evenings and at weekends.

For many people, the idea is appealing. A change of environment can bring fresh energy and new ideas. Families can travel outside school holidays without using all their leave days, and some employers see workcations as a low-cost way to keep talented staff happy. Hotels in popular destinations have responded by offering fast internet, quiet work areas and long-stay discounts.

Critics, however, argue that a workcation is often neither good work nor a real holiday. Unreliable internet, different time zones and distractions can reduce productivity. More importantly, rest requires a real break from work. If people check email from the beach, they never fully switch off, and the line between work and private life blurs further. Over time, this can lead to stress rather than recovery.

The emerging consensus is that workcations can work if they are clearly defined: fixed working hours, normal performance expectations, and separate, genuine holidays where people truly recharge.`,
      q: [
        ["main", "What is the article mainly about?", ["How to book a cheap holiday", "The benefits and risks of combining work and travel", "Why remote work should be banned", "Hotels in Phu Quoc"], 1],
        ["detail", "How have hotels responded to the trend?", ["By raising prices", "By offering fast internet, work areas and long-stay discounts", "By banning laptops", "By closing in school holidays"], 1],
        ["detail", "What is the critics' most important argument?", ["Hotels are expensive", "People don't get real rest, so stress may increase", "The internet is too fast", "Employers lose money"], 1],
        ["inference", "What does 'emerging consensus' suggest?", ["People are starting to agree on a balanced approach", "Nobody agrees", "The trend is ending", "Workcations are illegal"], 0],
      ],
      summary: "Summarise the article in 3 sentences: definition, benefits, risks + conclusion.",
    },
    writing: {
      type: "opinion",
      prompt: "Write 120–160 words: Would a workcation be a good idea for someone in your job? Present both sides briefly, then your conclusion with conditions.",
      min: 120,
      max: 170,
    },
    speaking: {
      type: "opinion",
      prompt: "Your manager asks the team: 'Should we allow two weeks of workcation per year?' Give your view in a mini-speech: position, two reasons, one condition.",
      sec: 120,
    },
  },
  {
    day: 41,
    title: "Challenge: solving a travel problem",
    objective: "Manage a real-life problem conversation: explain, negotiate, and confirm a solution.",
    vocab: [
      "cancelled | stopped; will not happen | bị hủy | Our flight was cancelled due to a storm. | ",
      "rebook | to book again, usually a different time | đặt lại | Can you rebook me on the next flight? | ",
      "connecting flight | a second flight to complete a journey | chuyến bay nối chuyến | I'll miss my connecting flight. | ",
      "voucher | a document that can be used instead of money | phiếu, voucher | They gave us a meal voucher. | hotel voucher",
      "I'd prefer | a polite way to show your choice | tôi muốn hơn | I'd prefer a morning flight if possible. | ",
      "Is there any way | a polite way to ask about possibilities | có cách nào… không | Is there any way to get an earlier flight? | ",
    ],
    reading: {
      title: "Model dialogue: a cancelled flight",
      text: `Passenger: Hi, my flight to Singapore has just been cancelled, and I have a connecting flight to Perth tonight.
Agent: I'm sorry about that. Let me check… The next flight to Singapore is at 6 p.m., but you would miss your connection.
Passenger: Is there any way to get there earlier, maybe with another airline?
Agent: There's a partner flight at 2:15, but it's in economy.
Passenger: That's fine. I'd prefer to arrive on time. Could you also rebook my connecting flight?
Agent: Of course. You're confirmed on both. Here's a meal voucher as well.
Passenger: Thank you. Just to confirm — I'm on the 2:15 to Singapore and the same connection to Perth?
Agent: That's right.`,
      q: [
        ["detail", "Why does the passenger reject the 6 p.m. flight?", ["It's too expensive", "She would miss her connecting flight", "It's in economy", "It's cancelled"], 1],
        ["purpose", "Why does the passenger say 'Just to confirm…' at the end?", ["To check she understood the new arrangement correctly", "To complain again", "To ask for business class", "To cancel the trip"], 0],
      ],
    },
    writing: {
      type: "message",
      prompt: "Write two short messages: (1) to your manager explaining the travel problem and the new plan; (2) to the colleague who was going to meet you at the airport, with the new arrival details.",
      min: 70,
      max: 130,
    },
    speaking: {
      type: "meeting",
      prompt: "Role-play at the airport counter: your flight is cancelled and you have an important meeting tomorrow morning. Explain, ask for options, negotiate, and confirm the final solution.",
      sec: 120,
    },
  },

  // ───────────────────────── Week 7 · Business & how companies work
  {
    day: 43,
    title: "How a company really makes money",
    objective: "Understand basic business vocabulary in context and explain a business model.",
    vocab: [
      "revenue | money a company receives from sales | doanh thu | Revenue grew by 12% last year. | generate revenue",
      "profit margin | profit as a percentage of revenue | biên lợi nhuận | Our profit margin is around 8%. | high / thin margins",
      "fixed cost | a cost that doesn't change with sales | chi phí cố định | Rent is a fixed cost. | ",
      "variable cost | a cost that changes with the amount produced | chi phí biến đổi | Fuel is a variable cost. | ",
      "break even | to have revenue equal to costs | hòa vốn | The new service broke even in its second year. | break-even point",
      "scale | to grow in size efficiently | mở rộng quy mô | Software companies can scale quickly. | scale up / economies of scale",
    ],
    reading: {
      title: "How a company really makes money",
      text: `When people look at a successful company, they usually notice its revenue — the total money it receives from customers. But revenue alone says little about whether a business is healthy. A company can sell a lot and still lose money. To understand a business, you need to look at its costs and margins.

Costs fall into two broad groups. Fixed costs, such as rent, insurance and most salaries, stay roughly the same whether the company sells a little or a lot. Variable costs, such as raw materials, fuel or sales commissions, rise and fall with activity. The profit margin is what remains from revenue after costs, expressed as a percentage.

This structure explains why companies behave as they do. A business with high fixed costs — an airline or a shipyard, for example — must keep its assets busy. Once it sells enough to break even, each additional sale is very profitable, but in a slow year losses grow quickly. A business with mainly variable costs, such as a trading company, is safer in bad times but usually earns thinner margins.

Software is a special case. Developing a product is expensive, but serving one more customer costs almost nothing, so successful software companies can scale with extraordinary margins. That is why investors often value them so highly, sometimes even before they make a profit.`,
      q: [
        ["main", "What is the main point?", ["Revenue is the only important number", "To understand a business, you must look at costs and margins, not just revenue", "Software companies always make a profit", "Airlines are bad businesses"], 1],
        ["detail", "Which is an example of a variable cost?", ["Rent", "Insurance", "Fuel", "Most salaries"], 2],
        ["inference", "Why is a slow year dangerous for a company with high fixed costs?", ["Its costs don't fall when sales fall", "Its variable costs rise", "It must pay commissions", "It sells too much"], 0],
        ["detail", "Why can software companies scale with high margins?", ["Serving extra customers costs very little", "They have no developers", "They don't pay rent", "They sell hardware"], 0],
      ],
      summary: "Explain the difference between fixed and variable costs and why it matters.",
    },
    writing: {
      type: "explanation",
      prompt: "Explain how your company (or a business you know well) makes money: main revenue source, main fixed and variable costs, and one risk this structure creates.",
      min: 110,
      max: 170,
    },
    speaking: {
      type: "explain",
      prompt: "Explain your company's business model to a foreign student visiting for a day. Keep it simple, use today's vocabulary and one number or example.",
      sec: 120,
    },
  },
  {
    day: 44,
    title: "The passive voice in reports and processes",
    objective: "Choose active or passive voice appropriately in professional writing.",
    vocab: [
      "be carried out | to be done (formal) | được thực hiện | The audit was carried out in May. | carry out a review",
      "be submitted | to be given for approval | được nộp | All claims must be submitted by Friday. | ",
      "be recorded | to be written down officially | được ghi nhận | Revenue is recorded when the service is delivered. | ",
      "be expected to | to be thought likely to | dự kiến | Costs are expected to rise. | ",
      "it was agreed that | formal way to report a decision | đã thống nhất rằng | It was agreed that the policy would change. | ",
      "be responsible for | to have the duty of | chịu trách nhiệm | Each department is responsible for its own budget. | ",
    ],
    grammar: {
      p: "Passive voice: be + past participle",
      e: "Use the passive when the action or result matters more than who did it, or when the doer is obvious or unknown — very common in reports, processes and procedures. Present: is/are done. Past: was/were done. Future/modal: will be / must be / should be done. Use active voice when the person matters: 'Mai prepared the report' (credit, responsibility).",
      vi: "Bị động (be + V3) dùng nhiều trong báo cáo, quy trình — khi hành động/kết quả quan trọng hơn người làm. Đừng lạm dụng: khi cần rõ trách nhiệm, dùng chủ động.",
      ex: ["The invoices are checked and approved within three days.", "The new system was introduced in January.", "All expenses must be supported by receipts.", "Costs are expected to fall slightly next quarter."],
    },
    reading: {
      title: "Model text: an internal audit summary",
      text: `An internal review of the purchasing process was carried out in October. It was found that most purchase orders were approved correctly. However, in 6 out of 50 cases, goods were received before the order had been approved. These cases were discussed with the department heads, and it was agreed that the system will be updated so that receipts cannot be recorded without an approved order. The change is expected to be completed by the end of December.`,
      q: [
        ["detail", "What problem was found?", ["Orders were too expensive", "Some goods were received before approval", "The system was too slow", "Department heads were absent"], 1],
        ["purpose", "Why is the passive used so often in this text?", ["The process and results matter more than individual people", "The writer doesn't know English well", "To hide mistakes", "To make it longer"], 0],
      ],
    },
    writing: {
      type: "report",
      prompt: "Write a short summary of a review, change or project at your workplace (real or invented): what was done, what was found, what was agreed, what is expected next. Use at least five passive verbs and one active sentence where responsibility matters.",
      min: 100,
      max: 160,
    },
    speaking: {
      type: "presentation",
      prompt: "Present your summary to a manager in 90 seconds. In speech, people use fewer passives — notice which sentences you naturally change to active.",
      sec: 90,
    },
  },
  {
    day: 45,
    title: "Why customers stay",
    objective: "Read about customer retention and express and justify opinions in speech.",
    vocab: [
      "retain | to keep | giữ chân | It's cheaper to retain customers than to find new ones. | retain customers / retain staff",
      "loyal | continuing to support someone or something | trung thành | Loyal customers recommend us to others. | customer loyalty",
      "acquire | to get or win | thu hút, có được | Acquiring new clients is expensive. | customer acquisition",
      "word of mouth | information passed from person to person | truyền miệng | Most of our clients come by word of mouth. | ",
      "switch | to change from one supplier to another | chuyển đổi | Customers switch when service falls. | switching costs",
      "expectations | beliefs about what will happen | kỳ vọng | We exceeded the client's expectations. | meet / exceed expectations",
    ],
    reading: {
      title: "Why customers stay — and why they leave",
      text: `Businesses spend large amounts of money to acquire new customers through advertising, discounts and sales teams. Yet many experts argue that the more profitable question is how to retain the customers they already have. Loyal customers tend to buy more over time, cost less to serve, and bring new clients through word of mouth.

Interestingly, research suggests that customers rarely leave because of price alone. More often, they leave because they feel ignored or because a problem was handled badly. A delayed delivery is annoying; a delayed delivery that nobody explains is a reason to switch. In business-to-business relationships, where contracts are large and long, a single respected contact person can be the main reason a client stays.

This is why some companies measure not just whether customers are satisfied, but whether they would recommend the company to a colleague. Others review every lost customer to understand the real reason. The answers are often uncomfortable: slow responses, unclear invoices, or promises made by sales and forgotten by operations.

The lesson is simple but difficult to apply. Retention is not the job of one department. It depends on many small moments — an accurate invoice, a quick reply, an honest explanation — that together tell customers whether a company deserves their trust.`,
      q: [
        ["main", "What is the main argument?", ["Advertising is the best investment", "Retaining customers depends on many small moments across the company", "Price is the main reason customers leave", "Only sales teams affect retention"], 1],
        ["detail", "According to research, why do customers usually leave?", ["Price alone", "Feeling ignored or problems handled badly", "Better advertising elsewhere", "Long contracts"], 1],
        ["inference", "Why does the writer mention 'unclear invoices'?", ["To show finance teams also affect customer loyalty", "To criticise accountants", "To explain tax rules", "To recommend new software"], 0],
        ["vocab", "'Deserves their trust' means the company…", ["has earned the right to be trusted", "has lost trust", "pays for trust", "needs more customers"], 0],
      ],
      summary: "Explain in 2–3 sentences why customers leave and what keeps them.",
    },
    writing: {
      type: "opinion",
      prompt: "Think of a company you stopped using (a bank, shop, app, supplier). Why did you leave? Was it price or something else? What could they have done to keep you?",
      min: 110,
      max: 170,
    },
    speaking: {
      type: "opinion",
      prompt: "Give a 2-minute opinion: 'In my company, the finance/accounting team also affects customer loyalty.' Agree or disagree, with concrete examples.",
      sec: 120,
    },
  },
];
