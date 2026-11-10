import React from "react";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/shell/AppShell";
import { SettingsView } from "@/components/settings/SettingsView";
import { getCurrentUserProfile } from "@/lib/auth";

export default async function SettingsPage() {
  const user = await getCurrentUserProfile();
  if (!user) {
    redirect("/login?from=/settings");
  }

  return (
    <AppShell
      user={user}
      breadcrumbs={[
        { label: "ArchForge", href: "/dashboard" },
        { label: "Pengaturan" },
      ]}
    >
      <SettingsView user={user} />
    </AppShell>
  );
}
