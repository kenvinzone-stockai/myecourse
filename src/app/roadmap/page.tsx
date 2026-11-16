"use client";

import Link from "next/link";
import { useState } from "react";
import { useAppState, useToday } from "@/store/store";
import { getCurriculum, PHASES, WEEK_THEMES } from "@/lib/curriculum";
import { formatDmy, TOTAL_DAYS, weekdayShort } from "@/lib/domain/dates";
import { dateOfLesson, dayVisualState, planStatus, type DayVisualState } from "@/lib/engine/plan";
import { pick } from "@/lib/i18n";
import { Badge, Card, cx, Loading, PageHeader, ProgressBar, Tabs } from "@/components/ui";

const STATE_CLS: Record<DayVisualState, string> = {
  completed: "border-good/40 bg-good-soft text-good",
  today: "border-accent bg-accent text-accent-ink font-semibold",
  in_progress: "border-accent bg-accent-soft text-accent font-semibold",
  missed: "border-warn/50 bg-warn-soft text-warn",
  skipped: "border-line bg-surface-2 text-faint",
  upcoming: "border-line bg-surface text-muted hover:bg-surface-2",
};

export default function RoadmapPage() {
  const state = useAppState();
  const today = useToday();
  const [view, setView] = useState<"calendar" | "list">("calendar");
  if (!state || !today) return <Loading />;
  const lang = state.settings.uiLanguage;
  const ps = planStatus(state, today);
  const lessons = getCurriculum();
  const label: Record<DayVisualState, string> = {
    completed: pick(lang, "Hoàn thành", "Completed"),
    today: pick(lang, "Hôm nay", "Today"),
    in_progress: pick(lang, "Đang học", "In progress"),
    missed: pick(lang, "Bị lỡ", "Missed"),
    skipped: pick(lang, "Bỏ qua", "Skipped"),
    upcoming: pick(lang, "Sắp tới", "Upcoming"),
  };

  return (
    <div>
      <PageHeader
        title={pick(lang, "Lộ trình 90 ngày", "90-Day Roadmap")}
        description={`${formatDmy(dateOfLesson(state, 1))} → ${formatDmy(dateOfLesson(state, TOTAL_DAYS))} · ${ps.completedCount}/90 ${pick(lang, "bài đã hoàn thành. Bấm vào bất kỳ ngày nào để mở bài — không bài nào bị khóa.", "lessons completed. Click any day to open it — nothing is locked.")}`}
        actions={<Tabs label="View" value={view} onChange={setView} tabs={[{ id: "calendar", label: pick(lang, "Lịch", "Calendar") }, { id: "list", label: pick(lang, "Danh sách", "List") }]} />}
      />

      <ul className="mb-6 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted" aria-label="Legend">
        {(["completed", "today", "upcoming", "missed", "skipped"] as DayVisualState[]).map((s) => (
          <li key={s} className="inline-flex items-center gap-1.5">
            <span className={cx("h-3.5 w-3.5 rounded border", STATE_CLS[s])} /> {label[s]}
          </li>
        ))}
        <li className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-info" /> {pick(lang, "Ngày ôn tập", "Review day")}</li>
        <li className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rotate-45 bg-warn" /> {pick(lang, "Mốc đánh giá", "Checkpoint")}</li>
      </ul>

      <div className="space-y-8">
        {PHASES.map((ph) => {
          const days = lessons.filter((l) => l.phase === ph.id);
          const done = days.filter((l) => state.lessons[String(l.day)]?.status === "completed").length;
          const weeks = [...new Set(days.map((l) => l.week))];
          return (
            <section key={ph.id} aria-labelledby={`ph-${ph.id}`}>
              <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
                <div>
                  <p className="text-xs uppercase tracking-wider text-faint">
                    {pick(lang, "Giai đoạn", "Phase")} {ph.id} · {pick(lang, "Ngày", "Days")} {ph.days[0]}{ph.days[1] !== ph.days[0] ? `–${ph.days[1]}` : ""}
                  </p>
                  <h2 id={`ph-${ph.id}`} className="text-lg font-semibold text-ink">{pick(lang, ph.nameVi, ph.name)}</h2>
                </div>
                <span className="text-xs tabular-nums text-muted">{done}/{days.length}</span>
              </div>
              <ProgressBar value={(done / days.length) * 100} className="mb-4" label={`Phase ${ph.id} progress`} tone="good" />
              <Card className="!p-4">
                <div className="space-y-4">
                  {weeks.map((w) => {
                    const wd = days.filter((l) => l.week === w);
                    const theme = WEEK_THEMES[w - 1];
                    return (
                      <div key={w}>
                        <div className="mb-2 flex items-baseline justify-between gap-2">
                          <p className="text-sm text-ink">
                            <span className="font-medium">{pick(lang, "Tuần", "Week")} {w}</span>
                            <span className="ml-2 text-muted">{theme ? pick(lang, theme.themeVi, theme.theme) : ""}</span>
                          </p>
                          <Link href={`/review/${w}`} className="shrink-0 text-xs text-faint hover:text-ink">{pick(lang, "Tổng kết tuần", "Weekly review")} →</Link>
                        </div>
                        {view === "calendar" ? (
                          <ol className="grid grid-cols-7 gap-1.5 sm:gap-2">
                            {wd.map((l) => {
                              const vs = dayVisualState(state, l.day, ps.calendarDay);
                              const date = dateOfLesson(state, l.day);
                              return (
                                <li key={l.day} style={{ gridColumnStart: ((l.day - 1) % 7) + 1 }}>
                                  <Link href={`/day/${l.day}`} title={`${l.title} — ${label[vs]}`} aria-label={`Day ${l.day}, ${formatDmy(date)}: ${l.title} (${label[vs]})`} className={cx("relative flex h-14 flex-col items-center justify-center rounded-lg border text-sm tabular-nums transition-colors sm:h-16", STATE_CLS[vs])}>
                                    <span>{l.day}</span>
                                    <span className="text-[10px] opacity-70">{formatDmy(date).slice(0, 5)}</span>
                                    {l.isReviewDay && <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-info" aria-hidden />}
                                    {l.checkpoint && <span className="absolute right-1.5 top-1.5 h-2 w-2 rotate-45 bg-warn" aria-hidden />}
                                  </Link>
                                </li>
                              );
                            })}
                          </ol>
                        ) : (
                          <ol className="divide-y divide-line">
                            {wd.map((l) => {
                              const vs = dayVisualState(state, l.day, ps.calendarDay);
                              const date = dateOfLesson(state, l.day);
                              return (
                                <li key={l.day}>
                                  <Link href={`/day/${l.day}`} className="flex items-center gap-3 py-2.5 hover:bg-surface-2">
                                    <span className={cx("grid h-8 w-8 shrink-0 place-items-center rounded-lg border text-xs tabular-nums", STATE_CLS[vs])}>{l.day}</span>
                                    <span className="min-w-0 flex-1">
                                      <span className="block truncate text-sm text-ink">{l.title}</span>
                                      <span className="block text-xs text-faint">{weekdayShort(date, lang)} {formatDmy(date)} · ~{l.estimatedMinutes} min</span>
                                    </span>
                                    {l.isReviewDay && <Badge tone="info">{pick(lang, "Ôn tập", "Review")}</Badge>}
                                    {l.checkpoint && <Badge tone="warn">{pick(lang, "Mốc", "Checkpoint")}</Badge>}
                                    <span className="hidden text-xs text-muted sm:inline">{label[vs]}</span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ol>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>
            </section>
          );
        })}
      </div>
    </div>
  );
}
