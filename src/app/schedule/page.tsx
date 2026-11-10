import React from "react";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/shell/AppShell";
import { ScheduleView } from "@/components/schedule/ScheduleView";
import { getCurrentUserProfile } from "@/lib/auth";

export default async function SchedulePage() {
  const user = await getCurrentUserProfile();
  if (!user) {
    redirect("/login?from=/schedule");
  }

  return (
    <AppShell
      user={user}
      breadcrumbs={[
        { label: "ArchForge", href: "/dashboard" },
        { label: "Jadwal Belajar (Timetable)" },
      ]}
    >
      <ScheduleView />
    </AppShell>
  );
}
