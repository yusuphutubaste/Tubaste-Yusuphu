// Shared command palette and static form handling. Language UI is owned by language.js.
(() => {
  const EMAIL = 'yusuphutubasteebrainy@gmail.com';

  function injectPalette() {
    if (document.getElementById('paletteBackdrop')) return;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <div id="paletteBackdrop" class="fixed inset-0 z-[70] hidden items-start justify-center bg-black/70 px-4 pt-20 backdrop-blur-sm sm:px-6" role="dialog" aria-modal="true" aria-label="Command palette">
        <div class="flex w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
          <div class="flex items-center border-b border-slate-800 bg-slate-950/60 px-4">
            <i class="fas fa-search mr-3 text-sm text-slate-500" aria-hidden="true"></i>
            <input id="paletteSearch" type="search" placeholder="Type a page, video, or action..." aria-label="Search commands" class="w-full bg-transparent py-4 text-sm text-white placeholder-slate-500 focus:outline-none">
            <button type="button" id="paletteClose" class="rounded border border-slate-700 bg-slate-800 px-2 py-1 font-mono text-[10px] text-slate-400" aria-label="Close palette">ESC</button>
          </div>
          <div id="commandList" class="max-h-80 space-y-4 overflow-y-auto p-3">
            <div class="command-group"><p class="mb-1 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">Navigation</p><div class="space-y-1">
              <a href="index.html" class="command-item block rounded-xl px-3 py-2 text-sm text-slate-300 hover:bg-slate-800">Home</a>
              <a href="about.html" class="command-item block rounded-xl px-3 py-2 text-sm text-slate-300 hover:bg-slate-800">About Me</a>
              <a href="work.html" class="command-item block rounded-xl px-3 py-2 text-sm text-slate-300 hover:bg-slate-800">Work & Services</a>
              <a href="videos.html" class="command-item block rounded-xl px-3 py-2 text-sm text-slate-300 hover:bg-slate-800">Video Library</a>
              <a href="community.html" class="command-item block rounded-xl px-3 py-2 text-sm text-slate-300 hover:bg-slate-800">Community</a>
              <a href="contact.html" class="command-item block rounded-xl px-3 py-2 text-sm text-slate-300 hover:bg-slate-800">Contact</a>
            </div></div>
            <div class="command-group"><p class="mb-1 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">Actions</p><div class="space-y-1">
              <a href="https://www.youtube.com/channel/UCjREHM2Ieny7s2t3VzfFR4Q?sub_confirmation=1" target="_blank" rel="noopener noreferrer" class="command-item block rounded-xl px-3 py-2 text-sm text-slate-300 hover:bg-slate-800">Subscribe on YouTube</a>
              <a href="work.html#booking" class="command-item block rounded-xl px-3 py-2 text-sm text-slate-300 hover:bg-slate-800">Book for an Event / Message</a>
            </div></div>
          </div>
          <div id="paletteEmpty" class="hidden py-8 text-center text-sm text-slate-400">No matches found.</div>
          <div class="border-t border-slate-800 bg-slate-950/70 px-4 py-2.5 text-[11px] text-slate-500">Press Esc to close</div>
        </div>
      </div>`;
    document.body.appendChild(wrapper.firstElementChild);

    const backdrop = document.getElementById('paletteBackdrop');
    const input = document.getElementById('paletteSearch');
    function filter(query) {
      const q = query.toLowerCase().trim();
      let count = 0;
      backdrop.querySelectorAll('.command-item').forEach(item => {
        const visible = item.textContent.toLowerCase().includes(q);
        item.classList.toggle('hidden', !visible);
        if (visible) count++;
      });
      backdrop.querySelectorAll('.command-group').forEach(group => {
        group.style.display = group.querySelector('.command-item:not(.hidden)') ? '' : 'none';
      });
      document.getElementById('paletteEmpty').classList.toggle('hidden', count > 0);
    }
    window.openPalette = () => { backdrop.classList.remove('hidden'); backdrop.classList.add('flex'); input.value = ''; filter(''); input.focus(); };
    window.closePalette = () => { backdrop.classList.add('hidden'); backdrop.classList.remove('flex'); input.blur(); };
    input.addEventListener('input', () => filter(input.value));
    document.getElementById('paletteClose').addEventListener('click', window.closePalette);
    backdrop.addEventListener('click', event => { if (event.target === backdrop) window.closePalette(); });
    document.addEventListener('keydown', event => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); backdrop.classList.contains('hidden') ? window.openPalette() : window.closePalette(); }
      if (event.key === 'Escape' && !backdrop.classList.contains('hidden')) window.closePalette();
    });
  }

  function initMailtoForms() {
    document.querySelectorAll('form[data-mailto]').forEach(form => form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const subject = encodeURIComponent(data.get('subject') || data.get('inquiryType') || 'Website inquiry');
      const body = encodeURIComponent(Array.from(data.entries()).map(([key, value]) => `${key}: ${String(value).trim()}`).join('\n\n'));
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    }));
  }

  document.addEventListener('DOMContentLoaded', () => { injectPalette(); initMailtoForms(); });
})();
