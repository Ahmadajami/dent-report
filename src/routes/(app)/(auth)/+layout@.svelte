<script lang="ts">
	import { type Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<div class="relative z-[1]">
	{@render children()}
</div>
<!-- 
<div class="absolute top-0 left-0 z-[-1] min-h-screen w-full opacity-70">
	svelte-ignore element_invalid_self_closing_tag 
	<div id="particles-js" class="absolute inset-0" />
</div>
-->
