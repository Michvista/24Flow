<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import {
		X,
		Sparkles,
		MousePointer2,
		GripVertical,
		Timer,
		Plus,
		Bed,
		BookOpen
	} from 'lucide-svelte';
	import type { Task, BacklogItem } from '$lib/types';

	let {
		isOpen = $bindable(),
		isEditMode,
		backlog,
		scheduleData,
		weekOffset,
		onDragStart,
		onOpenCreate
	} = $props();

	let sidebarElement = $state<HTMLElement>();
	let overlayElement = $state<HTMLElement>();
	let currentTime = $state(new Date());

	// Update time every minute
	onMount(() => {
		const interval = setInterval(() => {
			currentTime = new Date();
		}, 60000); // Update every minute

		return () => clearInterval(interval);
	});

	// Derived stats
	const totalHours = $derived(
		scheduleData.filter((i: Task) => i.week === weekOffset && !i.isBreak).length * 2
	);
	const progressWidth = $derived(Math.min((totalHours / 40) * 100, 100));

	// Get next break and work session based on current time
	const ns = $derived(() => {
		const now = currentTime;
		const currentDayIdx = (now.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0 system
		const currentMinutes = now.getHours() * 60 + now.getMinutes();

		// Get today's events
		const todaysEvents = scheduleData
			.filter((i: Task) => i.week === 0 && i.day === currentDayIdx)
			.map((i: Task) => {
				const [h, m] = i.time.split(':').map(Number);
				return { ...i, totalMins: h * 60 + (m || 0) };
			})
			.filter((i: { totalMins: number }) => i.totalMins > currentMinutes)
			.sort((a: { totalMins: number }, b: { totalMins: number }) => a.totalMins - b.totalMins);

		const nextBreak = todaysEvents.find((e: any) => e.isBreak);
		const nextWork = todaysEvents.find((e: any) => !e.isBreak);

		const formatDiff = (targetMins: number) => {
			const diff = targetMins - currentMinutes;
			if (diff >= 60) {
				const hours = Math.floor(diff / 60);
				const mins = diff % 60;
				return mins > 0 ? `In ${hours}h ${mins}m` : `In ${hours}h`;
			}
			return `In ${diff}m`;
		};

		return {
			break: nextBreak
				? {
						title: nextBreak.title,
						time: formatDiff(nextBreak.totalMins),
						rawTime: nextBreak.time
					}
				: null,
			work: nextWork
				? {
						title: nextWork.title,
						time: formatDiff(nextWork.totalMins),
						rawTime: nextWork.time
					}
				: null
		};
	});

	// ns is a derived value and can be used directly in the template

	// Animation Effect
	$effect(() => {
		if (!sidebarElement || !overlayElement) return;
		if (isOpen) {
			gsap.to(sidebarElement, { x: 0, duration: 0.4, ease: 'power3.out' });
			gsap.to(overlayElement, { opacity: 1, display: 'block', duration: 0.3 });
		} else {
			if (window.innerWidth < 1024) {
				gsap.to(sidebarElement, { x: '-100%', duration: 0.3, ease: 'power3.in' });
				gsap.to(overlayElement, { opacity: 0, display: 'none', duration: 0.3 });
			} else {
				gsap.set(sidebarElement, { x: 0 });
				gsap.set(overlayElement, { display: 'none' });
			}
		}
	});
</script>

<div
	bind:this={overlayElement}
	class="fixed inset-0 bg-black/60 z-40 hidden opacity-0 lg:hidden"
	onclick={() => (isOpen = false)}
	role="button"
	tabindex="0"
	onkeydown={(e) => {
		if (e.key === 'Escape' || e.key === 'Enter') {
			isOpen = false;
		}
	}}
></div>

<aside
	bind:this={sidebarElement}
	class="fixed bg-background-dark lg:relative inset-y-0 left-0 w-80 bg-card-dark border-r-2 lg:border-r-0 lg:border-l-2 border-border-dark z-50 lg:z-10 flex flex-col shrink-0 -translate-x-full lg:translate-x-0"
>
	<div
		class="p-6 border-b-2 border-border-dark bg-background-dark flex justify-between items-center shrink-0 h-[88px]"
	>
		{#if isEditMode}
			<div class="flex flex-col gap-1">
				<h3 class="text-white font-bold uppercase tracking-wider text-sm flex items-center gap-2">
					<MousePointer2 size={16} class="text-yellow-500" /> Backlog
				</h3>
				<p class="text-[#92a4c9] text-[10px] font-medium">Drag items to calendar</p>
			</div>
		{:else}
			<h3 class="text-white font-bold uppercase tracking-wider text-sm flex items-center gap-2">
				<Sparkles size={16} class="text-primary" /> AI Insights
			</h3>
		{/if}
		<button onclick={() => (isOpen = false)} class="lg:hidden text-gray-400 hover:text-white"
			><X size={20} /></button
		>
	</div>

	<div class="p-6 overflow-y-auto flex-1 flex flex-col gap-6 custom-scrollbar">
		{#if isEditMode}
			<div class="flex flex-col gap-3">
				{#each backlog as task}
					<div
						draggable="true"
						ondragstart={(e) => onDragStart(e, task, 'backlog')}
						class="bg-card-dark p-4 rounded border border-white/10 hover:border-primary/50 cursor-grab group transition-all hover:bg-white/5 shadow-hard-sm"
					>
						<div class="flex justify-between items-start mb-2">
							<span
								class="text-[10px] font-bold uppercase tracking-wider text-blue-200 bg-blue-500/20 px-1.5 py-0.5 rounded border border-blue-500/30"
								>{task.type}</span
							>
							<GripVertical size={14} class="text-white/20 group-hover:text-white" />
						</div>
						<h4 class="text-white font-bold text-sm leading-tight mb-2">{task.title}</h4>
						<div class="flex items-center gap-2 text-xs text-[#92a4c9] font-mono">
							<Timer size={12} />
							{task.duration}
						</div>
					</div>
				{/each}
			</div>

			<button
				onclick={onOpenCreate}
				class="w-full h-12 border-2 border-dashed border-border-dark rounded flex items-center justify-center text-[#92a4c9] text-xs font-bold uppercase hover:text-white hover:border-white/20 hover:bg-white/5 transition-all gap-2 mt-2"
			>
				<Plus size={16} /> Add New Task
			</button>
		{:else}
			<div class="p-4 rounded border-2 border-primary/50 bg-primary/10 relative shadow-hard-sm">
				<div
					class="absolute -top-3 left-3 px-2 bg-background-dark border border-primary text-primary text-[10px] font-bold uppercase tracking-wider"
				>
					Optimization
				</div>
				<p class="text-white text-xs leading-relaxed mt-2 font-medium">
					High cognitive load detected on Tuesday. Moving <span
						class="text-white underline decoration-wavy decoration-primary">History Essay</span
					> to Wednesday is recommended.
				</p>
				<div class="mt-4 flex gap-2">
					<button
						class="flex-1 h-8 bg-primary text-white text-[10px] font-bold uppercase rounded hover:bg-blue-600 transition-colors shadow-sm"
						>Apply</button
					>
					<button
						class="flex-1 h-8 px-2 border border-border-dark text-[#92a4c9] text-[10px] font-bold uppercase rounded hover:text-white hover:bg-white/5 transition-colors"
						>Dismiss</button
					>
				</div>
			</div>

			<div>
				<h4 class="text-[#92a4c9] text-[10px] font-bold uppercase mb-2 tracking-wider">
					Weekly Load
				</h4>
				<div class="flex items-end gap-2 mb-2">
					<span class="text-4xl font-black text-white leading-none">{totalHours}</span>
					<span class="text-xs font-bold text-[#92a4c9] mb-1">hours scheduled</span>
				</div>
				<div class="w-full bg-[#232f48] h-2 rounded-full overflow-hidden border border-white/5">
					<div
						class="bg-gradient-to-r from-primary to-purple-600 h-full transition-all duration-1000 ease-out"
						style="width: {progressWidth}%"
					></div>
				</div>
				<div class="flex justify-between mt-2 text-[10px] text-[#92a4c9] font-mono">
					<span>0h</span>
					<span>Goal: 40h</span>
				</div>
			</div>

			<div class="flex flex-col gap-3">
				<div
					class="p-3 border-2 border-border-dark bg-background-dark rounded flex items-center gap-3"
				>
					<div
						class="size-10 rounded-full bg-[#232f48] flex items-center justify-center text-white shrink-0 border border-white/5"
					>
						<Bed size={18} />
					</div>
					<div class="overflow-hidden flex-1">
						<div class="text-[#92a4c9] text-[9px] font-bold uppercase">Next Break</div>
						{#if ns()?.break}
							<div class="text-white font-bold text-sm truncate">{ns()?.break?.title}</div>
							<div class="text-primary text-[10px] font-mono">{ns()?.break?.time}</div>
						{:else}
							<div class="text-white/50 font-bold text-sm">No breaks today</div>
						{/if}
					</div>
				</div>
				<div
					class="p-3 border-2 border-border-dark bg-background-dark rounded flex items-center gap-3"
				>
					<div
						class="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0 border border-primary/20"
					>
						<BookOpen size={18} />
					</div>
					<div class="overflow-hidden flex-1">
						<div class="text-[#92a4c9] text-[9px] font-bold uppercase">Next Study</div>
						{#if ns()?.work}
							<div class="text-white font-bold text-sm truncate">{ns()?.work?.title}</div>
							<div class="text-primary text-[10px] font-mono">{ns()?.work?.time}</div>
						{:else}
							<div class="text-white/50 font-bold text-sm">All done for today!</div>
						{/if}
					</div>
				</div>
			</div>
		{/if}
	</div>
</aside>

<style>
	:global(.custom-scrollbar::-webkit-scrollbar) {
		width: 6px;
	}
	:global(.custom-scrollbar::-webkit-scrollbar-track) {
		background: #111722;
	}
	:global(.custom-scrollbar::-webkit-scrollbar-thumb) {
		background: #232f48;
		border-radius: 4px;
	}
	:global(.shadow-hard-sm) {
		box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.5);
	}
</style>
