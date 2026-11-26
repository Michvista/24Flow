<script lang="ts">
	import { ListPlus, Wand2, Activity } from 'lucide-svelte';

	const steps = [
		{
			icon: ListPlus,
			title: 'Drop in your day',
			text: 'Add tasks, classes and habits — type them, paste them, or snap a photo of a handwritten list.'
		},
		{
			icon: Wand2,
			title: 'Let AI arrange it',
			text: '24Flow fits everything into your free hours, fixes overlaps and keeps your priorities first.'
		},
		{
			icon: Activity,
			title: 'Stay in flow',
			text: 'Follow one clear timeline from 12AM to 12AM, track your mood and sleep, and adjust as you go.'
		}
	];

	// A sample day for the 24h timeline (start hour, length in hours)
	const blocks = [
		{ label: 'Sleep', start: 0, len: 7, color: '#334155' },
		{ label: 'Gym', start: 7, len: 1, color: '#00F57A' },
		{ label: 'Classes', start: 9, len: 4, color: '#1973f0' },
		{ label: 'Lunch', start: 13, len: 1, color: '#facc15' },
		{ label: 'Study', start: 14, len: 3, color: '#AF52DE' },
		{ label: 'Free', start: 18, len: 3, color: '#78c2ed' },
		{ label: 'Sleep', start: 23, len: 1, color: '#334155' }
	];
	const ticks = [0, 6, 12, 18, 24];
	const fmt = (h: number) => (h === 0 || h === 24 ? '12AM' : h === 12 ? '12PM' : h < 12 ? `${h}AM` : `${h - 12}PM`);
</script>

<section id="how-it-works" class="border-b-2 border-slate-800 bg-[#0e1624] py-16 md:py-28">
	<div class="mx-auto max-w-7xl px-4 sm:px-6">
		<div class="max-w-2xl">
			<p class="font-display-mono text-xs uppercase tracking-widest text-[#78c2ed]">
				// How it works
			</p>
			<h2 class="mt-3 font-robson text-[13vw] leading-none tracking-tight sm:text-5xl md:text-6xl">
				Own your <span class="text-[#1973f0]">24h</span>
			</h2>
			<p class="mt-4 text-base text-slate-300 sm:mt-5 sm:text-lg">
				See your entire day clearly and take control — every hour accounted for, nothing forgotten.
			</p>
		</div>

		<!-- 24h timeline -->
		<div class="mt-10 mr-2 border-2 border-slate-700 bg-[#151f2e] p-4 shadow-[6px_6px_0_0_#1973f0] sm:mr-0 sm:mt-14 sm:p-8 sm:shadow-[8px_8px_0_0_#1973f0]">
			<div class="mb-4 flex items-center justify-between">
				<p class="text-sm font-bold uppercase tracking-wider sm:text-base">A day in 24Flow</p>
				<p class="hidden font-display-mono text-xs text-slate-400 sm:block">24 / 24 hrs planned</p>
			</div>
			<div class="relative h-10 w-full overflow-hidden sm:h-14 border-2 border-slate-600 bg-[#0b111c]">
				{#each blocks as b}
					<div
						class="absolute top-0 flex h-full items-center justify-center overflow-hidden border-r-2 border-[#0b111c] text-[10px] font-bold uppercase text-[#0b111c] sm:text-xs"
						style="left:{(b.start / 24) * 100}%; width:{(b.len / 24) * 100}%; background:{b.color}; {b.color === '#334155' ? 'color:#cbd5e1' : ''}"
						title="{b.label}: {fmt(b.start)} – {fmt(b.start + b.len)}"
					>
						{#if b.len >= 2}<span class="hidden truncate px-1 sm:inline">{b.label}</span>{/if}
					</div>
				{/each}
			</div>
			<div class="relative mt-2 h-4 font-display-mono text-[10px] text-slate-400 sm:text-xs">
				{#each ticks as t}
					<span
						class="absolute -translate-x-1/2 first:translate-x-0 last:-translate-x-full"
						style="left:{(t / 24) * 100}%">{fmt(t)}</span
					>
				{/each}
			</div>
			<ul class="mt-5 grid grid-cols-3 gap-x-3 gap-y-2 text-xs text-slate-300 sm:hidden">
				{#each blocks.slice(0, 6) as b}
					<li class="flex items-center gap-2">
						<span class="inline-block h-3 w-3" style="background:{b.color}"></span>{b.label}
					</li>
				{/each}
			</ul>
		</div>

		<!-- Steps -->
		<ol class="mt-10 grid gap-4 sm:mt-14 lg:grid-cols-3 lg:gap-6">
			{#each steps as step, i}
				<li class="relative flex gap-4 border-2 border-slate-700 bg-[#151f2e] p-5 lg:block lg:p-7">
					<span
						class="absolute right-5 top-4 hidden font-robson text-5xl text-slate-700 lg:block"
						aria-hidden="true">0{i + 1}</span
					>
					<div
						class="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-[#1973f0] text-[#1973f0] lg:h-12 lg:w-12"
					>
						<step.icon size={24} />
					</div>
					<div>
						<p class="mb-1 font-display-mono text-[11px] uppercase tracking-widest text-slate-500 lg:hidden">Step 0{i + 1}</p>
						<h3 class="text-lg font-bold uppercase lg:mt-6 lg:text-xl">{step.title}</h3>
						<p class="mt-1.5 text-sm leading-relaxed text-slate-400 lg:mt-3 lg:text-base">{step.text}</p>
					</div>
				</li>
			{/each}
		</ol>
	</div>
</section>
