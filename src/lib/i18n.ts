// Interface language. Navigation and explanations can be Vietnamese;
// exercises stay in English by design.

import type { UiLanguage } from "./domain/types";

const DICT = {
  dashboard: { vi: "Tổng quan", en: "Dashboard" },
  today: { vi: "Hôm nay", en: "Today" },
  roadmap: { vi: "Lộ trình 90 ngày", en: "90-Day Roadmap" },
  reading: { vi: "Đọc", en: "Reading" },
  writing: { vi: "Viết", en: "Writing" },
  speaking: { vi: "Nói", en: "Speaking" },
  vocabulary: { vi: "Từ vựng", en: "Vocabulary" },
  progress: { vi: "Tiến độ", en: "Progress" },
  settings: { vi: "Cài đặt", en: "Settings" },
  continueToday: { vi: "Tiếp tục bài hôm nay", en: "Continue Today's Lesson" },
  startToday: { vi: "Bắt đầu bài hôm nay", en: "Start Today's Lesson" },
  streak: { vi: "Chuỗi ngày học", en: "Study streak" },
  days: { vi: "ngày", en: "days" },
  minutes: { vi: "phút", en: "minutes" },
  completed: { vi: "Đã hoàn thành", en: "Completed" },
  inProgress: { vi: "Đang học", en: "In progress" },
  notStarted: { vi: "Chưa bắt đầu", en: "Not started" },
  needsReview: { vi: "Cần ôn lại", en: "Needs review" },
  skipped: { vi: "Đã bỏ qua", en: "Skipped" },
  missed: { vi: "Bị lỡ", en: "Missed" },
  upcoming: { vi: "Sắp tới", en: "Upcoming" },
  reviewDay: { vi: "Ngày ôn tập", en: "Review day" },
  checkpoint: { vi: "Mốc đánh giá", en: "Checkpoint" },
  dueReviews: { vi: "Từ cần ôn hôm nay", en: "Words due today" },
  weeklyProgress: { vi: "Tiến độ tuần này", en: "This week" },
  completion: { vi: "Hoàn thành chương trình", en: "Program completion" },
  estimate: { vi: "ước tính", en: "estimate" },
  back: { vi: "Quay lại", en: "Back" },
  next: { vi: "Tiếp", en: "Next" },
  save: { vi: "Lưu", en: "Save" },
  saved: { vi: "Đã lưu", en: "Saved" },
  more: { vi: "Thêm", en: "More" },
  menu: { vi: "Menu", en: "Menu" },
  weeklyReview: { vi: "Ôn tập tuần", en: "Weekly review" },
  phase: { vi: "Giai đoạn", en: "Phase" },
  day: { vi: "Ngày", en: "Day" },
  week: { vi: "Tuần", en: "Week" },
} as const;

export type TKey = keyof typeof DICT;

export function t(key: TKey, lang: UiLanguage = "vi"): string {
  return DICT[key][lang];
}

/** Pick between a Vietnamese and an English string. */
export function pick(lang: UiLanguage | undefined, vi: string, en: string): string {
  return lang === "en" ? en : vi;
}
