import React from "react";
import { AppShell } from "@/components/shell/AppShell";
import { HelpView } from "@/components/help/HelpView";

export default function HelpPage() {
  return (
    <AppShell
      breadcrumbs={[
        { label: "ArchForge", href: "/dashboard" },
        { label: "Pusat Bantuan & Pintasan" },
      ]}
    >
      <HelpView />
    </AppShell>
  );
}

