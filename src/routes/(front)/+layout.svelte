<script lang="ts">
	import './app.pcss';

	let { data, children } = $props();
	const { parametres } = data;
	const { PUBLIC_HEAD_TAG_MANAGER, PUBLIC_BODY_TAG_MANAGER } = parametres;
</script>

<svelte:head>
	<title>Hytale Asset Editor Helper</title>
	<meta name="description" content="Hytale Asset Editor Helper" />
	<meta name="keywords" content="Hytale Asset Editor Helper" />
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
	<nav
		class="z-20 w-full bg-slate-50 shadow-md border fixed top-0 border-slate-200 p-4 pr-8 pl-8 flex justify-around items-center"
	>
		<ul class="flex sm:flex-row flex-col w-full">
			<a href="/"
				><li
					class="p-2 pr-4 pl-4 rounded-3xl h-fit border border-slate-300 bg-slate-100 mb-4 sm:mb-0"
				>
					Home
				</li></a
			>
			<a href="/properties"
				><li
					class="p-2 pr-4 pl-4 rounded-3xl h-fit border border-slate-300 bg-slate-100 sm:ml-4 mb-4 sm:mb-0"
				>
					Properties
				</li></a
			>
			<a href="/sources"
				><li
					class="p-2 pr-4 pl-4 rounded-3xl h-fit border border-slate-300 bg-slate-100 sm:ml-4 mb-4 sm:mb-0"
				>
					Source assets
				</li></a
			>
			<a href="/contact"
				><li class="p-2 pr-4 pl-4 rounded-3xl h-fit border border-slate-300 bg-slate-100 sm:ml-4">
					Contact
				</li></a
			>
		</ul>
		<img src="/images/Hytale_logo.png" alt="bg" class="md:block hidden w-auto h-10" />
	</nav>
	<div class="mt-[76px]">
		{@render children?.()}
	</div>

	<footer>
		<div
			class="w-full bg-slate-50 border border-slate-200 p-4 pr-8 pl-8 flex flex-col justify-around items-center"
		>
			<div class="flex flex-row justify-center w-full">
				<a
					href="https://github.com/GuillianV/Hytale-AssetEditor-Helper"
					target="_blank"
					class="text-slate-800 basis-1/3 text-start">Github API</a
				>
				<a
					href="https://github.com/GuillianV/Hytale-AssetEditor-Helper-Website"
					target="_blank"
					class=" text-slate-800 basis-1/3 text-center">Github Website</a
				>
				<a class="underline basis-1/3 text-end" href="https://github.com/GuillianV/"
					>&copy; Created and designed by GuillianV</a
				>
			</div>
			<p class="mt-4 italic text-sm">
				"This is a fan-made website and is in no way affiliated with, endorsed, or owned by Hytale
				or its creators."
			</p>
		</div>
	</footer>
</div>
