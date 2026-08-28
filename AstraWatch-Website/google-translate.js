(() => {
  function addStyles() {
    const style = document.createElement('style');
    style.textContent = '.google-translate-tool{position:fixed;right:18px;bottom:18px;z-index:50;padding:7px 9px;background:rgba(9,39,70,.95);border:1px solid #47749f;box-shadow:0 8px 24px rgba(0,0,0,.28)}.google-translate-tool .goog-te-gadget{font:11px Arial,sans-serif;color:#d9edff}.google-translate-tool .goog-te-gadget span{display:none}.google-translate-tool .goog-te-combo{margin:0;padding:5px 24px 5px 7px;border:1px solid #47749f;background:#0a2d52;color:#eaf3ff;font:11px Arial,sans-serif}@media(max-width:600px){.google-translate-tool{right:10px;bottom:10px}}';
    document.head.appendChild(style);
  }

  window.googleTranslateElementInit = () => {
    if (!window.google || !window.google.translate || document.querySelector('#google_translate_element select')) return;
    new window.google.translate.TranslateElement({ pageLanguage: 'en', autoDisplay: false }, 'google_translate_element');
  };

  function loadWidget() {
    if (document.querySelector('#google_translate_element')) return;
    addStyles();
    const tool = document.createElement('div');
    tool.className = 'google-translate-tool';
    tool.setAttribute('aria-label', 'Translate this website');
    tool.innerHTML = '<div id="google_translate_element"></div>';
    document.body.appendChild(tool);
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.head.appendChild(script);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', loadWidget);
  else loadWidget();
})();
