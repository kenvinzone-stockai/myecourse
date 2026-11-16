"use client";

import { useMemo, useState } from "react";
import type { VocabCard, VocabStatus } from "@/lib/domain/types";
import { addCustomVocab, deleteVocab, gradeVocab, setVocabStatus, updateVocab, useAppState, useToday } from "@/store/store";
import { dueCards, SRS_INTERVALS } from "@/lib/engine/srs";
import { formatDmy } from "@/lib/domain/dates";
import { useStudyTimer } from "@/hooks/useStudyTimer";
import { pick } from "@/lib/i18n";
import { ListenButton } from "@/components/lesson/LearnStep";
import { Badge, Button, ButtonLink, Card, cx, EmptyState, Field, Input, Loading, PageHeader, SectionTitle, Select, Stat, Tabs, TextArea } from "@/components/ui";

const STATUS_TONE: Record<VocabStatus, "neutral" | "accent" | "warn" | "good"> = { new: "neutral", learning: "accent", difficult: "warn", known: "good" };

function ReviewSession({ cards, lang }: { cards: VocabCard[]; lang: "vi" | "en" }) {
  const [revealed, setRevealed] = useState(false);
  const [doneCount, setDoneCount] = useState(0);
  const card = cards[0];
  if (!card) {
    return (
      <div className="rounded-xl bg-good-soft p-5 text-sm text-good">
        {doneCount > 0 ? pick(lang, `Đã ôn ${doneCount} từ. Hẹn gặp lại ngày mai.`, `Reviewed ${doneCount} cards. That's all for today.`) : pick(lang, "Không có từ nào đến hạn hôm nay.", "No words are due today.")}
      </div>
    );
  }
  const grade = (g: "again" | "hard" | "good" | "easy") => {
    gradeVocab(card.id, g);
    setRevealed(false);
    setDoneCount((n) => n + 1);
  };
  const cloze = card.example.replace(new RegExp(card.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), "_____");
  return (
    <div>
      <p className="mb-3 text-xs text-muted">{cards.length} {pick(lang, "từ còn lại", "left")}</p>
      <div className="rounded-2xl border border-line p-6 text-center">
        <p className="text-sm text-muted">{card.meaning}</p>
        {!revealed && cloze !== card.example && <p className="mt-3 font-serif text-lg italic text-ink">“{cloze}”</p>}
        {revealed ? (
          <div className="animate-in">
            <p className="mt-4 text-2xl font-semibold text-ink">{card.term}</p>
            <p className="mt-2 font-serif text-[16px] italic text-ink">“{card.example}”</p>
            {card.collocation && <p className="mt-2 text-xs text-faint">{card.collocation}</p>}
            {card.vi && <p className="mt-1 text-sm text-info">{card.vi}</p>}
            {card.note && <p className="mt-2 text-sm text-muted">📝 {card.note}</p>}
            <div className="mt-2 flex justify-center"><ListenButton text={`${card.term}. ${card.example}`} /></div>
            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <Button variant="secondary" onClick={() => grade("again")}>{pick(lang, "Quên", "Again")}<span className="text-xs text-faint">today</span></Button>
              <Button variant="secondary" onClick={() => grade("hard")}>{pick(lang, "Khó", "Hard")}<span className="text-xs text-faint">+{SRS_INTERVALS[Math.max(1, card.stage)]}d</span></Button>
              <Button onClick={() => grade("good")}>{pick(lang, "Nhớ", "Good")}<span className="text-xs opacity-70">+{SRS_INTERVALS[Math.min(card.stage + 1, 5)]}d</span></Button>
              <Button variant="secondary" onClick={() => grade("easy")}>{pick(lang, "Dễ", "Easy")}<span className="text-xs text-faint">+{SRS_INTERVALS[Math.min(card.stage + 2, 5)]}d</span></Button>
            </div>
          </div>
        ) : (
          <Button className="mt-6" onClick={() => setRevealed(true)}>{pick(lang, "Hiện đáp án", "Show answer")}</Button>
        )}
      </div>
    </div>
  );
}

export default function VocabularyPage() {
  const state = useAppState();
  const today = useToday();
  const [tab, setTab] = useState<"all" | VocabStatus | "due">("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"recent" | "az" | "due">("recent");
  const [openId, setOpenId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ term: "", meaning: "", example: "", note: "" });
  useStudyTimer(undefined, true);
  const cards = useMemo(() => Object.values(state?.vocab ?? {}), [state?.vocab]);
  if (!state || !today) return <Loading />;
  const lang = state.settings.uiLanguage;
  const due = dueCards(cards, today);
  const count = (s: VocabStatus) => cards.filter((c) => c.status === s).length;
  const filtered = cards
    .filter((c) => (tab === "all" ? true : tab === "due" ? c.dueDate <= today : c.status === tab || (tab === "learning" && c.status === "new")))
    .filter((c) => !q.trim() || `${c.term} ${c.meaning} ${c.vi ?? ""} ${c.note}`.toLowerCase().includes(q.trim().toLowerCase()))
    .sort((a, b) => (sort === "az" ? a.term.localeCompare(b.term) : sort === "due" ? a.dueDate.localeCompare(b.dueDate) : b.addedAt.localeCompare(a.addedAt)));

  return (
    <div className="space-y-6">
      <PageHeader
        title={pick(lang, "Từ vựng", "Vocabulary")}
        description={pick(lang, "Lặp lại ngắt quãng: cùng ngày → +1 → +3 → +7 → +14 → +30 ngày.", "Spaced repetition: same day → +1 → +3 → +7 → +14 → +30 days.")}
        actions={<Button variant="secondary" onClick={() => setAdding((a) => !a)}>{pick(lang, "+ Thêm từ", "+ Add a word")}</Button>}
      />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Card className="!p-4"><Stat label={pick(lang, "Đến hạn ôn", "Due for review")} value={due.length} /></Card>
        <Card className="!p-4"><Stat label={pick(lang, "Đã lưu", "Saved")} value={cards.length} /></Card>
        <Card className="!p-4"><Stat label={pick(lang, "Đã thuộc", "Known")} value={count("known")} /></Card>
        <Card className="!p-4"><Stat label={pick(lang, "Từ khó", "Difficult")} value={count("difficult")} /></Card>
      </div>

      {adding && (
        <Card className="animate-in">
          <form className="grid gap-3 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); if (!form.term.trim()) return; addCustomVocab(form.term.trim(), form.meaning.trim(), form.example.trim(), form.note.trim()); setForm({ term: "", meaning: "", example: "", note: "" }); setAdding(false); }}>
            <Field label="Word / phrase" htmlFor="v-term"><Input id="v-term" required value={form.term} onChange={(e) => setForm({ ...form, term: e.target.value })} /></Field>
            <Field label="Meaning" htmlFor="v-mean"><Input id="v-mean" value={form.meaning} onChange={(e) => setForm({ ...form, meaning: e.target.value })} /></Field>
            <Field label="Example sentence" htmlFor="v-ex"><Input id="v-ex" value={form.example} onChange={(e) => setForm({ ...form, example: e.target.value })} /></Field>
            <Field label="Personal note" htmlFor="v-note"><Input id="v-note" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} /></Field>
            <div><Button type="submit">{pick(lang, "Lưu", "Save")}</Button></div>
          </form>
        </Card>
      )}

      <Card>
        <SectionTitle title={pick(lang, "Ôn tập hôm nay", "Today's review")} />
        {cards.length === 0 ? (
          <EmptyState title={pick(lang, "Bộ từ của bạn đang trống", "Your deck is empty")} body={pick(lang, "Từ vựng của mỗi bài học được thêm vào đây khi bạn hoàn thành bài, hoặc bấm “Add all to my deck” trong bước Learn.", "Each lesson's vocabulary is added here when you complete it, or press “Add all to my deck” in the Learn step.")} action={<ButtonLink href="/today">{pick(lang, "Mở bài hôm nay", "Open today's lesson")}</ButtonLink>} />
        ) : (
          <ReviewSession cards={due} lang={lang} />
        )}
      </Card>

      {cards.length > 0 && (
        <Card>
          <SectionTitle title={pick(lang, "Từ đã lưu", "Saved vocabulary")} />
          <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center">
            <Tabs label="Filter" value={tab} onChange={setTab} tabs={[
              { id: "all", label: pick(lang, "Tất cả", "All"), count: cards.length },
              { id: "due", label: pick(lang, "Đến hạn", "Due"), count: due.length },
              { id: "learning", label: pick(lang, "Đang học", "Learning"), count: count("learning") + count("new") },
              { id: "difficult", label: pick(lang, "Khó", "Difficult"), count: count("difficult") },
              { id: "known", label: pick(lang, "Đã thuộc", "Known"), count: count("known") },
            ]} />
            <div className="flex flex-1 gap-2">
              <Input type="search" aria-label="Search vocabulary" placeholder={pick(lang, "Tìm từ…", "Search…")} value={q} onChange={(e) => setQ(e.target.value)} />
              <Select aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="!w-36">
                <option value="recent">{pick(lang, "Mới nhất", "Newest")}</option>
                <option value="az">A–Z</option>
                <option value="due">{pick(lang, "Hạn ôn", "Due date")}</option>
              </Select>
            </div>
          </div>
          {filtered.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted">{pick(lang, "Không có từ nào khớp.", "No words match.")}</p>
          ) : (
            <ul className="divide-y divide-line">
              {filtered.map((c) => (
                <li key={c.id} className="py-3">
                  <button className="flex w-full items-center justify-between gap-3 text-left" aria-expanded={openId === c.id} onClick={() => setOpenId(openId === c.id ? null : c.id)}>
                    <span className="min-w-0">
                      <span className="font-medium text-ink">{c.term}</span>
                      <span className="ml-2 text-sm text-muted">{c.meaning}</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-2">
                      <span className="hidden text-xs text-faint sm:inline">{c.dueDate <= today ? pick(lang, "đến hạn", "due") : formatDmy(c.dueDate).slice(0, 5)}</span>
                      <Badge tone={STATUS_TONE[c.status]}>{c.status}</Badge>
                    </span>
                  </button>
                  {openId === c.id && (
                    <div className="mt-3 animate-in space-y-3 rounded-xl bg-surface-2/50 p-4">
                      {c.example && <p className="font-serif text-[15px] italic text-ink">“{c.example}” <ListenButton text={c.example} label="" /></p>}
                      {c.collocation && <p className="text-xs text-muted">Collocation: {c.collocation}</p>}
                      {c.vi && <p className="text-sm text-info">{c.vi}</p>}
                      <TextArea aria-label="Personal note" placeholder={pick(lang, "Ghi chú cá nhân…", "Personal note…")} className="min-h-16" defaultValue={c.note} onBlur={(e) => e.target.value !== c.note && updateVocab(c.id, { note: e.target.value })} />
                      <div className="flex flex-wrap items-center gap-2">
                        {(["learning", "difficult", "known"] as VocabStatus[]).map((s) => (
                          <button key={s} onClick={() => setVocabStatus(c.id, s)} aria-pressed={c.status === s} className={cx("rounded-full border px-3 py-1 text-xs", c.status === s ? "border-accent bg-accent-soft text-accent" : "border-line text-muted hover:text-ink")}>{s}</button>
                        ))}
                        <span className="text-xs text-faint">{c.reviews} reviews{c.sourceDay ? ` · Day ${c.sourceDay}` : ""}</span>
                        <button className="ml-auto text-xs text-bad underline" onClick={() => deleteVocab(c.id)}>{pick(lang, "Xóa", "Delete")}</button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}
    </div>
  );
}
