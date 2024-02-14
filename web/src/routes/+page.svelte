<script lang="ts">
		import type { PageData } from './$types';
	import { flags } from '$lib/Flags';
	import NumberInput from '$lib/components/NumberInput.svelte';
	import Property from '$lib/components/Property/Property.svelte';
	import { onMount } from 'svelte';
	import type { Guess as GuessType } from '$lib/GuessTypes';
	import GuessContainer from '$lib/components/Guess/GuessContainer.svelte';
	import { showStats } from '$lib/stores/ViewStore';
	import { setGameOver, currentPropertyInfo } from '$lib/stores/GameStore';
	export let data: PageData;
	
	onMount(async () => {
		if (!flags.loadTodaysProperty) return;
		$currentPropertyInfo = data.property
	});

	let currentGuess = 0;
	let nrOfGuesses = 0;
	const guesses: (GuessType | undefined)[] = [
		undefined,
		undefined,
		undefined,
		undefined,
		undefined
	];

	function onSubmit(value: number) {
		if (data.property === undefined) return;
		if (nrOfGuesses >= 5) return;
		if (value === 0) return;
		const correct = value === data.property.udbudspris;
		guesses[nrOfGuesses] = { value, correct: correct, actual: data.property.udbudspris };
		nrOfGuesses++;
		currentGuess = 0;
		if (correct || nrOfGuesses === 5) {
			$showStats = true;
			setGameOver(correct)
			nrOfGuesses = 5;
		}
	}
</script>
<div
	class="container lg:max-w-[50%] mx-auto p-1 flex flex-col items-center justify-between h-full md:w-[50%]"
>
	<Property property={data.property} {nrOfGuesses} />
	<div class="flex-auto w-full">
		<GuessContainer {guesses} {nrOfGuesses} {currentGuess} />
		<NumberInput bind:value={currentGuess} {onSubmit} />
	</div>
</div>

<style>
	:global(#page-content) {
		height: 100%;
	}
</style>
