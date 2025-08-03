<script lang="ts">
	import type { PageData } from './$types';
	import AuroraText from '$lib/components/MagicUi/AuroraText.svelte';
	import AnimatedButton from '$lib/components/MagicUi/AnimatedButton.svelte';
	import AniamteView from '$lib/components/MagicUi/ClaudeVersion.svelte';
	import BorderBeam from '$lib/components/MagicUi/BorderBeam.svelte';
	import type { Options } from 'svelte-inview';
	import Proplems from '$lib/components/Proplems/Proplems.svelte';
	import Pricing from '$lib/components/Pricing/Pricing.svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Useful Report | Transform Your Clinic with Essential Patient Reports</title>
	<link rel="preload" as="image" href="/white-dashboard.webp" />
	<link rel="preload" as="image" href="/dashboard.webp" />
</svelte:head>
<!-- Hero Section -->
<AniamteView cssOnly={true}>
	<div class="dark:bg-grid bg-grid-dark my-2">
		<section
			class="grid min-h-svh grid-cols-1 md:grid-cols-2 md:pl-10 md:rtl:pr-10"
			aria-labelledby="hero-heading"
		>
			<!-- Text Content -->
			<article
				class="flex min-h-full flex-col items-center justify-center md:items-start md:justify-center"
			>
				<h1
					id="hero-heading"
					class="text-center text-4xl font-bold tracking-wide md:text-left md:text-5xl lg:text-7xl"
				>
					<AuroraText>Transform Your Clinic</AuroraText>
					<br />
					Drive <AuroraText>Success</AuroraText> with Essential Patient Reports
				</h1>

				<p
					class="text-muted-foreground mt-4 max-w-prose text-center text-base md:text-left md:text-lg"
				>
					Empower your healthcare practice with streamlined reporting tools and real-time insights.
				</p>

				<div class="mt-8">
					<AnimatedButton text="Let's Start" />
				</div>
			</article>

			<!-- Visual Content -->
			<article
				class="flex min-h-full w-full items-center justify-center overflow-x-clip md:relative"
				aria-label="Application dashboard preview"
			>
				<div
					class="relative mx-2 my-2 h-full w-full md:absolute md:-right-60 md:mx-0 md:block md:h-full md:w-[60vw] md:border md:drop-shadow-2xl"
				>
					<BorderBeam size={150} duration={5} />

					<!-- Single Image Element using Tailwind's dark: and theme switching -->
					<img
						src="/white-dashboard.webp"
						alt="Useful Report dashboard"
						class="h-full w-full object-cover object-left dark:hidden"
					/>
					<img
						src="/dashboard.webp"
						alt="Useful Report dashboard"
						class="hidden h-full w-full object-cover object-left dark:block"
					/>
				</div>
			</article>
		</section>
	</div>
</AniamteView>

<section aria-labelledby="problem-solution-heading" class="my-32">
	<header class="container mx-auto">
		<h2 id="problem-solution-heading" class="mb-6 text-center text-4xl font-semibold md:text-7xl">
			<AuroraText className="text-center">Simplify Patient Management & Reporting</AuroraText>
		</h2>
	</header>

	<Proplems />
</section>

<Pricing />
