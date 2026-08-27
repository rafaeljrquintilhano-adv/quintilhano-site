const landingScript = document.createElement('script');
landingScript.src = '../../landing-pages/auxilio-acidente/script.js';
document.currentScript.after(landingScript);

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const heroBackgroundVideo = document.querySelector('.hero-background-video');
const situationStrip = document.querySelector('.situation-strip');
const whatsappUrl = 'https://api.whatsapp.com/message/IVSTMA4FQGFDD1?autoload=1&app_absent=0';

document.querySelectorAll('a[href="https://wa.me/message/IVSTMA4FQGFDD1"]').forEach((link) => {
	link.href = whatsappUrl;
});

if (heroBackgroundVideo) {

	const slowVideo = () => {
		heroBackgroundVideo.playbackRate = 0.45;
	};

	slowVideo();
	heroBackgroundVideo.addEventListener('loadedmetadata', slowVideo);
}

if (situationStrip && !reducedMotion) {

	const moveStrip = () => {
		if (situationStrip.scrollWidth > situationStrip.clientWidth && situationStrip.scrollLeft === 0) {
			situationStrip.scrollTo({ left: 1, behavior: 'smooth' });
		}
	};

	window.addEventListener('load', moveStrip, { once: true });
}