<script lang="ts">
	import { page } from '$app/state';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { deLocalizeHref, localizeHref } from '$lib/paraglide/runtime';

	const nonDefaultLangs = ['ar']; // add any other non-default langs here

	const crumbs = $derived.by(() => {
		const segments = page.url.pathname
			.split('/')
			.filter(Boolean)
			// Remove first segment if it’s a non-default language
			.filter((seg, i) => !(i === 0 && nonDefaultLangs.includes(seg)));

		return segments.map((segment, i) => {
			const href = '/' + segments.slice(0, i + 1).join('/');
			return {
				label:
					decodeURIComponent(segment).charAt(0).toUpperCase() +
					decodeURIComponent(segment).slice(1),
				href: i < segments.length - 1 ? deLocalizeHref(href) : null
			};
		});
	});
</script>

<Breadcrumb.Root>
	<Breadcrumb.List>
		{#each crumbs as crumb, i}
			<Breadcrumb.Item>
				{#if crumb.href}
					<Breadcrumb.Link href={localizeHref(crumb.href)}>{crumb.label}</Breadcrumb.Link>
				{:else}
					<Breadcrumb.Page>{crumb.label}</Breadcrumb.Page>
				{/if}
			</Breadcrumb.Item>

			{#if i < crumbs.length - 1}
				<Breadcrumb.Separator />
			{/if}
		{/each}
	</Breadcrumb.List>
</Breadcrumb.Root>
