import { prisma } from '$lib/server/prisma';
import type { Contact } from '@prisma/client';
import { action_delete } from '../../actions.js';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	const { params } = event;
	const { id = '' } = params;

	const contact: FullContact | null = await prisma.contact.findUnique({
		where: {
			id
		},
		include: {
			type: true
		}
	});

	if (contact == null) {
		redirect(301, '/admin/contacts');
	}

	return {
		backlink: '/admin/contacts',
		active: 'contacts',
		contact: contact as FullContact
	};
};

export const actions: Actions = {
	delete: action_delete
};
