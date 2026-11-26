<script lang="ts">
	import {
		LayoutGrid,
		Wand2,
		ScanText,
		GraduationCap,
		GitMerge,
		MessageSquareText,
		ArrowRight
	} from 'lucide-svelte';
	import meditating from '$lib/imgs/meditating.png';

	const features = [
		{
			icon: LayoutGrid,
			title: 'A better way to plan your day',
			description:
				'No messy spreadsheets. Visualize your entire day in one place — clear, structured, and built for people who want order.',
			accent: '#1973f0'
		},
		{
			icon: Wand2,
			title: 'AI auto-fill my day',
			description:
				'Give the app your tasks and free hours — it arranges everything into a balanced 12AM–12AM schedule.',
			accent: '#00F57A'
		},
		{
			icon: ScanText,
			title: 'AI OCR task digitizer',
			description:
				'Snap a photo of a handwritten or printed schedule and get an editable digital timetable back.',
			accent: '#facc15'
		},
		{
			icon: GraduationCap,
			title: 'AI study timetable',
			description:
				'Enter subjects, topics, deadlines and available hours. Get a full weekly study plan instantly.',
			accent: '#AF52DE'
		},
		{
			icon: GitMerge,
			title: 'Smart overlap fixer',
			description:
				'When two tasks clash or run over, the schedule auto-adjusts while keeping your priorities intact.',
			accent: '#78c2ed'
		},
		{
			icon: MessageSquareText,
			title: 'Natural language scheduling',
			description:
				'Type “Study 10–1, gym at 4, cook for an hour after” and watch it become a clean 24h timetable.',
			accent: '#f97316'
		}
	];
</script>

<section id="features" class="py-16 md:py-28">
	<div class="mx-auto max-w-7xl px-4 sm:px-6">
		<div class="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
			<div class="max-w-2xl">
				<p class="font-display-mono text-xs uppercase tracking-widest text-[#78c2ed]">
					// Features
				</p>
				<h2 class="mt-3 font-robson text-[13vw] leading-none tracking-tight sm:text-5xl md:text-6xl">
					Time management,<br /><span class="text-[#1973f0]">next level</span>
				</h2>
			</div>
			<p class="max-w-md text-slate-400">
				Seven AI tools that do the boring part of planning, so you can spend your hours on what
				matters.
			</p>
		</div>

		<div class="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
			{#each features as f}
				<article
					class="group flex gap-4 border-2 border-slate-700 bg-[#151f2e] p-5 sm:flex-col sm:gap-0 sm:p-7 transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:border-white"
					style="--accent:{f.accent}"
				>
					<div
						class="flex h-11 w-11 shrink-0 items-center justify-center border-2 sm:h-12 sm:w-12"
						style="border-color:{f.accent}; color:{f.accent}"
					>
						<f.icon size={24} />
					</div>
					<div>
						<h3 class="text-base font-bold uppercase leading-tight sm:mt-6 sm:text-xl">{f.title}</h3>
						<p class="mt-1.5 text-sm leading-relaxed text-slate-400 sm:mt-3 sm:text-base">{f.description}</p>
					</div>
				</article>
			{/each}
		</div>

		<!-- CTA -->
		<div
			class="mt-16 mr-2 grid items-center gap-10 border-2 border-white bg-[#1973f0] p-6 shadow-[6px_6px_0_0_#fff] sm:mr-0 sm:mt-24 sm:p-8 sm:shadow-[10px_10px_0_0_#fff] md:grid-cols-[1.4fr_1fr] md:p-12"
		>
			<div>
				<h2 class="font-robson text-[11vw] leading-none tracking-tight sm:text-5xl md:text-6xl">
					Ready to take back your day?
				</h2>
				<p class="mt-4 max-w-lg text-base text-blue-50 sm:mt-5 sm:text-lg">
					Create a free account and have your first 24-hour plan in under a minute.
				</p>
				<a
					href="/auth"
					data-sveltekit-preload-data="false"
					class="mt-7 flex h-14 w-full items-center justify-center gap-2 whitespace-nowrap border-2 border-[#0b111c] bg-white px-6 text-sm font-bold sm:mt-8 sm:inline-flex sm:w-auto sm:px-8 sm:text-base uppercase tracking-wider text-[#0b111c] shadow-[5px_5px_0_0_#0b111c] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0_0_#0b111c]"
				>
					Get started free <ArrowRight size={18} />
				</a>
			</div>
			<div class="hidden border-2 border-[#0b111c] bg-white p-4 md:block">
				<img src={meditating} alt="Calm person meditating" class="w-full" />
			</div>
		</div>
	</div>
</section>

<style>
	article:hover {
		box-shadow: 6px 6px 0 0 var(--accent);
	}
</style>
