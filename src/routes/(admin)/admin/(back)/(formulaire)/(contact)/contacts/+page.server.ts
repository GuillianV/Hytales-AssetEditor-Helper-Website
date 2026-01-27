import { action_delete } from '../actions';
import { prisma } from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const contacts: FullContact[] = await prisma.contact.findMany({
		include: {
			type: true
		}
	});

	return {
		backlink: '/admin/home',
		active: 'contacts',
		contacts
	};
};

export const actions: Actions = {
	delete: action_delete
};
