<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Calendar, CalendarDays, Clock, Plus, Search, Send, User } from '@lucide/svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	let query = $state('');
	type Patient = { id: number; name: string; age: number; avatar?: string };

	const patients = $state<Patient[]>([
		{ id: 1, name: 'Eve Howard', age: 35 },
		{ id: 2, name: 'Victoria Shaw', age: 29 },
		{ id: 3, name: 'Noah Patterson', age: 42 },
		{ id: 4, name: 'Evelyn Jenkins', age: 56 }
	]);

	let filtered = $derived(
		!query.trim()
			? patients
			: patients.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
	);

	function generateReport() {
		alert('Report generated and sent to selected patients.');
	}

	function makeReservation() {
		alert('Reservation flow opened.');
	}
</script>

{#snippet old_dashboard()}
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
{/snippet}
{#snippet new_dashboard()}
	<div class="mt-0 w-full px-6 md:px-8">
		<div class="mx-auto max-w-7xl">
			<h1 class="text-2xl font-semibold tracking-tight">Patient Management</h1>

			<!-- Search -->
			<div class="mt-2">
				<Input
					placeholder="Search patients"
					bind:value={query}
					class="h-11 pl-4"
					aria-label="Search patients"
				/>
			</div>

			<!-- Responsive Grid: 1 column on mobile, 3 on large -->
			<div class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
				<!-- Patients list -->
				<div class="space-y-4 lg:col-span-2">
					<Card.Root class="shadow-sm">
						<Card.Content class="p-0">
							<ScrollArea class="h-[420px]">
								<ul class="divide-y">
									{#each filtered as p}
										<li class="flex items-center gap-4 px-4 py-3">
											<Avatar.Root class="h-10 w-10">
												<Avatar.Image src={p.avatar} alt={p.name} />
												<Avatar.Fallback>
													{p.name
														.split(' ')
														.map((n) => n[0])
														.join('')}
												</Avatar.Fallback>
											</Avatar.Root>
											<div class="flex-1">
												<div class="leading-none font-medium">{p.name}</div>
												<div class="text-muted-foreground text-sm">Age {p.age}</div>
											</div>
											<Button variant="secondary" size="sm">Open</Button>
										</li>
									{/each}

									{#if filtered.length === 0}
										<li class="text-muted-foreground px-4 py-10 text-center text-sm">
											No patients match "{query}".
										</li>
									{/if}
								</ul>
							</ScrollArea>
						</Card.Content>
					</Card.Root>
				</div>

				<!-- Right sidebar cards -->
				<div class="space-y-6">
					<!-- Report card -->
					<Card.Root class="shadow-sm">
						<Card.Header class="pb-3">
							<Card.Title>Report</Card.Title>
							<Card.Description>Generate and send report to patients</Card.Description>
						</Card.Header>
						<Card.Content class="space-y-4">
							<div
								class="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl"
							>
								<Plus class="text-primary h-8 w-8" />
							</div>
							<Button class="w-full">Generate</Button>
						</Card.Content>
					</Card.Root>

					<!-- Reservation card -->
					<Card.Root class="shadow-sm">
						<Card.Header class="pb-3">
							<Card.Title>Reservation</Card.Title>
							<Card.Description>Schedule an appointment with a patient</Card.Description>
						</Card.Header>
						<Card.Content class="space-y-4">
							<div
								class="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl"
							>
								<CalendarDays class="text-primary h-8 w-8" />
							</div>
							<Button class="w-full" onclick={makeReservation}>Reserve</Button>
						</Card.Content>
					</Card.Root>
				</div>
			</div>
		</div>
	</div>
{/snippet}
{@render new_dashboard()}
