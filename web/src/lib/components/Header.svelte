<script lang="ts">
	import { showStats, tutorialSeen } from '$lib/stores/ViewStore';
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';
    import { BarChartIcon, HelpCircleIcon } from 'svelte-feather-icons'
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead">
		<div class="flex gap-3">
		<button on:click={() => $showStats = true}><BarChartIcon strokeWidth={3}/></button>
		<button on:click={() => $tutorialSeen = 'false'}><HelpCircleIcon strokeWidth={2}/></button>
	</div>
</svelte:fragment>
	<h1 class="text-2xl font-bold">Salgdle</h1>
	<svelte:fragment slot="trail">
		<LightSwitch class="" />
	</svelte:fragment>
</AppBar>
