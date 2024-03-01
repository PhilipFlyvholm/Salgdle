<script lang="ts">
	import Guess from '$lib/components/guess/Guess.svelte';
	import { GameStatus, gameState } from '$lib/stores/GameStore';
	export let currentGuess: number;
</script>

<div class="grid grid-cols-12 grid-rows-5 gap-4 my-5 w-full">
	{#if $gameState.status !== GameStatus.Loading && $gameState.guesses !== undefined}
		{#each $gameState.guesses as guess}
			<Guess guess={{ type: 'guess', guess: guess }} />
		{/each}
		{#if $gameState.guesses.length < 5}
			{#if $gameState.status === GameStatus.InProgess}
				<Guess guess={{ type: 'input', value: currentGuess }} />
			{/if}
			{#each Array(($gameState.status === GameStatus.InProgess ? 4 : 5) - $gameState.guesses.length) as _, __}
				<Guess />
			{/each}
		{/if}
	{:else}
		{#each Array(5) as _, __}
			<Guess />
		{/each}
	{/if}
</div>
