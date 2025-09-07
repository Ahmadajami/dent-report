<script lang="ts">
	import { type Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import doctorImg from '$lib/assets/doctors.svg';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { getLocale } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages';
	import { onNavigate } from '$app/navigation';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<section class="flex min-h-screen flex-col overflow-x-hidden md:flex-row">
	<div class="relative hidden flex-1 md:block md:w-1/2" style="view-transition-name: none;">
		<img
			src={doctorImg}
			alt="A medical professional working in a clinic"
			class="S absolute inset-0 h-screen w-full object-cover"
		/>
		<!-- svelte-ignore element_invalid_self_closing_tag -->
		<div class="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-gray-900/20" />

		<div class="relative z-10 flex h-full flex-col p-10 lg:p-16">
			<div class="mb-4">
				<Button
					variant="ghost"
					onclick={() => history.back()}
					class="flex w-min items-center text-sm "
				>
					{#if getLocale() == 'ar'}
						<ArrowRight class="mr-1 h-4 w-4" />
					{:else}
						<ArrowLeft class="mr-1 h-4 w-4" />
					{/if}
					{m.back()}
				</Button>
			</div>
			<h1
				class="mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-3xl leading-tight font-bold text-transparent lg:text-4xl"
			>
				{m.late_moving_dingo_talk()}
			</h1>
			<p class="mb-8 text-gray-200">{m.wild_low_warbler_reside()}</p>
		</div>
	</div>
	<main
		style="view-transition-name: main-content;"
		class="relative w-full p-4 sm:p-10 md:w-1/2 lg:p-14"
	>
		{@render children()}
	</main>
</section>

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}

	@keyframes fade-out {
		to {
			opacity: 0;
		}
	}

	@keyframes slide-from-right {
		from {
			transform: translateX(30px);
		}
	}

	@keyframes slide-to-left {
		to {
			transform: translateX(-30px);
		}
	}

	:root::view-transition-old(main-content) {
		animation:
			90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
			300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
	}

	:root::view-transition-new(main-content) {
		animation:
			210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
			300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
	}
	:root::view-transition-old(root),
	:root::view-transition-new(root) {
		animation: none !important;
	}
</style>
