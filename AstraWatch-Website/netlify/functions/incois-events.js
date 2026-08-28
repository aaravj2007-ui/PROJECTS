const INCOIS_EVENTS = 'https://tsunami.incois.gov.in/itews/DSSProducts/OPR/past90days.json';

exports.handler = async () => {
  try {
    const response = await fetch(INCOIS_EVENTS, { headers: { 'User-Agent': 'AapdaBuddy/1.0' } });
    if (!response.ok) throw new Error(`INCOIS returned ${response.status}`);
    const data = await response.json();
    return { statusCode: 200, headers: { 'content-type': 'application/json', 'cache-control': 'public, max-age=300' }, body: JSON.stringify(data) };
  } catch (error) {
    return { statusCode: 502, headers: { 'content-type': 'application/json' }, body: JSON.stringify({ error: 'INCOIS tsunami feed is temporarily unavailable.' }) };
  }
};
