<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	let {
		className = '',
		inview = $bindable(false),
		children
	}: { className?: String; children?: Snippet; inview: boolean } = $props();
	let delayedInview = $state(false);

	$effect(() => {
		if (inview) {
			// If inview becomes false, set delayedInview to false after a delay
			const timeoutId = setTimeout(() => {
				delayedInview = true;
			}, 1200); // 300ms delay, adjust as needed

			// Cleanup the timeout if inview changes again before the timeout fires
			return () => clearTimeout(timeoutId);
		}
	});
</script>

<span
	class:opacity-0={!delayedInview}
	class:opacity-100={delayedInview}
	class={cn(' relative inline-flex  overflow-hidden transition-opacity ease-in', className)}
>
	{#if children}
		{@render children()}
	{:else}
		Svelte
	{/if}
	<span class="pointer-events-none absolute inset-0 mix-blend-lighten dark:mix-blend-darken">
		<span
			class="pointer-events-none absolute -top-1/2 h-[30vw] w-[30vw] animate-[aurora-border_6s_ease-in-out_infinite,aurora-1_12s_ease-in-out_infinite_alternate] bg-[var(--primary)] mix-blend-overlay blur-[1rem]"
		></span>
		<span
			class="pointer-events-none absolute top-0 right-0 h-[30vw] w-[30vw] animate-[aurora-border_6s_ease-in-out_infinite,aurora-2_12s_ease-in-out_infinite_alternate] bg-[var(--secondary)] mix-blend-overlay blur-[1rem]"
		></span>
		<span
			class="pointer-events-none absolute bottom-0 left-0 h-[30vw] w-[30vw] animate-[aurora-border_6s_ease-in-out_infinite,aurora-3_12s_ease-in-out_infinite_alternate] bg-[var(--primary)] mix-blend-overlay blur-[1rem]"
		></span>
		<span
			class="pointer-events-none absolute right-0 -bottom-1/2 h-[30vw] w-[30vw] animate-[aurora-border_6s_ease-in-out_infinite,aurora-4_12s_ease-in-out_infinite_alternate] bg-[var(--secondary)] mix-blend-overlay blur-[1rem]"
		></span>
	</span>
</span>
