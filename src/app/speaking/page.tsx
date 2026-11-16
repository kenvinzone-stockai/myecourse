"use client";

import { useState } from "react";
import { useAppState, useToday } from "@/store/store";
import { getLesson } from "@/lib/curriculum";
import { PRACTICE_PROMPTS, PRONUNCIATION_DRILLS } from "@/lib/curriculum/practice";
import { planStatus } from "@/lib/engine/plan";
import { currentSkillScore, trend } from "@/lib/engine/scoring";
import { addDays } from "@/lib/domain/dates";
import { formatSeconds } from "@/lib/speech";
import { updateSpeakingSession } from "@/store/store";
import { pick } from "@/lib/i18n";
import { LineChart } from "@/components/charts";
import { Recorder, SessionList } from "@/components/speaking/Recorder";
import { ListenButton } from "@/components/lesson/LearnStep";
import { Badge, ButtonLink, Card, cx, EmptyState, Loading, PageHeader, Rating, SectionTitle, Stat } from "@/components/ui";

export default function SpeakingPage() {
  const state = useAppState();
  const today = useToday();
  const [idx, setIdx] = useState(2);
  if (!state || !today) return <Loading />;
  const lang = state.settings.uiLanguage;
  const ps = planStatus(state, today);
  const sessions = state.speaking;
  const totalSeconds = sessions.reduce((a, s) => a + s.seconds, 0);
  const days = new Set(sessions.map((s) => s.createdAt.slice(0, 10)));
  let streak = 0;
  for (let d = days.has(today) ? today : addDays(today, -1); days.has(d); d = addDays(d, -1)) streak++;
  const conf = sessions.map((s) => s.confidence).filter((x): x is number => !!x);
  const lesson = getLesson(ps.currentDay);
  const p = PRACTICE_PROMPTS[idx];
  const practice = sessions.filter((s) => s.context === "practice" && s.prompt === p.prompt);
  const last = practice.at(-1);
  const recent = sessions.slice(-8);
  const drill = lesson?.pronunciation;

  return (
    <div className="space-y-6">
      <PageHeader title={pick(lang, "Nói", "Speaking")} description={pick(lang, "Ghi âm, nghe lại, tự đánh giá. Nói nhiều và đều là cách tiến bộ nhanh nhất.", "Record, listen back, self-assess. Regular volume is the fastest way to improve.")} />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <Card className="!p-4"><Stat label={pick(lang, "Điểm nói", "Speaking score")} value={currentSkillScore(state.skillEvents, "speaking") ?? "—"} /></Card>
        <Card className="!p-4"><Stat label={pick(lang, "Tổng thời lượng", "Total speaking time")} value={formatSeconds(totalSeconds)} hint="min:sec" /></Card>
        <Card className="!p-4"><Stat label={pick(lang, "Số lần luyện", "Sessions")} value={sessions.length} /></Card>
        <Card className="!p-4"><Stat label={pick(lang, "Chuỗi ngày nói", "Speaking streak")} value={streak} hint={pick(lang, "ngày", "days")} /></Card>
        <Card className="!p-4"><Stat label={pick(lang, "Tự tin TB", "Avg confidence")} value={conf.length ? (conf.reduce((a, b) => a + b, 0) / conf.length).toFixed(1) : "—"} hint="/ 5" /></Card>
      </div>

      {lesson?.speaking && (
        <Card>
          <SectionTitle eyebrow={`Day ${lesson.day}`} title={pick(lang, "Bài nói trong bài học hiện tại", "Speaking task in your current lesson")} action={<ButtonLink size="sm" href={`/day/${lesson.day}`}>{pick(lang, "Mở bài học", "Open lesson")}</ButtonLink>} />
          <p className="text-[15px] leading-relaxed text-ink">{lesson.speaking.prompt}</p>
        </Card>
      )}

      <Card>
        <SectionTitle title={pick(lang, "Thử thách nói tự do", "Speaking challenges")} />
        <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
          {PRACTICE_PROMPTS.map((x, i) => (
            <button key={i} onClick={() => setIdx(i)} aria-pressed={idx === i} className={cx("shrink-0 rounded-full border px-3 py-1.5 text-xs", idx === i ? "border-accent bg-accent-soft text-accent" : "border-line text-muted hover:text-ink")}>
              {x.label}{PRACTICE_PROMPTS.filter((y) => y.label === x.label).length > 1 ? ` ${PRACTICE_PROMPTS.slice(0, i + 1).filter((y) => y.label === x.label).length}` : ""}
            </button>
          ))}
        </div>
        <div className="mb-4 rounded-xl bg-surface-2/50 p-4">
          <div className="mb-2 flex gap-2"><Badge tone="accent">{p.label}</Badge><Badge>Target {formatSeconds(p.seconds)}</Badge></div>
          <p className="text-[15px] leading-relaxed text-ink">{p.prompt}</p>
          {p.script && (
            <div className="mt-3 rounded-lg bg-surface p-3">
              <p className="font-serif text-[16px] leading-relaxed text-ink">{p.script}</p>
              <div className="mt-1 flex gap-1"><ListenButton text={p.script} label="Normal" /><ListenButton text={p.script} label="Slow" rate={0.75} /></div>
            </div>
          )}
        </div>
        <Recorder key={idx} prompt={p.prompt} targetSeconds={p.seconds} context="practice" sessionFilter={(s) => s.context === "practice" && s.prompt === p.prompt} />
        {last && (
          <div className="mt-4 grid gap-4 border-t border-line pt-4 sm:grid-cols-2">
            <Rating label={pick(lang, "Tự chấm lần gần nhất", "Self-score (latest take)")} value={last.selfScore} onChange={(v) => updateSpeakingSession(last.id, { selfScore: v })} />
            <Rating label={pick(lang, "Mức tự tin", "Confidence")} value={last.confidence} onChange={(v) => updateSpeakingSession(last.id, { confidence: v })} />
          </div>
        )}
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <SectionTitle title={pick(lang, "Luyện phát âm", "Pronunciation exercises")} />
          {drill && (
            <div className="mb-4 rounded-xl bg-info-soft p-3">
              <p className="text-xs text-info">{pick(lang, "Trọng tâm bài hiện tại", "Focus of your current lesson")}</p>
              <p className="text-sm font-medium text-ink">{drill.focus}</p>
            </div>
          )}
          <div className="space-y-4">
            {PRONUNCIATION_DRILLS.map((d) => (
              <div key={d.title}>
                <p className="mb-1 text-sm font-medium text-ink">{d.title}</p>
                <ul className="space-y-1">
                  {d.items.map((it) => (
                    <li key={it} className="flex items-center justify-between gap-2 rounded-lg bg-surface-2/60 px-3 py-1.5 font-serif text-[15px] text-ink">{it}<ListenButton text={it.replace(/[·_]/g, " ").replace(/\/.*?\/|\(.*?\)/g, "")} label="" rate={0.85} /></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <SectionTitle title={pick(lang, "Điểm nói theo thời gian", "Speaking trend")} />
          <LineChart series={[{ name: "Speaking", color: "var(--accent)", points: trend(state.skillEvents, "speaking").map((x) => ({ x: x.date, y: x.score })) }]} emptyText={pick(lang, "Chấm bài nói đầu tiên để thấy biểu đồ.", "Rate your first speaking task to see a trend.")} />
          <p className="mt-2 text-xs text-faint">{pick(lang, "Dựa trên tự đánh giá + thời lượng nói so với mục tiêu.", "Based on self-rating plus speaking time against the target.")}</p>
        </Card>
      </div>

      <Card>
        <SectionTitle title={pick(lang, "Bản ghi gần đây", "Recent recordings")} />
        {recent.length ? (
          <div className="space-y-4">
            <ul className="space-y-1 text-xs text-muted">{recent.slice().reverse().map((s) => <li key={s.id} className="truncate">{s.day ? `Day ${s.day} · ` : ""}{s.context} · {formatSeconds(s.seconds)} — {s.prompt}</li>)}</ul>
            <SessionList sessions={recent} />
          </div>
        ) : (
          <EmptyState title={pick(lang, "Chưa có bản ghi nào", "No recordings yet")} body={pick(lang, "Chọn một thử thách ở trên và bấm Record. Bản ghi được lưu trên thiết bị này.", "Pick a challenge above and press Record. Recordings stay on this device.")} />
        )}
      </Card>
    </div>
  );
}
