/** Shared behavior for legacy pages that include script.js. */
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initAlertBanner();
  initActiveNav();
  initCommandPalette();
  initContactForms();
  loadLanguageSwitcher();
});

function loadLanguageSwitcher() {
  if (document.getElementById('tubasteLanguageSwitcher') || document.querySelector('script[src$="/language.js"],script[src="language.js"]')) return;
  const script = document.createElement('script');
  script.src = 'language.js';
  script.async = true;
  document.head.appendChild(script);
}

function initMobileMenu() {
  const button = document.getElementById('hamburgerBtn') || document.getElementById('mobileMenuBtn') || document.getElementById('globalMobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('mobileDrawerBackdrop');
  const menu = document.getElementById('mobileMenu') || document.getElementById('globalMobileMenu');
  if (!button) return;
  if (drawer && backdrop) {
    const close = () => {
      button.classList.remove('is-active'); button.setAttribute('aria-expanded','false');
      drawer.classList.add('translate-x-full'); backdrop.classList.add('opacity-0','pointer-events-none'); document.body.style.overflow='';
    };
    button.addEventListener('click', () => {
      if (button.classList.contains('is-active')) close();
      else { button.classList.add('is-active'); button.setAttribute('aria-expanded','true'); drawer.classList.remove('translate-x-full'); backdrop.classList.remove('opacity-0','pointer-events-none'); document.body.style.overflow='hidden'; }
    });
    backdrop.addEventListener('click',close);
    drawer.querySelectorAll('a').forEach(link=>link.addEventListener('click',close));
    document.addEventListener('keydown',event=>{if(event.key==='Escape')close();});
  } else if (menu) {
    button.addEventListener('click', () => {
      const hidden = menu.classList.toggle('hidden');
      button.setAttribute('aria-expanded',String(!hidden));
    });
    menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{menu.classList.add('hidden');button.setAttribute('aria-expanded','false');}));
  }
}

function initAlertBanner() {
  const banner=document.getElementById('siteAlertBanner');
  if (banner && sessionStorage.getItem('tubaste_alert_dismissed')==='true') banner.style.display='none';
}
function dismissBanner() {
  const banner=document.getElementById('siteAlertBanner'); if(!banner)return;
  banner.style.opacity='0';banner.style.transform='translateY(-100%)';
  setTimeout(()=>{banner.style.display='none';},300);sessionStorage.setItem('tubaste_alert_dismissed','true');
}
function initActiveNav() {
  const path=location.pathname.split('/').pop()||'index.html';
  const ids={'index.html':'nav-home','about.html':'nav-about','work.html':'nav-work','videos.html':'nav-videos','community.html':'nav-community'};
  const link=document.getElementById(ids[path]);
  if(link){link.classList.remove('text-slate-300');link.classList.add('text-amber-400','font-bold');}
}

let activeVideoCategory='all';
function filterVideos(category) {
  activeVideoCategory=category;
  document.querySelectorAll('[id^="btn-"]').forEach(button=>{
    const active=button.id==='btn-'+category;
    button.classList.toggle('bg-amber-500',active);button.classList.toggle('text-black',active);button.classList.toggle('font-bold',active);
    if(!active)button.classList.add('text-slate-400');
  });
  applyVideoFilters();
}
function searchVideos(){applyVideoFilters();}
function applyVideoFilters(){
  const query=(document.getElementById('videoSearch')?.value||'').trim().toLowerCase();let count=0;
  document.querySelectorAll('.video-item,.video-card').forEach(card=>{
    const title=card.querySelector('.video-title,h4')?.textContent.toLowerCase()||card.textContent.toLowerCase();
    const match=(activeVideoCategory==='all'||card.classList.contains(activeVideoCategory))&&title.includes(query);
    card.classList.toggle('hidden',!match);if(match)count++;
  });
  document.getElementById('noResults')?.classList.toggle('hidden',count>0);
}
function clearSearch(){const input=document.getElementById('videoSearch');if(input)input.value='';filterVideos('all');}

function initCommandPalette(){
  document.addEventListener('keydown',event=>{
    if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){
      const backdrop=document.getElementById('paletteBackdrop');if(!backdrop)return;
      event.preventDefault();if(typeof window.openPalette==='function')window.openPalette();
    }
  });
}
function initContactForms(){
  document.querySelectorAll('form[data-mailto]').forEach(form=>form.addEventListener('submit',event=>{
    event.preventDefault();if(!form.reportValidity())return;
    const entries=Array.from(new FormData(form).entries());
    const subject=encodeURIComponent(entries.find(([key])=>/subject|inquiry/i.test(key))?.[1]||'Website inquiry');
    const body=encodeURIComponent(entries.map(([key,value])=>`${key}: ${String(value).trim()}`).join('\n\n'));
    location.href=`mailto:yusuphutubasteebrainy@gmail.com?subject=${subject}&body=${body}`;
  }));
}
