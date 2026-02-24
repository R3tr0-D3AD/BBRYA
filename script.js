/* ============================================================
   BLUE BULLS YOUTH RUGBY — Premium JavaScript
   ============================================================ */

// PAGE LOADER
window.addEventListener('load', function () {
  const loader = document.querySelector('.page-loader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 400);
  }
});

// NAVBAR SCROLL STATE
(function () {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// MOBILE MENU TOGGLE
function toggleMenu() {
  const navMenu = document.getElementById('navMenu');
  const toggle = document.querySelector('.mobile-menu-toggle');
  if (!navMenu) return;
  const isOpen = navMenu.classList.toggle('active');
  if (toggle) {
    toggle.textContent = isOpen ? '✕' : '☰';
    toggle.style.transform = isOpen ? 'rotate(90deg)' : 'rotate(0deg)';
    toggle.style.transition = 'transform 0.3s ease';
  }
}

// Mobile dropdown toggles
document.querySelectorAll('.dropdown > a').forEach(link => {
  link.addEventListener('click', function (e) {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const dropdown = this.closest('.dropdown');
      dropdown.classList.toggle('active');
    }
  });
});

// Close menu on outside click
document.addEventListener('click', function (e) {
  const navMenu = document.getElementById('navMenu');
  const toggle = document.querySelector('.mobile-menu-toggle');
  if (navMenu && navMenu.classList.contains('active') &&
    !navMenu.contains(e.target) && !toggle?.contains(e.target)) {
    navMenu.classList.remove('active');
    if (toggle) { toggle.textContent = '☰'; toggle.style.transform = 'rotate(0deg)'; }
  }
});

// ESC closes menu
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    const navMenu = document.getElementById('navMenu');
    if (navMenu?.classList.contains('active')) toggleMenu();
  }
});

// BACK TO TOP
(function () {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// SCROLL REVEAL with IntersectionObserver
(function () {
  const els = document.querySelectorAll('.scroll-reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
})();

// SMOOTH SCROLL for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '#!') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ACTIVE NAV LINK
(function () {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(a => {
    if (a.getAttribute('href') === page) {
      a.style.color = 'var(--bb-blue)';
      a.style.fontWeight = '700';
    }
  });
})();

// RIPPLE EFFECT on buttons
document.addEventListener('click', function (e) {
  const btn = e.target.closest('.btn');
  if (!btn) return;
  const ripple = document.createElement('span');
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2;
  ripple.style.cssText = `
    position:absolute; border-radius:50%;
    background:rgba(255,255,255,.25);
    width:${size}px; height:${size}px;
    left:${e.clientX - rect.left - size / 2}px;
    top:${e.clientY - rect.top - size / 2}px;
    transform:scale(0); animation:rippleAnim 0.55s ease-out forwards;
    pointer-events:none; z-index:10;
  `;
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
});

// ============================================================
// CLUB SEARCH & FILTER (clubs.html)
// ============================================================
(function () {
  const searchInput = document.getElementById('clubSearch');
  const areaFilter  = document.getElementById('clubAreaFilter');
  const ageFilter   = document.getElementById('clubAgeFilter');
  const cards       = document.querySelectorAll('.club-card');
  const noResults   = document.getElementById('clubNoResults');

  if (!searchInput && !areaFilter && !ageFilter) return;

  function filterClubs() {
    const search = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const area   = areaFilter  ? areaFilter.value  : '';
    const age    = ageFilter   ? ageFilter.value   : '';

    let visible = 0;
    cards.forEach(card => {
      const name      = (card.querySelector('h3')?.textContent || '').toLowerCase();
      const cardArea  = card.dataset.area  || '';
      const cardAges  = card.dataset.ages  || '';

      const matchSearch = !search || name.includes(search);
      const matchArea   = !area   || cardArea === area;
      const matchAge    = !age    || cardAges.includes(age);

      const show = matchSearch && matchArea && matchAge;
      card.classList.toggle('hidden', !show);
      if (show) visible++;
    });

    if (noResults) noResults.classList.toggle('visible', visible === 0);
  }

  if (searchInput) searchInput.addEventListener('input', filterClubs);
  if (areaFilter)  areaFilter.addEventListener('change', filterClubs);
  if (ageFilter)   ageFilter.addEventListener('change', filterClubs);
})();

// ============================================================
// FIXTURES FILTER (fixtures.html)
// ============================================================
(function () {
  const ageSelect  = document.getElementById('fixtureAge');
  const clubSelect = document.getElementById('fixtureClub');
  const dateSelect = document.getElementById('fixtureDate');

  if (!ageSelect && !clubSelect && !dateSelect) return;

  function filterFixtures() {
    const age  = ageSelect  ? ageSelect.value.toLowerCase()  : '';
    const club = clubSelect ? clubSelect.value.toLowerCase() : '';
    const date = dateSelect ? dateSelect.value : '';

    document.querySelectorAll('.fixture-row').forEach(row => {
      const rowAge  = (row.dataset.age  || '').toLowerCase();
      const rowClub = (row.dataset.club || '').toLowerCase();
      const rowDate = (row.dataset.dateType || '');

      const matchAge  = !age  || rowAge  === age;
      const matchClub = !club || rowClub.includes(club);
      const matchDate = !date || rowDate === date || date === 'all';

      row.classList.toggle('hidden', !(matchAge && matchClub && matchDate));
    });

    // Show/hide "no results" per table
    document.querySelectorAll('.fixtures-table').forEach(table => {
      const rows = table.querySelectorAll('.fixture-row:not(.hidden)');
      let noResultsRow = table.querySelector('.no-results-row');
      if (rows.length === 0) {
        if (!noResultsRow) {
          noResultsRow = document.createElement('tr');
          noResultsRow.className = 'no-results-row';
          noResultsRow.innerHTML = '<td colspan="7" style="text-align:center;padding:32px;color:var(--txt-3);font-style:italic;">No fixtures match your filters</td>';
          table.querySelector('tbody').appendChild(noResultsRow);
        }
        noResultsRow.style.display = '';
      } else if (noResultsRow) {
        noResultsRow.style.display = 'none';
      }
    });
  }

  if (ageSelect)  ageSelect.addEventListener('change', filterFixtures);
  if (clubSelect) clubSelect.addEventListener('change', filterFixtures);
  if (dateSelect) dateSelect.addEventListener('change', filterFixtures);
})();

// ============================================================
// FAQ ACCORDION (parents.html)
// ============================================================
(function () {
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', function () {
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      // Open clicked if it wasn't open
      if (!isOpen) item.classList.add('open');
    });
  });
})();

// ============================================================
// DONATION AMOUNT SELECTION (donate.html)
// ============================================================
(function () {
  document.querySelectorAll('.amount-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('selected'));
      this.classList.add('selected');
      const customInput = document.getElementById('customAmount');
      const amountField = document.getElementById('donationAmount');
      const val = this.dataset.amount;
      if (val === 'custom') {
        if (customInput) customInput.style.display = 'block';
      } else {
        if (customInput) customInput.style.display = 'none';
        if (amountField) amountField.value = val;
      }
    });
  });
})();

// ============================================================
// FORM SUBMISSION (contact.html etc.)
// ============================================================
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    if (!btn) return;
    const orig = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      const msg = document.createElement('div');
      msg.style.cssText = 'background:rgba(0,125,197,.1);border:1px solid var(--bb-blue);border-radius:14px;padding:20px 24px;margin-top:16px;color:var(--bb-dark);font-weight:600;';
      msg.textContent = '✅ Message sent! We\'ll be in touch within 1–2 business days.';
      this.insertAdjacentElement('afterend', msg);
      this.reset();
      btn.textContent = orig;
      btn.disabled = false;
      setTimeout(() => { msg.style.opacity='0'; msg.style.transition='opacity 0.4s'; setTimeout(()=>msg.remove(),400); }, 6000);
    }, 1200);
  });
});

// STATS COUNTER ANIMATION
(function () {
  const statEls = document.querySelectorAll('.stat-number[data-target]');
  if (!statEls.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1600;
      const start = performance.now();

      function tick(now) {
        const elapsed = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - elapsed, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (elapsed < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });

  statEls.forEach(el => obs.observe(el));
})();

// HERO PARALLAX (subtle)
(function () {
  const heroBg = document.querySelector('.hero-background');
  if (!heroBg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroBg.style.transform = `scale(1.08) translateY(${y * 0.15}px)`;
    }
  }, { passive: true });
})();

// KEYBOARD NAV indicator
document.addEventListener('keydown', () => document.body.classList.add('keyboard-nav'));
document.addEventListener('mousedown', () => document.body.classList.remove('keyboard-nav'));

// Console easter egg
console.log('%c🏉 BBYRA', 'color:#007DC5;font-size:24px;font-weight:900;font-family:monospace');
console.log('%cBlue Bulls Youth Rugby Association — Building Champions', 'color:#004F8C;font-size:13px');

window.BBYRA = { version: '2.0.0', initialized: new Date().toISOString() };