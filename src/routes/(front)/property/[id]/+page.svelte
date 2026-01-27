<script lang="js">
	// @ts-nocheck
	let { data } = $props();
	const { property, id } = data;

	const { primitives, array_primitives, array_properties, properties, exemples } = property;

	let primitives_tab_opened = $state(false);
	let array_primitives_tab_opened = $state(false);
	let properties_tab_opened = $state(false);
	let array_properties_tab_opened = $state(false);
	let exemples_tab_opened = $state(false);

	let primitives_values = {};
	let primitives_opened = $state([]);
	if (primitives != null) {
		primitives.forEach((value) => {
			const type = typeof value;
			if (primitives_values[type] == null) {
				primitives_values[type] = [];
			}

			primitives_values[type].push(value);
		});
	}

	let primitives_array_values = {};
	let primitives_array_opened = $state([]);
	if (array_primitives != null) {
		array_primitives.forEach((value) => {
			const type = typeof value;
			if (primitives_array_values[type] == null) {
				primitives_array_values[type] = [];
			}

			primitives_array_values[type].push(value);
		});
	}
</script>

<div class="bg-neutral-100 p-8 w-full h-fit">
	<div class="h-64 w-full relative">
		<img
			src="/images/hytale-bg-2.webp"
			class="h-full rounded-3xl w-full bg-conver object-cover"
			alt="bg"
		/>
		<h1
			class="absolute text-center left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 sm:text-7xl text-xl font-bold text-white"
		>
			{id}
		</h1>
	</div>

	{#if primitives}
		<div class="mt-4 rounded-3xl border border-black p-8 overflow-x-auto">
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore event_directive_deprecated -->
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<h2
				class="font-bold text-3xl cursor-pointer underline"
				on:click={() => (primitives_tab_opened = !primitives_tab_opened)}
			>
				Direct primitives values
			</h2>
			<div class="mt-4 flex flex-row items-center {primitives_tab_opened ? 'hidden' : 'block'}">
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->

				<div>{id} :</div>
				<div>
					<!-- svelte-ignore event_directive_deprecated -->
					{#each Object.keys(primitives_values) as key}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div
							on:click={() => {
								if (primitives_opened.includes(key)) {
									const index = primitives_opened.indexOf(key);
									primitives_opened.splice(index, 1);
								} else {
									primitives_opened.push(key);
								}
							}}
							class="bg-neutral-300 rounded-3xl ml-2 w-fit p-2 cursor-pointer hover:bg-neutral-400"
						>
							{key}
						</div>
						{#if primitives_opened.includes(key)}
							<div class="bg-neutral-200 h-fit w-fit flex flex-col mt-2 ml-2 rounded-3xl p-2">
								{#each Object.values(primitives_values[key]).sort() as value}
									<div>{key == "string" ? '"' : ""}{value}{key == "string" ? '"' : ""}</div>
								{/each}
							</div>{/if}{/each}
				</div>
			</div>
		</div>
	{/if}

	{#if array_primitives}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<div class="mt-4 rounded-3xl border h-auto border-black p-8 overflow-x-auto">
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore event_directive_deprecated -->
			<h2
				class="font-bold text-3xl cursor-pointer underline"
				on:click={() => (array_primitives_tab_opened = !array_primitives_tab_opened)}
			>
				Direct primitives array values
			</h2>
            <div class="flex flex-col {array_primitives_tab_opened ? 'hidden' : 'block'}">
		
{id} : [
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore event_directive_deprecated --> {#each Object.keys(primitives_array_values) as key}<div
							on:click={() => {
								if (primitives_array_opened.includes(key)) {
									const index = primitives_array_opened.indexOf(key);
									primitives_array_opened.splice(index, 1);
								} else {
									primitives_array_opened.push(key);
								}
							}}
							class="bg-neutral-300 rounded-3xl ml-8 w-fit p-2 cursor-pointer">{key}</div>{#if primitives_array_opened.includes(key)}
							<div class="bg-neutral-200 h-fit w-fit flex flex-col mt-2 ml-8 rounded-3xl p-2">
    {#each Object.values(primitives_array_values[key]).sort() as value}
									<div>"{value}"</div>
								{/each}
                            </div>{/if}{/each}
]
             </div>
		</div>
	{/if}

	{#if properties}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<div class="mt-4 rounded-3xl border h-auto border-black p-8 overflow-x-auto">
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore event_directive_deprecated -->
			<h2
				class="font-bold text-3xl cursor-pointer underline"
				on:click={() => (properties_tab_opened = !properties_tab_opened)}
			>
				Properties
			</h2>
			<div class="flex flex-col {properties_tab_opened ? 'hidden' : 'block'}">
				{id} : {'{'}

				{#each properties.sort() as property}
					<a
						href="/property/{property}"
						target="_blank"
						class="w-fit h-fit cursor-pointer mt-2 ml-8 p-2 bg-neutral-200 hover:bg-neutral-300"
					>
						{property} : {'{'}...{'}'}
					</a>
				{/each}

				{'}'}
			</div>
		</div>
	{/if}

	{#if array_properties}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<div class="mt-4 rounded-3xl border h-auto border-black p-8 overflow-x-auto">
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore event_directive_deprecated -->
			<h2
				class="font-bold text-3xl cursor-pointer underline"
				on:click={() => (properties_tab_opened = !properties_tab_opened)}
			>
				Array Properties
			</h2>
			<div class="flex flex-col {properties_tab_opened ? 'hidden' : 'block'}">
				{id} : [{'{'}

				{#each array_properties.sort() as property}
					<a
						href="/property/{property}"
						target="_blank"
						class="w-fit mt-2 h-fit cursor-pointer ml-8 p-2 bg-neutral-200 hover:bg-neutral-300"
					>
						{property} : {'{'}...{'}'}
					</a>
				{/each}

				{'}'}]
			</div>
		</div>
	{/if}

	{#if exemples}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<div class="mt-4 rounded-3xl border h-auto border-black p-8 overflow-x-auto">
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore event_directive_deprecated -->
			<h2
				class="font-bold text-3xl cursor-pointer underline"
				on:click={() => (exemples_tab_opened = !exemples_tab_opened)}
			>
				Examples
			</h2>
			<div class="flex flex-col {exemples_tab_opened ? 'hidden' : 'block'}">
				{#each exemples as exemple}
					<a
						href="/example?fullpath={exemple}"
						target="_blank"
						class="w-fit h-fit cursor-pointer mt-2 ml-8 p-2 bg-neutral-200 hover:bg-neutral-300"
						>{exemple}</a
					>
				{/each}
			</div>
		</div>
	{/if}
</div>
