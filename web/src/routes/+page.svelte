<script lang="ts">
	import type { PageData } from './$types';
	import { flags } from '$lib/Flags';
	import NumberInput from '$lib/components/NumberInput.svelte';
	import Property from '$lib/components/property/Property.svelte';
	import { onMount } from 'svelte';
	import GuessContainer from '$lib/components/guess/GuessContainer.svelte';
	import { tutorialSeen } from '$lib/stores/ViewStore';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import {
		setGameOver,
		gameState,
		GameStatus,
		startGame,
		currentPropertyInfo
	} from '$lib/stores/GameStore';
	import AnimatedDots from '$lib/components/AnimatedDots.svelte';
	import { modalSettings } from '$lib/components/overlays/Overlays';

	export let data: PageData;

	const modalStore = getModalStore();
	let mounted = false;

	onMount(async () => {
		if (!flags.loadTodaysProperty) return;
		if (data.property == undefined) return;
		if ($tutorialSeen === 'false') {
			modalStore.trigger(modalSettings.tutorial);
		}
		if ($gameState.status === GameStatus.Loading || $gameState.gameId !== data.gameId) {
			startGame(data.gameId, data.property);
		} else {
			$currentPropertyInfo = data.property;
		}
		mounted = true;
	});

	let currentGuessValue = 0;

	function onSubmit(value: number) {
		if (data.property === undefined) return;
		if ($gameState.status !== GameStatus.InProgess) return;
		if ($gameState.guesses.length >= 5) return;
		if (value === 0) return;
		const correct = value === data.property.udbudspris;
		$gameState.guesses.push({ value });
		$gameState.guesses = $gameState.guesses;
		currentGuessValue = 0;
		if (correct || $gameState.guesses.length === 5) {
			modalStore.trigger(modalSettings.stats);
			setGameOver(correct);
		}
	}
</script>

<div class="container md:max-w-[75%] mx-auto p-1 h-full flex flex-col">
	{#if data.property === undefined}
		<h2 class="text-center h2 font-bold m-auto">Venter på dagens bolig<AnimatedDots /></h2>
	{:else}
		<Property property={data.property}/>
		<GuessContainer currentGuess={currentGuessValue} class="px-2"/>
		<div class="mx-2">
			{#if $gameState.status === GameStatus.InProgess}
				<NumberInput bind:value={currentGuessValue} {onSubmit}/>
			{:else}
				<div class="h-5" />
			{/if}
		</div>
	{/if}
</div>

<style>
	:global(#page-content) {
		height: 100%;
	}
</style>
