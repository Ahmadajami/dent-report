<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import { inview } from 'svelte-inview';
	let {
		className = '',
		delayedInview = false,
		children
	}: { className?: String; children: Snippet; delayedInview?: boolean } = $props();
</script>

<span
	use:inview={{ threshold: 0.8 }}
	oninview_enter={({ detail }) => {
		delayedInview = detail.inView;
	}}
	class:opacity-0={delayedInview}
	class={cn(
		'  relative inline-flex  overflow-hidden opacity-100  transition-opacity duration-500 ease-in starting:opacity-0',
		className
	)}
>
	{@render children()}

	{#if delayedInview}
		<span class="pointer-events-none absolute inset-0 mix-blend-lighten dark:mix-blend-darken">
			<span
				class:mix-blend-overlay={delayedInview}
				class="pointer-events-none absolute -top-1/2 h-[30vw] w-[30vw] animate-[aurora-border_6s_ease-in-out_infinite,aurora-1_12s_ease-in-out_infinite_alternate] bg-[var(--primary)] blur-[1rem]"
			></span>
			<span
				class:mix-blend-overlay={delayedInview}
				class="pointer-events-none absolute top-0 right-0 h-[30vw] w-[30vw] animate-[aurora-border_6s_ease-in-out_infinite,aurora-2_12s_ease-in-out_infinite_alternate] bg-[var(--secondary)] blur-[1rem]"
			></span>
			<span
				class:mix-blend-overlay={delayedInview}
				class="pointer-events-none absolute bottom-0 left-0 h-[30vw] w-[30vw] animate-[aurora-border_6s_ease-in-out_infinite,aurora-3_12s_ease-in-out_infinite_alternate] bg-[var(--primary)] blur-[1rem]"
			></span>
			<span
				class:mix-blend-overlay={delayedInview}
				class="pointer-events-none absolute right-0 -bottom-1/2 h-[30vw] w-[30vw] animate-[aurora-border_6s_ease-in-out_infinite,aurora-4_12s_ease-in-out_infinite_alternate] bg-[var(--secondary)] blur-[1rem]"
			></span>
		</span>
	{/if}
</span>
