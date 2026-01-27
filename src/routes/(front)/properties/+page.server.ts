import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async ({ fetch }) => {

	const properties = await fetch(`https://hae.guillian.net/properties/`)
		.then((res) => res.json())
		.catch((err) => {
			return null;
		});

	if (properties == null || properties.error) {
		error(404, properties?.error ?? 'Not found');
	}

	return {
		properties
	};
};
