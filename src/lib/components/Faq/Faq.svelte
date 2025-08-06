<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import { m } from '$lib/paraglide/messages';
	import SparklesText from '../MagicUi/SparklesText.svelte';
	type FAQItem = {
		question: string;
		answer: string;
	};

	const faqItems_en: FAQItem[] = [
		{
			question: 'How can this platform benefit my practice?',
			answer:
				'Our platform helps streamline your workflow by saving time, improving patient communication, enhancing data management, and enabling seamless patient care. This allows you to focus more on your patients and less on administrative tasks.'
		},
		{
			question: 'Is this platform suitable for both small and large practices?',
			answer:
				'Absolutely! Our SaaS is fully scalable and customizable to meet the needs of all practice sizes—from solo practitioners to multi-location clinics.'
		},
		{
			question: 'What kind of reports can I generate for patients?',
			answer:
				'You can generate comprehensive patient reports, including appointment summaries, treatment plans, prescription details, and more. Dentists and optometrists can choose between a full report covering the entire medical history or a session report summarizing a specific visit. These reports are designed to be clear and patient-friendly.'
		},
		{
			question: 'How can I send reports to patients?',
			answer:
				'You can securely send reports to patients via email or WhatsApp, ensuring quick and convenient communication.'
		},
		{
			question: 'Does the platform handle appointment management?',
			answer:
				'Yes! Our appointment management system lets you easily schedule, reschedule, or cancel appointments. It also reduces no-shows through automated reminders.'
		},
		{
			question: 'How does the platform manage patient medical history?',
			answer:
				'Our platform provides a secure, centralized system for managing comprehensive patient medical histories, accessible by authorized practitioners—even if the patient switches providers within the system.'
		},
		{
			question: 'Can patients access their own medical history?',
			answer:
				'Yes, patients can access their medical records, giving them better control and continuity of care—especially when changing practitioners using our platform.'
		},
		{
			question: 'How secure is patient data on your platform?',
			answer:
				'We prioritize security and privacy. The platform uses industry-standard encryption and protocols to protect sensitive data and complies with healthcare data regulations.'
		},

		{
			question: 'How do I get started with your SaaS?',
			answer:
				'Getting started is easy! You can sign up for a demo on our website or contact our sales team to explore customized solutions for your practice.'
		},
		{
			question: 'Do you offer training and support?',
			answer:
				'Yes, we provide full training resources and dedicated customer support to help you and your team succeed with our platform.'
		},
		{
			question: 'What are the pricing options for your SaaS?',
			answer:
				'We offer flexible pricing plans based on the size and needs of your practice. Visit our pricing page or contact us directly for more details.'
		}
	];
	const faqItems_ar: FAQItem[] = [
		{
			question: 'كيف يمكن أن تفيد هذه المنصة عيادتي؟',
			answer:
				'تساعد منصتنا في توفير الوقت، وتحسين التواصل مع المرضى، وتعزيز إدارة البيانات، وتسهيل تقديم رعاية متكاملة. هذا يسمح لك بالتركيز على رعاية المرضى بدلاً من الأعمال الإدارية.'
		},
		{
			question: 'هل المنصة مناسبة للعيادات الصغيرة والكبيرة؟',
			answer:
				'نعم بالتأكيد! منصتنا قابلة للتوسع والتخصيص لتناسب احتياجات العيادات بجميع أحجامها، من الأطباء المستقلين إلى العيادات متعددة الفروع.'
		},
		{
			question: 'ما نوع التقارير التي يمكنني إنشاؤها للمرضى؟',
			answer:
				'يمكنك إنشاء تقارير شاملة تتضمن ملخصات المواعيد، خطط العلاج، تفاصيل الوصفات الطبية، والمزيد. يمكن لأطباء الأسنان وأخصائيي البصريات اختيار تقرير شامل يحتوي على التاريخ الطبي الكامل أو تقرير جلسة يلخص زيارة محددة، وجميعها مصممة لتكون سهلة الفهم للمريض.'
		},
		{
			question: 'كيف يمكنني إرسال التقارير إلى المرضى؟',
			answer:
				'يمكنك إرسال التقارير بأمان إلى المرضى عبر البريد الإلكتروني أو واتساب، لتسهيل وتسريع عملية التواصل.'
		},
		{
			question: 'هل تدير المنصة مواعيد المرضى؟',
			answer:
				'بالتأكيد! نظام إدارة المواعيد لدينا يتيح لك جدولة، إعادة جدولة، أو إلغاء المواعيد بسهولة. كما يساعد في تقليل حالات عدم الحضور من خلال التذكيرات الآلية.'
		},
		{
			question: 'كيف تدير المنصة السجل الطبي للمرضى؟',
			answer:
				'نوفر نظامًا مركزيًا وآمنًا لتخزين السجل الطبي الكامل للمرضى، مما يضمن سهولة الوصول إليه من قبل الأطباء المصرح لهم، حتى في حال انتقال المريض بين الأطباء داخل نفس النظام.'
		},
		{
			question: 'هل يمكن للمرضى الوصول إلى سجلهم الطبي؟',
			answer:
				'نعم، يمكن للمرضى الوصول إلى سجلهم الطبي، مما يمنحهم تحكمًا أكبر واستمرارية في الرعاية، حتى عند تغيير الطبيب ضمن نفس النظام.'
		},
		{
			question: 'ما مدى أمان بيانات المرضى في المنصة؟',
			answer:
				'نحن نولي أقصى درجات الأهمية لأمن البيانات وخصوصية المرضى. تستخدم منصتنا تشفيرًا ومعايير أمان متقدمة لحماية جميع المعلومات الحساسة، وتلتزم باللوائح الصحية المعمول بها.'
		},

		{
			question: 'كيف يمكنني البدء باستخدام المنصة؟',
			answer:
				'البدء بسيط! يمكنك حجز تجربة عبر موقعنا الإلكتروني أو التواصل مع فريق المبيعات لمناقشة احتياجات عيادتك وخيارات التسعير.'
		},
		{
			question: 'هل تقدمون تدريبًا ودعمًا فنيًا؟',
			answer:
				'نعم، نوفر موارد تدريب شاملة ودعمًا فنيًا مخصصًا لمساعدتك أنت وفريقك في استخدام المنصة بكفاءة.'
		},
		{
			question: 'ما هي خطط التسعير المتاحة؟',
			answer:
				'نقدم خطط تسعير مرنة تتناسب مع حجم واحتياجات العيادة. يُرجى زيارة صفحة الأسعار أو التواصل معنا مباشرةً للحصول على التفاصيل.'
		}
	];
	let { isArabic = $bindable() }: { isArabic: boolean } = $props();
	let faqItems = $derived(isArabic ? faqItems_ar : faqItems_en);
</script>

<section id="faq" class="container mx-auto my-12 px-4">
	<h2 class="mb-8 text-center text-4xl font-extrabold tracking-tight md:text-5xl">
		<SparklesText text={m.faq()} />
	</h2>

	<div class="mx-auto flex max-w-5xl justify-center">
		<Accordion.Root
			type="single"
			class="w-full sm:w-[90%] md:w-[80%] lg:w-[70%]"
			aria-label="Frequently Asked Questions"
		>
			{#each faqItems as faq}
				<Accordion.Item class="border-b border-gray-200 py-4">
					<Accordion.Trigger class="text-left text-lg leading-relaxed font-medium md:text-xl">
						{faq.question}
					</Accordion.Trigger>
					<Accordion.Content class="mt-2 text-gray-700 md:text-lg">
						<p>{faq.answer}</p>
					</Accordion.Content>
				</Accordion.Item>
			{/each}
		</Accordion.Root>
	</div>
</section>
