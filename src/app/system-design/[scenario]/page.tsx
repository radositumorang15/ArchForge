import React from "react";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/shell/AppShell";
import { SystemDesignSimulator } from "@/components/sd/SystemDesignSimulator";
import { getCurrentUserProfile } from "@/lib/auth";

interface ScenarioPageProps {
  params: Promise<{ scenario: string }>;
}

export default async function ScenarioPage({ params }: ScenarioPageProps) {
  const user = await getCurrentUserProfile();
  if (!user) {
    redirect("/login?from=/system-design");
  }

  const { scenario } = await params;
  return (
    <AppShell
      user={user}
      breadcrumbs={[
        { label: "ArchForge", href: "/dashboard" },
        { label: "Simulator System Design", href: "/system-design" },
        { label: scenario.toUpperCase() },
      ]}
    >
      <SystemDesignSimulator />
    </AppShell>
  );
}
