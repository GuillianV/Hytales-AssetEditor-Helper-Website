<script lang="js">
	// @ts-nocheck
	let { data } = $props();
	const { properties } = data;
</script>

<div class="bg-neutral-100 p-8 w-full h-fit">
	<div class="h-64 w-full relative">
		<img
			src="/images/hytale-bg-2.webp"
			class="h-full rounded-3xl w-full bg-conver object-cover"
			alt="bg"
		/>
		<h1
			class="absolute text-center left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-7xl font-bold text-white"
		>
			All properties
		</h1>
	</div>

	<div class="rounded-3xl mt-8 p-8 border border-black flex flex-row flex-wrap">
		{#each properties as property}
			<div
				class="w-fit h-fit cursor-pointer mt-2 ml-2 p-2 bg-neutral-200 rounded-3xl hover:bg-neutral-300"
			>
				<a href="/property/{property.replace(".json","")}" target="_blank" class="w-fit">{property}</a>
			</div>
		{/each}
	</div>
</div>
