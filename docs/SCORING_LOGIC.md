# LeadIQ AI — Seven-Factor Scoring Logic & Mathematical Model

---

## 1. Mathematical Formulation
The LeadIQ AI qualification engine computes a total score $S \in [0, 100]$ as the linear sum of seven bounded factor scores:

$$S = f_{\text{intent}} + f_{\text{budget}} + f_{\text{auth}} + f_{\text{timeline}} + f_{\text{size}} + f_{\text{industry}} + f_{\text{clarity}}$$

Each factor $f_i$ is clamped to its specified maximum $W_i$:

| Factor Name | Variable | Max Weight ($W_i$) | Range |
| :--- | :--- | :--- | :--- |
| **Buying Intent** | $f_{\text{intent}}$ | 25 | 0–25 |
| **Budget Availability** | $f_{\text{budget}}$ | 20 | 0–20 |
| **Decision Maker Authority** | $f_{\text{auth}}$ | 15 | 0–15 |
| **Timeline / Urgency** | $f_{\text{timeline}}$ | 15 | 0–15 |
| **Company Size** | $f_{\text{size}}$ | 10 | 0–10 |
| **Industry Fit** | $f_{\text{industry}}$ | 10 | 0–10 |
| **Requirement Clarity** | $f_{\text{clarity}}$ | 5 | 0–5 |
| **Total** | **$S$** | **100** | **0–100** |

---

## 2. Deterministic Tier Thresholds
Tier assignment is strictly mathematical and cannot be overridden by AI generation:
- **HOT:** $90 \le S \le 100$ (Immediate sales demo / executive outreach)
- **WARM:** $70 \le S \le 89$ (Send technical proposal / product walkthrough)
- **COLD:** $0 \le S \le 69$ (Nurture campaign / educational resources)

---

## 3. Fit Score & Intent Level Derivation
- **Fit Score:**
  - `Excellent`: $f_{\text{size}} + f_{\text{industry}} + f_{\text{auth}} \ge 24$
  - `Good`: $f_{\text{size}} + f_{\text{industry}} + f_{\text{auth}} \ge 17$
  - `Poor`: $< 17$
- **Intent Level:**
  - `High`: $f_{\text{intent}} \ge 20$
  - `Medium`: $f_{\text{intent}} \ge 12$
  - `Low`: $< 12$

---

## 4. Tie-Breaking Hierarchy
When two leads have identical total scores $S$, ordering is deterministically resolved by:
1. Higher Buying Intent score ($f_{\text{intent}}$)
2. Higher Budget Availability score ($f_{\text{budget}}$)
3. Input processing order (FIFO)
