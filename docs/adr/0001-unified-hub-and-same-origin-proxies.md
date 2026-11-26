# ADR-0001: Unified Next.js Portfolio Hub with Same-Origin Proxies to Independent Backend Repos

- **Status:** Accepted
- **Date:** 2026-11-26
- **Deciders:** Apec Sinlapachai

---

## 1. Context
We have two production-hardened AI systems (`enterprise-rag-ops-copilot` and `production-ai-agent-ops`) deployed on Render Free + Supabase Free + Vercel Hobby. Recruiters benefit from exploring everything under one cohesive URL, while technical leads still expect clean, independent GitHub repositories with isolated `pytest` suites, Dockerfiles, and CI pipelines.

## 2. Decision
> We will create a dedicated **Unified Next.js 15 Portfolio Hub** (`apec-ai-portfolio`) that natively hosts both interactive demo UIs (`/demos/rag-copilot` and `/demos/agent-ops`) and proxies API calls via Next.js `rewrites()` (`/api/proxy/rag/*` and `/api/proxy/agent/*`) to the existing standalone Render backends, keeping the two backend GitHub repos completely independent.

## 3. Alternatives Considered
| Option | Pros | Cons | Why Rejected / Chosen |
| :--- | :--- | :--- | :--- |
| **Unified Next.js Hub + Same-Origin Proxies (Chosen)** | Single URL for recruiters, cohesive Dark/Light theme, zero CORS/AdBlock issues, backend repos stay clean | Demo frontend code is maintained in portfolio hub | Best balance of recruiter UX and repo hygiene |
| **Iframe Embedding** | Faster initial build | Theme mismatch, double scrollbars, poor mobile UX | Rejected for recruiter polish |
| **Full Monorepo Merge** | Single repo | Breaks pinned flagship repos, risks Render Free RAM limits | Rejected to preserve standalone repo quality |

## 4. Consequences
- **Positive:** Recruiters experience one seamless product; `0` direct browser requests to `*.onrender.com`.
- **Negative / Trade-offs:** Major UI changes in standalone demos need syncing if standalone Vercel frontends remain active.
- **Reversibility:** High — proxy targets are pure environment variables (`RAG_API_PROXY_TARGET`, `AGENT_API_PROXY_TARGET`).
