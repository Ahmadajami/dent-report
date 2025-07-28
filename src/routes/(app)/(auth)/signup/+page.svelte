<script lang="ts">
	//--Basic Compoenent
	import * as Form from '$lib/components/ui/form/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Card from '$lib/components/ui/card/index.js';

	////Lucid Icons
	import Eye from '@lucide/svelte/icons/eye';
	import EyeClosed from '@lucide/svelte/icons/eye-closed';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';
	//data Handling
	import type { PageProps } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';

	import { toast } from 'svelte-sonner';
	import Hcaptcha from '$lib/hcaptcha/Hcaptcha.svelte';
	import { z } from 'zod/v4';
	let { data }: PageProps = $props();
	const createschema = z.object({
		email: z.email(),
		password: z.string().min(8, { error: 'Too short Password.' }),
		'h-captcha-response': z.string().min(1, 'Please complete the captcha')
	});
	let resetCaptcha = $state(false);
	let captchaToken = $state('');
	let hcaptcharef = $state();

	const form = superForm(data.form, {
		validators: zod4Client(createschema),
		onResult: ({ result }) => {
			resetCaptcha = true;

			if (result?.status !== 200) {
				toast.error('There was an error. Please try again.');
				console.log(result);
			}
		}
	});

	const { form: formData, enhance, delayed, message } = form;

	function handleCaptchaSuccess(token: string) {
		captchaToken = token;
		$formData['h-captcha-response'] = token;
	}

	function handleCaptchaExpired() {
		captchaToken = '';
		$formData['h-captcha-response'] = '';
	}

	function handleCaptchaError() {
		console.error('hCaptcha error occurred');
		captchaToken = '';
		$formData['h-captcha-response'] = '';
	}

	function handleCaptchaClose() {
		// Handle when user closes the captcha challenge
	}

	function handleCaptchaLoad() {
		console.log('hCaptcha loaded successfully');
	}

	let show = $state(false);
	function togglePassword() {
		show = !show;
	}

	$effect(() => {
		if ($message) {
			toast.error($message);
		}
	});
</script>

<!--SignupForm-->
<section class="mx-auto flex min-h-svh max-w-screen-md items-center justify-center">
	<Card.Root class="w-full max-w-sm">
		<Card.Header>
			<Card.Title>Create your account</Card.Title>
			<Card.Description>Enter your email below to create your account</Card.Description>
		</Card.Header>

		<Card.Content>
			<form id="Sigup" use:enhance method="POST">
				<div class="flex flex-col gap-6">
					<div class="grid gap-2">
						<Form.Field {form} name="email">
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
							<Form.Description>This is your Email.</Form.Description>
							<Form.FieldErrors />
						</Form.Field>
					</div>
					<div class="grid gap-2">
						<Form.Field {form} name="password">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label for="password">Password</Form.Label>
									<div class="relative">
										<Input
											type={!show ? 'password' : 'text'}
											bind:value={$formData.password}
											{...props}
											autocomplete="current-password"
											required
										/>
										<Button
											class="absolute inset-y-0 right-0 hover:bg-transparent "
											variant="ghost"
											size="icon"
											onclick={togglePassword}
											>{#if show}
												<Eye />
											{:else}
												<EyeClosed />
											{/if}
										</Button>
									</div>
								{/snippet}
							</Form.Control>
							<Form.Description>This is your Password.</Form.Description>
							<Form.FieldErrors />
						</Form.Field>
					</div>
				</div>
			</form>
		</Card.Content>
		<Card.Footer class="flex-col gap-2">
			<Hcaptcha
				bind:this={hcaptcharef}
				size="invisible"
				onSuccess={handleCaptchaSuccess}
				onExpired={handleCaptchaExpired}
				onError={handleCaptchaError}
				onClose={handleCaptchaClose}
				onLoad={handleCaptchaLoad}
				bind:resetTrigger={resetCaptcha}
			/>
			<Form.Button class=" inline-flex w-full  " form="Sigup" disabled={$delayed}>
				{#if $delayed}
					<LoaderCircle class="animate-spin" />
				{/if}SignUp
			</Form.Button>
		</Card.Footer>
	</Card.Root>
</section>
