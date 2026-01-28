import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async ({ fetch }) => {

	const assets = await fetch(`https://hae.guillian.net/game/server/assets`)
		.then((res) => res.json())
		.catch((err) => {
			return null;
		});

	if (assets == null || assets.error) {
		error(404, assets?.error ?? 'Not found');
	}

	return {
		assets
	};
};
