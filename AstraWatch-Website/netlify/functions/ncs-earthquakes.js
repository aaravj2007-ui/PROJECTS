const RISEQ_EARTHQUAKES = 'https://riseq.seismo.gov.in/riseq/earthquake';

exports.handler = async () => {
  try {
    const response = await fetch(RISEQ_EARTHQUAKES, { headers: { 'User-Agent': 'AapdaBuddy/1.0' } });
    if (!response.ok) throw new Error(`RISEQ returned ${response.status}`);
    const page = await response.text();
    const records = [...page.matchAll(/data-json='([^']+)'/g)].map(match => JSON.parse(match[1]));
    const events = records.map(record => { const eventMatch = String(record.event_name || '').match(/M:\s*([\d.]+)\s*-\s*(.+)/); const coordinates = String(record.lat_long || '').split(',').map(Number); const depthMatch = String(record.magnitude_depth || '').match(/D:\s*([\d.]+)/); if (!eventMatch || coordinates.length !== 2 || coordinates.some(value => !Number.isFinite(value))) return null; return { origin_time: record.origin_time || 'Unknown', latitude: coordinates[0], longitude: coordinates[1], depth_km: depthMatch ? Number(depthMatch[1]) : null, magnitude: Number(eventMatch[1]), location: eventMatch[2].trim(), detail: RISEQ_EARTHQUAKES, source: 'National Centre for Seismology RISEQ' }; }).filter(Boolean).slice(0, 20);
    return { statusCode: 200, headers: { 'content-type': 'application/json', 'cache-control': 'public, max-age=300' }, body: JSON.stringify(events) };
  } catch (error) {
    return { statusCode: 502, headers: { 'content-type': 'application/json' }, body: JSON.stringify({ error: 'RISEQ earthquake feed is temporarily unavailable.' }) };
  }
};
