(() => {
  const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));

  function addStyles() {
    const style = document.createElement('style');
    style.textContent = `.satellite-section{padding:0 0 38px}.satellite-panel{border:1px solid var(--line);background:rgba(13,49,93,.78);padding:22px}.satellite-summary{display:flex;align-items:end;justify-content:space-between;gap:20px;margin-bottom:18px}.satellite-count{font:800 38px Manrope,Arial,sans-serif;color:#fff}.satellite-copy{max-width:500px;color:var(--mute);font-size:12px;line-height:1.6}.satellite-copy a{color:#ffd18d}.satellite-table{width:100%;border-collapse:collapse;font-size:11px}.satellite-table th{color:#9cc2e6;text-align:left;font:9px DM Mono,monospace;letter-spacing:.8px;text-transform:uppercase;padding:10px 8px;border-bottom:1px solid var(--line)}.satellite-table td{padding:11px 8px;border-bottom:1px solid var(--line);color:#dcecff}.satellite-table td:first-child{color:#fff;font-weight:800}.satellite-table td small{display:block;color:var(--mute);margin-top:3px}.satellite-table a{color:#ffd18d;text-decoration:none}.satellite-footer{display:flex;justify-content:space-between;gap:14px;align-items:center;margin-top:16px;color:var(--mute);font:10px DM Mono,monospace}.satellite-refresh{border:1px solid #63c7e9;background:transparent;color:#bcecff;padding:9px 12px;font:10px DM Mono,monospace;cursor:pointer}.satellite-refresh:hover{background:rgba(99,199,233,.1)}@media(max-width:700px){.satellite-section{padding-bottom:24px}.satellite-panel{padding:16px}.satellite-summary{display:block}.satellite-copy{margin-top:10px}.satellite-count{font-size:32px}.satellite-table{display:block;overflow-x:auto;white-space:nowrap}.satellite-table th,.satellite-table td{padding:12px 8px}.satellite-footer{display:block;line-height:1.6}.satellite-refresh{width:100%;min-height:44px;margin-top:10px}}`;
    document.head.appendChild(style);
  }

  function render(section, data) {
    const rows = (data.satellites || []).map(satellite => `<tr><td>${escapeHtml(satellite.name)}<small>NORAD ${escapeHtml(satellite.norad_id || 'N/A')}</small></td><td>${escapeHtml(satellite.type)}</td><td>${escapeHtml(satellite.altitude_km || 'N/A')} km<small>${escapeHtml(satellite.period_minutes || 'N/A')} min orbit</small></td><td>${escapeHtml(satellite.inclination || 'N/A')}°</td><td><a href="https://trackthesky.com/satellite/${encodeURIComponent(satellite.norad_id || '')}" target="_blank" rel="noopener noreferrer">TRACK ↗</a></td></tr>`).join('');
    section.querySelector('#satelliteCount').textContent = data.count == null ? 'LIVE' : Number(data.count).toLocaleString();
    section.querySelector('#satelliteRows').innerHTML = rows || '<tr><td colspan="5">No matching satellite records available.</td></tr>';
    section.querySelector('#satelliteUpdated').textContent = data.updated ? `CATALOG UPDATED ${new Date(data.updated).toLocaleTimeString()}` : 'OPEN TRACKER FOR LIVE POSITION';
    section.querySelector('#landCoverageNote').textContent = data.land_coverage_note || 'Live footprint coverage is available in Track The Sky.';
  }

  async function load(section) {
    section.querySelector('#satelliteUpdated').textContent = 'REFRESHING LIVE CATALOG';
    try {
      const apiBase = location.protocol === 'file:' ? 'http://127.0.0.1:4174' : '';
      const response = await fetch(`${apiBase}/api/satellites`);
      if (!response.ok) throw new Error('Satellite catalog unavailable');
      render(section, await response.json());
    } catch (error) {
      section.querySelector('#satelliteUpdated').textContent = 'CATALOG OFFLINE';
      section.querySelector('#satelliteRows').innerHTML = '<tr><td colspan="5">Live satellite data is temporarily unavailable.</td></tr>';
    }
  }

  function init() {
    if (document.querySelector('#satellites')) return;
    addStyles();
    const section = document.createElement('section');
    section.className = 'satellite-section wrap';
    section.id = 'satellites';
    section.innerHTML = '<article class="satellite-panel"><div class="panel-head"><div><span class="eyebrow">LIVE ORBITAL INTELLIGENCE</span><h3>Satellites above the mission</h3></div><span class="live" id="satelliteUpdated">LOADING</span></div><div class="satellite-summary"><div><div class="satellite-count" id="satelliteCount">—</div><div class="eyebrow">ACTIVE OBJECTS IN NORAD CATALOG</div></div><p class="satellite-copy">Live orbital records from CelesTrak, the same public source used by <a href="https://trackthesky.com/" target="_blank" rel="noopener noreferrer">Track The Sky ↗</a>. Browse the tracker for 3D position, ground track, speed, altitude, pass predictions, and satellite footprint coverage. <span id="landCoverageNote"></span></p></div><div style="overflow-x:auto"><table class="satellite-table"><thead><tr><th>Satellite</th><th>What it is</th><th>Orbit altitude</th><th>Inclination</th><th>Live view</th></tr></thead><tbody id="satelliteRows"><tr><td colspan="5">Loading live satellite records...</td></tr></tbody></table></div><div class="satellite-footer"><span>LAND OBSERVED TODAY: LIVE FOOTPRINT VIEW IN TRACK THE SKY</span><button class="satellite-refresh" id="refreshSatellites" type="button">REFRESH SATELLITES</button></div></article></section>';
    const anchor = document.querySelector('#analytics');
    (anchor ? anchor.parentNode : document.querySelector('main')).insertBefore(section, anchor || null);
    section.querySelector('#refreshSatellites').addEventListener('click', () => load(section));
    load(section);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
