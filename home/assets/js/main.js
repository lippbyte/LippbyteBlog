/* ═══════════════════════════════════════════════════════
   DEVLOG — Global JavaScript
   Handles: dark mode, reading progress, sidebar nav,
            smooth scroll, card animations, tag slider
═══════════════════════════════════════════════════════ */

/* ── 1. Theme (Dark/Light Mode) Toggle ── */
const themeToggleBtn = document.getElementById('themeToggle');
const themeToggleIcon = document.getElementById('themeToggleIcon');

const ICONS = {
  moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>',
  sun: '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>'
};

// Apply saved theme immediately (before DOMContentLoaded to prevent flash)
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

/* ── Main logic after DOM ready ── */
document.addEventListener('DOMContentLoaded', () => {

  /* ── 2. Reading progress bar ── */
  const progressFill = document.getElementById('topFill');
  if (progressFill) {
    const updateProgress = () => {
      const d = document.documentElement;
      const scrolled = d.scrollTop || document.body.scrollTop;
      const total = d.scrollHeight - d.clientHeight;
      const pct = total > 0 ? Math.min(Math.round((scrolled / total) * 100), 100) : 0;
      progressFill.style.width = pct + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
  }

  /* ── 3. Blog page: active part tracking in sidebar ── */
  const partSections = document.querySelectorAll('.part-section');
  const partNavLinks = document.querySelectorAll('#partNav > li > a');

  if (partSections.length && partNavLinks.length) {
    const NAV_OFFSET = 70;

    const getActiveSection = () => {
      let active = partSections[0];
      partSections.forEach(sec => {
        if (sec.getBoundingClientRect().top <= NAV_OFFSET + 20) {
          active = sec;
        }
      });
      return active;
    };

    const updateSidebarNav = () => {
      const activeId = getActiveSection().id;
      partNavLinks.forEach(link => {
        const isActive = link.dataset.part === activeId;
        link.classList.toggle('active', isActive);

        const toc = document.getElementById('toc-' + link.dataset.part);
        if (toc) toc.classList.toggle('open', isActive);
      });
    };

    window.addEventListener('scroll', updateSidebarNav, { passive: true });
    updateSidebarNav();
  }

  /* ── 4. Smooth scroll for all anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
        ) || 56;
        window.scrollTo({
          top: target.offsetTop - offset - 8,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ── 5. Animate index cards on scroll ── */
  const cards = document.querySelectorAll('.blog-card');
  if (cards.length && 'IntersectionObserver' in window) {
    // Store original inline opacity before overriding
    const originalOpacities = [];
    cards.forEach((card, i) => {
      originalOpacities.push(card.style.opacity || '1');
      card.style.opacity = '0';
      card.style.transform = 'translateY(16px)';
      card.style.transition = `opacity .4s ease ${i * 0.08}s, transform .4s ease ${i * 0.08}s`;
    });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = Array.from(cards).indexOf(entry.target);
          entry.target.style.opacity = originalOpacities[idx];
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));
  }

  /* ── 6. Hero entrance animation ── */
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(16px)';
    heroContent.style.transition = 'opacity .5s ease, transform .5s ease';
    requestAnimationFrame(() => {
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    });
  }

  /* ── 7. Stats counter animation ── */
  const statNums = document.querySelectorAll('.stat-num');
  if (statNums.length && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    statNums.forEach((num, i) => {
      num.style.opacity = '0';
      num.style.transform = 'translateY(8px)';
      num.style.transition = `opacity .4s ease ${i * 0.1}s, transform .4s ease ${i * 0.1}s`;
      statsObserver.observe(num);
    });
  }

});
