<script lang="ts">
	import Footer from '$lib/components/layout/Footer.svelte';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Cursor from '$lib/components/MagicUi/Cursor.svelte';

	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<Navbar />
<main class="pt-18">
	{@render children()}
</main>
<Footer />
