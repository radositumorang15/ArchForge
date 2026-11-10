import React from "react";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/shell/AppShell";
import { ProgressView } from "@/components/progress/ProgressView";
import { getCurrentUserProfile } from "@/lib/auth";

export default async function ProgressPage() {
  const user = await getCurrentUserProfile();
  if (!user) {
    redirect("/login?from=/progress");
  }

  return (
    <AppShell
      user={user}
      breadcrumbs={[
        { label: "ArchForge", href: "/dashboard" },
        { label: "Statistik Progres & Performa" },
      ]}
    >
      <ProgressView />
    </AppShell>
  );
}
