<script lang="ts">
	import { onMount } from 'svelte';
	import { Spring } from 'svelte/motion';
	import { mode } from 'mode-watcher';
	let isMobile = $derived.by(() => /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

	interface SpringConfig {
		damping?: number;
		stiffness?: number;
		precision?: number;
	}

	interface Props {
		springConfig?: SpringConfig;
	}

	let {
		springConfig = {
			damping: 0.6,
			stiffness: 0.8,
			precision: 0.001
		}
	}: Props = $props();

	const cursorX = new Spring(0, springConfig);
	const cursorY = new Spring(0, springConfig);
	let scale = $state(1);
	let stroke = $derived(mode.current === 'dark' ? 'white' : 'black');

	let isHovering = $state(false);

	function handleMouseMove(e: MouseEvent) {
		cursorX.target = e.clientX;
		cursorY.target = e.clientY;
	}

	function handleMouseLeave() {
		cursorX.target = -1000;
		cursorY.target = -1000;
		scale = 1;
		isHovering = false;
	}

	function handleMouseOver(e: MouseEvent) {
		const target = e.target as Element;
		if (target.matches('button, a, input[type="button"], input[type="submit"], [role="button"]')) {
			isHovering = true;
			scale = 2;
		}
	}

	function handleMouseOut(e: MouseEvent) {
		const target = e.target as Element;
		if (target.matches('button, a, input[type="button"], input[type="submit"], [role="button"]')) {
			isHovering = false;
			scale = 1;
		}
	}

	onMount(() => {
		document.body.style.cursor = 'none';

		// Cleanup function
		return () => {
			document.body.style.cursor = 'auto';
		};
	});
</script>

<svelte:window
	onmousemove={!isMobile ? handleMouseMove : undefined}
	onmouseleave={!isMobile ? handleMouseLeave : undefined}
	onmouseover={!isMobile ? handleMouseOver : undefined}
	onmouseout={!isMobile ? handleMouseOut : undefined}
/>
{#if !isMobile}
	<div
		class="cursor"
		style="transform: translate(calc({cursorX.current}px - 50%), calc({cursorY.current}px - 50%)) scale({scale});"
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
			<rect fill="transparent" width="100%" height="100%" />

			<defs>
				<filter id="f1" x="0" y="0" xmlns="http://www.w3.org/2000/svg">
					<feGaussianBlur in="SourceGraphic" stdDeviation="1" />
				</filter>
			</defs>

			<!-- Transparent circle with black stroke -->
			<circle cx="12" cy="12" r="9" fill="transparent" stroke-width="2" {stroke} />
			<circle
				cx="12"
				cy="12"
				r="8"
				fill={isHovering ? 'white' : 'transparent'}
				opacity={isHovering ? '0.5' : '1'}
				filter="url(#f1)"
			/>
		</svg>
	</div>
{/if}

<style>
	:global(.cursor) {
		position: fixed;
		top: 0;
		left: 0;
		transform: translate(-50%, -50%);
		pointer-events: none;
		z-index: 100;
		will-change: transform;
		transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}

	:global(a, button, input[type='button'], input[type='submit'], [role='button']) {
		cursor: none;
	}
</style>
