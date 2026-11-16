"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { LearnerProfile } from "@/lib/domain/types";
import { defaultProfile, ProfileForm } from "@/components/profile/ProfileForm";
import { finishOnboarding, saveProfile, updateSettings, useAppState } from "@/store/store";
import { AssessmentRunner, ResultView } from "@/components/assessment/AssessmentRunner";
import { pick } from "@/lib/i18n";
import { Button, Card, cx, Loading } from "@/components/ui";
import { IconArrowRight } from "@/components/ui/icons";

export default function OnboardingPage() {
  const state = useAppState();
  const router = useRouter();
  const [rawStep, setStep] = useState<"welcome" | "prefs" | "assess" | "result">("welcome");
  const [profile, setProfile] = useState<LearnerProfile>(defaultProfile);
  if (!state) return <div className="mx-auto max-w-3xl p-6"><Loading /></div>;
  const lang = state.settings.uiLanguage;
  const baseline = state.assessments.baseline;
  // Returning after the assessment: go straight to the result.
  // A saved profile without a baseline means the learner was mid-assessment (e.g. after a refresh).
  const step = rawStep === "welcome" && state.profile ? (baseline ? "result" : "assess") : rawStep;

  function start() {
    saveProfile(state?.profile ?? profile);
    finishOnboarding();
    router.push("/today");
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-14">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span aria-hidden className="grid h-8 w-8 place-items-center rounded-lg bg-accent font-serif font-semibold text-accent-ink">E</span>
          <span className="text-sm font-semibold text-ink">English OS</span>
        </div>
        <div className="flex gap-1 rounded-lg bg-surface-2 p-1 text-xs" role="group" aria-label="Interface language">
          {(["vi", "en"] as const).map((l) => (
            <button key={l} aria-pressed={lang === l} onClick={() => updateSettings({ uiLanguage: l })} className={cx("rounded-md px-2.5 py-1", lang === l ? "bg-surface text-ink shadow-sm" : "text-muted")}>
              {l === "vi" ? "Tiếng Việt" : "English"}
            </button>
          ))}
        </div>
      </div>

      {step === "welcome" && (
        <div className="animate-in space-y-6">
          <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{pick(lang, "90 ngày. Mỗi ngày một bài. Đọc, Viết, Nói.", "90 days. One lesson a day. Read, write, speak.")}</h1>
          <p className="max-w-2xl text-[15px] leading-relaxed text-muted">
            {pick(
              lang,
              "Đây là hệ thống học tiếng Anh cá nhân của bạn, từ 16/11/2026 đến 13/02/2027. Mỗi ngày ứng dụng cho bạn biết chính xác cần học gì: ôn lại → học từ → đọc → viết → nói → tự đánh giá. Tiến độ được lưu ngay trên máy của bạn.",
              "This is your personal English learning system, from 16/11/2026 to 13/02/2027. Every day it tells you exactly what to do: review → learn → read → write → speak → reflect. Your progress is saved on this device.",
            )}
          </p>
          <ol className="grid gap-3 sm:grid-cols-4">
            {[
              ["1–21", pick(lang, "Xây lại nền tảng", "Rebuild the foundation")],
              ["22–45", pick(lang, "Mở rộng kỹ năng", "Skill expansion")],
              ["46–69", pick(lang, "Tiếng Anh ứng dụng", "Applied English")],
              ["70–90", pick(lang, "Tích hợp & đánh giá", "Integration & final")],
            ].map(([d, n]) => (
              <li key={d} className="rounded-xl border border-line bg-surface p-4">
                <p className="text-xs text-faint">{pick(lang, "Ngày", "Days")} {d}</p>
                <p className="mt-1 text-sm font-medium text-ink">{n}</p>
              </li>
            ))}
          </ol>
          <p className="text-sm text-muted">{pick(lang, "Hai bước để bắt đầu: (1) thiết lập sở thích — 2 phút, (2) đánh giá đầu vào — khoảng 35–45 phút.", "Two steps to begin: (1) set your preferences — 2 minutes, (2) baseline assessment — about 35–45 minutes.")}</p>
          <Button size="lg" onClick={() => setStep("prefs")}>
            {pick(lang, "Thiết lập sở thích", "Configure preferences")} <IconArrowRight />
          </Button>
        </div>
      )}

      {step === "prefs" && (
        <div className="animate-in space-y-6">
          <h1 className="text-2xl font-semibold tracking-tight text-ink">{pick(lang, "Sở thích học tập", "Your preferences")}</h1>
          <p className="text-sm text-muted">{pick(lang, "Bạn có thể thay đổi tất cả trong phần Cài đặt sau này.", "You can change all of this later in Settings.")}</p>
          <Card>
            <ProfileForm value={profile} onChange={setProfile} lang={lang} />
          </Card>
          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              onClick={() => {
                saveProfile(profile);
                setStep(baseline ? "result" : "assess");
                window.scrollTo({ top: 0 });
              }}
            >
              {pick(lang, "Bắt đầu đánh giá đầu vào", "Start baseline assessment")} <IconArrowRight />
            </Button>
            <Button variant="ghost" onClick={() => setStep("welcome")}>
              {pick(lang, "Quay lại", "Back")}
            </Button>
          </div>
        </div>
      )}

      {step === "assess" && (
        <div className="animate-in space-y-4">
          <AssessmentRunner kind="baseline" onFinished={() => setStep("result")} />
          <p className="text-center text-xs text-faint">
            <button
              className="underline"
              onClick={() => {
                if (window.confirm(pick(lang, "Bỏ qua đánh giá? Bạn sẽ không có mốc so sánh Ngày 1 cho đến khi làm bài này (có thể làm sau trong Tiến độ).", "Skip the assessment? You won't have a Day 1 baseline until you take it (you can do it later from Progress)."))) start();
              }}
            >
              {pick(lang, "Bỏ qua lúc này và vào Ngày 1", "Skip for now and open Day 1")}
            </button>
          </p>
        </div>
      )}

      {step === "result" && (
        <div className="animate-in space-y-6">
          <h1 className="text-2xl font-semibold tracking-tight text-ink">{pick(lang, "Điểm xuất phát của bạn", "Your starting point")}</h1>
          {baseline && <ResultView result={baseline} lang={lang} />}
          <Card>
            <h2 className="font-medium text-ink">{pick(lang, "Tiếp theo: Ngày 1", "Next: Day 1")}</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              {pick(
                lang,
                "Mỗi bài có 6 bước và thanh tiến độ. Làm theo thứ tự, bấm “Continue” sau mỗi bước, và hoàn thành bài bằng điểm tự tin 1–5. Nếu lỡ một ngày, ứng dụng sẽ đề xuất cách học bù hợp lý.",
                "Each lesson has 6 steps and a progress bar. Follow them in order, press Continue after each step, and finish with a 1–5 confidence score. If you miss a day, the app suggests a sensible way to recover.",
              )}
            </p>
            <Button size="lg" className="mt-4" onClick={start}>
              {pick(lang, "Mở Ngày 1", "Open Day 1")} <IconArrowRight />
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}
