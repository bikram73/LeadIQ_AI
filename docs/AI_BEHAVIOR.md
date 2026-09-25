# LeadIQ AI — AI Behavior & Evidence Extraction Specification

---

## 1. Role Boundary & Evidence Grounding
The Gemini AI agent operates as an **Evidence Extractor & Qualitative Analyst**, not an uncontrolled autonomous scoring agent.

### Mandatory Rules:
1. **No Hallucinated Evidence:** The AI must NEVER invent budget amounts, company employee headcounts, decision-maker status, procurement timelines, or urgency unless explicitly present in the input.
2. **Conservative Defaults for Missing Data:** If any attribute is not stated, it must be marked as `"Not provided"` or `"Unknown"`.
3. **Deterministic Factor Summation:** The AI returns raw factor assessments and observations, while the application's scoring validator recalculates and clamps the exact linear sum.
4. **Structured JSON Output:** Responses follow strict schema specifications:
   - `lead_score`: integer (0–100)
   - `tier`: "Hot" | "Warm" | "Cold" | "Very Low"
   - `fit_score`: "Excellent" | "Good" | "Poor"
   - `intent`: "High" | "Medium" | "Low"
   - `summary`: concise 1-sentence qualification summary
   - `reasoning`: array of 3 evidence-backed bullet points
   - `next_action`: prescriptive sales action
   - `factor_breakdown`: 7-factor numeric breakdown object

---

## 2. Server-Side Guardrails
All API requests flow through `/api/analyze` and `/api/analyze-csv` on the Express backend, applying:
- Validation on payload structure
- Input sanitization against Prompt Injection & XSS
- Fallback deterministic evaluation when network or API quota limits occur
