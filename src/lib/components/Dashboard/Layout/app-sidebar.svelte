<script lang="ts" module>
	import { m } from '$lib/paraglide/messages';
	import AudioWaveformIcon from '@lucide/svelte/icons/audio-waveform';
	import ChartPieIcon from '@lucide/svelte/icons/chart-pie';
	import CommandIcon from '@lucide/svelte/icons/command';
	import FrameIcon from '@lucide/svelte/icons/frame';
	import GalleryVerticalEndIcon from '@lucide/svelte/icons/gallery-vertical-end';
	import MapIcon from '@lucide/svelte/icons/map';
	import Settings2Icon from '@lucide/svelte/icons/settings-2';
	import ClipboardPlus from '@lucide/svelte/icons/clipboard-plus';
	import UserPlus from '@lucide/svelte/icons/user-plus';
	// This is sample data.
	const data = {
		//user
		user: {
			name: 'shadcn',
			email: 'm@example.com',
			avatar: 'https://picsum.photos/200'
		},
		//secrutary data
		teams: [
			{
				name: 'Acme Inc',
				logo: GalleryVerticalEndIcon,
				plan: 'Enterprise'
			},
			{
				name: 'Acme Corp.',
				logo: AudioWaveformIcon,
				plan: 'Startup'
			},
			{
				name: 'Evil Corp.',
				logo: CommandIcon,
				plan: 'Free'
			}
		],
		// main nav
		navMain: [
			{
				title: m.patients(),
				url: '#',
				icon: UserPlus,
				isActive: true,
				items: [
					{
						title: m.add_patient(),
						url: '#'
					},
					{
						title: m.edit_patient(),
						url: '#'
					},
					{
						title: 'View Patient',
						url: '#'
					}
				]
			},
			{
				title: 'Reports',
				url: '#',
				icon: ClipboardPlus,
				items: [
					{
						title: 'New Report',
						url: '#'
					},
					{
						title: 'Latest Report',
						url: '#'
					},
					{
						title: 'Reports History',
						url: '#'
					}
				]
			},

			{
				title: 'Settings',
				url: '#',
				icon: Settings2Icon,
				items: [
					{
						title: 'General',
						url: '#'
					},
					{
						title: 'Support',
						url: '#'
					},
					{
						title: 'Billing info',
						url: '#'
					}
				]
			}
		],
		// lates report nav
		projects: [
			{
				name: 'Design Engineering',
				url: '#',
				icon: FrameIcon
			},
			{
				name: 'Sales & Marketing',
				url: '#',
				icon: ChartPieIcon
			},
			{
				name: 'Travel',
				url: '#',
				icon: MapIcon
			}
		]
	};
</script>

<script lang="ts">
	import { getLocale } from '$lib/paraglide/runtime';
	import NavUser from '$lib/components/Dashboard/Layout/nav-user.svelte';
	import TeamSwitcher from '$lib/components/Dashboard/Layout/team-switcher.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';

	import type { ComponentProps } from 'svelte';
	import { page } from '$app/state';
	import GptSidebar from './gpt-sidebar.svelte';
	let isArabic = getLocale() == 'ar';
	type SidebarWithFormLoadingProps = ComponentProps<typeof Sidebar.Root> & {
		formLoading?: boolean;
	};
	let {
		ref = $bindable(null),
		formLoading = $bindable<boolean>(false),
		collapsible = 'icon',
		...restProps
	}: SidebarWithFormLoadingProps = $props();
</script>

<Sidebar.Root variant="inset" side={isArabic ? 'right' : 'left'} {collapsible} {...restProps}>
	<Sidebar.Header>
		<TeamSwitcher teams={data.teams} />
	</Sidebar.Header>
	<Sidebar.Content>
		<GptSidebar navs={[{ name: 'Patient', url: '#', icon: UserPlus }]} />
		<!--<NavMain items={data.navMain} />
		<NavProjects projects={data.projects} />-->
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser bind:formLoading user={page.data.user} />
	</Sidebar.Footer>
	<!--Sidebar.Rail is A Verticale component to with transpaertn exsistence whive work like triggers-->
	<Sidebar.Rail />
</Sidebar.Root>
