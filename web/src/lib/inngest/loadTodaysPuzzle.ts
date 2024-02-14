import { formatDate, getCurrentDate } from '$lib/FormatUtil';
import { findProperty } from '$lib/PropertyPicker';
import { inngest } from './client';
import PocketBase from 'pocketbase';
import { PB_ADMIN, PB_PASS, PB_URL } from '$env/static/private';

export default inngest.createFunction(
	{
		id: 'load-todays-puzzle',
		rateLimit: {
			limit: 1,
			period: '5m'
		}
	},
	{ event: 'app/load-todays-puzzle' },
	async ({ step }) => {
		const property = await step.run('fetching-boliga', async () => {
			console.log('Running load-todays-puzzle');

			// This function will run every day at 0am Paris time
			const property = await findProperty();
			if (property == null) {
				throw new Error('No property found');
			}
			console.log('Found property', property);

			return property;
		});

		return await step.run('updating-database', async () => {
			console.log('Updating database with', property);
			const pb = new PocketBase(PB_URL);
			await pb.admins.authWithPassword(PB_ADMIN, PB_PASS);

			const data = {
				date: formatDate(getCurrentDate()),
				property: property
			};

			const record = await pb.collection('property').create(data);
			return { success: true, record };
		});
	}
);
