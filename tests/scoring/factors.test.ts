import { describe, it, expect } from 'vitest';
import {
  calculateIntentScore,
  calculateBudgetScore,
  calculateTimelineScore,
  calculateCompanySizeScore,
  calculateIndustryFitScore,
  calculateRequirementClarityScore,
  calculateFinalScore,
  FACTOR_MAX_WEIGHTS,
} from '../../src/services/scoringEngine';

describe('Detailed Factor Range & Permutation Unit Tests', () => {
  describe('Budget Factor Permutations (Max 20)', () => {
    it('scores $100,000+ at 20', () => {
      expect(calculateBudgetScore('$120,000')).toBe(20);
      expect(calculateBudgetScore('$250k')).toBe(20);
      expect(calculateBudgetScore('$1,000,000')).toBe(20);
    });

    it('scores $75k-$99k at 19', () => {
      expect(calculateBudgetScore('$80,000')).toBe(19);
      expect(calculateBudgetScore('$95k')).toBe(19);
    });

    it('scores $50k-$74k at 17', () => {
      expect(calculateBudgetScore('$60,000')).toBe(17);
      expect(calculateBudgetScore('$50k')).toBe(17);
    });

    it('scores $20k-$49k at 15', () => {
      expect(calculateBudgetScore('$25,000')).toBe(15);
      expect(calculateBudgetScore('$45,000')).toBe(15);
    });

    it('scores $10k-$19k at 14', () => {
      expect(calculateBudgetScore('$15,000')).toBe(14);
      expect(calculateBudgetScore('$10k')).toBe(14);
    });

    it('scores unknown or unprovided budget conservatively (<= 6)', () => {
      expect(calculateBudgetScore('Unknown')).toBeLessThanOrEqual(6);
      expect(calculateBudgetScore('Not decided')).toBeLessThanOrEqual(6);
      expect(calculateBudgetScore('')).toBeLessThanOrEqual(6);
    });
  });

  describe('Timeline Urgency Factor Permutations (Max 15)', () => {
    it('scores immediate / urgent at 15', () => {
      expect(calculateTimelineScore('Immediate implementation')).toBe(15);
      expect(calculateTimelineScore('ASAP')).toBe(15);
      expect(calculateTimelineScore('Urgent demo requested')).toBe(15);
    });

    it('scores 2 weeks / this week at 14', () => {
      expect(calculateTimelineScore('Need solution in 2 weeks')).toBe(14);
      expect(calculateTimelineScore('Proposal this week')).toBe(14);
    });

    it('scores 1 month / 30 days at 11', () => {
      expect(calculateTimelineScore('In 1 month')).toBe(11);
      expect(calculateTimelineScore('30 days evaluation')).toBe(11);
    });

    it('scores quarterly or flexible timelines conservatively (<= 8)', () => {
      expect(calculateTimelineScore('Next quarter (Q3)')).toBeLessThanOrEqual(8);
      expect(calculateTimelineScore('Flexible timeline')).toBeLessThanOrEqual(6);
      expect(calculateTimelineScore('No timeline')).toBeLessThanOrEqual(6);
    });
  });

  describe('Company Size Factor Permutations (Max 10)', () => {
    it('scores 500+ employees at 10', () => {
      expect(calculateCompanySizeScore('500-1000')).toBe(10);
      expect(calculateCompanySizeScore('1000+')).toBe(10);
    });

    it('scores 250-500 employees at 9', () => {
      expect(calculateCompanySizeScore('250-500')).toBe(9);
    });

    it('scores 100-250 employees at 8', () => {
      expect(calculateCompanySizeScore('100-250')).toBe(8);
    });

    it('scores 50-100 employees at 6', () => {
      expect(calculateCompanySizeScore('50-100')).toBe(6);
    });

    it('scores small teams (<50) at 3-4', () => {
      expect(calculateCompanySizeScore('10-50')).toBe(4);
      expect(calculateCompanySizeScore('1-10')).toBe(3);
    });
  });

  describe('Industry Fit Factor Permutations (Max 10)', () => {
    it('scores software & SaaS at 10', () => {
      expect(calculateIndustryFitScore('Software')).toBe(10);
      expect(calculateIndustryFitScore('SaaS Tech')).toBe(10);
    });

    it('scores construction, finance, retail, healthcare at 9', () => {
      expect(calculateIndustryFitScore('Construction')).toBe(9);
      expect(calculateIndustryFitScore('Healthcare')).toBe(9);
      expect(calculateIndustryFitScore('Retail')).toBe(9);
    });

    it('scores general sectors at 6-7', () => {
      expect(calculateIndustryFitScore('Marketing')).toBe(7);
      expect(calculateIndustryFitScore('General B2B')).toBe(6);
    });
  });

  describe('Requirement Clarity Permutations (Max 5)', () => {
    it('scores comprehensive requirements at 5', () => {
      expect(
        calculateRequirementClarityScore('Enterprise AI Assistant for field & executive management team automation')
      ).toBe(5);
    });

    it('scores short descriptions at 2-4', () => {
      expect(calculateRequirementClarityScore('Chatbot')).toBe(2);
      expect(calculateRequirementClarityScore('AI customer support')).toBe(4);
    });
  });
});
