// Extra prompts for free practice in the Speaking workspace.
import type { SpeakingType } from "../domain/types";

export type PracticePrompt = { type: SpeakingType; label: string; prompt: string; seconds: number; script?: string };

export const PRACTICE_PROMPTS: PracticePrompt[] = [
  { type: "read-aloud", label: "Read aloud", seconds: 45, prompt: "Read the script aloud clearly. Focus on final consonants and pauses.", script: "Thank you for joining today. I'd like to give you a short update on our results. Overall, costs were slightly lower than expected, and all three projects are on track." },
  { type: "shadowing", label: "Shadowing", seconds: 45, prompt: "Play the script at slow speed and speak along with it, copying stress and rhythm. Repeat three times.", script: "If we want to finish on time, we need to agree on the priorities today. First, the data must be checked. Then, the report can be approved and sent to the client." },
  { type: "answer", label: "Question answering", seconds: 60, prompt: "What is the most challenging part of your job, and how do you deal with it?" },
  { type: "answer", label: "Question answering", seconds: 60, prompt: "Describe a typical Monday morning at work. What do you do first, and why?" },
  { type: "story", label: "Storytelling", seconds: 90, prompt: "Tell the story of a time you solved a problem under pressure. Set the scene, describe the problem, explain what you did, and say how it ended." },
  { type: "describe", label: "Describe a concept", seconds: 75, prompt: "Describe your workplace to someone who has never seen it: the location, the building, the people, and the atmosphere." },
  { type: "describe", label: "Describe an image in your mind", seconds: 75, prompt: "Picture a busy port or a construction site. Describe what you can see, hear and what people are doing — as if describing a photo." },
  { type: "explain", label: "Explain a process", seconds: 90, prompt: "Explain step by step how a payment is approved in your company, for a new colleague." },
  { type: "summary", label: "Summarise an article", seconds: 90, prompt: "Choose any article you read in this course (see Reading). Summarise it in your own words without looking, then give your opinion." },
  { type: "opinion", label: "Give an opinion", seconds: 90, prompt: "Is it better to be a specialist or a generalist in today's job market? Give your opinion with two reasons and an example." },
  { type: "opinion", label: "Give an opinion", seconds: 90, prompt: "Should companies allow employees to work from home two days a week? State your position, reasons and one condition." },
  { type: "meeting", label: "Simulated conversation", seconds: 90, prompt: "You are in a call with a client who is unhappy about a late invoice correction. Apologise, explain what happened, and propose a solution and a deadline." },
  { type: "meeting", label: "Simulated conversation", seconds: 90, prompt: "Ask your manager for two days of training next month. Explain the benefit, the cost, and how your work will be covered." },
  { type: "presentation", label: "Mini presentation", seconds: 120, prompt: "Give a 2-minute presentation: 'Three things I have learned in my career'. Use an opening, signposting and a clear close." },
];

export const PRONUNCIATION_DRILLS = [
  { title: "Final consonants", items: ["checks · reports · costs", "asked · worked · approved", "Our costs increased last month."] },
  { title: "Word stress", items: ["deVElopment · aNAlysis · fiNANcial", "PREsent (noun) · preSENT (verb)", "We need to preSENT the fiNANcial aNAlysis."] },
  { title: "TH sounds", items: ["think · three · month", "this · that · although", "I think that's the third thing."] },
  { title: "-ed endings", items: ["booked /t/ · stayed /d/ · needed /ɪd/", "We checked, updated and submitted the report."] },
  { title: "Linking", items: ["turn_off · take_it · look_at_it", "I'd like_to talk_about_our plan."] },
];
