import type { Metadata } from "next";
import type { ReactNode } from "react";

const TITLE = "Production AI Agent Ops — Live Demo | Apec Sinlapachai";
const DESCRIPTION =
  "Interactive live demo of a SQL-first LangGraph state machine with pre-LLM PDPA PII redaction (0.00 leak rate), PostgreSQL FOR UPDATE HITL approvals, DLQ replay, and 62.78% LLM cost reduction.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    url: "https://apec-ai-portfolio.vercel.app/demos/agent-ops",
    siteName: "Apec Sinlapachai — AI & AI Automation Engineer",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

export default function AgentOpsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
