<script lang="ts">
	import { LoaderIcon, CheckIcon } from '@lucide/svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { cn } from '$lib/utils';
	import { fly } from 'svelte/transition';
	import SparklesText from '$lib/components/MagicUi/SparklesText.svelte';
	import BlureFade from '../MagicUi/BlureFade.svelte';
	import { m } from '$lib/paraglide/messages';

	let { isArabic = $bindable() }: { isArabic: boolean } = $props();
	const month: string = m.month();
	const year: string = m.year();
	
	

	function toHumanPrice(price: number, decimals: number = 2) {
		if (typeof price !== 'number' || isNaN(price)) {
			console.error('Invalid price input. Expected a number.');
			return 'N/A'; // Or throw an error, depending on desired error handling
		}
		// Now directly formats the number without division, as prices are in whole dollars.
		return Number(price).toFixed(decimals);
	}
	const productPrices_ar = [
		{
			id: 'price_dental_1',
			name: 'الخطة الأولية',
			description:
				'مثالية للممارسين الفرديين والعيادات الصغيرة لطب الأسنان أو العيون التي تبدأ بالإدارة الرقمية.',
			features: [
				'إدارة ملفات المرضى الأساسية (حتى 200 مريض)',
				'جدولة المواعيد القياسية',
				'إنشاء تقارير المرضى الأساسية (5 تقارير/شهر)',
				'تخزين آمن للبيانات',
				'دعم عبر البريد الإلكتروني',
				'دعم أساسي عبر واتساب'
			],
			monthlyPrice: 5,
			yearlyPrice: 50,
			isMostPopular: false
		},
		{
			id: 'price_dental_2',
			name: 'الخطة الاحترافية',
			description:
				'مثالية للعيادات المتنامية لطب الأسنان والعيون التي تحتاج إلى ميزات أكثر قوة وسعة أكبر للمرضى.',
			features: [
				'إدارة غير محدودة لملفات المرضى',
				'إدارة المواعيد المتقدمة (مع تذكيرات تلقائية)',
				'إنشاء تقارير مرضى غير محدودة (مع قوالب قابلة للتخصيص)',
				'رؤى تقارير مدعومة بالذكاء الاصطناعي',
				'تكامل التطبيب عن بعد',
				'دعم ذو أولوية عبر البريد الإلكتروني والدردشة',
				'دعم واتساب ذو أولوية',
				'حتى 5 مستخدمين من الموظفين'
			],
			monthlyPrice: 29,
			yearlyPrice: 290,
			isMostPopular: true
		},
		{
			id: 'price_dental_3',
			name: 'خطة العيادة الاحترافية',
			description: 'مصممة لعيادات طب الأسنان والعيون متعددة الممارسين التي تتطلب أدوات شاملة.',
			features: [
				'جميع ميزات الخطة الاحترافية',
				'تكامل نظام السجلات الصحية الإلكترونية (EHR/EMR)',
				'لوحات تحكم متقدمة للتحليلات والتقارير',
				'بوابة المرضى عبر الإنترنت',
				'مدير حساب مخصص',
				'دعم عبر الهاتف والبريد الإلكتروني على مدار الساعة طوال أيام الأسبوع',
				'دعم واتساب مخصص',
				'حتى 15 مستخدمًا من الموظفين'
			],
			monthlyPrice: 79,
			yearlyPrice: 790,
			isMostPopular: false
		},
		{
			id: 'price_dental_4',
			name: 'خطة المؤسسات',
			description:
				'مصممة خصيصًا لمجموعات وسلاسل طب الأسنان والعيون الكبيرة ذات الاحتياجات المعقدة والمواقع المتعددة.',
			features: [
				'جميع ميزات خطة العيادة الاحترافية',
				'إدارة المواقع المتعددة',
				'تكاملات مخصصة (على سبيل المثال، أنظمة الفواتير والمختبرات)',
				'أمان وامتثال متقدم (جاهز لـ HIPAA و GDPR)',
				'تدريب وتنفيذ في الموقع',
				'فريق دعم فني مخصص',
				'دعم واتساب مخصص على مدار الساعة طوال أيام الأسبوع',
				'عدد غير محدود من مستخدمي الموظفين'
			],
			monthlyPrice: 199,
			yearlyPrice: 1990,
			isMostPopular: false
		}
	];
	const productPrices_en = [
		{
			id: 'price_dental_1',
			name: 'Starter',
			description:
				'Ideal for solo practitioners and small dental or optometry clinics getting started with digital management.',
			features: [
				'Basic Patient Profile Management (up to 200 patients)',
				'Standard Appointment Scheduling',
				'Essential Patient Report Generation (5 reports/month)',
				'Secure Data Storage',
				'Email Support',
				'Basic WhatsApp Support'
			],

			monthlyPrice: 5,
			yearlyPrice: 50,
			isMostPopular: false
		},
		{
			id: 'price_dental_2',
			name: 'Professional',
			description:
				'Perfect for growing dental and optometry practices needing more robust features and higher patient capacity.',
			features: [
				'Unlimited Patient Profile Management',
				'Advanced Appointment Management (with automated reminders)',
				'Unlimited Patient Report Generation (with customizable templates)',
				'AI-powered Report Insights',
				'Telemedicine Integration',
				'Priority Email & Chat Support',
				'Priority WhatsApp Support',
				'Up to 5 Staff Users'
			],
			monthlyPrice: 29,
			yearlyPrice: 290,
			isMostPopular: true
		},
		{
			id: 'price_dental_3',
			name: 'Clinic Pro',
			description:
				'Designed for multi-practitioner dental and optometry clinics requiring comprehensive tools.',
			features: [
				'All Professional Plan Features',
				'EHR/EMR System Integration',
				'Advanced Analytics & Reporting Dashboards',
				'Online Patient Portal',
				'Dedicated Account Manager',
				'24/7 Phone & Email Support',
				'Dedicated WhatsApp Support',
				'Up to 15 Staff Users'
			],
			monthlyPrice: 79,
			yearlyPrice: 790,
			isMostPopular: false
		},
		{
			id: 'price_dental_4',
			name: 'Enterprise',
			description:
				'Tailored for large dental and optometry groups and chains with complex needs and multiple locations.',
			features: [
				'All Clinic Pro Plan Features',
				'Multi-Location Management',
				'Custom Integrations (e.g., billing, lab systems)',
				'Advanced Security & Compliance (HIPAA, GDPR ready)',
				'On-site Training & Implementation',
				'Dedicated Technical Support Team',
				'24/7 Dedicated WhatsApp Support',
				'Unlimited Staff Users'
			],
			monthlyPrice: 199,
			yearlyPrice: 1990,
			isMostPopular: false
		}
	];
	let productPrices = $derived(isArabic ? productPrices_ar : productPrices_en);
	let interval = $state(month);
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
				<SparklesText text={m.pricing_header()} />
			</h2>

			<p class="mt-6 text-xl leading-8">
				{m.pricing_one()}
				{' '}
				<strong>{m.pricing_second()}</strong>
				{' '}
				{m.pricing_third()}
			</p>
		</div>

		<div class="flex w-full items-center justify-center space-x-2 rtl:mx-2 rtl:flex-row-reverse">
			<Switch
				dir="auto"
				onclick={() => {
					interval = interval === month ? year : month;
				}}
				id="interval"
			/>
			<span>{m.annual()}</span>
			<span
				class="inline-block rounded-full bg-black px-2.5 py-1 text-[11px] leading-5 font-semibold tracking-wide whitespace-nowrap text-white uppercase rtl:mx-2 dark:bg-white dark:text-black"
			>
				{m.months_free({ count: 2 })} ✨
			</span>
		</div>

		<div class="mx-auto grid w-full flex-col justify-center gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each productPrices as price, id}
				<BlureFade id={id.toString()} delay={0.4 + id * 0.1} once={false}>
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
										${toHumanPrice(price.monthlyPrice)}
									{:else}
										${toHumanPrice(price.yearlyPrice)}
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
								{m.subscribing()}
							{:else if !isLoading || (isLoading && index !== price.id)}
								{m.polite_round_haddock_empower()}
							{/if}
						</Button>

						<hr
							class="m-0 h-px w-full border-none bg-gradient-to-r from-neutral-200/0 via-neutral-500/30 to-neutral-200/0"
						/>
						{#if price.features && price.features.length > 0}
							<ul class="flex flex-col gap-2 font-normal">
								{#each price.features as feature}
									<li class="flex items-center gap-3 text-xs font-medium">
										<CheckIcon class="bg- size-5  shrink-0  rounded-full   p-[2px]" />
										<span class="flex">{feature}</span>
									</li>
								{/each}
							</ul>
						{/if}
					</div>
				</BlureFade>
			{/each}
		</div>
	</div>
</section>
