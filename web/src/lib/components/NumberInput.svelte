<script lang="ts">
    let value: number = 0;
    $: formattedValue = new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK' }).format(value)
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
        if (key === "Backspace") {
            event.preventDefault();
            deleteNumber();
        } else if (key === "Enter") {
            event.preventDefault();
            console.log("Submit");
        } else if (Number.isInteger(Number(key))) {
            event.preventDefault();
            addNumber(Number(key));
        }
	}
</script>
<svelte:window on:keydown={handleKeydown} ></svelte:window>
<input type="number" class="sr-only" aria-label="Number input" bind:value={value} />

<div class="grid grid-cols-3 grid-rows-5" aria-hidden="true" aria-label="Number input window">
    <p class="col-span-3 text-center text-2xl my-1">{formattedValue}</p>
    {#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as number}
        <button on:click={() => addNumber(number)}>{number}</button>
    {/each}
    <button on:click={deleteNumber}>Delete</button>
    <button on:click={() => addNumber(0)}>0</button>
    
    <button>Submit</button>
</div>

