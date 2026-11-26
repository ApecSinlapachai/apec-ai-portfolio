---
slug: "production-ai-agent-ops"
title: "Production AI Agent Ops"
shortTitle: "Project #2 · Stateful AI Agent"
tagline: "SQL-First LangGraph State Machine with Pre-LLM PDPA PII Redaction, FOR UPDATE HITL Approval Gates, Idempotency + Retry/DLQ, n8n Integration, and 62.78% LLM Cost Reduction."
summary:
  en: "Enterprise AI agents fail in production when they leak customer PII to external LLMs, trigger duplicate refunds on retried webhooks, or send simple tasks to expensive frontier models. This stateful agent masks sensitive data before LLM and database writes, pauses high-risk actions for locked human approval, and routes routine work to lightweight models. Across 24 TH/EN benchmark cases, it achieved a 0.00 PDPA leak rate (32/32 entities masked), 1.00 HITL enforcement, 62.78% LLM cost reduction, and 40/40 passing tests."
  th: "AI Agent ทั่วไปมักใช้งานจริงไม่ได้เพราะเสี่ยงทำข้อมูลส่วนบุคคล (PDPA) รั่วไหลไปยัง API ภายนอก สั่งคืนเงินซ้ำเมื่อ Webhook ส่งมาซ้ำ หรือส่งงานง่าย ๆ ไปยังโมเดลราคาแพง ระบบ Agent แบบควบคุมสถานะนี้จะปิดบังข้อมูล PII ก่อนส่งเข้าโมเดลและฐานข้อมูล หยุดรอการอนุมัติจากมนุษย์แบบล็อกแถวข้อมูลสำหรับคำสั่งเสี่ยงสูง และแยกงานง่ายไปใช้โมเดลต้นทุนต่ำ ผลทดสอบ 24 เคสไทย–อังกฤษทำอัตราข้อมูลรั่วไหล 0.00 (ปิดบังครบ 32/32 จุด), บังคับใช้ HITL 100%, ลดต้นทุน LLM ลง 62.78% และผ่านการทดสอบ pytest 40/40 เคส"
status: "live"
featured: true
order: 2
category: "Agentic AI & Reliability"
demoPath: "/demos/agent-ops"
repoUrl: "https://github.com/ApecSinlapachai/production-ai-agent-ops"
liveBackendUrl: "https://production-ai-agent-ops-api.onrender.com/docs"
stack:
  - "Python / FastAPI"
  - "LangGraph StateGraph"
  - "PostgreSQL 16 (FOR UPDATE)"
  - "PDPA PII Redaction"
  - "n8n JSON Workflows"
  - "Gemini 3.x Cost Routing"
metrics:
  - label: "LLM Cost Cut"
    value: "62.78% Saved"
  - label: "PDPA Leak Rate"
    value: "0.00 (32/32)"
  - label: "HITL Enforcement"
    value: "1.00 (100%)"
  - label: "Pytest Suite"
    value: "40 / 40 Passed"
starterPrompts:
  - "How does Production AI Agent Ops achieve 0.00 PDPA leak rate and 62.78% cost reduction?"
  - "Compare Project #1 (RAG Copilot) vs Project #2 (Agent Ops) architecture"
  - "How do HITL approvals, Idempotency-Key, and DLQ replay work in PostgreSQL 16?"
---

## Problem Solved

Naive AI agents fail in enterprise operations because they leak customer PII to external LLM APIs, execute duplicate refunds when webhooks fire twice, fail silently on transient downstream errors, and send every trivial classification task to expensive frontier models.

## Architecture & Engineering Decisions

### 1. SQL-First `LangGraph` Explicit State Machine
- Executes through deterministic states (`RECEIVED -> PII_REDACTED -> INTENT_ROUTED -> CONTEXT_FETCHED -> DRAFT_GENERATED -> AWAITING_APPROVAL / EXECUTING_ACTION -> COMPLETED / FAILED_RETRYING / DLQ`).
- Instead of an opaque checkpointer, every state transition is persisted 1:1 into PostgreSQL 16 (`agent_runs` and `agent_state_transitions`) with actor, model used, routing tier, token counts, cost (USD), and latency (ms).

### 2. Pre-LLM & Pre-DB PDPA PII Redaction (`0.00` Leak Rate)
- Intercepts incoming Thai, English, and Code-Mixed requests at the API boundary and masks Thai National IDs, Thai mobile numbers, emails, bank account numbers, and personal names before calling Gemini or writing to PostgreSQL.
- The database stores only `redacted_input` and `redaction_summary`, while the live UI shows a real-time PII Redaction Diff Viewer.

### 3. Human-in-the-Loop (HITL) Gate, Idempotency & DLQ Replay
- **HITL Approval Gate:** High-impact actions (refunds, credits, cancellations) or low-confidence drafts pause at `AWAITING_APPROVAL` with a structured `action_preview`. Human approval/rejection acquires a PostgreSQL `FOR UPDATE` row lock to prevent concurrent race conditions.
- **Idempotency-Key:** Enforced via PostgreSQL unique constraints (`INSERT ... ON CONFLICT (idempotency_key)`) + payload hash validation, returning `X-Idempotency-Replayed: true` on duplicate webhook deliveries.
- **Retry + Dead-Letter Queue (DLQ):** Transient execution errors retry with exponential backoff + jitter; exhausted jobs move to `dead_letter_jobs` and can be safely replayed under `FOR UPDATE` locking via `POST /api/v1/dlq/{job_id}/replay`.

### 4. Tiered Model Routing (`62.78%` Cost Reduction) & `n8n` Integration
- Low-complexity classification and drafting route to `gemini-3.5-flash-lite` (`FAST`), reserving `gemini-3.8-flash` (`COMPLEX`) for high-risk or multi-step reasoning, with `gemini-3.1-flash-lite` `429` fallback and deterministic offline fallback.
- Includes exportable `n8n/` workflow JSONs secured by `X-Webhook-Secret`, `AUTH_MODE=token|demo_sandbox`, and Same-Origin Next.js proxy routing (`/api/proxy/agent/*`) with 10x5s cold-start polling.

## Verified Benchmarks (`eval/run_benchmark.py`)

- **24 Synthetic TH/EN Operations Cases (`16 FAST` / `8 COMPLEX`, `32` PII entities):**
  - **PDPA PII Leak Rate:** `0.00` (`32/32` redacted pre-LLM & pre-DB).
  - **HITL Policy Enforcement:** `1.00` (`100%` high-impact actions gated).
  - **Intent & Routing Accuracy:** `100.00%`.
  - **LLM Cost Reduction:** **`62.78%`** (`$0.1211` tiered vs `$0.3254` always-frontier per 1,000 runs).
- **Automated Tests:** `40 / 40 pytest` passed (31 unit + 7 live PG16 integration + 2 eval gates) + green GitHub Actions CI (`backend-ci` + `frontend-ci`).
