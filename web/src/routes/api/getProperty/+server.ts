import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { findProperty } from '$lib/PropertyPicker';
import { flags } from '$lib/Flags';
import PocketBase from 'pocketbase';
import { PB_URL } from '$env/static/private';
import { formatDate, getCurrentDate } from '$lib/FormatUtil';

export const GET: RequestHandler = async () => {
	let property;
	if (flags.overrideDBProperty) {
		property = await findProperty();
	} else {
		const pb = new PocketBase(PB_URL);
		console.log(formatDate(getCurrentDate()));

		try {
			const res = await pb
				.collection('property')
				.getFirstListItem(`date="${formatDate(getCurrentDate())} 00:00:00.000Z"`);
            property = res.property;
		} catch (e) {
			console.error(e);
		}
	}
	if (!property) {
		return error(404, 'Property not found');
	}
	console.log(property);

	return new Response(JSON.stringify(property));
};
