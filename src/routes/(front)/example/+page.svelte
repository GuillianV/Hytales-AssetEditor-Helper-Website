<script lang="js">
	// @ts-nocheck
	let { data } = $props();
	const { example, fullpath, paths, filename } = data;
	const { asset, references } = example;

	let references_tab_opened = $state(false);
</script>

<div class="bg-neutral-100 p-8 w-full h-fit">
	<div class="h-64 w-full relative overflow-hidden">
		<img
			src="/images/hytale-bg-2.webp"
			class="h-full rounded-3xl w-full bg-conver object-cover"
			alt="bg"
		/>
		<h1
			class="absolute text-center left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 sm:text-7xl text-xl font-bold text-white"
		>
			{filename}
		</h1>
	</div>

	{#if references.references}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<div class="mt-4 rounded-3xl border h-auto border-black p-8 overflow-x-auto">
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore event_directive_deprecated -->
			<h2
				class="font-bold text-3xl cursor-pointer underline"
				on:click={() => (references_tab_opened = !references_tab_opened)}
			>
				Parents references
			</h2>
			<div class="flex flex-col {references_tab_opened ? 'hidden' : 'block'}">
				{filename} : {'{'}

				{#each references.references.sort() as reference}
					<a
						href="/example?fullpath={reference}"
						target="_blank"
						class="w-fit h-fit cursor-pointer mt-2 ml-8 p-2 bg-neutral-200 hover:bg-neutral-300"
					>
						{reference} : {'{'}...{'}'}
					</a>
				{/each}

				{'}'}
			</div>
		</div>
	{/if}

	<div class="rounded-3xl w-full relative p-8 border mt-8 border-black overflow-x-auto">
		<pre><code>
{JSON.stringify(asset, null, 4)}
		</code></pre>
	</div>
</div>
