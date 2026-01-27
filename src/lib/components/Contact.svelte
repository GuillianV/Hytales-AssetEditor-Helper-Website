<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { IsEmptyString } from '$lib/client/utils/type';
	import type { ParmetreReponse } from '$lib/client/utils/ambiant';
	import type { ContactType } from '@prisma/client';

	interface Props {
		PUBLIC_RECAPCHA_SITEKEY: ParmetreReponse;
		contactTypes: ContactType[];
	}

	let { PUBLIC_RECAPCHA_SITEKEY, contactTypes }: Props = $props();
	let errorMsg: string = $state('');
</script>

<svelte:head>
	<script
		src="https://www.google.com/recaptcha/api.js?render={PUBLIC_RECAPCHA_SITEKEY.value}"
	></script>
</svelte:head>

<form
	method="POST"
	action="/api/contact"
	name="contact"
	id="contact"
	use:enhance={async ({ formData, cancel }) => {
		try {
			const { contactType, message } = Object.fromEntries(formData);

			
			if (IsEmptyString(contactType) || IsEmptyString(message)) {
				cancel();
				return;
			}

			await new Promise((resolve) => {
				window.grecaptcha.ready(async () => {
					resolve(true);
				});
			});

			const token = await window.grecaptcha.execute(PUBLIC_RECAPCHA_SITEKEY.value, {
				action: 'contact'
			});
			if (IsEmptyString(token)) {
				cancel();
				return;
			}

			formData.append('token', token);
		} catch (error) {
			console.error(error);
			errorMsg = 'An error has occured while sending the form';
			cancel();
			return;
		}

		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await update();
					await applyAction(result);
					// @ts-expect-error: Should expect message
					errorMsg = result?.message;
					break;
				case 'failure':
					// @ts-expect-error: Should expect error message
					if (typeof result.errorMsg === 'string')
						// @ts-expect-error: Should expect error message
						errorMsg = result.errorMsg;
					break;
				case 'error':
					errorMsg = 'An error has occured while sending the form';
					break;
				default:
					break;
			}
		};
	}}
>
	<label class="label" for="contactType">
		<span class="ml-3 font-semibold">Type*</span><br />
		<select name="contactType" class="rounded-3xl w-full" required>
			{#each contactTypes as contactType}
				<option value={contactType.id}>{contactType.type}</option>
			{/each}
		</select>
	</label>

	<label class="label" for="email">
		<span class="ml-3 font-semibold">Email</span>
		<input
			class="input bg-white border border-gray-500"
			name="email"
			contenteditable="true"
			type="text"
		/>
	</label>

	<label class="label" for="discordId">
		<span class="ml-3 font-semibold">Discord ID</span>
		<input
			class="input bg-white border border-gray-500"
			name="discordId"
			contenteditable="true"
			type="text"
		/>
	</label>

	<label class="label" for="message">
		<span class="ml-3 font-semibold">Message*</span>
		<textarea
			class="input rounded-3xl bg-white border border-gray-500"
			name="message"
			rows="3"
			required
		></textarea>
	</label>

	<div class="error" aria-live="polite">
		{#if errorMsg && errorMsg.length > 0}
			<p>{errorMsg}</p>
		{/if}
	</div>

	<label class="label" for="envoyer">
		<button class="bg-blue-900 text-white font-bold rounded-3xl p-2 mt-8" type="submit"
			>Envoyer</button
		>
	</label>
</form>
