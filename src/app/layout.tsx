import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/source-serif-4";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "English OS — 90-day personal learning system",
  description: "A calm, adaptive personal English learning system for Reading, Writing and Speaking (16/11/2026 – 13/02/2027).",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f5f1" },
    { media: "(prefers-color-scheme: dark)", color: "#111312" },
  ],
};

// Applies the saved theme before first paint to avoid a light/dark flash.
const themeScript = `try{var s=JSON.parse(localStorage.getItem("elos:state:v1")||"null");var t=s&&s.settings&&s.settings.theme||"system";if(t==="dark"||(t==="system"&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh bg-bg text-ink antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
