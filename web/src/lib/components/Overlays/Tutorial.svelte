<script lang="ts">
	import { tutorialSeen } from '$lib/stores/ViewStore';
	import Spacer from '../Spacer.svelte';
	import Guess from '../guess/Guess.svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();
	function close() {
		$tutorialSeen = 'true';
		modalStore.close();
	}
</script>

{#if $modalStore[0]}
	<div
		class="card py-2 px-5 rounded w-[90%] sm:w-[50%] flex flex-col z-50 max-h-[90vh] overflow-auto"
	>
		<div class="flex justify-between items-center mt-1">
			<h2 class="font-bold h2 m-0">Sådan spiller du Salgdle</h2>
			<button class="px-3 py-1 text-2xl" on:click={close}><small>X</small></button>
		</div>
		<h3 class="h4 m-0 mb-1">Gæt prisen på dagens ejendom på 5 forsøg eller mindre</h3>

		<div class="my-1">
			<ul class="list list-disc">
				<li class="leading-4 align-middle">
					<span class="w-[.3rem] h-[.3rem] bg-surface-900-50-token block rounded-full mr-1"></span>
					Efter hvert gæt kommer der mere infomation om ejendommen
				</li>
				<li class="leading-4 align-middle">
					<span class="w-[.3rem] h-[.3rem] bg-surface-900-50-token block rounded-full mr-1"></span>
					<span class="!ml-0">Retningen på pilen viser retningen til den rigtige udbudspris</span>
					<span class="arrow !ml-1">➡️</span>
				</li>
				<li class="leading-4">
					<span class="w-[.3rem] h-[.3rem] bg-surface-900-50-token block rounded-full mr-1"></span>
					<span class="align-middle !m-0"
						>Cirklernes farve viser om placeringen er <span class="box correct">korrekt</span>,
						<span class="box partial">delvist korrekt</span>
						eller <span class="box absent">forkert</span></span
					>
				</li>
			</ul>
		</div>
		<Spacer height={'.15rem'} />
		<h3 class="h3 font-bold text-center">Lad os tage et eksempel</h3>

		<div class="grid grid-cols-12 grid-rows-1 gap-4 my-5 w-[90%] m-auto">
			<Guess guess={{ type: 'guess', guess: { value: 1950000 } }} overriddenActual={2345000} />
		</div>
		<ul class="list list-disc w-[80%] m-auto">
			<li>
				<span class="w-[.3rem] h-[.3rem] bg-surface-900-50-token block rounded-full mr-1"></span>
				Prisen er højere end 1.250.000 kr.
			</li>

			<li>
				<span class="w-[.3rem] h-[.3rem] bg-surface-900-50-token block rounded-full mr-1"></span>
				Prisen slutter med tre 0’er
			</li>
			<li>
				<span class="w-[.3rem] h-[.3rem] bg-surface-900-50-token block rounded-full mr-1"></span>
				Der er et 5 tal i prisen, men den er placeret forkert
			</li>
		</ul>
		<Spacer height={'.15rem'} />
		<button class="btn variant-filled-primary my-2" on:click={close}>Play!</button>
	</div>
{/if}

<style>
	.box::before {
		content: '';
		display: inline-block;
		width: 0.7rem;
		height: 0.7rem;
		border-radius: 1rem;
		background-color: #d21b1b;
		animation: colorSwitch 5s infinite;
		animation-direction: alternate;
		margin-right: 0.3rem;
		vertical-align: middle;
		transform: translateY(-0.1rem);
	}
	.box.correct::before {
		background-color: #10b981;
	}
	.box.partial::before {
		background-color: rgb(16, 126, 185);
	}
	.box.absent::before {
		background-color: #d21b1b;
	}

	.arrow {
		animation: rotateArrow 5s infinite;
		animation-direction: alternate;
		animation-timing-function: ease-in-out;
		transform-origin: center center;
		line-height: 1rem;
		font-size: 0.7rem;
		width: 1rem;
	}

	@keyframes rotateArrow {
		0% {
			transform: rotate(-45deg);
		}
		100% {
			transform: rotate(45deg);
		}
	}
</style>
