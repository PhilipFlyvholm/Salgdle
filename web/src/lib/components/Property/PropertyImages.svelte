<script lang="ts">
    import { Splide, SplideSlide } from '@splidejs/svelte-splide';
    import '@splidejs/svelte-splide/css';

	export let images: string[] = [];
</script>

<Splide options={{ rewind: true }} aria-label="Ejendomsbilleder">
    {#each images as image, i}
        <SplideSlide>
            <img src={image} alt="Billede {i}" class="aspect-video w-full"/>
        </SplideSlide>
    {/each}
</Splide>
