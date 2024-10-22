import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { findProperty, type Property } from '$lib/PropertyPicker';
import { flags } from '$lib/Flags';
import PocketBase, { ClientResponseError } from 'pocketbase';
import { PB_URL } from '$env/static/private';
import { formatDate, getCurrentDate } from '$lib/FormatUtil';
import { inngest } from '$lib/inngest';

const maxTries = 5;
async function getTodaysProperty(tries: number = 0): Promise<{id: string, property: Property} | undefined>{
	const pb = new PocketBase(PB_URL);
	return pb.collection('property')
		.getFirstListItem(`date="${formatDate(getCurrentDate())} 00:00:00.000Z"`)
		.then((res) => {
			return {id: res.id, property: (res.property as Property)};
		})
		.catch(async (err) => {
			if (err instanceof ClientResponseError) {
				if(err.status === 404) {
					console.warn('Property not found');
					await inngest.send({ name: 'app/load-todays-puzzle' });
					if (tries < maxTries) {
						console.warn('Retrying');
						return getTodaysProperty(tries + 1);
					}
					console.error('Max tries reached');
					return error(500, 'Error getting property');
				}
				console.error(err);
				return error(500, 'Error getting property');
			}
		});
}

export const GET: RequestHandler = async () => {
	let result: {id: string, property: Property} | undefined;
	if (flags.overrideDBProperty) {
		const property = await findProperty();
		if (property) {
			result = {id: new Date().toISOString(), property};
		}
	} else {
		result = await getTodaysProperty();
	}
	if (!result) {
		return error(404, 'Property not found');
	}
	return new Response(JSON.stringify(result));
};
