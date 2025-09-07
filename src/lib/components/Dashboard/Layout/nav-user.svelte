<script lang="ts" module>
	import BadgeCheckIcon from '@lucide/svelte/icons/badge-check';
	import BellIcon from '@lucide/svelte/icons/bell';
	import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
	import CreditCardIcon from '@lucide/svelte/icons/credit-card';
	import LogOutIcon from '@lucide/svelte/icons/log-out';
	import SparklesIcon from '@lucide/svelte/icons/sparkles';
</script>

<script lang="ts">
	import { enhance } from '$app/forms';
	import type { UserModel } from '$lib/auth/auth';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import { deLocalizeHref, getLocale, setLocale } from '$lib/paraglide/runtime';
	let { user, formLoading = $bindable<boolean>(false) }: { user: UserModel; formLoading: boolean } =
		$props();
	const sidebar = useSidebar();
	const isArabic = getLocale() == 'ar';
</script>

<Sidebar.Menu>
	<Sidebar.MenuItem>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton
						size="lg"
						class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						{...props}
					>
						<Avatar.Root class="size-8 rounded-lg">
							<Avatar.Image src={'https://picsum.photos/200'} alt={user.firstName} />
							<Avatar.Fallback class="rounded-lg">CN</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-medium">{user.firstName}</span>
							<span class="truncate text-xs">{user.email}</span>
						</div>
						<ChevronsUpDownIcon class="ml-auto size-4" />
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				class="w-(--bits-dropdown-menu-anchor-width) min-w-56 rounded-lg"
				side={sidebar.isMobile ? 'bottom' : 'right'}
				align="end"
				sideOffset={4}
			>
				<DropdownMenu.Label class="p-0 font-normal">
					<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<Avatar.Root class="size-8 rounded-lg">
							<Avatar.Image src={'https://picsum.photos/200'} alt={user.firstName} />
							<Avatar.Fallback class="rounded-lg">CN</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-medium">{user.firstName}</span>
							<span class="truncate text-xs">{user.email}</span>
						</div>
					</div>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item>
						<SparklesIcon />
						Upgrade to Pro
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item>
						<BadgeCheckIcon />
						Account
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<CreditCardIcon />
						Billing
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						{#snippet child({ props })}
							<div class="realative" {...props}>
								<span class="ltr:block rtl:hidden">English</span>
								<span class=" ltr:hidden rtl:block">Arabic</span>
								<Switch
									class="absolute top-1/2 right-2 -translate-y-1/2"
									checked={isArabic}
									onCheckedChange={() => {
										if (isArabic) {
											setLocale('en');
										} else {
											setLocale('ar');
										}
									}}
								/>
							</div>{/snippet}
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />

				<DropdownMenu.Item>
					{#snippet child()}
						<form
							action={deLocalizeHref('/logout')}
							use:enhance={() => {
								formLoading = true;
								return async ({ update }) => {
									formLoading = false;
									update();
								};
							}}
							method="POST"
						>
							<button
								type="submit"
								class=" hover:bg-accent inline-flex w-full items-center text-start"
							>
								<LogOutIcon class="mr-2 shrink-0 text-sm" size="20" />
								<span>Logout</span>
							</button>
						</form>
					{/snippet}
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>
