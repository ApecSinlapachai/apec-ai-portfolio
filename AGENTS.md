# AGENTS.md — apec-ai-portfolio

> **Role:** Entrypoint & working rules for AI coding agents in this repository.
> **Rule:** Keep this file short (< 160 lines). Do NOT duplicate schemas, specs, or linter rules here — point to their SSOT instead.

## 1. Project Snapshot
- **Purpose:** Unified AI & AI Automation Engineer Portfolio Hub combining live interactive demos for Project #1 (`enterprise-rag-ops-copilot`), Project #2 (`production-ai-agent-ops`), extensible project case studies, and a Zero-Cold-Start AI Portfolio Copilot (`/chat`).
- **Tech Stack:** Next.js 15 (App Router), React 19, TypeScript 5.8, Tailwind CSS v4, `@google/genai`, `gray-matter`, `zod`, `vitest`, Vercel Hobby (`$0/mo`).
- **Primary Language:** English UI & Code; AI Copilot natively supports Thai, English, and Code-Mixed queries.

## 2. Single Sources of Truth (SSOT Map)
Read these on-demand before making architectural or scope changes:
- **Live Task State & Handoff:** `docs/PROGRESS.md` *(Read at start of every session)*
- **Feature Scope & Requirements:** `docs/SPEC.md`
- **Architecture Decisions (Why):** `docs/adr/`
- **Environment Variables:** `.env.example`
- **Content & Knowledge Base:** `content/` *(Single Markdown SOT powering both UI and `/api/chat`)*
- **Data Schemas:** `src/lib/content/schema.ts` & `src/app/api/chat/route.ts` *(Executable Zod SSOT)*
- **Proxy Routing:** `next.config.ts` *(Executable SSOT for `/api/proxy/rag/*` and `/api/proxy/agent/*`)*

## 3. Standard Commands
Always run verification commands before reporting a task as done:
```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Lint, Type-check, Test, and Production Build
npm run lint
npm run typecheck
npm test
npm run build
```

## 4. Repository Map
```text
content/              # File-driven Markdown SOT (profile, projects, TIL highlights)
docs/                 # SPEC.md, PROGRESS.md, and ADRs (0001..NNNN)
public/llms.txt       # Machine-readable index for external AI agents
src/
├── app/              # App Router pages (/, /chat, /projects/[slug], /demos/*) & /api/chat
├── components/       # layout/, chat/, portfolio/, demos/rag-copilot/, demos/agent-ops/
└── lib/              # content/ (loader+Zod), chat/ (guardrails+Gemini), demos/ (API clients)
tests/                # Vitest unit, schema, retrieval, and guardrail tests
```

## 5. Hard Guardrails (Non-Negotiable)
- **Secrets & PDPA:** Never hardcode API keys, tokens, or real personal/client PII (no home address, phone number, bank details, or unanonymized client data). `GEMINI_API_KEY` is server-side only.
- **Zero Cross-Origin Demo Calls:** Browser code in `/demos/*` MUST call `/api/proxy/rag/*` or `/api/proxy/agent/*` — never `*.onrender.com` directly.
- **No Unapproved Stack Changes:** Check `docs/adr/` before replacing core libraries, proxy strategy, or LLM SDK (`@google/genai`).
- **1-File Extensibility:** Adding a future project must only require adding `content/projects/<slug>.md` conforming to `ProjectFrontmatterSchema`.
- **Verify Before Finishing:** Run `npm run verify` (`lint`, `typecheck`, `test`, `build`) after code changes.

## 6. Session Continuity & Git Conventions
- **Start of every session:** Read `docs/PROGRESS.md` and run `git status && git log -n 5 --oneline` before editing code.
- **After completing each task:** Run verification -> `git commit` -> update `docs/PROGRESS.md`.
- **Commits:** Use Conventional Commits (`feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`).
- **New Decisions:** Record architectural trade-offs in `docs/adr/NNNN-short-title.md`.
