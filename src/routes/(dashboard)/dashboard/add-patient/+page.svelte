<script lang="ts">
	import * as Card from '$lib/components/ui/card/index';
	import * as Select from '$lib/components/ui/select/index.js';
	import type { PageProps } from './$types';

	// Types
	interface Tooth {
		number: number;
		name: string;
		type: 'molar' | 'premolar' | 'canine' | 'incisor';
	}

	interface TeethData {
		upper: Tooth[];
		lower: Tooth[];
	}

	// Tooth data using FDI numbering system
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

	// Svelte 5 reactive state using $state rune
	let selectedTeeth = $state<Tooth[]>([]);

	// Derived state using $derived rune
	let selectedCount = $derived(selectedTeeth.length);

	// Functions
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

	// Props (if you want to make this configurable)

	let { data }: PageProps = $props();
	const numberingOptions = [
		{ value: 'FDI', label: 'FDI' },
		{ value: 'ISO', label: 'ISO' }
	];
	let numbering = $state('FDI');
	const triggerContent = $derived(
		numberingOptions.find((noption) => noption.value === numbering)?.label ??
			'Select a Numbering System'
	);
	let title = 'Interactive Dental Chart';
	let description = 'Click on any tooth to select/deselect it. Uses FDI numbering system.';
</script>

<Card.Root class="w-full">
	<Card.Header>
		<h2 class="text2xl font-bold">{title}</h2>
		<p class="text-muted">{description}</p>
		<Card.Action>
			<Select.Root type="single" name="Numbring System" bind:value={numbering}>
				<Select.Trigger class="w-[180px]">
					{triggerContent}
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						<Select.Label>Numbering Options</Select.Label>
						{#each numberingOptions as noption (noption.value)}
							<Select.Item value={noption.value} label={noption.label}>
								{noption.label}
							</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
			</Select.Root>
		</Card.Action>
	</Card.Header>
	<Card.Content class="flex flex-col items-center justify-center gap-8">
		<Card.Root class="w-full ">
			<Card.Header>Upper Jaw</Card.Header>
			<Card.Content class="flex flex-row items-center justify-center gap-0.5">
				{#each teethData.upper as tooth (tooth.number)}
					<button
						class="tooth {tooth.type} {isSelected(tooth) ? 'selected' : ''}"
						title={tooth.name}
						onclick={() => toggleTooth(tooth)}
					>
						{tooth.number}
					</button>
				{/each}
			</Card.Content>
		</Card.Root>
		<Card.Root class="w-full ">
			<Card.Header>Lower Jaw</Card.Header>
			<Card.Content class="flex flex-row items-center justify-center gap-0.5">
				{#each teethData.lower as tooth (tooth.number)}
					<button
						class="tooth {tooth.type} {isSelected(tooth) ? 'selected' : ''}"
						title={tooth.name}
						onclick={() => toggleTooth(tooth)}
					>
						{tooth.number}
					</button>
				{/each}
			</Card.Content>
		</Card.Root>
	</Card.Content>
</Card.Root>
{#if selectedCount > 0}
	<div class="selected-info">
		<h3>Selected Teeth ({selectedCount})</h3>
		<div class="selected-teeth">
			{#each selectedTeeth as tooth (tooth.number)}
				<span class="selected-tooth-tag" title={tooth.name}>
					{tooth.number}
				</span>
			{/each}
		</div>
		<button class="clear-button" onclick={clearSelection}> Clear All </button>
	</div>
{/if}

<style>
	.card {
		background: white;
		border-radius: 12px;
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06);
		border: 1px solid #e2e8f0;
		padding: 2rem;
		max-width: 800px;
		width: 100%;
		margin: 0 auto;
	}

	.card-header {
		margin-bottom: 2rem;
		text-align: center;
	}

	.card-title {
		font-size: 1.5rem;
		font-weight: 600;
		color: #1e293b;
		margin-bottom: 0.5rem;
	}

	.card-description {
		color: #64748b;
		font-size: 0.875rem;
	}

	.dental-chart {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		align-items: center;
	}

	.jaw-label {
		font-weight: 500;
		color: #475569;
		margin-right: 1rem;
		min-width: 80px;
		font-size: 0.875rem;
	}

	.teeth-row {
		display: flex;
		gap: 2px;
		background: #f1f5f9;
		padding: 8px;
		border-radius: 8px;
	}

	.tooth {
		width: 32px;
		height: 40px;
		border: 2px solid var(--primary);
		border-radius: 6px 6px 12px 12px;
		background: #ffffff;

		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.75rem;
		font-weight: 500;
		color: #64748b;
		position: relative;
	}

	.tooth:hover {
		border-color: #3b82f6;
		transform: translateY(-8px);
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
		margin-top: 2rem;
		padding: 1rem;
		background: #f8fafc;
		border: 1px solid #e2e8f0;
		border-radius: 8px;
	}

	.selected-info h3 {
		color: #1e293b;
		font-size: 1rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
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
		background: #ef4444;
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 6px;
		cursor: pointer;
		font-size: 0.875rem;
		font-weight: 500;
		transition: background 0.2s;
		margin-top: 1rem;
	}

	.clear-button:hover {
		background: #dc2626;
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.card {
			padding: 1rem;
			margin: 1rem;
		}

		.jaw {
			flex-direction: column;
			align-items: stretch;
		}

		.jaw-label {
			margin-right: 0;
			margin-bottom: 0.5rem;
			text-align: center;
		}
	}
</style>
