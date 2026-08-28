const ACTIVE_SATELLITES = 'https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=json';

exports.handler = async () => {
  try {
    const response = await fetch(ACTIVE_SATELLITES, { headers: { 'User-Agent': 'AapdaBuddy/1.0' } });
    if (!response.ok) throw new Error(`CelesTrak returned ${response.status}`);
    const satellites = await response.json();
    return {
      statusCode: 200,
      headers: { 'content-type': 'application/json', 'cache-control': 'public, max-age=900' },
      body: JSON.stringify({
        satellites_monitored: Array.isArray(satellites) ? satellites.length : null,
        land_observed_today: null,
        model_confidence: null,
        sources: {
          satellites: 'CelesTrak active satellite catalog',
          land: 'No area-coverage product is configured',
          model: 'No trained model evaluation artifact is available'
        }
      })
    };
  } catch (error) {
    return { statusCode: 502, headers: { 'content-type': 'application/json' }, body: JSON.stringify({ error: 'Live dashboard metrics are temporarily unavailable.' }) };
  }
};
