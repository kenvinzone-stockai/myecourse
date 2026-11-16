"use client";

import Link from "next/link";
import { useAppState, useToday } from "@/store/store";
import { getCurriculum } from "@/lib/curriculum";
import { planStatus } from "@/lib/engine/plan";
import { currentSkillScore, trend } from "@/lib/engine/scoring";
import { adaptReading } from "@/lib/engine/adaptive";
import { pick } from "@/lib/i18n";
import { LineChart } from "@/components/charts";
import { Badge, ButtonLink, Card, EmptyState, Loading, PageHeader, SectionTitle, Stat } from "@/components/ui";

export default function ReadingPage() {
  const state = useAppState();
  const today = useToday();
  if (!state || !today) return <Loading />;
  const lang = state.settings.uiLanguage;
  const ps = planStatus(state, today);
  const readings = getCurriculum().filter((l) => l.reading);
  const done = readings.filter((l) => state.lessons[String(l.day)]?.readingChecked);
  const upcoming = readings.filter((l) => !state.lessons[String(l.day)]?.readingChecked && l.day >= ps.currentDay).slice(0, 5);
  const score = currentSkillScore(state.skillEvents, "reading");
  const tr = trend(state.skillEvents, "reading");
  const words = done.reduce((a, l) => a + (l.reading?.wordCount ?? 0), 0);
  const qTotal = done.reduce((a, l) => a + l.reading!.questions.length, 0);
  const qCorrect = done.reduce((a, l) => a + l.reading!.questions.filter((q) => state.lessons[String(l.day)]?.readingAnswers[q.id] === q.answer).length, 0);
  const saved = Object.values(state.vocab).filter((c) => c.sourceDay !== undefined).slice(-12).reverse();

  return (
    <div className="space-y-6">
      <PageHeader title={pick(lang, "Đọc", "Reading")} description={adaptReading(score).notes[0]} />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Card className="!p-4"><Stat label={pick(lang, "Điểm đọc hiện tại", "Current reading score")} value={score ?? "—"} /></Card>
        <Card className="!p-4"><Stat label={pick(lang, "Bài đọc đã xong", "Texts completed")} value={`${done.length}/${readings.length}`} /></Card>
        <Card className="!p-4"><Stat label={pick(lang, "Câu trả lời đúng", "Questions correct")} value={qTotal ? `${qCorrect}/${qTotal}` : "—"} /></Card>
        <Card className="!p-4"><Stat label={pick(lang, "Số từ đã đọc", "Words read")} value={words.toLocaleString()} /></Card>
      </div>

      <Card>
        <SectionTitle title={pick(lang, "Bài đọc hiện tại", "Current assignments")} />
        {upcoming.length ? (
          <ul className="divide-y divide-line">
            {upcoming.map((l, i) => (
              <li key={l.day} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate font-medium text-ink">{l.reading!.title}</p>
                  <p className="text-xs text-muted">Day {l.day} · Level {l.reading!.level} · {l.reading!.wordCount} words · ~{l.reading!.readingMinutes} min</p>
                </div>
                <ButtonLink href={`/day/${l.day}`} size="sm" variant={i === 0 ? "primary" : "secondary"}>{i === 0 ? pick(lang, "Đọc ngay", "Read now") : pick(lang, "Xem trước", "Preview")}</ButtonLink>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState title={pick(lang, "Bạn đã đọc hết các bài.", "You've finished every text.")} />
        )}
      </Card>

      <Card>
        <SectionTitle title={pick(lang, "Kết quả đọc theo thời gian", "Reading performance")} />
        <LineChart series={[{ name: "Reading", color: "var(--accent)", points: tr.map((p) => ({ x: p.date, y: p.score })) }]} emptyText={pick(lang, "Hoàn thành bài đọc đầu tiên để thấy biểu đồ.", "Complete your first reading to see a trend.")} />
      </Card>

      <Card>
        <SectionTitle title={pick(lang, "Bài đọc đã hoàn thành", "Completed readings")} />
        {done.length ? (
          <ul className="divide-y divide-line">
            {done.slice().reverse().map((l) => (
              <li key={l.day}>
                <Link href={`/day/${l.day}`} className="flex items-center justify-between gap-3 py-2.5 hover:bg-surface-2">
                  <span className="min-w-0 truncate text-sm text-ink">{l.reading!.title}</span>
                  <span className="flex shrink-0 items-center gap-2 text-xs text-muted">Day {l.day}<Badge tone={(state.lessons[String(l.day)]?.readingScore ?? 0) >= 60 ? "good" : "warn"}>{state.lessons[String(l.day)]?.readingScore ?? 0}</Badge></span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState title={pick(lang, "Chưa có bài đọc nào hoàn thành", "No completed readings yet")} body={pick(lang, "Bài đọc đầu tiên nằm trong bài học hôm nay.", "Your first text is in today's lesson.")} action={<ButtonLink href="/today">{pick(lang, "Mở bài hôm nay", "Open today's lesson")}</ButtonLink>} />
        )}
      </Card>

      <Card>
        <SectionTitle title={pick(lang, "Từ vựng đã lưu từ bài học", "Vocabulary saved from lessons")} action={<Link href="/vocabulary" className="text-sm text-muted hover:text-ink">{pick(lang, "Tất cả", "All")} →</Link>} />
        {saved.length ? (
          <ul className="flex flex-wrap gap-2">{saved.map((c) => <li key={c.id}><Badge>{c.term}</Badge></li>)}</ul>
        ) : (
          <p className="text-sm text-muted">{pick(lang, "Từ vựng sẽ được lưu tự động khi bạn hoàn thành bài học.", "Words are saved automatically when you complete a lesson.")}</p>
        )}
      </Card>
    </div>
  );
}
