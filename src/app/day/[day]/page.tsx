import { notFound } from "next/navigation";
import { DayClient } from "./DayClient";

export function generateStaticParams() {
  return Array.from({ length: 90 }, (_, i) => ({ day: String(i + 1) }));
}

export default async function DayPage({ params }: { params: Promise<{ day: string }> }) {
  const { day } = await params;
  const n = Number(day);
  if (!Number.isInteger(n) || n < 1 || n > 90) notFound();
  return <DayClient day={n} />;
}
