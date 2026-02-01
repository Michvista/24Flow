<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import {
		LayoutDashboard,
		LogOut,
		Menu,
		ChevronLeft,
		ChevronRight,
		Edit3,
		Save,
		X,
		FileDown,
		Plus
	} from 'lucide-svelte';

	// Components
	import WeekView from '../../../../../components/dashboard/StudyTimetable/WeekView.svelte';
	import DayView from '../../../../../components/dashboard/StudyTimetable/DayView.svelte';
	import ListView from '../../../../../components/dashboard/StudyTimetable/ListView.svelte';
	import Sidebar from '../../../../../components/dashboard/StudyTimetable/Sidebar.svelte';
	import AddTaskModal from '../../../../../components/modal/AddTaskModal.svelte';

	import type { Task, BacklogItem } from '$lib/types';
	import { page } from '$app/stores';

	import { Toaster, toast } from 'svelte-sonner';
	import SonnerToast from '../../../../../components/SonnerToast.svelte';

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

	// --- State ---
	let currentView = $state('weekly');
	let isEditMode = $state(false);
	let weekOffset = $state(0);
	let currentDayIndex = $state(0); // For day view
	let isSidebarOpen = $state(false);
	let showDetailedModal = $state(false);
	let modalInitial = $state<any>(null);
	let showCreateModal = $state(false);
	let isHeaderSticky = $state(false);
	let scheduleDataBackup = $state<Task[]>([]);

	// Plan id (set on mount)
	let planId = $state<string>('');

	// Scroll detection for sticky header
	let mainContent = $state<HTMLElement>();

	onMount(() => {
		if (!mainContent) return;
		const node = mainContent;
		const handler = () => {
			isHeaderSticky = node.scrollTop > 20;
		};
		node.addEventListener('scroll', handler);
		return () => node.removeEventListener('scroll', handler);
	});

	// --- Rich Dummy Data ---
	let scheduleData = $state<Task[]>([]);

	let tips = $state<string[]>([]);

	let isLoading = $state(true);
	let errorMessage = $state('');

	let backlog = $state<BacklogItem[]>([
		{
			id: 101,
			title: 'Linear Algebra Review',
			type: 'Math',
			duration: '1h',
			color: 'bg-primary',
			subColor: 'text-blue-200'
		},
		{
			id: 102,
			title: 'Cite Sources for Essay',
			type: 'History',
			duration: '45m',
			color: 'bg-[#6d28d9]',
			subColor: 'text-purple-200'
		}
	]);

	let newTask = $state({ title: '', type: 'Deep Work', duration: '1h', color: 'bg-primary' });

	const hours24 = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0') + ':00');
// --- Edit Mode Handlers ---
    function enterEditMode() {
        // Deep copy to backup
        scheduleDataBackup = JSON.parse(JSON.stringify(scheduleData));
        isEditMode = true;
    }

    function cancelEdit() {
        // Just restore the local state and close the mode. 
        // No need to persist to backend on a "Cancel" action.
        scheduleData = JSON.parse(JSON.stringify(scheduleDataBackup));
        isEditMode = false;
        notifySuccess('Cancelled', 'Changes discarded');
    }

    async function saveEdit() {
        try {
            await persistSchedule();
            notifySuccess('Saved', 'Your changes were saved');
        } catch (err: any) {
            console.error('SaveEdit failed', err);
        } finally {
            isEditMode = false;
        }
    }

    // --- Handlers ---
    async function handleDetailedAdd(data: any) {
        const id = Math.random(); // Note: Better to use crypto.randomUUID() for strings
        const dateObj = new Date(data.date);
        let dayIdx = dateObj.getDay() - 1;
        if (dayIdx === -1) dayIdx = 6;
        const formattedTime = data.startTime.split(':')[0] + ':00';

        const newTaskObj: Task = {
            id: id, // if Task id is string, use String(id)
            week: weekOffset,
            day: dayIdx,
            time: formattedTime,
            title: data.title,
            type: data.subject || data.type,
            duration: data.duration + 'm',
            color: 'bg-primary',
            subColor: 'text-blue-200',
            description: data.description
        };

        scheduleData = [...scheduleData, newTaskObj];

        try {
            await persistSchedule();
            notifySuccess('Added', 'Task added to your schedule');
        } catch (err: any) {
            console.error('Persist add failed', err);
        }
    }

    // FIX: Added type 'string | number' to handle both formats
    async function handleDelete(id: string | number) {
        scheduleData = scheduleData.filter((i) => i.id !== id);

        try {
            await persistSchedule();
            notifySuccess('Deleted', 'Task removed from schedule');
        } catch (err: any) {
            console.error('Persist delete failed', err);
        }
    }

    // --- Drag & Drop ---
    let draggedItem = $state<any>(null);

    // FIX: Added types to 'item' and 'source'
    function onDragStart(event: DragEvent, item: any, source: 'backlog' | 'calendar') {
        draggedItem = { ...item, source };
        try {
            if (event.dataTransfer) {
                event.dataTransfer.effectAllowed = 'move';
                event.dataTransfer.setData('application/json', JSON.stringify({ id: item.id, source }));
            }
        } catch (err) { /* ignore */ }
    }

    async function onDrop(event: DragEvent, day: number, time: string) {
        event.preventDefault();
        if (!draggedItem) return;
        
        // Remove from old position if it was already on the calendar
        if (draggedItem.source === 'calendar') {
            scheduleData = scheduleData.filter((i) => i.id !== draggedItem.id);
        }
        
        scheduleData = [
            ...scheduleData,
            {
                ...draggedItem,
                id: Math.random(),
                week: weekOffset,
                day,
                time
            }
        ];
        isSidebarOpen = false;
        draggedItem = null;

        try {
            await persistSchedule();
            notifySuccess('Moved', 'Task moved and saved');
        } catch (err: any) {
            console.error('Persist drop failed', err);
        }
    }

    async function persistSchedule() {
        if (!planId) {
            notifyError('Save Failed', 'No plan id available');
            throw new Error('Missing planId');
        }
        const res = await fetch(`http://localhost:3000/study-plans/${planId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ schedule: { tasks: scheduleData, backlog } })
        });

        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || 'Failed to persist');
        return json.plan;
    }
	// Helpers
	const getDayDate = (dayIndex: number) => {
		const d = new Date();
		const day = d.getDay();
		const diff = d.getDate() - day + (day === 0 ? -6 : 1);
		const date = new Date(d.setDate(diff));
		date.setDate(date.getDate() + weekOffset * 7 + dayIndex);
		return date;
	};

	const formatDateRange = $derived(() => {
		const start = getDayDate(0);
		const end = getDayDate(6);
		return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
	});

	const getCurrentDayDate = $derived(() => {
		return getDayDate(currentDayIndex);
	});

	// Calculate week number based on year start
	const getWeekNumber = $derived(() => {
		const startDate = getDayDate(0);
		const yearStart = new Date(startDate.getFullYear(), 0, 1);
		const diff = startDate.getTime() - yearStart.getTime();
		const oneWeek = 1000 * 60 * 60 * 24 * 7;
		return Math.ceil(diff / oneWeek);
	});

	async function createTask() {
		const id = Math.random();
		backlog = [...backlog, { ...newTask, id, subColor: 'text-white/70' }];
		showCreateModal = false;
		newTask = { title: '', type: 'Deep Work', duration: '1h', color: 'bg-primary' };

		try {
			await persistSchedule();
			notifySuccess('Added', 'Backlog item saved');
		} catch (err: any) {
			console.error('Persist backlog add failed', err);
		}
	}

	function exportCsv() {
		const rows = scheduleData.map((t) => `${t.title},${t.time},${t.duration}`);

		const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
		const url: string = URL.createObjectURL(blob);

		const a = document.createElement('a') as HTMLAnchorElement;
		a.href = url;
		a.download = 'timetable.csv';
		a.click();
	}

	onMount(async () => {
		planId = $page.params.id ?? '';

		try {
			const res = await fetch(`http://localhost:3000/study-plans/${planId}`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include'
			});

			const json = await res.json();
			console.log(json);

			// Defensive normalization: backend should already normalize, but handle malformed AI shapes here
			const normalizeLocal = (rawSchedule: any) => {
				if (!rawSchedule || typeof rawSchedule !== 'object') return { tasks: [], backlog: [] };
				const schedule = { ...rawSchedule };

				// prefer explicit tasks
				if (!Array.isArray(schedule.tasks)) {
					if (Array.isArray(schedule.list)) schedule.tasks = schedule.list;
					else if (Array.isArray(schedule.days)) {
						try {
							schedule.tasks = schedule.days.flatMap((d: any) =>
								Array.isArray(d.tasks) ? d.tasks : []
							);
						} catch (e) {
							schedule.tasks = [];
						}
					} else if (Array.isArray(schedule.weeks)) {
						try {
							schedule.tasks = schedule.weeks.flatMap((w: any) =>
								Array.isArray(w.list) ? w.list : []
							);
						} catch (e) {
							schedule.tasks = [];
						}
					} else schedule.tasks = [];
				}

				const tasks = Array.isArray(schedule.tasks) ? schedule.tasks : [];
				const enriched = tasks.map((t: any, i: number) => {
					const obj = typeof t === 'string' ? { title: t } : ({ ...t } as any);
					const title = obj.title ?? obj.name ?? 'Study Task';
					let time = String(obj.time ?? '09:00');
					if (!time.includes(':')) time = time.padEnd(5, ':00').slice(0, 5);
					time = time.slice(0, 5);
					const duration = obj.duration ?? obj.len ?? '1h';
					const isBreak = /break/i.test(title);
					let day = 0;
					if (typeof obj.day === 'number') day = obj.day;
					else if (typeof obj.day === 'string') {
						const n = obj.day.toLowerCase();
						if (n.startsWith('mon')) day = 0;
						else if (n.startsWith('tue')) day = 1;
						else if (n.startsWith('wed')) day = 2;
						else if (n.startsWith('thu')) day = 3;
						else if (n.startsWith('fri')) day = 4;
						else if (n.startsWith('sat')) day = 5;
						else if (n.startsWith('sun')) day = 6;
					}

					return {
						id: obj.id ?? `${Date.now().toString(36)}-${i}`,
						week: obj.week ?? 0,
						day,
						time,
						title,
						duration: String(duration),
						type: obj.type ?? (isBreak ? 'Break' : 'Study'),
						color: obj.color ?? (isBreak ? 'bg-[#232f48]' : 'bg-primary'),
						subColor: obj.subColor ?? (isBreak ? 'text-white/60' : 'text-blue-200'),
						isBreak,
						description: obj.description ?? null
					};
				});

				return {
					tasks: enriched,
					backlog: Array.isArray(schedule.backlog) ? schedule.backlog : []
				};
			};

			// support multiple response shapes: { schedule: {...} } or { plan: { tasks: [...], backlog: [...] } }
			const raw = json.schedule ?? json.plan ?? json.plan?.schedule ?? json;
			const normalized = normalizeLocal(raw ?? {});
			scheduleData = normalized.tasks;
			// prefer normalized backlog, otherwise fall back to plan/backlog top-level
			backlog =
				normalized.backlog && normalized.backlog.length
					? normalized.backlog
					: Array.isArray(json.plan?.backlog)
						? json.plan.backlog
						: Array.isArray(json.backlog)
							? json.backlog
							: [];

			// map backend 'suggestions' -> simple tip strings when present, otherwise use tips
			if (Array.isArray(json.plan?.suggestions) && json.plan.suggestions.length > 0) {
				tips = json.plan.suggestions.map((s: any) => s.message ?? s.title ?? String(s));
			} else {
				tips = Array.isArray(json.tips) ? json.tips : json.tips ? [String(json.tips)] : [];
			}
			notifySuccess('Plan Loaded', 'Your study plan has been loaded successfully.');
		} catch (err: any) {
			console.error('Failed to load plan', err);
			// Distinguish network errors from server-side responses
			if (err instanceof TypeError && /Failed to fetch/i.test(String(err.message))) {
				errorMessage = 'Cannot reach backend at http://localhost:3000 — is the backend running?';
			} else {
				errorMessage = err?.message ?? 'Failed to load your study plan.';
			}
			notifyError('Load Failed', errorMessage);
		} finally {
			isLoading = false;
		}
	});
</script>

<nav>
	<a href="/dashboard"> Go Home </a>
</nav>
<div class="bg-background-dark font-display text-white overflow-hidden h-screen flex flex-col">
	<header
		class="lg:hidden h-14 bg-card-dark border-b-2 border-border-dark flex items-center justify-between px-4 z-40 shrink-0"
	>
		<div class="flex items-center gap-2">
			<div
				class="size-8 bg-primary rounded flex items-center justify-center border border-white/20"
			>
				<LayoutDashboard size={18} />
			</div>
			<span class="font-black uppercase tracking-tight text-sm font-monoton">24FLOW</span>
		</div>
		<button
			onclick={() => (isSidebarOpen = true)}
			class="p-2 hover:bg-white/5 rounded transition-colors"><Menu size={24} /></button
		>
	</header>

	<div class="flex flex-1 overflow-hidden relative">
		<main
			bind:this={mainContent}
			class="flex-1 flex flex-col relative overflow-hidden bg-[#0b0f17]"
		>
			<div
				class="px-4 md:px-8 py-4 md:py-6 flex flex-col gap-4 md:gap-6 border-b-2 border-border-dark sticky top-0 z-30 transition-colors duration-300 shrink-0 {isHeaderSticky
					? 'bg-[#0b0f17]/95 backdrop-blur-md shadow-lg'
					: 'bg-background-dark'}"
			>
				<div class="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
					<div class="flex flex-col gap-1">
						<p
							class={isEditMode
								? 'text-yellow-500 text-xs md:text-sm font-bold uppercase flex items-center gap-2'
								: 'text-[#92a4c9] text-xs md:text-sm font-bold uppercase tracking-wider'}
						>
							{#if isEditMode}<Edit3 size={14} /> Editing Schedule{:else}Generated Schedule{/if}
						</p>
						<h1 class="text-3xl md:text-5xl font-black uppercase tracking-tight">
							{currentView === 'day' ? 'Today' : `Week ${Math.max(0, weekOffset + 1)}: Exam Prep`}
						</h1>
					</div>
					<div class="flex gap-2 md:gap-3">
						{#if isEditMode}
							<button
								onclick={cancelEdit}
								class="flex-1 sm:flex-none flex items-center justify-center gap-2 h-10 px-4 bg-background-dark border-2 border-red-500/50 text-red-400 text-xs md:text-sm font-bold uppercase rounded shadow-hard transition-all hover:-translate-y-0.5"
							>
								<X size={16} /> <span>Cancel</span>
							</button>
							<button
								onclick={saveEdit}
								class="flex-1 sm:flex-none flex items-center justify-center gap-2 h-10 px-4 bg-success border-2 border-transparent text-white text-xs md:text-sm font-bold uppercase rounded shadow-hard transition-all hover:-translate-y-0.5"
							>
								<Save size={16} /> <span>Save</span>
							</button>
						{:else}
							<button
								onclick={exportCsv}
								class="flex-1 sm:flex-none flex items-center justify-center gap-2 h-10 px-4 bg-card-dark border-2 border-border-dark text-white text-xs md:text-sm font-bold uppercase rounded shadow-hard hover:shadow-hard-hover hover:-translate-y-0.5 transition-all"
							>
								<FileDown size={16} /> <span>Export</span>
							</button>
							<button
								onclick={enterEditMode}
								class="flex-1 sm:flex-none flex items-center justify-center gap-2 h-10 px-4 bg-primary border-2 border-transparent text-white text-xs md:text-sm font-bold uppercase rounded shadow-hard hover:shadow-hard-hover hover:-translate-y-0.5 transition-all"
							>
								<Edit3 size={16} /> <span>Edit</span>
							</button>
						{/if}
					</div>
				</div>

				<div
					class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 {isEditMode
						? 'opacity-70 pointer-events-none grayscale'
						: ''}"
				>
					{#if currentView === 'daily'}
						<!-- Day View Navigation -->
						<div class="flex items-center gap-2 w-full md:w-auto">
							<button
								onclick={() => (currentDayIndex = Math.max(0, currentDayIndex - 1))}
								class="h-10 px-3 bg-card-dark border-2 border-border-dark rounded hover:bg-white/5 text-white shadow-sm"
							>
								<ChevronLeft size={20} />
							</button>
							<div
								class="flex-1 md:flex-none px-4 h-10 flex items-center justify-center bg-card-dark border-2 border-border-dark rounded text-white font-bold text-sm min-w-[200px] shadow-sm"
							>
								{getCurrentDayDate().toLocaleDateString('en-US', {
									weekday: 'long',
									month: 'short',
									day: 'numeric'
								})}
							</div>
							<button
								onclick={() => (currentDayIndex = Math.min(6, currentDayIndex + 1))}
								class="h-10 px-3 bg-card-dark border-2 border-border-dark rounded hover:bg-white/5 text-white shadow-sm"
							>
								<ChevronRight size={20} />
							</button>
						</div>
					{:else}
						<!-- Week Navigation -->
						<div
							class="flex items-center bg-card-dark border-2 border-border-dark rounded overflow-hidden w-full md:w-auto shadow-sm"
						>
							<button
								onclick={() => weekOffset--}
								class="flex-1 md:flex-none h-10 px-3 hover:bg-white/5 border-r border-border-dark text-white"
								><ChevronLeft size={20} /></button
							>
							<div
								class="flex-3 md:flex-none px-4 h-10 flex items-center justify-center text-white font-bold text-xs md:text-sm min-w-40 font-mono"
							>
								{formatDateRange()}
							</div>
							<button
								onclick={() => weekOffset++}
								class="flex-1 md:flex-none h-10 px-3 hover:bg-white/5 border-l border-border-dark text-white"
								><ChevronRight size={20} /></button
							>
						</div>
					{/if}

					<div
						class="flex p-1 bg-card-dark border-2 border-border-dark rounded w-full md:w-auto shadow-sm"
					>
						{#each ['daily', 'weekly', 'list'] as view}
							<button
								onclick={() => (currentView = view)}
								class="flex-1 md:flex-none px-4 py-1.5 rounded text-xs font-bold uppercase transition-all {currentView ===
								view
									? 'bg-background-dark text-white shadow-sm border border-border-dark'
									: 'text-[#92a4c9] hover:text-white hover:bg-white/5'}"
							>
								{view}
							</button>
						{/each}
					</div>
				</div>
			</div>

			<div class="flex-1 overflow-auto p-4 md:p-8 custom-scrollbar relative">
				{#if currentView === 'weekly'}
					<WeekView
						{scheduleData}
						{weekOffset}
						{hours24}
						{isEditMode}
						{getDayDate}
						onDelete={handleDelete}
						{onDrop}
						{onDragStart}
					/>
				{:else if currentView === 'daily'}
					<DayView
						bind:scheduleData
						{weekOffset}
						{isEditMode}
						{currentDayIndex}
						onDelete={handleDelete}
						{onDrop}
						{onDragStart}
						onOpenAdd={() => {
							modalInitial = {
								date: getCurrentDayDate().toISOString().slice(0, 10),
								startTime: '09:00',
								duration: '60'
							};
							showDetailedModal = true;
						}}
					/>
				{:else}
					<ListView
						bind:scheduleData
						{weekOffset}
						{isEditMode}
						{getDayDate}
						onDelete={handleDelete}
						{onDrop}
						{onDragStart}
						onOpenAdd={() => {
							modalInitial = null;
							showDetailedModal = true;
						}}
					/>
				{/if}
			</div>

			<button
				onclick={() => {
					showDetailedModal = true;
					console.log('Button clicked, modal should open');
				}}
				class="fixed bottom-6 right-6 md:bottom-10 md:right-10 size-14 md:size-16 bg-white text-primary rounded shadow-hard hover:shadow-hard-hover hover:-translate-y-1 transition-all flex items-center justify-center border-2 border-border-dark z-100 group"
				aria-label="Add new task"
			>
				<Plus
					size={32}
					class="transition-transform duration-300 {isEditMode ? 'group-hover:rotate-90' : ''}"
				/>
			</button>
		</main>

		<Sidebar
			bind:isOpen={isSidebarOpen}
			{isEditMode}
			{backlog}
			{scheduleData}
			{weekOffset}
			{onDragStart}
			{tips}
			onOpenCreate={() => (showCreateModal = true)}
		/>
	</div>

	<AddTaskModal bind:show={showDetailedModal} onAdd={handleDetailedAdd} initial={modalInitial} />

	{#if showCreateModal}
		<div
			class="fixed inset-0 bg-black/80 backdrop-blur-sm z-60 flex items-center justify-center p-4"
		>
			<div
				class="bg-card-dark border-2 border-border-dark w-full max-w-md rounded shadow-hard p-5 md:p-6 animate-in zoom-in-95 duration-200"
			>
				<div class="flex justify-between items-center mb-6">
					<h3 class="text-lg md:text-xl font-black uppercase text-white">New Task</h3>
					<button onclick={() => (showCreateModal = false)} class="text-gray-400 hover:text-white"
						><X size={24} /></button
					>
				</div>
				<form
					onsubmit={(e) => {
						e.preventDefault();
						createTask();
					}}
					class="space-y-4"
				>
					<div>
						<label
							for="newTaskTitle"
							class="block text-[10px] font-bold uppercase text-[#92a4c9] mb-1">Title</label
						>
						<input
							bind:value={newTask.title}
							type="text"
							id="newTaskTitle"
							class="w-full bg-background-dark border-2 border-border-dark rounded px-4 py-2 text-white focus:border-primary outline-none"
							placeholder="Physics Review"
							required
						/>
					</div>
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div>
							<label
								for="newTaskType"
								class="block text-[10px] font-bold uppercase text-[#92a4c9] mb-1">Type</label
							>
							<select
								id="newTaskType"
								bind:value={newTask.type}
								class="w-full bg-background-dark border-2 border-border-dark rounded px-4 py-2 text-white outline-none"
							>
								<option>Deep Work</option><option>Math</option><option>History</option><option
									>Reading</option
								>
							</select>
						</div>
						<div>
							<label
								for="newTaskDuration"
								class="block text-[10px] font-bold uppercase text-[#92a4c9] mb-1">Duration</label
							>
							<input
								id="newTaskDuration"
								bind:value={newTask.duration}
								type="text"
								class="w-full bg-background-dark border-2 border-border-dark rounded px-4 py-2 text-white outline-none"
								placeholder="1h 30m"
							/>
						</div>
					</div>
					<button
						type="submit"
						class="w-full bg-primary py-3 rounded text-white font-bold uppercase shadow-hard hover:translate-x-0.5 hover:translate-y-0.5 transition-all mt-4"
						>Add Task</button
					>
				</form>
			</div>
		</div>
	{/if}
</div>
<Toaster position="bottom-right" expand={false} richColors />

<style>
	:global(.custom-scrollbar::-webkit-scrollbar) {
		width: 8px;
		height: 8px;
	}
	:global(.custom-scrollbar::-webkit-scrollbar-track) {
		background: #111722;
	}
	:global(.custom-scrollbar::-webkit-scrollbar-thumb) {
		background: #232f48;
		border: 2px solid #111722;
		border-radius: 4px;
	}
	:global(.custom-scrollbar::-webkit-scrollbar-thumb:hover) {
		background: #3b4d6e;
	}
	:global(.shadow-hard) {
		box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 0.5);
	}
	:global(.shadow-hard-hover) {
		box-shadow: 6px 6px 0px 0px rgba(0, 0, 0, 0.5);
	}
	:global(.shadow-hard-sm) {
		box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.5);
	}
	:global(.bg-success) {
		background-color: #16a34a;
	}
</style>
