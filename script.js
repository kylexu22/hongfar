// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile menu when a nav link is clicked
      document.body.classList.remove('nav-open');
      document.getElementById('nav-bar').classList.remove('is-open');
      var toggle = document.getElementById('nav-toggle');
      var backdrop = document.getElementById('nav-backdrop');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
      if (backdrop) backdrop.setAttribute('aria-hidden', 'true');
    }
  });
});

// Mobile nav toggle
(function () {
  var navBar = document.getElementById('nav-bar');
  var navToggle = document.getElementById('nav-toggle');
  var navBackdrop = document.getElementById('nav-backdrop');
  if (!navBar || !navToggle || !navBackdrop) return;

  function openMenu() {
    navBar.classList.add('is-open');
    document.body.classList.add('nav-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navBackdrop.setAttribute('aria-hidden', 'false');
  }

  function closeMenu() {
    navBar.classList.remove('is-open');
    document.body.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navBackdrop.setAttribute('aria-hidden', 'true');
  }

  navToggle.addEventListener('click', function () {
    if (navBar.classList.contains('is-open')) closeMenu();
    else openMenu();
  });

  navBackdrop.addEventListener('click', closeMenu);
})();

// Gallery carousel
(function () {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  const slides = carousel.querySelectorAll('.carousel-slide');
  const prevBtn = carousel.querySelector('.carousel-btn--prev');
  const nextBtn = carousel.querySelector('.carousel-btn--next');
  const dotsEl = carousel.querySelector('.carousel-dots');

  const total = slides.length;
  let index = 0;

  function goTo(i) {
    index = ((i % total) + total) % total;
    track.style.transform = 'translateX(-' + index * 100 + '%)';
    dotsEl.querySelectorAll('button').forEach((btn, j) => {
      btn.classList.toggle('is-active', j === index);
      btn.setAttribute('aria-selected', j === index);
    });
  }

  function buildDots() {
    for (let i = 0; i < total; i++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      btn.setAttribute('aria-selected', i === 0);
      btn.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(btn);
    }
    dotsEl.querySelector('button').classList.add('is-active');
  }

  buildDots();
  prevBtn.addEventListener('click', () => goTo(index - 1));
  nextBtn.addEventListener('click', () => goTo(index + 1));
})();