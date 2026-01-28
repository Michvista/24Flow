<script lang="ts">
	import {
		CalendarDays, Plus, School, MapPin, FlaskConical, X, BrainCircuit,
		AlertTriangle, CheckCircle2, Wand2, CloudDownload, Save, History,
		Book, Microscope, Calculator, Music, Palette, Languages, MicroscopeIcon, Map
	} from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import { fade, slide, fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Navbar from '../../../../components/dashboard/Navbar.svelte';

	// Intelligent Icon Logic
	function getIconBySubject(subject: string) {
		const name = subject.toLowerCase();
		if (name.includes('math') || name.includes('calc') || name.includes('algebra') || name.includes('stats')) return Calculator;
		if (name.includes('physio') || name.includes('anatomy') || name.includes('bio') || name.includes('med')) return MicroscopeIcon;
		if (name.includes('hist') || name.includes('map') || name.includes('geog')) return Map;
		if (name.includes('chem') || name.includes('lab') || name.includes('physics')) return FlaskConical;
		if (name.includes('art') || name.includes('design')) return Palette;
		if (name.includes('music') || name.includes('theory')) return Music;
		if (name.includes('lang') || name.includes('eng') || name.includes('span') || name.includes('lit')) return Languages;
		if (name.includes('read') || name.includes('write')) return Book;
		return School;
	}

	// State
	let classes = $state<any[]>([]);
	let conflicts = $state<any[]>([]);
	let isLoading = $state(true);

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

	// LOAD DATA ON REFRESH
	onMount(async () => {
		try {
			const res = await fetch('http://localhost:3000/timetable', { credentials: 'include' });
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
		await fetch('http://localhost:3000/timetable/persist', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify({ classes })
		});
	}

	async function runConflictCheck() {
		const res = await fetch('http://localhost:3000/timetable/check-conflicts', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify({ classes })
		});
		const data = await res.json();
		conflicts = data.conflicts || [];
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

 function acceptAISuggestion(classId: string, suggestion: any) {
	classes = classes.map((c) => {
		if (c.id === classId && suggestion.newStartTime && suggestion.newEndTime) {
			return {
				...c,
				startTime: suggestion.newStartTime,
				endTime: suggestion.newEndTime
			};
		}
		return c;
	});

	conflicts = conflicts.filter((con) => con.class.id !== classId);
	persist();
	runConflictCheck();
}

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
		const res = await fetch('http://localhost:3000/timetable/export/sheets', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify({ classes })
		});

		const json = await res.json();
		if (!json.csv) throw new Error('No CSV returned');

		downloadCSV(json.csv);
	} catch (err) {
		console.error('Export failed:', err);
		alert('Failed to export timetable.');
	}
}



	const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
</script>

<div>
	<Navbar />
</div>

<main class="flex-1 w-full max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-10 flex flex-col gap-8 font-display">
	<section class="flex flex-col lg:flex-row gap-8 items-start justify-between border-b-2 border-dashed border-[#233248] pb-8">
		<div class="space-y-4 max-w-2xl">
			<div class="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 border border-primary text-primary text-[10px] font-bold uppercase tracking-widest rounded-sm">
				<BrainCircuit size={14} class="animate-pulse" />
				AI Icon Selection & Clash Detection Active
			</div>
			<h1 class="text-4xl md:text-6xl font-black leading-[0.95] tracking-tighter uppercase text-white">
				Integrate Class <br />
				<span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Timetable to Calendar</span>
			</h1>
		</div>
		<div class="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
		<button
		disabled={hasConflict || classes.length === 0}
	onclick={exportCSV}
	class="disabled:opacity-50 disabled:cursor-not-allowed bg-[#192434] hover:bg-[#233248] border-2 border-[#233248] text-white font-bold py-3 px-6 rounded-sm transition-all flex items-center justify-center gap-2"
>
	<CloudDownload size={18} /> Export
</button>

			<button class="bg-primary hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-sm shadow-[4px_4px_0px_0px_#fff] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] border-2 border-white transition-all flex items-center justify-center gap-2">
				<Save size={18} /> Sync to Calendar
			</button>
		</div>
	</section>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
		<div class="lg:col-span-2 space-y-8">
			<section class="bg-[#192434] border-2 border-[#233248] p-6 rounded-lg">
				<h3 class="text-xl font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-wide border-b border-[#233248] pb-4">
					<Plus class="text-primary" /> Add New Class Entry
				</h3>
				<div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
					<div class="md:col-span-3 space-y-2">
						<label class="text-[10px] font-bold text-primary uppercase tracking-wider ml-1">Day of Week</label>
						<select bind:value={newClass.day} class="w-full bg-[#111822] border-2 border-[#233248] text-white font-bold h-12 px-4 rounded-sm focus:border-primary outline-none">
							{#each days as day}<option value={day}>{day}</option>{/each}
						</select>
					</div>
					<div class="md:col-span-5 space-y-2">
						<label class="text-[10px] font-bold text-primary uppercase tracking-wider ml-1">Subject Name</label>
						<input bind:value={newClass.name} type="text" placeholder="e.g. Physiology" class="w-full bg-[#111822] border-2 border-[#233248] text-white font-bold h-12 px-4 rounded-sm focus:border-primary outline-none" />
					</div>
					<div class="md:col-span-4 space-y-2">
						<label class="text-[10px] font-bold text-primary uppercase tracking-wider ml-1">Room / Location</label>
						<div class="relative">
							<MapPin size={16} class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
							<input bind:value={newClass.room} type="text" placeholder="Room 402" class="w-full bg-[#111822] border-2 border-[#233248] text-white font-bold h-12 pl-10 pr-4 rounded-sm focus:border-primary outline-none" />
						</div>
					</div>
					<div class="md:col-span-6 grid grid-cols-2 gap-2">
						<div class="space-y-2">
							<label class="text-[10px] font-bold text-primary uppercase tracking-wider ml-1">Start</label>
							<input bind:value={newClass.start} type="time" class="w-full bg-[#111822] border-2 border-[#233248] text-white font-bold h-12 px-2 rounded-sm" />
						</div>
						<div class="space-y-2">
							<label class="text-[10px] font-bold text-primary uppercase tracking-wider ml-1">End</label>
							<input bind:value={newClass.end} type="time" class="w-full bg-[#111822] border-2 border-[#233248] text-white font-bold h-12 px-2 rounded-sm" />
						</div>
					</div>
					<div class="md:col-span-6">
						<button onclick={addClass} class="w-full bg-white hover:bg-slate-200 text-[#192434] font-black h-12 rounded-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[2px_2px_0px_0px_#1973f0] border-2 border-transparent">
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
								<div class="bg-[#111822] border-b-2 border-primary py-2 px-4 flex justify-between items-center">
									<span class="text-white font-black uppercase tracking-widest text-lg">{day}</span>
								</div>
								<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
									{#each classes.filter((c) => c.day === day) as item (item.id)}
										<div animate:flip in:fade out:slide class="bg-[#192434] border-2 border-[#233248] hover:border-primary p-4 rounded-sm relative group transition-all">
											<button onclick={() => removeClass(item.id)} class="absolute top-2 right-2 text-slate-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
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
											<div class="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-wide">
												<MapPin size={12} class="text-primary" /> {item.room}
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

		<div class="lg:col-span-1">
			<div class="sticky top-6 border-2 border-primary bg-[#0d141e] p-6 rounded-lg shadow-[8px_8px_0px_0px_#1973f0]">
				<div class="flex items-center justify-between mb-6">
					<h3 class="text-white font-bold uppercase tracking-wider flex items-center gap-2 text-sm">
						<BrainCircuit class="text-primary" size={20} /> AI Calendar Check
					</h3>
					<span class="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
				</div>

				<div class="space-y-4">
					{#each conflicts as conflict}
						<div in:fly={{ x: 20 }} class="bg-[#192434] border border-red-500/50 p-4 rounded-sm space-y-3">
							<div class="flex items-start gap-3 text-red-400">
								<AlertTriangle size={20} class="shrink-0" />
								<div>
									<h4 class="font-bold text-xs uppercase tracking-wide mb-1">Clash Detected</h4>
								<p class="text-slate-300 text-xs leading-snug">
	<span class="text-white font-bold">
		{conflict.class.name}
	</span>
	({conflict.class.startTime}–{conflict.class.endTime})
	clashes with
	<span class="text-white font-bold">
		{conflict.event.title}
	</span>
	({new Date(conflict.event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}–
	{new Date(conflict.event.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}).
	<br />
	<span class="italic text-slate-400">
		AI suggestion: {conflict.suggestion.reason}
	</span>
</p>

								</div>
							</div>
                            <button 
                                onclick={() => acceptAISuggestion(conflict.class.id, conflict.suggestion)}
                                class="w-full py-2 bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white text-[10px] font-bold uppercase border border-red-500 transition-all"
                            >
                                Apply Suggestion
({conflict.suggestion.newStartTime} – {conflict.suggestion.newEndTime})

                            </button>
						</div>
					{/each}

					<div class="bg-[#192434] border border-green-500/50 p-4 rounded-sm">
						<div class="flex items-start gap-3 text-green-400">
							<CheckCircle2 size={20} class="shrink-0" />
							<div>
								<h4 class="font-bold text-xs uppercase tracking-wide mb-1">Safe to Merge</h4>
								<p class="text-slate-400 text-xs leading-snug">
									{classCount > 0 ? 'Verified staged classes' : 'No classes staged yet'} for sync.
								</p>
							</div>
						</div>
					</div>

					<div class="bg-[#192434] border border-blue-500/30 p-4 rounded-sm">
						<div class="flex items-start gap-3 text-blue-400">
							<Wand2 size={20} class="shrink-0" />
							<div>
								<h4 class="font-bold text-xs uppercase tracking-wide mb-1">Optimization Tip</h4>
								<p class="text-slate-300 text-xs leading-snug">
									You have large gaps on Tuesdays. Auto-fill with study blocks?
								</p>
							</div>
						</div>
					</div>
				</div>

				<div class="mt-8 pt-6 border-t border-[#233248]">
					<div class="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
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