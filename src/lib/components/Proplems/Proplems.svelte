<script lang="ts">
	import FileText from '@lucide/svelte/icons/file-text';
	import Clock from '@lucide/svelte/icons/clock';

	import History from '@lucide/svelte/icons/history';

	import Clipboard from '@lucide/svelte/icons/clipboard';
	import { ArrowLeft, ArrowRight, type Icon as IconType } from '@lucide/svelte';
	import { cn } from '$lib/utils';
	import { getLocale } from '$lib/paraglide/runtime';

	interface TextItemProps {
		title: string;
		subtitle: string;
		icon: typeof IconType;
		paragraph: string;
		className?: string;
	}
	const problems_en: TextItemProps[] = [
		{
			title: 'Manual Workload',
			subtitle: 'Paper-based processes slow your operations.',
			icon: FileText,
			paragraph:
				'Relying on manual record keeping introduces inefficiencies, increases the risk of error, and slows down your ability to serve patients effectively.'
		},
		{
			title: 'Delayed Reports',
			subtitle: 'Patients and staff wait longer than they should.',
			icon: Clock,
			paragraph:
				'Without automation, delivering reports becomes a bottleneck, leading to frustration, delayed care decisions, and unnecessary follow-ups.'
		},
		{
			title: 'Inefficient Tracking',
			subtitle: 'Hard to follow patient history and visits.',
			icon: History,
			paragraph:
				'When patient records are scattered or incomplete, it becomes difficult to track treatment plans, monitor progress, or identify follow-up needs.'
		},
		{
			title: 'Admin Overload',
			subtitle: 'Too much time spent on non-clinical tasks.',
			icon: Clipboard,
			paragraph:
				'Administrative duties like data entry and coordination drain staff resources, reducing the time available for actual patient care.'
		}
	];
	const problems_ar: TextItemProps[] = [
		{
			title: 'العبء اليدوي',
			subtitle: 'العمليات الورقية تبطئ عملياتك.',
			icon: FileText,
			paragraph:
				'الاعتماد على حفظ السجلات اليدوي يؤدي إلى عدم الكفاءة، ويزيد من مخاطر الأخطاء، ويبطئ قدرتك على خدمة المرضى بفعالية.'
		},
		{
			title: 'تقارير متأخرة',
			subtitle: 'المرضى والموظفون ينتظرون أكثر مما ينبغي.',
			icon: Clock,
			paragraph:
				'بدون الأتمتة، يصبح تسليم التقارير عنق الزجاجة، مما يؤدي إلى الإحباط، وتأخير قرارات الرعاية، والمتابعات غير الضرورية.'
		},
		{
			title: 'تتبع غير فعال',
			subtitle: 'صعوبة تتبع تاريخ المريض والزيارات.',
			icon: History,
			paragraph:
				'عندما تكون سجلات المرضى مبعثرة أو غير مكتملة، يصبح من الصعب تتبع خطط العلاج، ومراقبة التقدم، أو تحديد احتياجات المتابعة.'
		},
		{
			title: 'أعباء إدارية زائدة',
			subtitle: 'الكثير من الوقت يقضى في المهام غير السريرية.',
			icon: Clipboard,
			paragraph:
				'الواجبات الإدارية مثل إدخال البيانات والتنسيق تستنزف موارد الموظفين، مما يقلل الوقت المتاح للرعاية الفعلية للمرضى.'
		}
	];

	let { isArabic = $bindable() }: { isArabic: boolean } = $props();
	let problems = $derived(isArabic ? problems_ar : problems_en);
</script>

{#snippet textItem({ title, subtitle, icon, paragraph, className = '' }: TextItemProps)}
	<div
		class={cn(
			'group bg-card   flex h-[400px] max-w-[calc(100vh-2rem)] min-w-[300px] grow basis-[21%] flex-col gap-12 rounded-4xl border p-12 font-light max-md:p-8 md:min-h-[600px]  ',
			className
		)}
	>
		<div class="text-primary">
			{#if icon}
				{@const Icon = icon}
				<Icon />
			{/if}
		</div>

		<div>
			<span
				class="text-card-foreground line-clamp-2 max-h-[3.2em] overflow-hidden transition-all duration-300 ease-in-out hover:line-clamp-none hover:max-h-[500px]"
			>
				{subtitle}
			</span>

			<h3 class="text-primary text-[3.5rem] tracking-tight whitespace-pre-wrap max-md:text-5xl">
				{title}
			</h3>
		</div>

		<p
			class="mt-auto line-clamp-3 translate-y-10 text-base transition-transform
    duration-250 ease-in-out
    group-hover:line-clamp-none group-hover:translate-y-0
    max-md:line-clamp-none max-md:translate-y-0"
		>
			{paragraph}
		</p>

		<a
			class="hover:text-primary -mt-6 -mb-4 flex h-5 flex-row flex-nowrap items-center gap-2 no-underline opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 hover:gap-4 max-md:-mb-2"
			href="#contact"
		>
			<span>Let's Start</span>
			{#if isArabic}
				<ArrowLeft />
			{:else}
				<ArrowRight />
			{/if}
		</a>
	</div>
{/snippet}

<div class="mt-20 flex flex-wrap items-stretch gap-5 max-md:mt-32">
	{#each problems as p, i}
		{@render textItem(p)}
	{/each}
</div>

<style>
	:global(.bento picture) {
		height: 100%;
	}
</style>
