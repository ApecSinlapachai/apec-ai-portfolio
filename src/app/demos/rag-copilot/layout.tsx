import type { Metadata } from "next";
import type { ReactNode } from "react";

const TITLE = "Enterprise RAG Ops Copilot — Live Demo | Apec Sinlapachai";
const DESCRIPTION =
  "Interactive live demo of Thai–English Hybrid RAG (pgvector + PyThaiNLP + pg_trgm RRF), 3-Stage $0 guardrails, Pydantic v2 ticket triage, and 25/25 Golden Eval benchmarks.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    url: "https://apec-ai-portfolio.vercel.app/demos/rag-copilot",
    siteName: "Apec Sinlapachai — AI & AI Automation Engineer",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RagCopilotLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
