---
slug: "fast-lead-automation"
title: "Fast-Lead Automation"
shortTitle: "Deterministic Automation"
tagline: "Knowing when NOT to use AI: deterministic lead-routing pipeline with Google Apps Script, n8n v2.0, LINE Flex Messaging, LockService concurrency control, and 85/85 automated offline tests."
summary:
  en: "Built for Thai sales teams and growing businesses that lose warm prospects when incoming web form leads sit unread in spreadsheets for hours. Adding generative AI to straightforward lead routing introduces unnecessary delay, unpredictable output, and ongoing API fees. This rule-based pipeline validates, deduplicates, and pushes instant mobile alerts to sales reps with zero monthly software cost—showing when deterministic engineering outperforms AI."
  th: "ออกแบบมาเพื่อช่วยทีมขายและธุรกิจไทยที่มักเสียโอกาสปิดการขายเมื่อข้อมูลลูกค้าใหม่จากหน้าเว็บค้างอยู่ในสเปรดชีตนานหลายชั่วโมง การนำ AI มาใช้กับงานส่งต่อรายชื่อที่ตรงไปตรงมาอาจเพิ่มความล่าช้า โอกาสผิดพลาด และค่าใช้จ่ายรายเดือนโดยไม่จำเป็น ระบบแบบกำหนดกฎเกณฑ์ตายตัวนี้จึงช่วยตรวจสอบข้อมูล กรองรายการซ้ำ และแจ้งเตือนทีมขายทางมือถือทันทีโดยไม่มีค่าซอฟต์แวร์รายเดือน สะท้อนการเลือกใช้เครื่องมือให้เหมาะกับปัญหาจริง"
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
    labelTh: "ชุดทดสอบอัตโนมัติ"
    value: "85 / 85 Passed"
    valueTh: "ผ่าน 85 / 85 เคส"
  - label: "SaaS Run Cost"
    labelTh: "ค่าบริการระบบรายเดือน"
    value: "$0 / month"
    valueTh: "$0 / เดือน"
  - label: "Architecture"
    labelTh: "สถาปัตยกรรมหลัก"
    value: "Zero-LLM Core"
    valueTh: "กฎเกณฑ์ล้วน ไม่พึ่ง LLM"
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
