<script lang="ts">
	import {
		TriangleAlert,
		Check,
		BrainCircuit,
		Wand2,
		ChevronLeft,
		ChevronRight,
		Loader2,
		AlertCircle,
		RefreshCw
	} from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import Navbar from '../../../../components/dashboard/Navbar.svelte';
	import { onMount } from 'svelte';

		import { Toaster, toast } from 'svelte-sonner';
	import SonnerToast from '../../../../components/SonnerToast.svelte';

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

	// Type definitions
	interface Task {
		id?: number;
		title: string;
		start: number;
		end: number;
		displayStart: number;
		displayEnd: number;
		isoStart?: string;
		isoEnd?: string;
		type?: 'static' | 'conflict';
	}

	interface Conflict {
		id: string;
		summary: string;
		tasks: Task[];
		analysis: string;
		proposals?: Task[];
	}

	// State management
	let isResolved = false;
	let showAnalysis = true;
	let currentConflictIdx = 0;
	let allConflicts: Conflict[] = [];
	let isLoading = true;
	let errorMessage = '';
	let isDetecting = false;

	$: activeConflict = allConflicts[currentConflictIdx];
	$: hasConflicts = allConflicts.length > 0;

	onMount(async () => {
		await fetchConflicts();
	});

	/**
	 * Fetch existing conflicts from database
	 */
	async function fetchConflicts() {
		isLoading = true;
		errorMessage = '';

		try {
			const res = await fetch('http://localhost:3000/conflicts', {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include'
			});

			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`);
			}

			const result = await res.json();

			if (result.status === 'success' && result.data) {
				const conflicts = Array.isArray(result.data) ? result.data : [result.data];
				allConflicts = conflicts.filter((c: Conflict) => c && c.tasks && c.tasks.length > 0);
				notifySuccess('Conflicts Loaded', 'Successfully fetched existing conflicts.');
				if (allConflicts.length > 0) {
					currentConflictIdx = 0;
				}

				if (allConflicts.length === 0) {
					errorMessage = 'No conflicts detected. Your schedule is clear!';
				}
			} else {
				errorMessage = result.message || 'Failed to load conflicts';
			}
		} catch (err) {
			console.error('Failed to load conflicts', err);
			notifyError('Error Loading Conflicts', err instanceof Error ? err.message : 'Failed to load conflicts.');
			errorMessage = err instanceof Error ? err.message : 'Failed to load conflicts';
		} finally {
			isLoading = false;
		}
	}

	/**
	 * Detect new conflicts (scans schedule and creates conflict records)
	 */
	async function detectNewConflicts() {
		isDetecting = true;

		try {
			const res = await fetch('http://localhost:3000/conflicts/detect', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include'
			});

			const result = await res.json();

			if (result.status === 'success') {
				// Refresh the conflict list
				await fetchConflicts();
			} else {
				errorMessage = result.message || 'Failed to detect conflicts';
				notifyError('Error Detecting Conflicts', errorMessage);
			}
		} catch (err) {
			console.error('Failed to detect conflicts', err);
			errorMessage = err instanceof Error ? err.message : 'Failed to detect conflicts';
			notifyError('Failed to detect conflicts', errorMessage);
		} finally {
			isDetecting = false;
		}
	}

	// Dynamic position calculator
	function calculatePosition(task: Task, index: number, totalTasks: number) {
		const pixelsPerMinute = 1.5;
		const horizontalOffset = index * 20;
		const widthAdjustment = index * -5;

		return {
			top: `${8 + task.start * pixelsPerMinute}px`,
			height: `${Math.max((task.end - task.start) * pixelsPerMinute, 45)}px`,
			left: `${8 + horizontalOffset}px`,
			right: `${8 + widthAdjustment}px`,
			zIndex: 10 + index
		};
	}

	// Generate time labels for the timeline
	function getTimeLabels(tasks: Task[]) {
		if (!tasks?.length) {
			return ['08:00', '09:00', '10:00', '11:00'];
		}

		const starts = tasks.map((t) => t.displayStart);
		const ends = tasks.map((t) => t.displayEnd);

		const min = Math.min(...starts);
		const max = Math.max(...ends);

		const startHour = Math.floor(min / 100);
		const endHour = Math.floor(max / 100) + 1;

		const labels: string[] = [];

		for (let h = startHour; h <= endHour; h++) {
			labels.push(`${h.toString().padStart(2, '0')}:00`);
		}

		return labels;
	}

	function formatTime(timeNum: number): string {
		const hours = Math.floor(timeNum / 100);
		const minutes = timeNum % 100;
		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
	}

	async function handleAccept() {
		if (!activeConflict) {
			console.error('No active conflict');
			return;
		}

		isLoading = true;
		try {
			// URL encode the conflict ID to handle # character
			const encodedConflictId = encodeURIComponent(activeConflict.id);
			
			console.log('Accepting conflict:', activeConflict.id);
			console.log('Encoded ID:', encodedConflictId);
			
			const res = await fetch(
				`http://localhost:3000/conflicts/${encodedConflictId}/accept`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include'
				}
			);

			if (!res.ok) {
				const errorText = await res.text();
				console.error('Server response:', res.status, errorText);
				notifyError('Error Applying Resolution', `Failed to apply resolution: ${res.status} ${errorText}`);
				throw new Error(`Failed to apply resolution: ${res.status} ${errorText}`);
			}

			const result = await res.json();

			if (result.status === 'success') {
				isResolved = true;

				// Update with remaining conflicts
				if (result.data?.remainingConflicts) {
					allConflicts = result.data.remainingConflicts;
					currentConflictIdx = 0;
				}
				notifySuccess('Conflict Resolved', 'The proposed fix has been applied successfully, please wait a moment');
				// Show success briefly then refresh
				setTimeout(() => {
					isResolved = false;
					if (allConflicts.length === 0) {
						errorMessage = 'All conflicts resolved! 🎉';
					}
				}, 1000);
			}
		} catch (err) {
			console.error('Failed to apply fix', err);
			notifyError('Error Applying Fix', err instanceof Error ? err.message : 'Failed to apply fix. Please try again.');	
			errorMessage = err instanceof Error ? err.message : 'Failed to apply fix. Please try again.';
		} finally {
			isLoading = false;
		}
	}

	async function handleDecline() {
		if (!activeConflict) {
			console.error('No active conflict');
			return;
		}

		try {
			// URL encode the conflict ID to handle # character
			const encodedConflictId = encodeURIComponent(activeConflict.id);
			
			console.log('Declining conflict:', activeConflict.id);
			console.log('Encoded ID:', encodedConflictId);
			
			const res = await fetch(
				`http://localhost:3000/conflicts/${encodedConflictId}/decline`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include'
				}
			);

			if (!res.ok) {
				const errorText = await res.text();
				console.error('Server response:', res.status, errorText);
				notifyError('Error Declining Resolution', `Failed to decline: ${res.status} ${errorText}`);
				throw new Error(`Failed to decline: ${res.status} ${errorText}`);
			}

			const result = await res.json();

			if (result.status === 'success') {
				// Update with remaining conflicts
				if (result.data?.remainingConflicts) {
					allConflicts = result.data.remainingConflicts;
					currentConflictIdx = 0;
				}

				if (allConflicts.length === 0) {
					errorMessage = 'All conflicts reviewed.';
				}
				notifySuccess('Resolution Declined', 'The proposed resolution has been declined.');
			}
		} catch (err) {
			console.error('Failed to decline', err);
			errorMessage = err instanceof Error ? err.message : 'Failed to decline resolution.';
			notifyError('Error Declining Resolution', err instanceof Error ? err.message : 'Failed to decline resolution.');
		}
	}

	function next() {
		if (currentConflictIdx < allConflicts.length - 1) {
			currentConflictIdx++;
			isResolved = false;
		}
	}

	function prev() {
		if (currentConflictIdx > 0) {
			currentConflictIdx--;
			isResolved = false;
		}
	}
</script>

<div class="pb-6">
	<Navbar />
</div>

<div class="relative z-20 pb-6 w-full max-w-[960px] font-display mx-auto px-4">
	<div class="absolute -inset-1 bg-primary/20 rounded-xl blur-sm -z-10"></div>

	<div
		class="bg-[#111822] border-2 border-primary rounded-lg shadow-[8px_8px_0px_0px_#0e62d8] flex flex-col overflow-hidden"
	>
		{#if isLoading}
			<div class="p-12 flex flex-col items-center justify-center gap-4">
				<Loader2 class="text-primary animate-spin" size={48} />
				<p class="text-slate-400 text-sm">Analyzing your schedule...</p>
			</div>
		{:else if errorMessage}
			<div class="p-12 flex flex-col items-center justify-center gap-4">
				<AlertCircle class="text-green-500" size={48} />
				<p class="text-slate-300 text-lg font-bold">{errorMessage}</p>
				<div class="flex gap-4 mt-4">
					<button
						on:click={fetchConflicts}
						class="px-6 py-2 bg-primary text-white rounded font-bold hover:bg-primary/80 flex items-center gap-2"
					>
						<RefreshCw size={16} />
						Refresh
					</button>
					<button
						on:click={detectNewConflicts}
						disabled={isDetecting}
						class="px-6 py-2 bg-slate-700 text-white rounded font-bold hover:bg-slate-600 flex items-center gap-2 disabled:opacity-50"
					>
						{#if isDetecting}
							<Loader2 size={16} class="animate-spin" />
						{:else}
							<BrainCircuit size={16} />
						{/if}
						{isDetecting ? 'Detecting...' : 'Scan for Conflicts'}
					</button>
				</div>
			</div>
		{:else if hasConflicts && activeConflict}
			<div
				class="bg-[#192434] border-b-2 border-primary p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
			>
				<div class="flex items-center gap-4">
					<div class="bg-red-500/10 border-2 border-red-500 p-2 rounded shrink-0">
						<TriangleAlert class="text-red-500 animate-pulse" size={32} />
					</div>
					<div>
						<h1
							class="text-white text-2xl md:text-3xl font-black uppercase tracking-tight leading-none mb-1"
						>
							{isResolved ? 'Overlap Resolved' : 'Overlap Detected'}
						</h1>
						<div class="flex items-center gap-3">
							<p class="text-slate-400 font-mono text-xs md:text-sm tracking-wide">
								Conflict ID: <span class="text-white">{activeConflict.id}</span> // {activeConflict.summary}
							</p>
							{#if allConflicts.length > 1}
								<div class="flex items-center gap-1 ml-2">
									<button
										on:click={prev}
										disabled={currentConflictIdx === 0}
										class="p-1 hover:bg-white/10 rounded disabled:opacity-20 text-white"
									>
										<ChevronLeft size={24} />
									</button>
									<span class="text-[14px] text-primary font-bold"
										>{currentConflictIdx + 1}/{allConflicts.length}</span
									>
									<button
										on:click={next}
										disabled={currentConflictIdx === allConflicts.length - 1}
										class="p-1 hover:bg-white/10 rounded disabled:opacity-20 text-white"
									>
										<ChevronRight size={24} />
									</button>
								</div>
							{/if}
						</div>
					</div>
				</div>

				<div
					class="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded text-primary text-xs font-bold uppercase tracking-wider"
				>
					<BrainCircuit size={16} class="animate-spin-slow" />
					<span>AI Active Resolution</span>
				</div>
			</div>

			<div class="p-6 md:p-8 flex flex-col gap-8">
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
					<div class="hidden lg:block absolute left-1/2 top-4 bottom-4 w-px bg-[#233248]"></div>

					<!-- Current State -->
					<div class="flex flex-col gap-3">
						<div class="flex justify-between items-end border-b border-[#233248] pb-2 mb-2">
							<h3 class="text-red-400 font-bold uppercase tracking-wide text-sm">Current State</h3>
							<span class="text-red-400/60 text-xs font-mono">Collision Cluster</span>
						</div>

						<!-- Added max-height and overflow-y-auto for scrolling -->
						<div
							class="relative h-64 max-h-96 bg-[#0b1016] border-2 border-red-500/30 border-dashed rounded overflow-y-auto overflow-x-hidden"
						>
							<!-- Time labels -->
							<div
								class="sticky left-0 top-0 bottom-0 w-12 border-r border-[#233248]/50 flex flex-col justify-between py-2 text-[10px] text-slate-500 font-mono text-center bg-[#0b1016] z-10"
							>
								{#each getTimeLabels(activeConflict.tasks) as label}
									<span class="py-1">{label}</span>
								{/each}
							</div>

							<!-- Tasks - now in scrollable container -->
							<div class="absolute inset-y-0 left-12 right-0 p-2" style="min-height: 300px;">
								{#each activeConflict.tasks as task, i}
									{@const pos = calculatePosition(task, i, activeConflict.tasks.length)}
									<div
										class="absolute border-2 rounded p-3 transition-all duration-500 {task.type ===
										'static'
											? 'bg-[#1f2937] border-slate-600 opacity-60'
											: 'bg-[#2d1b1b] border-red-500 shadow-lg'}"
										style="top: {pos.top}; left: {pos.left}; right: {pos.right}; height: {pos.height}; z-index: {pos.zIndex}; {task.type ===
										'conflict'
											? 'background-image: repeating-linear-gradient(-45deg, rgba(239,68,68,0.1) 0px, rgba(239,68,68,0.1) 10px, rgba(239,68,68,0.2) 10px, rgba(239,68,68,0.2) 20px);'
											: ''}"
									>
										<div class="flex items-center gap-2">
											{#if task.type === 'conflict'}
												<TriangleAlert size={14} class="text-red-500" />
											{/if}
											<span class="text-white text-xs font-bold uppercase truncate"
												>{task.title}</span
											>
										</div>
										<div class="text-[10px] text-slate-400 mt-1">
											{formatTime(task.displayStart)} - {formatTime(task.displayEnd)}
										</div>
										{#if task.type === 'conflict'}
											<div
												class="mt-2 bg-red-500/20 text-red-200 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded w-fit border border-red-500/50"
											>
												Overlap
											</div>
										{/if}
									</div>
								{/each}
							</div>
						</div>
					</div>

					<!-- AI Proposal -->
					<div class="flex flex-col gap-3">
						<div class="flex justify-between items-end border-b border-primary/30 pb-2 mb-2">
							<h3
								class="text-primary font-bold uppercase tracking-wide text-sm flex items-center gap-2"
							>
								AI Proposal
								<span
									class="px-1.5 py-0.5 rounded bg-primary text-white text-[10px] shadow-[2px_2px_0_0_rgba(255,255,255,0.2)]"
									>OPTIMIZED</span
								>
							</h3>
						</div>

						<!-- Added max-height and overflow-y-auto for scrolling -->
						<div
							class="relative h-64 max-h-96 bg-[#0b1016] border-2 border-primary rounded shadow-[inset_0_0_20px_rgba(14,98,216,0.1)] overflow-y-auto overflow-x-hidden"
						>
							<div
								class="sticky left-0 top-0 bottom-0 w-12 border-r border-[#233248]/50 flex flex-col justify-between py-2 text-[10px] text-slate-500 font-mono text-center bg-[#111822] z-10"
							>
								{#each getTimeLabels(activeConflict.proposals || []) as label}
									<span class="py-1">{label}</span>
								{/each}
							</div>

							<div class="absolute inset-y-0 left-12 right-0 p-2 flex flex-col gap-2">
								{#if activeConflict.proposals}
									{#each activeConflict.proposals as task, i}
										<div
											class="w-full bg-primary/10 border-2 border-primary/40 rounded p-3 flex items-center justify-between {isResolved
												? 'border-green-500 bg-green-500/10'
												: ''}"
										>
											<div class="flex-1 min-w-0">
												<span class="text-white text-xs font-bold block truncate"
													>{task.title}</span
												>
												<span class="text-[10px] text-primary font-mono block">
													{isResolved ? 'Scheduled' : 'Optimized Slot'}: {formatTime(
														task.displayStart
													)}
													- {formatTime(task.displayEnd)}
												</span>
											</div>
											<div
												class="size-6 rounded-full bg-primary flex items-center justify-center shrink-0 ml-2 {isResolved
													? 'bg-green-500'
													: ''}"
											>
												<Check size={14} class="text-white" />
											</div>
										</div>
									{/each}
								{/if}
							</div>
						</div>
					</div>
				</div>

				{#if showAnalysis}
					<div
						transition:slide
						class="bg-[#0b1016] border border-[#233248] rounded flex flex-col md:flex-row overflow-hidden"
					>
						<div
							class="p-4 bg-[#192434] border-b md:border-b-0 md:border-r border-[#233248] flex items-center gap-3 md:w-48 shrink-0"
						>
							<BrainCircuit size={18} class="text-slate-400" />
							<span class="text-slate-300 text-xs font-bold uppercase">Analysis Logic</span>
						</div>
						<div class="p-4 flex-1 font-mono text-sm leading-relaxed text-slate-300">
							<p><span class="text-primary mr-2">></span> {activeConflict.analysis}</p>
						</div>
					</div>
				{/if}

				<div
					class="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-4 pt-6 border-t-2 border-[#233248] mt-2"
				>
					<button
						on:click={handleDecline}
						class="px-8 py-3 rounded border-2 border-slate-600 text-slate-300 font-bold uppercase tracking-wider hover:bg-slate-800 transition-all"
					>
						Decline
					</button>
					<button
						on:click={handleAccept}
						disabled={isResolved || isLoading}
						class="relative group px-10 py-3 rounded bg-primary border-2 border-primary text-white font-bold uppercase tracking-wider shadow-[4px_4px_0px_0px_#0e62d8] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{#if isLoading}
							<Loader2 size={20} class="animate-spin" />
							<span>Applying...</span>
						{:else}
							<span>{isResolved ? 'Fix Applied' : 'Accept Fix'}</span>
							<Wand2 size={20} class="group-hover:rotate-12 transition-transform" />
						{/if}
					</button>
				</div>
			</div>
		{/if}
	</div>
</div>
<Toaster position="bottom-right" expand={false} richColors />

<style>
	:global(.animate-spin-slow) {
		animation: spin 3s linear infinite;
	}
	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	/* Custom scrollbar styling */
	:global(.overflow-y-auto::-webkit-scrollbar) {
		width: 8px;
	}

	:global(.overflow-y-auto::-webkit-scrollbar-track) {
		background: #0b1016;
		border-radius: 4px;
	}

	:global(.overflow-y-auto::-webkit-scrollbar-thumb) {
		background: #233248;
		border-radius: 4px;
	}

	:global(.overflow-y-auto::-webkit-scrollbar-thumb:hover) {
		background: #2d3e56;
	}
</style>