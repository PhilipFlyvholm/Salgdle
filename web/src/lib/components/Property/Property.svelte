<script lang="ts">
	import { formatCurrency } from '$lib/FormatUtil';
	import type { Property } from '$lib/PropertyPicker';
	import PropertyImages from './PropertyImages.svelte';
	import PropertyInfo from './PropertyInfo.svelte';
	export let property: Property | undefined;
	export let nrOfGuesses: number = 0;

	$: data = property || {
		boligtype: '',
		postnr: '',
		postnrby: '',
		images: [] as string[],
		imageUrl: 'https://via.placeholder.com/150',
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
</script>

<div class="relative h-full w-full">
	<div class="card max-h-full max-w-full m-0 flex flex-col md:flex-row overflow-hidden">
		<!---<img src={data.images[0] || data.imageUrl} alt="" class="" />-->
		<PropertyImages images={allImages} class="flex justify-center items-center" />
		<div class="grid grid-cols-3 md:grid-cols-1 gap-1 p-2 md:p-3 md:flex-none">
			<PropertyInfo title="Lokation" show={property !== undefined}
				>{data.postnr} {data.postnrby}</PropertyInfo
			>
			<PropertyInfo title="Type" show={property !== undefined}>{data.boligtype}</PropertyInfo>
			<PropertyInfo title="Bolig/Grund" unknownText="???m2 / ???m2" show={nrOfGuesses > 0}>
				{data.boligm2}m<sup>2</sup> / {data.grundm2}m<sup>2</sup>
			</PropertyInfo>
			<PropertyInfo title="Liggetid" unknownText="?? dage" show={nrOfGuesses > 1}
				>{data.liggetid} {data.liggetid == 1 ? 'dag' : 'dage'}</PropertyInfo
			>
			<PropertyInfo title="Årstal" unknownText="????" show={nrOfGuesses > 2}
				>{data.byggeaar}</PropertyInfo
			>
			<PropertyInfo title={data.mdlUdgift.type} unknownText="???? kr." show={nrOfGuesses > 3}
				>{formatCurrency(data.mdlUdgift.value)}</PropertyInfo
			>
		</div>
	</div>
</div>
