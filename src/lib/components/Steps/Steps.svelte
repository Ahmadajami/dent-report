<script lang="ts">
	// Props
	let steps = ['Account Details', "Orgnization's Details"];
	let currentStep = 1; // index starts at 1 for display

	// Utility function to check active step
	const isActive = (index: number) => index + 1 === currentStep;
</script>

<div>
	<h2 class="sr-only">Steps</h2>

	<div
		class="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100"
	>
		<ol class="relative z-10 flex justify-between text-sm font-medium text-gray-500">
			{#each steps as step, i}
				<li class="flex items-center gap-2 bg-white p-2">
					<span
						class={`size-6 rounded-full text-center text-[10px]/6 font-bold 
              ${isActive(i) ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}
            `}
					>
						{i + 1}
					</span>

					<span class="hidden sm:block">{step}</span>
				</li>
			{/each}
		</ol>
	</div>
</div>
