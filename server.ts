import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy initialiser for Gemini AI client
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

const SYSTEM_PROMPT = `
You are a professional B2B sales qualification AI assistant (LeadIQ AI).
Analyze the provided lead details carefully and evaluate them based on standard B2B qualification criteria.

Evaluation Factor Weights:
1. Buying Intent (25%)
2. Budget Availability (20%)
3. Decision Maker Involvement / Role Authority (15%)
4. Timeline / Urgency (15%)
5. Company Size (10%)
6. Industry Fit (10%)
7. Requirement Clarity (5%)

Score Interpretation:
- 90–100: Hot Lead (Tier: Hot, Next Action: "Schedule Executive Demo" or "Call Immediately")
- 70–89: Warm Lead (Tier: Warm, Next Action: "Send Proposal" or "Schedule Demo")
- 40–69: Cold Lead (Tier: Cold, Next Action: "Share Product Information" or "Send Nurture Email")
- 0–39: Very Low Priority (Tier: Very Low, Next Action: "Add to Nurture Campaign" or "Archive / Monitor")

Fit Scores: "Excellent", "Good", "Average", "Poor"
Intent Scores: "High", "Medium", "Low"
Tiers: "Hot", "Warm", "Cold", "Very Low"

You MUST return strictly valid JSON matching this exact structure with no extra text or markdown codeblocks:
{
  "lead_score": 92,
  "fit_score": "Excellent",
  "intent": "High",
  "tier": "Hot",
  "summary": "Concise 2-sentence summary of lead status and capability requirement",
  "reasoning": [
    "Key reason 1 regarding budget / authority",
    "Key reason 2 regarding intent / timeline",
    "Key reason 3 regarding industry / fit"
  ],
  "next_action": "Call Immediately",
  "factor_breakdown": {
    "budgetAvailability": 20,
    "buyingIntent": 25,
    "companySize": 9,
    "decisionMaker": 14,
    "timelineUrgency": 14,
    "industryFit": 8,
    "requirementClarity": 4
  }
}
`;

// Helper fallback evaluator when GEMINI_API_KEY is not set or network fails
function fallbackEvaluateLead(lead: any) {
  let score = 50;
  const text = `${lead.fullName || ''} ${lead.jobTitle || lead.role || ''} ${lead.company || ''} ${lead.industry || ''} ${lead.budget || ''} ${lead.requirements || ''} ${lead.notes || ''} ${lead.emailContent || ''}`.toLowerCase();

  let budgetScore = 10;
  if (text.includes('$100') || text.includes('$120') || text.includes('100k') || text.includes('120,000') || text.includes('approved')) {
    budgetScore = 20;
    score += 25;
  } else if (text.includes('$80') || text.includes('$50') || text.includes('80,000') || text.includes('50k')) {
    budgetScore = 17;
    score += 20;
  } else if (text.includes('$15') || text.includes('15,000') || text.includes('budget available')) {
    budgetScore = 14;
    score += 15;
  } else if (text.includes('unknown') || text.includes('not decided') || text.includes('no budget')) {
    budgetScore = 5;
  }

  let decisionMakerScore = 8;
  if (text.includes('ceo') || text.includes('cto') || text.includes('c-level') || text.includes('vp') || text.includes('founder') || text.includes('director') || text.includes('head')) {
    decisionMakerScore = 14;
    score += 20;
  }

  let urgencyScore = 7;
  if (text.includes('2 weeks') || text.includes('urgent') || text.includes('this week') || text.includes('immediately') || text.includes('demo requested')) {
    urgencyScore = 14;
    score += 15;
  }

  score = Math.min(Math.max(score, 35), 98);

  let tier = 'Cold';
  let fitScore = 'Average';
  let intent = 'Medium';
  let nextAction = 'Share Product Information';

  if (score >= 90) {
    tier = 'Hot';
    fitScore = 'Excellent';
    intent = 'High';
    nextAction = 'Schedule Executive Demo';
  } else if (score >= 70) {
    tier = 'Warm';
    fitScore = 'Good';
    intent = 'High';
    nextAction = 'Send Proposal';
  } else if (score >= 40) {
    tier = 'Cold';
    fitScore = 'Average';
    intent = 'Medium';
    nextAction = 'Share Product Information';
  } else {
    tier = 'Very Low';
    fitScore = 'Poor';
    intent = 'Low';
    nextAction = 'Add to Nurture Campaign';
  }

  return {
    lead_score: score,
    fit_score: fitScore,
    intent: intent,
    tier: tier,
    summary: `${lead.fullName || 'Lead'} from ${lead.company || 'Company'} expressed requirement for ${lead.requirements || 'AI solution'}.`,
    reasoning: [
      `Job role '${lead.jobTitle || lead.role || 'Contact'}' indicates ${decisionMakerScore > 10 ? 'high decision authority' : 'standard team level'}.`,
      `Budget estimate '${lead.budget || 'Unspecified'}' indicates ${budgetScore > 12 ? 'strong purchasing power' : 'exploratory budget'}.`,
      `Timeline & notes indicate ${urgencyScore > 10 ? 'urgent purchase intent' : 'flexible timeline'}.`
    ],
    next_action: nextAction,
    factor_breakdown: {
      budgetAvailability: budgetScore,
      buyingIntent: Math.round(score * 0.25),
      companySize: 8,
      decisionMaker: decisionMakerScore,
      timelineUrgency: urgencyScore,
      industryFit: 8,
      requirementClarity: 4
    }
  };
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', model: 'gemini-3.8-flash', app: 'LeadIQ AI' });
});

// Analyze Single Lead Endpoint
app.post('/api/analyze', async (req, res) => {
  try {
    const lead = req.body.lead || req.body;
    const ai = getGenAI();

    if (!ai) {
      console.log('Gemini API key not configured, using smart fallback evaluator');
      const fallbackResult = fallbackEvaluateLead(lead);
      return res.json({ success: true, result: fallbackResult, source: 'fallback' });
    }

    const leadPrompt = `
LEAD PROFILE TO QUALIFY:
- Name: ${lead.fullName || 'Unknown'}
- Company: ${lead.company || 'Unknown'}
- Industry: ${lead.industry || 'General B2B'}
- Job Title / Role: ${lead.jobTitle || lead.role || 'Contact'}
- Company Size: ${lead.companySize || 'Unspecified'}
- Budget: ${lead.budget || 'Unspecified'}
- Location: ${lead.location || 'Global'}
- Requirements: ${lead.requirements || 'AI Solution Inquiry'}
- Notes: ${lead.notes || 'None'}
- Raw Email Content: ${lead.emailContent || 'None'}

Please evaluate this lead against B2B sales criteria and return strictly the JSON structure requested.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        { role: 'user', parts: [{ text: SYSTEM_PROMPT }, { text: leadPrompt }] }
      ],
      config: {
        responseMimeType: 'application/json'
      }
    });

    const responseText = response.text;
    let jsonResult;
    try {
      jsonResult = JSON.parse(responseText || '{}');
    } catch (e) {
      jsonResult = fallbackEvaluateLead(lead);
    }

    return res.json({ success: true, result: jsonResult, source: 'gemini-3.8-flash' });
  } catch (error: any) {
    console.error('Error analyzing lead with Gemini:', error);
    const fallbackResult = fallbackEvaluateLead(req.body.lead || req.body);
    return res.json({ success: true, result: fallbackResult, source: 'fallback', error: error.message });
  }
});

// Analyze Bulk Leads Endpoint
app.post('/api/analyze-csv', async (req, res) => {
  try {
    const leads = req.body.leads || [];
    if (!Array.isArray(leads) || leads.length === 0) {
      return res.status(400).json({ error: 'Please provide an array of leads' });
    }

    const ai = getGenAI();
    const evaluatedResults = [];

    for (let i = 0; i < leads.length; i++) {
      const lead = leads[i];
      if (ai) {
        try {
          const leadPrompt = `
LEAD PROFILE TO QUALIFY (${i + 1}/${leads.length}):
- Name: ${lead.fullName || lead.Name || 'Unknown'}
- Company: ${lead.company || lead.Company || 'Unknown'}
- Industry: ${lead.industry || lead.Industry || 'General B2B'}
- Job Title: ${lead.jobTitle || lead.Role || 'Contact'}
- Company Size: ${lead.companySize || lead['Company Size'] || 'Unspecified'}
- Budget: ${lead.budget || lead.Budget || 'Unspecified'}
- Location: ${lead.location || lead.Location || 'Global'}
- Requirements: ${lead.requirements || lead.Requirements || 'AI Solution'}
- Notes: ${lead.notes || lead.Notes || ''}
`;
          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: [
              { role: 'user', parts: [{ text: SYSTEM_PROMPT }, { text: leadPrompt }] }
            ],
            config: { responseMimeType: 'application/json' }
          });
          const parsed = JSON.parse(response.text || '{}');
          evaluatedResults.push(parsed);
        } catch (err) {
          evaluatedResults.push(fallbackEvaluateLead(lead));
        }
      } else {
        evaluatedResults.push(fallbackEvaluateLead(lead));
      }
    }

    return res.json({ success: true, results: evaluatedResults });
  } catch (error: any) {
    console.error('Error batch analyzing CSV:', error);
    return res.status(500).json({ error: error.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LeadIQ AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
