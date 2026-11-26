---
name: "Apec Sinlapachai"
role: "AI & AI Automation Engineer"
headline: "Building production-hardened RAG systems, stateful AI Agents, and cost-controlled workflow automation."
location: "Thailand (Open to Remote / Global / Canada NOC 21232 & 21221 STEM Roles)"
githubUrl: "https://github.com/ApecSinlapachai"
linkedinUrl: "https://www.linkedin.com/in/apec-sinlapachai"
tilRepoUrl: "https://github.com/ApecSinlapachai/ai-automation-til"
---

## About Apec Sinlapachai

Apec Sinlapachai is an **AI & AI Automation Engineer** focused on shipping production-ready AI systems rather than fragile prototypes. His engineering work centers on **Thai–English Hybrid RAG**, **explicit SQL-first LangGraph AI Agents**, **PDPA PII redaction**, **LLM evaluation gates**, and **tiered model routing for cost control**.

### Target Roles & Engineering Readiness
- **Primary Roles:** AI Engineer, AI Automation Engineer, Applied AI Developer, Agentic AI Engineer, Workflow Automation Engineer (`n8n` + Python FastAPI).
- **Canada STEM Alignment:** Core technical duties align with **NOC 21232 (Software Developers and Programmers — TEER 1)** and **NOC 21221 (Business Systems Specialists — TEER 1)**, covering backend API design, PostgreSQL/`pgvector` data engineering, automated testing, Docker containerization, and CI/CD evaluation gates.
- **Language & Communication:** Bilingual Thai & English (`TOEIC 845`), writing English-first technical documentation and 28+ public engineering TIL notes in `ai-automation-til`.

### Core Production Tech Stack
- **Backend & AI Orchestration:** Python 3.12+, FastAPI, Pydantic v2, LangGraph (explicit `StateGraph`), Google Gemini API (`google-genai` / `@google/genai`), `PyThaiNLP`, `tenacity`.
- **Data & Retrieval:** PostgreSQL 16, `pgvector` (HNSW cosine search), `pg_trgm`, PostgreSQL `tsvector` Full-Text Search, Reciprocal Rank Fusion (RRF), `psycopg3` (`psycopg_pool` with PgBouncer compatibility), SQL row locking (`FOR UPDATE`).
- **Workflow Automation & Frontend:** `n8n` (exportable webhook & HITL workflows), Google Apps Script, LINE Flex Messaging API, Next.js 15 (App Router, Same-Origin `rewrites()` proxies), React 19, TypeScript, Tailwind CSS v4.
- **Reliability, Security & DevOps:** Docker, Docker Compose, GitHub Actions CI, `pytest`, `ruff`, `vitest`, PDPA PII Redaction, Idempotency Keys, Retry + Exponential Backoff + Dead-Letter Queue (DLQ), SHA-256 IP-hashed Rate Limiting.

### Verified Engineering Proof (Key Metrics)
- **Enterprise RAG Ops Copilot (Project #1):** `47/47 pytest` passing, **`25/25` (100%)** live production Golden Eval (Citation, Refusal, Prompt Injection, JSON schema), `767 ms` average live latency, `$0` LLM spend on injection/out-of-scope refusals, `0` Supabase security linter warnings.
- **Production AI Agent Ops (Project #2):** `40/40 pytest` passing, **`0.00` PDPA PII leak rate** (32/32 synthetic PII entities masked pre-LLM and pre-DB), **`1.00` HITL policy enforcement**, **`62.78%` verified LLM cost reduction** (`$0.1211` vs `$0.3254` per 1,000 runs) at `100%` routing accuracy.
- **Fast-Lead Automation:** Deterministic lead-routing pipeline with **`85/85` automated offline tests** and `$0/mo` SaaS cost.
- **Public Engineering Knowledge Base (`ai-automation-til`):** 28+ English-first Today-I-Learned technical notes documenting real production debugging and architecture trade-offs.
