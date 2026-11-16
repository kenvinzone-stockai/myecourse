"use client";

import Link from "next/link";
import { useState } from "react";
import type { Skill, WeeklyReviewEntry } from "@/lib/domain/types";
import { saveWeeklyReview, useAppState, useToday } from "@/store/store";
import { getLesson, WEEK_THEMES } from "@/lib/curriculum";
import { SKILL_LABEL, weeklySummary } from "@/lib/engine/reports";
import { formatDmy } from "@/lib/domain/dates";
import { dateOfLesson } from "@/lib/engine/plan";
import { formatSeconds } from "@/lib/speech";
import { requestAi } from "@/lib/ai/client";
import { useAiStatus } from "@/components/writing/WritingEditor";
import { pick } from "@/lib/i18n";
import { Badge, Button, ButtonLink, Card, Field, Loading, PageHeader, Rating, SectionTitle, Select, Stat, TextArea } from "@/components/ui";

export function WeekClient({ week }: { week: number }) {
  const state = useAppState();
  const today = useToday();
  const ai = useAiStatus();
  const [draft, setDraft] = useState<WeeklyReviewEntry | null>(null);
  const [justSaved, setJustSaved] = useState(false);
  const [coach, setCoach] = useState<string | null>(null);
  if (!state || !today) return <Loading />;
  const lang = state.settings.uiLanguage;
  const sum = weeklySummary(state, week, today);
  const theme = WEEK_THEMES[week - 1];
  const entry: WeeklyReviewEntry = draft ?? state.weeklyReviews[String(week)] ?? { week, improved: "", difficult: "", usefulVocab: "", focusSkill: "", confidenceVsLastWeek: 0 };
  const set = (p: Partial<WeeklyReviewEntry>) => { setDraft({ ...entry, ...p }); setJustSaved(false); };
  const reviewDay = week * 7 <= 84 ? week * 7 : undefined;
  const name = (s?: Skill) => (s ? pick(lang, SKILL_LABEL[s].vi, SKILL_LABEL[s].en) : "—");

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={`${formatDmy(dateOfLesson(state, sum.days[0]))} – ${formatDmy(dateOfLesson(state, sum.days.at(-1)!))}`}
        title={`${pick(lang, "Tổng kết Tuần", "Week")} ${week}${lang === "en" ? " review" : ""}`}
        description={theme ? pick(lang, theme.themeVi, theme.theme) : undefined}
        actions={<>
          {week > 1 && <ButtonLink href={`/review/${week - 1}`} variant="ghost" size="sm">← {pick(lang, "Tuần", "Week")} {week - 1}</ButtonLink>}
          {week < 13 && <ButtonLink href={`/review/${week + 1}`} variant="ghost" size="sm">{pick(lang, "Tuần", "Week")} {week + 1} →</ButtonLink>}
        </>}
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Card className="!p-4"><Stat label={pick(lang, "Bài hoàn thành", "Lessons completed")} value={`${sum.completed}/${sum.days.length}`} /></Card>
        <Card className="!p-4"><Stat label={pick(lang, "Phút đã học", "Minutes studied")} value={Math.round(sum.minutes)} /></Card>
        <Card className="!p-4"><Stat label={pick(lang, "Đọc: điểm TB", "Reading: avg score")} value={sum.readingAvg ?? "—"} /></Card>
        <Card className="!p-4"><Stat label={pick(lang, "Viết", "Writing")} value={sum.writingCount} hint={`${sum.writingWords} words`} /></Card>
        <Card className="!p-4"><Stat label={pick(lang, "Nói", "Speaking")} value={formatSeconds(sum.speakingSeconds)} hint={`${sum.speakingCount} ${pick(lang, "lần ghi", "takes")}`} /></Card>
        <Card className="!p-4"><Stat label={pick(lang, "Từ vựng mới", "Vocabulary learned")} value={sum.vocabAdded} /></Card>
        <Card className="!p-4"><Stat label={pick(lang, "Mạnh nhất", "Strongest area")} value={<span className="text-lg">{name(sum.strongest)}</span>} /></Card>
        <Card className="!p-4"><Stat label={pick(lang, "Khó nhất", "Most difficult area")} value={<span className="text-lg">{name(sum.weakest)}</span>} /></Card>
      </div>

      <Card>
        <SectionTitle title={pick(lang, "Đề xuất cho tuần tới", "Recommendation for next week")} />
        <ul className="space-y-2 text-sm leading-relaxed text-ink">{sum.recommendation.map((r) => <li key={r}>• {r}</li>)}</ul>
        {entry.focusSkill && <p className="mt-3 text-sm text-muted">{pick(lang, "Bạn chọn tập trung vào", "Your chosen focus")}: <strong className="text-ink">{name(entry.focusSkill)}</strong></p>}
        {ai?.available && (
          <div className="mt-4 border-t border-line pt-4">
            <Button size="sm" variant="secondary" onClick={async () => { const r = await requestAi({ capability: "weekly-coaching", input: { summary: JSON.stringify({ ...sum, reflection: entry }) } }); setCoach(r.ok ? r.feedback : r.error); }}>AI coaching summary</Button>
            {coach && <pre className="mt-3 whitespace-pre-wrap font-sans text-sm">{coach}</pre>}
          </div>
        )}
      </Card>

      <Card>
        <SectionTitle title={pick(lang, "Các bài trong tuần", "This week's lessons")} action={reviewDay ? <ButtonLink size="sm" variant="secondary" href={`/day/${reviewDay}`}>{pick(lang, "Mở bài ôn tập tuần", "Open the review lesson")}</ButtonLink> : undefined} />
        <ul className="divide-y divide-line">
          {sum.days.map((d) => {
            const st = state.lessons[String(d)]?.status ?? "not_started";
            return (
              <li key={d}><Link href={`/day/${d}`} className="flex items-center justify-between gap-3 py-2.5 text-sm hover:bg-surface-2"><span className="truncate text-ink">Day {d} · {getLesson(d)!.title}</span><Badge tone={st === "completed" ? "good" : st === "in_progress" ? "accent" : "neutral"}>{st.replace("_", " ")}</Badge></Link></li>
            );
          })}
        </ul>
      </Card>

      <Card>
        <SectionTitle title={pick(lang, "Nhìn lại tuần này", "Your reflection")} />
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); saveWeeklyReview(entry); setDraft(null); setJustSaved(true); }}>
          <Field label="1. What improved this week?" htmlFor="w1"><TextArea id="w1" value={entry.improved} onChange={(e) => set({ improved: e.target.value })} /></Field>
          <Field label="2. What was difficult?" htmlFor="w2"><TextArea id="w2" value={entry.difficult} onChange={(e) => set({ difficult: e.target.value })} /></Field>
          <Field label="3. Which vocabulary was most useful?" htmlFor="w3"><TextArea id="w3" className="min-h-16" value={entry.usefulVocab} onChange={(e) => set({ usefulVocab: e.target.value })} /></Field>
          <Field label="4. Which skill needs more attention next week?" htmlFor="w4">
            <Select id="w4" value={entry.focusSkill} onChange={(e) => set({ focusSkill: e.target.value as Skill | "" })} className="sm:!w-64">
              <option value="">—</option>
              {(["reading", "writing", "speaking", "vocabulary"] as Skill[]).map((s) => <option key={s} value={s}>{SKILL_LABEL[s].en}</option>)}
            </Select>
          </Field>
          <Rating label="5. How confident do you feel compared with last week?" value={entry.confidenceVsLastWeek || undefined} onChange={(v) => set({ confidenceVsLastWeek: v })} lowLabel="Much less" highLabel="Much more" />
          <div className="flex items-center gap-3"><Button type="submit">{pick(lang, "Lưu tổng kết tuần", "Save weekly review")}</Button>{justSaved && <Badge tone="good">{pick(lang, "Đã lưu", "Saved")}</Badge>}</div>
        </form>
      </Card>
    </div>
  );
}
