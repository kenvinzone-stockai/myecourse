"use client";

// Single local-first app store. Components subscribe via useSyncExternalStore;
// every mutation is validated-in-shape by types and persisted immediately.

import { useSyncExternalStore, useEffect, useState } from "react";
import type {
  AppState,
  AssessmentResult,
  LearnerProfile,
  LessonProgress,
  Rubric,
  Settings,
  Skill,
  SpeakingSession,
  StepId,
  VocabCard,
  VocabStatus,
  VocabularyItem,
  WeaknessTag,
  WeeklyReviewEntry,
} from "@/lib/domain/types";
import { dateKeyInTimezone, type DateKey } from "@/lib/domain/dates";
import { IndexedDbAudioStore, LocalStorageRepository, STORAGE_KEY, type AudioStore } from "@/lib/storage/repository";
import { createInitialState } from "@/lib/storage/schema";
import { newCard, reviewCard, setStatus, type ReviewGrade } from "@/lib/engine/srs";
import { getLesson } from "@/lib/curriculum";

const repo = new LocalStorageRepository();
export const audioStore: AudioStore = new IndexedDbAudioStore();

let state: AppState | null = null;
let warning: string | undefined;
const listeners = new Set<() => void>();

function ensureLoaded() {
  if (state === null && typeof window !== "undefined") {
    const r = repo.load();
    state = r.state;
    warning = r.warning;
  }
}

function emit() {
  listeners.forEach((l) => l());
}

function persist() {
  if (!state) return;
  try {
    repo.save(state);
  } catch {
    warning = "Could not save — browser storage may be full. Export your data from Settings.";
  }
}

export function getState(): AppState {
  ensureLoaded();
  return state ?? createInitialState();
}

export function setState(updater: (s: AppState) => AppState) {
  ensureLoaded();
  state = updater(state ?? createInitialState());
  persist();
  emit();
}

function subscribe(l: () => void) {
  ensureLoaded();
  listeners.add(l);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      state = null;
      ensureLoaded();
      emit();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", onStorage);
  };
}

/** Returns null during server render / hydration, then the loaded state. */
export function useAppState(): AppState | null {
  return useSyncExternalStore(
    subscribe,
    () => {
      ensureLoaded();
      return state;
    },
    () => null,
  );
}

export function getWarning() {
  return warning;
}
export function clearWarning() {
  warning = undefined;
  emit();
}

// ── Time ──────────────────────────────────────────────────────────────────

export function todayKey(s?: AppState | null): DateKey {
  return s?.settings.simulatedDate ?? dateKeyInTimezone(new Date());
}

/** Today's date in Asia/Ho_Chi_Minh, refreshed every minute. */
export function useToday(): DateKey | null {
  const s = useAppState();
  const [, tick] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => tick((n) => n + 1), 60_000);
    return () => window.clearInterval(id);
  }, []);
  return s ? todayKey(s) : null;
}

function nowIso() {
  return new Date().toISOString();
}

// ── Lesson progress ───────────────────────────────────────────────────────

export function emptyProgress(day: number): LessonProgress {
  return {
    day,
    status: "not_started",
    steps: {},
    reviewAnswers: {},
    readingAnswers: {},
    readingChecked: false,
    summary: "",
    writingDraft: "",
    writingChecklist: {},
    writingRubric: {},
    speakingSessionIds: [],
    speakingRubric: {},
    reflection: { easy: "", difficult: "", phrase: "", confidence: 0 },
    minutes: 0,
  };
}

export function updateLesson(day: number, patch: Partial<LessonProgress> | ((p: LessonProgress) => Partial<LessonProgress>)) {
  setState((s) => {
    const cur = s.lessons[String(day)] ?? emptyProgress(day);
    const p = typeof patch === "function" ? patch(cur) : patch;
    const next: LessonProgress = { ...cur, ...p };
    if (next.status === "not_started") {
      next.status = "in_progress";
      next.startedAt = next.startedAt ?? nowIso();
    }
    return { ...s, lessons: { ...s.lessons, [String(day)]: next } };
  });
}

export function markStep(day: number, step: StepId, done = true) {
  updateLesson(day, (p) => ({ steps: { ...p.steps, [step]: done } }));
}

export function addStudyMinutes(minutes: number, day?: number) {
  setState((s) => {
    const key = todayKey(s);
    const activity = { ...s.activity, [key]: Math.round(((s.activity[key] ?? 0) + minutes) * 10) / 10 };
    let lessons = s.lessons;
    if (day !== undefined) {
      const cur = s.lessons[String(day)] ?? emptyProgress(day);
      lessons = { ...s.lessons, [String(day)]: { ...cur, minutes: Math.round((cur.minutes + minutes) * 10) / 10 } };
    }
    return { ...s, activity, lessons };
  });
}

export function recordSkill(skill: Skill, score: number, source: string, day?: number) {
  setState((s) => ({
    ...s,
    skillEvents: [...s.skillEvents, { at: nowIso(), date: todayKey(s), day, skill, score: Math.max(0, Math.min(100, Math.round(score))), source }],
  }));
}

export function recordWeaknesses(tags: WeaknessTag[], day?: number) {
  if (!tags.length) return;
  setState((s) => ({ ...s, weaknesses: [...s.weaknesses, ...tags.map((tag) => ({ date: todayKey(s), day, tag }))] }));
}

function addCards(s: AppState, items: VocabularyItem[], status?: VocabStatus): Record<string, VocabCard> {
  const today = todayKey(s);
  const vocab = { ...s.vocab };
  for (const item of items) {
    if (!vocab[item.id]) {
      const c = newCard(item, today, nowIso());
      vocab[item.id] = status ? setStatus(c, status, today) : c;
    } else if (status === "difficult") {
      vocab[item.id] = setStatus(vocab[item.id], "difficult", today);
    }
  }
  return vocab;
}

export function saveVocabItems(items: VocabularyItem[], status?: VocabStatus) {
  setState((s) => ({ ...s, vocab: addCards(s, items, status) }));
}

export function completeLesson(day: number) {
  setState((s) => {
    const cur = s.lessons[String(day)] ?? emptyProgress(day);
    const lesson = getLesson(day);
    const vocab = lesson && !lesson.isReviewDay ? addCards(s, lesson.vocabulary) : s.vocab;
    const key = todayKey(s);
    // Guarantee the day counts towards consistency even if the timer was not running.
    const minutesToday = s.activity[key] ?? 0;
    const activity = minutesToday < 10 ? { ...s.activity, [key]: Math.max(10, minutesToday) } : s.activity;
    return {
      ...s,
      vocab,
      activity,
      lessons: { ...s.lessons, [String(day)]: { ...cur, status: "completed", completedAt: nowIso(), steps: { ...cur.steps, reflect: true } } },
    };
  });
}

export function reopenLesson(day: number) {
  updateLesson(day, { status: "in_progress", completedAt: undefined });
}

/** Skip missed lessons: they stay available, and their vocabulary joins today's review. */
export function skipLessons(days: number[]) {
  setState((s) => {
    const lessons = { ...s.lessons };
    const items: VocabularyItem[] = [];
    for (const d of days) {
      const cur = lessons[String(d)] ?? emptyProgress(d);
      if (cur.status === "completed") continue;
      lessons[String(d)] = { ...cur, status: "skipped" };
      const l = getLesson(d);
      if (l && !l.isReviewDay) items.push(...l.vocabulary);
    }
    const next = { ...s, lessons };
    return { ...next, vocab: addCards(next, items) };
  });
}

export function shiftPlan(days: number) {
  setState((s) => ({ ...s, settings: { ...s.settings, planOffsetDays: Math.max(0, s.settings.planOffsetDays + days) } }));
}

// ── Profile, settings, assessments ────────────────────────────────────────

export function saveProfile(profile: LearnerProfile) {
  setState((s) => ({ ...s, profile }));
}

export function updateProfile(patch: Partial<LearnerProfile>) {
  setState((s) => (s.profile ? { ...s, profile: { ...s.profile, ...patch } } : s));
}

export function updateSettings(patch: Partial<Settings>) {
  setState((s) => ({ ...s, settings: { ...s.settings, ...patch } }));
}

export function finishOnboarding() {
  setState((s) => ({ ...s, onboardingComplete: true }));
}

export function saveAssessment(result: AssessmentResult) {
  setState((s) => {
    const source = `assessment:${result.kind}`;
    const date = todayKey(s);
    const at = nowIso();
    const events = (["reading", "writing", "speaking", "vocabulary"] as Skill[]).map((skill) => ({
      at,
      date,
      skill,
      score: result.scores[skill],
      source,
    }));
    const day = result.kind === "day30" ? 30 : result.kind === "day60" ? 60 : result.kind === "final" ? 90 : undefined;
    let lessons = s.lessons;
    if (day) {
      const cur = s.lessons[String(day)] ?? emptyProgress(day);
      lessons = { ...s.lessons, [String(day)]: { ...cur, status: "completed", completedAt: at, steps: { ...cur.steps, review: true, reflect: true } } };
    }
    const minutesToday = s.activity[date] ?? 0;
    return {
      ...s,
      lessons,
      activity: { ...s.activity, [date]: Math.max(minutesToday, 30) },
      assessments: { ...s.assessments, [result.kind]: result },
      skillEvents: [...s.skillEvents.filter((e) => e.source !== source), ...events],
    };
  });
}

// ── Speaking ──────────────────────────────────────────────────────────────

export function addSpeakingSession(session: SpeakingSession) {
  setState((s) => {
    const next = { ...s, speaking: [...s.speaking, session] };
    if (session.day !== undefined && session.context === "lesson") {
      const cur = s.lessons[String(session.day)] ?? emptyProgress(session.day);
      next.lessons = {
        ...s.lessons,
        [String(session.day)]: { ...cur, status: cur.status === "not_started" ? "in_progress" : cur.status, speakingSessionIds: [...cur.speakingSessionIds, session.id] },
      };
    }
    return next;
  });
}

export function updateSpeakingSession(id: string, patch: Partial<SpeakingSession>) {
  setState((s) => ({ ...s, speaking: s.speaking.map((x) => (x.id === id ? { ...x, ...patch } : x)) }));
}

export async function deleteSpeakingSession(id: string) {
  const sess = getState().speaking.find((x) => x.id === id);
  if (sess?.audioId) await audioStore.delete(sess.audioId).catch(() => undefined);
  setState((s) => ({
    ...s,
    speaking: s.speaking.filter((x) => x.id !== id),
    lessons: Object.fromEntries(
      Object.entries(s.lessons).map(([k, l]) => [k, { ...l, speakingSessionIds: l.speakingSessionIds.filter((x) => x !== id) }]),
    ),
  }));
}

// ── Vocabulary ────────────────────────────────────────────────────────────

export function gradeVocab(id: string, grade: ReviewGrade) {
  setState((s) => {
    const c = s.vocab[id];
    if (!c) return s;
    return { ...s, vocab: { ...s.vocab, [id]: reviewCard(c, grade, todayKey(s)) } };
  });
}

export function setVocabStatus(id: string, status: VocabStatus) {
  setState((s) => {
    const c = s.vocab[id];
    if (!c) return s;
    return { ...s, vocab: { ...s.vocab, [id]: setStatus(c, status, todayKey(s)) } };
  });
}

export function updateVocab(id: string, patch: Partial<VocabCard>) {
  setState((s) => (s.vocab[id] ? { ...s, vocab: { ...s.vocab, [id]: { ...s.vocab[id], ...patch } } } : s));
}

export function deleteVocab(id: string) {
  setState((s) => {
    const vocab = { ...s.vocab };
    delete vocab[id];
    return { ...s, vocab };
  });
}

export function addCustomVocab(term: string, meaning: string, example: string, note: string) {
  const id = `custom-${term.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString(36)}`;
  setState((s) => {
    const card = newCard({ id, term, meaning, example }, todayKey(s), nowIso());
    return { ...s, vocab: { ...s.vocab, [id]: { ...card, note } } };
  });
}

// ── Weekly review & remediation ───────────────────────────────────────────

export function saveWeeklyReview(entry: WeeklyReviewEntry) {
  setState((s) => ({ ...s, weeklyReviews: { ...s.weeklyReviews, [String(entry.week)]: { ...entry, savedAt: nowIso() } } }));
}

export function completeRemediation(tag: WeaknessTag) {
  setState((s) => ({ ...s, dismissedRemediation: [...s.dismissedRemediation, `${tag}@${todayKey(s)}`] }));
}

// ── Whole-state operations ────────────────────────────────────────────────

export function replaceState(next: AppState) {
  warning = undefined;
  setState(() => next);
}

export async function resetAll() {
  await audioStore.clear().catch(() => undefined);
  repo.clear();
  setState(() => createInitialState());
}

export function rubricFilled(r: Rubric, keys: readonly string[]) {
  return keys.every((k) => typeof r[k] === "number" && r[k] >= 1);
}
