"use client";

import { useEffect, useState } from "react";
import type { AssessmentKind, AssessmentResult } from "@/lib/domain/types";
import { ASSESSMENTS } from "@/lib/curriculum/assessments";
import { emptyDraft, scoreAssessment, SPEAKING_KEYS, type AssessmentDraft } from "@/lib/engine/assessment";
import { WRITING_RUBRIC, countWords } from "@/lib/engine/writing";
import { saveAssessment, useAppState } from "@/store/store";
import { pick } from "@/lib/i18n";
import { Passage, QuestionBlock } from "@/components/lesson/ReadStep";
import { AutosaveTextArea } from "@/components/writing/WritingEditor";
import { Recorder } from "@/components/speaking/Recorder";
import { SpeakingRubric } from "@/components/lesson/SpeakStep";
import { ScoreBar } from "@/components/charts";
import { Badge, Button, Card, cx, ProgressBar, Rating } from "@/components/ui";
import { IconArrowLeft, IconArrowRight } from "@/components/ui/icons";

const SECTIONS = ["intro", "reading", "vocabulary", "writing", "speaking", "result"] as const;

function draftKey(kind: AssessmentKind) {
  return `elos:assessment-draft:${kind}`;
}

function loadDraft(kind: AssessmentKind): AssessmentDraft {
  try {
    const raw = localStorage.getItem(draftKey(kind));
    if (raw) return { ...emptyDraft(), ...JSON.parse(raw) };
  } catch {
    /* ignore corrupt draft */
  }
  return emptyDraft();
}

export function AssessmentRunner({ kind, onFinished }: { kind: AssessmentKind; onFinished?: (r: AssessmentResult) => void }) {
  const def = ASSESSMENTS[kind];
  const state = useAppState();
  const lang = state?.settings.uiLanguage ?? "vi";
  const [d, setD] = useState<AssessmentDraft>(() => (typeof window === "undefined" ? emptyDraft() : loadDraft(kind)));
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const section = SECTIONS[result ? 5 : Math.min(d.section, 4)];

  useEffect(() => {
    try {
      localStorage.setItem(draftKey(kind), JSON.stringify(d));
    } catch {
      /* storage unavailable */
    }
  }, [d, kind]);

  const update = (patch: Partial<AssessmentDraft>) => setD((x) => ({ ...x, ...patch }));
  const go = (n: number) => {
    update({ section: n });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  function finish() {
    const r = scoreAssessment(def, d, kind);
    saveAssessment(r);
    setResult(r);
    try {
      localStorage.removeItem(draftKey(kind));
    } catch {
      /* ignore */
    }
    window.scrollTo({ top: 0 });
  }

  const allReading = def.passages.every((p) => p.questions.every((q) => d.reading[q.id] !== undefined));
  const allVocab = def.vocab.every((v) => d.vocab[v.id] !== undefined);
  const writingRubricDone = WRITING_RUBRIC.every((c) => (d.writingRubric[c.id] ?? 0) >= 1);
  const speakingRubricDone = SPEAKING_KEYS.every((k) => (d.speakingRubric[k] ?? 0) >= 1);
  const stepIndex = SECTIONS.indexOf(section);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted">{pick(lang, def.titleVi, def.title)}</p>
        <ol className="mt-3 flex flex-wrap gap-2 text-xs" aria-label="Assessment sections">
          {SECTIONS.slice(1, 5).map((s, i) => (
            <li key={s}>
              <Badge tone={stepIndex === i + 1 ? "accent" : stepIndex > i + 1 ? "good" : "neutral"}>
                {i + 1}. {{ reading: pick(lang, "Đọc", "Reading"), vocabulary: pick(lang, "Từ vựng", "Vocabulary"), writing: pick(lang, "Viết", "Writing"), speaking: pick(lang, "Nói", "Speaking") }[s as "reading"]}
              </Badge>
            </li>
          ))}
        </ol>
        <ProgressBar value={(stepIndex / 5) * 100} className="mt-3" label="Assessment progress" />
      </div>

      {section === "intro" && (
        <Card>
          <h2 className="text-xl font-semibold text-ink">{def.title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{def.intro}</p>
          <ul className="mt-4 space-y-1.5 text-sm text-ink">
            <li>• Reading: {def.passages.length} short texts, {def.passages.reduce((a, p) => a + p.questions.length, 0)} questions</li>
            <li>• Vocabulary: {def.vocab.length} quick items</li>
            <li>• Writing: {def.writing.length} task{def.writing.length > 1 ? "s" : ""}</li>
            <li>• Speaking: {def.speaking.length} prompts (record if your browser allows; otherwise use the timer)</li>
          </ul>
          <p className="mt-4 text-xs text-muted">
            {pick(lang, "Không dùng từ điển hay công cụ dịch. Bài làm được lưu tự động — bạn có thể tạm dừng và quay lại.", "No dictionary or translator. Your answers save automatically — you can pause and come back.")}
          </p>
          <Button className="mt-5" onClick={() => go(1)}>
            {pick(lang, "Bắt đầu", "Begin")} <IconArrowRight />
          </Button>
        </Card>
      )}

      {section === "reading" && (
        <div className="space-y-6">
          {def.passages.map((p, i) => (
            <Card key={p.id}>
              <div className="mb-3 flex items-center gap-2">
                <Badge>Text {i + 1}</Badge>
                <h3 className="font-serif text-lg font-semibold text-ink">{p.title}</h3>
              </div>
              <Passage text={p.text} />
              <div className="mt-5">
                <QuestionBlock questions={p.questions} answers={d.reading} checked={false} onAnswer={(id, v) => update({ reading: { ...d.reading, [id]: v } })} />
              </div>
            </Card>
          ))}
          <Nav back={() => go(0)} next={() => go(2)} canNext={allReading} lang={lang} />
        </div>
      )}

      {section === "vocabulary" && (
        <Card>
          <p className="mb-4 text-sm text-muted">Choose the word or phrase that best completes each sentence.</p>
          <ol className="space-y-5">
            {def.vocab.map((v, i) => (
              <li key={v.id}>
                <fieldset>
                  <legend className="mb-2 text-[15px] text-ink">
                    <span className="mr-2 text-faint tabular-nums">{i + 1}.</span>
                    {v.sentence}
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {v.options.map((o, oi) => (
                      <label key={o} className={cx("cursor-pointer rounded-lg border px-3 py-1.5 text-sm", d.vocab[v.id] === oi ? "border-accent bg-accent-soft text-ink" : "border-line text-ink hover:bg-surface-2")}>
                        <input type="radio" className="sr-only" name={v.id} checked={d.vocab[v.id] === oi} onChange={() => update({ vocab: { ...d.vocab, [v.id]: oi } })} />
                        {o}
                      </label>
                    ))}
                  </div>
                </fieldset>
              </li>
            ))}
          </ol>
          <div className="mt-6">
            <Nav back={() => go(1)} next={() => go(3)} canNext={allVocab} lang={lang} />
          </div>
        </Card>
      )}

      {section === "writing" && (
        <div className="space-y-6">
          {def.writing.map((w, i) => (
            <Card key={w.id}>
              <Badge>Task {i + 1}</Badge>
              <p className="mt-2 text-[15px] leading-relaxed text-ink">{w.prompt}</p>
              <p className="mt-1 text-xs text-muted">
                {w.minWords}–{w.maxWords} words · {countWords(d.texts[w.id] ?? "")} written
              </p>
              <div className="mt-3">
                <AutosaveTextArea value={d.texts[w.id] ?? ""} onSave={(v) => setD((x) => ({ ...x, texts: { ...x.texts, [w.id]: v } }))} ariaLabel={`Writing task ${i + 1}`} minHeight="min-h-48" />
              </div>
            </Card>
          ))}
          <Card>
            <p className="mb-1 text-sm font-medium text-ink">{pick(lang, "Tự đánh giá bài viết (cả hai bài)", "Rate your writing (both tasks together)")}</p>
            <p className="mb-4 text-xs text-muted">1 = weak, 5 = strong. Be honest — this only sets your starting point.</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {WRITING_RUBRIC.map((c) => (
                <Rating key={c.id} label={c.label} hint={c.hint} value={d.writingRubric[c.id]} onChange={(v) => update({ writingRubric: { ...d.writingRubric, [c.id]: v } })} />
              ))}
            </div>
          </Card>
          <Nav back={() => go(2)} next={() => go(4)} canNext={writingRubricDone && def.writing.some((w) => countWords(d.texts[w.id] ?? "") > 0)} lang={lang} />
        </div>
      )}

      {section === "speaking" && (
        <div className="space-y-6">
          {def.speaking.map((s, i) => (
            <Card key={s.id}>
              <Badge>Prompt {i + 1}</Badge>
              <p className="mt-2 text-[15px] leading-relaxed text-ink">{s.prompt}</p>
              <div className="mt-4">
                <Recorder
                  prompt={s.prompt}
                  targetSeconds={s.targetSeconds}
                  context="assessment"
                  sessionFilter={(x) => d.recordingIds.includes(x.id) && x.prompt === s.prompt}
                  onSaved={(sess) =>
                    setD((x) => ({
                      ...x,
                      recordingIds: [...x.recordingIds, sess.id],
                      speakingSeconds: { ...x.speakingSeconds, [s.id]: Math.max(x.speakingSeconds[s.id] ?? 0, sess.seconds) },
                    }))
                  }
                />
              </div>
            </Card>
          ))}
          <Card>
            <p className="mb-1 text-sm font-medium text-ink">{pick(lang, "Tự đánh giá phần nói", "Rate your speaking")}</p>
            <p className="mb-4 text-xs text-muted">Listen to your recordings first, then rate (1 = weak, 5 = strong).</p>
            <SpeakingRubric rubric={d.speakingRubric} onChange={(r) => update({ speakingRubric: r })} />
          </Card>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Button variant="ghost" onClick={() => go(3)}>
              <IconArrowLeft /> {pick(lang, "Quay lại", "Back")}
            </Button>
            <Button onClick={finish} disabled={!speakingRubricDone} size="lg">
              {pick(lang, "Hoàn thành & xem kết quả", "Finish & see results")}
            </Button>
          </div>
        </div>
      )}

      {section === "result" && result && <ResultView result={result} onContinue={() => onFinished?.(result)} lang={lang} />}
    </div>
  );
}

function Nav({ back, next, canNext, lang }: { back: () => void; next: () => void; canNext: boolean; lang: "vi" | "en" }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <Button variant="ghost" onClick={back}>
        <IconArrowLeft /> {pick(lang, "Quay lại", "Back")}
      </Button>
      <div className="flex items-center gap-3">
        {!canNext && <span className="text-xs text-muted">{pick(lang, "Hoàn thành tất cả mục để tiếp tục", "Complete every item to continue")}</span>}
        <Button onClick={next} disabled={!canNext}>
          {pick(lang, "Tiếp", "Next")} <IconArrowRight />
        </Button>
      </div>
    </div>
  );
}

export function ResultView({ result, onContinue, lang }: { result: AssessmentResult; onContinue?: () => void; lang: "vi" | "en" }) {
  return (
    <Card className="animate-in">
      <p className="text-sm text-muted">{pick(lang, "Trình độ ước tính", "Estimated level")}</p>
      <p className="mt-1 text-4xl font-semibold tracking-tight text-ink">{result.cefr}</p>
      <p className="mt-2 max-w-xl text-sm text-muted">
        {pick(
          lang,
          "Đây là ước tính sơ bộ dựa trên bài đọc, từ vựng và phần tự đánh giá — không phải chứng chỉ. Nó dùng để điều chỉnh độ khó và để so sánh với Ngày 90.",
          "This is an approximate estimate from reading, vocabulary and your self-ratings — not a certificate. It is used to tune difficulty and to compare with Day 90.",
        )}
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <ScoreBar label={`Reading (${result.reading.correct}/${result.reading.total} correct)`} value={result.scores.reading} />
        <ScoreBar label={`Vocabulary (${result.vocabulary.correct}/${result.vocabulary.total})`} value={result.scores.vocabulary} />
        <ScoreBar label="Writing (rubric + text signals)" value={result.scores.writing} />
        <ScoreBar label={`Speaking (${Math.round(result.speaking.seconds)} s recorded)`} value={result.scores.speaking} />
      </div>
      <p className="mt-4 text-sm text-ink">
        Overall: <span className="font-semibold tabular-nums">{result.overall}</span>/100
      </p>
      {onContinue && (
        <Button className="mt-6" size="lg" onClick={onContinue}>
          {pick(lang, "Tiếp tục", "Continue")} <IconArrowRight />
        </Button>
      )}
    </Card>
  );
}
