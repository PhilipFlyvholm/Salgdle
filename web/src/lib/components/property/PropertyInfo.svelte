<script lang="ts">
	export let show: boolean = false;
	export let title: string = '';
	export let unknownText: string = '?';
</script>

<div class="flex flex-col mb-1">
	<small>{title}</small>
	<h2 class="transition-all duration-100" class:blur-sm={!show}>
		{#if show}
			<slot />
		{:else}
			{unknownText}
		{/if}
	</h2>
</div>
