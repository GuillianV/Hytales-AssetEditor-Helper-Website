<script lang="ts">
	import Contact from '$lib/components/Contact.svelte';

	let { data } = $props();
	const { parametres, contactTypes } = data;
	const { PUBLIC_RECAPCHA_SITEKEY } = parametres;
</script>

<div class="bg-neutral-100 p-8">
	<div class="h-64 w-full relative">
		<img
			src="/images/hytale-bg-2.webp"
			class="h-full rounded-3xl w-full bg-conver object-cover"
			alt="bg"
		/>
		<h1
			class="absolute text-center left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 sm:text-7xl text-xl font-bold text-white"
		>
			Contact me
		</h1>
	</div>

	<div class="border-2  text-neutral-900 border-neutral-900 rounded-3xl p-8 mt-8">
		<Contact {PUBLIC_RECAPCHA_SITEKEY} {contactTypes} />
	</div>
</div>
