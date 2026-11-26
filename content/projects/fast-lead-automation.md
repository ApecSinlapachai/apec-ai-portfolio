---
slug: "fast-lead-automation"
title: "Fast-Lead Automation"
shortTitle: "Deterministic Automation"
tagline: "Knowing when NOT to use AI: deterministic lead-routing pipeline with Google Apps Script, n8n v2.0, LINE Flex Messaging, LockService concurrency control, and 85/85 automated offline tests."
summary:
  en: "Growing Thai businesses lose warm sales leads when incoming web form submissions sit unread in spreadsheets for hours, while injecting an LLM into simple routing adds latency, failure risk, and monthly fees. This zero-LLM pipeline validates, deduplicates, and locks concurrent submissions to push instant mobile sales alerts with predictable sub-second execution. It runs at $0/month in SaaS costs and is verified by 85/85 automated offline tests."
  th: "ธุรกิจไทยสูญเสียโอกาสปิดการขายเมื่อข้อมูลลูกค้าใหม่จากฟอร์มค้างอยู่ในสเปรดชีตนานหลายชั่วโมง ขณะที่การนำ LLM มาใช้กับงานส่งต่อข้อมูลพื้นฐานกลับเพิ่มความหน่วง ความเสี่ยงตอบพลาด และค่าใช้จ่ายรายเดือนโดยไม่จำเป็น ระบบอัตโนมัติแบบ Zero-LLM นี้จึงตรวจสอบ คัดกรองข้อมูลซ้ำ และล็อกการทำงานพร้อมกันเพื่อส่งการ์ดแจ้งเตือนทีมขายทันทีภายในเสี้ยววินาที โดยมีค่าบริการ SaaS $0 ต่อเดือน และผ่านชุดทดสอบอัตโนมัติแบบออฟไลน์ 85/85 เคส"
status: "live"
featured: false
order: 3
category: "Deterministic Automation"
repoUrl: "https://github.com/ApecSinlapachai/fast-lead-automation"
stack:
  - "Google Apps Script"
  - "n8n v2.0"
  - "LINE Flex Messaging API"
  - "LockService Concurrency"
  - "85 Offline Automated Tests"
metrics:
  - label: "Automated Tests"
    value: "85 / 85 Passed"
  - label: "SaaS Run Cost"
    value: "$0 / month"
  - label: "Architecture"
    value: "Zero-LLM Core"
starterPrompts:
  - "Why did Apec choose deterministic automation instead of an LLM in Fast-Lead Automation?"
  - "What engineering guardrails are built into Fast-Lead Automation?"
---

## Problem Solved

Small and mid-sized Thai businesses lose leads when form submissions sit in spreadsheets for hours. Adding an LLM to simple lead-capture routing introduces unnecessary latency, hallucination risk, and recurring API costs.

## Architecture & Engineering Decisions

- **Deterministic-First Engineering:** Uses rule-based payload validation, deduplication, and `LockService` concurrency guards to guarantee zero duplicate notifications and predictable sub-second routing.
- **Zero-Cost Stack (`$0/mo`):** Combines Google Apps Script webhooks, `n8n v2.0` workflow templates, and LINE Flex Messaging cards for instant mobile sales alerts.
- **Offline Test Harness (`85 / 85` Passed):** Separates pure routing/formatting logic from Google/LINE runtime APIs so 85 automated unit and edge-case tests run locally without live credentials.
