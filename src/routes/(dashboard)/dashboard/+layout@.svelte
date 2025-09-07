<script lang="ts">
	import type { LayoutProps } from './$types';
	import AppSidebar from '$lib/components/Dashboard/Layout/app-sidebar.svelte';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { onNavigate } from '$app/navigation';
	import { lenis } from '$lib/lenis';
	import { onDestroy } from 'svelte';
	import BreadCrumb from '$lib/components/Dashboard/BreadCrumb.svelte';
	import { LoaderIcon } from '@lucide/svelte';

	let { data, children }: LayoutProps = $props();
	let formLoading = $state(false);
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
	onDestroy(() => {
		if (lenis) lenis.destroy();
	});
</script>

{#if formLoading}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur transition-opacity"
		style="view-transition-name: none;"
	>
		<LoaderIcon class="animate-spin " />
	</div>
{/if}
<!--Side bar Provider-->
<Sidebar.Provider>
	<!--AppSidebar inside it the Sidebar.Root whic is sidebar Content-->
	<AppSidebar bind:formLoading />

	<!--Sidebar.Inset Inset is the main Content is the main outside the sidebar-->
	<Sidebar.Inset style="view-transition-name: none;">
		<header
			class="mb-2 flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
		>
			<!-- Left section (unchanged) -->
			<div class="flex items-center gap-2 px-4">
				<Sidebar.Trigger class="-ml-1" />
				<Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
				<BreadCrumb />
			</div>

			<!-- Right section (CTA button) -->
			<div class="px-4">
				<Button href={localizeHref('/dashboard/add-patient')}>Create New</Button>
			</div>
		</header>
		<main class="mx-2" style="view-transition-name: main-content;">
			{@render children()}
		</main>
	</Sidebar.Inset>
</Sidebar.Provider>

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
