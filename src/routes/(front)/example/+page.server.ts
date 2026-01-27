import type { PageServerLoad } from './$types';
import { getParametre } from '$lib/server/parametres/parametres';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch, url }) => {
	let fullpath = url.searchParams.get('fullpath');
	if (fullpath == null) {
		error(404, 'Not found');
	}
	const example = await fetch(`https://hae.guillian.net/game/server/asset?fullpath=${fullpath}`)
		.then((res) => res.json())
		.catch((err) => {
			return null;
		});

	if (example == null || example.error) {
		error(404, example?.error ?? 'Not found');
	}

	const paths = fullpath.split('/');
	const filename = paths.pop();

	return {
		example,
		fullpath,
		paths,
		filename
	};
};
