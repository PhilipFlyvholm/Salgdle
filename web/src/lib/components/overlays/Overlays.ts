import type { ModalComponent, ModalSettings } from '@skeletonlabs/skeleton';
import Tutorial from '$lib/components/overlays/Tutorial.svelte';
import Statistics from './Statistics.svelte';
import { tutorialSeen } from '$lib/stores/ViewStore';

export const modalRegistry: Record<string, ModalComponent> = {
	// Set a unique modal ID, then pass the component reference
	tutorial: { ref: Tutorial },
    stats: { ref: Statistics }
	// ...
};

export const modalSettings:Record<string, ModalSettings> = {
	tutorial: {
		type: 'component',
		component: 'tutorial',
        response: () => {
			tutorialSeen.set('true');
		}
	},
    stats:
    {
        type: 'component',
        component: 'stats'
    }
};
