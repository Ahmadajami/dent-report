<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { setLocale } from '$lib/paraglide/runtime';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class={buttonVariants({ variant: 'outline', size: 'icon' })}>
		<span class="ltr:hidden">Ar</span>
		<span class="rtl:hidden">En</span>
		<span class="sr-only">Toggle Languges</span>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content side="bottom" sideOffset={0}>
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
