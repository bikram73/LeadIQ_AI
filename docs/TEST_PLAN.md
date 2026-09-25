# LeadIQ AI — Master Quality Assurance & Test Plan
**Application Version:** 1.0.0  
**Testing Framework:** Vitest v5.0.1 / TypeScript 5.6  
**Total Automated Tests:** 108  

---

## 1. Scope of Testing & Subsystems Covered
1. **Deterministic 7-Factor Scoring Engine:**
   - Strict factor weights ($25+20+15+15+10+10+5 = 100$).
   - Sum integrity ($\text{Final Score} \equiv \sum \text{Factors}$).
   - Strict tier classification: Hot ($90–100$), Warm ($70–89$), Cold ($0–69$).
   - Boundary checks ($89 \to \text{Warm}, 90 \to \text{Hot}; 69 \to \text{Cold}, 70 \to \text{Warm}$).
2. **Authority & Evidence Integrity Rules:**
   - Decision-maker role hierarchy.
   - Non-fabrication tests: Missing budget, unestablished role, missing company size, and unspecified timeline are evaluated conservatively.
3. **Form & Data Validation:**
   - Field validations, work email format, empty submission handling.
4. **RFC-4180 CSV Standard Compliance & Security:**
   - Quoted fields with internal commas (e.g. `"BuildPro, Inc."`).
   - Quoted fields with escaped quotes (`""`).
   - CSV Formula Injection defense (CWE-1236 sanitization for `=, +, -, @, \t, \r`).
5. **Netlify Deployment & Backend Parity:**
   - Netlify functions (`analyze`, `analyze-csv`, `validate`, `health`) match Express `server.ts` deterministic scoring.
6. **Benchmark 40-Lead Reference Dataset:**
   - 20 Valid B2B Leads.
   - 5 Incomplete Leads.
   - 5 Malformed Leads.
   - 5 Edge-Case / Boundary Leads.
   - 5 Adversarial / Injection Leads.
7. **End-to-End Critical User Journeys:**
   - Manual Lead Qualification (David Brown).
   - Inbound Email Analysis (John Carter).
   - Batch CSV Import & Qualification.
   - Export Fidelity (CSV, JSON, PDF).
   - LocalStorage Session Lifecycle & Zero Database Architecture.

---

## 2. Test Execution Matrix
| Test Suite File | Test Count | Focus Area |
| :--- | :--- | :--- |
| `tests/benchmark/benchmark.test.ts` | 40 | 40 PRD reference benchmark leads |
| `tests/scoring/factors.test.ts` | 20 | Factor ranges, thresholds, and permutations |
| `tests/scoring/scoring.test.ts` | 16 | Sum integrity, boundary transitions, role hierarchy |
| `tests/api/api.test.ts` | 13 | AI response validation, prompt injection, XSS, evidence integrity, CSV RFC & injection, bulk validation |
| `tests/validation/validation.test.ts` | 7 | Form validation, missing fields, error reporting |
| `tests/ranking/ranking.test.ts` | 5 | Descending sort, tie-breaking (Intent $\to$ Budget $\to$ FIFO), tier filters, isolation |
| `tests/e2e/e2e.test.ts` | 7 | Critical user journeys, exports, localStorage persistence, 100+ lead scaling |
| **Total** | **108** | **100% Passed (108/108)** |
