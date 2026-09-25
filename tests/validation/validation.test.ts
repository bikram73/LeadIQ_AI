import { describe, it, expect } from 'vitest';
import { validateLeadInput } from '../../src/services/scoringEngine';
import { BENCHMARK_DATASET } from '../../src/data/benchmarkDataset';

describe('Validation Unit Tests (TC-MAN-001 to TC-MAN-006)', () => {
  it('TC-MAN-001: Valid Lead passes validation', () => {
    const input = {
      fullName: 'David Brown',
      company: 'BuildPro',
      requirements: 'Enterprise AI Assistant for field & executive team',
      email: 'david.brown@buildpro.com',
      budget: '$120,000',
    };
    const res = validateLeadInput(input);
    expect(res.isValid).toBe(true);
    expect(res.errors).toHaveLength(0);
  });

  it('TC-MAN-002: Missing Name produces "Full Name is required."', () => {
    const input = {
      fullName: '',
      company: 'BuildPro',
      requirements: 'Enterprise AI Assistant',
    };
    const res = validateLeadInput(input);
    expect(res.isValid).toBe(false);
    expect(res.errors.some((e) => e.message === 'Full Name is required.')).toBe(true);
  });

  it('TC-MAN-003: Missing Company produces "Company Name is required."', () => {
    const input = {
      fullName: 'John Carter',
      company: '  ',
      requirements: 'Customer support automation',
    };
    const res = validateLeadInput(input);
    expect(res.isValid).toBe(false);
    expect(res.errors.some((e) => e.message === 'Company Name is required.')).toBe(true);
  });

  it('TC-MAN-004: Missing Requirement produces "Requirement Details is required."', () => {
    const input = {
      fullName: 'Michael Ross',
      company: 'RetailMax',
      requirements: '',
    };
    const res = validateLeadInput(input);
    expect(res.isValid).toBe(false);
    expect(res.errors.some((e) => e.message === 'Requirement Details is required.')).toBe(true);
  });

  it('TC-MAN-005: Invalid Email produces "Enter a valid work email."', () => {
    const input = {
      fullName: 'Sarah Lee',
      company: 'HealthPlus',
      requirements: 'Exploratory AI options',
      email: 'abc@',
    };
    const res = validateLeadInput(input);
    expect(res.isValid).toBe(false);
    expect(res.errors.some((e) => e.message === 'Enter a valid work email.')).toBe(true);
  });

  it('TC-MAN-006: Empty Form produces validation errors without crashing', () => {
    const input = {
      fullName: '',
      company: '',
      requirements: '',
    };
    const res = validateLeadInput(input);
    expect(res.isValid).toBe(false);
    expect(res.errors.length).toBeGreaterThanOrEqual(3);
  });

  it('Benchmark Incomplete Leads Suite (TC-DS-021 to TC-DS-025)', () => {
    const incompleteLeads = BENCHMARK_DATASET.filter((tc) => tc.category === 'incomplete');
    expect(incompleteLeads.length).toBe(5);

    incompleteLeads.forEach((tc) => {
      const res = validateLeadInput(tc.input);
      expect(res.isValid).toBe(false);
      expect(res.errors.length).toBeGreaterThan(0);
    });
  });
});
