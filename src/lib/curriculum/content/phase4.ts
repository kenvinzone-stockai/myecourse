import type { DaySeed } from "../seed";

// Phase 4 — Advanced Integration (Days 70–89). Original material.
// Almost every day follows the Reading → Writing → Speaking pipeline.

export const PHASE4: DaySeed[] = [
  // ───────────────────────── Week 11 · Energy, science & sustainability
  {
    day: 71,
    title: "The energy transition is also a finance question",
    objective: "Analyse a complex argument, identify its claim and evidence, then respond in writing and speech.",
    vocab: [
      "transition | the process of changing from one state to another | | The energy transition will take decades. | a smooth transition",
      "capital-intensive | requiring a lot of investment | | Offshore wind is highly capital-intensive. | ",
      "cost of capital | the price of the money used to finance a project | | A lower cost of capital makes projects viable. | ",
      "viable | able to work successfully | | The project is not financially viable yet. | commercially viable",
      "stranded asset | an asset that loses value earlier than expected | | Old plants could become stranded assets. | ",
      "incentive | something that encourages an action | | Tax incentives support renewables. | create an incentive",
    ],
    reading: {
      title: "The energy transition is also a finance question",
      text: `Public debates about the energy transition usually focus on technology: how efficient solar panels have become, how large wind turbines can be, how quickly batteries are improving. These advances are real and important. Yet for many countries, the main obstacle to cleaner energy is no longer technical. It is financial.

Renewable projects have an unusual cost structure. A gas power plant has moderate construction costs but must buy fuel for its entire life. A solar farm or offshore wind farm, by contrast, requires almost all of its spending upfront; once built, its "fuel" is free. This makes renewables highly capital-intensive, and therefore unusually sensitive to the cost of capital. When interest rates are high or investors see a country as risky, the same wind farm can cost significantly more over its lifetime, and a project that is viable in one country may not be viable in another.

This helps explain why investment in clean energy remains concentrated in wealthier economies, even though many emerging economies have excellent sun and wind resources. Policies that reduce risk — stable regulation, long-term power purchase agreements, guarantees from development banks — can matter as much as subsidies.

The transition also creates financial risk for existing businesses. Assets designed to operate for thirty years may become stranded if demand for fossil fuels falls faster than expected. At the same time, many existing skills, from offshore engineering to project finance, are directly transferable to new energy industries. For companies in oil and gas services, the question is not only whether the transition will happen, but how quickly and on what terms.

Understanding the transition, in other words, requires reading balance sheets as well as engineering reports.`,
      q: [
        ["main", "What is the writer's central claim?", ["Renewable technology is still too weak", "The main obstacle to clean energy in many countries is financial, not technical", "Gas is cheaper than wind", "Oil and gas companies will disappear soon"], 1],
        ["detail", "Why are renewables sensitive to the cost of capital?", ["Their fuel is expensive", "Almost all their spending is upfront", "They need constant maintenance", "They are always in risky countries"], 1],
        ["inference", "Why does investment remain concentrated in wealthier economies?", ["They have better sun and wind", "Lower perceived risk and cheaper capital", "They have fewer engineers", "They don't use gas"], 1],
        ["detail", "Which is described as reducing risk?", ["Higher interest rates", "Stable regulation and long-term contracts", "Short-term subsidies only", "Building more gas plants"], 1],
        ["purpose", "Why does the writer mention offshore engineering skills?", ["To show that existing industries can transfer skills to new energy", "To criticise engineers", "To argue against the transition", "To explain solar panels"], 0],
      ],
      summary: "Identify the claim, two pieces of supporting reasoning, and the conclusion.",
    },
    writing: {
      type: "summary",
      prompt: "Write a 150–180 word analytical summary: the claim, the reasoning about cost structure and capital, the implications for existing companies, and your own one-sentence response.",
      min: 150,
      max: 200,
    },
    speaking: {
      type: "summary",
      prompt: "Explain the article's argument to a colleague in an oil and gas services company in 2 minutes, then say what it means for companies like yours. Do not read your summary.",
      sec: 150,
    },
  },
  {
    day: 72,
    title: "Sounding precise: hedging and cautious language",
    objective: "Use hedging to make claims accurate and professional rather than absolute.",
    vocab: [
      "appear to | to seem to (based on evidence) | | Costs appear to be stabilising. | ",
      "tend to | to usually happen or behave in a certain way | | Small firms tend to be hit hardest. | ",
      "it is likely that | probably | | It is likely that demand will recover. | highly likely",
      "to a large extent | mostly | | The result was, to a large extent, expected. | ",
      "arguably | it can be argued that | | This is arguably our biggest risk. | ",
      "suggest | (of evidence) to indicate | | The data suggests a slowdown. | ",
    ],
    grammar: {
      p: "Hedging: modal verbs, cautious verbs and qualifiers",
      e: "In professional analysis, absolute claims ('This will fail', 'Customers always…') sound unreliable. Hedging makes claims match the evidence: modals (may, might, could), cautious verbs (appear to, seem to, tend to, suggest, indicate), qualifiers (likely, possibly, to some extent, in most cases). But don't over-hedge: one hedge per claim is usually enough.",
      vi: "Hedging = nói thận trọng, đúng mức bằng chứng. Tránh khẳng định tuyệt đối (always, never, will definitely). Đừng dùng quá nhiều 'may/might' trong một câu.",
      ex: ["Absolute: Prices will fall next year. → Hedged: Prices are likely to fall slightly next year.", "The figures suggest that demand may be slowing.", "Remote teams tend to communicate more in writing.", "This is arguably the most important risk, although it is difficult to measure."],
    },
    reading: {
      title: "Model text: a hedged analysis",
      text: `The first-quarter results suggest that the cost-saving programme is, to a large extent, working. Overheads appear to have fallen by around 6%, although part of this is likely to be seasonal. Maintenance costs remain the main uncertainty: they tend to rise in the second half of the year, and the current fleet may require more repairs than budgeted. Arguably, the bigger risk is not cost but timing — if large customers continue to pay late, cash could become tight in Q3.`,
      q: [
        ["detail", "Why might the fall in overheads be partly misleading?", ["It might be partly seasonal", "The figures are wrong", "The programme stopped", "Maintenance fell"], 0],
        ["purpose", "What effect does hedging have in this text?", ["It makes the analysis sound careful and credible", "It hides all the information", "It makes the writer sound uncertain about everything", "It makes the text informal"], 0],
      ],
    },
    writing: {
      type: "report",
      prompt: "Rewrite these absolute claims with appropriate hedging, then write a 100–140 word hedged analysis of a trend you know (in your work, your industry, or your English progress). Claims: (1) Our costs will fall next year. (2) Customers always prefer the cheapest option. (3) The new system caused the delays.",
      min: 120,
      max: 190,
    },
    speaking: {
      type: "presentation",
      prompt: "Present your analysis as if to a cautious senior manager. Use at least five hedging expressions naturally, and clearly separate what you know from what you think.",
      sec: 120,
    },
  },
  {
    day: 73,
    title: "Why long-term risks are hard to take seriously",
    objective: "Read an argument about decision-making over time, then discuss it with examples.",
    vocab: [
      "discount | (here) to give less importance to something | | We discount future risks. | ",
      "short-termism | focusing on immediate results instead of long-term ones | | Quarterly targets encourage short-termism. | ",
      "abstract | existing as an idea rather than something concrete | | Distant risks feel abstract. | ",
      "tangible | real and able to be seen or measured | | Tangible benefits are easier to sell. | ",
      "incremental | increasing gradually in small amounts | | Incremental changes go unnoticed. | ",
      "trade-off | a balance between two competing things | | the trade-off between today and tomorrow | ",
    ],
    reading: {
      title: "Why long-term risks are hard to take seriously",
      text: `People are remarkably good at responding to immediate dangers and remarkably poor at responding to slow, distant ones. A fire in the building produces instant action; a gradual rise in sea levels, a slowly ageing workforce, or an outdated IT system produces meetings, reports and delay. This is not simply laziness. It reflects several well-documented features of human decision-making.

The first is that we discount the future. A cost today feels larger than the same cost in ten years, and a benefit far in the future feels smaller than a benefit now. Some discounting is reasonable — the future is uncertain — but we often apply far more than the uncertainty justifies.

The second is that long-term risks are abstract while short-term costs are tangible. Investing in new controls or training has a clear price this year; the disaster it prevents may never visibly happen, so success looks like nothing at all. Managers who prevent problems are rarely celebrated as much as managers who solve crises.

Third, many long-term problems develop incrementally. Each year's change is small enough to ignore, so there is no obvious moment to act. Organisations may also reinforce short-termism through quarterly targets and bonuses tied to annual results.

Some institutions try to correct these biases by making the future more concrete: scenario planning, risk registers with named owners, or decision rules that are agreed in advance — for example, "if staff turnover exceeds 15%, we review salaries automatically." These tools do not remove the trade-off between today and tomorrow, but they make it visible.`,
      q: [
        ["main", "What does the article explain?", ["Why fires are dangerous", "Why people and organisations underreact to slow, long-term risks", "How to calculate discount rates", "Why bonuses should be removed"], 1],
        ["detail", "Why are managers who prevent problems rarely celebrated?", ["Successful prevention looks like nothing happening", "They are not senior", "They spend too much", "They cause crises"], 0],
        ["detail", "What is an example of a 'decision rule agreed in advance'?", ["Holding more meetings", "Automatically reviewing salaries if turnover exceeds 15%", "Annual bonuses", "Ignoring small changes"], 1],
        ["inference", "Why does incremental change make action difficult?", ["There is no obvious moment that demands action", "It is too expensive", "It happens too fast", "It is illegal"], 0],
        ["vocab", "'Some discounting is reasonable' — here 'discounting' means…", ["selling at a lower price", "giving less weight to future events", "removing risks", "measuring time"], 1],
      ],
      summary: "Explain the three reasons and one solution in 4 sentences.",
    },
    writing: {
      type: "opinion",
      prompt: "Choose a slow, long-term risk (in your company, your industry, your city or your personal life). Explain why it is not taken seriously, using two ideas from the text, and propose one concrete decision rule.",
      min: 150,
      max: 200,
    },
    speaking: {
      type: "opinion",
      prompt: "Speak for 2 minutes: 'Our organisations reward crisis-solvers more than problem-preventers.' Do you agree? Use examples and at least two hedging expressions.",
      sec: 120,
    },
  },
  {
    day: 74,
    title: "Writing an executive summary",
    objective: "Condense a complex text into an executive summary and use contrastive stress in speech.",
    vocab: [
      "key takeaway | the most important point to remember | | The key takeaway is that timing matters. | ",
      "condense | to make shorter while keeping the main ideas | | Condense the report to one page. | ",
      "at a glance | quickly, with one look | | The table shows the results at a glance. | ",
      "implication | a possible future effect or result | | What are the implications for us? | ",
      "actionable | able to be acted on | | Give actionable recommendations. | ",
      "bottom line | the most important fact or result | | The bottom line is that we need more time. | ",
    ],
    pron: {
      focus: "Contrastive stress",
      tip: "Stress the word that carries the contrast or new information: 'The problem isn't the COST — it's the TIMING.' 'We need FEWER meetings, not SHORTER ones.' Moving stress changes the meaning, so it is a powerful tool in presentations.",
      items: ["The problem isn't the COST — it's the TIMING.", "We don't need MORE data; we need BETTER data.", "REVENUE went up, but PROFIT went down.", "I said MARCH, not MAY."],
    },
    reading: {
      title: "Model text: an executive summary",
      text: `Executive summary — Long-term risk review

Bottom line: our most serious risks are slow-moving, not sudden. Three require action this year.

1. Workforce ageing: 30% of senior technical staff will retire within eight years. Recommendation: launch a structured knowledge-transfer programme by Q2.
2. Outdated finance systems: maintenance costs are rising 10% a year and vendor support ends in 2028. Recommendation: approve a replacement study.
3. Customer concentration: two clients account for 55% of revenue. Recommendation: set a target to diversify.

Key takeaway: none of these risks is urgent today, which is precisely why they need owners and deadlines now.`,
      q: [
        ["detail", "What percentage of revenue comes from two clients?", ["30%", "10%", "55%", "28%"], 2],
        ["purpose", "Why does the summary begin with 'Bottom line'?", ["To give the main conclusion immediately", "To mention costs", "To list risks", "To thank the reader"], 0],
      ],
    },
    writing: {
      type: "report",
      prompt: "Write an executive summary (120–170 words) of yesterday's article or of a real situation at work: bottom line, 2–3 numbered points each with a recommendation, and a key takeaway.",
      min: 120,
      max: 180,
    },
    speaking: {
      type: "presentation",
      prompt: "Present your executive summary in 90 seconds as if the CEO only has two minutes. Use contrastive stress at least three times.",
      sec: 90,
    },
  },
  {
    day: 75,
    title: "Carbon pricing: for and against",
    objective: "Integrated: analyse a two-sided debate, write an argumentative response, then defend it orally.",
    vocab: [
      "carbon price | a cost placed on greenhouse gas emissions | | A carbon price makes polluting more expensive. | ",
      "emissions | gases released into the air | | Emissions fell by 4% last year. | reduce emissions",
      "regressive | affecting poorer people more than richer people | | Fuel taxes can be regressive. | ",
      "competitiveness | the ability to compete successfully | | Exporters worry about competitiveness. | ",
      "revenue-neutral | not increasing total government income | | The tax could be revenue-neutral. | ",
      "market mechanism | using prices instead of rules to change behaviour | | Carbon pricing is a market mechanism. | ",
    ],
    reading: {
      title: "Should polluters pay? The debate over carbon pricing",
      text: `Most economists agree on one point about climate policy: the cheapest way to reduce emissions is usually to put a price on them. Whether through a tax or a system of tradable permits, a carbon price makes activities that produce greenhouse gases more expensive, encouraging businesses and consumers to find cleaner alternatives. Unlike detailed regulations, it does not require governments to decide which technology is best; it lets the market find the lowest-cost reductions.

Supporters point out that a carbon price corrects a basic market failure. When a factory emits carbon dioxide, it imposes costs — such as climate damage — on people who are not part of the transaction. Pricing those costs gives businesses a reason to include them in their decisions. The revenue can be used to cut other taxes or returned directly to households, making the policy revenue-neutral.

Critics raise three main objections. First, carbon prices can be regressive: poorer households spend a larger share of their income on energy, so they feel price increases more. Second, if one country introduces a high carbon price and its trading partners do not, its industries may lose competitiveness, and production may simply move abroad without reducing global emissions. Third, carbon prices are politically difficult; in several countries, rising fuel costs have led to protests and the policy has been weakened.

Supporters reply that these problems can be managed. Returning revenue as equal payments to every citizen can leave most low-income households better off. Border adjustments — charging importers for the carbon in their products — can protect domestic industry. The debate today is therefore less about whether carbon pricing works in theory than about whether it can be designed to be fair and politically durable.`,
      q: [
        ["main", "What is the current focus of the debate, according to the writer?", ["Whether carbon pricing works in theory", "Whether it can be designed to be fair and politically durable", "Which technology is best", "Whether emissions matter"], 1],
        ["detail", "Why is carbon pricing called a 'market mechanism'?", ["It lets prices, not governments, find the cheapest reductions", "It is run by banks", "It creates new markets for cars", "It is voluntary"], 0],
        ["detail", "Why can carbon prices be regressive?", ["Rich people pay nothing", "Poorer households spend a larger share of income on energy", "Companies pay less", "Revenue is returned"], 1],
        ["inference", "What is the purpose of border adjustments?", ["To protect domestic industry from competitors without carbon prices", "To stop all imports", "To increase protests", "To reduce revenue"], 0],
        ["purpose", "How is the article structured?", ["Problem → history", "Context → supporters → critics → responses → conclusion", "Story → moral", "Data → prediction"], 1],
      ],
      summary: "Summarise the main argument for, the three objections, and the responses.",
    },
    writing: {
      type: "opinion",
      prompt: "Write an argumentative response (170–220 words): Should Vietnam introduce a carbon price in the next five years? State your position, address at least one opposing argument, and use hedging where appropriate.",
      min: 170,
      max: 230,
    },
    speaking: {
      type: "opinion",
      prompt: "Defend your position for 2–3 minutes as if in a panel discussion. Then answer this challenge aloud: 'Wouldn't this make life harder for poor families?'",
      sec: 180,
    },
  },
  {
    day: 76,
    title: "Challenge: handling difficult questions",
    objective: "Respond to challenging questions calmly: buy time, clarify, answer, and bridge.",
    vocab: [
      "that's a good question | a phrase to acknowledge and buy time | | That's a good question — let me think. | ",
      "if I understand correctly | used to check a question | | If I understand correctly, you're asking about cost? | ",
      "I don't have the figure to hand | I don't have the number with me now | | I don't have the exact figure to hand, but I'll send it today. | ",
      "to put it another way | to rephrase | | To put it another way, the risk is manageable. | ",
      "come back to you | to reply later | | Can I come back to you on that? | ",
      "the key point is | used to bring the answer back to your main message | | The key point is that we stay within budget. | ",
    ],
    reading: {
      title: "Model text: answering a hard question",
      text: `Question: "Your pilot saved time, but isn't the AI tool too risky for financial data?"
Answer: "That's an important question. If I understand correctly, your concern is data privacy, not accuracy — is that right? … OK. We used only the company-approved tool, and no client names or account numbers were entered. I don't have the IT security report to hand, but I'll send it to you this afternoon. To put it another way, the risk is controlled by design rather than by trust. So the key point is that we can expand the pilot without changing our data rules."`,
      q: [
        ["detail", "What does the speaker do first?", ["Answer immediately", "Acknowledge and clarify the question", "Change the topic", "Refuse to answer"], 1],
        ["purpose", "Why does the speaker end with 'the key point is…'?", ["To bring the answer back to the main message", "To end the meeting", "To admit failure", "To ask another question"], 0],
      ],
    },
    writing: {
      type: "sentences",
      prompt: "Predict four difficult questions someone might ask about a proposal or report of yours. Write a short, structured answer to each (acknowledge → clarify/answer → bridge to your key point).",
      min: 140,
      max: 220,
    },
    speaking: {
      type: "answer",
      prompt: "Answer each tough question aloud in 30–40 seconds, using today's phrases: (1) 'Why should we trust your numbers?' (2) 'Isn't this too expensive right now?' (3) 'What happens if it fails?' (4) 'Why wasn't this done earlier?'",
      sec: 160,
    },
  },

  // ───────────────────────── Week 12 · Arguments & modern-life debates
  {
    day: 78,
    title: "Analysing an argument: the four-day week",
    objective: "Separate claims, evidence and assumptions in an opinion article, then evaluate it.",
    vocab: [
      "claim | a statement that something is true, which may need proof | | The main claim is that productivity rises. | make a claim",
      "underlying assumption | a belief that an argument depends on but doesn't state | | The underlying assumption is that all jobs are similar. | ",
      "generalise | to make a general statement from limited examples | | It's risky to generalise from one trial. | ",
      "self-selected | chosen by themselves, so not random | | The companies in the trial were self-selected. | ",
      "trial | a test of something over a period | | a six-month trial | run a trial",
      "compelling | very convincing | | a compelling argument | ",
    ],
    reading: {
      title: "Opinion: it's time for the four-day week",
      text: `The five-day working week is a hundred-year-old habit, designed for factories rather than offices. It is time to change it. Trials of a four-day week, in which employees work 80% of the hours for 100% of the pay while maintaining their output, have produced remarkable results. In a well-known British trial involving around sixty companies, most firms chose to continue the policy afterwards, reporting similar or higher revenue, lower staff turnover and fewer sick days.

The logic is simple. Much of the modern working week is wasted in unnecessary meetings, constant interruptions and tasks that expand to fill the time available. When people know they have only four days, they prioritise ruthlessly. Rested employees also make better decisions and are less likely to burn out. Companies that offer a four-day week find it easier to attract talent, a major advantage in a competitive labour market.

Critics claim that the model cannot work in hospitals, shops or factories. But this misses the point: the principle is not a fixed schedule but a reduction in working time, which can be organised through rotas. The real barrier is not practicality but tradition. Every reduction in working hours in history — from six days to five — was once called impossible.

Businesses should stop asking whether the four-day week can work and start asking how to make it work for them.`,
      q: [
        ["main", "What is the writer's main claim?", ["Trials are unreliable", "Companies should adopt a four-day week", "Hospitals need longer hours", "Meetings are useful"], 1],
        ["inference", "Which assumption does the argument rely on?", ["That results from trial companies apply to most businesses", "That workers dislike holidays", "That revenue always falls", "That factories are modern"], 0],
        ["inference", "Why might the trial evidence be weaker than the writer suggests?", ["The companies volunteered, so they may have been well suited to it", "It was too long", "It included hospitals", "Revenue fell sharply"], 0],
        ["purpose", "Why does the writer mention the move from six days to five?", ["To suggest that resistance to change is historically common", "To give exact data", "To criticise factories", "To describe the trial"], 0],
        ["vocab", "'Prioritise ruthlessly' means…", ["choose what matters very strictly", "work without breaks", "treat colleagues badly", "avoid all decisions"], 0],
      ],
      summary: "Write the claim, two pieces of evidence, and one hidden assumption.",
    },
    writing: {
      type: "opinion",
      prompt: "Write a 170–220 word evaluation of the article: What is convincing? What is weak or missing (evidence, assumptions, counter-arguments)? Would a four-day week work in your company? Use hedging.",
      min: 170,
      max: 230,
    },
    speaking: {
      type: "opinion",
      prompt: "In 2–3 minutes: summarise the writer's argument fairly, give one strength and one weakness, and state your own conclusion for your company.",
      sec: 180,
    },
  },
  {
    day: 79,
    title: "Advanced linking for clear arguments",
    objective: "Use a wider range of linking devices to show logic: contrast, cause, concession and addition.",
    vocab: [
      "whereas | used to compare two contrasting facts | | Revenue rose, whereas profit fell. | ",
      "nevertheless | despite what has just been said | | The plan is risky; nevertheless, it's worth trying. | ",
      "consequently | as a result | | Prices rose; consequently, demand fell. | ",
      "given that | considering that | | Given that budgets are tight, we should wait. | ",
      "not only… but also | used to add a stronger point | | It is not only cheaper but also faster. | ",
      "even though | despite the fact that | | Even though the trial worked, the sample was small. | ",
    ],
    grammar: {
      p: "Cohesion: linking ideas precisely",
      e: "Contrast: whereas, while, on the other hand. Concession (accepting a point but continuing): although/even though + clause, despite/in spite of + noun/-ing, nevertheless/however (new sentence). Cause & effect: because, given that, consequently, as a result, therefore. Addition: moreover, furthermore, not only… but also (note inversion at the start: 'Not only does it save time, but it also…').",
      vi: "Dùng từ nối chính xác giúp lập luận chặt chẽ. Chú ý cấu trúc: despite + N/V-ing; although + mệnh đề; 'Not only' đứng đầu câu cần đảo ngữ.",
      ex: ["Although the trial was successful, the companies chose to take part.", "Despite the higher cost, the new system is likely to pay for itself.", "Given that our clients work weekends, a four-day week would require rotas.", "Not only does the policy reduce turnover, but it also attracts talent."],
    },
    reading: {
      title: "Model text: a cohesive argument paragraph",
      text: `Although the four-day week has produced impressive results in trials, it would be difficult to introduce in our company. Our offshore operations run continuously, whereas office trials mostly involved companies with flexible schedules. Moreover, given that our clients expect support seven days a week, any reduction in hours would require complex rotas. Nevertheless, some elements could be adopted. Not only could we reduce unnecessary meetings, but we could also offer compressed hours to office staff. Consequently, the real question is not whether to adopt the model completely, but which parts fit our operations.`,
      q: [
        ["detail", "Why would the four-day week be difficult for this company?", ["Its offshore operations run continuously and clients expect constant support", "Its staff don't want it", "It's too expensive", "It has no meetings"], 0],
        ["vocab", "Which word introduces a concession followed by a positive point?", ["whereas", "moreover", "nevertheless", "given that"], 2],
      ],
    },
    writing: {
      type: "opinion",
      prompt: "Write a cohesive paragraph (150–200 words) on a debatable topic from your work or society. Use at least six different linking devices from today's lesson, including one 'Not only… but also' with inversion.",
      min: 150,
      max: 210,
    },
    speaking: {
      type: "opinion",
      prompt: "Give a 2-minute spoken argument on the same topic. Spoken English uses simpler links — notice which ones you use naturally (but, so, because, although) and add at least two advanced ones.",
      sec: 120,
    },
  },
  {
    day: 80,
    title: "Are we more informed — or just more alerted?",
    objective: "Read a critical essay about news and attention; discuss your own information habits.",
    vocab: [
      "headline | the title of a news article | | Most people only read the headline. | ",
      "algorithm | a set of rules a computer follows to make decisions | | The algorithm decides what you see. | ",
      "outrage | strong anger and shock | | Content that causes outrage spreads faster. | ",
      "echo chamber | a situation where you only hear opinions like your own | | Social media can create echo chambers. | ",
      "context | the background information needed to understand something | | The story lacked context. | in context",
      "curate | to select carefully | | I curate my news sources. | ",
    ],
    reading: {
      title: "More informed, or just more alerted?",
      text: `We have more access to news than any generation in history. A smartphone delivers headlines from around the world within seconds, and social media lets anyone report events as they happen. It would be natural to assume that people are therefore better informed. Yet many surveys suggest the opposite: people feel overwhelmed by news while understanding major issues no better, and sometimes worse, than before.

Part of the explanation lies in how information now reaches us. Most people do not choose articles from a newspaper; they receive content selected by algorithms designed to maximise attention. Content that triggers strong emotions — fear, surprise, outrage — keeps people scrolling, so it spreads further. Calm, complex explanations, which require time to read, travel less well.

The format matters too. A stream of short updates creates a feeling of being informed, but each update usually lacks context: why something happened, how it compares with the past, what it means. Knowing that a currency fell 2% today is not the same as understanding why exchange rates move. Over time, frequent alerts may increase anxiety without increasing knowledge.

Finally, personalised feeds can create echo chambers, in which people mainly see opinions that confirm their own. Some researchers argue that this effect is smaller than often claimed, since many users do encounter opposing views — but often in a hostile, mocking form that hardens disagreement rather than encouraging understanding.

The solution is not to stop following the news but to change the diet: fewer alerts, more depth. Some people now curate a small number of reliable sources, read a weekly summary instead of hourly updates, and occasionally read a thoughtful writer they disagree with.`,
      q: [
        ["main", "What is the essay's main argument?", ["People should stop following news", "More access to news has not made people better informed, partly because of how news is delivered", "Algorithms are illegal", "Newspapers were always better"], 1],
        ["detail", "Why does emotional content spread further?", ["It is more accurate", "Algorithms promote what keeps attention", "Journalists prefer it", "It is shorter"], 1],
        ["detail", "What does the currency example show?", ["Facts without context are not understanding", "Exchange rates are unpredictable", "News is always wrong", "People should invest"], 0],
        ["inference", "How does the writer treat the echo-chamber idea?", ["As certainly true", "With some qualification, mentioning research that suggests a smaller effect", "As a myth", "As irrelevant"], 1],
        ["detail", "Which is NOT a suggested habit?", ["Curating reliable sources", "Reading weekly summaries", "Turning on more alerts", "Reading writers you disagree with"], 2],
      ],
      summary: "Give the claim and the three explanations in 4 sentences.",
    },
    writing: {
      type: "paragraph",
      prompt: "Analyse your own 'information diet': where does your news come from, how often, and does it make you better informed? Propose a realistic new diet for the next month — including English-language sources.",
      min: 150,
      max: 210,
    },
    speaking: {
      type: "opinion",
      prompt: "Discuss for 2 minutes: 'Social media makes people less informed.' Give a nuanced view — agree to some extent, but add a qualification and an example.",
      sec: 120,
    },
  },
  {
    day: 81,
    title: "Writing a persuasive professional post",
    objective: "Write a concise persuasive post; reduce filler words and control rhythm when speaking.",
    vocab: [
      "hook | an opening that grabs attention | | Start with a strong hook. | ",
      "counterintuitive | different from what you would expect | | The counterintuitive lesson: slower was faster. | ",
      "resonate | to feel familiar or meaningful to someone | | The story resonated with many readers. | resonate with",
      "takeaway | a key idea to remember | | Three takeaways from our project | ",
      "concise | short and clear | | Keep posts concise. | ",
      "call to action | a sentence encouraging the reader to do something | | End with a call to action. | ",
    ],
    pron: {
      focus: "Rhythm & reducing fillers",
      tip: "Fillers (um, uh, like, you know) are normal, but too many make you sound unsure. Replace them with a short silent pause — silence sounds confident. Keep a steady rhythm: stressed words land at regular intervals, and unstressed words are squeezed between them.",
      items: ["(pause) instead of 'um'", "The LESson / was SIMple: / TEST / EARly.", "We CUT / REPORTing TIME / by HALF.", "Let me THINK / about THAT / for a SECond."],
    },
    reading: {
      title: "Model text: a persuasive professional post",
      text: `We automated our monthly reports — and the biggest win wasn't time.

Yes, we cut reporting time by half. But the counterintuitive lesson was this: automation forced us to agree on definitions. For years, three teams had calculated "project margin" in three different ways. Before any tool could help, we had to sit down and choose one.

Three takeaways:
1. Fix the definitions before the technology.
2. Start with one report, not twenty.
3. Keep a human review step — it builds trust.

If your team is planning an automation project, start with a one-page glossary. It may be the most valuable document you write this year.`,
      q: [
        ["purpose", "What is the function of the first line?", ["A hook that creates curiosity", "A conclusion", "A disclaimer", "A list of data"], 0],
        ["detail", "What was the counterintuitive lesson?", ["Automation saves no time", "Automation forced the teams to agree on definitions", "Tools are expensive", "Humans are not needed"], 1],
      ],
    },
    writing: {
      type: "opinion",
      prompt: "Write a short professional post (like LinkedIn) sharing a lesson from your work or from these 90 days of learning English: hook, short story, counterintuitive insight, 2–3 takeaways, call to action.",
      min: 120,
      max: 190,
    },
    speaking: {
      type: "presentation",
      prompt: "Turn your post into a 90-second talk. Record it twice: first naturally, then again replacing every filler with a silent pause. Compare the two recordings.",
      sec: 90,
    },
  },
  {
    day: 82,
    title: "Should cash disappear?",
    objective: "Integrated: synthesise a multi-perspective text into a balanced argument, then present it.",
    vocab: [
      "cashless | without using physical money | | Sweden is close to becoming cashless. | ",
      "financial inclusion | access to useful financial services for everyone | | Mobile payments improved financial inclusion. | ",
      "traceable | possible to follow or track | | Digital payments are traceable. | ",
      "resilience | the ability to recover from problems | | Cash adds resilience during outages. | ",
      "unbanked | without a bank account | | Millions of people are still unbanked. | ",
      "privacy | the right to keep personal matters private | | Cash protects privacy. | ",
    ],
    reading: {
      title: "Should cash disappear?",
      text: `In many cities, cash is quietly disappearing. Customers pay for coffee with a QR code, taxi fares are charged automatically, and some shops no longer accept banknotes at all. In Vietnam, the number of cashless transactions has grown rapidly in recent years, supported by mobile banking and government policy. Should societies encourage this trend until cash disappears completely?

Supporters of a cashless economy emphasise efficiency and transparency. Digital payments are fast and cheap to process, and they reduce the costs of printing, transporting and protecting cash. Because digital transactions are traceable, they make tax evasion, corruption and money laundering harder. For businesses, they simplify accounting and reconciliation. Mobile payments can also promote financial inclusion: in some countries, people who were previously unbanked now save and borrow using their phones.

Opponents warn that a fully cashless society carries real risks. Elderly people and those with limited digital skills may be excluded from everyday life. Digital systems can fail — during power cuts, network outages or cyber-attacks — and cash provides resilience when they do. Privacy is another concern: every digital payment leaves a record that companies or governments could monitor. Finally, if private payment companies control most transactions, they may gain significant power over fees and access.

Several countries that moved quickly towards cashless payments have now slowed down. Sweden, often cited as the most cashless society, has introduced rules to ensure that banks continue to provide cash services, citing emergency preparedness. The emerging consensus seems to be that digital payments should be encouraged, but cash should remain available as a public option — a back-up rather than the default.`,
      q: [
        ["main", "What is the overall conclusion?", ["Cash should be banned", "Digital payments should grow but cash should remain available", "Digital payments are too risky", "Vietnam should copy Sweden exactly"], 1],
        ["detail", "Which is an argument for a cashless economy?", ["Privacy", "Resilience during outages", "Traceability reducing tax evasion", "Inclusion of elderly people"], 2],
        ["detail", "Why has Sweden introduced rules about cash?", ["To reduce costs", "For emergency preparedness", "To stop QR codes", "To increase bank profits"], 1],
        ["inference", "What concern lies behind the point about private payment companies?", ["They may gain too much control over fees and access", "They are too small", "They don't use technology", "They print cash"], 0],
        ["vocab", "'A back-up rather than the default' means cash should be…", ["the normal method", "an alternative available when needed", "forbidden", "only for banks"], 1],
      ],
      summary: "Synthesise: two arguments for, three against, and the consensus.",
    },
    writing: {
      type: "opinion",
      prompt: "Write a balanced argument essay (180–230 words): 'Vietnam should aim to become a fully cashless society by 2035.' Present both sides fairly, then reach a reasoned conclusion. Use advanced linking and hedging.",
      min: 180,
      max: 240,
    },
    speaking: {
      type: "presentation",
      prompt: "Present your argument as a 3-minute talk with a clear opening, two sides, and conclusion. Use signposting. Record it without reading your essay.",
      sec: 180,
    },
  },
  {
    day: 83,
    title: "Challenge: impromptu speaking with PREP",
    objective: "Answer unexpected questions fluently using Point–Reason–Example–Point.",
    vocab: [
      "off the top of my head | without time to check or prepare | | Off the top of my head, I'd say about 20%. | ",
      "the way I see it | in my opinion | | The way I see it, timing matters most. | ",
      "for instance | for example | | For instance, last month we… | ",
      "that's why | for this reason | | That's why I believe… | ",
      "let me put it this way | used before explaining differently | | Let me put it this way: it's an investment. | ",
      "all things considered | after thinking about everything | | All things considered, I'd support it. | ",
    ],
    reading: {
      title: "Model answer using PREP",
      text: `Question: "What's the most useful skill for a young accountant today?"
Point: "The way I see it, the most useful skill is explaining numbers clearly."
Reason: "Software can produce reports, but managers still need someone to tell them what the numbers mean."
Example: "For instance, last quarter our costs rose 8%. The report showed it, but only when we explained it was mainly one-off repairs did management relax."
Point: "That's why, all things considered, communication is as important as technical knowledge."`,
      q: [
        ["detail", "What is the Example in this answer?", ["Software produces reports", "Costs rose 8% because of one-off repairs", "Communication is important", "Young accountants"], 1],
        ["purpose", "Why does the answer repeat the point at the end?", ["To make the message clear and memorable", "Because the speaker forgot", "To change opinion", "To ask a question"], 0],
      ],
    },
    writing: {
      type: "sentences",
      prompt: "Write PREP answers (4 short parts each) to two questions: (1) 'What makes a good manager?' (2) 'Is it better to work for a big company or a small one?'",
      min: 120,
      max: 200,
    },
    speaking: {
      type: "answer",
      prompt: "Impromptu round — take 5 seconds to think, then answer each with PREP in about 45 seconds: (1) What's one thing you would change about your city? (2) Should children learn English from age 3? (3) What's the best advice you've ever received? (4) Is it possible to be productive working from home?",
      sec: 180,
    },
  },

  // ───────────────────────── Week 13 · Capstone
  {
    day: 85,
    title: "What makes an explanation stick",
    objective: "Read about memorable explanations and apply the principles to explain an idea from your field.",
    vocab: [
      "stick | (of an idea) to be remembered | | Stories make ideas stick. | ",
      "analogy | a comparison that explains something by its similarity to something else | | A good analogy makes complex ideas simple. | draw an analogy",
      "jargon | specialised words that outsiders don't understand | | Avoid jargon with non-experts. | ",
      "curse of knowledge | difficulty imagining what it's like not to know something | | Experts suffer from the curse of knowledge. | ",
      "concrete | specific and real, not abstract | | Give a concrete example. | ",
      "unpack | to explain something in detail, step by step | | Let me unpack that idea. | ",
    ],
    reading: {
      title: "What makes an explanation stick?",
      text: `Most of us have sat through a presentation by an expert who clearly knew the subject but left the audience confused. The problem is rarely intelligence. Psychologists describe it as the "curse of knowledge": once we understand something well, we find it very difficult to imagine what it is like not to understand it. We skip steps that seem obvious, use jargon without noticing, and talk in abstractions.

Research on memorable communication suggests several ways to break the curse. The first is to start from what the listener already knows. An analogy builds a bridge between a familiar idea and a new one. Explaining cash flow as "the difference between your salary arriving and your rent leaving" is not perfectly precise, but it gives the listener somewhere to stand.

The second is to be concrete. Abstract statements like "we need to improve operational efficiency" disappear from memory almost immediately. A specific example — "each invoice is checked by three people, and two of those checks find nothing" — creates a picture the listener can hold.

The third is to create a reason to listen. People remember answers to questions they care about. Beginning with a puzzle or surprising fact ("Why did our profit fall in a year when sales grew?") makes the audience want the explanation that follows.

Finally, good explainers check understanding instead of assuming it. Asking someone to explain the idea back in their own words — sometimes called "teach-back" — quickly reveals what was clear and what was not. This applies equally to language learning: if you can explain an idea simply in English, without notes, you truly own both the idea and the language.`,
      q: [
        ["main", "What is the article about?", ["Why experts are confusing and how to explain things memorably", "How to become an expert", "Why jargon is necessary", "How to calculate cash flow"], 0],
        ["detail", "What is the 'curse of knowledge'?", ["Knowing too many languages", "Difficulty imagining not understanding something you know well", "Forgetting what you learned", "Using too many examples"], 1],
        ["detail", "Why start with a puzzle or surprising fact?", ["It creates a reason to listen", "It shortens the talk", "It replaces examples", "It impresses managers"], 0],
        ["inference", "How does the last paragraph connect to language learning?", ["Explaining an idea simply without notes shows real mastery", "Language learners shouldn't explain ideas", "Teach-back is only for teachers", "Notes are essential"], 0],
      ],
      summary: "List the four techniques with one example each.",
    },
    writing: {
      type: "explanation",
      prompt: "Choose a complex idea from your field (e.g. depreciation, accruals, working capital, a trading concept). Write an explanation for a smart non-expert using all four techniques: a puzzle, an analogy, a concrete example, and a teach-back question.",
      min: 160,
      max: 220,
    },
    speaking: {
      type: "explain",
      prompt: "Explain the same idea aloud in 2–3 minutes without notes. Finish with a teach-back question, then answer it yourself as the listener would.",
      sec: 150,
    },
  },
  {
    day: 86,
    title: "Paraphrasing: thinking directly in English",
    objective: "Use paraphrasing strategies to express ideas flexibly and reduce word-for-word translation.",
    vocab: [
      "paraphrase | to express the same meaning in different words | | Can you paraphrase that sentence? | ",
      "rephrase | to say again in a different way | | Let me rephrase that. | ",
      "equivalent | having the same value or meaning | | There's no exact English equivalent. | ",
      "literal | following the exact words | | A literal translation sounds unnatural. | literal translation",
      "convey | to communicate an idea or feeling | | Try to convey the meaning, not the words. | ",
      "nuance | a small difference in meaning | | Notice the nuance between 'should' and 'must'. | ",
    ],
    grammar: {
      p: "Paraphrasing strategies",
      e: "1) Change the word class: 'Costs increased significantly' → 'There was a significant increase in costs.' 2) Use synonyms carefully: rise/increase/go up. 3) Change the structure: active ↔ passive, or a clause ↔ a noun phrase. 4) Explain around a missing word: if you don't know 'reconcile', say 'check that the two records match'. Thinking in meaning, not words, is the key to stopping word-for-word translation.",
      vi: "Khi không nhớ từ, hãy diễn đạt ý bằng từ đơn giản thay vì dừng lại để dịch. Đổi từ loại, đổi cấu trúc, dùng từ đồng nghĩa phù hợp.",
      ex: ["Original: The company decided to postpone the project because of funding problems.", "Paraphrase 1: Due to a lack of funding, the project was put on hold.", "Paraphrase 2: The firm delayed the project as it couldn't secure enough money.", "Explaining around a word: 'a person who checks the accounts from outside the company' (= external auditor)."],
    },
    reading: {
      title: "Model text: from translation to direct thinking",
      text: `Many intermediate learners build English sentences by translating from their first language. This works for simple ideas but becomes slow and unnatural for complex ones, because languages organise information differently. Advanced speakers rarely translate. Instead, they start from the meaning they want to convey and choose whatever English structure expresses it most simply. When they don't know a word, they paraphrase around it rather than stopping. The goal is not to find a perfect equivalent for every Vietnamese word, but to get the message across clearly.`,
      q: [
        ["main", "What do advanced speakers do differently?", ["Translate faster", "Start from meaning and choose a simple English structure", "Use more Vietnamese", "Memorise dictionaries"], 1],
        ["detail", "What do they do when they don't know a word?", ["Stop speaking", "Paraphrase around it", "Switch languages", "Ask for a dictionary"], 1],
      ],
    },
    writing: {
      type: "sentences",
      prompt: "Paraphrase each sentence in two different ways: (1) 'Our revenue grew strongly because demand increased.' (2) 'The meeting was cancelled at the last minute.' (3) 'It is difficult to estimate the cost accurately.' Then write 3 Vietnamese workplace expressions you often need, and explain each in simple English (don't translate literally).",
      min: 120,
      max: 200,
    },
    speaking: {
      type: "explain",
      prompt: "Explain-around game: describe five work-related words WITHOUT saying the word (e.g. 'invoice', 'deadline', 'audit', 'overtime', 'budget') as if your listener must guess. Keep talking — never stop to translate.",
      sec: 120,
    },
  },
  {
    day: 87,
    title: "Keeping your English alive after 90 days",
    objective: "Read about long-term language maintenance and plan your next stage aloud.",
    vocab: [
      "plateau | a period when progress stops | | Many learners hit a plateau at B2. | reach a plateau",
      "deliberate practice | focused practice on specific weaknesses with feedback | | Deliberate practice beats casual practice. | ",
      "comfort zone | a situation where you feel safe and don't need to try hard | | Step out of your comfort zone. | ",
      "immersion | being surrounded by a language | | Daily immersion through podcasts helps. | ",
      "sustain | to keep something going over time | | It's hard to sustain motivation. | ",
      "feedback loop | a process where results inform the next action | | Recording yourself creates a feedback loop. | ",
    ],
    reading: {
      title: "After the course: how to keep improving",
      text: `Intensive programmes often produce rapid progress, followed by a familiar problem: once the structure disappears, practice slowly fades, and skills begin to decline. Many intermediate and upper-intermediate learners also experience a plateau. They can manage most everyday situations, so they stop feeling the pressure to improve, and their English stays in a comfortable but limited zone.

Research on expertise suggests that improvement comes less from the amount of practice than from its quality. Deliberate practice means working on specific weaknesses, at the edge of your ability, with some form of feedback. Simply using English at work is valuable, but it mostly repeats what you can already do. Writing a difficult email, recording a presentation and comparing it with a model, or analysing why a native speaker phrased something differently — these push you beyond your comfort zone.

Sustainable learners combine three layers. The first is light daily immersion: podcasts on the commute, articles in your field, the language settings on your phone. The second is a few short sessions of deliberate practice each week, focused on one skill at a time. The third is regular real-world challenges — presenting in a meeting, joining an international call — which reveal new weaknesses and keep motivation real.

Finally, they keep a feedback loop. Recording yourself every few weeks and listening back, keeping a list of corrected mistakes, or measuring progress against a clear goal turns vague effort into visible improvement. Progress after the intermediate stage is slower, but it is far from impossible.`,
      q: [
        ["main", "What is the main message?", ["Learners always decline after a course", "Continued progress requires deliberate practice, layered habits and feedback", "Using English at work is enough", "Immersion is the only method"], 1],
        ["detail", "Why does using English at work not guarantee improvement?", ["It's too difficult", "It mostly repeats what you can already do", "Work English is wrong", "It's too short"], 1],
        ["detail", "Which is part of the third layer?", ["Podcasts", "Changing phone settings", "Presenting in a meeting", "Reading articles"], 2],
        ["inference", "Why record yourself every few weeks?", ["To make progress visible and identify weaknesses", "To share on social media", "To replace lessons", "To practise listening to music"], 0],
      ],
      summary: "Summarise the three layers and the role of feedback.",
    },
    writing: {
      type: "report",
      prompt: "Draft your post-course plan: your target level for the next 90 days, your daily immersion habits, two deliberate-practice routines (with the skill each targets), one real-world challenge per month, and your feedback loop.",
      min: 150,
      max: 220,
    },
    speaking: {
      type: "presentation",
      prompt: "Present your next-90-days plan as if to a mentor in 2 minutes. Explain why you chose each element, based on what you learned about your strengths and weaknesses.",
      sec: 120,
    },
  },
  {
    day: 88,
    title: "Capstone preparation: building your final talk",
    objective: "Plan and draft a 3–4 minute talk on an idea from your field; review all pronunciation focuses.",
    vocab: [
      "structure | the way parts are arranged | | A clear structure helps the audience. | ",
      "transition | a phrase that moves from one part to the next | | Smooth transitions connect your points. | ",
      "anecdote | a short personal story | | Open with an anecdote. | ",
      "rehearse | to practise before a performance | | Rehearse your talk at least three times. | ",
      "deliver | to give a speech or presentation | | She delivered the talk confidently. | ",
      "memorable | easy to remember | | End with a memorable line. | ",
    ],
    pron: {
      focus: "Final pronunciation review",
      tip: "Check the six focuses from this course in your talk: final consonants, word stress, -ed endings, TH sounds, sentence stress & linking, and chunking with pauses. Mark the three you find hardest on your script.",
      items: ["checks · submitted · approved (final consonants)", "deVElopment · aNAlysis · fiNANcial (word stress)", "booked /t/ · stayed /d/ · needed /ɪd/", "think · three · this · although", "Our recommendation / is to start / in January.", "The problem isn't the COST — it's the TIMING."],
    },
    reading: {
      title: "Model text: a capstone talk outline",
      text: `Title: Why numbers need storytellers
Hook (anecdote): Last year a perfect report confused our management team.
Big idea: Financial data only creates value when someone explains it.
Point 1: Reports show what happened — people need to know why.
Point 2: A good explanation uses one chart, one example and one recommendation.
Point 3: AI can draft the words, but people must own the judgement.
Close: "Numbers don't speak for themselves. That's our job."
Transitions: "So how do we fix that?" / "This leads to my second point…" / "Finally…"`,
      q: [
        ["detail", "What is the big idea of the talk?", ["AI will replace accountants", "Financial data creates value only when explained", "Reports should be longer", "Charts are unnecessary"], 1],
        ["purpose", "What is the purpose of the transitions?", ["To connect the parts smoothly", "To add more data", "To end the talk", "To ask for questions"], 0],
      ],
    },
    writing: {
      type: "report",
      prompt: "Write the full outline and key sentences for YOUR 3–4 minute capstone talk on an idea from your work or life: title, hook, big idea, three points with examples, transitions, and a memorable closing line.",
      min: 170,
      max: 250,
    },
    speaking: {
      type: "presentation",
      prompt: "Rehearse the full talk once from your outline (not a full script). Record it, then listen and note three improvements for tomorrow.",
      sec: 210,
    },
  },
  {
    day: 89,
    title: "Capstone: read, write, speak — the full pipeline",
    objective: "Final integrated task: analyse a complex text, write a summary-response, and deliver your capstone talk.",
    vocab: [
      "paradox | a situation that seems impossible because it has two opposite features | | the productivity paradox | ",
      "diffuse | to spread widely | | New technologies take time to diffuse. | ",
      "complementary | combining well to form a whole | | Training is complementary to new software. | ",
      "lag | a delay between two events | | There is a lag between investment and results. | time lag",
      "reorganise | to change the way something is arranged | | Firms had to reorganise their processes. | ",
      "realise (benefits) | to achieve or obtain | | Companies realised the benefits years later. | ",
    ],
    reading: {
      title: "The productivity paradox",
      text: `In 1987, the economist Robert Solow made a famous observation: "You can see the computer age everywhere but in the productivity statistics." Businesses had invested heavily in computers for years, yet official measures showed productivity growth slowing rather than accelerating. This apparent contradiction became known as the productivity paradox.

Several explanations were proposed. Some economists argued that the statistics were wrong — that the benefits of computers, such as faster service or better quality, were real but difficult to measure. Others suggested that the investment had simply been wasted on poorly designed systems. The most influential explanation, however, focused on time and organisation.

Historical studies of electricity offer a useful comparison. When factories first replaced steam engines with electric motors in the late nineteenth century, productivity barely changed. The early adopters simply put one large electric motor where the steam engine had been, keeping the same building layout and workflow. Large gains arrived only decades later, when a new generation of managers redesigned factories around small motors at each machine, reorganising both the physical space and the way work was done.

Computers appear to have followed a similar pattern. Productivity growth in the United States rose significantly in the late 1990s and early 2000s, after companies had reorganised processes, trained staff and adopted complementary practices such as just-in-time supply chains. The technology had been available for years; the benefits were realised only when organisations changed how they worked.

Many observers now ask whether artificial intelligence will repeat the paradox. If history is a guide, the answer may depend less on the technology itself than on whether organisations are willing to redesign work around it — a process that tends to take longer, and to be more difficult, than enthusiasts expect.`,
      q: [
        ["main", "What is the central explanation the article favours?", ["Statistics were wrong", "Investment was wasted", "Benefits arrive only after organisations reorganise around the technology", "Computers never improved productivity"], 2],
        ["detail", "What did early factories do with electric motors?", ["Redesigned the whole factory", "Replaced the steam engine with one large motor and kept the same layout", "Installed small motors at each machine", "Refused to use them"], 1],
        ["detail", "When did US productivity growth rise significantly?", ["In 1987", "In the late 19th century", "In the late 1990s and early 2000s", "It never rose"], 2],
        ["inference", "What does the writer imply about AI?", ["It will definitely fail", "Its benefits may be delayed until work is redesigned", "It will instantly raise productivity", "It is the same as electricity"], 1],
        ["purpose", "Why does the writer discuss electricity?", ["As a historical analogy that explains the computer paradox", "To change the topic", "To criticise Solow", "To explain how motors work"], 0],
      ],
      summary: "Summarise the paradox, the electricity analogy, and the implication for AI.",
    },
    writing: {
      type: "summary",
      prompt: "Write a summary-response (180–240 words): first a concise, neutral summary of the article; then your response — what does the productivity paradox mean for AI adoption in your organisation? Use hedging and advanced linking.",
      min: 180,
      max: 250,
    },
    speaking: {
      type: "presentation",
      prompt: "Deliver your capstone talk (3–4 minutes) from Day 88, improved with yesterday's notes. If you can, connect one point to today's article. This recording will be compared with your Day 1 speaking.",
      sec: 240,
    },
  },
];
