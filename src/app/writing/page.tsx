"use client";

import Link from "next/link";
import { useState } from "react";
import { useAppState, useToday } from "@/store/store";
import { getCurriculum } from "@/lib/curriculum";
import { planStatus } from "@/lib/engine/plan";
import { currentSkillScore, trend } from "@/lib/engine/scoring";
import { countWords, WRITING_RUBRIC } from "@/lib/engine/writing";
import { pick } from "@/lib/i18n";
import { LineChart } from "@/components/charts";
import { Badge, ButtonLink, Card, EmptyState, Loading, PageHeader, SectionTitle, Stat } from "@/components/ui";

export default function WritingPage() {
  const state = useAppState();
  const today = useToday();
  const [open, setOpen] = useState<number | null>(null);
  if (!state || !today) return <Loading />;
  const lang = state.settings.uiLanguage;
  const ps = planStatus(state, today);
  const all = getCurriculum().filter((l) => l.writing);
  const P = (d: number) => state.lessons[String(d)];
  const submitted = all.filter((l) => P(l.day)?.writingSubmittedAt);
  const drafts = all.filter((l) => !P(l.day)?.writingSubmittedAt && (P(l.day)?.writingDraft ?? "").trim());
  const next = all.filter((l) => !P(l.day)?.writingSubmittedAt && l.day >= ps.currentDay).slice(0, 4);
  const totalWords = submitted.reduce((a, l) => a + countWords(P(l.day)!.writingDraft), 0);
  const score = currentSkillScore(state.skillEvents, "writing");
  const rubricAvg = WRITING_RUBRIC.map((c) => {
    const vals = submitted.slice(-5).map((l) => P(l.day)!.writingRubric[c.id]).filter((v) => typeof v === "number");
    return { ...c, avg: vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : undefined };
  });

  return (
    <div className="space-y-6">
      <PageHeader title={pick(lang, "Viết", "Writing")} description={pick(lang, "Bài viết hằng ngày, bản nháp, điểm rubric và lịch sử tiến bộ.", "Daily writing tasks, drafts, rubric scores and your improvement history.")} />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Card className="!p-4"><Stat label={pick(lang, "Điểm viết hiện tại", "Current writing score")} value={score ?? "—"} /></Card>
        <Card className="!p-4"><Stat label={pick(lang, "Bài đã nộp", "Submitted")} value={submitted.length} /></Card>
        <Card className="!p-4"><Stat label={pick(lang, "Bản nháp", "Drafts")} value={drafts.length} /></Card>
        <Card className="!p-4"><Stat label={pick(lang, "Tổng số từ đã viết", "Total words written")} value={totalWords.toLocaleString()} /></Card>
      </div>

      <Card>
        <SectionTitle title={pick(lang, "Bài viết cần làm", "Writing assignments")} />
        <ul className="divide-y divide-line">
          {[...drafts.filter((d) => !next.includes(d)), ...next].map((l, i) => (
            <li key={l.day} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-center gap-2 text-sm font-medium text-ink">Day {l.day} · {l.title} <Badge tone="accent">{l.writing!.type}</Badge>{(P(l.day)?.writingDraft ?? "").trim() && <Badge tone="warn">{pick(lang, "Nháp", "Draft")} · {countWords(P(l.day)!.writingDraft)} words</Badge>}</p>
                <p className="mt-1 line-clamp-2 text-sm text-muted">{l.writing!.prompt}</p>
              </div>
              <ButtonLink href={`/day/${l.day}`} size="sm" variant={i === 0 ? "primary" : "secondary"}>{pick(lang, "Mở", "Open")}</ButtonLink>
            </li>
          ))}
        </ul>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <SectionTitle title={pick(lang, "Tiến bộ theo thời gian", "Improvement over time")} />
          <LineChart series={[{ name: "Writing", color: "var(--accent)", points: trend(state.skillEvents, "writing").map((p) => ({ x: p.date, y: p.score })) }]} emptyText={pick(lang, "Nộp bài viết đầu tiên để thấy biểu đồ.", "Submit your first writing to see a trend.")} />
        </Card>
        <Card>
          <SectionTitle title={pick(lang, "Rubric trung bình (5 bài gần nhất)", "Rubric average (last 5 texts)")} />
          <ul className="space-y-2.5">
            {rubricAvg.map((c) => (
              <li key={c.id} className="flex items-center gap-3 text-sm">
                <span className="w-40 shrink-0 text-ink">{pick(lang, c.labelVi, c.label)}</span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2"><span className="block h-full rounded-full bg-accent" style={{ width: `${((c.avg ?? 0) / 5) * 100}%` }} /></span>
                <span className="w-8 text-right tabular-nums text-muted">{c.avg?.toFixed(1) ?? "—"}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-faint">{pick(lang, "Điểm tự đánh giá (chủ quan).", "Self-assessed (subjective).")}</p>
        </Card>
      </div>

      <Card>
        <SectionTitle title={pick(lang, "Lịch sử bài viết", "Writing history")} />
        {submitted.length ? (
          <ul className="divide-y divide-line">
            {submitted.slice().reverse().map((l) => {
              const p = P(l.day)!;
              return (
                <li key={l.day} className="py-3">
                  <button className="flex w-full items-center justify-between gap-3 text-left" aria-expanded={open === l.day} onClick={() => setOpen(open === l.day ? null : l.day)}>
                    <span className="min-w-0 truncate text-sm text-ink">Day {l.day} · {l.title}</span>
                    <span className="flex shrink-0 items-center gap-2 text-xs text-muted"><span className="tabular-nums">{countWords(p.writingDraft)} words</span><Badge tone="accent">{p.writingScore ?? "—"}</Badge></span>
                  </button>
                  {open === l.day && (
                    <div className="mt-3 animate-in rounded-xl bg-surface-2/50 p-4">
                      <p className="mb-2 text-xs text-muted">{l.writing!.prompt}</p>
                      <p className="whitespace-pre-wrap font-serif text-[15px] leading-relaxed text-ink">{p.writingDraft}</p>
                      {p.aiFeedback && <pre className="mt-3 whitespace-pre-wrap border-t border-line pt-3 font-sans text-sm text-muted">{p.aiFeedback}</pre>}
                      <Link href={`/day/${l.day}`} className="mt-3 inline-block text-xs underline text-muted">{pick(lang, "Mở bài học", "Open lesson")}</Link>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <EmptyState title={pick(lang, "Chưa có bài viết nào được nộp", "No submitted writing yet")} body={pick(lang, "Bài viết của bạn sẽ được lưu ở đây để bạn xem lại và so sánh.", "Your texts will be kept here so you can reread and compare them.")} action={<ButtonLink href="/today">{pick(lang, "Mở bài hôm nay", "Open today's lesson")}</ButtonLink>} />
        )}
      </Card>
    </div>
  );
}
