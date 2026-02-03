<script lang="ts">
	import {
		CalendarDays,
		Plus,
		School,
		MapPin,
		FlaskConical,
		X,
		BrainCircuit,
		AlertTriangle,
		CheckCircle2,
		Wand2,
		CloudDownload,
		Save,
		History,
		Book,
		Microscope,
		Calculator,
		Music,
		Palette,
		Languages,
		MicroscopeIcon,
		Map
	} from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import { fade, slide, fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Navbar from '../../../../components/dashboard/Navbar.svelte';
	import { Toaster, toast } from 'svelte-sonner';
	import SonnerToast from '../../../../components/SonnerToast.svelte';
	import { PUBLIC_API_URL } from '$env/static/public';

	interface Props {
		token?: string;
	}

	let { token = '' }: Props = $props();

	// Intelligent Icon Logic
	function getIconBySubject(subject: string) {
		const name = subject.toLowerCase();
		if (
			name.includes('math') ||
			name.includes('calc') ||
			name.includes('algebra') ||
			name.includes('stats')
		)
			return Calculator;
		if (
			name.includes('physio') ||
			name.includes('anatomy') ||
			name.includes('bio') ||
			name.includes('med')
		)
			return MicroscopeIcon;
		if (name.includes('hist') || name.includes('map') || name.includes('geog')) return Map;
		if (name.includes('chem') || name.includes('lab') || name.includes('physics'))
			return FlaskConical;
		if (name.includes('art') || name.includes('design')) return Palette;
		if (name.includes('music') || name.includes('theory')) return Music;
		if (
			name.includes('lang') ||
			name.includes('eng') ||
			name.includes('span') ||
			name.includes('lit')
		)
			return Languages;
		if (name.includes('read') || name.includes('write')) return Book;
		return School;
	}

	// State
	let classes = $state<any[]>([]);
	let conflicts = $state<any[]>([]);
	let isLoading = $state(true);
	let isCheckingConflicts = $state(false);
	let isSyncingCalendar = $state(false);

	let optimizationTips = $state<any[]>([]);
	let ignoredConflicts = $state(false);

	let newClass = $state({
		day: 'Monday',
		name: '',
		start: '09:00',
		end: '10:30',
		room: ''
	});

	type ClassEntry = {
		id: string;
		day: string;
		name: string;
		startTime: string;
		endTime: string;
		room: string;
		icon: any;
	};

	// Derived
	let hasConflict = $derived(conflicts.length > 0);
	let classCount = $derived(classes.length);

	let hasConflicts = $derived(conflicts.length > 0);
	let canMerge = $derived(
		!isCheckingConflicts && !isSyncingCalendar && !hasConflicts && classes.length > 0
	);

	async function runConflictCheck() {
		try {
			isCheckingConflicts = true;
			conflicts = []; // clear old state so UI doesn't lie

			const res = await fetch(`${PUBLIC_API_URL}/timetable/check-conflicts`, {
				method: 'POST',
				headers: token
					? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
					: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ classes })
			});

			const data = await res.json();
			conflicts = data.conflicts || [];
			optimizationTips = data.tips || [];
		} catch (err) {
			console.error('Conflict check failed:', err);
			const message = err instanceof Error ? err.message : String(err);
			notifyError('Conflict check failed', message);
		} finally {
			isCheckingConflicts = false;
		}
	}

	// LOAD DATA ON REFRESH
	onMount(async () => {
		try {
			const res = await fetch(`${PUBLIC_API_URL}/timetable`, {
				headers: token ? { Authorization: `Bearer ${token}` } : {}
			});
			if (res.ok) {
				const json = await res.json();
				const data = json.data;

				classes = data.map((c: any) => ({
					id: c.id,
					day: c.day,
					name: c.name,
					startTime: c.startTime,
					endTime: c.endTime,
					room: c.room,
					icon: getIconBySubject(c.name)
				}));

				runConflictCheck();
			}
		} finally {
			isLoading = false;
		}
	});

	// AUTO-SAVE LOGIC
	async function persist() {
		await fetch(`${PUBLIC_API_URL}/timetable/persist`, {
			method: 'POST',
			headers: token
				? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
				: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ classes })
		});
	}

	function addClass() {
		if (!newClass.name) return;

		const entry = {
			id: crypto.randomUUID(),
			day: newClass.day,
			name: newClass.name,
			startTime: newClass.start,
			endTime: newClass.end,
			room: newClass.room || 'TBA',
			icon: getIconBySubject(newClass.name)
		};

		classes = [...classes, entry];
		newClass.name = '';
		newClass.room = '';

		persist();
		runConflictCheck();
	}

	function removeClass(id: string) {
		classes = classes.filter((c) => c.id !== id);
		persist();
		runConflictCheck();
	}

	//  function acceptAISuggestion(classId: string, suggestion: any) {
	// 	classes = classes.map((c) => {
	// 		if (c.id === classId && suggestion.newStartTime && suggestion.newEndTime) {
	// 			return {
	// 				...c,
	// 				startTime: suggestion.newStartTime,
	// 				endTime: suggestion.newEndTime
	// 			};
	// 		}
	// 		return c;
	// 	});

	// 	conflicts = conflicts.filter((con) => con.class.id !== classId);
	// 	persist();
	// 	runConflictCheck();
	// }

	function downloadCSV(csvText: string) {
		const blob = new Blob([csvText], { type: 'text/csv;charset=utf-8;' });
		const url = URL.createObjectURL(blob);

		const link = document.createElement('a');
		link.href = url;
		link.download = 'timetable.csv';
		link.click();

		URL.revokeObjectURL(url);
	}

	async function exportCSV() {
		try {
			const res = await fetch(`${PUBLIC_API_URL}/timetable/export/sheets`, {
				method: 'POST',
				headers: token
					? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
					: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ classes })
			});

			const json = await res.json();
			if (!json.csv) throw new Error('No CSV returned');

			downloadCSV(json.csv);
		} catch (err) {
			console.error('Export failed:', err);
			const message = err instanceof Error ? err.message : String(err);
			notifyError('Export failed', message);
		}
	}

	async function syncToCalendar() {
		if (classes.length === 0) {
			notifyError('No classes', 'Add some classes first!');
			return;
		}

		try {
			isSyncingCalendar = true;

			const res = await fetch(`${PUBLIC_API_URL}/timetable/sync-calendar`, {
				method: 'POST',
				headers: token
					? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
					: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ classes })
			});

			if (!res.ok) {
				const errData = await res.json();
				throw new Error(errData.error || 'Sync failed');
			}

			const data = await res.json();
			notifySuccess(
				'Sync complete',
				`Success! ${data.count} classes synced to your calendar for the next 12 weeks.`
			);
		} catch (err) {
			console.error('Frontend Sync Error:', err);
			const message = err instanceof Error ? err.message : String(err);
			notifyError('Sync failed', message);
		} finally {
			isSyncingCalendar = false; // Fixed: must set to false to re-enable button
		}
	}

	async function applyOption(conflict: any, option: any) {
		if (option.target === 'CLASS') {
			classes = classes.map((c) => {
				if (c.id === conflict.class.id) {
					return {
						...c,
						startTime: option.newStartTime,
						endTime: option.newEndTime
					};
				}
				return c;
			});

			// Classes are local state, so we persist and check immediately
			await persist();
			await runConflictCheck();
		}

		if (option.target === 'EVENT') {
			try {
				const response = await fetch(`${PUBLIC_API_URL}/events/${conflict.event.id}/reschedule`, {
					method: 'POST',
					headers: token
						? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
						: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						newStartTime: option.newStartTime,
						newEndTime: option.newEndTime
					})
				});

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.error || 'Failed to move event');
				}

				// ONLY run this after the fetch is 100% successful
				await runConflictCheck();
			} catch (err) {
				console.error('Failed to move event', err);
				const message = err instanceof Error ? err.message : String(err);
				notifyError('Failed to move event', message);
				return; // Exit so we don't clear the conflict from UI if it failed
			}
		}

		// Remove the resolved conflict from the UI array
		conflicts = conflicts.filter(
			(c) => !(c.class.id === conflict.class.id && c.event.id === conflict.event.id)
		);
	}

	const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

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
</script>

<div>
	<Navbar />
	<Toaster position="bottom-right" expand={false} richColors />
</div>

<main
	class="flex-1 w-full max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-10 flex flex-col gap-8 font-display"
>
	<section
		class="flex flex-col lg:flex-row gap-8 items-start justify-between border-b-2 border-dashed border-[#233248] pb-8"
	>
		<div class="space-y-4 max-w-2xl">
			<div
				class="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 border border-primary text-primary text-[10px] font-bold uppercase tracking-widest rounded-sm"
			>
				<BrainCircuit size={14} class="animate-pulse" />
				AI Icon Selection & Clash Detection Active
			</div>
			<h1
				class="text-4xl md:text-6xl font-black leading-[0.95] tracking-tighter uppercase text-white"
			>
				Integrate Class <br />
				<span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400"
					>Timetable to Calendar</span
				>
			</h1>
		</div>
		<div class="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
			<button
				disabled={hasConflicts && !ignoredConflicts}
				onclick={exportCSV}
				class="disabled:opacity-50 disabled:cursor-not-allowed bg-[#192434] hover:bg-[#233248] border-2 border-[#233248] text-white font-bold py-3 px-6 rounded-sm transition-all flex items-center justify-center gap-2"
			>
				<CloudDownload size={18} /> Export
			</button>

			<button
				onclick={syncToCalendar}
				disabled={isCheckingConflicts || isSyncingCalendar || (hasConflicts && !ignoredConflicts)}
				class="disabled:opacity-40 disabled:cursor-not-allowed bg-primary hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-sm shadow-[4px_4px_0px_0px_#fff] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] border-2 border-white transition-all flex items-center justify-center gap-2"
			>
				<Save size={18} /> Sync to Calendar
			</button>
		</div>
	</section>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
		<div class="lg:col-span-2 space-y-8">
			<section class="bg-[#192434] border-2 border-[#233248] p-6 rounded-lg">
				<h3
					class="text-xl font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-wide border-b border-[#233248] pb-4"
				>
					<Plus class="text-primary" /> Add New Class Entry
				</h3>
				<div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
					<div class="md:col-span-3 space-y-2">
						<label
							for="day-select"
							class="text-[10px] font-bold text-primary uppercase tracking-wider ml-1"
							>Day of Week</label
						>
						<select
							id="day-select"
							bind:value={newClass.day}
							class="w-full bg-[#111822] border-2 border-[#233248] text-white font-bold h-12 px-4 rounded-sm focus:border-primary outline-none"
						>
							{#each days as day}<option value={day}>{day}</option>{/each}
						</select>
					</div>
					<div class="md:col-span-5 space-y-2">
						<label
							for="subject-name"
							class="text-[10px] font-bold text-primary uppercase tracking-wider ml-1"
							>Subject Name</label
						>
						<input
							id="subject-name"
							bind:value={newClass.name}
							type="text"
							placeholder="e.g. Physiology"
							class="w-full bg-[#111822] border-2 border-[#233248] text-white font-bold h-12 px-4 rounded-sm focus:border-primary outline-none"
						/>
					</div>
					<div class="md:col-span-4 space-y-2">
						<label
							for="room-location"
							class="text-[10px] font-bold text-primary uppercase tracking-wider ml-1"
							>Room / Location</label
						>
						<div class="relative">
							<MapPin size={16} class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
							<input
								id="room-location"
								bind:value={newClass.room}
								type="text"
								placeholder="Room 402"
								class="w-full bg-[#111822] border-2 border-[#233248] text-white font-bold h-12 pl-10 pr-4 rounded-sm focus:border-primary outline-none"
							/>
						</div>
					</div>
					<div class="md:col-span-6 grid grid-cols-2 gap-2">
						<div class="space-y-2">
							<label
								for="start-time"
								class="text-[10px] font-bold text-primary uppercase tracking-wider ml-1"
								>Start</label
							>
							<input
								id="start-time"
								bind:value={newClass.start}
								type="time"
								class="w-full bg-[#111822] border-2 border-[#233248] text-white font-bold h-12 px-2 rounded-sm"
							/>
						</div>
						<div class="space-y-2">
							<label
								for="end-time"
								class="text-[10px] font-bold text-primary uppercase tracking-wider ml-1">End</label
							>
							<input
								id="end-time"
								bind:value={newClass.end}
								type="time"
								class="w-full bg-[#111822] border-2 border-[#233248] text-white font-bold h-12 px-2 rounded-sm"
							/>
						</div>
					</div>
					<div class="md:col-span-6">
						<button
							onclick={addClass}
							class="w-full bg-white hover:bg-slate-200 text-[#192434] font-black h-12 rounded-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[2px_2px_0px_0px_#1973f0] border-2 border-transparent"
						>
							Add Class to Schedule
						</button>
					</div>
				</div>
			</section>

			<section>
				<div class="space-y-8">
					{#each days as day}
						{#if classes.filter((c) => c.day === day).length > 0}
							<div class="flex flex-col gap-3" transition:slide>
								<div
									class="bg-[#111822] border-b-2 border-primary py-2 px-4 flex justify-between items-center"
								>
									<span class="text-white font-black uppercase tracking-widest text-lg">{day}</span>
								</div>
								<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
									{#each classes.filter((c) => c.day === day) as item (item.id)}
										<div
											animate:flip
											in:fade
											out:slide
											class="bg-[#192434] border-2 border-[#233248] hover:border-primary p-4 rounded-sm relative group transition-all"
										>
											<button
												onclick={() => removeClass(item.id)}
												class="absolute top-2 right-2 text-slate-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
											>
												<X size={18} />
											</button>
											<div class="text-primary text-xs font-bold mb-1">
												{item.startTime} – {item.endTime}
											</div>

											<div class="flex items-center gap-3 mb-2">
												<div class="p-2 bg-primary/10 rounded">
													<item.icon size={20} class="text-primary" />
												</div>
												<h4 class="text-white font-bold text-lg leading-tight">{item.name}</h4>
											</div>
											<div
												class="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-wide"
											>
												<MapPin size={12} class="text-primary" />
												{item.room}
											</div>
										</div>
									{/each}
								</div>
							</div>
						{/if}
					{/each}
				</div>
			</section>
		</div>

		<div class="lg:col-span-1 sticky top-6">
			<div
				class="sticky top-6 border-2 border-primary bg-[#0d141e] p-6 rounded-lg shadow-[8px_8px_0px_0px_#1973f0]"
			>
				<div class="flex items-center justify-between mb-6">
					<h3 class="text-white font-bold uppercase tracking-wider flex items-center gap-2 text-sm">
						<BrainCircuit class="text-primary" size={20} /> AI Calendar Check
					</h3>
					<span class="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
				</div>
				<div class="space-y-4">
					{#if isCheckingConflicts}
						<div class="bg-[#192434] border border-primary/40 p-4 rounded-sm animate-pulse">
							<div class="flex items-center gap-3 text-primary">
								<BrainCircuit size={20} class="animate-spin" />
								<div>
									<h4 class="font-bold text-[10px] uppercase tracking-widest">
										AI Reviewing Schedule
									</h4>
									<p class="text-slate-400 text-[11px]">
										Analyzing overlaps and generating strategies...
									</p>
								</div>
							</div>
						</div>
					{/if}

					{#if !isCheckingConflicts}
						{#each conflicts as conflict (conflict.class.id + conflict.event.id)}
							<div
								in:fly={{ x: 20 }}
								class="bg-[#192434] border-l-4 border-red-500 p-4 rounded-sm space-y-4 shadow-xl"
							>
								<div class="flex items-start gap-3 text-red-400">
									<AlertTriangle size={18} class="shrink-0 mt-0.5" />
									<div class="space-y-1">
										<h4 class="font-black text-[10px] uppercase tracking-tighter text-red-500">
											Scheduling Conflict
										</h4>
										<p class="text-slate-200 text-xs leading-relaxed">
											<span class="text-white font-bold">{conflict.class.name}</span>
											<span class="text-slate-400"
												>({conflict.class.startTime}–{conflict.class.endTime})</span
											>
											<br />
											<span class="text-red-400/80 font-medium">overlaps with existing event:</span>
											<br />
											<span class="text-white font-bold">{conflict.event.title}</span>
											<span class="text-slate-400">
												({new Date(conflict.event.startTime).toLocaleTimeString([], {
													hour: '2-digit',
													minute: '2-digit'
												})}–{new Date(conflict.event.endTime).toLocaleTimeString([], {
													hour: '2-digit',
													minute: '2-digit'
												})})
											</span>
										</p>
									</div>
								</div>

								<div class="bg-black/30 p-3 rounded border border-white/5">
									<div class="flex items-center gap-2 mb-1">
										<BrainCircuit size={14} class="text-primary" />
										<span class="text-[10px] font-bold text-primary uppercase">AI Strategy</span>
									</div>
									<p class="text-[11px] text-slate-300 italic leading-snug">
										"{conflict.suggestion.strategy || conflict.suggestion.reason}"
									</p>
								</div>

								<div class="grid grid-cols-1 gap-2 pt-2">
									{#each conflict.suggestion.options as option}
										<button
											onclick={() => applyOption(conflict, option)}
											class="group relative w-full py-2.5 px-3 border text-[10px] uppercase font-black transition-all overflow-hidden
                                {option.target === 'EVENT'
												? 'border-blue-500/50 text-blue-400 hover:bg-blue-500 hover:text-white'
												: 'border-yellow-500/50 text-yellow-500 hover:bg-yellow-500 hover:text-black'}"
										>
											<div class="flex justify-between items-center relative z-10">
												<span>Move {option.target === 'EVENT' ? 'Calendar Event' : 'Class'}</span>
												<span class="opacity-80 font-mono"
													>{option.newStartTime} → {option.newEndTime}</span
												>
											</div>
											<div
												class="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity bg-current"
											></div>
										</button>
									{/each}
								</div>
							</div>
						{/each}

						{#if hasConflicts}
							<button
								onclick={() => (ignoredConflicts = true)}
								class="w-full text-center text-[10px] text-slate-500 hover:text-slate-300 underline uppercase tracking-widest mt-2 transition-colors"
							>
								Ignore conflicts and force sync
							</button>
						{/if}

						{#if canMerge}
							<div in:fade class="bg-[#192434] border border-green-500/50 p-4 rounded-sm">
								<div class="flex items-start gap-3 text-green-400">
									<CheckCircle2 size={20} class="shrink-0" />
									<div>
										<h4 class="font-bold text-xs uppercase tracking-wide mb-1">Safe to Merge</h4>
										<p class="text-slate-400 text-xs leading-snug">
											{classCount} classes verified and ready to sync.
										</p>
									</div>
								</div>
							</div>
						{/if}

						{#if optimizationTips.length > 0}
							<div in:fade class="bg-[#192434] border border-blue-500/30 p-4 rounded-sm">
								<div class="flex items-start gap-3 text-blue-400">
									<Wand2 size={20} class="shrink-0" />
									<div>
										<h4 class="font-bold text-xs uppercase tracking-wide mb-1">Optimization Tip</h4>
										<p class="text-slate-300 text-xs leading-snug">
											Large gap on {optimizationTips[0].day} between
											{optimizationTips[0].from}–{optimizationTips[0].to}
										</p>
									</div>
								</div>
							</div>
						{/if}
					{/if}
				</div>

				<div class="mt-8 pt-6 border-t border-[#233248]">
					<div
						class="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2"
					>
						<span>Main Calendar Status</span>
						<span class="text-green-500">Connected</span>
					</div>
					<div class="h-1 w-full bg-[#192434] rounded-full overflow-hidden">
						<div class="h-full bg-primary w-full animate-pulse"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	input[type='time']::-webkit-calendar-picker-indicator {
		filter: invert(100%);
		cursor: pointer;
	}
</style>
