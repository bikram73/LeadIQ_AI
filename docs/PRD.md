# LeadIQ AI — Product Requirements Document (PRD)
**Version:** 1.0  
**Status:** Validated & Production-Ready  
**AI Provider:** Google Gemini API  
**Architecture:** Zero-Database Client SPA with Server-Side AI Extraction & Local Storage Cache  

---

## 1. Executive Summary
LeadIQ AI is an enterprise-grade AI-powered lead qualification and scoring platform designed to ingest B2B prospect inquiries across multiple channels (Manual Entry, Inbound Email, CSV Batch Upload), extract evidence with Gemini AI, and calculate mathematically deterministic, 7-factor qualification scores (0–100) and actionable next steps.

---

## 2. Core Functional Requirements
1. **Initial Zero-State & Client Persistence:**
   - The qualification queue starts initially at 0 leads.
   - All newly analyzed leads (Manual, Email, CSV) are dynamically ranked and persisted securely in the user's browser `localStorage` (`leadiq_ai_leads_store_v1`).
   - Supports 1-click Clear Session (Reset to 0) and 1-click Load Benchmark Demo Dataset.
2. **Manual Lead Qualification Form:** Real-time form with client-side field validation (Full Name, Company, Requirement details, Work email check).
3. **Inbound Raw Email Analyzer:** Intelligent extraction pipeline parsing prospect emails into structured qualification entities.
4. **CSV Batch Import & Processor:** Validates required headers (`Requirement`, `Name`, `Company`), handles empty rows and duplicates, and evaluates hundreds of records concurrently.
5. **Seven-Factor Deterministic Scoring Engine:** Strict 100-point mathematical distribution:
   - Buying Intent: 25 pts
   - Budget Availability: 20 pts
   - Decision Maker Authority: 15 pts
   - Timeline / Urgency: 15 pts
   - Company Size: 10 pts
   - Industry Fit: 10 pts
   - Requirement Clarity: 5 pts
6. **Deterministic Tier Classification:**
   - **Hot:** 90–100
   - **Warm:** 70–89
   - **Cold:** 0–69
7. **Ranked Dashboard & Analytics:** Dynamic sorting, multi-criteria filtering (All, Hot, Warm, Cold), real-time KPI metrics, and detailed lead factor inspect drawer.
8. **Export & Sharing Suite:** Client-side CSV export, formatted JSON dump, and Print/PDF document generation with 100% data fidelity.

---

## 3. Architecture & Security
- **No Remote Database Dependency:** Session state stored locally in browser storage.
- **No Auth Friction:** Zero authentication requirement.
- **Deterministic AI Validation:** AI outputs evidence and qualitative observations; application code calculates and clamps final scores.
- **Security Defenses:** Built-in detection for instruction override, roleplay hijack, system prompt extraction, and HTML/XSS injection.
