<script lang="ts">
	import { LoaderIcon, CheckIcon } from '@lucide/svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { cn } from '$lib/utils';
	import { fly } from 'svelte/transition';
	import SparklesText from '$lib/components/MagicUi/SparklesText.svelte';

	type Interval = 'month' | 'year';

	export function toHumanPrice(price: number, decimals: number = 2) {
		return Number(price / 100).toFixed(decimals);
	}
	let productPrices = [
		{
			id: 'price_1',
			name: 'Basic',
			description: 'A basic plan for startups and individual users',
			features: [
				'AI-powered analytics',
				'Basic support',
				'5 projects limit',
				'Access to basic AI tools'
			],
			monthlyPrice: 1000,
			yearlyPrice: 10000,
			isMostPopular: false
		},
		{
			id: 'price_2',
			name: 'Premium',
			description: 'A premium plan for growing businesses',
			features: [
				'Advanced AI insights',
				'Priority support',
				'Unlimited projects',
				'Access to all AI tools',
				'Custom integrations'
			],
			monthlyPrice: 2000,
			yearlyPrice: 20000,
			isMostPopular: true
		},
		{
			id: 'price_5',
			name: 'Enterprise',
			description: 'An enterprise plan with advanced features for large organizations',
			features: [
				'Custom AI solutions',
				'24/7 dedicated support',
				'Unlimited projects',
				'Access to all AI tools',
				'Custom integrations',
				'Data security and compliance'
			],
			monthlyPrice: 5000,
			yearlyPrice: 50000,
			isMostPopular: false
		},
		{
			id: 'price_6',
			name: 'Ultimate',
			description: 'The ultimate plan with all features for industry leaders',
			features: [
				'Bespoke AI development',
				'White-glove support',
				'Unlimited projects',
				'Priority access to new AI tools',
				'Custom integrations',
				'Highest data security and compliance'
			],
			monthlyPrice: 8000,
			yearlyPrice: 80000,
			isMostPopular: false
		}
	];
	let interval: Interval = $state('month');
	let isLoading = $state(false);
	let index = $state('');
	let onSubscribeClick = async (priceId: string) => {
		index = priceId;
		isLoading = true;

		await new Promise((resolve) => setTimeout(resolve, 1000));
		isLoading = false;
	};

	/*
    onCheckedChange={(checked) => {
                setInterval(checked ? 'year' : 'month')
             }}
     */
</script>

<section id="pricing">
	<div class="mx-auto my-8 flex max-w-screen-xl flex-col gap-8 px-4 pt-4 md:px-8">
		<div class="mx-auto max-w-5xl text-center">
			<h2 class="text-5xl font-bold tracking-tight">
				<SparklesText text={'Simple pricing for everyone.'} />
			</h2>

			<p class="mt-6 text-xl leading-8">
				Choose an
				{' '}
				<strong>affordable plan</strong>
				{' '}
				that&apos;s packed with the best features for engaging your audience, creating customer loyalty,
				and driving sales.
			</p>
		</div>

		<div class="flex w-full items-center justify-center space-x-2">
			<Switch
				onclick={() => {
					interval = interval === 'month' ? 'year' : 'month';
				}}
				id="interval"
			/>
			<span>Annual</span>
			<span
				class="inline-block rounded-full bg-black px-2.5 py-1 text-[11px] leading-5 font-semibold tracking-wide whitespace-nowrap text-white uppercase dark:bg-white dark:text-black"
			>
				2 MONTHS FREE ✨
			</span>
		</div>

		<div class="mx-auto grid w-full flex-col justify-center gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each productPrices as price, id}
				<div
					class={cn(
						'relative flex max-w-[400px] flex-col gap-8 overflow-hidden rounded-2xl border p-4  ',
						{
							'border-2 border-[var(--color-one)] dark:border-[var(--color-one)]':
								price.isMostPopular
						}
					)}
				>
					<div class="flex items-center">
						<div class="ml-4">
							<h2 class="text-base leading-7 font-semibold">
								{price.name}
							</h2>
							<p class="h-12 text-sm leading-5">
								{price.description}
							</p>
						</div>
					</div>
					{#key interval}
						<div in:fly={{ y: 20, duration: 300, delay: id * 40 }} class="flex flex-row gap-1">
							<span class="text-4xl font-bold">
								{#if interval === 'month'}
									${toHumanPrice(price.monthlyPrice, 0)}
								{:else}
									${toHumanPrice(price.yearlyPrice, 0)}
								{/if}
								<span class="text-xs">
									/ {interval}
								</span>
							</span>
						</div>
					{/key}
					<Button
						class={cn(
							'group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter',
							'hover:ring-primary transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-offset-2'
						)}
						disabled={isLoading}
						onclick={() => onSubscribeClick(price.id)}
					>
						<!-- svelte-ignore element_invalid_self_closing_tag -->
						<span
							class="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform-gpu bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-96 dark:bg-black"
						/>
						{#if isLoading && index === price.id}
							<LoaderIcon class="mr-2 size-4 animate-spin" />
							Subscribing
						{:else if !isLoading || (isLoading && index !== price.id)}
							Subscribe
						{/if}
					</Button>

					<hr
						class="m-0 h-px w-full border-none bg-gradient-to-r from-neutral-200/0 via-neutral-500/30 to-neutral-200/0"
					/>
					{#if price.features && price.features.length > 0}
						<ul class="flex flex-col gap-2 font-normal">
							{#each price.features as feature, idx}
								<li class="flex items-center gap-3 text-xs font-medium">
									<CheckIcon class="bg- size-5  shrink-0  rounded-full   p-[2px]" />
									<span class="flex">{feature}</span>
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>
