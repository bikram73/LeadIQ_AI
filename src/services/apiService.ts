import { Lead, LeadInput, LeadTier } from '../types';
import {
  scoreLead,
  validateAIResponse,
  validateLeadInput,
  getLeadTier,
} from './scoringEngine';

export async function analyzeSingleLeadApi(input: LeadInput): Promise<Lead> {
  // Client-side pre-validation
  const validation = validateLeadInput(input);
  if (!validation.isValid) {
    throw new Error(validation.errors.map((e) => e.message).join(' '));
  }

  try {
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lead: input }),
    });

    const data = await res.json();
    if (!res.ok && data?.error) {
      const errDetail = Array.isArray(data.errors)
        ? data.errors.map((e: any) => e.message).join(' ')
        : data.error;
      throw new Error(errDetail || 'Lead qualification failed.');
    }

    if (data && data.result) {
      const validated = validateAIResponse(data.result);
      const r = validated.isValid ? validated.validatedResult : data.result;
      const score = typeof r.lead_score === 'number' ? r.lead_score : 50;

      const initials =
        (input.fullName || 'New Lead')
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2) || 'NL';

      const tierKey: LeadTier = getLeadTier(score);

      const tierColors = {
        Hot: { bg: 'bg-[#006b2c]/10', text: 'text-[#006b2c]' },
        Warm: { bg: 'bg-[#10B981]/10', text: 'text-[#10B981]' },
        Cold: { bg: 'bg-[#EAB308]/10', text: 'text-[#B45309]' },
        'Very Low': { bg: 'bg-[#94A3B8]/10', text: 'text-[#64748B]' },
      };

      const colorScheme = tierColors[tierKey] || tierColors['Cold'];

      return {
        ...input,
        id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        rank: 1,
        score,
        fitScore: r.fit_score || 'Good',
        intentScore: r.intent || 'Medium',
        tier: tierKey,
        summary: r.summary || `${input.fullName} evaluated with score ${score}/100.`,
        reasoning: Array.isArray(r.reasoning) ? r.reasoning : ['Evaluated by LeadIQ AI engine'],
        nextAction: r.next_action || 'Follow up with prospect',
        factorBreakdown: r.factor_breakdown,
        avatarInitials: initials,
        avatarBg: colorScheme.bg,
        avatarTextColor: colorScheme.text,
        createdAt: new Date().toISOString().split('T')[0],
      };
    }
  } catch (err: any) {
    // If it's a validation error, re-throw so UI shows the validation message
    if (err.message && (err.message.includes('required') || err.message.includes('valid work email'))) {
      throw err;
    }
    console.warn('API call failed or offline, generating deterministic client qualification:', err);
  }

  // Deterministic calculation if fetch fails or network is offline
  const result = scoreLead(input);
  const tierColors = {
    Hot: { bg: 'bg-[#006b2c]/10', text: 'text-[#006b2c]' },
    Warm: { bg: 'bg-[#10B981]/10', text: 'text-[#10B981]' },
    Cold: { bg: 'bg-[#EAB308]/10', text: 'text-[#B45309]' },
    'Very Low': { bg: 'bg-[#94A3B8]/10', text: 'text-[#64748B]' },
  };
  const colorScheme = tierColors[result.tier] || tierColors['Cold'];

  return {
    ...input,
    id: `lead-det-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    rank: 1,
    score: result.score,
    fitScore: result.fitScore,
    intentScore: result.intentScore,
    tier: result.tier,
    summary: result.summary,
    reasoning: result.reasoning,
    nextAction: result.nextAction,
    factorBreakdown: result.factorBreakdown,
    avatarInitials: (input.fullName || 'NL').split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase(),
    avatarBg: colorScheme.bg,
    avatarTextColor: colorScheme.text,
    createdAt: new Date().toISOString().split('T')[0],
  };
}

export async function analyzeBulkLeadsApi(leads: LeadInput[]): Promise<Lead[]> {
  try {
    const res = await fetch('/api/analyze-csv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leads }),
    });

    const data = await res.json();
    if (data && Array.isArray(data.results)) {
      return data.results.map((r: any, idx: number) => {
        const lead: LeadInput = leads[idx] || {
          fullName: 'New Lead',
          company: 'Company',
          requirements: 'Inquiry',
          jobTitle: '',
          industry: '',
          companySize: '',
          budget: '',
          location: '',
          notes: '',
        };
        const score = typeof r.lead_score === 'number' ? r.lead_score : 50;
        const tier = getLeadTier(score);

        return {
          ...lead,
          id: `lead-csv-${Date.now()}-${idx}`,
          rank: idx + 1,
          score,
          fitScore: r.fit_score || 'Good',
          intentScore: r.intent || 'Medium',
          tier,
          summary: r.summary || `Bulk lead qualified with score ${score}/100.`,
          reasoning: r.reasoning || ['Bulk CSV qualification'],
          nextAction: r.next_action || 'Follow up',
          factorBreakdown: r.factor_breakdown,
          avatarInitials: ((lead.fullName || 'NL').split(' ').map((n: string) => n[0]).join('').slice(0, 2) || 'NL').toUpperCase(),
          avatarBg: tier === 'Hot' ? 'bg-[#006b2c]/10' : tier === 'Warm' ? 'bg-[#10B981]/10' : 'bg-[#EAB308]/10',
          avatarTextColor: tier === 'Hot' ? 'text-[#006b2c]' : tier === 'Warm' ? 'text-[#10B981]' : 'text-[#B45309]',
          createdAt: new Date().toISOString().split('T')[0],
        };
      });
    }
  } catch (err) {
    console.warn('Bulk API call failed, generating deterministic local qualification:', err);
  }

  // Fallback deterministic bulk qualification
  return leads.map((lead, idx) => {
    const res = scoreLead(lead);
    return {
      ...lead,
      id: `lead-csv-det-${Date.now()}-${idx}`,
      rank: idx + 1,
      score: res.score,
      fitScore: res.fitScore,
      intentScore: res.intentScore,
      tier: res.tier,
      summary: res.summary,
      reasoning: res.reasoning,
      nextAction: res.nextAction,
      factorBreakdown: res.factorBreakdown,
      avatarInitials: ((lead.fullName || 'NL').split(' ').map((n: string) => n[0]).join('').slice(0, 2) || 'NL').toUpperCase(),
      avatarBg: res.tier === 'Hot' ? 'bg-[#006b2c]/10' : res.tier === 'Warm' ? 'bg-[#10B981]/10' : 'bg-[#EAB308]/10',
      avatarTextColor: res.tier === 'Hot' ? 'text-[#006b2c]' : res.tier === 'Warm' ? 'text-[#10B981]' : 'text-[#B45309]',
      createdAt: new Date().toISOString().split('T')[0],
    };
  });
}

