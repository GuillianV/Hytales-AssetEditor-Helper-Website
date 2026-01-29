<script lang="js">
	// @ts-nocheck
	let { data } = $props();
	let { example, fullpath, paths, filename } = data;
	const { asset, references } = example;

	let references_linked_tab_opened = $state(false);
	let references_tab_opened = $state(false);

	function isObject(obj) {
		return typeof obj === 'object' && Array.isArray(obj) === false;
	}

	function isArray(obj) {
		return Array.isArray(obj);
	}

	function isPrimitive(obj) {
		return typeof obj !== 'object' && Array.isArray(obj) === false && obj !== null;
	}

	function isString(obj) {
		return typeof obj === 'string';
	}

	function isLast(arrLength, index) {
		return arrLength - 1 === index;
	}

	function generateParentJSON(obj, depth = 0, raw = false) {
		let html = '';

		html += '{';

		if (!raw) {
			html += `<div class='obj ml-6'>`;
		}
		const keys = Object.keys(obj);
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			const value = obj[key];

			if (isPrimitive(value)) {
				if (!raw) {
					html += `<a target="_blank" href="/property/${key.replace('\\', '/')}" target="_blank" class="bg-slate-200 hover:bg-slate-300">`;
				}

				html += `"${key}"`;

				if (!raw) {
					html += `</a>`;
				}

				html += `: ${isString(value) ? `"${value}"` : value}`;

				if (!isLast(keys.length, i)) {
					html += ',';
				}
				if (!raw) {
					html += `<br>`;
				}
			} else if (isArray(value)) {
				if (!raw) {
					html += `<a target="_blank" href="/property/${key.replace('\\', '/')}" target="_blank" class="bg-slate-200 hover:bg-slate-300">`;
				}

				html += `"${key}"`;

				if (!raw) {
					html += `</a>`;
				}

				html += `: [`;

				if (!raw) {
					html += `<div class='obj ml-6'>`;
				}

				for (let j = 0; j < value.length; j++) {
					if (!raw) {
						html += `<div class='obj '>`;
					}

					if (isPrimitive(value[j])) {
						html += ` ${isString(value[j]) ? `"${value[j]}"` : value[j]}`;
					} else if (isObject(value[j])) {
						html += generateParentJSON(value[j], depth + 1, raw);
					}

					if (!isLast(value.length, j)) {
						html += ',';
					}
					if (!raw) {
						html += `</div>`;
					}
				}

				if (!raw) {
					html += `</div>`;
				}

				html += ']';
				if (!isLast(keys.length, i)) {
					html += ',';
				}

				if (!raw) {
					html += `<br>`;
				}
			} else if (isObject(value)) {
				if (!raw) {
					html += `<a target="_blank" href="/property/${key.replace('\\', '/')}" target="_blank" class="bg-slate-200 hover:bg-slate-300">`;
				}

				html += `"${key}"`;

				if (!raw) {
					html += `</a>`;
				}

				html += `: `;

				if (!raw) {
					html += `<div class='obj ml-6'>`;
				}

				html += generateParentJSON(value, depth + 1, raw);
				if (!isLast(keys.length, i)) {
					html += ',';
				}

				if (!raw) {
					html += `</div>`;
				}
			}
		}
		if (!raw) {
			html += '</div>';
		}
		html += '}';

		return html;
	}
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
		<div class="mt-6 rounded-3xl border h-auto border-black p-8 overflow-x-auto">
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore event_directive_deprecated -->
			<h2
				class="font-bold text-3xl cursor-pointer underline"
				on:click={() => (references_linked_tab_opened = !references_linked_tab_opened)}
			>
				Linked references
			</h2>
			<div class="flex mt-8 flex-col {references_linked_tab_opened ? 'hidden' : 'block'}">
				<div class="flex">{fullpath}<strong>{filename}</strong>&nbsp; :</div>
				

				{#each references.references.sort() as reference}
					<a
						href="/example?fullpath={reference.replace('\\', '/')}"
						target="_blank"
						class="w-fit h-fit cursor-pointer mt-2 p-2 bg-neutral-200 hover:bg-neutral-300"
					>
						{reference}
					</a>
				{/each}
			</div>
		</div>
	{/if}

	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div class="rounded-3xl w-full relative p-8 border mt-8 border-black overflow-x-auto">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore event_directive_deprecated -->
		<h2
			class="font-bold text-3xl cursor-pointer underline"
			on:click={() => (references_tab_opened = !references_tab_opened)}
		>
			Source JSON
		</h2>
		<div class={references_tab_opened ? 'hidden' : 'block'}>
			{@html generateParentJSON(asset, true)}
		</div>
	</div>
</div>
