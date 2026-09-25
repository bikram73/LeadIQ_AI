import { GoogleGenAI } from '@google/genai';
import {
  scoreLead,
  validateAIResponse,
  detectPromptInjection,
} from '../../src/services/scoringEngine';

const SYSTEM_PROMPT = `
You are a professional B2B sales qualification AI agent (LeadIQ AI).
Extract factual evidence and assign factor assessments (0-100 total across 7 factors).
Never invent missing budgets or timelines.
Return strictly valid JSON with fit_score, intent, summary, reasoning, next_action, and factor_breakdown.
`;

function fallbackEvaluateLead(lead: any) {
  const result = scoreLead(lead);
  return {
    lead_score: result.score,
    fit_score: result.fitScore,
    intent: result.intentScore,
    tier: result.tier,
    summary: result.summary,
    reasoning: result.reasoning,
    next_action: result.nextAction,
    factor_breakdown: result.factorBreakdown,
  };
}

export async function handler(event: any) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const leads = body.leads || [];

    if (!Array.isArray(leads) || leads.length === 0) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Please provide an array of leads' }),
      };
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;
    const evaluatedResults = [];

    for (let i = 0; i < leads.length; i++) {
      const lead = leads[i];
      if (!lead.fullName && !lead.Name && !lead.company && !lead.Company) {
        continue;
      }

      if (ai) {
        try {
          const leadPrompt = `
LEAD PROFILE TO QUALIFY (${i + 1}/${leads.length}):
- Name: ${lead.fullName || lead.Name || 'Not provided'}
- Company: ${lead.company || lead.Company || 'Not provided'}
- Industry: ${lead.industry || lead.Industry || 'General B2B'}
- Job Title: ${lead.jobTitle || lead.Role || 'Not established'}
- Company Size: ${lead.companySize || lead['Company Size'] || 'Not provided'}
- Budget: ${lead.budget || lead.Budget || 'Not provided'}
- Location: ${lead.location || lead.Location || 'Not provided'}
- Requirements: ${lead.requirements || lead.Requirements || 'General Inquiry'}
- Notes: ${lead.notes || lead.Notes || ''}
`;
          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: [
              { role: 'user', parts: [{ text: SYSTEM_PROMPT }, { text: leadPrompt }] },
            ],
            config: { responseMimeType: 'application/json' },
          });
          const parsed = JSON.parse(response.text || '{}');
          const validated = validateAIResponse(parsed);
          evaluatedResults.push(validated.isValid ? validated.validatedResult : fallbackEvaluateLead(lead));
        } catch {
          evaluatedResults.push(fallbackEvaluateLead(lead));
        }
      } else {
        evaluatedResults.push(fallbackEvaluateLead(lead));
      }
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, results: evaluatedResults }),
    };
  } catch (error: any) {
    console.error('Netlify analyze-csv error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message }),
    };
  }
}
