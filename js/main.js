const NAV_HEIGHT = 72;
const SCROLL_THRESHOLD = 50;

const initNavScroll = () => {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const handleNavScroll = () => {
    if (window.scrollY > SCROLL_THRESHOLD) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
};

const initMobileMenu = () => {
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileLinks = document.querySelectorAll('.nav__mobile-menu .nav__link');

  if (!nav || !hamburger) return;

  const handleMenuToggle = () => {
    const isOpen = nav.classList.toggle('nav--open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  };

  hamburger.addEventListener('click', handleMenuToggle);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav--open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
};

const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - NAV_HEIGHT,
        behavior: 'smooth',
      });
    });
  });
};

const initTypewriter = () => {
  const heading = document.querySelector('.hero__heading');
  if (!heading) return;

  const typewriterEl = heading.querySelector('.hero__typewriter');
  if (!typewriterEl) return;

  const phrases = [
    'Start Understanding It.',
    'Start Moving Faster.',
    'Start Collaborating Better.',
    'Start Seeing Clearly.',
  ];

  const TYPING_SPEED  = 60;
  const DELETING_SPEED = 35;
  const PAUSE_FULL    = 2200;
  const PAUSE_EMPTY   = 400;

  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;

  const tick = () => {
    const current = phrases[phraseIndex];

    charIndex += isDeleting ? -1 : 1;
    typewriterEl.textContent = current.slice(0, charIndex);

    let delay = isDeleting ? DELETING_SPEED : TYPING_SPEED;

    if (!isDeleting && charIndex === current.length) {
      delay = PAUSE_FULL;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = PAUSE_EMPTY;
    }

    setTimeout(tick, delay);
  };

  typewriterEl.textContent = '';
  setTimeout(tick, PAUSE_EMPTY);
};

document.addEventListener('DOMContentLoaded', () => {
  initNavScroll();
  initMobileMenu();
  initSmoothScroll();
  initTypewriter();
});
