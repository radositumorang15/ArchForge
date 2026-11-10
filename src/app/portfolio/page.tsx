import React from "react";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/shell/AppShell";
import { PortfolioView } from "@/components/portfolio/PortfolioView";
import { getCurrentUserProfile } from "@/lib/auth";

export default async function PortfolioPage() {
  const user = await getCurrentUserProfile();
  if (!user) {
    redirect("/login?from=/portfolio");
  }

  return (
    <AppShell
      user={user}
      breadcrumbs={[
        { label: "ArchForge", href: "/dashboard" },
        { label: "Portofolio Publik", href: "/portfolio" },
      ]}
    >
      <PortfolioView user={user} />
    </AppShell>
  );
}
