<script lang="ts">
	import type { Guess as GuessType } from '$lib/GuessTypes';
	import Guess from '$lib/components/Guess/Guess.svelte';
	export let guesses: (GuessType | undefined)[];
	export let nrOfGuesses: number;
	export let currentGuess: number;
</script>

<div class="grid grid-cols-12 grid-rows-5 gap-4 my-5 w-full">
	{#each guesses as guess, i}
			{#if guess}
				<Guess guess={{ type: 'guess', guess: guess }}/>
			{:else if i === nrOfGuesses}
				<Guess guess={{ type: 'input', value: currentGuess }}/>
			{:else}
				<Guess />
			{/if}
	{/each}
</div>
