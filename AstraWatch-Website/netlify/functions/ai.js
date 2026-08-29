exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'POST required' };
  if (!process.env.ANTHROPIC_API_KEY && !process.env.OPENAI_API_KEY) return { statusCode: 503, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'AI is not configured. Add ANTHROPIC_API_KEY in Netlify environment variables.' }) };
  try {
    const { question = '' } = JSON.parse(event.body || '{}');
    const anthropic = Boolean(process.env.ANTHROPIC_API_KEY);
    const response = anthropic ? await fetch('https://api.anthropic.com/v1/messages', { method:'POST', headers:{'x-api-key':process.env.ANTHROPIC_API_KEY,'anthropic-version':'2023-06-01','Content-Type':'application/json'}, body:JSON.stringify({model:'claude-3-5-haiku-latest',max_tokens:450,system:'You are Aapda Buddy AI, a concise disaster-information assistant. Be calm and safety-first. Never invent live alerts; tell users to verify NDMA, NCS, INCOIS or USGS sources.',messages:[{role:'user',content:String(question).slice(0,2000)}]}) }) : await fetch('https://api.openai.com/v1/responses', { method: 'POST', headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: 'gpt-5-mini', instructions: 'You are Aapda Buddy AI, a concise disaster-information assistant. Be calm and safety-first. Never invent live alerts; tell users to verify NDMA, NCS, INCOIS or USGS sources.', input: String(question).slice(0, 2000), max_output_tokens: 450 }) });
    if (!response.ok) throw new Error(`OpenAI ${response.status}`);
    const data = await response.json();
    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ answer: anthropic ? (data.content?.[0]?.text || 'AI returned no text.') : (data.output_text || 'AI returned no text.') }) };
  } catch { return { statusCode: 502, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'The AI service is temporarily unavailable.' }) }; }
};
