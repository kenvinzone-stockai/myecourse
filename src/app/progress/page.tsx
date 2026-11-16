"use client";

import Link from "next/link";
import { useAppState, useToday } from "@/store/store";
import { PHASES, getCurriculum } from "@/lib/curriculum";
import { addDays, TOTAL_DAYS, weekOfDay } from "@/lib/domain/dates";
import { dateOfLesson, planStatus, studyStreak, totalMinutes } from "@/lib/engine/plan";
import { allScores, recurringWeaknesses, SKILLS, trend, WEAKNESS_LABEL } from "@/lib/engine/scoring";
import { bandFor, BAND_INFO } from "@/lib/engine/adaptive";
import { learnerLevel } from "@/lib/engine/personalize";
import { SKILL_LABEL } from "@/lib/engine/reports";
import { formatSeconds } from "@/lib/speech";
import { countWords } from "@/lib/engine/writing";
import { pick } from "@/lib/i18n";
import { BarChart, LineChart, ScoreBar } from "@/components/charts";
import { RemediationCard } from "@/components/plan/PlanCards";
import { Badge, ButtonLink, Card, Loading, PageHeader, ProgressBar, SectionTitle, Stat } from "@/components/ui";

const COLORS = { reading: "#2d7d6b", writing: "#b0762a", speaking: "#5a6fb0", vocabulary: "#9a5a8f" } as const;

export default function ProgressPage() {
  const state = useAppState();
  const today = useToday();
  if (!state || !today) return <Loading />;
  const lang = state.settings.uiLanguage;
  const ps = planStatus(state, today);
  const start = dateOfLesson(state, 1);
  const scores = allScores(state, today, start);
  const level = learnerLevel(state);
  const lessons = getCurriculum();
  const vocab = Object.values(state.vocab);
  const ranked = SKILLS.filter((s) => scores[s] !== undefined).sort((a, b) => scores[b]! - scores[a]!);
  const weak = recurringWeaknesses(state, today);
  const curWeek = Math.max(1, weekOfDay(Math.max(1, ps.calendarDay)));
  const weeks = Array.from({ length: 13 }, (_, i) => i + 1);
  const target = (state.profile?.dailyMinutes ?? 65) * 7;
  const weekly = weeks.map((w) => {
    const first = addDays(start, (w - 1) * 7);
    let m = 0;
    for (let i = 0; i < 7; i++) m += state.activity[addDays(first, i)] ?? 0;
    return { label: `W${w}`, value: m, target };
  });
  const weekDone = weeks.map((w) => ({ label: `W${w}`, value: lessons.filter((l) => l.week === w && state.lessons[String(l.day)]?.status === "completed").length }));
  const wordsWritten = Object.values(state.lessons).filter((l) => l.writingSubmittedAt).reduce((a, l) => a + countWords(l.writingDraft), 0);
  const qs = lessons.filter((l) => l.reading && state.lessons[String(l.day)]?.readingChecked);
  const qTotal = qs.reduce((a, l) => a + l.reading!.questions.length, 0);
  const qOk = qs.reduce((a, l) => a + l.reading!.questions.filter((q) => state.lessons[String(l.day)]!.readingAnswers[q.id] === q.answer).length, 0);
  const speakSec = state.speaking.reduce((a, s) => a + s.seconds, 0);
  const reviews = vocab.reduce((a, c) => a + c.reviews, 0);
  const A = state.assessments;

  return (
    <div className="space-y-6">
      <PageHeader title={pick(lang, "Tiến độ", "Progress")} description={pick(lang, "Số liệu khách quan tách riêng với điểm tự đánh giá. Trình độ CEFR chỉ là ước tính.", "Objective metrics are kept separate from self-assessed ones. The CEFR level is only an estimate.")} />

      <Card>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted">{pick(lang, "Trình độ CEFR ước tính", "Estimated CEFR level")}</p>
            <p className="mt-1 text-4xl font-semibold tracking-tight text-ink">{level ?? "—"} <span className="align-middle text-sm font-normal text-faint">({pick(lang, "ước tính", "estimate")})</span></p>
            <p className="mt-1 text-xs text-muted">{pick(lang, "Mục tiêu", "Target")}: {state.profile?.targetLevel ?? "—"} · {pick(lang, "Cập nhật tại mỗi mốc đánh giá (đầu vào, Ngày 30, 60, 90).", "Updated at each assessment (baseline, Day 30, 60, 90).")}</p>
          </div>
          {!A.baseline && <ButtonLink href="/assessment/baseline">{pick(lang, "Làm bài đánh giá đầu vào", "Take the baseline assessment")}</ButtonLink>}
        </div>
        <ol className="mt-5 grid gap-2 sm:grid-cols-4">
          {(["baseline", "day30", "day60", "final"] as const).map((k) => (
            <li key={k} className="rounded-xl border border-line p-3">
              <p className="text-xs text-faint">{{ baseline: pick(lang, "Đầu vào", "Baseline"), day30: "Day 30", day60: "Day 60", final: "Day 90" }[k]}</p>
              {A[k] ? <p className="mt-1 text-sm text-ink"><span className="font-semibold">{A[k]!.cefr}</span> · {A[k]!.overall}/100</p> : <Link href={`/assessment/${k}`} className="mt-1 block text-sm text-muted underline">{pick(lang, "Chưa làm", "Not taken")}</Link>}
            </li>
          ))}
        </ol>
        {A.baseline && A.final && <ButtonLink href="/report" className="mt-4" variant="secondary">{pick(lang, "Báo cáo Ngày 1 ↔ Ngày 90", "Day 1 ↔ Day 90 report")}</ButtonLink>}
      </Card>

      <section aria-labelledby="obj">
        <h2 id="obj" className="mb-3 text-sm font-medium text-muted">{pick(lang, "Số liệu khách quan", "Objective metrics")}</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Card className="!p-4"><Stat label={pick(lang, "Bài đã hoàn thành", "Days completed")} value={`${ps.completedCount}/${TOTAL_DAYS}`} /></Card>
          <Card className="!p-4"><Stat label={pick(lang, "Chuỗi ngày học", "Study streak")} value={studyStreak(state, today)} /></Card>
          <Card className="!p-4"><Stat label={pick(lang, "Tổng số phút học", "Total study minutes")} value={Math.round(totalMinutes(state)).toLocaleString()} /></Card>
          <Card className="!p-4"><Stat label={pick(lang, "Câu đọc hiểu đúng", "Reading questions correct")} value={qTotal ? `${qOk}/${qTotal}` : "—"} /></Card>
          <Card className="!p-4"><Stat label={pick(lang, "Số từ đã viết", "Words written")} value={wordsWritten.toLocaleString()} /></Card>
          <Card className="!p-4"><Stat label={pick(lang, "Thời lượng nói", "Speaking time")} value={formatSeconds(speakSec)} /></Card>
          <Card className="!p-4"><Stat label={pick(lang, "Từ vựng đã thuộc", "Vocabulary known")} value={`${vocab.filter((c) => c.status === "known").length}/${vocab.length}`} /></Card>
          <Card className="!p-4"><Stat label={pick(lang, "Lượt ôn từ", "Vocabulary reviews")} value={reviews} /></Card>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <SectionTitle title={pick(lang, "Điểm kỹ năng hiện tại", "Current skill scores")} />
          <div className="space-y-4">
            {SKILLS.map((s) => <ScoreBar key={s} label={pick(lang, SKILL_LABEL[s].vi, SKILL_LABEL[s].en)} value={scores[s]} band={scores[s] !== undefined ? pick(lang, BAND_INFO[bandFor(scores[s])].vi, BAND_INFO[bandFor(scores[s])].en) : undefined} />)}
            <ScoreBar label={pick(lang, "Đều đặn (14 ngày)", "Consistency (14 days)")} value={scores.consistency} />
          </div>
          <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div><dt className="text-muted">{pick(lang, "Kỹ năng mạnh nhất", "Strongest skill")}</dt><dd className="font-medium text-ink">{ranked[0] ? pick(lang, SKILL_LABEL[ranked[0]].vi, SKILL_LABEL[ranked[0]].en) : "—"}</dd></div>
            <div><dt className="text-muted">{pick(lang, "Cần chú ý nhất", "Needs most attention")}</dt><dd className="font-medium text-ink">{ranked.length > 1 ? pick(lang, SKILL_LABEL[ranked.at(-1)!].vi, SKILL_LABEL[ranked.at(-1)!].en) : "—"}</dd></div>
          </dl>
          <p className="mt-4 text-xs text-faint">{pick(lang, "Dưới 60: thêm hỗ trợ · 60–79: đúng mức · 80+: tăng độ khó. Viết & Nói dựa nhiều vào tự đánh giá (chủ quan).", "Below 60: more support · 60–79: on target · 80+: stretch. Writing & Speaking rely largely on self-rating (subjective).")}</p>
        </Card>
        <Card>
          <SectionTitle title={pick(lang, "Xu hướng Đọc · Viết · Nói", "Reading · Writing · Speaking trends")} />
          <LineChart series={(["reading", "writing", "speaking"] as const).map((s) => ({ name: SKILL_LABEL[s].en, color: COLORS[s], points: trend(state.skillEvents, s).map((p) => ({ x: p.date, y: p.score })) }))} emptyText={pick(lang, "Hoàn thành bài học để thấy xu hướng.", "Complete lessons to see trends.")} />
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <SectionTitle title={pick(lang, "Phút học mỗi tuần", "Study minutes per week")} />
          <BarChart data={weekly} highlightIndex={curWeek - 1} unit=" min" />
          <p className="mt-1 text-xs text-faint">{pick(lang, "Đường gạch: mục tiêu tuần của bạn.", "Dashed line: your weekly target.")}</p>
        </Card>
        <Card>
          <SectionTitle title={pick(lang, "Bài hoàn thành mỗi tuần", "Lessons completed per week")} />
          <BarChart data={weekDone} max={7} highlightIndex={curWeek - 1} />
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <SectionTitle title={pick(lang, "Tiến độ theo giai đoạn", "Phase progress")} />
          <ul className="space-y-4">
            {PHASES.map((ph) => {
              const ds = lessons.filter((l) => l.phase === ph.id);
              const done = ds.filter((l) => state.lessons[String(l.day)]?.status === "completed").length;
              return (
                <li key={ph.id}>
                  <div className="mb-1 flex justify-between text-sm"><span className="text-ink">{ph.id}. {pick(lang, ph.nameVi, ph.name)}</span><span className="tabular-nums text-muted">{done}/{ds.length}</span></div>
                  <ProgressBar value={(done / ds.length) * 100} tone="good" label={ph.name} />
                </li>
              );
            })}
          </ul>
        </Card>
        <Card>
          <SectionTitle title={pick(lang, "Điểm yếu lặp lại", "Weak areas")} />
          {weak.length ? (
            <ul className="space-y-2">{weak.map((w) => <li key={w.tag} className="flex items-center justify-between text-sm"><span className="text-ink">{pick(lang, WEAKNESS_LABEL[w.tag].vi, WEAKNESS_LABEL[w.tag].en)}</span><Badge tone="warn">{w.count} {pick(lang, "buổi", "sessions")}</Badge></li>)}</ul>
          ) : (
            <p className="text-sm text-muted">{pick(lang, "Chưa có điểm yếu nào lặp lại từ 3 buổi trở lên trong 21 ngày qua.", "No weakness has appeared in 3 or more sessions over the last 21 days.")}</p>
          )}
          <div className="mt-4"><RemediationCard state={state} today={today} compact /></div>
          <p className="mt-4 text-sm"><Link href={`/review/${curWeek}`} className="text-muted underline">{pick(lang, `Tổng kết Tuần ${curWeek}`, `Week ${curWeek} review`)}</Link></p>
        </Card>
      </div>
    </div>
  );
}
