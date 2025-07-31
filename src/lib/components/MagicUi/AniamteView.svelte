<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { inview, type Options } from 'svelte-inview';

	let {
		inView = $bindable(false),
		inviewOptions = { rootMargin: '2px', unobserveOnEnter: true },
		defaultClass = '',
		animatedClass = 'animate-in slide-in-from-left delay-200 duration-1000',
		children
	}: {
		inView: boolean;
		inviewOptions?: Options;
		defaultClass?: string;
		animatedClass?: string;
		children: Snippet;
	} = $props();

	// Function to handle the 'inview_enter' event
	// This updates the `inView` state when the element enters the viewport.
	function handleInviewEnter({ detail }: { detail: { inView: boolean } }) {
		inView = detail.inView;
	}
	let mounted = $state(false);
	onMount(() => {
		mounted = true;
	});
</script>

<!-- The main div element that uses the `inview` action -->
<div
	use:inview={inviewOptions}
	oninview_enter={handleInviewEnter}
	class={[mounted && inView ? animatedClass : '', defaultClass]}
>
	{@render children()}
</div>
