<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index';
	import { fade } from 'svelte/transition';
	import type { PageProps } from './$types';

	interface Tooth {
		number: number;
		name: string;
		type: 'molar' | 'premolar' | 'canine' | 'incisor';
	}

	interface TeethData {
		upper: Tooth[];
		lower: Tooth[];
	}

	const teethData: TeethData = {
		upper: [
			{ number: 18, name: 'Upper Right Third Molar', type: 'molar' },
			{ number: 17, name: 'Upper Right Second Molar', type: 'molar' },
			{ number: 16, name: 'Upper Right First Molar', type: 'molar' },
			{ number: 15, name: 'Upper Right Second Premolar', type: 'premolar' },
			{ number: 14, name: 'Upper Right First Premolar', type: 'premolar' },
			{ number: 13, name: 'Upper Right Canine', type: 'canine' },
			{ number: 12, name: 'Upper Right Lateral Incisor', type: 'incisor' },
			{ number: 11, name: 'Upper Right Central Incisor', type: 'incisor' },
			{ number: 21, name: 'Upper Left Central Incisor', type: 'incisor' },
			{ number: 22, name: 'Upper Left Lateral Incisor', type: 'incisor' },
			{ number: 23, name: 'Upper Left Canine', type: 'canine' },
			{ number: 24, name: 'Upper Left First Premolar', type: 'premolar' },
			{ number: 25, name: 'Upper Left Second Premolar', type: 'premolar' },
			{ number: 26, name: 'Upper Left First Molar', type: 'molar' },
			{ number: 27, name: 'Upper Left Second Molar', type: 'molar' },
			{ number: 28, name: 'Upper Left Third Molar', type: 'molar' }
		],
		lower: [
			{ number: 48, name: 'Lower Right Third Molar', type: 'molar' },
			{ number: 47, name: 'Lower Right Second Molar', type: 'molar' },
			{ number: 46, name: 'Lower Right First Molar', type: 'molar' },
			{ number: 45, name: 'Lower Right Second Premolar', type: 'premolar' },
			{ number: 44, name: 'Lower Right First Premolar', type: 'premolar' },
			{ number: 43, name: 'Lower Right Canine', type: 'canine' },
			{ number: 42, name: 'Lower Right Lateral Incisor', type: 'incisor' },
			{ number: 41, name: 'Lower Right Central Incisor', type: 'incisor' },
			{ number: 31, name: 'Lower Left Central Incisor', type: 'incisor' },
			{ number: 32, name: 'Lower Left Lateral Incisor', type: 'incisor' },
			{ number: 33, name: 'Lower Left Canine', type: 'canine' },
			{ number: 34, name: 'Lower Left First Premolar', type: 'premolar' },
			{ number: 35, name: 'Lower Left Second Premolar', type: 'premolar' },
			{ number: 36, name: 'Lower Left First Molar', type: 'molar' },
			{ number: 37, name: 'Lower Left Second Molar', type: 'molar' },
			{ number: 38, name: 'Lower Left Third Molar', type: 'molar' }
		]
	};

	let selectedTeeth = $state<Tooth[]>([]);
	let selectedCount = $derived(selectedTeeth.length);

	function toggleTooth(tooth: Tooth): void {
		const index = selectedTeeth.findIndex((t) => t.number === tooth.number);
		if (index > -1) {
			selectedTeeth = selectedTeeth.filter((t) => t.number !== tooth.number);
		} else {
			selectedTeeth = [...selectedTeeth, tooth];
		}
	}

	function clearSelection(): void {
		selectedTeeth = [];
	}

	function isSelected(tooth: Tooth): boolean {
		return selectedTeeth.some((t) => t.number === tooth.number);
	}

	let { data }: PageProps = $props();
	let title = 'Interactive Dental Chart';
	let description = 'Click on any tooth to select/deselect it. Uses FDI numbering system.';
	function selectAllTeeth(): void {
		selectedTeeth = [...teethData.upper, ...teethData.lower];
	}
</script>

<div class="page-container">
	<Card.Root class="chart-card">
		<Card.Header class=" flex flex-row items-center justify-between">
			<h2 class="text-2xl font-bold">{title}</h2>
			<p class="text-muted">{description}</p>
			<!-- Select All button here -->
			<Button variant="outline" onclick={selectAllTeeth}>Select All</Button>
		</Card.Header>

		<Card.Content class="flex flex-col items-center gap-12">
			<div class="jaw">
				<h3 class="jaw-title">Upper Jaw</h3>
				<div class="teeth-row">
					{#each teethData.upper as tooth (tooth.number)}
						<button
							class="tooth {tooth.type} {isSelected(tooth) ? 'selected' : ''}"
							title={tooth.name}
							onclick={() => toggleTooth(tooth)}
						>
							{tooth.number}
						</button>
					{/each}
				</div>
			</div>

			<div class="jaw">
				<h3 class="jaw-title">Lower Jaw</h3>
				<div class="teeth-row">
					{#each teethData.lower as tooth (tooth.number)}
						<button
							class="tooth {tooth.type} {isSelected(tooth) ? 'selected' : ''}"
							title={tooth.name}
							onclick={() => toggleTooth(tooth)}
						>
							{tooth.number}
						</button>
					{/each}
				</div>
			</div>
		</Card.Content>

		{#if selectedCount > 0}
			<Card.Footer class="selected-info">
				<div class="flex flex-col gap-2" transition:fade={{ duration: 300 }}>
					<h3>Selected Teeth ({selectedCount})</h3>
					<div class="selected-teeth">
						{#each selectedTeeth as tooth (tooth.number)}
							<span class="selected-tooth-tag animate-in fade-in-0 zoom-in-5" title={tooth.name}>
								{tooth.number}
							</span>
						{/each}
					</div>
					<div class="mt-2 flex gap-2">
						<button class="clear-button" onclick={clearSelection}>Clear All</button>
						<!-- Next button here -->
						<button class="next-button">Next</button>
					</div>
				</div>
			</Card.Footer>
		{/if}
	</Card.Root>
</div>

<style>
	/* Header Select All button */
	.select-all-button {
		background: #10b981;
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 6px;
		cursor: pointer;
		font-weight: 500;
		/*transition: background 0.2s;*/
	}
	.select-all-button:hover {
		background: #059669;
	}

	/* Next button in footer */
	.next-button {
		background: #3b82f6;
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 6px;
		cursor: pointer;
		font-weight: 500;
		/*transition: background 0.2s;*/
	}
	.next-button:hover {
		background: #2563eb;
	}
	.page-container {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.action-buttons button {
		padding: 0.5rem 1rem;
		border-radius: 6px;
		font-weight: 500;
		cursor: pointer;
		/*	transition: background 0.2s;*/
	}

	.select-all-button {
		background: #10b981;
		color: white;
		border: none;
	}
	.select-all-button:hover {
		background: #059669;
	}

	.next-button {
		background: #3b82f6;
		color: white;
		border: none;
	}
	.next-button:hover {
		background: #2563eb;
	}

	.chart-card {
		width: 100%;
		max-width: 900px;
	}

	.jaw {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.jaw-title {
		font-size: 1rem;
		font-weight: 600;
		color: #475569;
	}

	.teeth-row {
		display: flex;
		gap: 4px;
		background: #f8fafc;
		padding: 8px;
		border-radius: 8px;
	}

	.tooth {
		width: 36px;
		height: 44px;
		border: 2px solid var(--primary);
		border-radius: 6px 6px 12px 12px;
		background: #fff;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.75rem;
		font-weight: 500;
		color: #64748b;
	}

	.tooth:hover {
		border-color: #3b82f6;
		transform: translateY(-6px);
		box-shadow: 0 4px 8px rgba(59, 130, 246, 0.2);
	}

	.tooth.selected {
		background: #3b82f6;
		border-color: #2563eb;
		color: white;
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
	}

	.tooth.molar {
		border-radius: 6px;
	}
	.tooth.canine {
		border-radius: 6px 6px 16px 16px;
	}
	.tooth.incisor {
		border-radius: 4px 4px 12px 12px;
	}

	.selected-info {
		background: #f1f5f9;
		border-top: 1px solid #e2e8f0;
		padding-top: 1rem;
	}

	.selected-teeth {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.selected-tooth-tag {
		background: #3b82f6;
		color: white;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-size: 0.75rem;
		font-weight: 500;
	}

	.clear-button {
		align-self: flex-start;
		background: #ef4444;
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 6px;
		cursor: pointer;
		font-size: 0.875rem;
		font-weight: 500;
		/*transition: background 0.2s;*/
	}
	.clear-button:hover {
		background: #dc2626;
	}
</style>
