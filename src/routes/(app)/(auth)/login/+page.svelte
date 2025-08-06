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
	import { authschema } from '$lib/auth/schema';
	import { toast } from 'svelte-sonner';
	import { m } from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime';

	let { data }: PageProps = $props();

	const form = superForm(data.form, {
		validators: zod4Client(authschema)
	});
	const { form: formData, enhance, delayed, message } = form;

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

<section class="mx-auto flex min-h-svh max-w-screen-md items-center justify-center">
	<Card.Root class="w-full max-w-sm bg-transparent backdrop-blur-sm ">
		<Card.Header>
			<Card.Title>{m.vivid_wise_bullock_cheer()}</Card.Title>
			<Card.Description>{m.email_desc()}</Card.Description>
			<Card.Action>
				<Button variant="link" href={localizeHref('/signup')}>{m.sign_up()}</Button>
			</Card.Action>
		</Card.Header>

		<Card.Content>
			<form id="Login" use:enhance method="POST">
				<div class="flex flex-col gap-6">
					<div class="grid gap-2">
						<Form.Field {form} name="email">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label for="email">{m.email_label()}</Form.Label>
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
							<Form.Description>{m.email_field()}</Form.Description>
							<Form.FieldErrors />
						</Form.Field>
					</div>
					<div class="grid gap-2">
						<Form.Field {form} name="password">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label for="password">{m.password_label()}</Form.Label>
									<div class="relative">
										<Input
											type={!show ? 'password' : 'text'}
											bind:value={$formData.password}
											{...props}
											autocomplete="current-password"
											required
										/>
										<Button
											class="absolute inset-y-0 hover:bg-transparent ltr:right-0 rtl:left-0 "
											variant="ghost"
											size="icon"
											onclick={togglePassword}
											aria-pressed={show}
											aria-label={show ? 'Hide Password' : 'Show Password'}
											aria-controls="password"
											>{#if show}
												<Eye aria-hidden="true" />
											{:else}
												<EyeClosed aria-hidden="true" />
											{/if}
										</Button>
									</div>
								{/snippet}
							</Form.Control>
							<Form.Description>{m.password_desc()}</Form.Description>
							<Form.FieldErrors />
						</Form.Field>

						<a href="##" class="ml-auto inline-block text-sm underline-offset-4 hover:underline">
							{m.forget_desc()}
						</a>
					</div>
				</div>
			</form>
		</Card.Content>
		<Card.Footer class="flex-col gap-2">
			<Form.Button class=" inline-flex w-full  " form="Login" disabled={$delayed}>
				{#if $delayed}
					<LoaderCircle class="animate-spin" />
				{/if}{m.log_in()}
			</Form.Button>
		</Card.Footer>
	</Card.Root>
</section>
