import { flags } from '$lib/Flags';
import type { PageLoad } from './$types';
import type { Property } from '$lib/PropertyPicker';
export const load: PageLoad = async ({fetch}) => {
    if (!flags.loadTodaysProperty) return;
		const res = await fetch('/api/getProperty');
		const json = await res.json();
		return {
            gameId: json.id,
            property: json.property as Property | undefined
        }
}; 
