<script lang="ts">
	import { DeleteIcon } from "svelte-feather-icons";

    export let value: number = 0;
    export let onSubmit: (value: number) => void = () => {};

    function addNumber(number: number) {
        const stringValue = String(value);
        if (stringValue.length >= 9) {
            return;
        }
        
        value = Number(String(value) + "" + number);

    }

    function deleteNumber() {
        value = Number(String(value).substring(0, String(value).length-1));
    }

	function handleKeydown(event: KeyboardEvent) {
        const key = event.key;
        if(event.ctrlKey || event.metaKey) return;
        if (key === "Backspace") {
            event.preventDefault();
            deleteNumber();
        } else if (key === "Enter") {
            event.preventDefault();
            onSubmit(value)
        } else if (Number.isInteger(Number(key))) {
            event.preventDefault();
            addNumber(Number(key));
        }
	}
</script>
<svelte:window on:keydown={handleKeydown} ></svelte:window>
<input type="number" class="sr-only" aria-label="Number input" bind:value={value} />
<div class="grid grid-cols-3 grid-rows-4 mx-2 card p-2 w-full" aria-hidden="true" aria-label="Number input window">
    {#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as number}
        <button class="btn variant-glass" on:click|preventDefault={() => addNumber(number)}>{number}</button>
    {/each}
    <button class="btn variant-glass" on:click|preventDefault={deleteNumber}><DeleteIcon /></button>
    <button class="btn variant-glass" on:click|preventDefault={() => addNumber(0)}>0</button>
    
    <button class="btn variant-filled-primary" on:click|preventDefault={() => onSubmit(value)}>Submit</button>
</div>

