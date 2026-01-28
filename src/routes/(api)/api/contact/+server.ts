import type { RequestHandler } from './$types';
import { IsEmptyString } from '$lib/client/utils/type';
import { prisma } from '$lib/server/prisma';
import { getParametre } from '$lib/server/parametres/parametres';
import { logger } from '$lib/server/logs';
import Mailer from '$lib/server/mail';

export const POST: RequestHandler = async ({ request }): Promise<Response> => {
	try {
		const formData = await request.formData();
		const { email, discordId, contactType, message, token } = Object.fromEntries(formData);

		const ParamReCapchaSecret = await getParametre('SECRET_RECAPCHA_SITEKEY');

		if (!ParamReCapchaSecret.success) {
			logger.error({}, 'La clé recapcha est invalide', '/api/contact');
			return new Response(
				JSON.stringify({ type: 'failure', errorMsg: 'La clé recapcha est invalide !' }),
				{ status: 400 }
			);
		}

		if (IsEmptyString(contactType)) {
			logger.warn({}, 'Le contactType ne doit pas être vide', '/api/contact');
			return new Response(
				JSON.stringify({ type: 'failure', errorMsg: 'Le contactType ne doit pas être vide' }),
				{ status: 400 }
			);
		}

		if (IsEmptyString(message)) {
			logger.warn({}, 'Le message ne doit pas être vide', '/api/contact');
			return new Response(
				JSON.stringify({ type: 'failure', errorMsg: 'Le message ne doit pas être vide' }),
				{ status: 400 }
			);
		}

		const url = `https://www.google.com/recaptcha/api/siteverify?secret=${ParamReCapchaSecret.value}&response=${token}`;

		const recapchaPostResponse = await fetch(url, { method: 'post' });
		const recacpchaResponse = await recapchaPostResponse.json();

		if (!recacpchaResponse.success) {
			logger.warn(recacpchaResponse, 'Erreur recapcha', '/api/contact');
			return new Response(JSON.stringify({ type: 'failure', errorMsg: 'Erreur recapcha' }), {
				status: 400
			});
		}

		await prisma.contact.create({
			data: {
				type: {
					connect: {
						id: contactType as string
					}
				},
				email: email as string,
				discordId: discordId as string,
				message: message as string
			}
		});

		const mailer = new Mailer();
		await mailer.init();
		mailer.sendMail(
			'guillianvibert90@gmail.com',
			'Request from hytales asset editor helper',
			`Demande de contact type : ${contactType}, message : ${message} , email : ${email} , discordId : ${discordId}`,
			`Demande de contact type : ${contactType}, message : ${message} , email : ${email} , discordId : ${discordId}`
		);

		logger.info({}, 'Formulaire de contact envoyé', '/api/contact');
		return new Response(JSON.stringify({ type: 'success', message: 'Form sent with success !' }), {
			status: 200
		});
	} catch (error) {
		logger.error(error, '/api/contact');
		return new Response(
			JSON.stringify({
				type: 'error',
				errorMsg: error instanceof Error ? error.message : 'Erreur has occured'
			}),
			{ status: 500 }
		);
	}
};
