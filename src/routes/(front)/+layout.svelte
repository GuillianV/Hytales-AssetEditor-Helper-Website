<script lang="ts">
	import './app.pcss';

	let { data, children } = $props();
	const { parametres } = data;
	const { PUBLIC_HEAD_TAG_MANAGER, PUBLIC_BODY_TAG_MANAGER } = parametres;
</script>

<svelte:head>
	<title>Hytales Asset Editor Helper</title>
	<meta name="description" content="Hytales Asset Editor Helper" />
	<meta name="keywords" content="Hytales Asset Editor Helper" />
	<meta name="author" content="Guillian" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="icon" href="/favicon.ico" />

	{#if PUBLIC_HEAD_TAG_MANAGER && PUBLIC_HEAD_TAG_MANAGER.value != null && PUBLIC_HEAD_TAG_MANAGER.value.length > 0}
		{@html PUBLIC_HEAD_TAG_MANAGER.value}
	{/if}
</svelte:head>

{#if PUBLIC_BODY_TAG_MANAGER && PUBLIC_BODY_TAG_MANAGER.value != null && PUBLIC_BODY_TAG_MANAGER.value.length > 0}
	{@html PUBLIC_BODY_TAG_MANAGER.value}
{/if}


<div class="bg-neutral-100 min-h-screen">
{@render children?.()}
</div>

