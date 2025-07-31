<script lang="ts">
	import type { PageData } from './$types';
	import AuroraText from '$lib/components/MagicUi/AuroraText.svelte';
	import AnimatedButton from '$lib/components/MagicUi/AnimatedButton.svelte';
	import AniamteView from '$lib/components/MagicUi/AniamteView.svelte';
	import BorderBeam from '$lib/components/MagicUi/BorderBeam.svelte';

	let { data }: { data: PageData } = $props();
	let heroinView = $state(false);
</script>

<svelte:head>
	<title>Useful Report | Transform Your Clinic with Essential Patient Reports</title>
	<link rel="preload" as="image" href="/white-dashboard.webp" />
	<link rel="preload" as="image" href="/dashboard.webp" />
</svelte:head>
<!-- Hero Section -->
<AniamteView
	defaultClass=" dark:bg-grid bg-grid-dark my-2"
	bind:inView={heroinView}
	animatedClass="animate-in slide-in-from-bottom delay-200 duration-1000"
>
	<section
		class="  grid min-h-svh grid-cols-1 md:grid-cols-2 md:pl-10 md:rtl:pr-10"
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
				<AuroraText bind:inview={heroinView}>Transform Your Clinic</AuroraText>
				<br />
				Drive <AuroraText bind:inview={heroinView}>Success</AuroraText> with Essential Patient Reports
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
			<!-- Desktop Image -->
			<div class="absolute hidden h-full w-[50vw] md:-right-60 md:block">
				<div class="relative my-2 h-full w-[60vw] border drop-shadow-2xl">
					<BorderBeam size={150} duration={5} />
					<img
						src="/dashboard.webp"
						alt="Dark theme of Useful Report dashboard with charts and reports"
						class="hidden h-full w-full object-cover object-left dark:block"
					/>
					<img
						src="/white-dashboard.webp"
						alt="Light theme of Useful Report dashboard with charts and reports"
						class="block h-full w-full object-cover object-left dark:hidden"
					/>
				</div>
			</div>

			<!-- Mobile Image -->
			<div class="relative mx-2 block h-full w-full md:hidden">
				<BorderBeam size={150} duration={15} />
				<img
					src="/dashboard.webp"
					alt="Dark theme of Useful Report dashboard"
					class="hidden h-full w-full object-cover object-left dark:block"
				/>
				<img
					src="/white-dashboard.webp"
					alt="Light theme of Useful Report dashboard"
					class="block h-full w-full object-cover object-left dark:hidden"
				/>
			</div>
		</article>
	</section>
</AniamteView>
