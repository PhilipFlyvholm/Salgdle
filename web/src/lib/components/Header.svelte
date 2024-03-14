<script lang="ts">
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	import { BarChartIcon, HelpCircleIcon } from 'svelte-feather-icons';
	import { modalSettings } from './overlays/Overlays';
	import { getModalStore } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead">
		<div class="flex gap-3">
			<button on:click={() => (modalStore.trigger(modalSettings.stats))}><BarChartIcon strokeWidth={3} /></button>
			<button on:click={() => modalStore.trigger(modalSettings.tutorial)}
				><HelpCircleIcon strokeWidth={2} /></button
			>
		</div>
	</svelte:fragment>
	<h1 class="text-2xl font-bold">Salgdle</h1>
	<svelte:fragment slot="trail">
		<LightSwitch class="" />
	</svelte:fragment>
</AppBar>
