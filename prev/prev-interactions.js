const landingScript = document.createElement('script');
landingScript.src = '../landing-pages/auxilio-acidente/script.js';
document.currentScript.after(landingScript);

const notificationStack = document.querySelector('.notification-reveal');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (notificationStack && !reducedMotion && 'IntersectionObserver' in window) {
	notificationStack.classList.add('is-pending');
}

if (notificationStack && (reducedMotion || !('IntersectionObserver' in window))) {
	notificationStack.classList.add('is-visible');
} else if (notificationStack) {
	const notificationObserver = new IntersectionObserver((entries, observer) => {
		if (!entries[0].isIntersecting) return;
		notificationStack.classList.add('is-visible');
		observer.disconnect();
	}, { threshold: 0.2 });

	notificationObserver.observe(notificationStack);
}
