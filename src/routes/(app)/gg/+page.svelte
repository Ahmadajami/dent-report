<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button/index.js';

	let { data }: { data: PageData } = $props();
</script>

<h1>Gurded Route</h1>
<form class="logout" action="/logout" method="POST" use:enhance>
	<Button type="submit">Log out</Button>
</form>
