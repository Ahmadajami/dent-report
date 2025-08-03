<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import Menu from '@lucide/svelte/icons/menu';
	import Themetoggle from '$lib/components/layout/Themetoggle.svelte';
	import GradintButton from '$lib/components/layout/GradintButton.svelte';
	import { inview, type Options } from 'svelte-inview';

	import { lenis, easeInOutCubic } from '$lib/lenis';
	import { onDestroy } from 'svelte';

	let { user } = $props();
	let animate = $state(false);
	const options: Options = {
		unobserveOnEnter: true
	};
	let mobileMenuOpen = $state(false);

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function scrollToHash(e: MouseEvent) {
		e.preventDefault();
		if (!lenis) {
			return;
		}

		const target = (e.currentTarget as HTMLAnchorElement).hash;
		if (!target) return;

		const el = document.querySelector<HTMLElement>(target);
		if (el) {
			lenis.scrollTo(el, { duration: 2, easing: easeInOutCubic });
		}
	}
	onDestroy(() => {
		if (lenis) lenis.destroy();
	});
	let scrollY = $state(0);
	let lastScrollY = $state(0);
	let shy = $state(false);
	const handleScroll = () => {
		const scrollingDown = lastScrollY < scrollY;
		shy = scrollingDown && scrollY > 200;
		lastScrollY = scrollY;
	};
</script>

<svelte:window bind:scrollY onscroll={handleScroll} />
<header
	use:inview={options}
	oninview_change={({ detail }) => {
		animate = detail.inView;
	}}
>
	<nav
		class:nav-slide={shy}
		aria-label="Primary navigation"
		class={[
			animate ? 'animate-in slide-in-from-top-55 delay-200 duration-1000' : '',
			'fixed top-0 left-0 z-50 h-18 w-full bg-transparent px-6 backdrop-blur-sm md:px-12'
		]}
	>
		<div class="mx-auto flex h-full max-w-7xl items-center justify-between">
			<div class="flex items-center font-serif text-2xl font-bold tracking-widest">
				<a href="/" aria-label="Homepage"
					><span>Useful</span><span class="text-primary">Report</span></a
				>
			</div>

			<!-- Desktop Navigation -->
			<ul class="hidden items-center space-x-8 md:flex">
				<li>
					<a
						href="#pricing"
						onclick={(e) => {
							scrollToHash(e);
						}}
						class="hover:text-primary text-secondary-foreground transition-colors duration-300"
						>Pricing</a
					>
				</li>
				<li>
					<a
						href="/showrooms"
						class="hover:text-primary text-secondary-foreground transition-colors duration-300"
						>Showrooms</a
					>
				</li>
				<li>
					<a
						href="/about"
						class="hover:text-primary text-secondary-foreground transition-colors duration-300"
						>About</a
					>
				</li>
				<li>
					<a
						href="/contact"
						class="hover:text-primary text-secondary-foreground transition-colors duration-300"
						>Contact</a
					>
				</li>
			</ul>

			<div class="flex items-center space-x-4">
				{#if user}
					<Button
						class="hover:text-primary text-secondary-foreground hidden p-2 font-serif text-2xl transition-colors md:flex"
					>
						Login
					</Button>
					<Themetoggle />
					<Button
						variant="ghost"
						class="md:hidden"
						onclick={toggleMobileMenu}
						aria-label="Toggle mobile menu"
					>
						<Menu />
					</Button>
				{:else}
					<a
						href="/login"
						class="hover:text-primary text-secondary-foreground hidden transition-colors duration-300 md:flex"
					>
						Login
					</a>
					<GradintButton href="/signup" classname="hidden md:flex" />
					<Themetoggle />
					<Button
						variant="ghost"
						class="md:hidden"
						onclick={toggleMobileMenu}
						aria-label="Toggle mobile menu"
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
			class="bg-background/95 animate-in fade-in-0 slide-in-from-bottom-full fixed inset-0 z-40 flex flex-col items-center justify-center space-y-6 backdrop-blur-sm duration-300 md:hidden"
		>
			<Button
				variant="ghost"
				class="text-secondary-foreground hover:text-primary absolute top-4 right-4"
				onclick={toggleMobileMenu}
				aria-label="Close mobile menu"
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

			<ul class="space-y-6 text-xl">
				<li>
					<a
						href="/collections"
						onclick={toggleMobileMenu}
						class="hover:text-primary text-secondary-foreground transition-colors duration-300"
						>Collections</a
					>
				</li>
				<li>
					<a
						href="/showrooms"
						onclick={toggleMobileMenu}
						class="hover:text-primary text-secondary-foreground transition-colors duration-300"
						>Showrooms</a
					>
				</li>
				<li>
					<a
						href="/about"
						onclick={toggleMobileMenu}
						class="hover:text-primary text-secondary-foreground transition-colors duration-300"
						>About</a
					>
				</li>
				<li>
					<a
						href="/contact"
						onclick={toggleMobileMenu}
						class="hover:text-primary text-secondary-foreground transition-colors duration-300"
						>Contact</a
					>
				</li>
			</ul>

			<div class="flex flex-col items-center space-y-4 pt-4">
				{#if user}
					<Button
						class="hover:text-primary text-secondary-foreground p-2 font-serif text-2xl transition-colors"
						onclick={toggleMobileMenu}
					>
						Login
					</Button>
				{:else}
					<a
						href="/login"
						onclick={toggleMobileMenu}
						class="hover:text-primary text-secondary-foreground transition-colors duration-300"
						>Login</a
					>
					<GradintButton href="/signup">Free Trial</GradintButton>
				{/if}
			</div>
		</div>
	{/if}
</header>

<style>
	.nav-slide {
		transition: transform 0.5s ease-in-out;
		transform: translateY(-200%);
	}

	@media (max-width: 768px) {
		.nav-slide {
			transition: transform 0.5s ease-in-out;
			transform: translateY(-200%);
		}
	}
</style>
