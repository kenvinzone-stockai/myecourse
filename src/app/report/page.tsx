"use client";

import { useAppState, useToday } from "@/store/store";
import { finalReport, SKILL_LABEL } from "@/lib/engine/reports";
import { SKILLS } from "@/lib/engine/scoring";
import { planStatus, totalMinutes } from "@/lib/engine/plan";
import { AudioPlayer } from "@/components/speaking/Recorder";
import { pick } from "@/lib/i18n";
import { Badge, ButtonLink, Card, EmptyState, Loading, PageHeader, SectionTitle, Stat } from "@/components/ui";

export default function ReportPage() {
  const state = useAppState();
  const today = useToday();
  if (!state || !today) return <Loading />;
  const lang = state.settings.uiLanguage;
  const rep = finalReport(state);
  if (!rep) {
    const missing = !state.assessments.baseline ? "baseline" : "final";
    return (
      <div>
        <PageHeader title={pick(lang, "Báo cáo cuối khóa", "Final progress report")} />
        <EmptyState
          title={pick(lang, "Báo cáo cần cả bài đánh giá đầu vào và bài đánh giá cuối khóa.", "The report needs both the baseline and the final assessment.")}
          body={missing === "baseline" ? pick(lang, "Bạn chưa làm bài đánh giá đầu vào.", "You haven't taken the baseline assessment yet.") : pick(lang, "Bài đánh giá cuối khóa mở ở Ngày 90 (13/02/2027) — bạn cũng có thể làm sớm.", "The final assessment is scheduled for Day 90 (13/02/2027) — you can also take it early.")}
          action={<ButtonLink href={`/assessment/${missing}`}>{missing === "baseline" ? pick(lang, "Làm bài đầu vào", "Take the baseline") : pick(lang, "Làm bài cuối khóa", "Take the final assessment")}</ButtonLink>}
        />
      </div>
    );
  }
  const ps = planStatus(state, today);
  const vocab = Object.values(state.vocab);
  const days = Object.values(state.activity).filter((m) => m >= 10).length;
  const firstRec = state.speaking.find((s) => rep.baseline.speaking.recordingIds.includes(s.id) && s.audioId);
  const lastRec = state.speaking.filter((s) => rep.final.speaking.recordingIds.includes(s.id) && s.audioId).find((s) => s.prompt === firstRec?.prompt);
  const sign = (n: number) => (n > 0 ? `+${n}` : String(n));

  return (
    <div className="space-y-6">
      <PageHeader title={pick(lang, "Ngày 1 ↔ Ngày 90", "Day 1 ↔ Day 90")} description={pick(lang, "So sánh hai bài đánh giá có cùng cấu trúc. Điểm Viết và Nói dựa nhiều vào tự đánh giá, nên hãy đọc lại bài viết và nghe lại bản ghi để tự kiểm chứng.", "A comparison of two assessments with the same structure. Writing and Speaking rely largely on self-rating, so reread your texts and replay your recordings to judge for yourself.")} />

      <Card>
        <div className="grid gap-6 sm:grid-cols-3">
          <Stat label={pick(lang, "Đầu vào (ước tính)", "Baseline (estimate)")} value={rep.baseline.cefr} hint={`${rep.baseline.overall}/100`} />
          <Stat label={pick(lang, "Ngày 90 (ước tính)", "Day 90 (estimate)")} value={rep.final.cefr} hint={`${rep.final.overall}/100`} />
          <Stat label={pick(lang, "Thay đổi tổng thể", "Overall change")} value={sign(rep.overallDelta)} hint={pick(lang, "điểm", "points")} />
        </div>
      </Card>

      <Card>
        <SectionTitle title={pick(lang, "Theo từng kỹ năng", "By skill")} />
        <table className="w-full text-sm">
          <thead><tr className="text-left text-xs text-faint"><th className="pb-2 font-medium">Skill</th><th className="pb-2 font-medium">Day 1</th><th className="pb-2 font-medium">Day 90</th><th className="pb-2 font-medium">Δ</th><th className="hidden pb-2 font-medium sm:table-cell" /></tr></thead>
          <tbody className="divide-y divide-line">
            {SKILLS.map((s) => (
              <tr key={s}>
                <td className="py-2.5 text-ink">{pick(lang, SKILL_LABEL[s].vi, SKILL_LABEL[s].en)}</td>
                <td className="tabular-nums text-muted">{rep.baseline.scores[s]}</td>
                <td className="tabular-nums text-ink">{rep.final.scores[s]}</td>
                <td className="tabular-nums"><Badge tone={rep.deltas[s] > 0 ? "good" : rep.deltas[s] < 0 ? "warn" : "neutral"}>{sign(rep.deltas[s])}</Badge></td>
                <td className="hidden w-1/3 sm:table-cell"><span className="relative block h-1.5 rounded-full bg-surface-2"><span className="absolute inset-y-0 left-0 rounded-full bg-faint/50" style={{ width: `${rep.baseline.scores[s]}%` }} /><span className="absolute inset-y-0 left-0 rounded-full bg-accent/80" style={{ width: `${rep.final.scores[s]}%`, mixBlendMode: "multiply" }} /></span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
          <div><dt className="text-muted">{pick(lang, "Tiến bộ nhiều nhất", "Strongest improvement")}</dt><dd className="font-medium text-ink">{pick(lang, SKILL_LABEL[rep.strongestImprovement].vi, SKILL_LABEL[rep.strongestImprovement].en)} ({sign(rep.deltas[rep.strongestImprovement])})</dd></div>
          <div><dt className="text-muted">{pick(lang, "Điểm yếu còn lại", "Remaining weakness")}</dt><dd className="font-medium text-ink">{pick(lang, SKILL_LABEL[rep.remainingWeakness].vi, SKILL_LABEL[rep.remainingWeakness].en)} ({rep.final.scores[rep.remainingWeakness]})</dd></div>
        </dl>
      </Card>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Card className="!p-4"><Stat label={pick(lang, "Bài hoàn thành", "Lessons completed")} value={`${ps.completedCount}/90`} /></Card>
        <Card className="!p-4"><Stat label={pick(lang, "Số ngày có học", "Days studied")} value={days} /></Card>
        <Card className="!p-4"><Stat label={pick(lang, "Tổng phút học", "Total minutes")} value={Math.round(totalMinutes(state)).toLocaleString()} /></Card>
        <Card className="!p-4"><Stat label={pick(lang, "Từ vựng: đã thuộc / đã lưu", "Vocabulary: known / saved")} value={`${vocab.filter((c) => c.status === "known").length}/${vocab.length}`} /></Card>
      </div>

      <Card>
        <SectionTitle title={pick(lang, "Cùng một đề viết — hai thời điểm", "Same writing task — two moments")} />
        <div className="grid gap-4 md:grid-cols-2">
          {[["Day 1", rep.baseline], ["Day 90", rep.final]].map(([label, r]) => {
            const a = r as typeof rep.baseline;
            return (
              <div key={label as string} className="rounded-xl bg-surface-2/50 p-4">
                <p className="mb-2 text-xs text-faint">{label as string} · {a.writing.wordCounts.at(-1) ?? 0} words</p>
                <p className="whitespace-pre-wrap font-serif text-[15px] leading-relaxed text-ink">{a.writing.texts.at(-1) || "—"}</p>
              </div>
            );
          })}
        </div>
        {firstRec?.audioId && (
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div><p className="mb-1 text-xs text-faint">Day 1 · speaking</p><AudioPlayer audioId={firstRec.audioId} /></div>
            {lastRec?.audioId && <div><p className="mb-1 text-xs text-faint">Day 90 · speaking</p><AudioPlayer audioId={lastRec.audioId} /></div>}
          </div>
        )}
      </Card>

      <Card>
        <SectionTitle title={pick(lang, "Đề xuất cho 90 ngày tiếp theo", "Recommendation for your next 90 days")} />
        <ul className="space-y-2 text-sm leading-relaxed text-ink">{rep.nextPlan.map((p) => <li key={p}>• {p}</li>)}</ul>
      </Card>
    </div>
  );
}
