import { validateLeadInput } from '../../src/services/scoringEngine';

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
    const lead = body.lead || body;
    const validation = validateLeadInput(lead);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validation),
    };
  } catch (err: any) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isValid: false, errors: [{ field: 'general', message: err.message }] }),
    };
  }
}
