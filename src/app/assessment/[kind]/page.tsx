import { notFound } from "next/navigation";
import { AssessmentClient } from "./AssessmentClient";

const KINDS = ["baseline", "day30", "day60", "final"] as const;

export function generateStaticParams() {
  return KINDS.map((kind) => ({ kind }));
}

export default async function AssessmentPage({ params }: { params: Promise<{ kind: string }> }) {
  const { kind } = await params;
  if (!(KINDS as readonly string[]).includes(kind)) notFound();
  return <AssessmentClient kind={kind as (typeof KINDS)[number]} />;
}
