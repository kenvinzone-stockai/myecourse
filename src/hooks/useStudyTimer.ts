"use client";

import { useEffect, useRef } from "react";
import { addStudyMinutes } from "@/store/store";

/**
 * Counts real study time: every 30 s, if the page is visible and the learner
 * interacted in the last 2 minutes (typing, clicking, scrolling, audio), half a
 * minute is added to today's activity (and to the lesson, when given).
 */
export function useStudyTimer(day?: number, enabled = true) {
  const lastActive = useRef(0);
  useEffect(() => {
    if (!enabled) return;
    lastActive.current = Date.now();
    const mark = () => (lastActive.current = Date.now());
    const events = ["keydown", "pointerdown", "scroll", "touchstart", "play"];
    events.forEach((e) => window.addEventListener(e, mark, { passive: true, capture: true }));
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible" && Date.now() - lastActive.current < 120_000) addStudyMinutes(0.5, day);
    }, 30_000);
    return () => {
      window.clearInterval(id);
      events.forEach((e) => window.removeEventListener(e, mark, { capture: true }));
    };
  }, [day, enabled]);
}
