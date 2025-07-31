<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import { browser } from '$app/environment';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
	let mounted = $state(false);
	onMount(() => {
		mounted = true;
		if (browser) {
			particlesJS.load('particles-js', '/particlesjs-config.json', function () {
				console.log('callback - particles.js config loaded');
			});
		}
	});
</script>

<svelte:head>
	{#if mounted && browser}
		<script
			src="https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js"
			integrity="sha512-Kef5sc7gfTacR7TZKelcrRs15ipf7+t+n7Zh6mKNJbmW+/RRdCW9nwfLn4YX0s2nO6Kv5Y2ChqgIakaC6PW09A=="
			crossorigin="anonymous"
			referrerpolicy="no-referrer"
		></script>
	{/if}
</svelte:head>

<div class="relative z-[1]">
	{@render children()}
</div>
<div class="absolute top-0 left-0 z-[-1] min-h-screen w-full opacity-70">
	<!-- svelte-ignore element_invalid_self_closing_tag -->
	<div id="particles-js" class="absolute inset-0" />
</div>
