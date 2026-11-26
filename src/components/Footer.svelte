<script lang="ts">
	import { scrollToId } from '$lib/scrollToId';
	import { Mail } from 'lucide-svelte';

	const NAV_HEIGHT = 72;
	const year = new Date().getFullYear();

	const links = [
		{ id: 'home', label: 'Home' },
		{ id: 'how-it-works', label: 'How it works' },
		{ id: 'features', label: 'Features' }
	];
</script>

<footer id="footer" class="border-t-2 border-slate-800 bg-[#080d16]">
	<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
		<div class="grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
			<div>
				<p class="font-display-mono text-xs uppercase tracking-widest text-[#78c2ed]">
					// Contact us
				</p>
				<h2 class="mt-4 max-w-xl text-2xl font-bold leading-snug text-white/90 md:text-3xl">
					Questions about 24Flow, or want to see how it can plan your day? We'd love to hear from
					you.
				</h2>
				<a
					href="mailto:support@24flow.ai"
					class="mt-6 inline-flex items-center gap-2 border-b-2 border-[#1973f0] pb-1 text-lg font-bold transition-colors hover:text-[#78c2ed]"
				>
					<Mail size={18} /> support@24flow.ai
				</a>
			</div>

			<nav aria-label="Footer">
				<p class="text-xs font-bold uppercase tracking-widest text-slate-500">Explore</p>
				<ul class="mt-4 space-y-3">
					{#each links as link}
						<li>
							<button
								type="button"
								class="text-slate-300 transition-colors hover:text-white"
								onclick={() => scrollToId(link.id, NAV_HEIGHT)}
							>
								{link.label}
							</button>
						</li>
					{/each}
				</ul>
			</nav>

			<div>
				<p class="text-xs font-bold uppercase tracking-widest text-slate-500">Account</p>
				<ul class="mt-4 space-y-3">
					<li>
						<a
							href="/auth"
							data-sveltekit-preload-data="false"
							class="text-slate-300 transition-colors hover:text-white">Log in</a
						>
					</li>
					<li>
						<a
							href="/auth"
							data-sveltekit-preload-data="false"
							class="text-slate-300 transition-colors hover:text-white">Create account</a
						>
					</li>
				</ul>
			</div>
		</div>

		<p
			class="mt-16 select-none text-center font-robson text-[22vw] leading-none tracking-tight text-white/[0.06] md:text-[12rem]"
			aria-hidden="true"
		>
			24FLOW
		</p>

		<div
			class="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-sm text-slate-500 md:flex-row"
		>
			<p>© {year} 24Flow. All rights reserved.</p>
			<p class="font-display-mono text-xs uppercase tracking-widest">Own your 24h.</p>
		</div>
	</div>
</footer>
