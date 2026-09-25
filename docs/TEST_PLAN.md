# LeadIQ AI — Master Quality Assurance & Test Plan
**Application Version:** 1.0.0  
**Testing Framework:** Vitest v5.0.1 / TypeScript 5.6  
**Test Suite Target:** 100+ Automated Unit, Integration, Edge-Case, and End-to-End Tests  

---

## 1. Scope of Testing
This test plan covers the complete QA matrix specified in the LeadIQ AI End-to-End Testing PRD:
1. **Scoring Engine Verification:** Factor weights, range clamping, sum integrity ($Sum = Final$), boundary transitions ($89 \to 90$, $69 \to 70$).
2. **Authority & Evidence Rules:** Role hierarchy validation, conservative evaluation for unestablished decision-maker authority.
3. **Form & Data Validation:** Field requirement assertions, email formatting checks, CSV header validation.
4. **Benchmark 40-Lead Test Suite:**
   - 20 Valid B2B Leads across various industries
   - 5 Incomplete Leads
   - 5 Malformed Leads
   - 5 Edge-Case & Boundary Leads
   - 5 Adversarial & Prompt Injection Leads
5. **AI Extraction & Response Sanitization:** Protection against schema drift, negative values, and prompt manipulation.
6. **Dashboard Filtering, Sorting & Ranking:** Tie-breaking algorithm, tier filters, search matching.
7. **Export Fidelity:** CSV, JSON, PDF data integrity.

---

## 2. Test Execution Matrix
| Test Suite | File Path | Total Tests | Focus Area |
| :--- | :--- | :--- | :--- |
| **Benchmark Dataset** | `/tests/benchmark/benchmark.test.ts` | 40 | 40 PRD reference leads (Valid, Incomplete, Malformed, Edge, Adversarial) |
| **Seven Factor Weights** | `/tests/scoring/factors.test.ts` | 20 | Permutations for Budget, Timeline, Company Size, Industry, Clarity |
| **Scoring Core & Bounds**| `/tests/scoring/scoring.test.ts` | 16 | Mathematical sum integrity, tier boundaries, role authority |
| **API & Security** | `/tests/api/api.test.ts` | 7 | AI output validation, Prompt Injection, XSS, Evidence integrity |
| **Validation Rules** | `/tests/validation/validation.test.ts` | 7 | Form field rules, empty inputs, error messaging |
| **Ranking & Dashboard** | `/tests/ranking/ranking.test.ts` | 5 | Descending sort, tie-breakers, tier filters, data isolation |
| **End-to-End Journeys** | `/tests/e2e/e2e.test.ts` | 7 | Full user journeys (Manual, Email, CSV, Export, Session state) |
| **Total** | **All 7 Test Suites** | **102** | **100% Passed** |
