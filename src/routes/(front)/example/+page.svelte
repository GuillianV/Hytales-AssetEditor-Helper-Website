<script lang="js">
	// @ts-nocheck
	let { data } = $props();
	const { example, fullpath, paths, filename } = data;
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

	<div class="rounded-3xl w-full relative p-8 border mt-8 border-black overflow-x-auto">
		<pre><code>
{JSON.stringify(example, null, 4)}
		</code></pre>
	</div>
</div>
