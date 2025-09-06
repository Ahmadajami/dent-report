<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import { PhoneInput } from '$lib/components/ui/phone-input';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import { ArrowLeft, Eye, EyeClosed } from '@lucide/svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import docotors from '$lib/assets/doctors.svg';
	import Langugetoggle from '$lib/components/layout/Langugetoggle.svelte';
	import { clinicSchema, SPECIALIZATION_TYPES } from '$lib/auth/gpt-schema';

	let { data }: { data: PageData } = $props();
	let activeTab: 'Clinic' | 'Medical' = $state('Clinic');
	// State
	let passwordVisible = $state(false);
	let confirmPasswordVisible = $state(false);

	// Account form

	const clinicFormObj = superForm(data.clinicForm, {
		validators: zod4Client(clinicSchema),
		resetForm: false,
		invalidateAll: false
	});
	const {
		form: clinicForm,
		enhance: clinicEnhance,
		submitting: clinicSubmitting,
		validate: clincFormValidate
	} = clinicFormObj;
	const selectedDoctorLabel = $derived(
		$clinicForm.specialization == 'Empty' ? 'Select specialization...' : $clinicForm.specialization
	);

	// Password visibility toggles
	function togglePasswordVisibility() {
		passwordVisible = !passwordVisible;
	}

	function toggleConfirmPasswordVisibility() {
		confirmPasswordVisible = !confirmPasswordVisible;
	}

	$effect(() => {
		if ($clinicForm.password || $clinicForm.confirmPassword) {
			clincFormValidate('confirmPassword', { update: 'errors', taint: true });
		}
	});
</script>

<div class="flex min-h-screen flex-col overflow-x-hidden md:flex-row">
	<div class="relative hidden flex-1 md:block md:w-1/2">
		<img
			src={docotors}
			alt="A medical professional working in a clinic"
			class="absolute inset-0 h-screen w-full object-cover object-center"
		/>

		<!-- svelte-ignore element_invalid_self_closing_tag -->
		<div class="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-gray-900/20" />

		<div class="relative z-10 flex h-full flex-col p-10 lg:p-16">
			<div class="mb-4">
				<a href="#" class="flex items-center text-sm text-white opacity-90 hover:opacity-100">
					<ArrowLeft class="mr-1 h-4 w-4" />
					Back
				</a>
			</div>

			<h1 class="mb-4 text-3xl leading-tight font-bold text-white lg:text-4xl">
				Manage your patients and generate reports
			</h1>
			<p class="mb-8 text-gray-200">A simple and powerful tool for dental professionals.</p>

			<!-- svelte-ignore element_invalid_self_closing_tag -->
			<div class="mt-auto" />
		</div>
	</div>

	<div class="relative w-full p-4 sm:p-10 md:w-1/2 lg:p-14">
		<div class="absolute top-8 right-8">
			<Langugetoggle />
		</div>

		<h2 class="mb-6 text-3xl font-bold text-gray-900">Sign Up</h2>

		<Tabs.Root class="w-full" bind:value={activeTab}>
			<Tabs.List class="flex w-full space-x-4 border-b">
				<Tabs.Trigger value="Clinic">Clinic</Tabs.Trigger>
				<Tabs.Trigger value="Medical">Medical Center</Tabs.Trigger>
			</Tabs.List>

			<Tabs.Content
				value="Clinic"
				class="animate-in fade-in-0 slide-in-from-right-65 duration-200 starting:opacity-0"
			>
				<form method="POST" action="?/clinicAccount" use:clinicEnhance class="mt-6">
					<div class="grid gap-6">
						<!-- Full Name Row - English and Arabic side by side -->
						<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
							<Form.Field form={clinicFormObj} name="fullnamenglish">
								<Form.Control>
									{#snippet children({ props })}
										<Form.Label>Full Name (English)</Form.Label>
										<Input {...props} bind:value={$clinicForm.fullnamenglish} />
									{/snippet}
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>

							<Form.Field form={clinicFormObj} name="fullname_ar">
								<Form.Control>
									{#snippet children({ props })}
										<Form.Label>Full Name (Arabic)</Form.Label>
										<Input {...props} bind:value={$clinicForm.fullname_ar} />
									{/snippet}
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>
						</div>

						<!-- Phone Number - Full width row -->
						<Form.Field form={clinicFormObj} name="phoneNumber">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Phone Number</Form.Label>
									<PhoneInput
										country="SY"
										bind:value={$clinicForm.phoneNumber}
										{...props}
										class="my-2"
									/>
								{/snippet}
							</Form.Control>
							{$clinicForm.phoneNumber}
							<Form.Description>Include country code if needed.</Form.Description>
							<Form.FieldErrors />
						</Form.Field>

						<!-- Clinic Name - Full width row -->
						<Form.Field form={clinicFormObj} name="clinicName">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Clinic Name</Form.Label>
									<Input {...props} bind:value={$clinicForm.clinicName} />
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>

						<!-- Specialization - Full width row -->
						<Form.Field form={clinicFormObj} name="specialization">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Specialization</Form.Label>
									<Select.Root
										type="single"
										bind:value={$clinicForm.specialization}
										name={props.name}
									>
										<Select.Trigger {...props} class="w-full">
											{#if $clinicForm.specialization != 'Empty'}
												{$clinicForm.specialization}
											{:else}
												Select specialization...
											{/if}
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
							<Form.Description>Choose your clinic specialization.</Form.Description>
							<Form.FieldErrors />
						</Form.Field>

						<!-- Password Row - Password and Confirm Password side by side -->
						<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
							<Form.Field form={clinicFormObj} name="password">
								<Form.Control>
									{#snippet children({ props })}
										<Form.Label>Password</Form.Label>
										<div class="relative">
											<Input
												type={passwordVisible ? 'text' : 'password'}
												bind:value={$clinicForm.password}
												autocomplete="new-password"
												required
												{...props}
											/>
											<Button
												type="button"
												class="absolute inset-y-0 hover:bg-transparent ltr:right-0 rtl:left-0"
												variant="ghost"
												size="icon"
												onclick={togglePasswordVisibility}
												aria-pressed={passwordVisible}
												aria-label={passwordVisible ? 'Hide Password' : 'Show Password'}
												aria-controls="password"
											>
												{#if passwordVisible}
													<Eye class="h-4 w-4" aria-hidden="true" />
												{:else}
													<EyeClosed class="h-4 w-4" aria-hidden="true" />
												{/if}
											</Button>
										</div>
									{/snippet}
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>

							<Form.Field form={clinicFormObj} name="confirmPassword">
								<Form.Control>
									{#snippet children({ props })}
										<Form.Label>Confirm Password</Form.Label>
										<div class="relative">
											<Input
												type={confirmPasswordVisible ? 'text' : 'password'}
												bind:value={$clinicForm.confirmPassword}
												autocomplete="new-password"
												required
												{...props}
											/>
											<Button
												type="button"
												class="absolute inset-y-0 hover:bg-transparent ltr:right-0 rtl:left-0"
												variant="ghost"
												size="icon"
												onclick={toggleConfirmPasswordVisibility}
												aria-pressed={confirmPasswordVisible}
												aria-label={confirmPasswordVisible ? 'Hide Password' : 'Show Password'}
												aria-controls="password"
											>
												{#if confirmPasswordVisible}
													<Eye class="h-4 w-4" aria-hidden="true" />
												{:else}
													<EyeClosed class="h-4 w-4" aria-hidden="true" />
												{/if}
											</Button>
										</div>
									{/snippet}
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>
						</div>
					</div>

					<div class="mt-6">
						<Button type="submit" class="w-full" disabled={$clinicSubmitting}>
							{$clinicSubmitting ? 'Creating Account...' : 'Create Account'}
						</Button>
					</div>
				</form>
			</Tabs.Content>

			<Tabs.Content
				value="Medical"
				class="animate-in fade-in-0 slide-in-from-left-65 duration-200 starting:opacity-0"
			>
				<div class="mt-6">
					<p class="text-gray-600">Medical Center sign-up form will be here.</p>
				</div>
			</Tabs.Content>
		</Tabs.Root>
	</div>
</div>
