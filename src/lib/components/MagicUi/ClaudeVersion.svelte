<script lang="ts">
	import { cn } from '$lib/utils';
	import { inview } from 'svelte-inview';
	let visible = $state(false);

	// Classes applied when visible
	const base = 'hidden-until-view';
	const animation = 'animate-in fade-in slide-in-from-bottom-8 duration-500';
	let { children } = $props();
</script>

<div
	use:inview={{ threshold: 0.2 }}
	oninview_enter={({ detail }) => {
		visible = detail.inView;
	}}
	class={cn(visible ? '' : base, visible ? animation : '')}
>
	{@render children()}
</div>

<style>
	/* Prevent flash before animation triggers */
	.hidden-until-view {
		opacity: 0;
	}
</style>
