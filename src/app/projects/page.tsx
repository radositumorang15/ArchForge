import React from "react";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/shell/AppShell";
import { ProjectsView } from "@/components/projects/ProjectsView";
import { getCurrentUserProfile } from "@/lib/auth";

export default async function ProjectsPage() {
  const user = await getCurrentUserProfile();
  if (!user) {
    redirect("/login?from=/projects");
  }

  return (
    <AppShell
      user={user}
      breadcrumbs={[
        { label: "ArchForge", href: "/dashboard" },
        { label: "Proyek & Tugas Portofolio" },
      ]}
    >
      <ProjectsView />
    </AppShell>
  );
}
