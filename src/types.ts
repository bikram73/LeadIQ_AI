export type NavTab = 'home' | 'analyzer' | 'dashboard' | 'scoring-logic' | 'about';

export type LeadTier = 'Hot' | 'Warm' | 'Cold' | 'Very Low';
export type FitScore = 'Excellent' | 'Good' | 'Average' | 'Poor';
export type IntentScore = 'High' | 'Medium' | 'Low';

export interface FactorBreakdown {
  budgetAvailability: number; // max 20
  buyingIntent: number;       // max 25
  companySize: number;        // max 10
  decisionMaker: number;      // max 15
  timelineUrgency: number;    // max 15
  industryFit: number;        // max 10
  requirementClarity: number; // max 5
}

export interface LeadInput {
  fullName: string;
  company: string;
  industry: string;
  jobTitle: string;
  companySize: string;
  budget: string;
  location: string;
  requirements: string;
  notes: string;
  emailContent?: string;
  email?: string;
}

export interface Lead extends LeadInput {
  id: string;
  rank: number;
  score: number; // 0-100
  fitScore: FitScore;
  intentScore: IntentScore;
  tier: LeadTier;
  summary: string;
  reasoning: string[];
  nextAction: string;
  factorBreakdown: FactorBreakdown;
  avatarInitials: string;
  avatarBg: string;
  avatarTextColor: string;
  createdAt: string;
}

export interface AnalyzeSingleRequest {
  lead: LeadInput;
}

export interface AnalyzeCsvRequest {
  leads: LeadInput[];
}
