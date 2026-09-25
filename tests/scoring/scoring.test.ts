import { describe, it, expect } from 'vitest';
import {
  calculateFinalScore,
  getLeadTier,
  getFitScore,
  getIntentLevel,
  calculateDecisionMakerScore,
  calculateBudgetScore,
  calculateTimelineScore,
  calculateIntentScore,
  calculateCompanySizeScore,
  calculateIndustryFitScore,
  calculateRequirementClarityScore,
  scoreLead,
  FACTOR_MAX_WEIGHTS,
} from '../../src/services/scoringEngine';
import { SAMPLE_PRD_LEADS } from '../../src/data/sampleLeads';

describe('1. Seven-Factor Scoring Weights & Specification', () => {
  it('TC-SCORE-001: Maximum weights must sum to exactly 100', () => {
    const totalMax =
      FACTOR_MAX_WEIGHTS.buyingIntent +
      FACTOR_MAX_WEIGHTS.budgetAvailability +
      FACTOR_MAX_WEIGHTS.decisionMaker +
      FACTOR_MAX_WEIGHTS.timelineUrgency +
      FACTOR_MAX_WEIGHTS.companySize +
      FACTOR_MAX_WEIGHTS.industryFit +
      FACTOR_MAX_WEIGHTS.requirementClarity;

    expect(totalMax).toBe(100);
    expect(FACTOR_MAX_WEIGHTS.buyingIntent).toBe(25);
    expect(FACTOR_MAX_WEIGHTS.budgetAvailability).toBe(20);
    expect(FACTOR_MAX_WEIGHTS.decisionMaker).toBe(15);
    expect(FACTOR_MAX_WEIGHTS.timelineUrgency).toBe(15);
    expect(FACTOR_MAX_WEIGHTS.companySize).toBe(10);
    expect(FACTOR_MAX_WEIGHTS.industryFit).toBe(10);
    expect(FACTOR_MAX_WEIGHTS.requirementClarity).toBe(5);
  });

  it('TC-SCORE-002: Maximum score test (all factors maxed out yields 100/100 and HOT)', () => {
    const { finalScore, clampedBreakdown } = calculateFinalScore({
      buyingIntent: 25,
      budgetAvailability: 20,
      decisionMaker: 15,
      timelineUrgency: 15,
      companySize: 10,
      industryFit: 10,
      requirementClarity: 5,
    });

    expect(finalScore).toBe(100);
    expect(getLeadTier(finalScore)).toBe('Hot');
    expect(clampedBreakdown.buyingIntent).toBe(25);
  });

  it('TC-SCORE-003: Minimum score test (all factors 0 yields 0/100 and COLD)', () => {
    const { finalScore, clampedBreakdown } = calculateFinalScore({
      buyingIntent: 0,
      budgetAvailability: 0,
      decisionMaker: 0,
      timelineUrgency: 0,
      companySize: 0,
      industryFit: 0,
      requirementClarity: 0,
    });

    expect(finalScore).toBe(0);
    expect(getLeadTier(finalScore)).toBe('Cold');
    expect(clampedBreakdown.buyingIntent).toBe(0);
  });

  it('TC-SCORE-004: Score integrity - sum of all factor scores MUST strictly equal final score', () => {
    const testCases = [
      { buyingIntent: 20, budgetAvailability: 15, decisionMaker: 10, timelineUrgency: 12, companySize: 8, industryFit: 9, requirementClarity: 4 },
      { buyingIntent: 15, budgetAvailability: 10, decisionMaker: 8, timelineUrgency: 7, companySize: 6, industryFit: 5, requirementClarity: 3 },
      { buyingIntent: 24, budgetAvailability: 19, decisionMaker: 14, timelineUrgency: 15, companySize: 9, industryFit: 10, requirementClarity: 5 },
    ];

    testCases.forEach((factors) => {
      const { finalScore, clampedBreakdown } = calculateFinalScore(factors);
      const computedSum =
        clampedBreakdown.buyingIntent +
        clampedBreakdown.budgetAvailability +
        clampedBreakdown.decisionMaker +
        clampedBreakdown.timelineUrgency +
        clampedBreakdown.companySize +
        clampedBreakdown.industryFit +
        clampedBreakdown.requirementClarity;

      expect(finalScore).toBe(computedSum);
    });
  });
});

describe('2. Deterministic Tier Rules & Boundary Tests', () => {
  it('TC-TIER-001: Boundary 89 must be WARM and Boundary 90 must be HOT', () => {
    expect(getLeadTier(89)).toBe('Warm');
    expect(getLeadTier(89.4)).toBe('Warm');
    expect(getLeadTier(90)).toBe('Hot');
    expect(getLeadTier(95)).toBe('Hot');
    expect(getLeadTier(100)).toBe('Hot');
  });

  it('TC-TIER-002: Boundary 69 must be COLD and Boundary 70 must be WARM', () => {
    expect(getLeadTier(69)).toBe('Cold');
    expect(getLeadTier(69.4)).toBe('Cold');
    expect(getLeadTier(70)).toBe('Warm');
    expect(getLeadTier(75)).toBe('Warm');
    expect(getLeadTier(80)).toBe('Warm');
  });

  it('TC-TIER-003: Extreme bounds 0 (COLD) and 100 (HOT)', () => {
    expect(getLeadTier(0)).toBe('Cold');
    expect(getLeadTier(100)).toBe('Hot');
  });

  it('TC-TIER-004: Factor value clamping for out-of-range inputs (-50, 999, NaN)', () => {
    const { finalScore, clampedBreakdown } = calculateFinalScore({
      buyingIntent: -10 as any,
      budgetAvailability: 999,
      decisionMaker: 'invalid' as any,
      timelineUrgency: 50,
      companySize: 20,
      industryFit: 30,
      requirementClarity: 15,
    });

    expect(clampedBreakdown.buyingIntent).toBe(0);
    expect(clampedBreakdown.budgetAvailability).toBe(20);
    expect(clampedBreakdown.decisionMaker).toBe(0);
    expect(clampedBreakdown.timelineUrgency).toBe(15);
    expect(clampedBreakdown.companySize).toBe(10);
    expect(clampedBreakdown.industryFit).toBe(10);
    expect(clampedBreakdown.requirementClarity).toBe(5);
    expect(finalScore).toBeLessThanOrEqual(100);
    expect(finalScore).toBeGreaterThanOrEqual(0);
  });
});

describe('3. Decision-Maker Authority & Evidence Integrity Rules', () => {
  it('TC-AUTH-001: Senior executive titles receive high authority scores (12-15)', () => {
    expect(calculateDecisionMakerScore('CEO')).toBe(15);
    expect(calculateDecisionMakerScore('Founder & Managing Director')).toBe(15);
    expect(calculateDecisionMakerScore('Chief Technology Officer')).toBe(14);
    expect(calculateDecisionMakerScore('VP of Customer Success')).toBe(14);
    expect(calculateDecisionMakerScore('Operations Director')).toBe(13);
  });

  it('TC-AUTH-002: Junior titles must NOT receive high authority (capped at <= 4)', () => {
    expect(calculateDecisionMakerScore('Marketing Assistant')).toBeLessThanOrEqual(4);
    expect(calculateDecisionMakerScore('Intern')).toBeLessThanOrEqual(4);
    expect(calculateDecisionMakerScore('Student')).toBeLessThanOrEqual(4);
    expect(calculateDecisionMakerScore('Coordinator')).toBeLessThanOrEqual(4);
    expect(calculateDecisionMakerScore('Junior Executive')).toBeLessThanOrEqual(4);
  });

  it('TC-AUTH-003: Unestablished / Unknown authority is conservative (<= 4)', () => {
    expect(calculateDecisionMakerScore('Unknown')).toBeLessThanOrEqual(4);
    expect(calculateDecisionMakerScore('Not provided')).toBeLessThanOrEqual(4);
    expect(calculateDecisionMakerScore('')).toBeLessThanOrEqual(4);
  });
});

describe('4. Standard 5 Reference Leads Verification', () => {
  it('TC-LEAD-001: David Brown qualifies as HOT with direct CEO sponsorship', () => {
    const david = SAMPLE_PRD_LEADS.find((l) => l.fullName === 'David Brown');
    expect(david).toBeDefined();
    expect(david?.score).toBeGreaterThanOrEqual(90);
    expect(david?.tier).toBe('Hot');
    expect(david?.factorBreakdown.budgetAvailability).toBe(20);
    expect(david?.factorBreakdown.decisionMaker).toBe(15);
  });

  it('TC-LEAD-002: John Carter qualifies as HOT with $80k budget and 2-week urgency', () => {
    const john = SAMPLE_PRD_LEADS.find((l) => l.fullName === 'John Carter');
    expect(john).toBeDefined();
    expect(john?.score).toBeGreaterThanOrEqual(90);
    expect(john?.tier).toBe('Hot');
  });

  it('TC-LEAD-003: Michael Ross qualifies as WARM with $15k budget & proposal inquiry', () => {
    const michael = SAMPLE_PRD_LEADS.find((l) => l.fullName === 'Michael Ross');
    expect(michael).toBeDefined();
    expect(michael?.score).toBeGreaterThanOrEqual(70);
    expect(michael?.score).toBeLessThan(90);
    expect(michael?.tier).toBe('Warm');
  });

  it('TC-LEAD-004: Sarah Lee qualifies as COLD (exploratory research, unknown budget)', () => {
    const sarah = SAMPLE_PRD_LEADS.find((l) => l.fullName === 'Sarah Lee');
    expect(sarah).toBeDefined();
    expect(sarah?.score).toBeLessThan(70);
    expect(sarah?.tier).toBe('Cold');
  });

  it('TC-LEAD-005: Emma Wilson qualifies as COLD (Marketing Assistant, casual inquiry)', () => {
    const emma = SAMPLE_PRD_LEADS.find((l) => l.fullName === 'Emma Wilson');
    expect(emma).toBeDefined();
    expect(emma?.score).toBeLessThan(70);
    expect(emma?.tier).toBe('Cold');
    expect(emma?.factorBreakdown.decisionMaker).toBeLessThanOrEqual(5);
  });
});
