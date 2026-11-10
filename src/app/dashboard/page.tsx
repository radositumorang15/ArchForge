import React from "react";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/shell/AppShell";
import { DashboardView } from "@/components/dashboard/DashboardView";
import { getCurrentUserProfile } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await getCurrentUserProfile();

  if (!user) {
    redirect("/login?from=/dashboard");
  }

  return (
    <AppShell
      user={user}
      breadcrumbs={[
        { label: "ArchForge", href: "/dashboard" },
        { label: "Home (Dashboard)" },
      ]}
    >
      <DashboardView user={user} />
    </AppShell>
  );
}
