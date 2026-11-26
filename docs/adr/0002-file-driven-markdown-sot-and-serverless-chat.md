# ADR-0002: File-Driven Markdown SOT and Zero-Cold-Start Vercel Serverless Chat API

- **Status:** Accepted
- **Date:** 2026-11-26
- **Deciders:** Apec Sinlapachai

---

## 1. Context
The portfolio requires an AI Copilot (`/chat`) that answers questions about Project #1, Project #2, Apec's engineering background, and any future projects added later, within a `$0/mo` budget and instant first-token responsiveness for recruiters.

## 2. Decision
> We will use a **File-Driven Markdown Single Source of Truth** (`content/profile.md`, `content/projects/*.md`, `content/til/*.md`) validated by Zod and served by a **Vercel Serverless API (`/api/chat`)** with lexical/token hybrid scoring, 3-stage `$0` guardrails, and `@google/genai` tiered Gemini 3.x routing + deterministic fallback.

## 3. Alternatives Considered
| Option | Pros | Cons | Why Rejected / Chosen |
| :--- | :--- | :--- | :--- |
| **File-Driven Markdown SOT + Vercel Serverless (Chosen)** | Zero cold-start (`< 2s`), `$0/mo`, adding 1 `.md` file updates both UI and Chatbot automatically | Lexical+token retrieval instead of vector DB (more than sufficient for `< 50` curated docs) | Optimal UX, zero ops overhead, true SSOT |
| **Reuse Project #1 Render `pgvector` Backend** | Dogfoods existing RAG stack | 30–50s Render Free cold-start on first recruiter chat; couples portfolio to Project #1 schema | Rejected due to cold-start UX penalty |
| **Vercel Serverless + Direct Supabase `pgvector`** | Zero cold-start + vector search | Requires separate embedding ingestion pipeline on every content update | Over-engineered for `< 50` portfolio docs |

## 4. Consequences
- **Positive:** Instant recruiter chat response; adding Project #3 requires dropping a single `.md` file into `content/projects/`.
- **Negative / Trade-offs:** If the knowledge base grows past hundreds of long documents, we may add pre-computed embeddings.
- **Reversibility:** High — retrieval is isolated behind `src/lib/chat/guardrails.ts`.
