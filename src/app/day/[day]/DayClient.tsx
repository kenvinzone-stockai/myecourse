"use client";

import { useAppState, useToday } from "@/store/store";
import { getLesson } from "@/lib/curriculum";
import { planStatus } from "@/lib/engine/plan";
import { LessonView } from "@/components/lesson/LessonView";
import { Loading } from "@/components/ui";

export function DayClient({ day }: { day: number }) {
  const state = useAppState();
  const today = useToday();
  if (!state || !today) return <Loading />;
  const lesson = getLesson(day)!;
  const ps = planStatus(state, today);
  return <LessonView key={day} lesson={lesson} state={state} isCurrent={ps.currentDay === day} />;
}
