export async function handler() {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'ok', model: 'gemini-3.8-flash', app: 'LeadIQ AI' }),
  };
}
