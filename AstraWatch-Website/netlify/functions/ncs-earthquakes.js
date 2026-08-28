const USGS_RECENT = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

exports.handler = async () => {
  try {
    const response = await fetch(USGS_RECENT, { headers: { 'User-Agent': 'AapdaBuddy/1.0' } });
    if (!response.ok) throw new Error(`USGS returned ${response.status}`);
    const feed = await response.json();
    const events = (Array.isArray(feed.features) ? feed.features : []).map(feature => {
      const properties = feature.properties || {};
      const coordinates = feature.geometry && Array.isArray(feature.geometry.coordinates) ? feature.geometry.coordinates : [];
      return { origin_time: properties.time ? new Date(properties.time).toISOString() : 'Unknown', latitude: coordinates[1], longitude: coordinates[0], depth_km: coordinates[2], magnitude: properties.mag, location: properties.place || 'Unknown location', detail: properties.url, source: 'USGS Earthquake Hazards Program' };
    }).filter(event => event.magnitude !== null && event.magnitude !== undefined && Number.isFinite(Number(event.latitude)) && Number.isFinite(Number(event.longitude))).slice(0, 20);
    return { statusCode: 200, headers: { 'content-type': 'application/json', 'cache-control': 'public, max-age=300' }, body: JSON.stringify(events) };
  } catch (error) {
    return { statusCode: 502, headers: { 'content-type': 'application/json' }, body: JSON.stringify({ error: 'USGS public earthquake feed is temporarily unavailable.' }) };
  }
};
