<script lang="ts">
	import {
		Terminal,
		Sparkles,
		Info,
		Bot,
		Check,
		School,
		Dumbbell,
		Clock,
		Activity,
		Loader2
	} from 'lucide-svelte';
	import { fade, slide, fly } from 'svelte/transition';
	import Navbar from '../../../../components/dashboard/Navbar.svelte';
	import { Toaster, toast } from 'svelte-sonner';
	import SonnerToast from '../../../../components/SonnerToast.svelte';
	import type { SvelteComponentTyped } from 'svelte';
	import { PUBLIC_API_URL } from '$env/static/public';

	interface Props {
		token?: string;
	}

	let { token = '' }: Props = $props();

	// State for the input text
	let userInput: string = $state('');
	let isProcessing: boolean = $state(false);

	// Parsed events returned from the AI
	type ComponentCtor = new (...args: any[]) => SvelteComponentTyped<any, any, any>;

	interface ParsedEvent {
		id: number;
		title: string;
		time: string;
		duration: string;
		category: string;
		iconName?: string;
		icon: ComponentCtor;
		priority: string;
		keywords?: string[];
	}

	let parsedEvents: ParsedEvent[] = $state([]);

	function notifySuccess(title: string, message: string) {
		const id = Math.random().toString(36).substring(2, 9);

		toast.custom(SonnerToast, {
			id,
			componentProps: {
				toastId: id,
				title: title,
				message: message,
				type: 'success'
			},
			duration: 5000
		});
	}

	function notifyError(title: string, message: string) {
		const id = Math.random().toString(36).substring(2, 9);

		toast.custom(SonnerToast, {
			id,
			componentProps: {
				toastId: id,
				title: title,
				message: message,
				type: 'error'
			},
			duration: 5000
		});
	}

	async function handleGenerate() {
		if (isProcessing) return; // prevent duplicates
		isProcessing = true;
		try {
			const response = await fetch(`${PUBLIC_API_URL}/ai/tool`, {
				method: 'POST',
				headers: token
					? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
					: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					toolType: 'NATURAL_LANGUAGE',
					payload: { userInput }
				})
			});

			const result = await response.json();

			if (result.status !== 'success' || !Array.isArray(result.data)) {
				throw new Error('Invalid AI response');
			}

			// Map the iconName string to the Lucide component
			const iconMap: Record<string, ComponentCtor> = { School, Clock, Dumbbell, Activity };

			parsedEvents = result.data.map((event: any, idx: number) => ({
				id: event.id ?? Date.now() + idx,
				title: String(event.title ?? 'Untitled'),
				time: String(event.time ?? ''),
				duration: String(event.duration ?? ''),
				category: String(event.category ?? 'General'),
				iconName: event.iconName ?? undefined,
				icon: iconMap[event.iconName] || Activity,
				priority:
					event.priority === 'High'
						? 'High Priority'
						: event.priority === 'Medium'
							? 'Medium Priority'
							: event.priority === 'Low'
								? 'Low Priority'
								: 'Priority Unknown'
			}));

			notifySuccess('Parsed', 'Events parsed successfully');
		} catch (error) {
			console.error('NLP Error:', error);
			parsedEvents = [];
			notifyError('Auto NLP Failed', 'Could not parse your input. Please try again.');
		} finally {
			isProcessing = false;
		}
	}
</script>

<div class="pb-6">
	<Navbar />
	<Toaster position="bottom-right" expand={false} richColors />
</div>
<div class="flex flex-1 pb-6 justify-center py-5 font-display">
	<div class="flex flex-col w-full max-w-[1024px] flex-1 px-4 md:px-8">
		<div class="flex flex-col gap-4 py-10 md:py-16">
			<div class="flex flex-col gap-2">
				<div
					class="inline-flex w-fit items-center gap-2 rounded border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold text-primary uppercase tracking-widest"
				>
					<Sparkles size={14} />
					<span>Natural Language Processing Active</span>
				</div>
				<h1
					class="text-white text-5xl md:text-7xl font-bold leading-tight tracking-tighter uppercase mt-4"
				>
					Tell me your day
				</h1>
				<p
					class="text-gray-400 text-lg md:text-xl font-normal leading-relaxed max-w-[720px] font-mono mt-2"
				>
					Type your plans below naturally. I'll handle the time blocks, conflicts, and
					categorization.
				</p>
			</div>
		</div>

		<div class="flex flex-col gap-6 mb-16">
			<div class="relative group">
				<div
					class="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-600 rounded opacity-20 group-hover:opacity-40 transition duration-500 blur"
				></div>
				<div class="relative">
					<textarea
						bind:value={userInput}
						class="w-full min-h-[200px] bg-[#1e293b] border-2 border-[#233248] rounded p-6 text-lg md:text-2xl text-white placeholder:text-gray-600 focus:border-primary focus:ring-0 focus:outline-none transition-colors font-mono resize-y"
						placeholder="e.g., 'Study math 10-1, lunch with Sarah at 1:30, gym at 5 for an hour'"
					></textarea>
					<div class="absolute bottom-4 right-4 text-xs text-gray-500 font-mono">
						{userInput.length > 0 ? 'READY TO SYNC' : 'AWAITING INPUT'}
					</div>
				</div>
			</div>

			<div class="flex flex-col sm:flex-row gap-4 justify-between items-center">
				<div class="flex items-center gap-2 text-sm text-gray-500">
					<Info size={16} />
					<span>Supports time ranges, specific times, and durations.</span>
				</div>
				<button
					onclick={handleGenerate}
					disabled={isProcessing}
					class="w-full sm:w-auto flex items-center justify-center gap-3 rounded bg-primary hover:bg-blue-600 text-white h-14 px-8 text-base font-bold uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(25,115,240,0.4)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
				>
					{#if isProcessing}
						<Loader2 class="animate-spin" />
						<span>Processing...</span>
					{:else}
						<Bot size={20} />
						<span>Generate Schedule</span>
					{/if}
				</button>
			</div>
		</div>

		<div class="flex flex-col gap-6 pb-20">
			<div class="flex items-center justify-between border-b border-[#233248] pb-4">
				<h2
					class="text-white text-2xl font-bold leading-tight tracking-tight uppercase flex items-center gap-3"
				>
					<Activity class="text-primary" />
					Parsed Events
				</h2>
				<span class="text-xs font-mono text-gray-500 uppercase">
					{parsedEvents.length} Events Detected
				</span>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				{#each parsedEvents as event (event.id)}
					<div
						in:fly={{ y: 20, duration: 400 }}
						class="group relative flex flex-col overflow-hidden rounded border-2 border-[#233248] bg-[#1e293b] transition-all hover:border-primary/50"
					>
						<div
							class="h-32 w-full bg-[#101822] flex items-center justify-center relative overflow-hidden"
						>
							<div class="absolute inset-0 opacity-10 bg-grid-white/[0.2]"></div>
							<event.icon
								size={48}
								class="text-primary/40 group-hover:scale-110 transition-transform duration-500"
							/>
							<div class="absolute bottom-3 right-3">
								<div
									class="bg-black/50 backdrop-blur-sm border border-white/10 px-2 py-1 rounded text-[10px] font-bold uppercase text-white tracking-wider flex items-center gap-1"
								>
									<event.icon size={12} />
									{event.category}
								</div>
							</div>
						</div>

						<div class="flex flex-col gap-3 p-5">
							<div class="flex justify-between items-start">
								<div>
									<h3 class="text-xl font-bold text-white uppercase tracking-tight">
										{event.title}
									</h3>
									<p class="text-primary font-mono text-sm mt-1">{event.time}</p>
								</div>
								<div
									class="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10 text-green-500"
								>
									<Check size={18} />
								</div>
							</div>
							<div class="h-px w-full bg-[#233248]"></div>
							<div class="flex gap-2">
								<span
									class="text-[10px] font-bold text-gray-400 uppercase bg-[#101822] px-2 py-1 rounded border border-[#233248]"
									>{event.duration}</span
								>
								<span
									class="text-[10px] font-bold text-gray-400 uppercase bg-[#101822] px-2 py-1 rounded border border-[#233248]"
									>{event.priority}</span
								>
							</div>
						</div>
					</div>
				{/each}

				{#if parsedEvents.length === 0}
					<div
						class="group relative flex flex-col justify-center items-center overflow-hidden rounded border-2 border-dashed border-[#233248] bg-[#101822]/50 min-h-[250px] transition-all"
					>
						<div class="flex flex-col items-center gap-3 text-gray-500">
							<Loader2 class="animate-pulse" size={32} />
							<p class="text-sm font-mono uppercase tracking-widest text-center px-6">
								{userInput.length > 0 ? 'Analyzing your input...' : 'Waiting for your plans...'}
							</p>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	/* Custom scrollbar matching your theme */
	textarea::-webkit-scrollbar {
		width: 8px;
	}
	textarea::-webkit-scrollbar-track {
		background: #111822;
	}
	textarea::-webkit-scrollbar-thumb {
		background: #233248;
		border-radius: 4px;
	}
	textarea::-webkit-scrollbar-thumb:hover {
		background: #1973f0;
	}

	.bg-grid-white {
		background-image: radial-gradient(circle, #fff 1px, transparent 1px);
		background-size: 20px 20px;
	}
</style>
