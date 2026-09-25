import { describe, it, expect } from 'vitest';
import { BENCHMARK_DATASET } from '../../src/data/benchmarkDataset';
import { scoreLead, validateLeadInput, detectPromptInjection } from '../../src/services/scoringEngine';
import { LeadInput } from '../../src/types';

describe('40-Lead Benchmark Dataset Automated Validation (Section 9)', () => {
  // 1-20: 20 Valid Leads
  describe('20 Valid Leads Execution (TC-DS-001 to TC-DS-020)', () => {
    const validLeads = BENCHMARK_DATASET.filter((tc) => tc.category === 'valid');

    validLeads.forEach((tc) => {
      it(`${tc.id}: ${tc.description}`, () => {
        const input = tc.input as LeadInput;
        // Validation check
        const validation = validateLeadInput(input);
        expect(validation.isValid).toBe(true);

        // Scoring execution
        const scored = scoreLead(input);

        // Score must be in 0-100
        expect(scored.score).toBeGreaterThanOrEqual(0);
        expect(scored.score).toBeLessThanOrEqual(100);

        // Factor sum equality
        const factorSum =
          scored.factorBreakdown.buyingIntent +
          scored.factorBreakdown.budgetAvailability +
          scored.factorBreakdown.decisionMaker +
          scored.factorBreakdown.timelineUrgency +
          scored.factorBreakdown.companySize +
          scored.factorBreakdown.industryFit +
          scored.factorBreakdown.requirementClarity;
        expect(scored.score).toBe(factorSum);

        // Expected Tier
        if (tc.expectedTier) {
          expect(scored.tier).toBe(tc.expectedTier);
        }

        // Expected Range
        if (tc.expectedScoreRange) {
          expect(scored.score).toBeGreaterThanOrEqual(tc.expectedScoreRange[0]);
          expect(scored.score).toBeLessThanOrEqual(tc.expectedScoreRange[1]);
        }
      });
    });
  });

  // 21-25: 5 Incomplete Leads
  describe('5 Incomplete Leads Validation (TC-DS-021 to TC-DS-025)', () => {
    const incompleteLeads = BENCHMARK_DATASET.filter((tc) => tc.category === 'incomplete');

    incompleteLeads.forEach((tc) => {
      it(`${tc.id}: ${tc.description}`, () => {
        const validation = validateLeadInput(tc.input);
        expect(validation.isValid).toBe(false);
        expect(validation.errors.length).toBeGreaterThan(0);
      });
    });
  });

  // 26-30: 5 Malformed Leads
  describe('5 Malformed Leads Robustness (TC-DS-026 to TC-DS-030)', () => {
    const malformedLeads = BENCHMARK_DATASET.filter((tc) => tc.category === 'malformed');

    malformedLeads.forEach((tc) => {
      it(`${tc.id}: ${tc.description}`, () => {
        const input = tc.input as LeadInput;
        const scored = scoreLead(input);

        // Must not crash or produce NaN
        expect(isNaN(scored.score)).toBe(false);
        expect(scored.score).toBeGreaterThanOrEqual(0);
        expect(scored.score).toBeLessThanOrEqual(100);

        if (tc.expectedTier) {
          expect(scored.tier).toBe(tc.expectedTier);
        }
      });
    });
  });

  // 31-35: 5 Edge-Case / Boundary Leads
  describe('5 Edge-Case / Boundary Leads (TC-DS-031 to TC-DS-035)', () => {
    const edgeLeads = BENCHMARK_DATASET.filter((tc) => tc.category === 'edge_case');

    edgeLeads.forEach((tc) => {
      it(`${tc.id}: ${tc.description}`, () => {
        const input = tc.input as LeadInput;
        const scored = scoreLead(input);

        expect(scored.score).toBeGreaterThanOrEqual(0);
        expect(scored.score).toBeLessThanOrEqual(100);

        if (tc.expectedTier) {
          expect(scored.tier).toBe(tc.expectedTier);
        }
      });
    });
  });

  // 36-40: 5 Adversarial / Security Leads
  describe('5 Adversarial & Prompt Injection Leads (TC-DS-036 to TC-DS-040)', () => {
    const advLeads = BENCHMARK_DATASET.filter((tc) => tc.category === 'adversarial');

    advLeads.forEach((tc) => {
      it(`${tc.id}: ${tc.description}`, () => {
        const input = tc.input as LeadInput;
        const fullText = `${input.requirements || ''} ${input.notes || ''}`;
        const check = detectPromptInjection(fullText);

        if (tc.id === 'TC-DS-036' || tc.id === 'TC-DS-037' || tc.id === 'TC-DS-038') {
          expect(check.isSuspicious).toBe(true);
        }

        // Even under attack, scoring must remain conservative and deterministic
        const scored = scoreLead(input);
        expect(scored.tier).toBe('Cold');
        expect(scored.score).toBeLessThan(70);
      });
    });
  });
});
