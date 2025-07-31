<script lang="ts">
	import { cn } from '$lib/utils';

	type Props = {
		direction?: 'top' | 'bottom';
		class?: string;
	};

	let { direction = 'bottom', class: className = '' }: Props = $props();

	// More concise derived values
	const gradientDirection = $derived(direction === 'top' ? '0deg' : '180deg');
	const positionClass = $derived(`${direction === 'top' ? 'top' : 'bottom'}-[-200px]`);

	// Build the gradient style
	const gradientStyle = $derived(`
    background: conic-gradient(
      from ${gradientDirection} at 50% 50%, 
      var(--primary) 0deg, 
      var(--primary) 180deg, 
      var(--primary) 1turn
    ); 
    filter: blur(75px); 
    opacity: 20%;
  `);
</script>

<div class={cn('h-full w-full overflow-hidden', className)}>
	<div style={gradientStyle} class="relative h-full w-full {positionClass}"></div>
</div>
