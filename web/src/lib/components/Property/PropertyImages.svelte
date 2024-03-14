<script lang="ts">
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';
	import { onMount } from 'svelte';

	export let images: string[] = [];
	let main: Splide;
	let thumbs: SplideSlide;

	const mainOptions = {
		type: 'loop',
		perPage: 1,
		perMove: 1,
		gap: '1rem',
		pagination: false
	};

	const thumbsOptions = {
		type: 'slide',
		rewind: true,
		gap: '.2rem',
		pagination: false,
		fixedWidth: 80,
		fixedHeight: 60,
		cover: true,
		focus: 'center' as const,
		isNavigation: true,
		updateOnMove: true
	};

	onMount(() => {
		if (main && thumbs) {
			main.sync(thumbs.splide);
		}
	});
</script>

<!-- <Splide
	options={{ rewind: true, type: 'fade' }}
	class={$$props.class}
	aria-label="Ejendomsbilleder"
>
	{#each images as image, i}
		<SplideSlide>
			<img src={image} alt="Billede {i}" class="w-full md:h-full md:w-auto m-auto" />
		</SplideSlide>
	{/each}
</Splide> -->
<div class={'wrapper ' + $$props.class}>
	<Splide options={mainOptions} bind:this={main} aria-label="Ejendomsbilleder" class="overflow-hidden col-span-1 row-span-2 flex items-center">
		{#each images as image, i}
			<SplideSlide class="h-full w-auto flex justify-center items-center">
				<img src={image} alt="Billede {i}" class="max-w-full h-full max-h-[300px]"/>
			</SplideSlide>
		{/each}
	</Splide>

	<Splide options={thumbsOptions} bind:this={thumbs} class="col-span-1 row-span-1 hidden sm:block">
		{#each images as image, i}
			<SplideSlide>
				<img src={image} alt="Billede {i}" />
			</SplideSlide>
		{/each}
	</Splide>
</div>

<style>
	.wrapper :global(.splide__slide){
		margin: auto;
	}
</style>