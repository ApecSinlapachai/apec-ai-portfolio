---
slug: "enterprise-rag-ops-copilot"
title: "Enterprise RAG Ops Copilot"
shortTitle: "Project #1 · Hybrid RAG Copilot"
tagline: "Thai–English Hybrid RAG (pgvector + PyThaiNLP + pg_trgm RRF), 3-Stage $0 Guardrails, Pydantic v2 Ticket Triage, and 25-Case Golden Eval Gate."
status: "live"
featured: true
order: 1
category: "Hybrid RAG & Evaluation"
demoPath: "/demos/rag-copilot"
repoUrl: "https://github.com/ApecSinlapachai/enterprise-rag-ops-copilot"
liveBackendUrl: "https://enterprise-rag-ops-copilot-api.onrender.com/health"
stack:
  - "Python / FastAPI"
  - "PostgreSQL 16 + pgvector"
  - "PyThaiNLP + pg_trgm RRF"
  - "Pydantic v2"
  - "Gemini 3.x Tiered Routing"
  - "Next.js 15 + Docker + CI"
metrics:
  - label: "Live Prod Eval"
    value: "25 / 25 (100%)"
  - label: "Pytest Suite"
    value: "47 / 47 Passed"
  - label: "Avg Live Latency"
    value: "767 ms"
  - label: "Refusal Spend"
    value: "$0 LLM Cost"
starterPrompts:
  - "How does Enterprise RAG Ops Copilot prevent hallucinations at $0 guardrail cost?"
  - "Explain the Thai-English Hybrid RRF retrieval pipeline in Project #1"
  - "What were the live 25-case evaluation results and latency benchmarks?"
---

## Problem Solved

Enterprise operations and customer support teams in Thailand deal with bilingual SOPs, SLAs, error codes (`ERR-503`, `INV-2026-0091`), and unspaced Thai text. Standard vector-only RAG wrappers miss exact error codes, hallucinate answers when documents are missing, and burn API budget on out-of-scope or prompt-injection queries.

## Architecture & Engineering Decisions

### 1. Thai–English Hybrid RRF Retrieval (`pgvector` + `PyThaiNLP` + `pg_trgm`)
- Uses `gemini-embedding-001` (`1536` dimensions, L2-normalized in Python with zero-norm protection) stored in PostgreSQL 16 `pgvector`.
- Tokenizes Thai text using pre-warmed `PyThaiNLP` (`newmm`) into PostgreSQL `tsvector` Full-Text Search with B2B SaaS domain stopword filtering.
- Combines vector similarity and FTS/trigram exact-code boosting using **Reciprocal Rank Fusion (`0.6 / (60 + vec_rank) + 0.4 / (60 + fts_rank)`)** and recalculates exact cosine similarity on top candidates.

### 2. 3-Stage Anti-Hallucination & Security Guardrails
- **Stage 0 — Prompt Injection Gate (`$0` LLM spend):** Deterministic bilingual regex screen blocks English and Thai prompt-injection attacks (`BLOCKED_INJECTION`) before touching the LLM.
- **Stage 1 — Pre-LLM Retrieval Gate (`$0` LLM spend):** Refuses low-evidence queries (`max_vec_similarity < 0.58` and `max_fts_rank < 0.08`) immediately (`REFUSED_LOW_EVIDENCE`) with zero token spend.
- **Stage 2 — Post-LLM Groundedness Gate:** Verifies every cited chunk UUID against retrieved PostgreSQL rows and enforces `confidence_score >= 0.55` to guarantee zero fabricated citations.

### 3. Tiered Gemini 3.x Model Routing & Resilience
- Default queries route to the fast path (`gemini-3.5-flash-lite` -> `gemini-3.1-flash-lite`).
- Multi-document comparisons, gray-zone retrieval, and PDPA/multi-entity ticket triage escalate to `gemini-3.8-flash`.
- If free-tier quota hits `429 RESOURCE_EXHAUSTED`, the service falls back to a deterministic grounded extractive/rule fallback so the live demo stays online 24/7.

### 4. Pydantic v2 Structured Ticket Triage & Production Hardening
- Extracts Thai, English, and Code-Mixed customer messages into strict `Pydantic v2` JSON (`category`, `priority P0-P3`, `urgency 1-5`, `suggested_team`, `suggested_action`, and Gemini-compatible entity submodel without `additionalProperties`).
- Synchronous FastAPI threadpool handlers prevent `psycopg_pool` from blocking the event loop.
- Supabase PostgreSQL trigger functions enforce `SET search_path = ''`, yielding **`0` Supabase security linter warnings**.
- Protected by a SHA-256 IP-hashed sliding-window rate limiter (`15 req/min`, `60 req/day`) with `Retry-After` headers and Same-Origin Next.js proxy routing (`/api/proxy/rag/*`).

## Verified Benchmarks

- **Automated Tests:** `47 / 47 pytest` passed (42 unit + 3 live PostgreSQL 16 integration + 2 Golden Eval CI gates).
- **25-Case Golden Eval (Live Production):** `25 / 25` (`1.0000` Citation Hit Rate, `1.0000` Refusal Precision, `1.0000` Injection Block Rate, `1.0000` JSON Schema Pass Rate), Avg latency `767 ms`, P95 `1516 ms`.
- **Corpus:** 12 synthetic PDPA-safe enterprise SOP/SLA/Runbook documents (`52` chunks).
