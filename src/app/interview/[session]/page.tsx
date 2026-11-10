import React from "react";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/shell/AppShell";
import { InterviewRoom } from "@/components/interview/InterviewRoom";
import { getCurrentUserProfile } from "@/lib/auth";

export default async function InterviewSessionPage({
  params,
}: {
  params: Promise<{ session: string }>;
}) {
  const user = await getCurrentUserProfile();

  if (!user) {
    redirect("/login?from=/interview");
  }

  const resolvedParams = await params;

  return (
    <AppShell
      noPadding
      user={user}
      breadcrumbs={[
        { label: "ArchForge", href: "/dashboard" },
        { label: "Interview Room", href: "/interview" },
        { label: `Sesi ${resolvedParams.session}` },
      ]}
    >
      <InterviewRoom user={user} initialSessionId={resolvedParams.session} />
    </AppShell>
  );
}
