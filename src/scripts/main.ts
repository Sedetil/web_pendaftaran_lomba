/**
 * Interaksi ringan Digital Canvas (vanilla, tanpa dependensi):
 * 1. Menu seluler layar penuh (aria-expanded, Escape, tutup saat link dipilih).
 * 2. (Moment "word-highlight" dijalankan oleh kit Taste: public/assets/moments.)
 * 3. Status timeline dihitung ulang dari tanggal di browser (WIB).
 */

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/* ---------------------------------------------------------------- 1. Menu */
function initMenu(): void {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  if (!toggle || !menu) return;
  const iconOpen = toggle.querySelector('[data-icon-open]');
  const iconClose = toggle.querySelector('[data-icon-close]');

  const setOpen = (open: boolean, restoreFocus = true) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
    menu.hidden = !open;
    iconOpen?.classList.toggle('hidden', open);
    iconClose?.classList.toggle('hidden', !open);
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (open) menu.querySelector<HTMLElement>('a')?.focus();
    else if (restoreFocus) toggle.focus();
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.querySelectorAll('[data-menu-link]').forEach((a) => a.addEventListener('click', () => setOpen(false, false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) setOpen(false);
  });
  // Tutup otomatis bila layar melebar ke desktop.
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => {
    if (e.matches && !menu.hidden) setOpen(false, false);
  });
}

/* --------------------------------------------------- 3. Status timeline */
const STATUS_TEXT = { upcoming: 'Akan datang', ongoing: 'Berlangsung', completed: 'Selesai' } as const;

function initTimelineStatus(): void {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta' }).format(new Date());
  document.querySelectorAll<HTMLElement>('[data-timeline-item][data-start]').forEach((item) => {
    const start = item.dataset.start;
    // Tahap terbuka tanpa batas (data-open-ended) tidak pernah "Selesai".
    const end = item.dataset.end ?? ('openEnded' in item.dataset ? '9999-12-31' : start);
    if (!start || !end) return;
    const status: keyof typeof STATUS_TEXT = today < start ? 'upcoming' : today > end ? 'completed' : 'ongoing';
    item.dataset.status = status;
    const label = item.querySelector<HTMLElement>('[data-status-label]');
    const text = item.querySelector<HTMLElement>('[data-status-text]');
    if (label && text) {
      text.textContent = STATUS_TEXT[status];
      label.classList.remove('hidden');
    }
  });
}

/* ------------------------------------------- 4. Smooth scroll anchor */
// Hanya untuk klik mouse/sentuh; aktivasi lewat keyboard (detail 0) tetap memakai lompatan bawaan browser.
function initSmoothAnchors(): void {
  document.addEventListener('click', (e) => {
    if (reducedMotion.matches || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.detail === 0) return;
    const a = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href')!.slice(1);
    const target = id ? document.getElementById(id) : null;
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.pushState(null, '', `#${id}`);
  });
}

initMenu();
initSmoothAnchors();
initTimelineStatus();
