<script lang="ts">
	import { onMount } from 'svelte';

	export let amount = 3;

	onMount(() => {
		const interval = setInterval(() => {
			amount = amount === 3 ? 0 : amount + 1;
		}, 500);
		return () => clearInterval(interval);
	});
</script>

{#each Array(3) as _, i}
    <span class="transition-opacity" class:opacity-0={i >= amount}>.</span>
{/each}
