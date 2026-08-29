exports.handler = async (event) => {
  const allowed = ['starttime', 'endtime', 'minmagnitude', 'maxmagnitude', 'latitude', 'longitude', 'maxradiuskm'];
  const params = new URLSearchParams({ format: 'geojson', limit: '200', orderby: 'time-desc' });
  for (const key of allowed) if (event.queryStringParameters?.[key]) params.set(key, event.queryStringParameters[key]);
  try {
    const response = await fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?${params}`);
    if (!response.ok) throw new Error(`USGS ${response.status}`);
    return { statusCode: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }, body: await response.text() };
  } catch (error) {
    return { statusCode: 502, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'USGS historical disaster search is temporarily unavailable.' }) };
  }
};
