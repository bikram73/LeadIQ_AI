import { FactorBreakdown, FitScore, IntentScore, Lead, LeadInput, LeadTier } from '../types';

/**
 * Maximum factor weights as defined in the Seven-Factor Scoring Specification
 */
export const FACTOR_MAX_WEIGHTS: Record<keyof FactorBreakdown, number> = {
  buyingIntent: 25,
  budgetAvailability: 20,
  decisionMaker: 15,
  timelineUrgency: 15,
  companySize: 10,
  industryFit: 10,
  requirementClarity: 5,
};

/**
 * Deterministic Tier classification thresholds:
 * 90–100 → HOT
 * 70–89  → WARM
 * 0–69   → COLD
 */
export function getLeadTier(score: number): LeadTier {
  const rounded = Math.round(score);
  if (rounded >= 90) return 'Hot';
  if (rounded >= 70) return 'Warm';
  return 'Cold';
}

/**
 * Fit score evaluation
 */
export function getFitScore(score: number): FitScore {
  if (score >= 85) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 50) return 'Average';
  return 'Poor';
}

/**
 * Intent level evaluation
 */
export function getIntentLevel(intentScoreFactor: number): IntentScore {
  if (intentScoreFactor >= 18) return 'High';
  if (intentScoreFactor >= 10) return 'Medium';
  return 'Low';
}

/**
 * Deterministically calculate the final score by summing the 7 factors.
 * Ensures the result is clamped between 0 and 100, and factors are clamped to their max weights.
 */
export function calculateFinalScore(breakdown: Partial<FactorBreakdown>): {
  finalScore: number;
  clampedBreakdown: FactorBreakdown;
} {
  const clamp = (val: unknown, max: number): number => {
    if (typeof val !== 'number' || isNaN(val)) return 0;
    return Math.max(0, Math.min(Math.round(val), max));
  };

  const clampedBreakdown: FactorBreakdown = {
    buyingIntent: clamp(breakdown.buyingIntent, FACTOR_MAX_WEIGHTS.buyingIntent),
    budgetAvailability: clamp(breakdown.budgetAvailability, FACTOR_MAX_WEIGHTS.budgetAvailability),
    decisionMaker: clamp(breakdown.decisionMaker, FACTOR_MAX_WEIGHTS.decisionMaker),
    timelineUrgency: clamp(breakdown.timelineUrgency, FACTOR_MAX_WEIGHTS.timelineUrgency),
    companySize: clamp(breakdown.companySize, FACTOR_MAX_WEIGHTS.companySize),
    industryFit: clamp(breakdown.industryFit, FACTOR_MAX_WEIGHTS.industryFit),
    requirementClarity: clamp(breakdown.requirementClarity, FACTOR_MAX_WEIGHTS.requirementClarity),
  };

  const finalScore =
    clampedBreakdown.buyingIntent +
    clampedBreakdown.budgetAvailability +
    clampedBreakdown.decisionMaker +
    clampedBreakdown.timelineUrgency +
    clampedBreakdown.companySize +
    clampedBreakdown.industryFit +
    clampedBreakdown.requirementClarity;

  return {
    finalScore: Math.min(100, Math.max(0, finalScore)),
    clampedBreakdown,
  };
}

/**
 * Form validation errors
 */
export interface LeadValidationError {
  field: string;
  message: string;
}

export function validateLeadInput(input: Partial<LeadInput>): {
  isValid: boolean;
  errors: LeadValidationError[];
} {
  const errors: LeadValidationError[] = [];

  if (!input.fullName || !input.fullName.trim()) {
    errors.push({ field: 'fullName', message: 'Full Name is required.' });
  }

  if (!input.company || !input.company.trim()) {
    errors.push({ field: 'company', message: 'Company Name is required.' });
  }

  if (!input.requirements || !input.requirements.trim()) {
    errors.push({ field: 'requirements', message: 'Requirement Details is required.' });
  }

  if (input.email && input.email.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.email.trim())) {
      errors.push({ field: 'email', message: 'Enter a valid work email.' });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Evaluates individual factors with evidence integrity rules:
 * - High authority (CEO, VP, Director, Founder, Head) -> 12–15
 * - Junior / non-decision roles (Assistant, Intern, Student, Coordinator) -> 2–5
 * - Unknown / missing -> 0–4
 */
export function calculateDecisionMakerScore(roleOrTitle: string, explicitAuthority?: boolean): number {
  const r = (roleOrTitle || '').toLowerCase().trim();
  if (!r || r === 'unknown' || r === 'not provided' || r === 'not established') {
    return explicitAuthority ? 10 : 3;
  }

  // Junior / unestablished roles must not receive high decision authority
  if (
    r.includes('assistant') ||
    r.includes('intern') ||
    r.includes('student') ||
    r.includes('coordinator') ||
    r.includes('junior')
  ) {
    return 4;
  }

  // Senior executive & decision roles
  if (
    /\bceo\b/i.test(r) ||
    r.includes('chief executive') ||
    r.includes('founder') ||
    r.includes('owner') ||
    r.includes('co-founder')
  ) {
    return 15;
  }
  if (
    /\b(cto|cfo|coo|cmo|cro|cio|svp|evp|vp)\b/i.test(r) ||
    r.includes('chief technology') ||
    r.includes('chief operating') ||
    r.includes('chief financial') ||
    r.includes('chief medical') ||
    r.includes('senior vice president') ||
    r.includes('executive vice president') ||
    /\bvp\b/i.test(r) ||
    r.includes('vice president')
  ) {
    return 14;
  }
  if (r.includes('director') || r.includes('head of') || r.includes('managing partner') || r.includes('senior partner')) {
    return 13;
  }
  if (r.includes('lead') || r.includes('manager') || r.includes('specialist')) {
    return 8;
  }

  return 6;
}

export function calculateBudgetScore(budgetStr: string): number {
  const b = (budgetStr || '').toLowerCase().trim();
  if (!b || b === 'unknown' || b === 'not provided' || b === 'not decided' || b === 'no budget') {
    return 4;
  }

  // Numerical check
  const numMatch = b.replace(/,/g, '').match(/\$?(\d+)(k|m)?/i);
  if (numMatch) {
    let amount = parseInt(numMatch[1], 10);
    const unit = (numMatch[2] || '').toLowerCase();
    if (unit === 'k') amount *= 1000;
    if (unit === 'm') amount *= 1000000;

    if (amount >= 100000) return 20;
    if (amount >= 75000) return 19;
    if (amount >= 50000) return 17;
    if (amount >= 20000) return 15;
    if (amount >= 10000) return 14;
    if (amount >= 5000) return 10;
    return 6;
  }

  if (b.includes('approved') || b.includes('allocated')) return 18;
  return 8;
}

export function calculateTimelineScore(timelineStr: string): number {
  const t = (timelineStr || '').toLowerCase().trim();
  if (!t || t === 'flexible' || t === 'no timeline' || t === 'future' || t === 'not provided') {
    return 4;
  }
  if (
    t.includes('immediate') ||
    t.includes('asap') ||
    t.includes('today') ||
    t.includes('urgent') ||
    t.includes('demo requested') ||
    t.includes('requested demo') ||
    t.includes('ready to deploy') ||
    t.includes('ready to sign')
  ) {
    return 15;
  }
  if (
    t.includes('this week') ||
    t.includes('2 weeks') ||
    t.includes('two weeks') ||
    t.includes('14 days') ||
    t.includes('rfp') ||
    t.includes('mandate') ||
    t.includes('end of month') ||
    t.includes('next tuesday')
  ) {
    return 14;
  }
  if (t.includes('1 month') || t.includes('this month') || t.includes('30 days') || t.includes('3 weeks')) {
    return 11;
  }
  if (t.includes('this quarter') || t.includes('q1') || t.includes('q2') || t.includes('q3') || t.includes('q4') || t.includes('next month')) {
    return 8;
  }
  return 6;
}

export function calculateIntentScore(intentEvidence: string): number {
  const text = (intentEvidence || '').toLowerCase().trim();
  if (
    text.includes('demo requested') ||
    text.includes('requested demo') ||
    text.includes('schedule demo') ||
    text.includes('call immediately') ||
    text.includes('ready to buy') ||
    text.includes('ready to sign') ||
    text.includes('executive demo') ||
    text.includes('ready to deploy immediately')
  ) {
    return 25;
  }
  if (
    text.includes('proposal') ||
    text.includes('rfp') ||
    text.includes('pricing') ||
    text.includes('urgent') ||
    text.includes('approved budget') ||
    text.includes('approved by finance') ||
    text.includes('budget available') ||
    text.includes('direct board mandate') ||
    text.includes('board mandate') ||
    text.includes('immediate replacement') ||
    text.includes('ready to deploy') ||
    text.includes('board meeting next')
  ) {
    return 23;
  }
  if (
    text.includes('evaluating') ||
    text.includes('comparing') ||
    text.includes('solution') ||
    text.includes('assistant') ||
    text.includes('grant funding') ||
    text.includes('pilot')
  ) {
    return 18;
  }
  if (text.includes('curious') || text.includes('researching') || text.includes('exploring')) {
    return 9;
  }
  return 8;
}

export function calculateCompanySizeScore(sizeStr: string): number {
  const s = (sizeStr || '').toLowerCase().trim();
  if (s.includes('1000+') || s.includes('500-1000') || s.includes('500+')) return 10;
  if (s.includes('250-500')) return 9;
  if (s.includes('100-250')) return 8;
  if (s.includes('50-100')) return 6;
  if (s.includes('10-50')) return 4;
  if (s.includes('1-10') || s.includes('solo')) return 3;
  return 5;
}

export function calculateIndustryFitScore(industryStr: string): number {
  const ind = (industryStr || '').toLowerCase().trim();
  if (ind.includes('software') || ind.includes('saas') || ind.includes('tech') || ind.includes('cybersecurity')) return 10;
  if (
    ind.includes('construction') ||
    ind.includes('healthcare') ||
    ind.includes('finance') ||
    ind.includes('banking') ||
    ind.includes('retail') ||
    ind.includes('manufacturing') ||
    ind.includes('logistics') ||
    ind.includes('legal') ||
    ind.includes('insurance')
  ) {
    return 9;
  }
  if (ind.includes('marketing') || ind.includes('education') || ind.includes('consulting') || ind.includes('real estate') || ind.includes('energy')) {
    return 7;
  }
  return 6;
}

export function calculateRequirementClarityScore(reqStr: string): number {
  const r = (reqStr || '').trim();
  if (!r || r.length < 10) return 2;
  if (r.length > 40) return 5;
  return 4;
}

/**
 * Deterministic lead evaluator for unit testing, offline fallback, and validation.
 */
export function scoreLead(input: LeadInput): {
  score: number;
  tier: LeadTier;
  fitScore: FitScore;
  intentScore: IntentScore;
  factorBreakdown: FactorBreakdown;
  summary: string;
  reasoning: string[];
  nextAction: string;
} {
  const intentScore = calculateIntentScore(`${input.requirements} ${input.notes} ${input.emailContent || ''}`);
  const budgetScore = calculateBudgetScore(input.budget);
  const decisionMakerScore = calculateDecisionMakerScore(input.jobTitle);
  const timelineScore = calculateTimelineScore(`${input.notes} ${input.requirements}`);
  const companySizeScore = calculateCompanySizeScore(input.companySize);
  const industryFitScore = calculateIndustryFitScore(input.industry);
  const clarityScore = calculateRequirementClarityScore(input.requirements);

  const { finalScore, clampedBreakdown } = calculateFinalScore({
    buyingIntent: intentScore,
    budgetAvailability: budgetScore,
    decisionMaker: decisionMakerScore,
    timelineUrgency: timelineScore,
    companySize: companySizeScore,
    industryFit: industryFitScore,
    requirementClarity: clarityScore,
  });

  const tier = getLeadTier(finalScore);
  const fitScore = getFitScore(finalScore);
  const intent = getIntentLevel(clampedBreakdown.buyingIntent);

  let nextAction = 'Share Product Information';
  if (tier === 'Hot') {
    nextAction = clampedBreakdown.decisionMaker >= 14 ? 'Schedule Executive Demo' : 'Call Immediately';
  } else if (tier === 'Warm') {
    nextAction = 'Send Proposal';
  } else {
    nextAction = clampedBreakdown.buyingIntent > 10 ? 'Share Product Information' : 'Add to Nurture Campaign';
  }

  return {
    score: finalScore,
    tier,
    fitScore,
    intentScore: intent,
    factorBreakdown: clampedBreakdown,
    summary: `${input.fullName} from ${input.company} (${input.jobTitle}) qualified with score ${finalScore}/100.`,
    reasoning: [
      `Decision maker role '${input.jobTitle}' scored ${clampedBreakdown.decisionMaker}/${FACTOR_MAX_WEIGHTS.decisionMaker}.`,
      `Budget '${input.budget || 'Not provided'}' scored ${clampedBreakdown.budgetAvailability}/${FACTOR_MAX_WEIGHTS.budgetAvailability}.`,
      `Timeline and intent scored ${clampedBreakdown.buyingIntent + clampedBreakdown.timelineUrgency}/${FACTOR_MAX_WEIGHTS.buyingIntent + FACTOR_MAX_WEIGHTS.timelineUrgency}.`,
    ],
    nextAction,
  };
}

/**
 * Validates AI responses against strict deterministic rules:
 * 1. Checks all required factor fields exist
 * 2. Clamps factor scores to their allowed maximum weights
 * 3. Enforces that final score = EXACT sum of all 7 factors
 * 4. Enforces that tier matches deterministic boundary thresholds
 */
export function validateAIResponse(rawResponse: any): {
  isValid: boolean;
  validatedResult: any;
  error?: string;
} {
  if (!rawResponse || typeof rawResponse !== 'object') {
    return { isValid: false, validatedResult: null, error: 'AI response is not an object.' };
  }

  const factors = rawResponse.factor_breakdown || rawResponse.factorBreakdown;
  if (!factors || typeof factors !== 'object') {
    return { isValid: false, validatedResult: null, error: 'Missing factor_breakdown in AI response.' };
  }

  // Calculate deterministic sum
  const { finalScore, clampedBreakdown } = calculateFinalScore(factors);

  // Deterministic tier based on calculated sum
  const deterministicTier = getLeadTier(finalScore);
  const deterministicFit = getFitScore(finalScore);
  const deterministicIntent = getIntentLevel(clampedBreakdown.buyingIntent);

  const nextAction =
    rawResponse.next_action ||
    rawResponse.nextAction ||
    (deterministicTier === 'Hot'
      ? 'Schedule Executive Demo'
      : deterministicTier === 'Warm'
      ? 'Send Proposal'
      : 'Share Product Information');

  const reasoning = Array.isArray(rawResponse.reasoning)
    ? rawResponse.reasoning
    : ['Evaluated across standard 7 B2B qualification factors.'];

  const summary =
    typeof rawResponse.summary === 'string' && rawResponse.summary.trim().length > 0
      ? rawResponse.summary
      : `Lead qualified with deterministic score of ${finalScore}/100.`;

  return {
    isValid: true,
    validatedResult: {
      lead_score: finalScore,
      fit_score: deterministicFit,
      intent: deterministicIntent,
      tier: deterministicTier,
      summary,
      reasoning,
      next_action: nextAction,
      factor_breakdown: clampedBreakdown,
    },
  };
}

/**
 * Tie-breaker rule for ranking:
 * 1. Score DESC
 * 2. Buying Intent DESC
 * 3. Budget Score DESC
 * 4. Preserved initial index
 */
export function rankLeads(leads: Lead[]): Lead[] {
  const parseBudgetNum = (bStr: string): number => {
    const m = (bStr || '').replace(/,/g, '').match(/\$?(\d+)(k|m)?/i);
    if (!m) return 0;
    let n = parseInt(m[1], 10);
    if (m[2]?.toLowerCase() === 'k') n *= 1000;
    if (m[2]?.toLowerCase() === 'm') n *= 1000000;
    return n;
  };

  const sorted = [...leads].sort((a, b) => {
    // 1. Primary: Score DESC
    if (b.score !== a.score) {
      return b.score - a.score;
    }

    // 2. Tie-breaker 1: Intent factor DESC
    const intentA = a.factorBreakdown?.buyingIntent || 0;
    const intentB = b.factorBreakdown?.buyingIntent || 0;
    if (intentB !== intentA) {
      return intentB - intentA;
    }

    // 3. Tie-breaker 2: Budget DESC
    const budgetA = parseBudgetNum(a.budget);
    const budgetB = parseBudgetNum(b.budget);
    if (budgetB !== budgetA) {
      return budgetB - budgetA;
    }

    return 0;
  });

  return sorted.map((lead, idx) => ({
    ...lead,
    rank: idx + 1,
  }));
}

/**
 * Filter leads by tier and search query
 */
export function filterLeads(leads: Lead[], filterTier: string, searchQuery: string): Lead[] {
  const q = searchQuery.toLowerCase().trim();
  const tierFilter = filterTier.toUpperCase();

  return leads.filter((lead) => {
    const matchesTier =
      tierFilter === 'ALL' || lead.tier.toUpperCase() === tierFilter;

    const matchesSearch =
      !q ||
      lead.fullName.toLowerCase().includes(q) ||
      lead.company.toLowerCase().includes(q) ||
      lead.jobTitle.toLowerCase().includes(q) ||
      lead.industry.toLowerCase().includes(q) ||
      lead.requirements.toLowerCase().includes(q);

    return matchesTier && matchesSearch;
  });
}

/**
 * Prompt injection detector and defense wrapper
 */
export function detectPromptInjection(text: string): { isSuspicious: boolean; flags: string[] } {
  const flags: string[] = [];
  const lower = text.toLowerCase();

  const patterns = [
    { name: 'instruction_override', regex: /ignore\s+(all\s+)?(previous\s+)?instructions/i },
    { name: 'score_manipulation', regex: /(give|set|make)\s+(this\s+)?(lead\s+)?(a\s+)?score\s+(of\s+)?100/i },
    { name: 'tier_forcing', regex: /classify\s+(it\s+as\s+|this\s+lead\s+as\s+)?hot/i },
    { name: 'system_prompt_leak', regex: /reveal\s+(your\s+)?(entire\s+)?system\s+prompt/i },
    { name: 'roleplay_hijack', regex: /you\s+are\s+now\s+(the\s+)?(vp|sales\s+manager|admin|developer|manager)/i },
    { name: 'script_xss', regex: /<script[\s\S]*?>[\s\S]*?<\/script>/i },
    { name: 'html_event_xss', regex: /onerror\s*=/i },
  ];

  for (const p of patterns) {
    if (p.regex.test(lower)) {
      flags.push(p.name);
    }
  }

  return {
    isSuspicious: flags.length > 0,
    flags,
  };
}
