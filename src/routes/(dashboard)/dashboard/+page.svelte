<script>
	import * as Card from '$lib/components/ui/card/index.js';
	import { Calendar, Clock, Search, Send, User } from '@lucide/svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<div class="flex-1 space-y-6 overflow-y-auto p-6">
	<!-- Top Row -->
	<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
		<!-- Today’s Schedule -->
		<Card.Root class="md:col-span-2">
			<Card.Header>
				<Card.Title class="flex items-center gap-2"
					><Calendar size={18} /> Today’s Schedule</Card.Title
				>
			</Card.Header>
			<Card.Content>
				<ul class="space-y-3">
					<li class="flex items-center justify-between rounded-xl bg-gray-100 p-3">
						<div class="flex items-center gap-3">
							<User class="text-blue-600" size={18} />
							<div>
								<p class="font-medium">John Doe</p>
								<p class="text-sm text-gray-500">Tooth Filling</p>
							</div>
						</div>
						<div class="flex items-center gap-2 text-sm text-gray-600">
							<Clock size={16} /> 10:00 AM
						</div>
					</li>
					<li class="flex items-center justify-between rounded-xl bg-gray-100 p-3">
						<div class="flex items-center gap-3">
							<User class="text-blue-600" size={18} />
							<div>
								<p class="font-medium">Sarah Smith</p>
								<p class="text-sm text-gray-500">Cleaning</p>
							</div>
						</div>
						<div class="flex items-center gap-2 text-sm text-gray-600">
							<Clock size={16} /> 11:30 AM
						</div>
					</li>
				</ul>
			</Card.Content>
		</Card.Root><!-- Quick Patient Lookup -->
		<Card.Root>
			<Card.Header>
				<Card.Title class="flex items-center gap-2"
					><Search size={18} /> Quick Patient Lookup</Card.Title
				>
			</Card.Header>
			<Card.Content>
				<div class="flex gap-2">
					<Input placeholder="Search by name, phone, or ID..." />
					<Button><Search size={16} /></Button>
				</div>
			</Card.Content>
		</Card.Root>
	</div>

	<!-- Middle Row: Recent Sessions -->
	<Card.Root>
		<Card.Header>
			<Card.Title>Recent Sessions</Card.Title>
		</Card.Header>
		<Card.Content class="space-y-3">
			<div class="flex justify-between rounded-xl bg-gray-100 p-3">
				<p><strong>Mary Johnson</strong> - Root Canal</p>
				<span class="text-sm text-gray-500">Yesterday</span>
			</div>
			<div class="flex justify-between rounded-xl bg-gray-100 p-3">
				<p><strong>David Lee</strong> - Whitening</p>
				<span class="text-sm text-gray-500">2 days ago</span>
			</div>
		</Card.Content>
	</Card.Root>

	<!-- Bottom Row -->
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
		<!-- Pending WhatsApp -->
		<Card.Root>
			<Card.Header>
				<Card.Title class="flex items-center gap-2"
					><Send size={18} /> Pending Communications</Card.Title
				>
			</Card.Header>
			<Card.Content>
				<div class="flex items-center justify-between rounded-xl bg-gray-100 p-3">
					<p>Session summary for John Doe</p>
					<Button size="sm">Send</Button>
				</div>
			</Card.Content>
		</Card.Root>

		<!-- KPI Snapshot -->
		<Card.Root>
			<Card.Header>
				<Card.Title>Snapshot</Card.Title>
			</Card.Header>
			<Card.Content class="grid grid-cols-3 gap-4 text-center">
				<div>
					<p class="text-2xl font-bold">5</p>
					<p class="text-sm text-gray-500">Patients Today</p>
				</div>
				<div>
					<p class="text-2xl font-bold">12</p>
					<p class="text-sm text-gray-500">Sessions This Week</p>
				</div>
				<div>
					<p class="text-2xl font-bold">8</p>
					<p class="text-sm text-gray-500">Upcoming</p>
				</div>
			</Card.Content>
		</Card.Root>
	</div>
</div>
