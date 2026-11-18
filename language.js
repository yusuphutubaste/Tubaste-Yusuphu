const tubasteLanguages = [
  ['af','Afrikaans'],['ak','Akan'],['sq','Albanian'],['am','Amharic'],['ar','Arabic'],['an','Aragonese'],['hy','Armenian'],['as','Assamese'],['av','Avaric'],['ay','Aymara'],['az','Azerbaijani'],['bm','Bambara'],['ba','Bashkir'],['eu','Basque'],['be','Belarusian'],['bn','Bengali'],['bh','Bihari'],['bi','Bislama'],['bs','Bosnian'],['br','Breton'],['my','Burmese'],['ca','Catalan'],['ch','Chamorro'],['ce','Chechen'],['zh','Chinese'],['cv','Chuvash'],['kw','Cornish'],['co','Corsican'],['hr','Croatian'],['cs','Czech'],['da','Danish'],['nl','Dutch'],['dz','Dzongkha'],['en','English'],['eo','Esperanto'],['et','Estonian'],['ee','Ewe'],['fo','Faroese'],['fj','Fijian'],['fi','Finnish'],['fr','French'],['ff','Fula'],['gl','Galician'],['ka','Georgian'],['de','German'],['el','Greek'],['gn','Guaraní'],['gu','Gujarati'],['ht','Haitian Creole'],['ha','Hausa'],['he','Hebrew'],['hz','Herero'],['hi','Hindi'],['ho','Hiri Motu'],['hu','Hungarian'],['is','Icelandic'],['io','Ido'],['ig','Igbo'],['id','Indonesian'],['ia','Interlingua'],['ie','Interlingue'],['ga','Irish'],['iu','Inuktitut'],['ik','Inupiaq'],['it','Italian'],['ja','Japanese'],['jv','Javanese'],['kl','Kalaallisut / Greenlandic'],['kn','Kannada'],['kr','Kanuri'],['ks','Kashmiri'],['kk','Kazakh'],['km','Khmer'],['ki','Kikuyu'],['rw','Kinyarwanda'],['ky','Kyrgyz'],['kg','Kongo'],['ko','Korean'],['kj','Kuanyama'],['ku','Kurdish'],['lo','Lao'],['la','Latin'],['lv','Latvian'],['li','Limburgish'],['ln','Lingala'],['lt','Lithuanian'],['lu','Luba-Katanga'],['lb','Luxembourgish'],['mk','Macedonian'],['mg','Malagasy'],['ms','Malay'],['ml','Malayalam'],['mt','Maltese'],['gv','Manx'],['mr','Marathi'],['mh','Marshallese'],['mn','Mongolian'],['na','Nauru'],['nv','Navajo'],['nd','North Ndebele'],['ne','Nepali'],['no','Norwegian'],['nb','Norwegian Bokmål'],['nn','Norwegian Nynorsk'],['ny','Chichewa'],['oc','Occitan'],['oj','Ojibwa'],['or','Oriya'],['om','Oromo'],['os','Ossetian'],['pi','Pali'],['ps','Pashto'],['fa','Persian'],['pl','Polish'],['pt','Portuguese'],['pa','Punjabi'],['qu','Quechua'],['ro','Romanian'],['rm','Romansh'],['rn','Kirundi'],['ru','Russian'],['sm','Samoan'],['sg','Sango'],['sa','Sanskrit'],['gd','Scottish Gaelic'],['sr','Serbian'],['sn','Shona'],['ii','Sichuan Yi'],['sd','Sindhi'],['si','Sinhala'],['sk','Slovak'],['sl','Slovenian'],['so','Somali'],['nr','South Ndebele'],['st','Southern Sotho'],['es','Spanish'],['su','Sundanese'],['sw','Swahili'],['ss','Swati'],['sv','Swedish'],['tl','Tagalog'],['ty','Tahitian'],['tg','Tajik'],['ta','Tamil'],['tt','Tatar'],['te','Telugu'],['th','Thai'],['bo','Tibetan'],['to','Tongan'],['ts','Tsonga'],['tn','Tswana'],['tr','Turkish'],['tk','Turkmen'],['tw','Twi'],['ug','Uighur'],['uk','Ukrainian'],['ur','Urdu'],['uz','Uzbek'],['ve','Venda'],['vi','Vietnamese'],['vo','Volapük'],['wa','Walloon'],['cy','Welsh'],['fy','Western Frisian'],['wo','Wolof'],['xh','Xhosa'],['yi','Yiddish'],['yo','Yoruba'],['za','Zhuang'],['zu','Zulu']
];

(function () {
  const style = document.createElement('style');
  style.textContent = `
    .tubaste-language-switcher { position: relative; display: inline-flex; align-items: center; }
    .tubaste-language-switcher select { max-width: 150px; height: 38px; border: 1px solid #334155; border-radius: 9999px; background: #0f172a; color: #f8fafc; padding: 0 28px 0 12px; font-size: 12px; font-family: inherit; cursor: pointer; }
    .tubaste-language-switcher select:focus { outline: 2px solid #f59e0b; outline-offset: 2px; }
    #google_translate_element { position: fixed; width: 1px; height: 1px; left: -10000px; overflow: hidden; }
    body > .skiptranslate { display: none !important; }
    body { top: 0 !important; }
  `;
  document.head.appendChild(style);

  const host = document.createElement('div');
  host.id = 'google_translate_element';
  document.body.appendChild(host);

  let widgetReady = false;
  const savedLanguage = localStorage.getItem('tubaste-language') || 'en';

  window.googleTranslateElementInit = function () {
    new google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: tubasteLanguages.map(item => item[0]).join(','),
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false
    }, 'google_translate_element');

    setTimeout(() => {
      widgetReady = true;
      const combo = document.querySelector('#google_translate_element select.goog-te-combo');
      if (combo && savedLanguage !== 'en') {
        combo.value = savedLanguage;
        combo.dispatchEvent(new Event('change'));
      }
      syncSwitcher(savedLanguage);
    }, 700);
  };

  const script = document.createElement('script');
  script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;
  document.head.appendChild(script);

  function changeLanguage(code) {
    localStorage.setItem('tubaste-language', code);
    document.documentElement.lang = code;
    if (widgetReady) {
      const combo = document.querySelector('#google_translate_element select.goog-te-combo');
      if (combo) {
        combo.value = code;
        combo.dispatchEvent(new Event('change'));
      }
    } else if (code === 'en') {
      window.location.reload();
    }
  }

  function syncSwitcher(code) {
    document.querySelectorAll('.tubaste-language-switcher select').forEach(select => { select.value = code; });
  }

  function createSwitcher() {
    const wrapper = document.createElement('div');
    wrapper.className = 'tubaste-language-switcher';
    wrapper.setAttribute('aria-label', 'Choose language');

    const select = document.createElement('select');
    select.setAttribute('aria-label', 'Website language');

    const englishOption = document.createElement('option');
    englishOption.value = 'en';
    englishOption.textContent = 'English';
    select.appendChild(englishOption);

    tubasteLanguages.filter(([code]) => code !== 'en').sort((a, b) => a[1].localeCompare(b[1])).forEach(([code, name]) => {
      const option = document.createElement('option');
      option.value = code;
      option.textContent = name;
      select.appendChild(option);
    });

    select.value = savedLanguage;
    select.addEventListener('change', event => changeLanguage(event.target.value));
    wrapper.appendChild(select);
    return wrapper;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const desktopActions = document.querySelector('nav .hidden.md\:flex.items-center.gap-3') || document.querySelector('nav .hidden.md\:block');
    if (desktopActions) desktopActions.prepend(createSwitcher());

    const mobileActions = document.querySelector('nav .flex.items-center.gap-2.md\:hidden') || document.querySelector('nav #mobileMenuBtn')?.parentElement;
    if (mobileActions) mobileActions.prepend(createSwitcher());

    if (!document.querySelector('.tubaste-language-switcher')) {
      const fixed = document.createElement('div');
      fixed.className = 'tubaste-language-switcher';
      fixed.style.cssText = 'position:fixed;right:16px;bottom:16px;z-index:9999';
      fixed.appendChild(createSwitcher());
      document.body.appendChild(fixed);
    }
  });
})();
