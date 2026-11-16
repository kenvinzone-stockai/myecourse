// Deterministic date logic. All learner-facing "days" are calendar days in
// Asia/Ho_Chi_Minh, represented as ISO date keys (YYYY-MM-DD). Arithmetic is
// done on UTC midnights of those keys, so DST/host timezone never matters.

export const TIMEZONE = "Asia/Ho_Chi_Minh";
export const PROGRAM_START = "2026-11-16";
export const TOTAL_DAYS = 90;
export const MS_PER_DAY = 86_400_000;

export type DateKey = string; // YYYY-MM-DD

const KEY_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

export function isDateKey(value: unknown): value is DateKey {
  if (typeof value !== "string" || !KEY_RE.test(value)) return false;
  const t = keyToUtc(value);
  return utcToKey(t) === value;
}

export function keyToUtc(key: DateKey): number {
  const m = KEY_RE.exec(key);
  if (!m) throw new Error(`Invalid date key: ${key}`);
  return Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

export function utcToKey(ms: number): DateKey {
  const d = new Date(ms);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function addDays(key: DateKey, n: number): DateKey {
  return utcToKey(keyToUtc(key) + n * MS_PER_DAY);
}

export function diffDays(a: DateKey, b: DateKey): number {
  return Math.round((keyToUtc(a) - keyToUtc(b)) / MS_PER_DAY);
}

/** Calendar date in Asia/Ho_Chi_Minh for an instant. */
export function dateKeyInTimezone(instant: Date, timeZone = TIMEZONE): DateKey {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(instant);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

/** Calendar date for lesson `day` (1-based), honouring an optional plan shift. */
export function dateForDay(day: number, offsetDays = 0): DateKey {
  return addDays(PROGRAM_START, day - 1 + offsetDays);
}

export type ProgramPosition =
  | { kind: "before"; daysUntilStart: number; calendarDay: 0 }
  | { kind: "active"; calendarDay: number }
  | { kind: "after"; daysSinceEnd: number; calendarDay: number };

/** Where `today` sits relative to the (possibly shifted) 90-day calendar. */
export function programPosition(today: DateKey, offsetDays = 0): ProgramPosition {
  const start = addDays(PROGRAM_START, offsetDays);
  const delta = diffDays(today, start);
  if (delta < 0) return { kind: "before", daysUntilStart: -delta, calendarDay: 0 };
  const day = delta + 1;
  if (day > TOTAL_DAYS) return { kind: "after", daysSinceEnd: day - TOTAL_DAYS, calendarDay: TOTAL_DAYS };
  return { kind: "active", calendarDay: day };
}

export function weekOfDay(day: number): number {
  return Math.ceil(day / 7);
}

export function formatDateKey(key: DateKey, locale: "vi" | "en" = "vi", style: "short" | "long" = "short"): string {
  const d = new Date(keyToUtc(key));
  return new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-GB", {
    timeZone: "UTC",
    day: "2-digit",
    month: style === "long" ? "long" : "2-digit",
    year: "numeric",
    ...(style === "long" ? { weekday: "long" } : {}),
  }).format(d);
}

/** dd/mm/yyyy — the format the learner uses. */
export function formatDmy(key: DateKey): string {
  const [y, m, d] = key.split("-");
  return `${d}/${m}/${y}`;
}

export function weekdayShort(key: DateKey, locale: "vi" | "en" = "en"): string {
  return new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-GB", { timeZone: "UTC", weekday: "short" }).format(
    new Date(keyToUtc(key)),
  );
}
