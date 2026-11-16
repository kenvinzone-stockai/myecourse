"use client";

import type { Cefr, Difficulty, Goal, LearnerProfile, Skill, UiLanguage } from "@/lib/domain/types";
import { CEFR_LEVELS } from "@/lib/domain/types";
import { pick } from "@/lib/i18n";
import { cx, Field, Input, Rating, Select } from "@/components/ui";

export const GOALS: { id: Goal; en: string; vi: string }[] = [
  { id: "business", en: "Professional / business English", vi: "Tiếng Anh công việc / kinh doanh" },
  { id: "everyday", en: "Everyday communication", vi: "Giao tiếp hằng ngày" },
  { id: "technical-reading", en: "Reading technical / professional material", vi: "Đọc tài liệu chuyên môn" },
  { id: "emails-reports", en: "Writing emails and reports", vi: "Viết email và báo cáo" },
  { id: "speaking-fluency", en: "Speaking more fluently", vi: "Nói trôi chảy hơn" },
  { id: "general", en: "General English improvement", vi: "Cải thiện tiếng Anh tổng quát" },
  { id: "travel", en: "Travel communication", vi: "Giao tiếp khi du lịch" },
  { id: "presentations", en: "Presentations and meetings", vi: "Thuyết trình và họp" },
];

export const TOPICS = ["Productivity", "Technology", "AI", "Career", "Finance", "Communication", "Leadership", "Psychology", "Health habits", "Travel", "Culture", "Business", "Science", "Decision-making", "Project work", "Modern life"];

export const SKILL_OPTIONS: { id: Skill; en: string; vi: string }[] = [
  { id: "reading", en: "Reading", vi: "Đọc" },
  { id: "writing", en: "Writing", vi: "Viết" },
  { id: "speaking", en: "Speaking", vi: "Nói" },
  { id: "vocabulary", en: "Vocabulary", vi: "Từ vựng" },
];

export function defaultProfile(): LearnerProfile {
  return {
    name: "",
    selfEstimatedLevel: "unsure",
    targetLevel: "B2",
    goals: ["business"],
    topics: [],
    dailyMinutes: 65,
    preferredTime: "evening",
    variety: "no-preference",
    strongestSkill: "reading",
    weakestSkill: "speaking",
    speakingConfidence: 3,
    difficulty: "standard",
    weekendAvailable: true,
    createdAt: new Date().toISOString(),
  };
}

function Chips<T extends string>({ options, value, onToggle, label }: { options: { id: T; label: string }[]; value: T[]; onToggle: (id: T) => void; label: string }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = value.includes(o.id);
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={on}
            onClick={() => onToggle(o.id)}
            className={cx("rounded-full border px-3 py-1.5 text-sm transition-colors", on ? "border-accent bg-accent-soft text-accent" : "border-line text-muted hover:text-ink")}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function ProfileForm({ value, onChange, lang }: { value: LearnerProfile; onChange: (p: LearnerProfile) => void; lang: UiLanguage }) {
  const set = (patch: Partial<LearnerProfile>) => onChange({ ...value, ...patch });
  const toggle = <T,>(arr: T[], x: T) => (arr.includes(x) ? arr.filter((y) => y !== x) : [...arr, x]);
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(lang, "Tên của bạn (không bắt buộc)", "Your name (optional)")} htmlFor="p-name">
          <Input id="p-name" value={value.name} onChange={(e) => set({ name: e.target.value })} maxLength={80} />
        </Field>
        <Field label={pick(lang, "Trình độ hiện tại (tự ước lượng)", "Current level (your own guess)")} htmlFor="p-level" hint={pick(lang, "Bài đánh giá đầu vào sẽ kiểm tra lại.", "The baseline assessment will check this.")}>
          <Select id="p-level" value={value.selfEstimatedLevel} onChange={(e) => set({ selfEstimatedLevel: e.target.value as Cefr | "unsure" })}>
            <option value="unsure">{pick(lang, "Chưa rõ", "Not sure")}</option>
            {CEFR_LEVELS.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </Select>
        </Field>
        <Field label={pick(lang, "Trình độ mục tiêu", "Target level")} htmlFor="p-target">
          <Select id="p-target" value={value.targetLevel} onChange={(e) => set({ targetLevel: e.target.value as Cefr })}>
            {CEFR_LEVELS.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </Select>
        </Field>
        <Field label={pick(lang, "Thời gian học mỗi ngày", "Daily study time")} htmlFor="p-min" hint={pick(lang, "Mặc định 60–75 phút.", "Default is 60–75 minutes.")}>
          <Select id="p-min" value={value.dailyMinutes} onChange={(e) => set({ dailyMinutes: Number(e.target.value) })}>
            {[20, 30, 45, 65, 75, 90, 120].map((m) => (
              <option key={m} value={m}>
                {m === 65 ? "60–75" : m} {pick(lang, "phút", "min")}
              </option>
            ))}
          </Select>
        </Field>
        <Field label={pick(lang, "Thời điểm học ưa thích", "Preferred study time")} htmlFor="p-time">
          <Select id="p-time" value={value.preferredTime} onChange={(e) => set({ preferredTime: e.target.value as LearnerProfile["preferredTime"] })}>
            <option value="morning">{pick(lang, "Buổi sáng", "Morning")}</option>
            <option value="lunch">{pick(lang, "Buổi trưa", "Lunch break")}</option>
            <option value="evening">{pick(lang, "Buổi tối", "Evening")}</option>
            <option value="flexible">{pick(lang, "Linh hoạt", "Flexible")}</option>
          </Select>
        </Field>
        <Field label={pick(lang, "Giọng tiếng Anh ưa thích", "Preferred English variety")} htmlFor="p-var" hint={pick(lang, "Dùng cho giọng đọc mẫu.", "Used for the listen-aloud voice.")}>
          <Select id="p-var" value={value.variety} onChange={(e) => set({ variety: e.target.value as LearnerProfile["variety"] })}>
            <option value="no-preference">{pick(lang, "Không quan trọng", "No preference")}</option>
            <option value="american">American</option>
            <option value="british">British</option>
          </Select>
        </Field>
        <Field label={pick(lang, "Kỹ năng mạnh nhất", "Strongest skill")} htmlFor="p-strong">
          <Select id="p-strong" value={value.strongestSkill} onChange={(e) => set({ strongestSkill: e.target.value as Skill })}>
            {SKILL_OPTIONS.map((s) => (
              <option key={s.id} value={s.id}>
                {pick(lang, s.vi, s.en)}
              </option>
            ))}
          </Select>
        </Field>
        <Field label={pick(lang, "Kỹ năng yếu nhất", "Weakest skill")} htmlFor="p-weak">
          <Select id="p-weak" value={value.weakestSkill} onChange={(e) => set({ weakestSkill: e.target.value as Skill })}>
            {SKILL_OPTIONS.map((s) => (
              <option key={s.id} value={s.id}>
                {pick(lang, s.vi, s.en)}
              </option>
            ))}
          </Select>
        </Field>
        <Field label={pick(lang, "Độ khó mong muốn", "Desired difficulty")} htmlFor="p-diff" hint={pick(lang, "Điều chỉnh số từ cần viết và thời lượng nói.", "Scales writing length and speaking time.")}>
          <Select id="p-diff" value={value.difficulty} onChange={(e) => set({ difficulty: e.target.value as Difficulty })}>
            <option value="gentle">{pick(lang, "Nhẹ nhàng", "Gentle")}</option>
            <option value="standard">{pick(lang, "Tiêu chuẩn", "Standard")}</option>
            <option value="challenging">{pick(lang, "Thử thách", "Challenging")}</option>
          </Select>
        </Field>
        <Field label={pick(lang, "Học cuối tuần", "Weekend availability")} htmlFor="p-wk">
          <Select id="p-wk" value={value.weekendAvailable ? "y" : "n"} onChange={(e) => set({ weekendAvailable: e.target.value === "y" })}>
            <option value="y">{pick(lang, "Có, học được cuối tuần", "Yes, I can study at weekends")}</option>
            <option value="n">{pick(lang, "Hạn chế — chỉ bài ngắn", "Limited — short sessions only")}</option>
          </Select>
        </Field>
      </div>
      <Rating label={pick(lang, "Mức tự tin khi nói tiếng Anh", "Confidence in speaking")} value={value.speakingConfidence} onChange={(v) => set({ speakingConfidence: v })} lowLabel={pick(lang, "Rất ngại", "Very shy")} highLabel={pick(lang, "Tự tin", "Confident")} />
      <div>
        <p className="mb-2 text-sm font-medium text-ink">{pick(lang, "Lý do chính bạn muốn giỏi tiếng Anh", "Main reasons for improving English")}</p>
        <Chips label="Goals" options={GOALS.map((g) => ({ id: g.id, label: pick(lang, g.vi, g.en) }))} value={value.goals} onToggle={(id) => set({ goals: toggle(value.goals, id) })} />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-ink">{pick(lang, "Chủ đề yêu thích", "Preferred topics")}</p>
        <Chips label="Topics" options={TOPICS.map((t) => ({ id: t, label: t }))} value={value.topics} onToggle={(id) => set({ topics: toggle(value.topics, id) })} />
      </div>
    </div>
  );
}

