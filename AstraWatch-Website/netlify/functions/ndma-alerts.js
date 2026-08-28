const NDMA_FEED = 'https://sachet.ndma.gov.in/cap_public_website/FetchAllAlertDetails';

exports.handler = async () => {
  try {
    const response = await fetch(NDMA_FEED, { headers: { 'User-Agent': 'AapdaBuddy/1.0' } });
    if (!response.ok) throw new Error(`NDMA returned ${response.status}`);
    const alerts = await response.json();
    return { statusCode: 200, headers: { 'content-type': 'application/json', 'cache-control': 'public, max-age=60' }, body: JSON.stringify(alerts) };
  } catch (error) {
    return { statusCode: 502, headers: { 'content-type': 'application/json' }, body: JSON.stringify({ error: 'NDMA public alert feed is temporarily unavailable.' }) };
  }
};
