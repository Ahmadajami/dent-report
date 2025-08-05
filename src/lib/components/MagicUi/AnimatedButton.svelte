<script lang="ts">
	import { cn } from '$lib/utils';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';

	let { class: _class = '', text = 'Button', ...restProps } = $props();
</script>

<button
	class={cn(
		'group bg-background relative w-32 cursor-pointer overflow-hidden rounded-full border p-2 text-center font-semibold',
		_class
	)}
	{...restProps}
>
	<span
		class="inline-block -translate-x-4 transition-all duration-300 group-hover:-translate-x-12 group-hover:opacity-0"
	>
		{text}
	</span>
	<div
		class="text-primary-foreground absolute top-0 z-10 flex h-full w-full -translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
	>
		<span>{text}</span>
		<ArrowRight />
	</div>
	<div
		class="bg-primary group-hover:bg-primary absolute top-[40%] right-[20%] h-2 w-2 scale-[1] rounded-lg transition-all duration-300 group-hover:top-[0%] group-hover:right-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8]"
	></div>
</button>
