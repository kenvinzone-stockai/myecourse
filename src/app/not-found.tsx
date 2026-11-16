import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-2xl font-semibold text-ink">Page not found</h1>
      <p className="mt-2 text-sm text-muted">Trang này không tồn tại. The lesson you want is one click away.</p>
      <Link href="/today" className="mt-6 inline-flex h-10 items-center rounded-lg bg-accent px-4 text-sm font-medium text-accent-ink">
        Open today&apos;s lesson
      </Link>
    </div>
  );
}
