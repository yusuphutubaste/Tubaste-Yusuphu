// Lightweight multilingual switcher: English, French, and Swahili.
(() => {
  const translations = {
    en: {},
    fr: {
      'About': 'À propos', 'Mission': 'Mission', 'Videos': 'Vidéos', 'Gallery': 'Galerie', 'FAQ': 'FAQ', 'Contact': 'Contact',
      'Subscribe': 'S’abonner', 'Home': 'Accueil', 'Work': 'Travail', 'Community': 'Communauté', 'Search': 'Rechercher',
      'Watch Content': 'Voir le contenu', 'Learn My Story': 'Découvrir mon histoire', 'Send a Message': 'Envoyer un message',
      'Full Name': 'Nom complet', 'Email Address': 'Adresse e-mail', 'Your Message': 'Votre message', 'Submit Inquiry': 'Envoyer la demande'
    },
    sw: {
      'About': 'Kuhusu', 'Mission': 'Dhamira', 'Videos': 'Video', 'Gallery': 'Matunzio', 'FAQ': 'Maswali', 'Contact': 'Wasiliana',
      'Subscribe': 'Jiunge', 'Home': 'Nyumbani', 'Work': 'Kazi', 'Community': 'Jamii', 'Search': 'Tafuta',
      'Watch Content': 'Tazama Maudhui', 'Learn My Story': 'Soma Hadithi Yangu', 'Send a Message': 'Tuma Ujumbe',
      'Full Name': 'Jina kamili', 'Email Address': 'Anwani ya barua pepe', 'Your Message': 'Ujumbe wako', 'Submit Inquiry': 'Tuma Ombi'
    }
  };

  function applyLanguage(lang) {
    const map = translations[lang] || translations.en;
    document.documentElement.lang = lang;
    document.querySelectorAll('a, button, label, h1, h2, h3, h4, h5, p, span').forEach(el => {
      if (el.closest('#paletteBackdrop')) return;
      const text = el.childNodes.length === 1 && el.firstChild.nodeType === Node.TEXT_NODE ? el.textContent.trim() : '';
      if (text && map[text]) el.firstChild.nodeValue = map[text];
    });
    const select = document.getElementById('languageSwitcher');
    if (select) select.value = lang;
    localStorage.setItem('tubaste_language', lang);
  }

  function injectSwitcher() {
    if (document.getElementById('languageSwitcher')) return;
    const label = document.createElement('div');
    label.className = 'fixed bottom-4 right-4 z-[55] flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/95 px-3 py-2 shadow-xl';
    label.innerHTML = `<i class="fas fa-language text-amber-400 text-sm" aria-hidden="true"></i><label for="languageSwitcher" class="sr-only">Language</label><select id="languageSwitcher" aria-label="Language" class="bg-transparent text-xs text-slate-200 outline-none"><option value="en">English</option><option value="fr">Français</option><option value="sw">Kiswahili</option></select>`;
    document.body.appendChild(label);
    document.getElementById('languageSwitcher').addEventListener('change', e => applyLanguage(e.target.value));
  }

  document.addEventListener('DOMContentLoaded', () => {
    injectSwitcher();
    applyLanguage(localStorage.getItem('tubaste_language') || 'en');
  });
})();
