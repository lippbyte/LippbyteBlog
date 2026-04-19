/* ── Theme (Dark/Light Mode) Toggle ── */
const themeToggleBtn = document.getElementById('themeToggle');
const themeToggleIcon = document.getElementById('themeToggleIcon');

const ICONS = {
  moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>',
  sun: '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>'
};

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark');
  if (themeToggleIcon) themeToggleIcon.innerHTML = ICONS.sun;
} else {
  document.documentElement.classList.remove('dark');
  if (themeToggleIcon) themeToggleIcon.innerHTML = ICONS.moon;
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.theme = isDark ? 'dark' : 'light';
    if (themeToggleIcon) themeToggleIcon.innerHTML = isDark ? ICONS.sun : ICONS.moon;
  });
}

/* ── Reading progress (top bar) ── */
const fill = document.getElementById('topFill');
window.addEventListener('scroll', () => {
  const d = document.documentElement;
  const p = Math.round((d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100);
  if (fill) fill.style.width = Math.min(p, 100) + '%';
});

/* ── Active part tracking, ToC toggle & progress rings ── */
const sections  = document.querySelectorAll('.part-section');
const navLinks  = document.querySelectorAll('#partNav > li > a');
const NAV_H     = 60;
const CIRCUMFERENCE = 2 * Math.PI * 15.5; // ~97.4

function getActiveSection() {
  let active = sections[0];
  sections.forEach(sec => {
    if (sec.getBoundingClientRect().top <= NAV_H + 40) active = sec;
  });
  return active;
}

function getSectionProgress(section) {
  const rect = section.getBoundingClientRect();
  const sectionHeight = section.offsetHeight;
  const scrolledPast = (NAV_H + 40) - rect.top;
  if (scrolledPast <= 0) return 0;
  if (scrolledPast >= sectionHeight) return 100;
  return Math.round((scrolledPast / (sectionHeight - window.innerHeight * 0.3)) * 100);
}

function updateNav() {
  const activeId = getActiveSection().id;
  navLinks.forEach(link => {
    const part = link.dataset.part;
    const isActive = part === activeId;
    link.classList.toggle('active', isActive);
    const toc = document.getElementById('toc-' + part);
    if (toc) toc.classList.toggle('open', isActive);
  });

  // Update progress rings
  sections.forEach(section => {
    const progress = Math.min(getSectionProgress(section), 100);
    const ring = document.querySelector(`.nav-progress-ring[data-section="${section.id}"] .progress-circle`);
    if (ring) {
      const offset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;
      ring.style.strokeDashoffset = Math.max(offset, 0);
    }
  });

  // ToC sub-heading active state
  const allH2s = document.querySelectorAll('.content-body h2[id]');
  let activeH2 = null;
  allH2s.forEach(h2 => { if (h2.getBoundingClientRect().top <= NAV_H + 60) activeH2 = h2; });
  document.querySelectorAll('.toc-sub a').forEach(a => {
    a.classList.toggle('toc-active', activeH2 && a.getAttribute('href') === '#' + activeH2.id);
  });
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

/* ── Smooth scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - NAV_H - 8, behavior: 'smooth' });
    }
  });
});
