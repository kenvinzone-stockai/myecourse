import type { NextConfig } from "next";

// Local-first personal app: every learner-facing page renders on the client
// from browser storage, so the classic (non cache-components) model is used.
// STATIC_EXPORT=1 builds a fully static site (./out) for GitHub Pages.
// The optional /api/ai route cannot exist there, so the deploy workflow removes it
// and the app falls back to self-assessment (its default behaviour).
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(staticExport ? { output: "export" as const, images: { unoptimized: true } } : {}),
  env: { NEXT_PUBLIC_STATIC_EXPORT: staticExport ? "1" : "" },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
