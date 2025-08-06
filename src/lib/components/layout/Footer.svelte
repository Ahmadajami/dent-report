<script lang="ts">
	import Logo from '$lib/components/layout/Logo.svelte';
	import { easeInOutCubic, lenis } from '$lib/lenis';
	import { onDestroy } from 'svelte';
	import { shy } from './shy.svelte';

	import { Facebook, Instagram, X } from '@lucide/svelte';
	import { m } from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime';

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
	function scrollToHash(e: MouseEvent) {
		e.preventDefault();
		if (!lenis) return;

		const target = (e.currentTarget as HTMLAnchorElement).hash;
		if (!target) return;

		const el = document.querySelector<HTMLElement>(target);
		if (el) {
			lenis.scrollTo(el, { duration: 2, easing: easeInOutCubic });
			shy.value = false;
		}
	}

	onDestroy(() => {
		if (lenis) lenis.destroy();
	});
</script>

<footer class="w-full py-14">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-3xl">
			<a href={hrefs.home} class="flex justify-center" dir="ltr">
				<Logo className="text-5xl md:text-7xl text-wrap " />
			</a>

			<ul
				class="mb-10 flex flex-col items-center justify-center gap-7 border-b border-gray-200 py-16 text-lg text-nowrap transition-all duration-500 md:flex-row md:gap-12"
			>
				<li>
					<a onclick={(e) => scrollToHash(e)} href={hrefs.features} class=" hover:text-primary"
						>{m.features_nav()}</a
					>
				</li>
				<li>
					<a onclick={(e) => scrollToHash(e)} href={hrefs.pricing} class=" hover:text-primary"
						>{m.pricing_nav()}</a
					>
				</li>
				<li>
					<a onclick={(e) => scrollToHash(e)} href={hrefs.faq} class=" hover:text-primary"
						>{m.faq_nav()}</a
					>
				</li>
				<li>
					<a onclick={(e) => scrollToHash(e)} href={hrefs.about} class=" hover:text-primary"
						>{m.about_nav()}</a
					>
				</li>
				<li>
					<a onclick={(e) => scrollToHash(e)} href={hrefs.contact} class=" hover:text-primary"
						>{m.contact_nav()}</a
					>
				</li>
				<li>
					<a href={hrefs.login} class=" hover:text-primary">{m.log_in()}</a>
				</li>
				<li>
					<a href={hrefs.signup} class=" hover:text-primary">{m.sign_up()}</a>
				</li>
			</ul>

			<div class="mb-14 flex items-center justify-center space-x-10">
				<a href="#" class="hover:text-primary block transition-all duration-500">
					<Facebook />
				</a>
				<a href="#" class="hover:text-primary block transition-all duration-500">
					<Instagram />
				</a>
				<a href="#" class="hover:text-primary block transition-all duration-500">
					<X class="h-full w-full" />
				</a>
			</div>

			<span class="block text-center text-lg text-gray-500"
				>© {new Date().getFullYear()}, {m.footer()}</span
			>
		</div>
	</div>
</footer>
