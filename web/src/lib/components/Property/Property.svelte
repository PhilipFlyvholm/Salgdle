<script lang="ts">
	import { formatCurrency } from '$lib/FormatUtil';
	import type { Property } from '$lib/PropertyPicker';
	import { GameStatus, gameState } from '$lib/stores/GameStore';
	import PropertyImages from './PropertyImages.svelte';
	import PropertyInfo from './PropertyInfo.svelte';
	export let property: Property | undefined;

	$: data = property || {
		boligtype: '',
		postnr: '',
		postnrby: '',
		images: [] as string[],
		imageUrl: undefined,
		rooms: 0,
		byggeaar: 0,
		liggetid: 0,
		ejerUdgift: 0,
		energimaerke: '',
		boligm2: 0,
		grundm2: 0,
		mdlUdgift: { type: 'Ejerudgift', value: 0 }
	};

	$: allImages =
		data.imageUrl && !data.images.includes(data.imageUrl)
			? data.images.concat(data.imageUrl)
			: data.images;

	$: nrOfGuesses = $gameState.status !== GameStatus.Loading ? $gameState.guesses?.length : 0;
</script>

<div class="flex items-center mx-2 {$$props.class}">
	<div class="card my-0 flex flex-col md:flex-row overflow-hidden h-[inherit]">
		<!---<img src={data.images[0] || data.imageUrl} alt="" class="" />-->
		{#if allImages && allImages.length > 0}
			<PropertyImages images={allImages} class="flex-1 grid grid-cols-1 grid-rows-2 gap-0 m-auto" />
		{/if}
		<div class="grid grid-cols-3 md:grid-cols-1 gap-1 p-2 md:p-3">
			<PropertyInfo title="Lokation" show={property !== undefined}
				>{data.postnr} {data.postnrby}</PropertyInfo
			>
			<PropertyInfo title="Type" show={property !== undefined}>{data.boligtype}</PropertyInfo>
			<PropertyInfo title="Bolig/Grund" unknownText="???m2 / ???m2" show={nrOfGuesses > 0}>
				{data.boligm2}m<sup>2</sup> / {data.grundm2}m<sup>2</sup>
			</PropertyInfo>
			<PropertyInfo title="Årstal" unknownText="????" show={nrOfGuesses > 1}
				>{data.byggeaar}</PropertyInfo
			>
			<PropertyInfo title={data.mdlUdgift.type} unknownText="???? kr." show={nrOfGuesses > 2}
				>{formatCurrency(data.mdlUdgift.value)}</PropertyInfo
			>
			<PropertyInfo title="Liggetid" unknownText="?? dage" show={nrOfGuesses > 3}
				>{data.liggetid} {data.liggetid == 1 ? 'dag' : 'dage'}</PropertyInfo
			>
		</div>
	</div>
</div>
