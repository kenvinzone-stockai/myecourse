import { describe, expect, it } from "vitest";
import { addDays, dateForDay, dateKeyInTimezone, diffDays, formatDmy, isDateKey, programPosition, TOTAL_DAYS } from "./dates";

describe("program calendar", () => {
  it("Day 1 is 16/11/2026 and Day 90 is 13/02/2027", () => {
    expect(formatDmy(dateForDay(1))).toBe("16/11/2026");
    expect(formatDmy(dateForDay(TOTAL_DAYS))).toBe("13/02/2027");
  });

  it("calculates the current day", () => {
    expect(programPosition("2026-11-16")).toEqual({ kind: "active", calendarDay: 1 });
    expect(programPosition("2026-12-15")).toEqual({ kind: "active", calendarDay: 30 });
    expect(programPosition("2027-01-14")).toEqual({ kind: "active", calendarDay: 60 });
    expect(programPosition("2027-02-13")).toEqual({ kind: "active", calendarDay: 90 });
  });

  it("handles before the start date", () => {
    expect(programPosition("2026-11-10")).toEqual({ kind: "before", daysUntilStart: 6, calendarDay: 0 });
  });

  it("handles after Day 90", () => {
    expect(programPosition("2027-02-14")).toEqual({ kind: "after", daysSinceEnd: 1, calendarDay: 90 });
  });

  it("supports shifting the plan forward", () => {
    expect(dateForDay(1, 3)).toBe("2026-11-19");
    expect(programPosition("2026-11-19", 3)).toEqual({ kind: "active", calendarDay: 1 });
  });

  it("uses Asia/Ho_Chi_Minh for 'today'", () => {
    // 17:30 UTC on 15 Nov = 00:30 on 16 Nov in Vietnam (UTC+7)
    expect(dateKeyInTimezone(new Date("2026-11-15T17:30:00Z"))).toBe("2026-11-16");
    expect(dateKeyInTimezone(new Date("2026-11-15T16:59:00Z"))).toBe("2026-11-15");
  });

  it("date arithmetic crosses year boundaries", () => {
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
    expect(diffDays("2027-02-13", "2026-11-16")).toBe(89);
    expect(isDateKey("2027-02-30")).toBe(false);
    expect(isDateKey("2027-02-13")).toBe(true);
  });
});
