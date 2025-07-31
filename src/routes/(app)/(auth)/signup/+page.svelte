<script lang="ts">
	// Basic Components
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Card from '$lib/components/ui/card/index.js';

	// Lucide Icons
	import Eye from '@lucide/svelte/icons/eye';
	import EyeClosed from '@lucide/svelte/icons/eye-closed';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';

	// Data Handling
	import type { PageProps } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { signupSchema } from '$lib/auth/schema';
	import { toast } from 'svelte-sonner';

	// Props
	let { data }: PageProps = $props();

	// State
	let passwordVisible = $state(false);
	let confirmPasswordVisible = $state(false);
	// Form setup
	const form = superForm(data.form, {
		validators: zod4Client(signupSchema)
	});

	const { form: formData, enhance, delayed, message, validate } = form;
	const selectedDoctorLabel = $derived(
		$formData.doctorType == 'Empty' ? 'Select your specialization' : $formData.doctorType
	);

	// Password visibility toggles
	function togglePasswordVisibility() {
		passwordVisible = !passwordVisible;
	}

	function toggleConfirmPasswordVisibility() {
		confirmPasswordVisible = !confirmPasswordVisible;
	}

	// Handle form messages
	$effect(() => {
		if ($message) {
			toast.error($message);
		}
	});

	$effect(() => {
		if ($formData.password || $formData.confirmPassword) {
			validate('confirmPassword', { update: 'errors', taint: true });
		}
	});
</script>

<section class="mx-auto flex min-h-svh max-w-screen-md items-center justify-center">
	<Card.Root class="w-full max-w-2xl bg-transparent backdrop-blur-sm">
		<Card.Header>
			<Card.Title>Let's Create</Card.Title>
			<Card.Description>Fill in your details below to create your account</Card.Description>
		</Card.Header>

		<Card.Content>
			<form id="signup-form" use:enhance method="POST">
				<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
					<Form.Field {form} name="email" class="md:col-span-2">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label for="email">Email</Form.Label>
								<Input
									type="email"
									placeholder="m@example.com"
									bind:value={$formData.email}
									autocomplete="email"
									required
									{...props}
								/>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>

					<Form.Field {form} name="password">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label for="password">Password</Form.Label>
								<div class="relative">
									<Input
										type={passwordVisible ? 'text' : 'password'}
										bind:value={$formData.password}
										autocomplete="new-password"
										required
										{...props}
									/>
									<Button
										type="button"
										class="absolute inset-y-0 right-0 hover:bg-transparent"
										variant="ghost"
										size="icon"
										onclick={togglePasswordVisibility}
										aria-pressed={passwordVisible}
										aria-label={passwordVisible ? 'Hide Password' : 'Show Password'}
										aria-controls="password"
									>
										{#if passwordVisible}
											<Eye class="h-4 w-4"   aria-hidden="true"/>
										{:else}
											<EyeClosed class="h-4 w-4"   aria-hidden="true"/>
										{/if}
									</Button>
								</div>
							{/snippet}
						</Form.Control>
						<Form.Description>Must be at least 8 characters.</Form.Description>
						<Form.FieldErrors />
					</Form.Field>

					<Form.Field {form} name="confirmPassword">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label for="confirmPassword">Confirm Password</Form.Label>
								<div class="relative">
									<Input
										type={confirmPasswordVisible ? 'text' : 'password'}
										bind:value={$formData.confirmPassword}
										autocomplete="new-password"
										required
										{...props}
									/>
									<Button
										type="button"
										class="absolute inset-y-0 right-0 hover:bg-transparent"
										variant="ghost"
										size="icon"
										onclick={toggleConfirmPasswordVisibility}
										aria-pressed={confirmPasswordVisible}
										aria-label={confirmPasswordVisible ? 'Hide Password' : 'Show Password'}
										aria-controls="password"
									>
										{#if confirmPasswordVisible}
											<Eye class="h-4 w-4" aria-hidden="true"/>
										{:else}
											<EyeClosed class="h-4 w-4"  aria-hidden="true"/>
										{/if}
									</Button>
								</div>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>

					<Form.Field {form} name="centerName" class="md:col-span-2">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label for="centerName">Center Name</Form.Label>
								<Input
									type="text"
									bind:value={$formData.centerName}
									placeholder="Enter your clinic or center name"
									required
									{...props}
								/>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>

					<Form.Field {form} name="doctorName">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label for="doctorName">Doctor Name</Form.Label>
								<Input
									type="text"
									bind:value={$formData.doctorName}
									placeholder="Enter your full name"
									required
									{...props}
								/>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>

					<Form.Field {form} name="phoneNumber">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label for="phoneNumber">Phone Number</Form.Label>
								<Input
									type="tel"
									bind:value={$formData.phoneNumber}
									placeholder="Enter your phone number"
									autocomplete="tel"
									required
									{...props}
								/>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>

					<Form.Field {form} name="doctorType" class="md:col-span-2">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Doctor Type</Form.Label>
								<Select.Root type="single" bind:value={$formData.doctorType} name={props.name}>
									<Select.Trigger {...props} class="w-full">
										{selectedDoctorLabel}
									</Select.Trigger>
									<Select.Content>
										<Select.Item value="Dentist" label="Dentist" />
										<Select.Item value="Optometrist" label="Optometrist" />
									</Select.Content>
								</Select.Root>
							{/snippet}
						</Form.Control>
						<Form.Description>Please select your specialization.</Form.Description>
						<Form.FieldErrors />
					</Form.Field>
				</div>
			</form>
		</Card.Content>

		<Card.Footer class="flex flex-col gap-2 pt-6">
			<Form.Button class="w-full" form="signup-form" disabled={$delayed}>
				{#if $delayed}
					<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Sign Up
			</Form.Button>
		</Card.Footer>
	</Card.Root>
</section>
