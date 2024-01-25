<script lang="ts">
	import { flags } from "$lib/Flags";
	import type { Property } from "$lib/PropertyPicker";
	import NumberInput from "$lib/components/NumberInput.svelte";
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
    const prop = writable<Property | undefined>(undefined);
	onMount(async () => {
        if(!flags.loadTodaysProperty) return;
        const res = await fetch("/api/getProperty");
        const json = await res.json();
        prop.set(json);
    });
    
</script>

{#if $prop}
    <img src={$prop.images[0]} alt="">
    <h2>{$prop.boligtype}</h2>
    <h2>{$prop.postnr} {$prop.postnrby}</h2>
{:else}
    <p>No property selected</p>
{/if}

<NumberInput />
