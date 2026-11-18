/**
 * Tubaste Yusuphu - Official Website Main Script
 * Handles navigation, mobile drawer, video filtering, search, alert banner, and command palette.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initAlertBanner();
  initActiveNav();
  initCommandPalette();
  initContactForms();
});

/* ==========================================================================
   1. MOBILE MENU & HAMBURGER DRAWER
   ========================================================================== */
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn') || document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('mobileDrawerBackdrop');
  const mobileMenuDropdown = document.getElementById('mobileMenu') || document.getElementById('globalMobileMenu');

  // Simple dropdown fallback toggle
  if (hamburgerBtn && mobileMenuDropdown && !drawer) {
    hamburgerBtn.addEventListener('click', () => {
      mobileMenuDropdown.classList.toggle('hidden');
    });
    return;
  }

  // Off-canvas slide-out drawer implementation
  if (hamburgerBtn && drawer && backdrop) {
    function openDrawer() {
      hamburgerBtn.classList.add('is-active');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      drawer.classList.remove('translate-x-full');
      backdrop.classList.remove('opacity-0', 'pointer-events-none');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      hamburgerBtn.classList.remove('is-active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      drawer.classList.add('translate-x-full');
      backdrop.classList.add('opacity-0', 'pointer-events-none');
      document.body.style.overflow = '';
    }

    function toggleDrawer() {
      const isOpen = hamburgerBtn.classList.contains('is-active');
      isOpen ? closeDrawer() : openDrawer();
    }

    hamburgerBtn.addEventListener('click', toggleDrawer);
    backdrop.addEventListener('click', closeDrawer);

    // Close when any link inside drawer is clicked
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && hamburgerBtn.classList.contains('is-active')) {
        closeDrawer();
      }
    });
  }
}

/* ==========================================================================
   2. TOP ALERT BANNER (With Session Memory)
   ========================================================================== */
function initAlertBanner() {
  const banner = document.getElementById('siteAlertBanner');
  if (!banner) return;

  if (sessionStorage.getItem('tubaste_alert_dismissed') === 'true') {
    banner.style.display = 'none';
  }
}

function dismissBanner() {
  const banner = document.getElementById('siteAlertBanner');
  if (banner) {
    banner.style.opacity = '0';
    banner.style.transform = 'translateY(-100%)';
    setTimeout(() => {
      banner.style.display = 'none';
    }, 300);
    sessionStorage.setItem('tubaste_alert_dismissed', 'true');
  }
}

/* ==========================================================================
   3. ACTIVE NAVIGATION LINK HIGHLIGHTER
   ========================================================================== */
function initActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navMap = {
    'index.html': 'nav-home',
    'about.html': 'nav-about',
    'work.html': 'nav-work',
    'videos.html': 'nav-videos',
    'community.html': 'nav-community'
  };

  const activeId = navMap[currentPath];
  if (activeId) {
    const activeLink = document.getElementById(activeId);
    if (activeLink) {
      activeLink.classList.remove('text-slate-300');
      activeLink.classList.add('text-amber-400', 'font-bold');
    }
  }
}

/* ==========================================================================
   4. VIDEO FILTERING & SEARCH (For videos.html and index.html)
   ========================================================================== */
let activeVideoCategory = 'all';

function filterVideos(category) {
  activeVideoCategory = category;
  const filterButtons = document.querySelectorAll('[id^="btn-"]');

  filterButtons.forEach(btn => {
    if (btn.id === 'btn-' + category) {
      btn.className = 'px-4 py-2 rounded-lg bg-amber-500 text-black font-bold transition';
    } else {
      btn.className = 'px-4 py-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition';
    }
  });

  applyVideoFilters();
}

function searchVideos() {
  applyVideoFilters();
}

function applyVideoFilters() {
  const searchInput = document.getElementById('videoSearch');
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const cards = document.querySelectorAll('.video-item, .video-card');
  let visibleCount = 0;

  cards.forEach(card => {
    const titleEl = card.querySelector('.video-title, h4');
    const titleText = titleEl ? titleEl.textContent.toLowerCase() : '';
    const matchesCategory = (activeVideoCategory === 'all' || card.classList.contains(activeVideoCategory));
    const matchesSearch = titleText.includes(query);

    if (matchesCategory && matchesSearch) {
      card.classList.remove('hidden');
      visibleCount++;
    } else {
      card.classList.add('hidden');
    }
  });

  const noResultsEl = document.getElementById('noResults');
  if (noResultsEl) {
    noResultsEl.classList.toggle('hidden', visibleCount > 0);
  }
}

function clearSearch() {
  const searchInput = document.getElementById('videoSearch');
  if (searchInput) searchInput.value = '';
  filterVideos('all');
}

/* ==========================================================================
   5. COMMAND PALETTE MODAL (Ctrl+K / Cmd+K)
   ========================================================================== */
function initCommandPalette() {
  const backdrop = document.getElementById('paletteBackdrop');
  if (!backdrop) return;

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      backdrop.classList.contains('hidden') ? openPalette() : closePalette();
    }
    if (e.key === 'Escape' && !backdrop.classList.contains('hidden')) {
      closePalette();
    }
  });

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closePalette();
  });
}

function openPalette() {
  const backdrop = document.getElementById('paletteBackdrop');
  const searchInput = document.getElementById('paletteSearch');
  if (!backdrop || !searchInput) return;

  backdrop.classList.remove('hidden');
  backdrop.classList.add('flex');
  searchInput.value = '';
  filterCommands('');
  setTimeout(() => searchInput.focus(), 50);
}

function closePalette() {
  const backdrop = document.getElementById('paletteBackdrop');
  if (!backdrop) return;
  backdrop.classList.add('hidden');
  backdrop.classList.remove('flex');
}

function filterCommands(query) {
  const q = query.toLowerCase().trim();
  const items = document.querySelectorAll('.command-item');
  const groups = document.querySelectorAll('.command-group');
  let visibleCount = 0;

  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    if (text.includes(q)) {
      item.classList.remove('hidden');
      visibleCount++;
    } else {
      item.classList.add('hidden');
    }
  });

  groups.forEach(group => {
    const hasVisible = group.querySelectorAll('.command-item:not(.hidden)').length > 0;
    group.style.display = hasVisible ? 'block' : 'none';
  });

  const emptyState = document.getElementById('paletteEmpty');
  if (emptyState) {
    emptyState.classList.toggle('hidden', visibleCount > 0);
  }
}

/* ==========================================================================
   6. CONTACT & BOOKING FORM HANDLERS
   ========================================================================== */
function initContactForms() {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formType = form.querySelector('select') ? form.querySelector('select').value : 'message';
      alert('Thank you! Your ' + formType + ' has been submitted successfully.');
      form.reset();
    });
  });
}
