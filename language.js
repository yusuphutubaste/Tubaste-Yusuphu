/* Shared selector backed by Google Translate. Keep this as the only language UI script. */
(() => {
  if (window.__tubasteLanguageInitialized) return;
  window.__tubasteLanguageInitialized = true;

  const languages = [
    ['en','English'],['fr','French'],['sw','Swahili'],['ar','Arabic'],['bn','Bengali'],['zh-CN','Chinese (Simplified)'],['zh-TW','Chinese (Traditional)'],['nl','Dutch'],['de','German'],['el','Greek'],['hi','Hindi'],['id','Indonesian'],['it','Italian'],['ja','Japanese'],['ko','Korean'],['ms','Malay'],['ne','Nepali'],['fa','Persian'],['pl','Polish'],['pt','Portuguese'],['ru','Russian'],['es','Spanish'],['ta','Tamil'],['th','Thai'],['tr','Turkish'],['uk','Ukrainian'],['ur','Urdu'],['vi','Vietnamese'],['yo','Yoruba'],['zu','Zulu']
  ];
  const supported = new Set(languages.map(([code]) => code));
  let saved = 'en';
  try { saved = localStorage.getItem('tubaste-language') || 'en'; } catch (_) {}
  if (!supported.has(saved)) saved = 'en';

  function initialize() {
    if (!document.body || document.getElementById('tubasteLanguageSwitcher')) return;
    const style = document.createElement('style');
    style.textContent = `
      #tubasteLanguageSwitcher{position:fixed;right:16px;bottom:16px;z-index:60;border:1px solid #334155;border-radius:9999px;background:#0f172a;color:#f8fafc;padding:9px 30px 9px 12px;font:12px inherit;max-width:min(210px,calc(100vw - 32px));}
      #tubasteLanguageSwitcher:focus{outline:2px solid #f59e0b;outline-offset:2px}
      #google_translate_element{position:fixed!important;left:-10000px!important;top:0!important;width:1px!important;height:1px!important;overflow:hidden!important}
      .goog-te-banner-frame,.skiptranslate{display:none!important}body{top:0!important}
    `;
    document.head.appendChild(style);
    const select = document.createElement('select');
    select.id = 'tubasteLanguageSwitcher';
    select.setAttribute('aria-label', 'Select page language');
    languages.forEach(([code, label]) => {
      const option = document.createElement('option'); option.value = code; option.textContent = label; select.appendChild(option);
    });
    select.value = saved;
    select.addEventListener('change', () => {
      saved = select.value;
      try { localStorage.setItem('tubaste-language', saved); } catch (_) {}
      setLanguageCookie(saved);
      if (saved === 'en') { window.location.reload(); return; }
      applyToGoogleWidget();
    });
    document.body.appendChild(select);

    const host = document.createElement('div'); host.id = 'google_translate_element'; document.body.appendChild(host);
    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return;
      new google.translate.TranslateElement({pageLanguage:'en', includedLanguages:languages.map(([code])=>code).filter(code=>code!=='en').join(','), autoDisplay:false}, 'google_translate_element');
      let attempts = 0;
      const timer = setInterval(() => {
        attempts++;
        if (document.querySelector('#google_translate_element .goog-te-combo')) { clearInterval(timer); applyToGoogleWidget(); }
        if (attempts >= 50) clearInterval(timer);
      }, 200);
    };
    const loader = document.createElement('script');
    loader.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    loader.async = true;
    loader.onerror = () => { select.title = 'Translation service could not be loaded. Check your connection and try again.'; };
    document.head.appendChild(loader);
  }

  function setLanguageCookie(code) {
    const value = code === 'en' ? '' : `/en/${code}`;
    const expiry = code === 'en' ? ';expires=Thu, 01 Jan 1970 00:00:00 GMT' : '';
    document.cookie = `googtrans=${value};path=/${expiry};SameSite=Lax`;
    if (location.hostname.includes('.')) document.cookie = `googtrans=${value};domain=.${location.hostname};path=/${expiry};SameSite=Lax`;
  }
  function applyToGoogleWidget() {
    const combo = document.querySelector('#google_translate_element .goog-te-combo');
    if (!combo) return;
    combo.value = saved;
    combo.dispatchEvent(new Event('change', {bubbles:true}));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, {once:true});
  else initialize();
})();
