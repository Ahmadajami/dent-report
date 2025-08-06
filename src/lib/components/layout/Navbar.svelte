<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import Menu from '@lucide/svelte/icons/menu';
	import Themetoggle from '$lib/components/layout/Themetoggle.svelte';
	import GradintButton from '$lib/components/layout/GradintButton.svelte';
	import { lenis, easeInOutCubic } from '$lib/lenis';
	import { onDestroy } from 'svelte';
	import { cn } from '$lib/utils';
	import Logo from '$lib/components/layout/Logo.svelte';
	import { shy } from './shy.svelte';
	import { page } from '$app/state';
	import { enhance } from '$app/forms';
	import Langugetoggle from './Langugetoggle.svelte';
	import { m } from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime';

	let mobileMenuOpen = $state(false);

	const hrefs = {
		home: localizeHref('/'),
		features: localizeHref('#features'),
		pricing: localizeHref('#pricing'),
		faq: localizeHref('#faq'),
		about: localizeHref('/about'),
		contact: localizeHref('#contact'),
		login: localizeHref('/login'),
		signup: localizeHref('/signup')
	};

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function scrollToHash(e: MouseEvent) {
		e.preventDefault();
		if (!lenis) return;

		const target = (e.currentTarget as HTMLAnchorElement).hash;
		if (!target) return;

		const el = document.querySelector<HTMLElement>(target);
		if (el) {
			lenis.scrollTo(el, { duration: 2, easing: easeInOutCubic });
			shy.value = true;
		}
	}

	onDestroy(() => {
		if (lenis) lenis.destroy();
	});

	let scrollY = $state(0);
	let lastScrollY = $state(0);

	const handleScroll = () => {
		const scrollingDown = lastScrollY < scrollY;
		shy.value = scrollingDown && scrollY > 200;
		lastScrollY = scrollY;
	};
</script>

<svelte:window bind:scrollY on:scroll={handleScroll} />

<header>
	<nav
		class:nav-slide={shy.value}
		class={cn(
			'fixed top-0 left-0 z-50 h-18 w-full bg-transparent px-4 backdrop-blur-sm md:px-12',
			'animate-in slide-in-from-top-55 duration-1000'
		)}
		aria-label="Primary navigation"
	>
		<div class="mx-auto flex h-full max-w-7xl items-center justify-between">
			<!-- Left: Logo -->
			<a
				dir="ltr"
				href={hrefs.home}
				class="flex items-center font-serif text-2xl font-bold tracking-widest"
			>
				<Logo />
			</a>

			<!-- Center: Navigation (Desktop) -->
			<ul class="text-secondary-foreground hidden gap-8 font-medium md:flex">
				<li>
					<a href={hrefs.features} onclick={scrollToHash} class="hover:text-primary transition"
						>{m.features_nav()}</a
					>
				</li>
				<li>
					<a href={hrefs.pricing} onclick={scrollToHash} class="hover:text-primary transition"
						>{m.pricing_nav()}</a
					>
				</li>
				<li>
					<a href={hrefs.faq} onclick={scrollToHash} class="hover:text-primary transition"
						>{m.faq_nav()}</a
					>
				</li>
				<li><a href={hrefs.about} class="hover:text-primary transition">{m.about_nav()}</a></li>
				<li><a href={hrefs.contact} class="hover:text-primary transition">{m.contact_nav()}</a></li>
			</ul>

			<!-- Right: Buttons and Toggles -->
			<div class="flex items-center space-x-4">
				{#if !page.data.user}
					<a
						href={hrefs.login}
						class="hover:text-primary text-secondary-foreground hidden transition md:block"
						>{m.log_in()}</a
					>
					<GradintButton href={hrefs.signup} classname="hidden md:flex" />
					<Themetoggle />
					<Langugetoggle />
					<Button
						variant="ghost"
						class="md:hidden"
						onclick={toggleMobileMenu}
						aria-label="Open menu"
					>
						<Menu />
					</Button>
				{:else}
					<span class="text-muted-foreground hidden text-sm md:inline"
						>Welcome {page.data.user.username}</span
					>
					<form action="/logout" method="POST" use:enhance>
						<Button variant="ghost" type="submit" class="hover:text-primary">{m.log_out()}</Button>
					</form>
					<GradintButton href={hrefs.signup} classname="hidden md:flex" />
					<Themetoggle />
					<Button
						variant="ghost"
						class="md:hidden"
						onclick={toggleMobileMenu}
						aria-label="Open menu"
					>
						<Menu />
					</Button>
				{/if}
			</div>
		</div>
	</nav>

	<!-- Mobile Menu -->
	{#if mobileMenuOpen}
		<div
			role="dialog"
			aria-modal="true"
			class="bg-background/95 animate-in fade-in-0 slide-in-from-bottom-full fixed inset-0 z-40 flex flex-col items-center justify-center space-y-6 backdrop-blur-sm md:hidden"
		>
			<Button
				variant="ghost"
				class="text-secondary-foreground hover:text-primary absolute top-4 right-4"
				onclick={toggleMobileMenu}
				aria-label="Close menu"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-x"
				>
					<path d="M18 6 6 18" /><path d="m6 6 12 12" />
				</svg>
			</Button>

			<ul class="space-y-4 text-xl font-medium">
				<li>
					<a href={hrefs.features} onclick={toggleMobileMenu} class="hover:text-primary transition"
						>{m.features_nav()}</a
					>
				</li>
				<li>
					<a href={hrefs.pricing} onclick={toggleMobileMenu} class="hover:text-primary transition"
						>{m.pricing_nav()}</a
					>
				</li>
				<li>
					<a href={hrefs.faq} onclick={toggleMobileMenu} class="hover:text-primary transition"
						>{m.faq_nav()}</a
					>
				</li>
				<li>
					<a href={hrefs.about} onclick={toggleMobileMenu} class="hover:text-primary transition"
						>{m.about_nav()}</a
					>
				</li>
				<li>
					<a href={hrefs.contact} onclick={toggleMobileMenu} class="hover:text-primary transition"
						>{m.contact_nav()}</a
					>
				</li>
			</ul>

			<div class="flex flex-col space-y-4 pt-6">
				{#if !page.data.user}
					<a
						href={hrefs.login}
						onclick={toggleMobileMenu}
						class="hover:text-primary text-lg transition">{m.log_in()}</a
					>
					<GradintButton href={hrefs.signup}>{m.free_trail()}</GradintButton>
				{:else}
					<form action="/logout" method="POST" use:enhance>
						<Button variant="ghost" type="submit" class="hover:text-primary text-lg"
							>{m.log_out()}</Button
						>
					</form>
				{/if}
				<Themetoggle />
				<Langugetoggle />
			</div>
		</div>
	{/if}
</header>

<style>
	.nav-slide {
		transform: translateY(-200%);
		transition: transform 0.5s ease-in-out;
	}
</style>
