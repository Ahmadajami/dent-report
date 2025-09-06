<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { getLocale, setLocale } from '$lib/paraglide/runtime';
	let dir: 'rtl' | 'ltr' = $derived(getLocale() === 'ar' ? 'rtl' : 'ltr');
	let { class: className=""} = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class={[buttonVariants({ variant: 'outline', size: 'icon' }), className]}>
		<span class="ltr:hidden">Ar</span>
		<span class="rtl:hidden">En</span>
		<span class="sr-only">Toggle Languges</span>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content side="bottom" {dir} preventScroll={false}>
		<DropdownMenu.Item
			onclick={() => {
				setLocale('ar');
			}}>Ar</DropdownMenu.Item
		>
		<DropdownMenu.Item
			onclick={() => {
				setLocale('en');
			}}>En</DropdownMenu.Item
		>
	</DropdownMenu.Content>
</DropdownMenu.Root>
