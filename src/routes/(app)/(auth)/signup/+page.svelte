<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import type { PageData } from './$types';
	import Langugetoggle from '$lib/components/layout/Langugetoggle.svelte';
	import ClinicForm from '$lib/components/Auth/ClinicForm.svelte';
	import MedicalForm from '$lib/components/Auth/MedicalForm.svelte';
	import { m } from '$lib/paraglide/messages';

	// State
	let { data }: { data: PageData } = $props();
	let activeTab: 'Clinic' | 'Medical' = $state('Clinic');

	// Constants

	const headingText = {
		Clinic: m.clinc(),
		Medical: m.medical_center()
	};
</script>


	<div class="absolute top-8 ltr:right-8 rtl:left-8">
		<Langugetoggle />
	</div>
	{#key activeTab}
		<h2 class="mb-6 w-[70%] text-3xl font-bold text-wrap text-gray-900">
			{m.sign_up_header()}
			<span class="animate-in fade-in-0 slide-in-from-bottom-5 duration-300">
				{headingText[activeTab]}
			</span>
		</h2>
	{/key}
	<Tabs.Root class="w-full overflow-x-hidden" bind:value={activeTab}>
		<Tabs.List class="flex w-full space-x-4 border-b">
			<Tabs.Trigger value="Clinic">{m.clinc()}</Tabs.Trigger>
			<Tabs.Trigger value="Medical">{m.medical_center()}</Tabs.Trigger>
		</Tabs.List>

		{#if activeTab === 'Clinic'}
			<!--Clinic Form-->
			<Tabs.Content
				value="Clinic"
				class="animate-in fade-in-0 slide-in-from-right-65 duration-200 starting:opacity-0"
			>
				<ClinicForm form={data.clinicForm} />
			</Tabs.Content>
		{:else}
			<!--Medical Form-->
			<Tabs.Content value="Medical" class="animate-in fade-in-0 slide-in-from-left-65 duration-200">
				<MedicalForm form={data.medicalForm} />
			</Tabs.Content>
		{/if}
	</Tabs.Root>

