const video = document.querySelector('[data-video]');

if (video) {
  const cover = video.querySelector('.video-cover');

  cover?.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/m2ApLykFu-4?autoplay=1';
    iframe.title = 'Vídeo informativo da Quintilhano Advogados Associados';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    video.replaceChildren(iframe);
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

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
