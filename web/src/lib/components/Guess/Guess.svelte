<script lang="ts">
	import { formatCurrency } from '$lib/FormatUtil';
	import type { Guess } from '$lib/GuessTypes';
	import { getBoxes } from '$lib/GuessUtil';
	import { currentPropertyInfo } from '$lib/stores/GameStore';

	export let guess: { type: 'guess'; guess: Guess } | { type: 'input'; value: number } | undefined =
		undefined;
	export let overriddenActual: number | undefined = undefined;
	let formattedGuess: string = '';

	$: {
		if (guess === undefined) {
			formattedGuess = '';
		} else if (guess.type === 'guess') {
			formattedGuess = formatCurrency(guess.guess.value);
		} else {
			formattedGuess = formatCurrency(guess.value);
		}
	}

	function calculateRotation(correctPrice: number, userAnswer: number): number {
		const angleRange = 90; // The range of rotation, from -90 to 90 degrees
		const maxDifference = 1_000_000; // Maximum allowed difference for 0 degrees rotation

		// Calculate the difference between correct price and user answer
		const priceDifference = userAnswer - correctPrice;

		// Calculate the rotation angle
		let rotationAngle = (priceDifference / maxDifference) * angleRange;

		// Ensure the angle is within the valid range (-90 to 90 degrees)
		rotationAngle = Math.max(-angleRange, Math.min(angleRange, rotationAngle));

		return rotationAngle;
	}

	$: bgClass = guess == undefined ? 'variant-soft-surface' : '';
	$: actual =
		overriddenActual !== undefined
			? overriddenActual
			: guess !== undefined && guess.type === 'guess' && $currentPropertyInfo !== undefined
				? $currentPropertyInfo.udbudspris
				: 0;
	$: correct = guess !== undefined && guess.type === 'guess' && guess.guess.value === actual;
</script>

<div
	class="text-center card py-1 flex justify-center items-baseline text-sm {bgClass}"
	style={`grid-column: span ${guess !== undefined && guess.type === 'guess' ? 5 : 12} / span ${guess !== undefined && guess.type === 'guess' ? 5 : 12};`}
>
	{#if guess !== undefined}
		{#if guess.type === 'guess'}
			{@const guessValue = guess.guess.value.toString()}
			{@const boxes = getBoxes(actual, guess.guess.value)}
			{#each guessValue.split('') as digit, i}
				<span>{digit}</span>

				{#if i === guessValue.length - 1}
					<span class="text-xs">kr.</span>
				{:else if (guessValue.length - i - 1) % 3 === 0}
					<span class="text-xs">.</span>
				{/if}
			{/each}
		{:else if guess.type === 'input'}
			<span >{formattedGuess}</span>
		{/if}
	{:else}
		<span>{formattedGuess}</span>
	{/if}
</div>
{#if guess !== undefined && guess.type === 'guess'}
	{@const boxes = getBoxes(actual, guess.guess.value)}
	<p class="text-center card col-span-2 flex justify-center items-center">
		<span
			class="block transition-all duration-300 ease-in-out"
			style={correct
				? '--arrow-rotate: 0deg;'
				: `--arrow-rotate: ${calculateRotation(actual, guess.guess.value)}deg;`}
		>
			{correct ? '✅' : '➡️'}
		</span>
	</p>
	<div class="text-center card col-span-5 flex justify-center items-center">
		{#each boxes as box, i}
			<div class={`box ${box}`} style:animation-delay={i * 100 + 'ms'}></div>
			{#if (boxes.length - 1 - i) % 3 === 0 && i !== boxes.length - 1}
				<div class="w-1"></div>
			{/if}
		{/each}
	</div>
{/if}

<style>
	.guessedDigit::after {
		content: '';
		width: 0.8rem;
		height: 0.15rem;
		background-color: black;
		border-radius: 1rem;
		margin: 0 0.1rem;
		display: block;
	}
	.guessedDigit.absent::after {
		background-color: #d21b1b;
	}
	.guessedDigit.present::after {
		background-color: rgb(16, 126, 185);
	}
	.guessedDigit.correct::after {
		background-color: #10b981;
	}

	.box {
		height: 50%;
		aspect-ratio: 1;
		margin: 0 0.1rem;
		border-radius: 10rem;
		animation: scale-in 0.5s;
		animation-fill-mode: forwards;
		scale: 0;
	}
	.box.absent {
		background-color: #d21b1b;
	}
	.box.present {
		background-color: rgb(16, 126, 185);
	}
	.box.correct {
		background-color: #10b981;
	}

	.block {
		animation:
			rotate-in 1s,
			scale-in 0.5s;
		animation-fill-mode: forwards;
		animation-timing-function: ease-out;
	}

	@keyframes rotate-in {
		0% {
			rotate: 0;
		}
		100% {
			rotate: var(--arrow-rotate);
		}
	}

	@keyframes scale-in {
		0% {
			scale: 0;
		}
		100% {
			scale: 1;
		}
	}
</style>
