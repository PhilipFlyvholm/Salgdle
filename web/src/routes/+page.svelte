<script lang="ts">
	import type { PageData } from './$types';
	import { flags } from '$lib/Flags';
	import NumberInput from '$lib/components/NumberInput.svelte';
	import Property from '$lib/components/property/Property.svelte';
	import { onMount } from 'svelte';
	import GuessContainer from '$lib/components/guess/GuessContainer.svelte';
	import { showStats, tutorialSeen } from '$lib/stores/ViewStore';
	import { setGameOver, gameState, GameStatus, startGame, currentPropertyInfo } from '$lib/stores/GameStore';
	import AnimatedDots from '$lib/components/AnimatedDots.svelte';
	import Tutorial from '$lib/components/overlays/Tutorial.svelte';
	export let data: PageData;
	let mounted = false;
	onMount(async () => {
		if (!flags.loadTodaysProperty) return;
		if(data.property == undefined) return;
		if($gameState.status === GameStatus.Loading || $gameState.gameId !== data.gameId){
			startGame(data.gameId, data.property)
		}else{
			$currentPropertyInfo = data.property;
		}
		mounted = true;
	});

	let currentGuessValue = 0;

	function onSubmit(value: number) {
		if (data.property === undefined) return;
		if($gameState.status !== GameStatus.InProgess) return;
		if ($gameState.guesses.length >= 5) return;
		if (value === 0) return;
		const correct = value === data.property.udbudspris;
		$gameState.guesses.push({ value });
		$gameState.guesses = $gameState.guesses;
		currentGuessValue = 0;
		if (correct || $gameState.guesses.length === 5) {
			$showStats = true;
			setGameOver(correct)
		}
	}
</script>
<div
	class="container lg:max-w-[50%] mx-auto p-1 flex flex-col items-center justify-between h-full md:w-[50%]"
>	
	{#if data.property === undefined}
		<h2 class="text-center h2 font-bold m-auto">Venter på dagens bolig<AnimatedDots /></h2>
	{:else}
		<Property property={data.property} />
		<div class="flex-auto w-full">
			<GuessContainer currentGuess={currentGuessValue} />
			{#if $gameState.status === GameStatus.InProgess}
				<NumberInput bind:value={currentGuessValue} {onSubmit} />
			{:else}
				<div class="h-5" />
			{/if}
		</div>
	{/if}
</div>
{#if mounted && $tutorialSeen === 'false'}
	<Tutorial />
{/if}
<style>
	:global(#page-content) {
		height: 100%;
	}
</style>
