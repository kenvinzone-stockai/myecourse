"use client";

import { useState } from "react";
import type { DailyLesson, GrammarFocus, PronunciationFocus, VocabularyItem } from "@/lib/domain/types";
import { saveVocabItems, useAppState } from "@/store/store";
import { canSpeak, speak } from "@/lib/speech";
import { Badge, Button, cx } from "@/components/ui";
import { IconVolume } from "@/components/ui/icons";

export function ListenButton({ text, label = "Listen", rate }: { text: string; label?: string; rate?: number }) {
  const state = useAppState();
  const [ok] = useState(() => canSpeak());
  if (!ok) return null;
  return (
    <button
      type="button"
      onClick={() => speak(text, { variety: state?.profile?.variety, rate })}
      className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-xs text-muted hover:bg-surface-2 hover:text-ink"
      aria-label={`${label}: ${text.slice(0, 40)}`}
    >
      <IconVolume width={15} height={15} />
      {label}
    </button>
  );
}

export function VocabList({ items, showVi }: { items: VocabularyItem[]; showVi: boolean }) {
  const [reveal, setReveal] = useState(false);
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((v) => (
          <article key={v.id} className="rounded-xl border border-line p-4">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-ink">{v.term}</h3>
              <ListenButton text={`${v.term}. ${v.example}`} label="" />
            </div>
            <p className="mt-1 text-sm text-muted">{v.meaning}</p>
            {v.vi && (showVi || reveal) && <p className="mt-1 text-sm text-info">🇻🇳 {v.vi}</p>}
            <p className="mt-2 font-serif text-[15px] italic leading-relaxed text-ink">“{v.example}”</p>
            {v.collocation && <p className="mt-2 text-xs text-faint">Collocation: {v.collocation}</p>}
          </article>
        ))}
      </div>
      {!showVi && items.some((v) => v.vi) && (
        <button className="mt-3 text-xs text-muted underline" onClick={() => setReveal((r) => !r)}>
          {reveal ? "Hide Vietnamese" : "Show Vietnamese (try without first)"}
        </button>
      )}
    </div>
  );
}

export function GrammarCard({ g, showVi }: { g: GrammarFocus; showVi: boolean }) {
  const [vi, setVi] = useState(showVi);
  return (
    <section className="rounded-xl border border-line bg-surface-2/40 p-5">
      <Badge tone="accent">Language pattern</Badge>
      <h3 className="mt-2 text-base font-semibold text-ink">{g.pattern}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink">{g.explanation}</p>
      {g.explanationVi &&
        (vi ? (
          <p className="mt-2 text-sm leading-relaxed text-info">🇻🇳 {g.explanationVi}</p>
        ) : (
          <button className="mt-2 text-xs text-muted underline" onClick={() => setVi(true)}>
            Giải thích tiếng Việt
          </button>
        ))}
      <ul className="mt-3 space-y-1.5">
        {g.examples.map((e) => (
          <li key={e} className="flex items-start gap-2 font-serif text-[15px] text-ink">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
            <span className="flex-1">{e}</span>
            <ListenButton text={e} label="" />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function PronunciationCard({ p }: { p: PronunciationFocus }) {
  return (
    <section className="rounded-xl border border-line bg-surface-2/40 p-5">
      <Badge tone="info">Pronunciation</Badge>
      <h3 className="mt-2 text-base font-semibold text-ink">{p.focus}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink">{p.tip}</p>
      <ul className="mt-3 space-y-1.5">
        {p.items.map((it) => (
          <li key={it} className="flex items-center justify-between gap-2 rounded-lg bg-surface px-3 py-2 font-serif text-[15px] text-ink">
            {it}
            <ListenButton text={it.replace(/[·/↗↘]/g, ",").replace(/\(.*?\)/g, "")} label="" rate={0.85} />
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-muted">Listen, repeat aloud three times, then record yourself in the Speak step.</p>
    </section>
  );
}

export function LearnStep({ lesson, showVi, onDone }: { lesson: DailyLesson; showVi: boolean; onDone: () => void }) {
  const state = useAppState();
  const saved = lesson.vocabulary.every((v) => state?.vocab[v.id]);
  return (
    <div className="space-y-6">
      {lesson.grammar && <GrammarCard g={lesson.grammar} showVi={showVi} />}
      {lesson.pronunciation && <PronunciationCard p={lesson.pronunciation} />}
      <div>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-medium text-ink">
            {lesson.isReviewDay ? "This week's vocabulary" : "Vocabulary in context"} <span className="text-faint">· {lesson.vocabulary.length}</span>
          </h3>
          {!lesson.isReviewDay && (
            <Button size="sm" variant="secondary" disabled={saved} onClick={() => saveVocabItems(lesson.vocabulary)}>
              {saved ? "In your deck" : "Add all to my deck"}
            </Button>
          )}
        </div>
        <p className={cx("mb-3 text-xs text-muted")}>Read each example aloud. Try to make one sentence of your own about your work for two of these words.</p>
        <VocabList items={lesson.vocabulary} showVi={showVi} />
      </div>
      <Button onClick={onDone}>Continue</Button>
    </div>
  );
}
