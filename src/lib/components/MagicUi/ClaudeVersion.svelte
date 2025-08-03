<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import { inview } from 'svelte-inview';
	import type { Options, ObserverEventDetails } from 'svelte-inview';

	let {
		className,
		animation = 'animate-in fade-in slide-in-from-bottom-8 duration-1000 ',
		cssOnly = false,
		inviewOptions = {
			threshold: 0.2,
			rootMargin: '0px',
			unobserveOnEnter: true
		},
		children
	}: {
		className?: string;
		animation?: string;
		cssOnly?: boolean;
		inviewOptions?: Options;
		children: Snippet;
	} = $props();

	let visible = $state(cssOnly);

	const base = 'hidden-until-view' + className;
	function handleEnter(e: CustomEvent<ObserverEventDetails>) {
		visible = e.detail.inView;
	}
</script>

<div
	use:inview={!cssOnly ? inviewOptions : undefined}
	oninview_enter={!cssOnly ? handleEnter : undefined}
	oninview_change={!inviewOptions.unobserveOnEnter ? handleEnter : undefined}
	class={cn(cssOnly || visible ? animation : base)}
>
	{@render children()}
</div>

<style>
	.hidden-until-view {
		opacity: 0;
	}
</style>
