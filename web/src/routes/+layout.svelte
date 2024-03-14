<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { modalRegistry } from '$lib/components/overlays/Overlays';
	import '../app.postcss';
	import { AppShell, Drawer, Modal, getDrawerStore, initializeStores } from '@skeletonlabs/skeleton';
	import { ShareDrawer, isShareDrawer } from 'skeleton-share';
	import { EmailProvider, FacebookProvider, LinkedInProvider, WhatsAppProvider, XProvider, type ShareProvider } from 'skeleton-share/providers'
	
	initializeStores();
	
	const drawerStore = getDrawerStore();
	let drawer:Drawer;
	
	const shareProviders: ShareProvider[] = [EmailProvider, FacebookProvider, XProvider, WhatsAppProvider, LinkedInProvider];
	
</script>
<Modal components={modalRegistry} zIndex="z-30"/>
<Drawer bind:this={drawer}>
	{#if isShareDrawer(drawerStore)}
		<ShareDrawer {drawer} {shareProviders}
		/>
	{:else}
		<!-- Fallback Error -->
		<div class="flex h-full w-full items-center justify-center">
			<div class="space-y-2 text-center">
				<p>Hmm... det var vist en fejl jeg viste dig dette?</p>
				<button class="btn-primary btn" on:click={() => drawerStore.close()}>Close</button>
			</div>
		</div>
	{/if}
</Drawer>
<AppShell>
	<svelte:fragment slot="header">
		<Header />
	</svelte:fragment>
	<slot />
</AppShell>
