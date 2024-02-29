<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Statistics from '$lib/components/overlays/Statistics.svelte';
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
</script>

<AppShell>
	<svelte:fragment slot="header">
		<Header />
	</svelte:fragment>
	<Statistics />
	<slot />
</AppShell>
