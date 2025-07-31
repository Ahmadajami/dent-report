<script lang="ts">
	import { cn } from '$lib/utils';
	import { Motion } from 'svelte-motion';

	let className: any = '';
	export { className as class };
	export let r = 5;
	export let c = 5;
	let rows = new Array(r).fill(1);
	let cols = new Array(c).fill(1);
</script>

<div class="">
	<div class={cn('relative z-0 flex h-full w-full justify-center', className)}>
		{#each rows as _, i}
			<Motion let:motion>
				<div class="h-9 w-9 border-neutral-200 sm:h-12 md:w-12 dark:border-neutral-900" use:motion>
					{#each cols as _, j}
						<Motion
							whileHover={{
								backgroundColor: `#696969`,
								transition: { duration: 0 }
							}}
							animate={{
								transition: { duration: 2 }
							}}
							let:motion
						>
							<div
								class="h-9 w-9 border-t border-r last:border-b sm:h-12 md:w-12 {i === 0 && j >= 0
									? 'border-l'
									: ''}    relative border-neutral-200 dark:border-neutral-900"
								use:motion
							></div>
						</Motion>
					{/each}
				</div>
			</Motion>
		{/each}
	</div>
</div>
