const tubasteLanguages = [
['af','Afrikaans'],['ak','Akan'],['sq','Albanian'],['am','Amharic'],['ar','Arabic'],['hy','Armenian'],['az','Azerbaijani'],['eu','Basque'],['be','Belarusian'],['bn','Bengali'],['bs','Bosnian'],['bg','Bulgarian'],['my','Burmese'],['ca','Catalan'],['zh-CN','Chinese (Simplified)'],['zh-TW','Chinese (Traditional)'],['hr','Croatian'],['cs','Czech'],['da','Danish'],['nl','Dutch'],['en','English'],['eo','Esperanto'],['et','Estonian'],['fi','Finnish'],['fr','French'],['gl','Galician'],['ka','Georgian'],['de','German'],['el','Greek'],['gu','Gujarati'],['ht','Haitian Creole'],['he','Hebrew'],['hi','Hindi'],['hu','Hungarian'],['is','Icelandic'],['id','Indonesian'],['ga','Irish'],['it','Italian'],['ja','Japanese'],['kn','Kannada'],['ko','Korean'],['ky','Kyrgyz'],['lo','Lao'],['la','Latin'],['lv','Latvian'],['lt','Lithuanian'],['lb','Luxembourgish'],['mk','Macedonian'],['mg','Malagasy'],['ms','Malay'],['ml','Malayalam'],['mt','Maltese'],['mi','Māori'],['mr','Marathi'],['mn','Mongolian'],['ne','Nepali'],['no','Norwegian'],['or','Odia'],['ps','Pashto'],['fa','Persian'],['pl','Polish'],['pt','Portuguese'],['pa','Punjabi'],['ro','Romanian'],['ru','Russian'],['sr','Serbian'],['si','Sinhala'],['sk','Slovak'],['sl','Slovenian'],['so','Somali'],['es','Spanish'],['su','Sundanese'],['sw','Swahili'],['sv','Swedish'],['tl','Tagalog'],['tg','Tajik'],['ta','Tamil'],['te','Telugu'],['th','Thai'],['tr','Turkish'],['uk','Ukrainian'],['ur','Urdu'],['uz','Uzbek'],['vi','Vietnamese'],['cy','Welsh'],['xh','Xhosa'],['yi','Yiddish'],['yo','Yoruba'],['zu','Zulu']
];

(function(){
  if(document.getElementById('google_translate_element')) return;
  const style=document.createElement('style');
  style.textContent=`
    .tubaste-language-switcher{display:inline-flex;align-items:center}.tubaste-language-switcher select{max-width:150px;height:38px;border:1px solid #334155;border-radius:9999px;background:#0f172a;color:#f8fafc;padding:0 28px 0 12px;font-size:12px;font-family:inherit;cursor:pointer}.tubaste-language-switcher select:focus{outline:2px solid #f59e0b;outline-offset:2px}#google_translate_element{position:absolute!important;width:1px!important;height:1px!important;left:-10000px!important;overflow:hidden!important}.goog-te-banner-frame,.skiptranslate{display:none!important}body{top:0!important}
  `;
  document.head.appendChild(style);

  const host=document.createElement('div');host.id='google_translate_element';document.body.appendChild(host);
  let widgetReady=false;
  const savedLanguage=localStorage.getItem('tubaste-language')||'en';

  window.googleTranslateElementInit=function(){
    new google.translate.TranslateElement({pageLanguage:'en',includedLanguages:tubasteLanguages.map(item=>item[0]).join(','),layout:google.translate.TranslateElement.InlineLayout.SIMPLE,autoDisplay:false},'google_translate_element');
    setTimeout(()=>{widgetReady=true;applyGoogleLanguage(savedLanguage)},700);
  };

  function applyGoogleLanguage(code){
    const combo=document.querySelector('#google_translate_element select.goog-te-combo');
    if(combo){combo.value=code==='zh-CN'||code==='zh-TW'?code:code;combo.dispatchEvent(new Event('change'));}
  }

  function changeLanguage(code){
    localStorage.setItem('tubaste-language',code);
    document.documentElement.lang=code;
    document.cookie=`googtrans=/en/${code};path=/`;
    document.cookie=`googtrans=/en/${code};domain=${location.hostname};path=/`;
    if(code==='en'){
      document.cookie='googtrans=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
      document.cookie=`googtrans=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=${location.hostname};path=/`;
    }
    if(widgetReady)applyGoogleLanguage(code);else if(code==='en')location.reload();
  }

  function createSwitcher(){
    const wrapper=document.createElement('div');wrapper.className='tubaste-language-switcher';wrapper.setAttribute('aria-label','Choose language');
    const select=document.createElement('select');select.setAttribute('aria-label','Website language');
    tubasteLanguages.forEach(([code,name])=>{const option=document.createElement('option');option.value=code;option.textContent=name;select.appendChild(option)});
    select.value=tubasteLanguages.some(([code])=>code===savedLanguage)?savedLanguage:'en';
    select.addEventListener('change',event=>changeLanguage(event.target.value));
    wrapper.appendChild(select);return wrapper;
  }

  const script=document.createElement('script');script.src='https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';script.async=true;document.head.appendChild(script);

  document.addEventListener('DOMContentLoaded',()=>{
    const nav=document.querySelector('nav');if(!nav)return;
    const desktop=nav.querySelector('.hidden.md\\:flex.items-center.gap-3')||nav.querySelector('.hidden.md\\:block');
    if(desktop&&desktop.querySelector('.tubaste-language-switcher')===null)desktop.prepend(createSwitcher());
    const mobile=nav.querySelector('.md\\:hidden > button')?.parentElement||nav.querySelector('#mobileMenuBtn')?.parentElement;
    if(mobile&&mobile.querySelector('.tubaste-language-switcher')===null)mobile.prepend(createSwitcher());
  });
})();
