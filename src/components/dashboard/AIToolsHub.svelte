<script>
	import {
		WandSparkles,
		GraduationCap,
		Hourglass,
		Merge,
		MessageSquare,
		CalendarDays,
		ArrowRight,
		Rocket,
		LayoutGrid
	} from 'lucide-svelte';
	import Footer from './Footer.svelte';

	// Data for the tools grid with Lucide components
	const tools = [
		{
			title: 'AI Auto-fill My Day',
			desc: 'Intelligently fills your empty slots based on priorities, deadlines, and energy levels.',
			icon: WandSparkles,
			popular: true,
			color: 'primary',
			link: '/dashboard/AITools/AutoFill',
			disabled: false
		},
		{
			title: 'Study Timetable Gen',
			desc: 'Generates a balanced study plan for exams, ensuring proper breaks and topic rotation.',
			icon: GraduationCap,
			color: 'primary',
			link: '/dashboard/AITools/StudyTimetable',
			disabled: false
		},
		{
			title: 'Hour Block Optimizer',
			desc: 'Re-organizes fragmented meetings into solid deep work hour blocks for maximum focus.',
			icon: Hourglass,
			color: 'primary',
			link: '/dashboard/AITools/Optimizer',
			disabled: true
		},
		{
			title: 'Smart Overlap Fixer',
			desc: 'Detects and resolves scheduling conflicts instantly by proposing optimal alternatives.',
			icon: Merge,
			color: 'primary',
			link: '/dashboard/AITools/OverlapFixer',
			disabled: false
		},
		{
			title: 'Natural Language',
			desc: "'Meeting with Bob next Tuesday at 2pm.' Type your plans in plain English to schedule.",
			icon: MessageSquare,
			color: 'primary',
			link: '/dashboard/AITools/LanguageTranscriber',
			disabled: false
		},
		{
			title: 'School Timetable Gen',
			desc: 'Create complex class and activity timetables for students or teachers in seconds.',
			icon: CalendarDays,
			new: true,
			color: 'yellow',
			link: '/dashboard/AITools/SchoolTimetableGen',
			disabled: false
		},
		{
			title: 'OCR Task Digitizer',
			desc: 'Scan handwritten notes or screenshots. AI extracts tasks and syncs them directly to your schedule.',
			icon: LayoutGrid, // You can use ScanText or LayoutGrid
			new: true,
			color: 'primary', // Or 'yellow' if you want it to pop
			link: '/dashboard/AITools/TaskDigitizer',
			disabled: false
		}
	];
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Noto+Sans:wght@400..700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div
	class="min-h-screen bg-background-dark text-slate-900 dark:text-white font-display flex flex-col overflow-x-hidden selection:bg-primary selection:text-white"
>
	<main class="flex-1 w-full flex flex-col items-center py-12 px-6 sm:px-10">
		<div class="max-w-[1200px] w-full flex flex-col gap-6 mb-12">
			<div class="flex flex-col gap-2 border-l-4 border-primary pl-6">
				<h2
					class="text-4xl md:text-5xl font-black uppercase leading-tight tracking-tight text-white"
				>
					AI Scheduling <br class="hidden md:block" />Command Center
				</h2>
				<p class="text-lg md:text-xl font-medium text-slate-400 max-w-2xl mt-2">
					Deploy intelligent agents to optimize your time. Select a module below to initiate
					protocol.
				</p>
			</div>
		</div>

		<div
			class="max-w-[1200px] w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
		>
			{#each tools as tool}
				<div
					class="group relative flex flex-col justify-between border-2 bg-surface-dark p-6 transition-all hover:-translate-y-1
          {tool.color === 'yellow'
						? 'border-accent-yellow shadow-[4px_4px_0px_0px_#facc15] hover:shadow-[6px_6px_0px_0px_#facc15]'
						: 'border-slate-700 shadow-neo hover:border-primary hover:shadow-[6px_6px_0px_0px_#3b82f6]'}"
				>
					{#if tool.popular}
						<div
							class="absolute -top-3 -right-3 rotate-3 transform border-2 border-primary bg-primary px-3 py-1 text-xs font-bold uppercase text-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
						>
							Popular
						</div>
					{:else if tool.new}
						<div
							class="absolute -top-3 -right-3 rotate-3 transform border-2 border-accent-yellow bg-accent-yellow px-3 py-1 text-xs font-bold uppercase text-black shadow-sm"
						>
							New Release
						</div>
					{/if}

					<div class="mb-6 flex items-start justify-between">
						<div
							class="flex h-14 w-14 items-center justify-center border-2 border-slate-600 bg-[#051020] transition-colors
              {tool.color === 'yellow'
								? 'border-accent-yellow text-accent-yellow group-hover:bg-accent-yellow group-hover:text-black'
								: 'text-primary group-hover:border-primary group-hover:text-white group-hover:bg-primary'}"
						>
							<svelte:component this={tool.icon} size={32} strokeWidth={2.5} />
						</div>
					</div>

					<div>
						<h3
							class="mb-2 text-xl font-bold uppercase text-white transition-colors
              {tool.color === 'yellow' ? 'group-hover:text-accent-yellow' : ''}"
						>
							{tool.title}
						</h3>
						<p
							class="mb-6 text-sm leading-relaxed text-slate-400 font-body transition-colors
              {tool.color === 'yellow' ? 'group-hover:text-slate-300' : ''}"
						>
							{tool.desc}
						</p>
					</div>
					<a
						href={tool.disabled ? null : tool.link}
						class="block {tool.disabled ? 'opacity-50 cursor-not-allowed' : ''}"
						on:click={(e) => {
							if (tool.disabled) e.preventDefault();
						}}
					>
						<button
							disabled={tool.disabled}
							class="mt-auto flex w-full items-center justify-center gap-2 border-2 bg-transparent py-3 text-sm font-bold uppercase tracking-wider transition-all
    {tool.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
    {tool.color === 'yellow'
								? 'border-accent-yellow text-accent-yellow group-hover:bg-accent-yellow group-hover:text-black'
								: 'border-slate-600 text-slate-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white'}"
						>
							<span>{tool.new ? 'Try Now' : 'Launch Tool'}</span>
							{#if tool.new}
								<Rocket size={18} strokeWidth={3} />
							{:else}
								<ArrowRight size={18} strokeWidth={3} />
							{/if}
						</button>
					</a>
				</div>
			{/each}
		</div>
	</main>

	<Footer />
</div>

<style lang="postcss">
	:global(:root) {
		--primary: #3b82f6;
		--background-dark: #051020;
		--surface-dark: #0f1c2e;
		--border-dark: #1e3a8a;
		--accent-yellow: #facc15;
	}

	:global(.font-display) {
		font-family: 'Space Grotesk', sans-serif;
	}
	:global(.font-body) {
		font-family: 'Noto Sans', sans-serif;
	}

	.bg-primary {
		background-color: var(--primary);
	}
	.border-primary {
		border-color: var(--primary);
	}
	.text-primary {
		color: var(--primary);
	}
	.bg-background-dark {
		background-color: var(--background-dark);
	}
	.bg-surface-dark {
		background-color: var(--surface-dark);
	}
	.border-border-dark {
		border-color: var(--border-dark);
	}
	.border-accent-yellow {
		border-color: var(--accent-yellow);
	}
	.bg-accent-yellow {
		background-color: var(--accent-yellow);
	}
	.text-accent-yellow {
		color: var(--accent-yellow);
	}

	.shadow-neo {
		box-shadow: 4px 4px 0px 0px #1e3a8a;
	}

	:global(::-webkit-scrollbar) {
		width: 10px;
	}
	:global(::-webkit-scrollbar-track) {
		background: #051020;
	}
	:global(::-webkit-scrollbar-thumb) {
		background: #1e3a8a;
		border: 2px solid #051020;
	}
</style>
