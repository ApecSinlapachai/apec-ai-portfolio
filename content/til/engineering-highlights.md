---
title: "Engineering TIL Highlights (ai-automation-til)"
repoUrl: "https://github.com/ApecSinlapachai/ai-automation-til"
---

## Key Production Lessons from 28+ Engineering TIL Notes

### TIL #027 — Tiered Gemini Routing, Supabase Security Hardening & Live Eval
- Never mix mock/offline embeddings with live `gemini-embedding-001` vectors in PostgreSQL (`pgvector` vector-space mismatch). Always isolate CI mock runs from live production evaluation (`--mode live_gemini --no-ingest`).
- Gemini Structured Output rejects open `dict[str, str]` fields (`additionalProperties` error) — define explicit Pydantic v2 submodels for entity extraction.
- Free-tier public AI demos stay resilient 24/7 by routing fast paths to `gemini-3.5-flash-lite`, escalating complex queries to `gemini-3.8-flash`, and providing deterministic extractive fallbacks on `429`.

### TIL #028 — SQL-First LangGraph State Machines, PDPA Redaction & Same-Origin Proxies
- In enterprise AI agents, a SQL-first state machine backed by PostgreSQL 16 (`agent_runs`, `agent_state_transitions`, `FOR UPDATE` row locking, and `Idempotency-Key` unique constraints) beats opaque checkpointers for auditability and race-condition safety.
- Never let a Vercel demo call `*.onrender.com` cross-origin directly from the browser — Brave Shields, ad blockers, and corporate firewalls often block third-party API subdomains. Routing through Next.js `rewrites()` (`/api/proxy/*`) eliminates `100%` of cross-origin browser calls and CORS preflight issues.
- Designing `AUTH_MODE=token|demo_sandbox` from day one lets one backend codebase serve both authenticated enterprise deployments and no-login recruiter demos without leaking secrets to the browser.

### AI-Native 6-Layer SSOT Engineering Standard
- Keep `AGENTS.md` concise (`< 200` lines) as an entrypoint and pointer map rather than a monolithic spec dump.
- Let executable code, Zod/Pydantic schemas, linters, and automated tests act as the strongest truth layers, paired with `docs/SPEC.md`, immutable `docs/adr/` records, and `docs/PROGRESS.md` for seamless multi-session continuity.
