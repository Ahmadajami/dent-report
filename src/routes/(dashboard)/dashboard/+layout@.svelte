<script lang="ts">
	import type { LayoutProps } from './$types';
	import AppSidebar from '$lib/components/Dashboard/Layout/app-sidebar.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { onNavigate } from '$app/navigation';
	import { lenis, easeInOutCubic } from '$lib/lenis';
	import { onDestroy } from 'svelte';

	let { data, children }: LayoutProps = $props();
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

<!--Side bar Provider-->
<Sidebar.Provider>
	<!--AppSidebar inside it the Sidebar.Root whic is sidebar Content-->
	<AppSidebar />

	<!--Sidebar.Inset Inset is the main Content is the main outside the sidebar-->
	<Sidebar.Inset style="view-transition-name: none;">
		<header
			class="mb-2 flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
		>
			<!-- Left section (unchanged) -->
			<div class="flex items-center gap-2 px-4">
				<Sidebar.Trigger class="-ml-1" />
				<Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
				<Breadcrumb.Root>
					<Breadcrumb.List>
						<Breadcrumb.Item class="hidden md:block">
							<Breadcrumb.Link href="#">Building Your Application</Breadcrumb.Link>
						</Breadcrumb.Item>
						<Breadcrumb.Separator class="hidden md:block" />
						<Breadcrumb.Item>
							<Breadcrumb.Page>Data Fetching</Breadcrumb.Page>
						</Breadcrumb.Item>
					</Breadcrumb.List>
				</Breadcrumb.Root>
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
	@keyframes fade-in-content {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
	}

	@keyframes fade-out-content {
		to {
			opacity: 0;
			transform: translateY(-10px);
		}
	}

	/* Only animate the main content */
	::view-transition-old(main-content) {
		animation: 100ms ease both fade-out-content;
	}

	::view-transition-new(main-content) {
		animation: 200ms ease both fade-in-content;
	}
	:root::view-transition-old(root),
	:root::view-transition-new(root) {
		animation: none !important;
	}
</style>
