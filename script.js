/* ════════════════════════════════════════════════════
   ANURAG SINGH PORTFOLIO — script.js
   ════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── HAMBURGER MENU ─────────────────────────────────
  const ham = document.getElementById('ham');
  const mobileMenu = document.getElementById('mobile-menu');

  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      ham.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  // ── NAV SCROLL SHADOW ──────────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  // ── SCROLL REVEAL ──────────────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });

  // ── COUNTER ANIMATION ──────────────────────────────
  function animateCounter(el) {
    const target  = parseInt(el.dataset.count);
    const prefix  = el.dataset.prefix || '';
    const suffix  = el.dataset.suffix || '';
    const duration = 1600;
    let startTime = null;

    const easeOut = t => 1 - Math.pow(1 - t, 3);

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current  = Math.round(easeOut(progress) * target);
      el.textContent = prefix + current + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => {
    counterObserver.observe(el);
  });

  // ── SKILL BAR ANIMATION ────────────────────────────
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(bar => {
          const width = bar.dataset.width;
          bar.style.width = width + '%';
        });
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skill-group').forEach(group => {
    barObserver.observe(group);
  });

  // ── CONTACT FORM ───────────────────────────────────
  window.submitForm = function () {
    const name  = document.getElementById('f-name').value.trim();
    const email = document.getElementById('f-email').value.trim();
    const msg   = document.getElementById('f-msg').value.trim();

    if (!name || !email) {
      alert('Please fill in your name and email before sending.');
      return;
    }

    // In production, replace this with a real form handler
    // e.g. Formspree, EmailJS, or a backend endpoint
    document.getElementById('form-body').style.display  = 'none';
    document.getElementById('form-success').style.display = 'block';
  };

  // ── ACTIVE NAV LINK ON SCROLL ──────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}`
            ? 'var(--text)'
            : '';
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => sectionObserver.observe(s));

});
