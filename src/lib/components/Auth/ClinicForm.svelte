<script lang="ts">
	import { SPECIALIZATION_TYPES, clinicSchema, type ClinicSchema } from '$lib/auth/gpt-schema';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import Password from '$lib/components/Auth/Password.svelte';
	import PhoneInput from '$lib/components/ui/phone-input/phone-input.svelte';
	import { m } from '$lib/paraglide/messages';

	let { form }: { form: SuperValidated<Infer<ClinicSchema>> } = $props();

	const clinicFormObj = superForm(form, {
		validators: zod4Client(clinicSchema)
	});
	const {
		form: clinicForm,
		enhance: clinicEnhance,
		submitting: clinicSubmitting,
		validate: clincFormValidate
	} = clinicFormObj;

	const selectedSpecializationLabel = $derived(
		$clinicForm.specialization == 'Empty' ? 'Select specialization...' : $clinicForm.specialization
	);

	$effect(() => {
		if ($clinicForm.password || $clinicForm.confirmPassword) {
			clincFormValidate('confirmPassword', { update: 'errors', taint: true });
		}
	});
</script>

<form method="POST" action="?/clinicAccount" use:clinicEnhance class="mt-6" autocomplete="on">
	<div class="grid gap-6">
		<!-- Full Name Row - English and Arabic side by side -->
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<Form.Field form={clinicFormObj} name="fullnamenglish">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label dir="ltr">Full Name (English)</Form.Label>
						<Input {...props} bind:value={$clinicForm.fullnamenglish} autocomplete="name" lang="en" />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field form={clinicFormObj} name="fullname_ar">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label dir="rtl">الإسم بالكامل</Form.Label>
						<Input dir="rtl" {...props} bind:value={$clinicForm.fullname_ar} autocomplete="name"  lang="ar"/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</div>

		<!-- Phone Number - Full width row -->
		<Form.Field form={clinicFormObj} name="phoneNumber">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>{m.phone_number_title()}</Form.Label>
					<PhoneInput country="SY" bind:value={$clinicForm.phoneNumber} {...props} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<!-- Clinic Name - Full width row -->
		<Form.Field form={clinicFormObj} name="clinicName">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>{m.clinic_title()}</Form.Label>
					<Input {...props} bind:value={$clinicForm.clinicName} autocomplete="organization" />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<!-- Specialization - Full width row -->
		<Form.Field form={clinicFormObj} name="specialization">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>{m.specialization_title()}</Form.Label>
					<Select.Root type="single" bind:value={$clinicForm.specialization} name={props.name}>
						<Select.Trigger {...props} class="w-full">
							{selectedSpecializationLabel}
						</Select.Trigger>
						<Select.Content>
							{#each SPECIALIZATION_TYPES as option}
								{#if option != 'Empty'}
									<Select.Item value={option} label={option} />
								{/if}
							{/each}
						</Select.Content>
					</Select.Root>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<!-- Password Row - Password and Confirm Password side by side -->
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<Form.Field form={clinicFormObj} name="password">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>{m.password_label()}</Form.Label>
						<Password bind:value={$clinicForm.password} {...props} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field form={clinicFormObj} name="confirmPassword">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>{m.confirm_password_title()}</Form.Label>
						<Password bind:value={$clinicForm.confirmPassword} {...props} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</div>
	</div>

	<div class="mt-6">
		<Button type="submit" class="w-full" disabled={$clinicSubmitting}>
			{$clinicSubmitting ? '...' : m.sign_up_title()}
		</Button>
	</div>
</form>
