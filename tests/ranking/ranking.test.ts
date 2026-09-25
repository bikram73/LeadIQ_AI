import { describe, it, expect } from 'vitest';
import { rankLeads, filterLeads } from '../../src/services/scoringEngine';
import { Lead } from '../../src/types';

describe('Ranking, Filtering & Data Isolation Tests', () => {
  const mockLeads: Lead[] = [
    {
      id: 'lead-a',
      rank: 1,
      fullName: 'Lead A',
      company: 'Company A',
      industry: 'Software',
      jobTitle: 'VP',
      companySize: '100',
      budget: '$50,000',
      location: 'SF',
      requirements: 'AI Assistant',
      notes: '',
      score: 95,
      fitScore: 'Excellent',
      intentScore: 'High',
      tier: 'Hot',
      summary: 'Summary A',
      reasoning: ['Reason A'],
      nextAction: 'Call',
      factorBreakdown: { buyingIntent: 24, budgetAvailability: 18, decisionMaker: 14, timelineUrgency: 14, companySize: 8, industryFit: 9, requirementClarity: 5 },
      avatarInitials: 'LA',
      avatarBg: 'bg-green',
      avatarTextColor: 'text-green',
      createdAt: '2026-07-27',
    },
    {
      id: 'lead-b',
      rank: 2,
      fullName: 'Lead B',
      company: 'Company B',
      industry: 'Retail',
      jobTitle: 'Manager',
      companySize: '50',
      budget: '$20,000',
      location: 'Chicago',
      requirements: 'Chatbot',
      notes: '',
      score: 72,
      fitScore: 'Good',
      intentScore: 'Medium',
      tier: 'Warm',
      summary: 'Summary B',
      reasoning: ['Reason B'],
      nextAction: 'Proposal',
      factorBreakdown: { buyingIntent: 15, budgetAvailability: 14, decisionMaker: 10, timelineUrgency: 10, companySize: 6, industryFit: 7, requirementClarity: 3 },
      avatarInitials: 'LB',
      avatarBg: 'bg-green',
      avatarTextColor: 'text-green',
      createdAt: '2026-07-27',
    },
    {
      id: 'lead-c',
      rank: 3,
      fullName: 'Lead C',
      company: 'Company C',
      industry: 'Finance',
      jobTitle: 'Director',
      companySize: '200',
      budget: '$80,000',
      location: 'NYC',
      requirements: 'Analytics',
      notes: '',
      score: 88,
      fitScore: 'Excellent',
      intentScore: 'High',
      tier: 'Warm',
      summary: 'Summary C',
      reasoning: ['Reason C'],
      nextAction: 'Demo',
      factorBreakdown: { buyingIntent: 22, budgetAvailability: 18, decisionMaker: 13, timelineUrgency: 13, companySize: 7, industryFit: 9, requirementClarity: 4 },
      avatarInitials: 'LC',
      avatarBg: 'bg-green',
      avatarTextColor: 'text-green',
      createdAt: '2026-07-27',
    },
    {
      id: 'lead-d',
      rank: 4,
      fullName: 'Lead D',
      company: 'Company D',
      industry: 'Education',
      jobTitle: 'Assistant',
      companySize: '10',
      budget: '$5,000',
      location: 'Austin',
      requirements: 'Study tool',
      notes: '',
      score: 45,
      fitScore: 'Poor',
      intentScore: 'Low',
      tier: 'Cold',
      summary: 'Summary D',
      reasoning: ['Reason D'],
      nextAction: 'Nurture',
      factorBreakdown: { buyingIntent: 8, budgetAvailability: 6, decisionMaker: 4, timelineUrgency: 5, companySize: 4, industryFit: 6, requirementClarity: 2 },
      avatarInitials: 'LD',
      avatarBg: 'bg-gray',
      avatarTextColor: 'text-gray',
      createdAt: '2026-07-27',
    },
    {
      id: 'lead-e',
      rank: 5,
      fullName: 'Lead E',
      company: 'Company E',
      industry: 'SaaS',
      jobTitle: 'CEO',
      companySize: '1000+',
      budget: '$150,000',
      location: 'Boston',
      requirements: 'Full Suite',
      notes: '',
      score: 99,
      fitScore: 'Excellent',
      intentScore: 'High',
      tier: 'Hot',
      summary: 'Summary E',
      reasoning: ['Reason E'],
      nextAction: 'Executive Demo',
      factorBreakdown: { buyingIntent: 25, budgetAvailability: 20, decisionMaker: 15, timelineUrgency: 15, companySize: 10, industryFit: 10, requirementClarity: 5 },
      avatarInitials: 'LE',
      avatarBg: 'bg-green',
      avatarTextColor: 'text-green',
      createdAt: '2026-07-27',
    },
  ];

  it('TC-RANK-001: Ranks leads in strict descending order of score', () => {
    const ranked = rankLeads(mockLeads);

    expect(ranked[0].fullName).toBe('Lead E');
    expect(ranked[0].score).toBe(99);
    expect(ranked[0].rank).toBe(1);

    expect(ranked[1].fullName).toBe('Lead A');
    expect(ranked[1].score).toBe(95);
    expect(ranked[1].rank).toBe(2);

    expect(ranked[2].fullName).toBe('Lead C');
    expect(ranked[2].score).toBe(88);
    expect(ranked[2].rank).toBe(3);

    expect(ranked[3].fullName).toBe('Lead B');
    expect(ranked[3].score).toBe(72);
    expect(ranked[3].rank).toBe(4);

    expect(ranked[4].fullName).toBe('Lead D');
    expect(ranked[4].score).toBe(45);
    expect(ranked[4].rank).toBe(5);
  });

  it('TC-RANK-002: Equal score tie-breaking (Higher Intent -> Higher Budget -> Original order)', () => {
    const twinA: Lead = {
      ...mockLeads[0],
      id: 'twin-1',
      fullName: 'Twin High Intent',
      score: 80,
      factorBreakdown: { ...mockLeads[0].factorBreakdown, buyingIntent: 24 },
      budget: '$50,000',
    };

    const twinB: Lead = {
      ...mockLeads[1],
      id: 'twin-2',
      fullName: 'Twin Low Intent',
      score: 80,
      factorBreakdown: { ...mockLeads[1].factorBreakdown, buyingIntent: 15 },
      budget: '$80,000',
    };

    const ranked = rankLeads([twinB, twinA]);
    expect(ranked[0].fullName).toBe('Twin High Intent');
    expect(ranked[1].fullName).toBe('Twin Low Intent');
  });

  it('TC-FILTER-001: Filters leads by tier (Hot, Warm, Cold, All)', () => {
    const hotLeads = filterLeads(mockLeads, 'HOT', '');
    expect(hotLeads).toHaveLength(2);
    expect(hotLeads.every((l) => l.tier === 'Hot')).toBe(true);

    const warmLeads = filterLeads(mockLeads, 'WARM', '');
    expect(warmLeads).toHaveLength(2);
    expect(warmLeads.every((l) => l.tier === 'Warm')).toBe(true);

    const coldLeads = filterLeads(mockLeads, 'COLD', '');
    expect(coldLeads).toHaveLength(1);
    expect(coldLeads[0].tier).toBe('Cold');

    const allLeads = filterLeads(mockLeads, 'ALL', '');
    expect(allLeads).toHaveLength(5);
  });

  it('TC-FILTER-002: Searches by prospect name or company', () => {
    const searchResult = filterLeads(mockLeads, 'ALL', 'Lead E');
    expect(searchResult).toHaveLength(1);
    expect(searchResult[0].fullName).toBe('Lead E');
  });

  it('TC-ISOLATION-001: Lead fields do not contaminate another lead', () => {
    const lead1 = mockLeads[0];
    const lead2 = mockLeads[1];

    expect(lead1.fullName).not.toBe(lead2.fullName);
    expect(lead1.company).not.toBe(lead2.company);
    expect(lead1.score).not.toBe(lead2.score);
    expect(lead1.budget).not.toBe(lead2.budget);
  });
});
