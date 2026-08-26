document.documentElement.classList.add('js');

const siteFooter = document.querySelector('.site-footer');

if (siteFooter && !siteFooter.querySelector('.footer-social')) {
  const footerBottom = siteFooter.querySelector('.footer-bottom');
  const socialNav = document.createElement('nav');
  socialNav.className = 'container footer-social';
  socialNav.setAttribute('aria-label', 'Redes sociais');
  socialNav.innerHTML = `
    <span class="footer-social-label">Acompanhe o Quintilhano</span>
    <div class="footer-social-links">
      <a href="https://www.instagram.com/quintilhano.adv/" target="_blank" rel="noopener noreferrer" aria-label="Instagram da Quintilhano">
        <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle class="social-dot" cx="17.5" cy="6.5" r="1"></circle></svg>
      </a>
      <a href="https://www.tiktok.com/@quintilhano.adv" target="_blank" rel="noopener noreferrer" aria-label="TikTok da Quintilhano">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 4v10.2a4.7 4.7 0 1 1-4-4.65"></path><path d="M14.5 4c.7 2.5 2.2 3.9 4.5 4.2"></path></svg>
      </a>
      <a href="https://www.facebook.com/quintilhanoadvocacia/?locale=pt_BR" target="_blank" rel="noopener noreferrer" aria-label="Facebook da Quintilhano">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 21v-8h3l.5-3h-3.5V8.2c0-.9.3-1.7 1.8-1.7H18V3.8c-.7-.1-1.5-.2-2.3-.2-2.3 0-4 1.4-4 4.1V10H9v3h2.7v8"></path></svg>
      </a>
      <a href="https://www.youtube.com/@quintilhano_advocacia" target="_blank" rel="noopener noreferrer" aria-label="YouTube da Quintilhano">
        <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="4"></rect><path d="m10 9 5 3-5 3Z"></path></svg>
      </a>
      <a href="https://api.whatsapp.com/message/IVSTMA4FQGFDD1?autoload=1&amp;app_absent=0" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp da Quintilhano">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.6a8 8 0 0 1-11.8 7L4 20l1.4-4A8 8 0 1 1 20 11.6Z"></path><path d="M9 8.5c.5 2.8 2 4.3 4.7 5.2"></path><path d="m9 8.5.8-1 1.3 2-1 1"></path><path d="m13.7 13.7 1-1 2 1.2-1 1c-.7.6-1.3.4-2-.2"></path></svg>
      </a>
      <a href="https://br.linkedin.com/company/quintilhano-adv" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn da Quintilhano">
        <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="9" width="3" height="11"></rect><circle cx="5.5" cy="5.5" r="1.5"></circle><path d="M11 20V9h3v1.7c1-1.4 5-2.2 5 2.8V20h-3v-5.5c0-2.2-2-2.1-2-2.1V20Z"></path></svg>
      </a>
    </div>`;

  if (footerBottom) siteFooter.insertBefore(socialNav, footerBottom);
  else siteFooter.appendChild(socialNav);
}

if (siteFooter) {
  const footerNavigation = [...siteFooter.querySelectorAll('.footer-grid > div')]
    .find((column) => column.firstElementChild?.textContent.trim() === 'Navegação');

  if (footerNavigation && !footerNavigation.querySelector('[data-footer-about]')) {
    const sharedScript = document.querySelector('script[src$="script.js"]');
    const scriptPath = sharedScript?.getAttribute('src') || '';
    const aboutLink = document.createElement('a');
    aboutLink.href = scriptPath.startsWith('../') ? '../quem-somos.html' : 'quem-somos.html';
    aboutLink.textContent = 'Quem Somos';
    aboutLink.dataset.footerAbout = '';
    if (document.body.classList.contains('about-page')) aboutLink.setAttribute('aria-current', 'page');
    footerNavigation.insertBefore(aboutLink, footerNavigation.children[1] || null);
  }
}

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#menu-principal');

if (toggle && nav) {
  const dropdown = nav.querySelector('.nav-dropdown');
  const dropdownToggle = nav.querySelector('.nav-dropdown-toggle');

  const closeDropdown = () => {
    if (!dropdown || !dropdownToggle) return;
    dropdown.classList.remove('open');
    dropdownToggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    toggle.setAttribute('aria-label', open ? 'Abrir menu' : 'Fechar menu');
    nav.classList.toggle('open', !open);
    if (open) closeDropdown();
  });

  if (dropdown && dropdownToggle) {
    dropdownToggle.addEventListener('click', () => {
      const open = dropdownToggle.getAttribute('aria-expanded') === 'true';
      dropdown.classList.toggle('open', !open);
      dropdownToggle.setAttribute('aria-expanded', String(!open));
    });

    document.addEventListener('click', (event) => {
      if (!dropdown.contains(event.target)) closeDropdown();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      closeDropdown();
      dropdownToggle.focus();
    });
  }

  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
    closeDropdown();
  }));
}

const contactForm = document.querySelector('#contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formStatus = document.querySelector('.form-status');
    if (formStatus) formStatus.textContent = 'Protótipo: o formulário será conectado no WordPress após a aprovação do layout.';
  });
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const introReveals = document.querySelectorAll('.intro-reveal');

const areaPage = document.querySelector('.area-page');

if (areaPage) {
  const areaMotionElements = areaPage.querySelectorAll([
    '.area-overview-grid > *',
    '.area-section-heading > *',
    '.service-item',
    '.area-method .section-number',
    '.area-method h2',
    '.method-step',
    '.other-areas .section-number',
    '.other-areas h2',
    '.other-area-list a',
    '.area-cta-inner > *'
  ].join(','));

  areaMotionElements.forEach((element, index) => {
    element.classList.add('area-motion');
    element.style.setProperty('--area-delay', `${(index % 4) * 70}ms`);
  });

  if (reducedMotion || !('IntersectionObserver' in window)) {
    areaMotionElements.forEach((element) => element.classList.add('is-visible'));
  } else {
    const areaObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -7% 0px' });

    areaMotionElements.forEach((element) => areaObserver.observe(element));
  }
}

const lawyerPage = document.querySelector('.lawyer-page');

if (lawyerPage) {
  const lawyerMotionElements = lawyerPage.querySelectorAll([
    '.lawyer-intro-grid > *',
    '.lawyer-story-heading > *',
    '.lawyer-story-copy > *',
    '.education-heading > *',
    '.education-item',
    '.lawyer-practice-heading > *',
    '.lawyer-practice-item',
    '.lawyer-quote-inner > *',
    '.lawyer-team-heading > *',
    '.lawyer-team-link',
    '.lawyer-cta-inner > *'
  ].join(','));

  lawyerMotionElements.forEach((element, index) => {
    element.classList.add('lawyer-motion');
    element.style.setProperty('--lawyer-delay', `${(index % 4) * 75}ms`);
  });

  if (reducedMotion || !('IntersectionObserver' in window)) {
    lawyerMotionElements.forEach((element) => element.classList.add('is-visible'));
  } else {
    const lawyerObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -7% 0px' });

    lawyerMotionElements.forEach((element) => lawyerObserver.observe(element));
  }
}

const aboutPage = document.querySelector('.about-page');

if (aboutPage) {
  const aboutMotionElements = aboutPage.querySelectorAll([
    '.about-intro-grid > *',
    '.about-stat',
    '.about-values-heading > *',
    '.about-value',
    '.about-approach-copy > *',
    '.about-approach-visual',
    '.about-audience-heading > *',
    '.about-audience-card',
    '.about-cta-inner > *'
  ].join(','));

  aboutMotionElements.forEach((element, index) => {
    element.classList.add('about-motion');
    element.style.setProperty('--about-delay', `${(index % 3) * 85}ms`);
  });

  if (reducedMotion || !('IntersectionObserver' in window)) {
    aboutMotionElements.forEach((element) => element.classList.add('is-visible'));
  } else {
    const aboutObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -7% 0px' });

    aboutMotionElements.forEach((element) => aboutObserver.observe(element));
  }
}

if (reducedMotion || !('IntersectionObserver' in window)) {
  introReveals.forEach((element) => element.classList.add('is-visible'));
} else {
  const introObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

  introReveals.forEach((element) => introObserver.observe(element));
}

const officeScene = document.querySelector('[data-office-parallax]');

if (officeScene && !reducedMotion) {
  const layers = [...officeScene.querySelectorAll('[data-depth]')];
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let animationFrame = null;

  const animateLayers = () => {
    currentX += (targetX - currentX) * 0.085;
    currentY += (targetY - currentY) * 0.085;

    layers.forEach((layer) => {
      const depth = Number(layer.dataset.depth);
      const offsetX = currentX * depth * 68;
      const offsetY = currentY * depth * 68;
      layer.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
    });

    const stillMoving = Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001;
    animationFrame = stillMoving ? requestAnimationFrame(animateLayers) : null;
  };

  const requestLayerAnimation = () => {
    if (animationFrame === null) animationFrame = requestAnimationFrame(animateLayers);
  };

  officeScene.addEventListener('pointermove', (event) => {
    const bounds = officeScene.getBoundingClientRect();
    targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    requestLayerAnimation();
  });

  officeScene.addEventListener('pointerleave', () => {
    targetX = 0;
    targetY = 0;
    requestLayerAnimation();
  });
}

const heroParallax = document.querySelector('[data-hero-parallax]');
const heroLogo = document.querySelector('[data-hero-logo]');
const hasPrecisePointer = window.matchMedia('(pointer: fine)').matches;

if (heroParallax && heroLogo && hasPrecisePointer && !reducedMotion) {
  let targetHeroX = 0;
  let targetHeroY = 0;
  let currentHeroX = 0;
  let currentHeroY = 0;
  let heroAnimationFrame = null;

  const animateHeroLogo = () => {
    currentHeroX += (targetHeroX - currentHeroX) * 0.075;
    currentHeroY += (targetHeroY - currentHeroY) * 0.075;

    const offsetX = currentHeroX * 14;
    const offsetY = currentHeroY * 10;
    const rotation = currentHeroX * 0.65;
    heroLogo.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0) rotate(${rotation}deg)`;

    const stillMoving = Math.abs(targetHeroX - currentHeroX) > 0.001 || Math.abs(targetHeroY - currentHeroY) > 0.001;
    heroAnimationFrame = stillMoving ? requestAnimationFrame(animateHeroLogo) : null;
  };

  const requestHeroAnimation = () => {
    if (heroAnimationFrame === null) heroAnimationFrame = requestAnimationFrame(animateHeroLogo);
  };

  heroParallax.addEventListener('pointermove', (event) => {
    const bounds = heroParallax.getBoundingClientRect();
    targetHeroX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    targetHeroY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    requestHeroAnimation();
  });

  heroParallax.addEventListener('pointerleave', () => {
    targetHeroX = 0;
    targetHeroY = 0;
    requestHeroAnimation();
  });
}

const backToTop = document.createElement('button');
backToTop.className = 'back-to-top';
backToTop.type = 'button';
backToTop.setAttribute('aria-label', 'Voltar ao topo');
backToTop.title = 'Voltar ao topo';
backToTop.innerHTML = '<span aria-hidden="true">↑</span>';
document.body.appendChild(backToTop);

const updateBackToTop = () => {
  const isVisible = window.scrollY > 420;
  backToTop.classList.toggle('is-visible', isVisible);
  backToTop.tabIndex = isVisible ? 0 : -1;
};

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
});

window.addEventListener('scroll', updateBackToTop, { passive: true });
updateBackToTop();
