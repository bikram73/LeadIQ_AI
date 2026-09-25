import { Lead } from '../types';

export const SAMPLE_PRD_LEADS: Lead[] = [
  {
    id: 'prd-lead-5',
    rank: 1,
    fullName: 'David Brown',
    company: 'BuildPro',
    industry: 'Construction',
    jobTitle: 'CEO',
    companySize: '500-1000',
    budget: '$120,000',
    location: 'Dallas, TX',
    requirements: 'Enterprise AI Assistant',
    notes: 'CEO requested demo directly. Large deployment scope with high budget commitment.',
    email: 'david.brown@buildpro.com',
    emailContent: `From: David Brown <david.brown@buildpro.com>
To: sales@leadiq.ai
Subject: Urgent Request: Enterprise AI Assistant for BuildPro Executive & Field Operations

Hi LeadIQ Team,

I am David Brown, CEO of BuildPro. We are an enterprise construction management firm with 750 employees headquartered in Dallas, TX. 

Our leadership team is urgently evaluating vendor solutions for an Enterprise AI Assistant to optimize communications and workflows across both our job sites and executive management. Our board has approved a dedicated budget of $120,000 for this deployment.

Given our immediate rollout schedule for next month, I would like to schedule a 30-minute executive briefing and technical demo with your enterprise solutions team. Please let me know your availability for this Thursday or Friday.

Best regards,
David Brown
Chief Executive Officer, BuildPro
Dallas, TX | david.brown@buildpro.com`,
    score: 97,
    fitScore: 'Excellent',
    intentScore: 'High',
    tier: 'Hot',
    summary: 'BuildPro CEO requested an enterprise AI assistant with a $120k budget and immediate executive sponsorship.',
    reasoning: [
      'High budget ($120,000) well above average enterprise tier',
      'Direct C-level decision maker (CEO) leading the evaluation',
      'Urgent timeline with clear project requirements',
      'Strong organizational fit with high seat expansion potential'
    ],
    nextAction: 'Schedule Executive Demo',
    factorBreakdown: {
      budgetAvailability: 20,
      buyingIntent: 25,
      companySize: 9,
      decisionMaker: 15,
      timelineUrgency: 14,
      industryFit: 9,
      requirementClarity: 5
    },
    avatarInitials: 'DB',
    avatarBg: 'bg-[#006b2c]/10',
    avatarTextColor: 'text-[#006b2c]',
    createdAt: '2026-07-27'
  },
  {
    id: 'prd-lead-1',
    rank: 2,
    fullName: 'John Carter',
    company: 'TechNova',
    industry: 'Software',
    jobTitle: 'VP of Customer Success',
    companySize: '250-500',
    budget: '$80,000',
    location: 'San Francisco, CA',
    requirements: 'AI Customer Support Automation',
    notes: 'Need solution in 2 weeks. Budget available and approved by finance.',
    email: 'jcarter@technova.io',
    emailContent: `From: John Carter <jcarter@technova.io>
To: sales@leadiq.ai
Subject: Urgent Inquiry: AI Customer Support Automation

Hi LeadIQ Team,

We are looking to implement an AI Customer Support Automation platform at TechNova within the next 2 weeks. Our finance team has approved an initial budget of $80,000 for this project. As VP of Customer Success, I would like to schedule a call to review your capabilities and technical security.

Best regards,
John Carter
VP of Customer Success, TechNova
San Francisco, CA | jcarter@technova.io`,
    score: 92,
    fitScore: 'Excellent',
    intentScore: 'High',
    tier: 'Hot',
    summary: 'TechNova requires AI support automation within 2 weeks with an approved $80k budget.',
    reasoning: [
      'Verified $80k budget allocated and ready',
      'High urgency with 2-week implementation deadline',
      'VP level decision maker involved in evaluation',
      'Ideal SaaS industry alignment and clear automation requirements'
    ],
    nextAction: 'Call Immediately',
    factorBreakdown: {
      budgetAvailability: 19,
      buyingIntent: 24,
      companySize: 8,
      decisionMaker: 14,
      timelineUrgency: 15,
      industryFit: 10,
      requirementClarity: 5
    },
    avatarInitials: 'JC',
    avatarBg: 'bg-[#10B981]/10',
    avatarTextColor: 'text-[#10B981]',
    createdAt: '2026-07-27'
  },
  {
    id: 'prd-lead-3',
    rank: 3,
    fullName: 'Michael Ross',
    company: 'RetailMax',
    industry: 'Retail',
    jobTitle: 'Head of E-Commerce',
    companySize: '100-250',
    budget: '$15,000',
    location: 'Chicago, IL',
    requirements: 'Inventory chatbot & order tracking',
    notes: 'Need proposal this week to present to leadership team.',
    email: 'mross@retailmax.com',
    emailContent: `From: Michael Ross <mross@retailmax.com>
To: sales@leadiq.ai
Subject: Request for Proposal: RetailMax Inventory Chatbot & Order Tracking

Hi LeadIQ Team,

I am Michael Ross, Head of E-Commerce at RetailMax (150 employees in Chicago). We are looking to deploy an automated inventory chatbot and order tracking system for our online retail operations. 

We have an approved pilot budget of $15,000 and need a formal proposal and quote this week so I can present it to our leadership committee on Monday.

Looking forward to your swift response.

Best regards,
Michael Ross
Head of E-Commerce, RetailMax
Chicago, IL | mross@retailmax.com`,
    score: 81,
    fitScore: 'Good',
    intentScore: 'High',
    tier: 'Warm',
    summary: 'RetailMax seeks inventory chatbot automation with a $15k budget, requiring a formal proposal this week.',
    reasoning: [
      'Active intent with immediate proposal request',
      'Defined $15k budget for initial pilot project',
      'Head of E-Commerce holds purchasing authority',
      'E-commerce retail expansion alignment'
    ],
    nextAction: 'Send Proposal',
    factorBreakdown: {
      budgetAvailability: 15,
      buyingIntent: 22,
      companySize: 7,
      decisionMaker: 13,
      timelineUrgency: 13,
      industryFit: 7,
      requirementClarity: 4
    },
    avatarInitials: 'MR',
    avatarBg: 'bg-[#006b5f]/10',
    avatarTextColor: 'text-[#006b5f]',
    createdAt: '2026-07-27'
  },
  {
    id: 'prd-lead-2',
    rank: 4,
    fullName: 'Sarah Lee',
    company: 'HealthPlus',
    industry: 'Healthcare',
    jobTitle: 'Innovation Specialist',
    companySize: '50-100',
    budget: 'Unknown',
    location: 'Boston, MA',
    requirements: 'Exploring automation options',
    notes: 'Just researching options for future quarters.',
    email: 'sarah.lee@healthplus.org',
    emailContent: `From: Sarah Lee <sarah.lee@healthplus.org>
To: info@leadiq.ai
Subject: Exploratory Inquiry: Healthcare AI Automation Options

Hi LeadIQ Team,

My name is Sarah Lee, Innovation Specialist at HealthPlus. We are currently exploring potential automation solutions for patient inquiry workflows in upcoming quarters. 

We are in the preliminary research phase and do not have an approved budget or immediate implementation timeline yet. Could you share some product overview brochures, compliance documentation (HIPAA), and case studies?

Thanks,
Sarah Lee
Innovation Specialist, HealthPlus
Boston, MA | sarah.lee@healthplus.org`,
    score: 58,
    fitScore: 'Average',
    intentScore: 'Medium',
    tier: 'Cold',
    summary: 'HealthPlus is conducting exploratory research into AI automation without confirmed budget or immediate timeline.',
    reasoning: [
      'Exploratory phase without allocated budget',
      'Mid-level specialist lacking direct buying authority',
      'Unclear project timeline for upcoming quarters',
      'Requires educational material and product information'
    ],
    nextAction: 'Share Product Information',
    factorBreakdown: {
      budgetAvailability: 8,
      buyingIntent: 14,
      companySize: 6,
      decisionMaker: 8,
      timelineUrgency: 8,
      industryFit: 9,
      requirementClarity: 3
    },
    avatarInitials: 'SL',
    avatarBg: 'bg-[#EAB308]/10',
    avatarTextColor: 'text-[#B45309]',
    createdAt: '2026-07-27'
  },
  {
    id: 'prd-lead-4',
    rank: 5,
    fullName: 'Emma Wilson',
    company: 'CreativeAds',
    industry: 'Marketing',
    jobTitle: 'Marketing Assistant',
    companySize: '10-50',
    budget: 'Not decided',
    location: 'Austin, TX',
    requirements: 'Curious about AI capabilities',
    notes: 'No timeline. Casual inquiry from contact form.',
    email: 'emma@creativeads.co',
    emailContent: `From: Emma Wilson <emma@creativeads.co>
To: hello@leadiq.ai
Subject: Curious about AI capabilities

Hi there,

I came across LeadIQ on LinkedIn and was curious about what your AI tool does. We are a small creative marketing agency (about 25 people). 

We have not decided on any budget or timeline yet, just wanted to check if you have any free tier or introductory materials to look at.

Thanks,
Emma Wilson
Marketing Assistant, CreativeAds
Austin, TX | emma@creativeads.co`,
    score: 42,
    fitScore: 'Poor',
    intentScore: 'Low',
    tier: 'Cold',
    summary: 'CreativeAds submitted a casual inquiry with no timeline, budget, or buying decision maker.',
    reasoning: [
      'No budget or purchasing timeline defined',
      'Junior role with minimal purchasing authority',
      'Low buying intent and vague requirements',
      'Best suited for general newsletter email nurture'
    ],
    nextAction: 'Add to Nurture Campaign',
    factorBreakdown: {
      budgetAvailability: 5,
      buyingIntent: 9,
      companySize: 4,
      decisionMaker: 5,
      timelineUrgency: 5,
      industryFit: 8,
      requirementClarity: 2
    },
    avatarInitials: 'EW',
    avatarBg: 'bg-[#94A3B8]/10',
    avatarTextColor: 'text-[#64748B]',
    createdAt: '2026-07-27'
  }
];

export function getSampleEmailText(lead: Partial<Lead>): string {
  if (lead.emailContent) {
    return lead.emailContent;
  }
  const match = SAMPLE_PRD_LEADS.find(
    (s) => s.id === lead.id || s.fullName.toLowerCase() === (lead.fullName || '').toLowerCase()
  );
  if (match && match.emailContent) {
    return match.emailContent;
  }
  return `From: ${lead.fullName || 'Prospective Lead'} <${lead.email || 'lead@company.com'}>
To: sales@leadiq.ai
Subject: Inquiry regarding ${lead.requirements || 'AI Qualification Platform'} - ${lead.company || 'Enterprise'}

Hi LeadIQ Team,

I am ${lead.fullName || 'Lead'}, ${lead.jobTitle || 'Representative'} at ${lead.company || 'Company'}. 
We are looking for solutions regarding ${lead.requirements || 'AI automation'}. 

Budget: ${lead.budget || 'In evaluation'}
Notes: ${lead.notes || 'Inquiry from platform'}

Best regards,
${lead.fullName || 'Lead'}
${lead.company || ''}`;
}
