import React from "react";
import { AppShell } from "@/components/shell/AppShell";
import { PracticeView } from "@/components/practice/PracticeView";

export default function PracticePage() {
  return (
    <AppShell
      breadcrumbs={[
        { label: "ArchForge", href: "/dashboard" },
        { label: "Bank Soal DSA & Live Coding" },
      ]}
    >
      <PracticeView />
    </AppShell>
  );
}

