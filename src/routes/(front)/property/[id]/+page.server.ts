import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async ({ fetch, params }) => {
	const id = params.id;
	const property = await fetch(`https://hae.guillian.net/property/${id}.json`)
		.then((res) => res.json())
		.catch((err) => {
			return null;
		});

	if (property == null || property.error) {
		error(404, property?.error ?? 'Not found');
	}

	return {
		property,
		id 
	};
};
