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


const initAnimations = () => {
  const animatedEls = document.querySelectorAll('.animate-on-scroll');
  if (!animatedEls.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  const parents = new Set();
  animatedEls.forEach(el => parents.add(el.parentElement));
  parents.forEach(parent => {
    const siblings = [...parent.querySelectorAll('.animate-on-scroll')];
    siblings.forEach((el, i) => {
      el.style.setProperty('--stagger-delay', `${i * 90}ms`);
    });
  });

  animatedEls.forEach(el => observer.observe(el));
};

const initModal = () => {
  const modal = document.querySelector('#signup-modal');
  if (!modal) return;

  const backdrop = modal.querySelector('.modal__backdrop');
  const closeBtn = modal.querySelector('.modal__close');
  const form = modal.querySelector('.modal__form');
  const successDiv = modal.querySelector('.modal__success');
  const nameInput = modal.querySelector('#modal-name');
  const emailInput = modal.querySelector('#modal-email');
  const nameField = nameInput?.closest('.modal__field');
  const emailField = emailInput?.closest('.modal__field');
  const nameError = nameField?.querySelector('.field-error');
  const emailError = emailField?.querySelector('.field-error');

  let openerEl = null;

  const getFocusable = () => [
    ...modal.querySelectorAll('a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'),
  ];

  const resetForm = () => {
    form?.removeAttribute('hidden');
    successDiv?.setAttribute('hidden', '');
    form?.reset();
    nameField?.classList.remove('is-invalid');
    emailField?.classList.remove('is-invalid');
    nameError?.setAttribute('hidden', '');
    emailError?.setAttribute('hidden', '');
  };

  const openModal = trigger => {
    openerEl = trigger;
    resetForm();
    modal.removeAttribute('hidden');
    requestAnimationFrame(() => {
      modal.classList.add('is-open');
      getFocusable()[0]?.focus();
    });
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.addEventListener('transitionend', () => {
      modal.setAttribute('hidden', '');
    }, { once: true });
    document.body.style.overflow = '';
    openerEl?.focus();
    openerEl = null;
  };

  document.querySelectorAll('[data-open-modal]').forEach(trigger => {
    trigger.addEventListener('click', () => openModal(trigger));
  });

  closeBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', closeModal);

  document.addEventListener('keydown', e => {
    if (!modal.classList.contains('is-open')) return;
    if (e.key === 'Escape') { closeModal(); return; }
    if (e.key === 'Tab') {
      const focusable = getFocusable();
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
  });

  const isValidEmail = val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  form?.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    if (!nameInput?.value.trim()) {
      nameField?.classList.add('is-invalid');
      nameError?.removeAttribute('hidden');
      valid = false;
    } else {
      nameField?.classList.remove('is-invalid');
      nameError?.setAttribute('hidden', '');
    }

    if (!emailInput?.value.trim() || !isValidEmail(emailInput.value)) {
      emailField?.classList.add('is-invalid');
      emailError?.removeAttribute('hidden');
      valid = false;
    } else {
      emailField?.classList.remove('is-invalid');
      emailError?.setAttribute('hidden', '');
    }

    if (valid) {
      form.setAttribute('hidden', '');
      successDiv?.removeAttribute('hidden');
    }
  });
};

const initPricingToggle = () => {
  const toggleBtn = document.querySelector('.pricing__toggle-btn');
  if (!toggleBtn) return;

  const amounts = document.querySelectorAll('[data-monthly]');
  const annualNotes = document.querySelectorAll('.pricing__annual-note');

  toggleBtn.addEventListener('click', () => {
    const nowAnnual = toggleBtn.getAttribute('aria-checked') !== 'true';
    toggleBtn.setAttribute('aria-checked', String(nowAnnual));

    amounts.forEach(el => {
      el.textContent = nowAnnual
        ? el.getAttribute('data-annual')
        : el.getAttribute('data-monthly');
    });

    annualNotes.forEach(el => {
      if (nowAnnual) el.removeAttribute('hidden');
      else el.setAttribute('hidden', '');
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initNavScroll();
  initMobileMenu();
  initSmoothScroll();
  initAnimations();
  initModal();
  initPricingToggle();
});
