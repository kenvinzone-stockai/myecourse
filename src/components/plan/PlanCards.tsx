"use client";

import { useState } from "react";
import type { AppState } from "@/lib/domain/types";
import { planStatus } from "@/lib/engine/plan";
import { recurringWeaknesses, WEAKNESS_LABEL } from "@/lib/engine/scoring";
import { REMEDIATION } from "@/lib/engine/adaptive";
import { completeRemediation, shiftPlan, skipLessons } from "@/store/store";
import { pick } from "@/lib/i18n";
import { Badge, Button, ButtonLink, Checkbox } from "@/components/ui";
import type { DateKey } from "@/lib/domain/dates";

/** Shown when the learner has unfinished lessons scheduled before today. */
export function RecoveryCard({ state, today }: { state: AppState; today: DateKey }) {
  const ps = planStatus(state, today);
  const lang = state.settings.uiLanguage;
  const [confirm, setConfirm] = useState<null | "shift" | "skip">(null);
  if (ps.behind < 1 || ps.position.kind === "before") return null;
  const n = ps.behind;
  return (
    <section className="rounded-2xl border border-warn/30 bg-warn-soft p-5" aria-labelledby="recovery-title">
      <h2 id="recovery-title" className="font-medium text-ink">
        {pick(lang, `Bạn đang chậm ${n} bài — không sao cả.`, `You're ${n} lesson${n > 1 ? "s" : ""} behind — that's fine.`)}
      </h2>
      <p className="mt-1 text-sm leading-relaxed text-muted">
        {pick(
          lang,
          `Đề xuất: tiếp tục từ Ngày ${ps.currentDay}, mỗi ngày một bài. Đừng dồn nhiều bài vào một ngày.`,
          `Recommended: continue with Day ${ps.currentDay}, one lesson per day. Don't try to squeeze several lessons into one day.`,
        )}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <ButtonLink href={`/day/${ps.currentDay}`}>{pick(lang, `Tiếp tục Ngày ${ps.currentDay}`, `Continue Day ${ps.currentDay}`)}</ButtonLink>
        {n >= 2 && (
          <Button variant="secondary" onClick={() => setConfirm("shift")}>
            {pick(lang, `Lùi lịch ${n} ngày`, `Move the plan forward ${n} days`)}
          </Button>
        )}
        <Button variant="ghost" onClick={() => setConfirm("skip")}>
          {pick(lang, `Nhảy tới bài hôm nay (Ngày ${ps.calendarDay})`, `Jump to today (Day ${ps.calendarDay})`)}
        </Button>
      </div>
      {confirm && (
        <div className="mt-4 rounded-xl bg-surface p-4 text-sm">
          <p className="text-ink">
            {confirm === "shift"
              ? pick(lang, `Toàn bộ lịch sẽ lùi ${n} ngày; Ngày ${ps.currentDay} trở thành bài hôm nay. Ngày kết thúc mới cũng lùi ${n} ngày.`, `The whole calendar shifts by ${n} days so Day ${ps.currentDay} becomes today's lesson. Your end date moves by ${n} days too.`)
              : pick(lang, `${n} bài bị lỡ sẽ được đánh dấu "bỏ qua" (vẫn mở để học bù). Từ vựng của chúng được thêm vào phần ôn tập hôm nay.`, `The ${n} missed lesson(s) will be marked as skipped (still open to catch up later). Their vocabulary is added to today's review.`)}
          </p>
          <div className="mt-3 flex gap-2">
            <Button
              size="sm"
              onClick={() => {
                if (confirm === "shift") shiftPlan(n);
                else skipLessons(ps.missedDays);
                setConfirm(null);
              }}
            >
              {pick(lang, "Xác nhận", "Confirm")}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setConfirm(null)}>
              {pick(lang, "Hủy", "Cancel")}
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}

/** A targeted practice module, created when the same weakness recurs in ≥3 sessions. */
export function RemediationCard({ state, today, compact }: { state: AppState; today: DateKey; compact?: boolean }) {
  const recurring = recurringWeaknesses(state, today);
  const [open, setOpen] = useState(!compact);
  const [done, setDone] = useState<Record<number, boolean>>({});
  const lang = state.settings.uiLanguage;
  if (!recurring.length) return null;
  const mod = REMEDIATION[recurring[0].tag];
  return (
    <section className="rounded-2xl border border-info/30 bg-info-soft p-5" aria-labelledby="remed-title">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <Badge tone="info">{pick(lang, "Luyện tập có mục tiêu", "Targeted practice")} · {mod.minutes} min</Badge>
          <h2 id="remed-title" className="mt-2 font-medium text-ink">
            {mod.title}
          </h2>
          <p className="mt-1 text-sm text-muted">
            {pick(lang, `Lặp lại ${recurring[0].count} buổi gần đây: ${WEAKNESS_LABEL[mod.tag].vi}.`, `Seen in ${recurring[0].count} recent sessions: ${WEAKNESS_LABEL[mod.tag].en}.`)}
          </p>
        </div>
        {compact && (
          <Button size="sm" variant="secondary" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
            {open ? pick(lang, "Thu gọn", "Hide") : pick(lang, "Mở", "Open")}
          </Button>
        )}
      </div>
      {open && (
        <div className="mt-4 space-y-3 animate-in">
          <p className="text-sm text-ink">{mod.why}</p>
          {lang === "vi" && <p className="text-sm text-info">🇻🇳 {mod.whyVi}</p>}
          <div className="rounded-xl bg-surface p-3">
            {mod.steps.map((s, i) => (
              <Checkbox key={i} label={s} checked={!!done[i]} onChange={(v) => setDone((d) => ({ ...d, [i]: v }))} />
            ))}
          </div>
          <Button size="sm" onClick={() => completeRemediation(mod.tag)} disabled={Object.values(done).filter(Boolean).length < mod.steps.length}>
            {pick(lang, "Hoàn thành module", "Mark module complete")}
          </Button>
        </div>
      )}
    </section>
  );
}
