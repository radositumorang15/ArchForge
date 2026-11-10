import React from "react";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/shell/AppShell";
import { InterviewRoom } from "@/components/interview/InterviewRoom";
import { getCurrentUserProfile } from "@/lib/auth";

export default async function InterviewPage() {
  const user = await getCurrentUserProfile();

  if (!user) {
    redirect("/login?from=/interview");
  }

  return (
    <AppShell
      noPadding
      user={user}
      breadcrumbs={[
        { label: "ArchForge", href: "/dashboard" },
        { label: "Interview Room", href: "/interview" },
        { label: "Simulasi Arsitektur & Coding" },
      ]}
    >
      <InterviewRoom user={user} />
    </AppShell>
  );
}
