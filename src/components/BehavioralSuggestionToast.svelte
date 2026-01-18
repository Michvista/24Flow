<script lang="ts">
	import { BicepsFlexed, X, PlusCircle } from 'lucide-svelte'; // lucide-svelte icon components
	import { toast } from 'svelte-sonner';
	import { onMount } from 'svelte';

	let {
		toastId,
		eventName = 'Weekly Sync',
		eventTime = '09:00 AM',
		probability = '87%'
	} = $props();

	// Get current day name reactively
	const days = [
		'Sundays',
		'Mondays',
		'Tuesdays',
		'Wednesdays',
		'Thursdays',
		'Fridays',
		'Saturdays'
	];
	const currentDay = days[new Date().getDay()];

	// Logic to handle the backdrop blur on the app background
	onMount(() => {
		const layout = document.querySelector('.layout-container');
		if (layout) {
			layout.classList.add('blur-md', 'brightness-50', 'transition-all', 'duration-500');
		}

		return () => {
			// Remove blur when toast is dismissed
			if (layout) layout.classList.remove('blur-md', 'brightness-50');
		};
	});
</script>

<div
	class="group relative w-full max-w-[420px] overflow-hidden rounded-sm bg-[#151f2b] border-2 border-[#1973f0] shadow-[6px_6px_0px_0px_#1973f0] transition-all font-display"
>
	<div
		class="absolute -right-6 -top-6 h-24 w-24 rotate-45 border-4 border-[#1973f0]/10 pointer-events-none"
	></div>

	<div
		class="relative flex items-center justify-between border-b-2 border-[#1973f0] bg-[#233248] px-4 py-3"
	>
		<div class="flex items-center gap-2.5">
			<div
				class="flex h-6 w-6 items-center justify-center rounded-sm bg-[#1973f0]/20 text-[#1973f0]"
			>
				<BicepsFlexed size={16} />
			</div>
			<p class="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1973f0]">
				Intelligence Report
			</p>
		</div>
		<div class="flex items-center gap-3">
			<span class="text-[10px] font-bold text-white/40 font-mono text-xs uppercase">Now</span>
			<button
				onclick={() => toast.dismiss(toastId)}
				class="flex h-6 w-6 items-center justify-center rounded bg-transparent text-white/50 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
			>
				<X size={18} />
			</button>
		</div>
	</div>

	<div class="relative p-5">
		<div class="mb-4 flex flex-col gap-1">
			<h3 class="text-xl font-black leading-tight text-white italic tracking-tighter">
				PATTERN DETECTED
			</h3>
			<p class="text-sm font-medium leading-relaxed text-gray-300">
				Welcome back. System analysis indicates that on
				<span
					class="text-white font-bold underline decoration-[#1973f0] decoration-2 underline-offset-4"
					>{currentDay}</span
				>, you typically schedule <span class="text-[#1973f0] font-bold">{eventName}</span> at {eventTime}.
			</p>
		</div>

		<div
			class="mb-5 flex w-full items-center gap-0 rounded-none border-2 border-white/10 bg-black/40 p-3 shadow-inner"
		>
			<div class="flex flex-col gap-1 pr-4 border-r-2 border-white/10">
				<span class="text-[9px] font-bold uppercase text-white/40 tracking-widest">Confidence</span>
				<span class="text-xl font-black text-[#1973f0]">{probability}</span>
			</div>
			<div class="flex flex-1 flex-col justify-center px-4 gap-2">
				<div class="flex justify-between text-[9px] text-white/40 font-mono font-bold">
					<span>08:00</span>
					<span class="text-[#1973f0]">09:00</span>
					<span>10:00</span>
				</div>
				<div class="relative h-3 w-full bg-white/5 border border-white/10">
					<div
						class="absolute left-[35%] h-full w-[25%] bg-[#1973f0] shadow-[0_0_15px_rgba(25,115,240,0.4)]"
					></div>
				</div>
			</div>
		</div>

		<div class="flex items-center gap-3">
			<button
				class="flex flex-1 cursor-pointer items-center justify-center gap-2 border-2 border-black bg-[#1973f0] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-[3px_3px_0px_0px_#000] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:bg-[#125aca]"
			>
				<PlusCircle size={18} />
				<span>Add to Calendar</span>
			</button>
			<button
				onclick={() => toast.dismiss(toastId)}
				class="flex cursor-pointer items-center justify-center border-2 border-[#233248] bg-transparent px-4 py-2.5 text-xs font-black text-white uppercase tracking-wider hover:bg-white/5 transition-colors"
			>
				Dismiss
			</button>
		</div>
	</div>

	<div
		class="h-1.5 w-full bg-[#1973f0] opacity-30"
		style="background-image: radial-gradient(#000 1px, transparent 0); background-size: 4px 4px;"
	></div>
</div>

<style>
	/* Ensure Space Grotesk is used for that technical look */
	:global(.font-display) {
		font-family: 'Space Grotesk', sans-serif;
	}
</style>
