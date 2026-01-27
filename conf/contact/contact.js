import dotenv from 'dotenv';
import ContactJson from './contact.config.json' with { type: 'json' };
import { logger } from '../../modules/server/logs/index.js';
import { prisma } from '../../modules/server/database/index.js';
dotenv.config();

/**
 *
 *
 * @description Initialisation des types de contact
 * @example initialize()
 * @returns {void}
 */

export function initialize() {
	try {
		console.log('Initialisation des types de contact');
		logger.debug('Initialisation des types de contact');

		ContactJson.forEach(async (_contactType) => {
			const { key } = _contactType;

			const contactTypeFound = await get(key);

			if (contactTypeFound != null) {
				logger.debug(`ContactType ${contactTypeFound.key} deja existant, skipped`);
				return;
			}

			const contactTypeCree = await create(key, key);

			if (contactTypeCree == null) {
				throw new Error(`Erreur lors de la création du contactType ${key}`);
			}

			logger.debug(`ContactType ${contactTypeCree.key} cree avec succes`);
		});
	} catch (error) {
		if (error instanceof Error) logger.error(`${error.message}`);
		else logger.error(`${error}`);
		process.exit(1);
	}
}

/**
 * @param {string} KEY
 * @param {string} LABEL
 *
 * @example create('KEY','label description')
 * @returns {Promise<{ key: string; label: string;  } | null>}
 */

export async function create(KEY, LABEL) {
	try {
		let data = null;

		if (!KEY) {
			throw new Error('ContactType KEY manquant');
		}

		if (!LABEL) {
			throw new Error('ContactType LABEL manquant');
		}

		data = await prisma.contactType.create({
			data: {
				id: KEY,
				type: LABEL
			}
		});

		return data;
	} catch (error) {
		if (error instanceof Error) logger.error(`${error.message}`);
		else logger.error(`${error}`);
		return null;
	}
}

/**
 * @param {string} KEY
 *
 * @example get('KEY')
 * @returns {Promise<{ key: string; label: string; order:number; value: string | null } | null>}
 */

export async function get(KEY) {
	try {
		let data = null;
		if (!KEY) {
			throw new Error('ContactType KEY manquant');
		}

		data = await prisma.contactType.findUnique({
			where: {
				id: KEY
			}
		});
		return data;
	} catch (error) {
		if (error instanceof Error) logger.error(`${error.message}`);
		else logger.error(`${error}`);
		return null;
	}
}
