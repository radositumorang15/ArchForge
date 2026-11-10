import React from "react";
import { AppShell } from "@/components/shell/AppShell";
import { DesignSystemReferenceView } from "@/components/design-system/DesignSystemReferenceView";

export default function DesignSystemPage() {
  return (
    <AppShell
      breadcrumbs={[
        { label: "ArchForge", href: "/dashboard" },
        { label: "Referensi Sistem Desain", href: "/design-system" },
      ]}
    >
      <DesignSystemReferenceView />
    </AppShell>
  );
}

