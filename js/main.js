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

document.addEventListener('DOMContentLoaded', () => {
  initNavScroll();
  initMobileMenu();
  initSmoothScroll();
});
