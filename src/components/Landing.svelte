<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-svelte';
	import { scrollToId } from '$lib/scrollToId';
	import main from '$lib/imgs/main.svg';
	import img1 from '$lib/imgs/calendar-71.svg';
	import img2 from '$lib/imgs/checklist-2.svg';
	import img4 from '$lib/imgs/reminder-note-96.svg';

	let root: HTMLElement;

	onMount(() => {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) return;
		const ctx = gsap.context(() => {
			gsap.from('.hero-reveal', {
				y: 24,
				opacity: 0,
				duration: 0.7,
				stagger: 0.08,
				ease: 'power3.out'
			});
			gsap.to('.floating', {
				y: 'random(-12,12)',
				x: 'random(-8,8)',
				rotation: 'random(-6,6)',
				duration: 3,
				yoyo: true,
				repeat: -1,
				ease: 'sine.inOut',
				stagger: 0.3
			});
		}, root);
		return () => ctx.revert();
	});
</script>

<section id="home" bind:this={root} class="relative overflow-hidden">
	<div
		class="pointer-events-none absolute inset-0 opacity-[0.06]"
		style="background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px); background-size: 48px 48px;"
	></div>

	<div
		class="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-12 md:pt-20 lg:grid-cols-[1.1fr_1fr] lg:pb-28"
	>
		<div>
			<p
				class="hero-reveal mb-5 inline-flex items-center gap-2 border-2 border-[#1973f0] bg-[#1973f0]/10 px-3 py-1 font-display-mono text-[11px] uppercase tracking-widest sm:mb-6 sm:text-xs text-[#78c2ed]"
			>
				<Sparkles size={14} /> AI-powered 24-hour planner
			</p>

			<h1
				class="hero-reveal font-robson text-[17vw] leading-[0.92] tracking-tight sm:text-7xl xl:text-8xl"
			>
				24hrs under<br />
				<span class="text-[#1973f0]">your control</span>
			</h1>

			<p class="hero-reveal mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:mt-6 sm:text-lg">
				Plan, track and master every hour of your day. Drop in your tasks, classes and activities —
				24Flow arranges them into one clear 12AM–12AM timeline. No spreadsheets, no headache.
			</p>

			<div class="hero-reveal mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
				<a
					href="/auth"
					data-sveltekit-preload-data="false"
					class="flex h-14 items-center justify-center gap-2 border-2 border-white bg-[#1973f0] px-6 text-sm sm:px-8 sm:text-base font-bold uppercase tracking-wider shadow-[5px_5px_0_0_#fff] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0_0_#fff]"
				>
					Start planning free <ArrowRight size={18} />
				</a>
				<button
					type="button"
					onclick={() => scrollToId('features', 72)}
					class="flex h-12 items-center justify-center border-2 border-slate-600 px-6 text-sm sm:h-14 sm:px-8 sm:text-base font-bold uppercase tracking-wider text-slate-200 transition-colors hover:border-white hover:text-white"
				>
					See features
				</button>
			</div>

			<ul class="hero-reveal mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm sm:mt-10 text-slate-400">
				{#each ['Free to start', 'Google sign-in', '7 AI scheduling tools'] as item}
					<li class="flex items-center gap-2">
						<CheckCircle2 size={16} class="text-[#00F57A]" />
						{item}
					</li>
				{/each}
			</ul>
		</div>

		<!-- Visual -->
		<div class="hero-reveal relative mx-auto w-full max-w-lg">
			<div
				class="relative mr-2 border-2 border-white bg-[#eef4fb] px-6 pb-14 pt-8 shadow-[8px_8px_0_0_#1973f0] sm:mr-0 sm:p-10 sm:shadow-[10px_10px_0_0_#1973f0]"
			>
				<div
					class="absolute -top-3 left-4 -rotate-2 border-2 border-[#0b111c] bg-[#facc15] px-2 py-0.5 text-xs font-bold uppercase text-[#0b111c]"
				>
					Today
				</div>
				<img src={main} alt="Person adjusting the hands of a large clock" class="mx-auto w-full" />
				<img src={img1} alt="" class="floating absolute left-3 top-6 w-10 sm:w-16" />
				<img src={img2} alt="" class="floating absolute right-3 top-1/3 w-10 sm:w-16" />
				<img src={img4} alt="" class="floating absolute bottom-16 left-4 w-10 sm:bottom-6 sm:left-6 sm:w-16" />
			</div>

			<!-- Floating schedule chip -->
			<div
				class="floating absolute -bottom-6 right-4 w-48 border-2 border-white bg-[#151f2e] p-3 shadow-[6px_6px_0_0_#000] sm:-bottom-8 sm:-right-8 sm:w-56 sm:p-4"
			>
				<p class="font-display-mono text-[10px] uppercase tracking-widest text-slate-400">
					Next up · 09:00
				</p>
				<p class="mt-1 text-sm font-bold sm:text-base">Deep study: Calculus</p>
				<div class="mt-3 h-2 w-full bg-slate-700">
					<div class="h-2 w-2/3 bg-[#00F57A]"></div>
				</div>
			</div>
		</div>
	</div>

	<!-- Marquee -->
	<div
		class="select-none overflow-hidden mt-6 border-y-2 border-slate-800 bg-[#facc15] py-2.5 sm:mt-0 sm:py-3 text-[#0b111c]"
		aria-hidden="true"
	>
		<div class="marquee flex w-max whitespace-nowrap text-xs font-bold sm:text-sm uppercase tracking-widest">
			{#each Array(2) as _}
				<span class="pr-8">Plan // Track // Automate // Own your 24h // No more spreadsheets //</span>
				<span class="pr-8">Plan // Track // Automate // Own your 24h // No more spreadsheets //</span>
			{/each}
		</div>
	</div>
</section>

<style>
	.marquee {
		animation: marquee 30s linear infinite;
	}
	@keyframes marquee {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.marquee {
			animation: none;
		}
	}
</style>
