const MAILTO_ADDRESS = 'yusuphutubasteebrainy@gmail.com';

function injectPalette() {
  if (document.getElementById('paletteBackdrop')) return;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <div id="paletteBackdrop" class="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm hidden items-start justify-center pt-20 px-4 sm:px-6" role="dialog" aria-modal="true" aria-label="Command palette">
      <div id="paletteModal" class="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        <div class="flex items-center px-4 border-b border-slate-800 bg-slate-950/60">
          <i class="fas fa-search text-slate-500 mr-3 text-sm"></i>
          <input type="search" id="paletteSearch" placeholder="Type a page, video, or action..." aria-label="Search commands" class="w-full bg-transparent py-4 text-sm text-white placeholder-slate-500 focus:outline-none">
          <button type="button" id="paletteClose" class="text-[10px] bg-slate-800 border border-slate-700 text-slate-400 px-2 py-1 rounded font-mono" aria-label="Close search">ESC</button>
        </div>
        <div class="max-h-80 overflow-y-auto p-3 space-y-4" id="commandList">
          <div class="command-group"><p class="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 mb-1">Navigation</p><div class="space-y-1">
            <a href="index.html" class="command-item flex items-center justify-between px-3 py-2 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-amber-400 transition text-sm"><span><i class="fas fa-house text-slate-400 w-4 mr-2"></i>Home</span><span class="text-xs text-slate-500">Go to homepage</span></a>
            <a href="about.html" class="command-item flex items-center justify-between px-3 py-2 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-amber-400 transition text-sm"><span><i class="fas fa-user text-slate-400 w-4 mr-2"></i>About Me</span><span class="text-xs text-slate-500">Read biography & vision</span></a>
            <a href="work.html" class="command-item flex items-center justify-between px-3 py-2 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-amber-400 transition text-sm"><span><i class="fas fa-briefcase text-slate-400 w-4 mr-2"></i>Work & Services</span><span class="text-xs text-slate-500">Speaking & event coverage</span></a>
            <a href="videos.html" class="command-item flex items-center justify-between px-3 py-2 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-amber-400 transition text-sm"><span><i class="fas fa-film text-slate-400 w-4 mr-2"></i>Video Library</span><span class="text-xs text-slate-500">Search all uploads</span></a>
            <a href="community.html" class="command-item flex items-center justify-between px-3 py-2 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-amber-400 transition text-sm"><span><i class="fas fa-users text-slate-400 w-4 mr-2"></i>Community</span><span class="text-xs text-slate-500">Faith and fellowship</span></a>
          </div></div>
          <div class="command-group"><p class="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 mb-1">Popular Videos</p><div class="space-y-1">
            <a href="https://www.youtube.com/watch?v=txXEsO16c3c" target="_blank" rel="noopener" class="command-item flex items-center justify-between px-3 py-2 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-amber-400 transition text-sm"><span><i class="fab fa-youtube text-red-500 w-4 mr-2"></i>Change Starts Right Now</span><span class="text-xs text-slate-500">Motivation Short</span></a>
            <a href="https://www.youtube.com/watch?v=7931juMhl_M" target="_blank" rel="noopener" class="command-item flex items-center justify-between px-3 py-2 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-amber-400 transition text-sm"><span><i class="fab fa-youtube text-red-500 w-4 mr-2"></i>The Secret Behind Your College Major</span><span class="text-xs text-slate-500">Life Wisdom</span></a>
            <a href="https://www.youtube.com/watch?v=JVQM-QVRKV8" target="_blank" rel="noopener" class="command-item flex items-center justify-between px-3 py-2 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-sky-400 transition text-sm"><span><i class="fab fa-youtube text-sky-400 w-4 mr-2"></i>Come To Jesus Ministry</span><span class="text-xs text-slate-500">Community & Faith</span></a>
          </div></div>
          <div class="command-group"><p class="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 mb-1">Actions</p><div class="space-y-1">
            <a href="https://www.youtube.com/channel/UCjREHM2Ieny7s2t3VzfFR4Q?sub_confirmation=1" target="_blank" rel="noopener" class="command-item flex items-center justify-between px-3 py-2 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-amber-400 transition text-sm"><span><i class="fas fa-bell text-red-500 w-4 mr-2"></i>Subscribe on YouTube</span><span class="text-xs text-slate-500">Official Channel</span></a>
            <a href="work.html#booking" class="command-item flex items-center justify-between px-3 py-2 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-amber-400 transition text-sm"><span><i class="fas fa-envelope text-amber-400 w-4 mr-2"></i>Book for an Event / Message</span><span class="text-xs text-slate-500">Speaking Inquiry</span></a>
          </div></div>
        </div>
        <div id="paletteEmpty" class="hidden text-center py-8 text-slate-400 text-sm">No matches found.</div>
        <div class="px-4 py-2.5 bg-slate-950/70 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500"><span>Press <kbd class="font-mono text-slate-400">Esc</kbd> to close</span><span class="text-amber-400">Tubaste Yusuphu Hub</span></div>
      </div>
    </div>`;
  document.body.appendChild(wrapper.firstElementChild);

  const backdrop = document.getElementById('paletteBackdrop');
  const input = document.getElementById('paletteSearch');
  window.openPalette = function () {
    backdrop.classList.remove('hidden'); backdrop.classList.add('flex'); input.value = ''; filterPalette(''); setTimeout(() => input.focus(), 50);
  };
  window.closePalette = function () {
    backdrop.classList.add('hidden'); backdrop.classList.remove('flex');
  };
  function filterPalette(query) {
    const q = query.toLowerCase().trim(); let visible = 0;
    document.querySelectorAll('#paletteBackdrop .command-item').forEach(item => {
      const show = item.textContent.toLowerCase().includes(q); item.classList.toggle('hidden', !show); if (show) visible++;
    });
    document.querySelectorAll('#paletteBackdrop .command-group').forEach(group => {
      group.style.display = group.querySelector('.command-item:not(.hidden)') ? 'block' : 'none';
    });
    document.getElementById('paletteEmpty').classList.toggle('hidden', visible > 0);
  }
  window.filterCommands = filterPalette;
  input.addEventListener('input', e => filterPalette(e.target.value));
  document.getElementById('paletteClose').addEventListener('click', closePalette);
  backdrop.addEventListener('click', e => { if (e.target === backdrop) closePalette(); });
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); backdrop.classList.contains('hidden') ? openPalette() : closePalette(); }
    if (e.key === 'Escape' && !backdrop.classList.contains('hidden')) closePalette();
  });
}

function initStaticForms() {
  document.querySelectorAll('form').forEach(form => {
    if (!form.dataset.mailto) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const subject = encodeURIComponent(data.get('subject') || data.get('inquiryType') || 'Website inquiry');
      const lines = [];
      data.forEach((value, key) => lines.push(`${key}: ${String(value).trim()}`));
      const body = encodeURIComponent(lines.join('\n\n'));
      window.location.href = `mailto:${MAILTO_ADDRESS}?subject=${subject}&body=${body}`;
    });
  });
}

document.addEventListener('DOMContentLoaded', () => { injectPalette(); initStaticForms(); });
