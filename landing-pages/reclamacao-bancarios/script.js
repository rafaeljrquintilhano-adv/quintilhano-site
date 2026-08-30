(function () {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const heroBackgroundVideo = document.querySelector('.hero-background-video');
  const situationStrip = document.querySelector('.situation-strip');
  const whatsappUrl = 'https://api.whatsapp.com/message/IVSTMA4FQGFDD1?autoload=1&app_absent=0';

  document.querySelectorAll('a[href="https://wa.me/message/IVSTMA4FQGFDD1"]').forEach((link) => {
    link.href = whatsappUrl;
  });

  if (heroBackgroundVideo) {
    const slowVideo = () => {
      heroBackgroundVideo.muted = true;
      heroBackgroundVideo.playsInline = true;
      heroBackgroundVideo.setAttribute('playsinline', 'true');
      heroBackgroundVideo.setAttribute('webkit-playsinline', 'true');
      heroBackgroundVideo.playbackRate = 0.45;

      heroBackgroundVideo.play().catch(() => {
        window.addEventListener('pointerdown', () => heroBackgroundVideo.play().catch(() => {}), { once: true });
      });
    };

    heroBackgroundVideo.addEventListener('loadedmetadata', slowVideo);
    heroBackgroundVideo.addEventListener('canplay', slowVideo);
    slowVideo();
  }

  if (situationStrip && !reducedMotion) {
    const moveStrip = () => {
      if (situationStrip.scrollWidth > situationStrip.clientWidth && situationStrip.scrollLeft === 0) {
        situationStrip.scrollTo({ left: 1, behavior: 'smooth' });
      }
    };

    window.addEventListener('load', moveStrip, { once: true });
  }

  const video = document.querySelector('[data-video]');

  if (video) {
    const cover = video.querySelector('.video-cover');
    const youtubeUrl = 'https://www.youtube.com/watch?v=m2ApLykFu-4&t=1s';

    const openVideo = (event) => {
      if (event) event.preventDefault();
      const popup = window.open(youtubeUrl, '_blank', 'noopener,noreferrer');
      if (!popup) {
        window.location.href = youtubeUrl;
      }
    };

    cover?.addEventListener('click', openVideo);
    cover?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openVideo(event);
      }
    });

    if (cover && cover.tagName === 'A') {
      cover.href = youtubeUrl;
      cover.setAttribute('target', '_blank');
      cover.setAttribute('rel', 'noopener noreferrer');
    }
  }

  document.querySelectorAll('.accordion details').forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      document.querySelectorAll('.accordion details[open]').forEach((openItem) => {
        if (openItem !== item) openItem.open = false;
      });
    });
  });

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
})();