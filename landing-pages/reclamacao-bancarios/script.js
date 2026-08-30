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
    const localVideoUrl = '../../Vídeo/Quintilhano%20Conectando%20solu%C3%A7%C3%B5es%20jur%C3%ADdicas%2C%20cont%C3%A1beis%20e%20imobili%C3%A1rias%20em%20um%20s%C3%B3%20lugar.%20-%20Quintilhano%20Advocacia%20(1080p%2C%20h264%2C%20youtube).mp4';

    const injectVideoPlayer = () => {
      const existingPlayer = video.querySelector('.local-video-player');
      if (existingPlayer) {
        existingPlayer.play();
        return;
      }

      const player = document.createElement('video');
      player.className = 'local-video-player';
      player.src = localVideoUrl;
      player.controls = true;
      player.autoplay = true;
      player.playsInline = true;
      player.preload = 'metadata';
      player.setAttribute('playsinline', 'true');
      player.setAttribute('controls', 'controls');

      cover?.replaceWith(player);
      player.focus();
    };

    cover?.addEventListener('click', injectVideoPlayer);
    cover?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        injectVideoPlayer();
      }
    });
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