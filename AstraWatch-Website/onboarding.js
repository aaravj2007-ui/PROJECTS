(() => {
  const setupKey = 'aapda-buddy-onboarding';
  const settingsKey = 'aapda-buddy-settings';
  const copy = {
    en: { welcome: 'Welcome to Aapda Buddy', intro: 'Choose your location and preferred app language to get started.', location: 'Your location', state: 'State / Union territory', city: 'City or district', language: 'App language', continue: 'START USING AAPDA BUDDY', chooseState: 'Select your state', chooseCity: 'Select your city or district' },
    hi: { welcome: '\u0906\u092a\u0926\u093e \u092c\u0921\u0940 \u092e\u0947\u0902 \u0906\u092a\u0915\u093e \u0938\u094d\u0935\u093e\u0917\u0924 \u0939\u0948', intro: '\u0936\u0941\u0930\u0942 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093f\u090f \u0905\u092a\u0928\u093e \u0938\u094d\u0925\u093e\u0928 \u0914\u0930 \u092d\u093e\u0937\u093e \u091a\u0941\u0928\u0947\u0902\u0964', location: '\u0906\u092a\u0915\u093e \u0938\u094d\u0925\u093e\u0928', state: '\u0930\u093e\u091c\u094d\u092f / \u0915\u0947\u0902\u0926\u094d\0930 \u0936\u093e\u0938\u093f\u0924 \u092a\u094d\0930\u0926\u0947\u0936', city: '\u0936\u0939\u0930 \u092f\u093e \u091c\u093f\u0932\u093e', language: '\u0910\u092a \u0915\u0940 \u092d\u093e\u0937\u093e', continue: 'AAPDA BUDDY \u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902', chooseState: '\u0905\u092a\u0928\u093e \u0930\u093e\u091c\u094d\u092f \u091a\u0941\u0928\u0947\u0902', chooseCity: '\u0905\u092a\u0928\u093e \u0936\u0939\u0930 \u092f\u093e \u091c\u093f\u0932\u093e \u091a\u0941\u0928\u0947\u0902' }
  };
  const languageOptions = [['en', 'English'], ['hi', '\u0939\u093f\u0902\u0926\u0940']];

  function addStyles() {
    const style = document.createElement('style');
    style.textContent = '.onboarding{position:fixed;inset:0;z-index:40;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(1,10,24,.86);backdrop-filter:blur(8px)}.onboarding[hidden]{display:none}.onboarding-card{width:min(520px,100%);background:#092746;border:1px solid #5c91b7;box-shadow:0 25px 70px rgba(0,0,0,.55);padding:32px}.onboarding-card h2{font:700 31px/1.15 Playfair Display,serif;margin:10px 0 9px;color:#fff}.onboarding-card>p{color:#b7cde4;line-height:1.6;margin:0 0 24px}.onboarding-section{border-top:1px solid rgba(160,203,255,.22);padding:18px 0 0;margin-top:18px}.onboarding-section h3{font-size:14px;margin:0 0 12px;color:#fff}.onboarding-field{margin-bottom:13px}.onboarding-field label{display:block;color:#9dbbd9;font:9px DM Mono,monospace;letter-spacing:.8px;text-transform:uppercase;margin-bottom:6px}.onboarding-field select{width:100%;padding:12px;background:#0a2d52;border:1px solid #47749f;color:#eaf3ff;font:12px Manrope,Arial,sans-serif}.onboarding-submit{width:100%;margin-top:10px;border:0;padding:13px;background:#f2942e;color:#07182e;font:800 11px DM Mono,monospace;cursor:pointer}.onboarding-submit:hover{background:#ffad50}@media(max-width:600px){.onboarding-card{padding:25px 20px}.onboarding-card h2{font-size:27px}}';
    document.head.appendChild(style);
  }

  function applyLanguage(language) {
    document.documentElement.lang = language;
    document.title = document.title.replace('Aapda Buddy', 'Aapda buddy');
    const brandName = document.querySelector('.brand b i'); if (brandName) brandName.textContent = 'buddy';
    const hindi = language === 'hi';
    const labels = hindi ? { about: '\u0915\u0947 \u092c\u093e\u0930\u0947 \u092e\u0947\u0902', analytics: '\u0935\u093f\u0936\u094d\u0932\u0947\u0937\u0923', technology: '\u0924\u0915\u0928\u0940\u0915', terms: '\u0928\u093f\u092f\u092e', settings: '\u0938\u0947\u091f\u093f\u0902\u0917\u094d\0938', intelligence: '\u092e\u093f\u0936\u0928 \u0915\u0902\u091f\u094d\0930\u094b\u0932 \u091c\u093e\u0928\u0915\u093e\u0930\u0940', affected: '\u092a\u093f\u091b\u0932\u0947 7 \u0926\u093f\u0928\u094b\u0902 \u092e\u0947\u0902 \u092a\u094d\0930\u092d\u093e\u0935\u093f\u0924 \u0915\u094d\0937\u0947\u0924\u094d\0930 — \u0921\u0947\u092e\u094b' } : { about: 'About', analytics: 'Analytics', technology: 'Technology', terms: 'Terms', settings: 'Settings', intelligence: 'Mission Control Intelligence', affected: 'Detected affected area — demo last 7 days' };
    [['#about', labels.about], ['#analytics', labels.analytics], ['#technology', labels.technology], ['#terms', labels.terms], ['#settings', labels.settings]].forEach(([href, text]) => { const link = document.querySelector(`.links a[href="${href}"]`); if (link) link.textContent = text; });
    const heading = document.querySelector('#analytics h2'); if (heading) heading.textContent = labels.intelligence;
    const graph = document.querySelector('#analytics .panel h3'); if (graph) graph.textContent = labels.affected;
  }

  function addSettingsLanguageControl(savedLanguage) {
    const languageList = document.querySelector('#languageList');
    if (!languageList || document.querySelector('#appLanguageSelect')) return;
    const section = languageList.closest('.setting-section');
    const field = document.createElement('div');
    field.className = 'setting-field';
    field.style.marginBottom = '14px';
    field.innerHTML = '<label for="appLanguageSelect">App language</label><select id="appLanguageSelect"><option value="en">English</option><option value="hi">\u0939\u093f\u0902\u0926\u0940</option></select>';
    section.insertBefore(field, languageList);
    const select = field.querySelector('#appLanguageSelect');
    select.value = savedLanguage || 'en';
    select.addEventListener('change', () => {
      const settings = JSON.parse(localStorage.getItem(settingsKey) || '{}');
      settings.language = select.value;
      localStorage.setItem(settingsKey, JSON.stringify(settings));
      applyLanguage(select.value);
    });
  }

  function init() {
    addStyles();
    const saved = JSON.parse(localStorage.getItem(settingsKey) || '{}');
    addSettingsLanguageControl(saved.language);
    const sourceState = document.querySelector('#stateSelect');
    const sourceCity = document.querySelector('#citySelect');
    const overlay = document.createElement('div');
    const details = document.querySelector('#alertDetailContent');
    if (details) new MutationObserver(() => { const updated = details.innerHTML.replace(/USGS/g, 'RISEQ').replace(/Earthquake Hazards Program/g, 'National Centre for Seismology'); if (updated !== details.innerHTML) details.innerHTML = updated; const link = details.querySelector('.source-link'); if (link) link.textContent = 'VIEW ON RISEQ ↗'; }).observe(details, { childList: true, subtree: true });
    document.addEventListener('click', event => { if (event.target.closest('[data-quake-index]')) setTimeout(() => { const detail = document.querySelector('#alertDetailContent'); if (!detail) return; detail.innerHTML = detail.innerHTML.replace(/USGS/g, 'RISEQ').replace(/Earthquake Hazards Program/g, 'National Centre for Seismology'); const link = detail.querySelector('.source-link'); if (link) link.textContent = 'VIEW ON RISEQ ↗'; }, 0); });
    overlay.className = 'onboarding';
    overlay.hidden = Boolean(localStorage.getItem(setupKey));
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML = '<section class="onboarding-card"><span class="eyebrow">AAPDA BUDDY · FIRST SETUP</span><h2 data-copy="welcome"></h2><p data-copy="intro"></p><div class="onboarding-section"><h3 data-copy="location"></h3><div class="onboarding-field"><label for="setupState" data-copy="state"></label><select id="setupState"></select></div><div class="onboarding-field"><label for="setupCity" data-copy="city"></label><select id="setupCity"></select></div></div><div class="onboarding-section"><h3 data-copy="language"></h3><div class="onboarding-field"><label for="setupLanguage">Language</label><select id="setupLanguage"></select></div></div><button class="onboarding-submit" type="button" data-copy="continue"></button></section>';
    document.body.appendChild(overlay);
    const state = overlay.querySelector('#setupState');
    const city = overlay.querySelector('#setupCity');
    const language = overlay.querySelector('#setupLanguage');
    [...sourceState.options].forEach(option => state.appendChild(option.cloneNode(true)));
    languageOptions.forEach(([value, label]) => language.insertAdjacentHTML('beforeend', `<option value="${value}">${label}</option>`));
    const updateCities = () => { sourceState.value = state.value; sourceState.dispatchEvent(new Event('change')); city.innerHTML = [...sourceCity.options].map(option => option.cloneNode(true).outerHTML).join(''); };
    state.addEventListener('change', updateCities);
    city.innerHTML = '<option value="">Select your city or district</option>';
    language.value = saved.language || 'en';
    if (saved.state) { state.value = saved.state; updateCities(); city.value = saved.city || ''; }
    const updateCopy = () => { const text = copy[language.value] || copy.en; overlay.querySelectorAll('[data-copy]').forEach(element => { element.textContent = text[element.dataset.copy]; }); state.options[0].textContent = text.chooseState; city.options[0].textContent = text.chooseCity; };
    language.addEventListener('change', updateCopy);
    updateCopy();
    overlay.querySelector('.onboarding-submit').addEventListener('click', () => { if (!state.value || !city.value) { state.focus(); return; } localStorage.setItem(settingsKey, JSON.stringify({ state: state.value, city: city.value, language: language.value })); localStorage.setItem(setupKey, 'complete'); applyLanguage(language.value); overlay.hidden = true; });
    applyLanguage(saved.language || 'en');
  }

  init();
})();
