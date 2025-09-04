<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { z } from 'zod/v4';

	const accountSchema = z.object({
		name: z.string().min(2, 'Name must be at least 2 characters'),
		username: z
			.string()
			.min(3, 'Username must be at least 3 characters')
			.regex(/^@/, 'Username must start with @')
	});

	const passwordSchema = z.object({
		currentPassword: z.string().min(1, 'Current password is required'),
		newPassword: z.string().min(8, 'New password must be at least 8 characters')
	});

	let { data }: { data: PageData } = $props();

	// Account form
	const {
		form: accountForm,
		errors: accountErrors,
		enhance: accountEnhance,
		message: accountMessage,
		submitting: accountSubmitting
	} = superForm(data.accountForm, {
		validators: zod4Client(accountSchema),
		resetForm: false, // Don't reset form on success
		invalidateAll: false // Prevent clearing other form data
	});

	// Password form
	const {
		form: passwordForm,
		errors: passwordErrors,
		enhance: passwordEnhance,
		message: passwordMessage,
		submitting: passwordSubmitting
	} = superForm(data.passwordForm, {
		validators: zod4Client(passwordSchema),
		resetForm: true, // Reset password form after successful submission
		invalidateAll: false // Prevent clearing other form data
	});
</script>

<section class="flex min-h-screen items-center justify-center">
	<div class=" flex w-full max-w-sm flex-col gap-6">
		<!-- Success Messages -->
		{#if $accountMessage}
			<div class="rounded-lg bg-green-50 p-4 text-green-700">
				{$accountMessage}
			</div>
		{/if}

		{#if $passwordMessage}
			<div class="rounded-lg bg-green-50 p-4 text-green-700">
				{$passwordMessage}
			</div>
		{/if}

		<Tabs.Root value="account">
			<Tabs.List>
				<Tabs.Trigger value="account">Account</Tabs.Trigger>
				<Tabs.Trigger value="password">Password</Tabs.Trigger>
			</Tabs.List>

			<Tabs.Content value="account">
				<Card.Root>
					<Card.Header>
						<Card.Title>Account</Card.Title>
						<Card.Description>
							Make changes to your account here. Click save when you're done.
						</Card.Description>
					</Card.Header>

					<form method="POST" action="?/updateAccount" use:accountEnhance>
						<Card.Content class="grid gap-6">
							<div class="grid gap-3">
								<Label for="tabs-demo-name">Name</Label>
								<Input
									id="tabs-demo-name"
									name="name"
									bind:value={$accountForm.name}
									aria-invalid={$accountErrors.name ? 'true' : undefined}
									class={$accountErrors.name ? 'border-red-500' : ''}
								/>
								{#if $accountErrors.name}
									<div class="text-sm text-red-500">{$accountErrors.name}</div>
								{/if}
							</div>

							<div class="grid gap-3">
								<Label for="tabs-demo-username">Username</Label>
								<Input
									id="tabs-demo-username"
									name="username"
									bind:value={$accountForm.username}
									aria-invalid={$accountErrors.username ? 'true' : undefined}
									class={$accountErrors.username ? 'border-red-500' : ''}
								/>
								{#if $accountErrors.username}
									<div class="text-sm text-red-500">{$accountErrors.username}</div>
								{/if}
							</div>
						</Card.Content>

						<Card.Footer>
							<Button type="submit" disabled={$accountSubmitting}>
								{$accountSubmitting ? 'Saving...' : 'Save changes'}
							</Button>
						</Card.Footer>
					</form>
				</Card.Root>
			</Tabs.Content>

			<Tabs.Content value="password">
				<Card.Root>
					<Card.Header>
						<Card.Title>Password</Card.Title>
						<Card.Description>
							Change your password here. After saving, you'll be logged out.
						</Card.Description>
					</Card.Header>

					<form method="POST" action="?/updatePassword" use:passwordEnhance>
						<Card.Content class="grid gap-6">
							<div class="grid gap-3">
								<Label for="tabs-demo-current">Current password</Label>
								<Input
									id="tabs-demo-current"
									name="currentPassword"
									type="password"
									bind:value={$passwordForm.currentPassword}
									aria-invalid={$passwordErrors.currentPassword ? 'true' : undefined}
									class={$passwordErrors.currentPassword ? 'border-red-500' : ''}
								/>
								{#if $passwordErrors.currentPassword}
									<div class="text-sm text-red-500">{$passwordErrors.currentPassword}</div>
								{/if}
							</div>

							<div class="grid gap-3">
								<Label for="tabs-demo-new">New password</Label>
								<Input
									id="tabs-demo-new"
									name="newPassword"
									type="password"
									bind:value={$passwordForm.newPassword}
									aria-invalid={$passwordErrors.newPassword ? 'true' : undefined}
									class={$passwordErrors.newPassword ? 'border-red-500' : ''}
								/>
								{#if $passwordErrors.newPassword}
									<div class="text-sm text-red-500">{$passwordErrors.newPassword}</div>
								{/if}
							</div>
						</Card.Content>

						<Card.Footer>
							<Button type="submit" disabled={$passwordSubmitting}>
								{$passwordSubmitting ? 'Saving...' : 'Save password'}
							</Button>
						</Card.Footer>
					</form>
				</Card.Root>
			</Tabs.Content>
		</Tabs.Root>
	</div>
</section>
