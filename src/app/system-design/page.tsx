import React from "react";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/shell/AppShell";
import { SystemDesignSimulator } from "@/components/sd/SystemDesignSimulator";
import { getCurrentUserProfile } from "@/lib/auth";

export default async function SystemDesignPage() {
  const user = await getCurrentUserProfile();
  if (!user) {
    redirect("/login?from=/system-design");
  }

  return (
    <AppShell
      user={user}
      breadcrumbs={[
        { label: "ArchForge", href: "/dashboard" },
        { label: "Simulator System Design" },
      ]}
    >
      <SystemDesignSimulator />
    </AppShell>
  );
}
