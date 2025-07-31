<script lang="ts">
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';

	export let number = 90;

	let meteorStyles: any = [];

	let changeMeteors = (num: number) => {
		meteorStyles = [];
		const styles = [...new Array(num)].map(() => ({
			top: -20,
			left: Math.floor(Math.random() * 700) + 'px',
			right: Math.floor(Math.random() * 700) + 'px',
			animationDelay: Math.random() * 1 + 0.2 + 's',
			animationDuration: Math.floor(Math.random() * 8 + 2.9) + 's'
		}));
		meteorStyles = styles;
	};

	onMount(() => {
		changeMeteors(number);
	});

	$: changeMeteors(number);
</script>

{#each meteorStyles as style, idx}
	<span
		id="meteor-{idx + 1}"
		class={cn(
			'animate-meteor bg-primary pointer-events-none absolute top-1/2 left-1/2 size-[4px] rotate-[215deg] rounded-full shadow-[0_0_6px_2px_rgba(255,215,0,0.8)]'
		)}
		style="top: {style.top}px; left: {style.left}; animation-delay: {style.animationDelay}; animation-duration: {style.animationDuration};"
	>
		<!-- Meteor Tail -->
		<!-- svelte-ignore element_invalid_self_closing_tag -->
		<div
			class="pointer-events-none absolute top-1/2 -z-10 h-px w-[300px] -translate-y-1/2 bg-gradient-to-r from-black via-purple-500 to-transparent"
		/>
	</span>
{/each}
