<script lang="ts">
	import Spacer from '../Spacer.svelte';
	import { GameStatus, getStats, gameState, currentPropertyInfo } from '$lib/stores/GameStore';
	import { formatCurrency } from '$lib/FormatUtil';
	import { onMount } from 'svelte';
	import { getDrawerStore, getModalStore } from '@skeletonlabs/skeleton';
	import PropertyImages from '../property/PropertyImages.svelte';
	import { share } from 'skeleton-share';
	const modalStore = getModalStore();
	let timeUntilNextGame = 0;
	let nextGame = new Date();
	onMount(() => {
		nextGame.setHours(0, 0, 0, 0);
		nextGame.setDate(nextGame.getDate() + 1);
		const nextGameInterval: NodeJS.Timeout | undefined = setInterval(() => {
			const currentTime = new Date();
			timeUntilNextGame = (nextGame.getTime() - currentTime.getTime()) / 1000;
			if (timeUntilNextGame < 0) {
				timeUntilNextGame = 0;
				clearInterval(nextGameInterval);
			}
		}, 1000);
		return () => {
			if (nextGameInterval) {
				clearInterval(nextGameInterval);
			}
		};
	});

	function convertSecondsToDDMMSS(seconds: number) {
		seconds %= 24 * 3600;
		let hours = Math.floor(seconds / 3600);
		seconds %= 3600;
		let minutes = Math.floor(seconds / 60);
		seconds %= 60;

		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${Math.floor(seconds).toString().padStart(2, '0')}`;
	}
	$: allImages =
		$currentPropertyInfo == undefined
			? []
			: $currentPropertyInfo.imageUrl &&
				  !$currentPropertyInfo.images.includes($currentPropertyInfo.imageUrl)
				? $currentPropertyInfo.images.concat($currentPropertyInfo.imageUrl)
				: $currentPropertyInfo.images;

	const drawerStore = getDrawerStore();
</script>

{#if $modalStore[0]}
	<div class="card py-5 px-5 md:px-10 rounded container flex flex-col transition-opacity">
		<header class="card-header flex justify-between">
			<h2 class="text-2xl">Statistik</h2>
			<button class="px-3 py-1 text-2xl" on:click={() => modalStore.close()}>&times;</button>
		</header>
		<Spacer />
		<div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 my-1">
			{#each getStats() as stat}
				<div
					class="card variant-soft-surface text-center flex flex-col justify-center py-2 px-1 md:px-4"
				>
					<p class="text-black dark:text-white font-bold">{stat.value}</p>
					<small>{stat.name}</small>
				</div>
			{/each}
		</div>
		{#if ($gameState.status == GameStatus.Win || $gameState.status == GameStatus.Loss) && $currentPropertyInfo !== undefined}
			<div class="flex md:flex-row flex-col justify-around my-1">
				<div class="w-3/4 md:w-1/2 m-auto">
					<PropertyImages images={allImages} class="rounded-lg overflow-hidden" />
				</div>
				<div class="flex flex-col justify-center text-center my-2">
					<p>Dagens pris er:</p>
					<p class="text-lg md:text-2xl">{formatCurrency($currentPropertyInfo.udbudspris)}</p>
					<a class="btn variant-filled my-1" href={$currentPropertyInfo.agentlink} target="_blank"
						>Se hos mægler</a
					>
				</div>
			</div>
			<Spacer />
			<div class="flex justify-around text-center">
				<div class="flex flex-col w-1/2">
					<p>Næste spil:</p>
					<p class="text-xl">{convertSecondsToDDMMSS(timeUntilNextGame)}</p>
				</div>
				<div class="w-1/2">
					<button type="button" class="btn variant-filled-secondary w-[90%]" on:click={() => share({
						title: 'Saglde',
						text: '',
						url: window.location.href,
					}, drawerStore)}>Del</button>
				</div>
			</div>
		{/if}
	</div>
{/if}
