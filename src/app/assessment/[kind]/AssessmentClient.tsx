"use client";

import { useRouter } from "next/navigation";
import type { AssessmentKind } from "@/lib/domain/types";
import { useAppState } from "@/store/store";
import { AssessmentRunner } from "@/components/assessment/AssessmentRunner";
import { Loading } from "@/components/ui";

export function AssessmentClient({ kind }: { kind: AssessmentKind }) {
  const state = useAppState();
  const router = useRouter();
  if (!state) return <Loading />;
  return (
    <AssessmentRunner
      kind={kind}
      onFinished={() => {
        if (kind === "final") router.push("/report");
        else if (kind === "baseline") router.push(state.onboardingComplete ? "/progress" : "/onboarding");
        else router.push("/progress");
      }}
    />
  );
}
