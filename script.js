/**
 * Tubaste Yusuphu - Official Website Main Script
 * Handles navigation, mobile drawer, video filtering, search, alert banner, and forms.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initAlertBanner();
  initActiveNav();
  initCommandPalette();
  initContactForms();
  // Load the shared language switcher on pages that include script.js.
  if (!document.querySelector('script[src="language.js"]')) {
    const languageScript = document.createElement('script');
    languageScript.src = 'language.js';
    languageScript.defer = true;
    document.head.appendChild(languageScript);
  }
});

function initMobileMenu() {
  const button = document.getElementById('hamburgerBtn') || document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('mobileDrawerBackdrop');
  const dropdown = document.getElementById('mobileMenu') || document.getElementById('globalMobileMenu');
  if (button && dropdown && !drawer) {
    button.addEventListener('click', () => {
      const isHidden = dropdown.classList.toggle('hidden');
      button.setAttribute('aria-expanded', String(!isHidden));
    });
    dropdown.querySelectorAll('a').forEach(link => link.addEventListener('click', () => dropdown.classList.add('hidden')));
    return;
  }
  if (!button || !drawer || !backdrop) return;
  const close = () => {
    button.classList.remove('is-active'); button.setAttribute('aria-expanded', 'false');
    drawer.classList.add('translate-x-full'); backdrop.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = '';
  };
  const open = () => {
    button.classList.add('is-active'); button.setAttribute('aria-expanded', 'true');
    drawer.classList.remove('translate-x-full'); backdrop.classList.remove('opacity-0', 'pointer-events-none');
    document.body.style.overflow = 'hidden';
  };
  button.addEventListener('click', () => button.classList.contains('is-active') ? close() : open());
  backdrop.addEventListener('click', close);
  drawer.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
}

function initAlertBanner() {
  const banner = document.getElementById('siteAlertBanner');
  if (banner && sessionStorage.getItem('tubaste_alert_dismissed') === 'true') banner.style.display = 'none';
}
function dismissBanner() {
  const banner = document.getElementById('siteAlertBanner');
  if (!banner) return;
  banner.style.opacity = '0'; banner.style.transform = 'translateY(-100%)';
  setTimeout(() => { banner.style.display = 'none'; }, 300);
  sessionStorage.setItem('tubaste_alert_dismissed', 'true');
}

function initActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const ids = { 'index.html':'nav-home', 'about.html':'nav-about', 'work.html':'nav-work', 'videos.html':'nav-videos', 'community.html':'nav-community' };
  const link = document.getElementById(ids[path]);
  if (link) { link.classList.remove('text-slate-300'); link.classList.add('text-amber-400', 'font-bold'); }
}

let activeVideoCategory = 'all';
function filterVideos(category) {
  activeVideoCategory = category;
  document.querySelectorAll('[id^="btn-"]').forEach(button => {
    const active = button.id === `btn-${category}`;
    button.classList.toggle('bg-amber-500', active); button.classList.toggle('text-black', active);
    button.classList.toggle('font-bold', active); button.classList.toggle('text-slate-400', !active);
  });
  applyVideoFilters();
}
function searchVideos() { applyVideoFilters(); }
function applyVideoFilters() {
  const query = (document.getElementById('videoSearch')?.value || '').toLowerCase().trim();
  let visible = 0;
  document.querySelectorAll('.video-item, .video-card').forEach(card => {
    const title = card.querySelector('.video-title, h4')?.textContent.toLowerCase() || card.textContent.toLowerCase();
    const show = (activeVideoCategory === 'all' || card.classList.contains(activeVideoCategory)) && title.includes(query);
    card.classList.toggle('hidden', !show); if (show) visible++;
  });
  document.getElementById('noResults')?.classList.toggle('hidden', visible > 0);
}
function clearSearch() {
  const input = document.getElementById('videoSearch'); if (input) input.value = '';
  filterVideos('all');
}

function initCommandPalette() {
  const backdrop = document.getElementById('paletteBackdrop');
  if (!backdrop) return;
  document.addEventListener('keydown', event => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      if (typeof window.openPalette === 'function') window.openPalette();
    }
  });
}

function initContactForms() {
  document.querySelectorAll('form:not([data-mailto])').forEach(form => {
    if (form.hasAttribute('onsubmit')) return;
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      alert('Thanks for your message. Please use the email link on this page to contact Tubaste directly; this form is not connected to a message service yet.');
    });
  });
}
