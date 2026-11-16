"use client";

import Link from "next/link";
import { useAppState, useToday } from "@/store/store";
import { getLesson, DAY_TYPE_INFO, PHASES } from "@/lib/curriculum";
import { formatDmy, TOTAL_DAYS, weekOfDay } from "@/lib/domain/dates";
import { dateOfLesson, dayVisualState, lessonProgressFraction, planStatus, recommendation, studyStreak } from "@/lib/engine/plan";
import { allScores } from "@/lib/engine/scoring";
import { bandFor, BAND_INFO } from "@/lib/engine/adaptive";
import { dueCards } from "@/lib/engine/srs";
import { learnerLevel } from "@/lib/engine/personalize";
import { pick, t } from "@/lib/i18n";
import { stepsFor } from "@/components/lesson/LessonView";
import { RecoveryCard, RemediationCard } from "@/components/plan/PlanCards";
import { ScoreBar } from "@/components/charts";
import { Badge, ButtonLink, Card, cx, Loading, ProgressBar, SectionTitle, Stat } from "@/components/ui";
import { IconArrowRight } from "@/components/ui/icons";

export default function Dashboard() {
  const state = useAppState();
  const today = useToday();
  if (!state || !today || !state.onboardingComplete) return <Loading />;
  const lang = state.settings.uiLanguage;
  const ps = planStatus(state, today);
  const rec = recommendation(state, today);
  const day = rec.kind === "continue" || rec.kind === "catch-up" ? rec.day : rec.kind === "done-today" ? ps.calendarDay : ps.currentDay;
  const lesson = getLesson(Math.max(1, day))!;
  const lp = state.lessons[String(lesson.day)];
  const frac = lessonProgressFraction(lp, stepsFor(lesson).length);
  const streak = studyStreak(state, today);
  const scores = allScores(state, today, dateOfLesson(state, 1));
  const due = dueCards(Object.values(state.vocab), today).length;
  const week = Math.max(1, weekOfDay(Math.max(1, ps.calendarDay)));
  const weekDays = Array.from({ length: 7 }, (_, i) => (week - 1) * 7 + i + 1).filter((d) => d <= TOTAL_DAYS);
  const weekMinutes = weekDays.reduce((a, d) => a + (state.activity[dateOfLesson(state, d)] ?? 0), 0);
  const phase = PHASES.find((p) => p.id === lesson.phase)!;
  const level = learnerLevel(state);
  const name = state.profile?.name?.trim();

  const status =
    ps.completedCount === 0
      ? pick(lang, "Mọi thứ đã sẵn sàng. Hôm nay chỉ cần một bài.", "Everything is ready. Today, just one lesson.")
      : streak >= 3
        ? pick(lang, `${streak} ngày liên tiếp. Giữ nhịp đều đặn.`, `${streak} days in a row. Keep the rhythm.`)
        : pick(lang, `${ps.completedCount}/90 bài đã hoàn thành. Một bước hôm nay là đủ.`, `${ps.completedCount} of 90 lessons complete. One step today is enough.`);

  const cta =
    rec.kind === "done-today"
      ? pick(lang, "Xem lại bài hôm nay", "Review today's lesson")
      : lp?.status === "in_progress"
        ? t("continueToday", lang)
        : t("startToday", lang);

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-muted">
            {formatDmy(today)}
            {ps.position.kind === "active" && ` · ${t("day", lang)} ${ps.calendarDay} / ${TOTAL_DAYS}`}
            {ps.position.kind === "before" && ` · ${pick(lang, `Còn ${ps.position.daysUntilStart} ngày nữa bắt đầu`, `Starts in ${ps.position.daysUntilStart} days`)}`}
            {ps.position.kind === "after" && ` · ${pick(lang, "Chương trình đã kết thúc", "Program period ended")}`}
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {name ? pick(lang, `Chào ${name}.`, `Hello, ${name}.`) : pick(lang, "Xin chào.", "Hello.")}
          </h1>
          <p className="mt-1 text-sm text-muted">{status}</p>
        </div>
        {level && (
          <p className="text-xs text-faint">
            {pick(lang, "Trình độ ước tính", "Estimated level")}: <span className="font-medium text-muted">{level}</span> ({t("estimate", lang)})
          </p>
        )}
      </header>

      <RecoveryCard state={state} today={today} />

      {/* Primary: today's lesson */}
      <Card className="relative overflow-hidden">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wider text-faint">
              {rec.kind === "catch-up" ? pick(lang, "Bài tiếp theo", "Next lesson") : t("today", lang)} · {t("day", lang)} {lesson.day} · {pick(lang, DAY_TYPE_INFO[lesson.type].labelVi, DAY_TYPE_INFO[lesson.type].label)}
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-ink sm:text-2xl">{lesson.title}</h2>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted">{lesson.objectives[0]}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge>~{lesson.estimatedMinutes} min</Badge>
              <Badge>{pick(lang, phase.nameVi, phase.name)}</Badge>
              {rec.kind === "done-today" && <Badge tone="good">{pick(lang, "Đã hoàn thành hôm nay", "Done for today")}</Badge>}
              {rec.kind === "before-start" && <Badge tone="info">{pick(lang, "Xem trước", "Preview")}</Badge>}
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-2 md:items-end">
            <ButtonLink href="/today" size="lg">
              {cta} <IconArrowRight />
            </ButtonLink>
            {rec.kind === "done-today" && rec.nextDay && (
              <Link href={`/day/${rec.nextDay}`} className="text-center text-xs text-muted underline">
                {pick(lang, `Xem trước Ngày ${rec.nextDay}`, `Preview Day ${rec.nextDay}`)}
              </Link>
            )}
          </div>
        </div>
        {frac > 0 && frac < 1 && <ProgressBar value={frac * 100} className="mt-5" label="Today's lesson progress" />}
      </Card>

      <RemediationCard state={state} today={today} compact />

      {/* Key numbers */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Card className="!p-4">
          <Stat label={t("streak", lang)} value={streak} hint={pick(lang, "ngày ≥10 phút", "days with ≥10 min")} />
        </Card>
        <Card className="!p-4">
          <Stat label={t("completion", lang)} value={`${Math.round((ps.completedCount / TOTAL_DAYS) * 100)}%`} hint={`${ps.completedCount}/90 ${pick(lang, "bài", "lessons")}`} />
        </Card>
        <Card className="!p-4">
          <Stat label={pick(lang, "Thời gian tuần này", "Minutes this week")} value={Math.round(weekMinutes)} hint={`${t("week", lang)} ${week}`} />
        </Card>
        <Link href="/vocabulary" className="block rounded-2xl focus-visible:outline-2">
          <Card className="!p-4 h-full transition-colors hover:bg-surface-2">
            <Stat label={t("dueReviews", lang)} value={due} hint={due ? pick(lang, "Ôn ngay →", "Review now →") : pick(lang, "Đã ôn xong", "All clear")} />
          </Card>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <SectionTitle title={pick(lang, "Điểm kỹ năng", "Skill scores")} action={<Link href="/progress" className="text-sm text-muted hover:text-ink">{t("progress", lang)} →</Link>} />
          <div className="space-y-4">
            {(["reading", "writing", "speaking", "vocabulary", "consistency"] as const).map((k) => {
              const v = scores[k];
              const label = { reading: t("reading", lang), writing: t("writing", lang), speaking: t("speaking", lang), vocabulary: t("vocabulary", lang), consistency: pick(lang, "Đều đặn", "Consistency") }[k];
              return <ScoreBar key={k} label={label} value={v} band={v !== undefined && k !== "consistency" ? pick(lang, BAND_INFO[bandFor(v)].vi, BAND_INFO[bandFor(v)].en) : undefined} />;
            })}
          </div>
          <p className="mt-4 text-xs text-faint">{pick(lang, "Điểm là chỉ số tham khảo (0–100) từ bài làm gần đây, không phải chứng chỉ trình độ.", "Scores are rolling indicators (0–100) from recent work, not certified proficiency.")}</p>
        </Card>

        <Card className="lg:col-span-2">
          <SectionTitle title={`${t("weeklyProgress", lang)} · ${t("week", lang)} ${week}`} action={<Link href={`/review/${week}`} className="text-sm text-muted hover:text-ink">{t("weeklyReview", lang)} →</Link>} />
          <ol className="grid grid-cols-7 gap-1.5">
            {weekDays.map((d) => {
              const vs = dayVisualState(state, d, ps.calendarDay);
              return (
                <li key={d}>
                  <Link
                    href={`/day/${d}`}
                    className={cx(
                      "flex aspect-square flex-col items-center justify-center rounded-lg border text-xs tabular-nums transition-colors",
                      vs === "completed" && "border-good/40 bg-good-soft text-good",
                      (vs === "today" || vs === "in_progress") && "border-accent bg-accent-soft font-semibold text-accent",
                      vs === "missed" && "border-warn/40 bg-warn-soft text-warn",
                      vs === "skipped" && "border-line bg-surface-2 text-faint",
                      vs === "upcoming" && "border-line text-muted hover:bg-surface-2",
                    )}
                    aria-label={`Day ${d}: ${vs}`}
                  >
                    {d}
                  </Link>
                </li>
              );
            })}
          </ol>
          <ul className="mt-4 space-y-1.5 text-sm">
            {weekDays.map((d) => {
              const l = getLesson(d)!;
              return (
                <li key={d} className="flex items-baseline justify-between gap-2">
                  <Link href={`/day/${d}`} className="truncate text-muted hover:text-ink">
                    {l.title}
                  </Link>
                  <span className="shrink-0 text-xs text-faint">{formatDmy(dateOfLesson(state, d)).slice(0, 5)}</span>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>
    </div>
  );
}
