import React, { Suspense } from "react";
import type { Metadata } from "next";
import { getAllProjects } from "@/lib/content/loader";
import ChatCopilot from "@/components/chat/ChatCopilot";

export const metadata: Metadata = {
  title: "AI Portfolio Copilot | Apec Sinlapachai",
  description:
    "Ask grounded questions in English or Thai about Apec Sinlapachai's production AI projects, architectures, eval benchmarks, and hiring readiness.",
};

export default function ChatPage() {
  const projects = getAllProjects();
  const projectScopes = projects.map((p) => ({
    value: p.slug,
    label: p.shortTitle,
  }));

  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-4xl px-4 py-12 text-center text-sm text-[var(--muted)]">
          Loading AI Portfolio Copilot...
        </div>
      }
    >
      <ChatCopilot projectScopes={projectScopes} />
    </Suspense>
  );
}
