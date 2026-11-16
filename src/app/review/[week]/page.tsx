import { notFound } from "next/navigation";
import { WeekClient } from "./WeekClient";

export function generateStaticParams() {
  return Array.from({ length: 13 }, (_, i) => ({ week: String(i + 1) }));
}

export default async function WeekPage({ params }: { params: Promise<{ week: string }> }) {
  const { week } = await params;
  const n = Number(week);
  if (!Number.isInteger(n) || n < 1 || n > 13) notFound();
  return <WeekClient week={n} />;
}
