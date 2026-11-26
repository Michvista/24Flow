<script lang="ts">
	import { scrollToId } from '$lib/scrollToId';
	import { Menu, X, ArrowRight } from 'lucide-svelte';

	const NAV_HEIGHT = 72;
	let isOpen = $state(false);

	const links = [
		{ id: 'how-it-works', label: 'How it works' },
		{ id: 'features', label: 'Features' },
		{ id: 'footer', label: 'Contact' }
	];

	function go(id: string) {
		isOpen = false;
		scrollToId(id, NAV_HEIGHT);
	}
</script>

<header class="sticky top-0 z-50 border-b-2 border-slate-800 bg-[#0b111c]/90 backdrop-blur">
	<div class="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6">
		<button
			type="button"
			onclick={() => go('home')}
			class="font-robson text-2xl tracking-tight text-white"
			aria-label="24Flow home"
		>
			24FLOW<span class="text-[#1973f0]">.</span>
		</button>

		<nav class="hidden items-center gap-8 md:flex" aria-label="Main">
			{#each links as link}
				<button
					type="button"
					onclick={() => go(link.id)}
					class="text-sm font-bold uppercase tracking-wider text-slate-300 transition-colors hover:text-white"
				>
					{link.label}
				</button>
			{/each}
		</nav>

		<div class="hidden items-center gap-3 md:flex">
			<a
				href="/auth"
				data-sveltekit-preload-data="false"
				class="px-4 py-2 text-sm font-bold uppercase tracking-wider text-slate-300 transition-colors hover:text-white"
			>
				Log in
			</a>
			<a
				href="/auth"
				data-sveltekit-preload-data="false"
				class="flex h-11 items-center gap-2 border-2 border-white bg-[#1973f0] px-5 text-sm font-bold uppercase tracking-wider text-white shadow-[4px_4px_0_0_#fff] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#fff]"
			>
				Get started <ArrowRight size={16} />
			</a>
		</div>

		<button
			type="button"
			class="border-2 border-slate-600 p-2 text-white md:hidden"
			onclick={() => (isOpen = !isOpen)}
			aria-label={isOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={isOpen}
		>
			{#if isOpen}<X size={22} />{:else}<Menu size={22} />{/if}
		</button>
	</div>

	{#if isOpen}
		<div class="border-t-2 border-slate-800 bg-[#0b111c] px-4 pb-6 pt-2 md:hidden">
			<nav class="flex flex-col" aria-label="Mobile">
				{#each links as link}
					<button
						type="button"
						onclick={() => go(link.id)}
						class="border-b border-slate-800 py-4 text-left text-base font-bold uppercase tracking-wider text-slate-200"
					>
						{link.label}
					</button>
				{/each}
			</nav>
			<div class="mt-6 grid grid-cols-2 gap-3">
				<a
					href="/auth"
					data-sveltekit-preload-data="false"
					class="flex h-12 items-center justify-center border-2 border-slate-600 text-sm font-bold uppercase tracking-wider"
				>
					Log in
				</a>
				<a
					href="/auth"
					data-sveltekit-preload-data="false"
					class="flex h-12 items-center justify-center border-2 border-white bg-[#1973f0] text-sm font-bold uppercase tracking-wider shadow-[4px_4px_0_0_#fff]"
				>
					Get started
				</a>
			</div>
		</div>
	{/if}
</header>
