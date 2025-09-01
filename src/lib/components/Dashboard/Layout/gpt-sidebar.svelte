<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	let { navs } = $props();
</script>

<Sidebar.Group>
	<Sidebar.Menu>
		{#each navs as item (item.name)}
			<Sidebar.MenuItem>
				<Sidebar.MenuButton>
					{#snippet child({ props })}
						<a
							href={item.url}
							class="flex items-center gap-3 text-lg text-sidebar-foreground/70 hover:text-sidebar-foreground transition-all"
							{...props}
						>
							<item.icon class="w-6 h-6" /> <!-- bigger icons -->
							<span class="text-lg font-medium">{item.name}</span> <!-- bigger text -->
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		{/each}
	</Sidebar.Menu>
</Sidebar.Group>
