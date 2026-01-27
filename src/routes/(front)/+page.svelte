<script lang="ts">
	let searchInput: HTMLInputElement;
	const serverurl = 'https://hae.guillian.net';

	let results: string[] = $state([]);
	let totalResults: number = $state(0);
	let offset: number = $state(0);
	let limit: number = $state(10);

	function search(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		offset = 0;
		limit = 10;

		if (event.currentTarget.value.length == 0) {
			results = [];
			totalResults = 0;
			return;
		}

		fetch(`${serverurl}/properties/${searchInput.value}?offset=${offset}&limit=${limit}`, {
			mode: 'cors',
			headers: {
				'Access-Control-Allow-Origin': '*'
			}
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.properties != null) {
					results = data.properties;
					totalResults = data.total;
				}
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function loadmore() {
		offset = offset + limit;

		fetch(`${serverurl}/properties/${searchInput.value}?offset=${offset}&limit=${limit}`, {
			mode: 'cors',
			headers: {
				'Access-Control-Allow-Origin': '*'
			}
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.properties != null) {
					results = results.concat(data.properties);
					totalResults = data.total;
				}
			})
			.catch((err) => {
				console.error(err);
			});
	}
</script>

<div class="bg-neutral-100 p-8">
	<img
		src="/images/Hytale-bg.jpg"
		alt="bg"
		style="height: calc(100vh - 140px );"
		class="w-full bg-cover object-cover rounded-3xl"
	/>

	<div
		class=" absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-white w-full text-center"
	>
		<h1 class="font-extrabold text-7xl">Hytales Asset Editor Helper</h1>
		<div class="flex flex-col mt-8 justify-center items-center">
			<h2 class="font-bold text-3xl text-white text-center mb-4">
				Search for an Asset Editor Property
			</h2>

			<!-- svelte-ignore event_directive_deprecated -->
			<input
				on:input={search}
				bind:this={searchInput}
				type="property"
				id="property"
				placeholder="Search for an Asset Editor source property (Interactions, EntityEffects...)"
				class="w-1/2 p-2 text-black mt-0 rounded-3xl"
			/>

			<div
				class="absolute top-full flex flex-row mt-4 w-1/2 max-h-64 overflow-y-auto flex-wrap bg-neutral-50 rounded-3xl {results.length >
				0
					? ''
					: 'hidden'} p-2"
			>
				{#each results as result}
					<div class="mr-2">
						<div class="w-fit p-2 text-black mt-0 rounded-3xl mb-2 bg-neutral-200 cursor-pointer">
							<p>
								<a target="_blank" href="/property/{result.replace('.json', '')}"
									>{result.replace('.json', '')}</a
								>
							</p>
						</div>
					</div>
				{/each}
				{#if offset + limit < totalResults}
					<div class="mr-2">
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore event_directive_deprecated -->
						<div
							on:click={loadmore}
							class="w-fit p-2 bg-blue-900 mt-0 rounded-3xl mb-2 text-neutral-200 cursor-pointer"
						>
							<div>Load more</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<div class="border-2 border-black rounded-3xl p-8 mt-8 mb-8">
		<h2 class="font-medium text-3xl">List of properties</h2>
		<p class="mb-4">
			To get the full list of existing properties, you can use the following link :
		</p>
		<a href="/properties" target="_blank" class="mt-4"
			><div class="font-semibold w-fit bg-blue-900 p-2 text-neutral-200 rounded-3xl">
				Get all !
			</div></a
		>
	</div>

	<div class="border-2 border-black rounded-3xl p-8 mt-8">
		<strong>Hi everybody,</strong><br />
		I'm actually working on a website to help Modding Community with Asset Editor.
		<br />
		The main problem I encounter every time I used it is that sometimes when you want to create a new
		Object (Item, Entity, Biome NPC ..)<br /> you lack informations about what kind of properties
		should i add or what props are available for this item.
		<br />
		To explain myself a bit more and give an example, last time my friends and me were trying to create
		a new entityeffect on food. ⁠My big burger The problem was that we could not found any registry with
		available properties. The only solution was to check every EntityEffect and write every property available.
		<br />
		To patch this, i've searched a bit on the web to see if this exists. I didn't find anything. (If you
		find a link or a website, let me know !) So to resolve this, i'm currently working on.
		<br />
		Before creating the front app, i'd like to get a bit of feedback if this would be intresting
		<br /><br />
		<p>
			<strong> This is in developement, </strong>
			<br />
			Backend Github &nbsp;:
			<a class="underline" href="https://github.com/GuillianV/Hytales-AssetEditor-Helper"
				>GuillianV/Hytales-AssetEditor-Helper</a
			>. <br />
			Frontend Github :
			<a class="underline" href="https://github.com/GuillianV/Hytales-AssetEditor-Helper-Website"
				>GuillianV/Hytales-AssetEditor-Helper-Website</a
			>. <br /><br />

			Give me your feedback and constructive advice
			<a href="/contact" class="font-bold underline text-xl">here</a> !
		</p>
	</div>
</div>
