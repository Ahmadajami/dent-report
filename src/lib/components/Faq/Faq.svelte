<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	type FAQItem = {
		id: string;
		question: string;
		answer: string;
	};

	const faqItems: FAQItem[] = [
		{
			id: 'item-1',
			question: 'How can I reset my password?',
			answer:
				'To reset your password, go to the login page and click on “Forgot Password”. Follow the instructions in the email to reset your password.'
		},
		{
			id: 'item-2',
			question: 'How do I update my billing information?',
			answer:
				'To update billing information, log in to your account, go to Settings > Billing, and update your payment method.'
		},
		{
			id: 'item-3',
			question: 'How can I contact customer support?',
			answer:
				'Contact our support team via the "Help" section in your dashboard or email support@example.com.'
		},
		{
			id: 'item-4',
			question: 'How do I delete my account?',
			answer:
				'To delete your account, go to Settings > Account and click “Delete Account.” Confirm your decision in the prompt.'
		}
	];
</script>

<section id="Faq" class="my-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16">
			<h2 class="text-center text-4xl leading-[3.25rem] font-bold">Frequently asked questions</h2>
		</div>

		<Accordion.Root type="single" class="space-y-4">
			{#each faqItems as faq}
				<Accordion.Item class="  rounded-xl border border-gray-300 p-4">
					<Accordion.Trigger
						class="group hover:text-primary flex w-full items-center justify-between text-left text-lg leading-8  font-normal transition duration-500"
					>
						<span>{faq.question}</span>
					</Accordion.Trigger>
					<Accordion.Content class="pt-2 text-base leading-6 font-normal ">
						{faq.answer}
					</Accordion.Content>
				</Accordion.Item>
			{/each}
		</Accordion.Root>
	</div>
</section>
