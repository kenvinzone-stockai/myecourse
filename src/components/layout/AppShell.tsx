"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { clearWarning, getWarning, useAppState, useToday } from "@/store/store";
import { t } from "@/lib/i18n";
import { cx, Notice } from "@/components/ui";
import { IconBook, IconCards, IconChart, IconHome, IconMap, IconMenu, IconMic, IconPen, IconSettings, IconToday, IconX } from "@/components/ui/icons";
import { programPosition, TOTAL_DAYS } from "@/lib/domain/dates";

const NAV = [
  { href: "/", key: "dashboard", icon: IconHome },
  { href: "/today", key: "today", icon: IconToday },
  { href: "/roadmap", key: "roadmap", icon: IconMap },
  { href: "/reading", key: "reading", icon: IconBook },
  { href: "/writing", key: "writing", icon: IconPen },
  { href: "/speaking", key: "speaking", icon: IconMic },
  { href: "/vocabulary", key: "vocabulary", icon: IconCards },
  { href: "/progress", key: "progress", icon: IconChart },
  { href: "/settings", key: "settings", icon: IconSettings },
] as const;

const MOBILE_NAV = ["/", "/today", "/roadmap", "/vocabulary", "/progress"];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/today") return pathname === "/today" || pathname.startsWith("/day/");
  return pathname.startsWith(href);
}

const OPEN_ROUTES = ["/onboarding", "/settings", "/assessment/baseline"];

export function AppShell({ children }: { children: ReactNode }) {
  const state = useAppState();
  const today = useToday();
  const pathname = usePathname();
  const router = useRouter();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const menuOpen = menuPath === pathname; // closes automatically on navigation
  const setMenuOpen = (fn: (v: boolean) => boolean) => setMenuPath(fn(menuOpen) ? pathname : null);
  const lang = state?.settings.uiLanguage ?? "vi";

  // Theme
  useEffect(() => {
    if (!state) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const dark = state.settings.theme === "dark" || (state.settings.theme === "system" && mq.matches);
      document.documentElement.classList.toggle("dark", dark);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [state]);

  useEffect(() => {
    document.documentElement.lang = lang === "vi" ? "vi" : "en";
  }, [lang]);

  // First-run gate: never land on an empty dashboard.
  const needsOnboarding = state !== null && !state.onboardingComplete && !OPEN_ROUTES.some((r) => pathname.startsWith(r));
  useEffect(() => {
    if (needsOnboarding) router.replace("/onboarding");
  }, [needsOnboarding, router]);


  const bare = pathname.startsWith("/onboarding");
  const pos = today && state ? programPosition(today, state.settings.planOffsetDays) : null;
  const warning = state ? getWarning() : undefined;

  if (bare) {
    return <main className="min-h-dvh">{children}</main>;
  }

  return (
    <div className="min-h-dvh lg:flex">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-surface focus:px-3 focus:py-2">
        Skip to content
      </a>

      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-line bg-surface/60 px-3 py-5 lg:flex">
        <Brand />
        <nav aria-label="Main" className="mt-6 flex flex-col gap-0.5">
          {NAV.map(({ href, key, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(pathname, href) ? "page" : undefined}
              className={cx(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive(pathname, href) ? "bg-accent-soft font-medium text-accent" : "text-muted hover:bg-surface-2 hover:text-ink",
              )}
            >
              <Icon />
              {t(key, lang)}
            </Link>
          ))}
        </nav>
        <div className="mt-auto px-3 text-xs text-faint">
          {pos?.kind === "active" && (
            <p>
              {t("day", lang)} {pos.calendarDay} / {TOTAL_DAYS}
            </p>
          )}
          <p className="mt-1">16/11/2026 → 13/02/2027</p>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-bg/90 px-4 py-3 backdrop-blur lg:hidden">
        <Brand compact />
        <button aria-label={t("menu", lang)} aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)} className="rounded-lg p-2 text-muted hover:bg-surface-2">
          {menuOpen ? <IconX /> : <IconMenu />}
        </button>
      </div>
      {menuOpen && (
        <nav aria-label="Menu" className="fixed inset-x-0 top-[57px] z-30 border-b border-line bg-surface p-3 shadow-lg lg:hidden">
          <div className="grid grid-cols-2 gap-1">
            {NAV.map(({ href, key, icon: Icon }) => (
              <Link key={href} href={href} className={cx("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm", isActive(pathname, href) ? "bg-accent-soft text-accent" : "text-ink hover:bg-surface-2")}>
                <Icon />
                {t(key, lang)}
              </Link>
            ))}
          </div>
        </nav>
      )}

      <main id="main" className="min-w-0 flex-1 px-4 pb-28 pt-6 sm:px-6 lg:px-10 lg:pb-12 lg:pt-10">
        <div className="mx-auto max-w-5xl">
          {warning && (
            <div className="mb-4">
              <Notice tone="warn" title="Storage notice" action={<button className="text-sm underline" onClick={clearWarning}>OK</button>}>
                {warning}
              </Notice>
            </div>
          )}
          {children}
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav aria-label="Quick" className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
        {NAV.filter((n) => MOBILE_NAV.includes(n.href)).map(({ href, key, icon: Icon }) => (
          <Link key={href} href={href} aria-current={isActive(pathname, href) ? "page" : undefined} className={cx("flex flex-col items-center gap-1 py-2.5 text-[11px]", isActive(pathname, href) ? "text-accent" : "text-muted")}>
            <Icon />
            <span className="truncate">{key === "roadmap" ? (lang === "vi" ? "Lộ trình" : "Roadmap") : t(key, lang)}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

function Brand({ compact }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 px-3">
      <span aria-hidden className="grid h-8 w-8 place-items-center rounded-lg bg-accent font-serif text-base font-semibold text-accent-ink">
        E
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-semibold text-ink">English OS</span>
        {!compact && <span className="block text-xs text-faint">90-day learning system</span>}
      </span>
    </Link>
  );
}
