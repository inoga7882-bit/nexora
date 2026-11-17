/* ============================================================
   Nagwa Ibrahim | Portfolio — Scripts
   ============================================================ */
(function() {
  'use strict';

  // ---------- Navbar scroll state ----------
  const navbar = document.getElementById('navbar');
  const scrollTop = document.getElementById('scrollTop');

  function onScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    if (window.scrollY > 400) {
      scrollTop.classList.add('visible');
    } else {
      scrollTop.classList.remove('visible');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Mobile nav toggle ----------
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // ---------- Active nav link on scroll (scroll spy) ----------
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = navLinks.querySelectorAll('a');

  function updateActive() {
    let current = '';
    sections.forEach(function(sec) {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) {
        current = sec.getAttribute('id');
      }
    });
    navAnchors.forEach(function(a) {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) {
        a.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();

  // ---------- Scroll to top button ----------
  scrollTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---------- Reveal on scroll (IntersectionObserver) ----------
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Animate skill bars when their card becomes visible
          const bars = entry.target.querySelectorAll('.skill-progress');
          bars.forEach(function(bar) {
            const pct = bar.getAttribute('data-progress');
            bar.style.width = pct + '%';
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function(el) { observer.observe(el); });
  } else {
    // Fallback: show all
    reveals.forEach(function(el) { el.classList.add('visible'); });
    document.querySelectorAll('.skill-progress').forEach(function(bar) {
      bar.style.width = bar.getAttribute('data-progress') + '%';
    });
  }

  // ---------- Contact form (mailto) ----------
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = encodeURIComponent(document.getElementById('name').value.trim());
    const email = encodeURIComponent(document.getElementById('email').value.trim());
    const subject = encodeURIComponent(
      document.getElementById('subject').value.trim() || 'Portfolio contact'
    );
    const message = encodeURIComponent(document.getElementById('message').value.trim());

    const body = encodeURIComponent(
      'Name: ' + decodeURIComponent(name) + '\n' +
      'Email: ' + decodeURIComponent(email) + '\n\n' +
      'Message:\n' + decodeURIComponent(message)
    );

    const mailto = 'mailto:nagwafayad15@gmail.com?subject=' + subject + '&body=' + body;
    window.location.href = mailto;

    // Visual feedback
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Opening email... ✓';
    btn.style.background = '#10b981';
    setTimeout(function() {
      btn.innerHTML = originalText;
      btn.style.background = '';
      form.reset();
    }, 2500);
  });

  // ---------- Footer year ----------
  document.getElementById('year').textContent = new Date().getFullYear();

})();
