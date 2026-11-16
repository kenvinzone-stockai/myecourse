// Lightweight spaced repetition: same day → +1 → +3 → +7 → +14 → +30.

import { addDays, type DateKey } from "../domain/dates";
import type { VocabCard, VocabStatus, VocabularyItem } from "../domain/types";

export const SRS_INTERVALS = [0, 1, 3, 7, 14, 30];

export function newCard(item: Pick<VocabularyItem, "id" | "term" | "meaning" | "vi" | "example" | "collocation"> & { day?: number }, today: DateKey, now: string): VocabCard {
  return {
    id: item.id,
    term: item.term,
    meaning: item.meaning,
    vi: item.vi,
    example: item.example,
    collocation: item.collocation,
    note: "",
    sourceDay: item.day,
    status: "new",
    stage: 0,
    dueDate: today,
    addedAt: now,
    reviews: 0,
    lapses: 0,
  };
}

export type ReviewGrade = "again" | "hard" | "good" | "easy";

/** Apply a review result and schedule the next review. */
export function reviewCard(card: VocabCard, grade: ReviewGrade, today: DateKey): VocabCard {
  let stage = card.stage;
  let status: VocabStatus = card.status;
  let lapses = card.lapses;
  switch (grade) {
    case "again":
      stage = 0;
      lapses += 1;
      status = "difficult";
      break;
    case "hard":
      stage = Math.max(1, stage); // repeat the current interval (at least tomorrow)
      status = lapses >= 2 ? "difficult" : "learning";
      break;
    case "good":
      stage = Math.min(stage + 1, SRS_INTERVALS.length - 1);
      status = stage >= SRS_INTERVALS.length - 1 ? "known" : "learning";
      break;
    case "easy":
      stage = Math.min(stage + 2, SRS_INTERVALS.length - 1);
      status = stage >= 4 ? "known" : "learning";
      break;
  }
  const interval = grade === "again" ? 0 : SRS_INTERVALS[stage];
  return {
    ...card,
    stage,
    status,
    lapses,
    reviews: card.reviews + 1,
    lastReviewed: today,
    dueDate: addDays(today, interval),
  };
}

export function setStatus(card: VocabCard, status: VocabStatus, today: DateKey): VocabCard {
  if (status === "known") return { ...card, status, stage: SRS_INTERVALS.length - 1, dueDate: addDays(today, 30) };
  if (status === "difficult") return { ...card, status, stage: 0, dueDate: today };
  if (status === "learning") return { ...card, status, stage: Math.max(1, Math.min(card.stage, 2)), dueDate: addDays(today, 1) };
  return { ...card, status };
}

export function isDue(card: VocabCard, today: DateKey): boolean {
  return card.dueDate <= today;
}

export function dueCards(cards: VocabCard[], today: DateKey): VocabCard[] {
  return cards
    .filter((c) => isDue(c, today))
    .sort((a, b) => (a.status === "difficult" ? -1 : 0) - (b.status === "difficult" ? -1 : 0) || a.dueDate.localeCompare(b.dueDate));
}
