import React from "react";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/shell/AppShell";
import { SRSReviewView } from "@/components/srs/SRSReviewView";
import { getCurrentUserProfile } from "@/lib/auth";

export default async function ReviewPage() {
  const user = await getCurrentUserProfile();
  if (!user) {
    redirect("/login?from=/review");
  }

  return (
    <AppShell
      user={user}
      breadcrumbs={[
        { label: "ArchForge", href: "/dashboard" },
        { label: "Sesi Review Spaced Repetition (FSRS)" },
      ]}
    >
      <SRSReviewView />
    </AppShell>
  );
}
