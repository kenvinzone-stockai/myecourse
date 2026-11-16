"use client";

import Link from "next/link";
import { useAppState, useToday } from "@/store/store";
import { getLesson } from "@/lib/curriculum";
import { formatDmy, dateForDay } from "@/lib/domain/dates";
import { planStatus, recommendation } from "@/lib/engine/plan";
import { dueCards } from "@/lib/engine/srs";
import { pick } from "@/lib/i18n";
import { LessonView } from "@/components/lesson/LessonView";
import { RecoveryCard, RemediationCard } from "@/components/plan/PlanCards";
import { ButtonLink, Loading, Notice } from "@/components/ui";

export default function TodayPage() {
  const state = useAppState();
  const today = useToday();
  if (!state || !today || !state.onboardingComplete) return <Loading />;
  const lang = state.settings.uiLanguage;
  const ps = planStatus(state, today);
  const rec = recommendation(state, today);
  const due = dueCards(Object.values(state.vocab), today).length;

  if (rec.kind === "finished") {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-ink">{pick(lang, "Bạn đã hoàn thành cả 90 ngày.", "You've completed all 90 days.")}</h1>
        <p className="text-muted">{pick(lang, "Xem báo cáo so sánh Ngày 1 và Ngày 90, cùng lộ trình 90 ngày tiếp theo.", "See your Day 1 vs Day 90 comparison and your next 90-day roadmap.")}</p>
        <div className="flex gap-3">
          <ButtonLink href="/report">{pick(lang, "Báo cáo cuối khóa", "Final report")}</ButtonLink>
          <ButtonLink href="/vocabulary" variant="secondary">{pick(lang, "Ôn từ vựng", "Review vocabulary")}</ButtonLink>
        </div>
      </div>
    );
  }

  const day = rec.kind === "done-today" ? ps.calendarDay : ps.currentDay;
  const lesson = getLesson(Math.max(1, day))!;

  return (
    <div className="space-y-6">
      {rec.kind === "before-start" && (
        <Notice tone="info" title={pick(lang, `Chương trình bắt đầu ngày ${formatDmy(dateForDay(1, state.settings.planOffsetDays))} — còn ${rec.daysUntilStart} ngày.`, `The program starts on ${formatDmy(dateForDay(1, state.settings.planOffsetDays))} — ${rec.daysUntilStart} days to go.`)}>
          {pick(lang, "Bạn có thể xem trước và bắt đầu Ngày 1 ngay nếu muốn.", "You can preview and even start Day 1 now if you like.")}
        </Notice>
      )}
      {rec.kind === "done-today" && (
        <Notice tone="good" title={pick(lang, "Bạn đã hoàn thành bài hôm nay.", "Today's lesson is done.")} action={rec.nextDay ? <Link className="text-sm underline" href={`/day/${rec.nextDay}`}>{pick(lang, `Xem trước Ngày ${rec.nextDay}`, `Preview Day ${rec.nextDay}`)}</Link> : undefined}>
          {due > 0 ? pick(lang, `Còn ${due} từ cần ôn — khoảng 5 phút.`, `${due} words are due for review — about 5 minutes.`) : pick(lang, "Nghỉ ngơi tốt — hẹn gặp lại ngày mai.", "Rest well — see you tomorrow.")}
        </Notice>
      )}
      <RecoveryCard state={state} today={today} />
      <RemediationCard state={state} today={today} compact />
      {due > 0 && rec.kind !== "done-today" && (
        <p className="text-sm text-muted">
          {pick(lang, `${due} từ đến hạn ôn.`, `${due} words due for review.`)}{" "}
          <Link href="/vocabulary" className="underline">{pick(lang, "Ôn sau bài học", "Review after the lesson")}</Link>
        </p>
      )}
      <LessonView key={lesson.day} lesson={lesson} state={state} isCurrent />
    </div>
  );
}
