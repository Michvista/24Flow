<script lang="ts">
	import {
		CalendarDays,
		ListTodo,
		PlusSquare,
		History,
		Search,
		Plus,
		CheckCircle2,
		Timer,
		Sparkles,
		Calendar,
		Trash2,
		Edit3,
		Eye,
		ChevronLeft,
		ChevronRight,
		Fullscreen,
		LayoutDashboard,
        ArrowBigLeft 
	} from 'lucide-svelte';
	import { onMount } from 'svelte';
	import StudyTimetable from '$lib/components/dashboard/AIToolsHub/StudyTimetable.svelte';

	// --- State Management ---
	interface Plan {
		id: number;
		title: string;
		code?: string;
		tags?: string[];
		status?: string;
		date?: string;
		deadline?: string;
		hours?: string;
		[key: string]: any;
	}

	let searchQuery: string = '';
	let plans: Plan[] = [];
	let loading: boolean = true;
	let currentPage: number = 1;
	let totalPages: number = 4;
	let showGenerator: boolean = false;

	// Mock data representing what your backend will return
	const mockPlans: Plan[] = [
		{
			id: 1,
			title: 'Advanced Calculus Finals',
			code: 'MATH-401',
			tags: ['INTEGRALS', 'LIMITS'],
			status: 'Active',
			date: 'Oct 24, 2023',
			deadline: 'Nov 15',
			hours: '4h/Day'
		},
		{
			id: 2,
			title: 'Intro to Thermodynamics',
			code: 'PHYS-201',
			tags: ['ENTROPY'],
			status: 'Completed',
			date: 'Oct 12, 2023',
			deadline: 'Oct 30',
			hours: '2h/Day'
		},
		{
			id: 3,
			title: 'Computer Vision Project',
			code: 'CS-502',
			tags: ['OPENCV', 'CNNs'],
			status: 'In Progress',
			date: 'Nov 01, 2023',
			deadline: 'Dec 05',
			hours: '6h/Day'
		}
	];

	// --- Backend Integration Point ---
	async function fetchPlans() {
		loading = true;
		try {
			// Logic for backend:
			// const res = await fetch(`/api/plans?page=${currentPage}&search=${searchQuery}`);
			// const data = await res.json();
			// plans = data.plans;

			// For now, we simulate a delay and use mock data
			setTimeout(() => {
				plans = mockPlans.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
				loading = false;
			}, 500);
		} catch (e) {
			console.error('Fetch failed', e);
			loading = false;
		}
	}

    	let avatarUrl = '';

	function generateRandomAvatar() {
		const styles = ['adventurer', 'fun-emoji', 'bottts', 'lorelei', 'avataaars'];
		const randomStyle = styles[Math.floor(Math.random() * styles.length)];
		const randomSeed = Math.random().toString(36).substring(7);
		return `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${randomSeed}`;
	}

	onMount(() => {
		avatarUrl = generateRandomAvatar();
	});

	// Reactive trigger: Fetch when page or search changes
	$: {
		(currentPage, searchQuery);
		fetchPlans();
	}

	function handlePageChange(dir: 'next' | 'prev') {
		if (dir === 'next' && currentPage < totalPages) currentPage++;
		if (dir === 'prev' && currentPage > 1) currentPage--;
	}
</script>

<div class=" relative bg-background-dark text-slate-100 min-h-screen font-display">
	

	{#if showGenerator}
    <div class="absolute z-[700] left-10 top-18 text-white ">
        <button on:click={() => (showGenerator = false)}>
            <span class="flex justify-center items-center uppercase font-bold">
                <ArrowBigLeft  size={24} /> Back
            </span>
        </button>
    </div>
		<StudyTimetable />
	{:else}
    <header
		class="border-b-2 bg-background-dark border-slate-900 bg-panel-dark px-6 py-4 flex items-center justify-between sticky top-0 z-50"
	>
		<div class="flex items-center gap-3">
			<svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"
				><path
					clip-rule="evenodd"
					d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z"
					fill="white"
					fill-rule="evenodd"
				></path></svg
			>
			<div class="flex flex-col">
				<div class="flex items-center gap-2">
					<h1 class="font-bold text-xl tracking-tighter uppercase font-monoton">24FLOW</h1>
				</div>
			</div>
		</div>

		<div class="flex items-center gap-8">
			<nav class="hidden md:flex items-center gap-6 text-sm font-bold uppercase tracking-widest">
				<a class="flex items-center gap-2 text-primary" href="/"><ListTodo size={18} /> MY PLANS</a>
				<a class="flex items-center gap-2 hover:text-primary transition-colors" href="/"
					><PlusSquare size={18} /> NEW PLAN</a
				>
				<a class="flex items-center gap-2 hover:text-primary transition-colors" href="/"
					><LayoutDashboard size={18} /> DASHBOARD</a
				>
			</nav>
			<div class="flex items-center gap-4 pl-8 border-l">
				<div class="text-right">
					<p class="text-sm font-bold leading-none">Alex Chen</p>
				</div>
				<div
			class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-slate-900 overflow-hidden bg-slate-200"
			style="background-image: url('{avatarUrl}');"
		>
			{#if !avatarUrl}
				<div class=" w-full h-full"></div>
			{/if}
		</div>
			</div>
		</div>
	</header>
		<main class="max-w-7xl mx-auto px-6 py-12">
			<div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
				<div>
					<h2 class="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4">
						MY STUDY<br /><span class="text-primary">TIMETABLES</span>
					</h2>
					<p class="font-mono text-slate-400 text-sm max-w-xl">
						// Access and manage your generated study schedules.
					</p>
				</div>
				<div class="flex items-center gap-4">
					<div class="flex items-center border-2 border-slate-900 bg-panel-dark px-4 py-2">
						<Search size={18} class="text-slate-400 mr-2" />
						<input
							bind:value={searchQuery}
							class="bg-transparent border-none focus:ring-0 font-mono text-sm p-0 w-48"
							placeholder="Search schedules..."
							type="text"
						/>
					</div>
					<button
						on:click={() => (showGenerator = true)}
						class="bg-primary text-white px-6 py-3 font-bold uppercase tracking-widest flex items-center gap-2 border-2 border-blue-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
					>
						<Plus size={20} /> Create New
					</button>
				</div>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
				<div class="bg-panel-dark p-6 border-2 border-slate-900 flex items-center gap-5">
					<div
						class="w-12 h-12 bg-emerald-500/10 flex items-center justify-center text-emerald-500 border-2 border-emerald-500"
					>
						<CheckCircle2 size={24} />
					</div>
					<div>
						<p class="text-[10px] uppercase font-bold text-slate-500 tracking-widest">
							Active Plans
						</p>
						<p class="text-2xl font-black">04</p>
					</div>
				</div>
				<div class="bg-panel-dark p-6 border-2 border-slate-900 flex items-center gap-5">
					<div
						class="w-12 h-12 bg-amber-500/10 flex items-center justify-center text-amber-500 border-2 border-amber-500"
					>
						<Timer size={24} />
					</div>
					<div>
						<p class="text-[10px] uppercase font-bold text-slate-500 tracking-widest">
							Hours Scheduled
						</p>
						<p class="text-2xl font-black">142h</p>
					</div>
				</div>
				<div class="bg-panel-dark p-6 border-2 border-slate-900 flex items-center gap-5">
					<div
						class="w-12 h-12 bg-primary/10 flex items-center justify-center text-primary border-2 border-primary"
					>
						<Sparkles size={24} />
					</div>
					<div>
						<p class="text-[10px] uppercase font-bold text-slate-500 tracking-widest">
							AI Efficiency
						</p>
						<p class="text-2xl font-black">88%</p>
					</div>
				</div>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{#if loading}
					<p class="col-span-full text-center font-mono py-12">Loading schedules...</p>
				{:else}
					{#each plans as plan (plan.id)}
						<div
							class="group relative bg-panel-dark border-2 border-slate-900 hover:border-primary transition-colors flex flex-col"
						>
							<div class="p-6 flex-grow">
								<div class="flex justify-between items-start mb-4">
									<div
										class="bg-slate-100 text-slate-900 px-2 py-0.5 text-[10px] font-bold uppercase tracking-tighter"
									>
										{plan.status}
									</div>
									<span class="font-mono text-[10px] text-slate-500 uppercase tracking-widest"
										>{plan.date}</span
									>
								</div>
								<h3
									class="text-2xl font-black uppercase mb-2 group-hover:text-primary transition-colors"
								>
									{plan.title}
								</h3>
								<div class="space-y-4 mb-6">
									<div class="flex flex-wrap gap-2">
										<span
											class="px-2 py-1 text-[10px] font-bold bg-slate-800 border border-slate-700"
											>{plan.code}</span
										>
										{#each plan.tags as tag}
											<span
												class="px-2 py-1 text-[10px] font-bold bg-slate-800 border border-slate-700"
												>{tag}</span
											>
										{/each}
									</div>
									<div class="flex items-center gap-4">
										<div class="flex items-center gap-1 text-slate-500">
											<Calendar size={14} />
											<span class="text-xs font-bold uppercase">{plan.deadline} Deadline</span>
										</div>
										<div class="flex items-center gap-1 text-slate-500">
											<Timer size={14} />
											<span class="text-xs font-bold uppercase">{plan.hours}</span>
										</div>
									</div>
								</div>
							</div>
							<div class="grid grid-cols-2 mt-auto border-t-2 border-slate-900">
								<button
									class="py-4 font-bold uppercase text-sm flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors border-r-2 border-slate-900"
								>
									<Fullscreen size={16} /> View
								</button>
								<button
									class="py-4 font-bold uppercase text-sm flex items-center justify-center gap-2 hover:bg-red-600 transition-colors hover:text-black"
								>
									<Trash2 size={16} /> Delete
								</button>
							</div>
							<div
								class="absolute -top-1 -right-1 w-full h-full bg-slate-700 -z-10 transition-transform group-hover:translate-x-1 group-hover:translate-y-1"
							></div>
						</div>
					{/each}

					<button
						on:click={() => (showGenerator = true)}
						class="group relative bg-slate-900/50 border-2 border-dashed border-slate-800 hover:border-primary transition-all flex flex-col items-center justify-center p-12 min-h-[320px]"
					>
						<div
							class="w-16 h-16 rounded-full flex items-center justify-center border-2 border-dashed border-slate-700 group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all mb-4"
						>
							<Plus size={32} />
						</div>
						<p
							class="font-bold uppercase tracking-widest text-slate-400 group-hover:text-primary transition-colors"
						>
							Start New Study Plan
						</p>
					</button>
				{/if}
			</div>

			<div class="mt-16 flex flex-col items-center gap-6">
				<div class="flex items-center gap-4">
					<button
						on:click={() => handlePageChange('prev')}
						disabled={currentPage === 1}
						class="w-10 h-10 flex items-center justify-center border-2 border-slate-900 hover:bg-primary hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
					>
						<ChevronLeft size={20} />
					</button>
					<span class="font-bold font-mono"
						>{currentPage.toString().padStart(2, '0')} / {totalPages
							.toString()
							.padStart(2, '0')}</span
					>
					<button
						on:click={() => handlePageChange('next')}
						disabled={currentPage === totalPages}
						class="w-10 h-10 flex items-center justify-center border-2 border-slate-900 hover:bg-primary hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
					>
						<ChevronRight size={20} />
					</button>
				</div>
			</div>
		</main>

		<footer class="mt-20 border-t border-slate-200 py-12 bg-panel-dark">
			<div
				class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6"
			>
				<p class="text-[10px] font-mono text-slate-500 uppercase">© 2026 24FLOW.</p>
				<div class="flex items-center gap-8">
					<a
						class="text-[10px] font-bold uppercase tracking-widest hover:text-primary transition-colors"
						href="/">Privacy Protocol</a
					>
					<a
						class="text-[10px] font-bold uppercase tracking-widest hover:text-primary transition-colors"
						href="/">Terms of Service</a
					>
					<a
						class="text-[10px] font-bold uppercase tracking-widest hover:text-primary transition-colors"
						href="/">Support Node</a
					>
				</div>
			</div>
		</footer>
	{/if}
</div>

<style>
	:global(.dark) {
		--primary: #2563eb;
		--background-dark: #020617;
		--panel-dark: #0b1121;
		--border-dark: #1e293b;
	}

	.font-display {
		font-family: 'Space Grotesk', sans-serif;
	}
</style>
