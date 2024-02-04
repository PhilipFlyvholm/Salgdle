<script lang="ts">
	import { flags } from '$lib/Flags';
	import type { Property as PropertyType } from '$lib/PropertyPicker';
	import NumberInput from '$lib/components/NumberInput.svelte';
	import Property from '$lib/components/Property/Property.svelte';
	import { onMount } from 'svelte';
	import type { Guess as GuessType } from '$lib/GuessTypes';
	import GuessContainer from '$lib/components/Guess/GuessContainer.svelte';
	let property: PropertyType | undefined = undefined;
	onMount(async () => {
		if (!flags.loadTodaysProperty) return;
		const res = await fetch('/api/getProperty');
		const json = await res.json();
		property = json;
	});

	let currentGuess = 0;
	let nrOfGuesses = 0;
	const guesses: (GuessType | undefined)[] = [undefined, undefined, undefined, undefined, undefined];
	function onSubmit(value: number) {
		if (property === undefined) return;
		if (nrOfGuesses >= 5) return;
		if (value === 0) return;
		const correct = value === property.udbudspris;
		guesses[nrOfGuesses] = { value, correct: correct, actual: property.udbudspris};
		nrOfGuesses++;
		currentGuess = 0;
	}
</script>

<div
	class="container lg:max-w-[50%] mx-auto p-1 flex flex-col items-center justify-between min-h-[100vh]"
>
	<div class="w-full md:w-[80%]">
		<Property {property} {nrOfGuesses} />
		<GuessContainer {guesses} {nrOfGuesses} {currentGuess} />
	</div>
	<NumberInput bind:value={currentGuess} {onSubmit} />
</div>
