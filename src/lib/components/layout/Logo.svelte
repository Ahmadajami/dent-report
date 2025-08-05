<script lang="ts">
	import { cn } from '$lib/utils';

	let { className }: { className?: string } = $props();
</script>

<span class={cn(className)} dir="ltr">Useful</span>
<span class={cn('text-primary', className)} dir="ltr">Report </span>
