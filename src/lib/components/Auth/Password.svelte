<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import Eye from '@lucide/svelte/icons/eye';
	import EyeClosed from '@lucide/svelte/icons/eye-closed';
	
	
	
	let { value = $bindable(), ...restProps } = $props();
	
	// State to track password visibility
	let passwordVisible = $state(false);
	function togglePasswordVisibility() {
		passwordVisible = !passwordVisible;
	}
</script>

<div class="relative">
	<Input
		type={passwordVisible ? 'text' : 'password'}
		autocomplete="new-password"
		bind:value
		{...restProps}
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
