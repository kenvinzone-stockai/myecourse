import type { AiRequest } from "./types";

const COACH =
  "You are a warm but honest English writing and speaking coach for an adult Vietnamese professional. " +
  "Give concise, specific, actionable feedback in English, with short Vietnamese notes only where they clarify a grammar point. " +
  "Never rewrite the whole text; show at most 5 corrections. Use plain text with short headings.";

export function buildPrompt(req: AiRequest): { system: string; user: string } {
  switch (req.capability) {
    case "writing-feedback": {
      const { prompt, text, level, vocabulary } = req.input;
      return {
        system: COACH,
        user:
          `Task given to the learner (level ≈ ${level ?? "unknown"}):\n${prompt}\n\n` +
          (vocabulary?.length ? `Target vocabulary: ${vocabulary.join(", ")}\n\n` : "") +
          `Learner's text:\n"""${text}"""\n\n` +
          "Respond with: 1) Overall (2 sentences). 2) Strengths (2 bullets). 3) Corrections: up to 5 lines 'original → better (why)'. " +
          "4) One sentence rewritten more naturally. 5) Rubric 1–5 for: task, clarity, organisation, grammar, vocabulary, sentence structure, naturalness.",
      };
    }
    case "speaking-feedback": {
      const { prompt, transcript, level } = req.input;
      return {
        system: COACH,
        user:
          `Speaking task (level ≈ ${level ?? "unknown"}): ${prompt}\n\nTranscript (may contain recognition errors):\n"""${transcript}"""\n\n` +
          "Respond with: coherence and structure, 3 language corrections, 3 more natural phrases they could use, and one tip for next time.",
      };
    }
    case "weekly-coaching": {
      return {
        system: COACH,
        user: `Here is the learner's weekly data:\n${req.input.summary}\n\nWrite a short weekly coaching note: what went well, the main focus for next week, and two concrete actions.`,
      };
    }
  }
}
