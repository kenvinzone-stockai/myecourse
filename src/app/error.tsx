"use client";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="py-20 text-center">
      <h1 className="text-2xl font-semibold text-ink">Something went wrong</h1>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted">Your saved progress is not affected. {error.message}</p>
      <button onClick={reset} className="mt-6 inline-flex h-10 items-center rounded-lg bg-accent px-4 text-sm font-medium text-accent-ink">
        Try again
      </button>
    </div>
  );
}
