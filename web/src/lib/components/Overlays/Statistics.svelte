<script lang="ts">
	import { fade } from 'svelte/transition';
	import Spacer from '../Spacer.svelte';
	import { showStats } from '$lib/stores/ViewStore';
	import { GameStatus, getStats, gameState, currentPropertyInfo } from '$lib/stores/GameStore';
	import { formatCurrency } from '$lib/FormatUtil';
	import { onOutside } from '$lib/actions/OnOutside';
	import { onMount } from 'svelte';

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
</script>

{#if $showStats}
	<div
		transition:fade={{ duration: 300 }}
		class="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10 card py-5 px-10 rounded container flex flex-col transition-opacity"
		use:onOutside={() => ($showStats = false)}
	>
		<header class="card-header flex justify-between">
			<h2 class="text-2xl">Statistik</h2>
			<button class="text-2xl" on:click={() => ($showStats = false)}>&times;</button>
		</header>
		<Spacer />
		<div class="grid grid-cols-4 gap-5 my-1">
			{#each getStats() as stat}
				<div
					class="card variant-soft-surface mb-4 text-center flex flex-col justify-center py-2 px-4"
				>
					<p>{stat.value}</p>
					<p>{stat.name}</p>
				</div>
			{/each}
		</div>
		{#if ($gameState.status == GameStatus.Win || $gameState.status == GameStatus.Loss) && $currentPropertyInfo !== undefined}
			<div class="flex flex-col justify-center text-center my-1">
				<p>Dagens pris er:</p>
				<p class="text-2xl">{formatCurrency($currentPropertyInfo.udbudspris)}</p>
			</div>
			<Spacer />
			<div class="flex justify-around text-center">
				<div class="flex flex-col">
					<p>Næste spil:</p>
					<p class="text-xl">{convertSecondsToDDMMSS(timeUntilNextGame)}</p>
				</div>
				<button type="button">Del</button>
			</div>
		{/if}
	</div>
{/if}
