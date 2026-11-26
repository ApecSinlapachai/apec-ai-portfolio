---
slug: "production-ai-agent-ops"
title: "Production AI Agent Ops"
shortTitle: "Project #2 · Stateful AI Agent"
tagline: "SQL-First LangGraph State Machine with Pre-LLM PDPA PII Redaction, FOR UPDATE HITL Approval Gates, Idempotency + Retry/DLQ, n8n Integration, and 62.78% LLM Cost Reduction."
summary:
  en: "Built for operations and customer service teams automating sensitive workflows such as refunds, escalations, and account requests. Typical AI agents are risky in production because they can expose customer personal data to external AI APIs, trigger duplicate actions, or overuse expensive models on simple tasks. This system masks sensitive data before any AI call, pauses high-risk actions for human sign-off, and routes routine work to lightweight models so teams stay compliant and cost-efficient."
  th: "สร้างขึ้นเพื่อช่วยทีมปฏิบัติการและทีมบริการลูกค้าในการทำระบบอัตโนมัติสำหรับงานละเอียดอ่อน เช่น การคืนเงิน การส่งต่อเคส และคำขอจัดการบัญชี AI Agent ทั่วไปมักนำไปใช้จริงไม่ได้เพราะเสี่ยงส่งข้อมูลส่วนบุคคล (PDPA) ออกไปยังภายนอก ทำงานซ้ำเมื่อได้รับคำสั่งซ้ำ หรือใช้โมเดลราคาแพงกับงานพื้นฐาน ระบบนี้จึงปิดบังข้อมูลส่วนบุคคลก่อนส่งเข้า AI หยุดรอคนอนุมัติในคำสั่งเสี่ยงสูง และเลือกใช้โมเดลขนาดเล็กกับงานทั่วไปเพื่อให้ปลอดภัยและประหยัดต้นทุน"
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
    labelTh: "ลดต้นทุนค่า AI"
    value: "62.78% Saved"
    valueTh: "ประหยัดลง 62.78%"
  - label: "PDPA Leak Rate"
    labelTh: "อัตราข้อมูลส่วนบุคคลรั่วไหล"
    value: "0.00 (32/32)"
    valueTh: "0.00 (ปิดบังครบ 32/32)"
  - label: "HITL Enforcement"
    labelTh: "การบังคับรอคนอนุมัติ"
    value: "1.00 (100%)"
    valueTh: "1.00 (ครบ 100%)"
  - label: "Pytest Suite"
    labelTh: "ชุดทดสอบอัตโนมัติ"
    value: "40 / 40 Passed"
    valueTh: "ผ่าน 40 / 40 เคส"
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
