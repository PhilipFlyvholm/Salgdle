import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { findProperty } from '$lib/PropertyPicker';
export const GET: RequestHandler = async () => {
    const property = await findProperty();
    if (!property) {
        return error(404, 'Property not found');
    }
    console.log(property);
    
	return new Response(JSON.stringify(property));
};
