<script lang="ts">
	import { tutorialSeen } from '$lib/stores/ViewStore';

	function close() {
		$tutorialSeen = 'true';
	}
</script>

<div
	class="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] card py-2 px-5 rounded w-[90%] sm:w-[50%] flex flex-col z-50 max-h-[90vh] overflow-auto"
>
	<div class="flex justify-between items-center mt-1">
		<h2 class="vt323 h1 m-0">Sådan spiller du Salgdle</h2>
		<button class="px-3 py-1 variant-ghost-surface rounded-full font-bold" on:click={close}
			><small>X</small></button
		>
	</div>
	<h3 class="h4 m-0 mb-1">Gæt prisen på dagens ejendom på 5 forsøg eller mindre</h3>

	<div class="my-1">
		<ul class="list list-disc">
			<li class="leading-4 align-middle">
				<span class="w-[.3rem] h-[.3rem] bg-surface-800-100-token block rounded-full mr-1"></span>
				Efter hvert gæt kommer der mere infomation om ejendommen
			</li>
			<li class="leading-4 align-middle">
				<span class="arrow !ml-0">➡️</span>
				<span>Retningen på pilen viser retningen til den rigtige udbudspris</span>
			</li>
			<li class="leading-4 align-middle">
				<div class="box !ml-0"></div>
				<span>Farven på cirklens baggrund viser om placeringen er korrekt, delvist korrekt eller forkert</span>
			</li>
		</ul>
	</div>
	<div class="flex flex-col">
		<div class="flex items-center">
			<img
				src="/how-to/cube.png"
				class="w-[50%] p-3 max-w-[121px]"
				alt="A 3x3x3 cube with a handfull of cubes revealed showing the either 1 or 2 depending on the amount of adjacent mines"
			/>

			<div class="flex-1 flex justify-around flex-col">
				<p class="mb-1">Revealed cubes show the adjacent mine count.</p>
				<p>The number defines how many adjacent mines there are in 3d.</p>
			</div>
		</div>
		<div class="flex items-center">
			<img
				src="/how-to/cube-flagged.png"
				class="w-[50%] p-3 max-w-[121px]"
				alt="A 3x3x3 cube with a suspected mine flagged"
			/>

			<div class="flex flex-1 justify-around flex-col">
				<p class="mb-1">Empty blocks have no adjacent mines.</p>
				<p>Suspected mines can be marked by flagging.</p>
			</div>
		</div>
	</div>
	<button class="btn variant-filled-primary my-2" on:click={close}>Play!</button>
</div>

<style>
	.box {
		width: 1rem;
		height: 1rem;
		line-height: 1rem;
		border-radius: 1rem;
		background-color: #d21b1b;
		animation: colorSwitch 5s infinite;
		animation-direction: alternate;
	}

	@keyframes colorSwitch {
		5% {
			background-color: #d21b1b;
		}
		20% {
			background-color: rgb(16, 126, 185);
		}
		30% {
			background-color: rgb(16, 126, 185);
		}
		45% {
			background-color: #10b981;
		}
		55% {
			background-color: #10b981;
		}
		
		70% {
			background-color: rgb(16, 126, 185);
		}
		80% {
			background-color: rgb(16, 126, 185);
		}

		90%{
			background-color: #d21b1b;
		}
	}

	.arrow {
		animation: rotateArrow 5s infinite;
		animation-direction: alternate;
		animation-timing-function: ease-in-out;
		transform-origin: center;
		line-height: 1rem;
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
