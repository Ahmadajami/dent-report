// src/lib/lenis.ts
import { browser } from '$app/environment';
import Lenis from 'lenis';

// Type the lenis instance
let lenis: Lenis | null = null;

if (browser) {
	lenis = new Lenis({
		duration: 1,
		autoRaf: true,
		lerp: 0.3,
		syncTouch: false,
		touchMultiplier: 1.8
	});
}

// Add types to easing functions
const easeInOutCubic = (x: number = 0): number => {
	return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

const easeExpoInOut = (t: number): number => {
	if (t === 0) return 0;
	if (t === 1) return 1;
	if (t < 0.5) {
		return Math.pow(2, 20 * t - 10) / 2;
	}
	return (2 - Math.pow(2, -20 * t + 10)) / 2;
};

export { lenis, easeInOutCubic, easeExpoInOut };
