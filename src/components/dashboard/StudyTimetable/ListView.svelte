<script lang="ts">
	import { Timer, Calendar, Trash2, GripVertical, Plus } from 'lucide-svelte';
	import type { Task } from '$lib/types';

	let {
		scheduleData = $bindable(),
		weekOffset,
		isEditMode,
		getDayDate,
		onDelete,
		onDrop,
		onDragStart,
		onOpenAdd
	} = $props();

	let groupedTasks = $derived.by(() => {
		const groups = [];
		for (let i = 0; i < 7; i++) {
			const tasks = scheduleData
				.filter((t: Task) => t.week === weekOffset && t.day === i)
				.sort((a: Task, b: Task) => a.time.localeCompare(b.time));
			if (tasks.length > 0) groups.push({ dayIndex: i, tasks });
		}
		return groups;
	});

	let draggedTask = $state<Task | null>(null);

	function handleDragStart(e: DragEvent, task: Task) {
		if (!isEditMode) return;
		draggedTask = task;
		if (e.dataTransfer) {
			e.dataTransfer.effectAllowed = 'move';
		}
		onDragStart(e, task, 'calendar');
	}

	function handleDrop(e: DragEvent, targetTask: Task) {
		if (!isEditMode || !draggedTask) return;
		e.preventDefault();
		e.stopPropagation();

		const draggedTaskData = draggedTask;
		const targetDayIndex = targetTask.day;
		const targetTime = targetTask.time;

		// If moving to different day, update day
		if (draggedTaskData.day !== targetDayIndex) {
			scheduleData = scheduleData.map((t) => {
				if (t.id === draggedTaskData.id) {
					return { ...t, day: targetDayIndex, time: targetTime };
				}
				return t;
			});
		} else {
			// Same day - swap times
			const draggedTime = draggedTaskData.time;
			scheduleData = scheduleData.map((t) => {
				if (t.id === draggedTaskData.id) {
					return { ...t, time: targetTime };
				}
				if (t.id === targetTask.id) {
					return { ...t, time: draggedTime };
				}
				return t;
			});
		}

		draggedTask = null;
	}

	function handleDragOver(e: DragEvent) {
		if (isEditMode) {
			e.preventDefault();
			e.stopPropagation();
		}
	}

	let stickyHeaders = $state<boolean[]>([]);
	let listContainer = $state<HTMLElement>();

	function checkStickyHeaders() {
		if (!listContainer) return;
		const headers = listContainer.querySelectorAll('[data-day-header]');
		const newStickyState: boolean[] = [];

		headers.forEach((header, index) => {
			const rect = header.getBoundingClientRect();
			newStickyState[index] = rect.top <= 0;
		});

		stickyHeaders = newStickyState;
	}

	$effect(() => {
		if (listContainer) {
			listContainer.addEventListener('scroll', checkStickyHeaders);
			return () => listContainer.removeEventListener('scroll', checkStickyHeaders);
		}
	});
</script>

<div bind:this={listContainer} class="max-w-4xl mx-auto flex flex-col gap-12 pb-20">
	{#each groupedTasks as group, groupIndex}
		<section class="flex flex-col gap-6">
			<div
				data-day-header
				class="sticky top-0 z-30 py-4 border-b-2 border-border-dark flex items-baseline justify-between transition-colors duration-300 {stickyHeaders[
					groupIndex
				]
					? 'bg-[#0b0f17]/95 backdrop-blur-md'
					: 'bg-[#0b0f17]'}"
			>
				<div class="flex items-baseline gap-4">
					<h3 class="text-3xl font-black text-white tracking-tight uppercase">
						{getDayDate(group.dayIndex).toLocaleDateString('en-US', { weekday: 'long' })}
					</h3>
					<span class="text-primary font-mono font-bold text-sm">
						{getDayDate(group.dayIndex).toLocaleDateString('en-US', {
							month: 'short',
							day: 'numeric'
						})}
					</span>
				</div>
				<span class="text-[#92a4c9] text-xs font-black uppercase tracking-widest"
					>{group.tasks.length} Activities</span
				>
			</div>

			<div class="grid gap-4">
				{#each group.tasks as task}
					<div
						class="flex items-stretch bg-card-dark border-2 border-border-dark rounded-xl overflow-hidden shadow-sm hover:border-primary/30 transition-all group relative {isEditMode
							? 'cursor-grab active:cursor-grabbing'
							: ''}"
						draggable={isEditMode}
						ondragstart={(e) => handleDragStart(e, task)}
						ondragover={handleDragOver}
						ondrop={(e) => handleDrop(e, task)}
					>
						{#if isEditMode}
							<div
								class="w-10 flex items-center justify-center bg-background-dark/50 border-r border-border-dark cursor-grab active:cursor-grabbing"
							>
								<GripVertical size={18} class="text-[#92a4c9]" />
							</div>
						{/if}

						<div
							class="w-24 md:w-32 p-5 border-r border-border-dark flex flex-col items-center justify-center bg-background-dark/30 gap-1"
						>
							<span class="text-white font-mono font-black text-lg">{task.time}</span>
							<div class="h-px w-4 bg-border-dark hidden md:block"></div>
							<span
								class="text-[#92a4c9] text-[10px] font-bold font-mono uppercase tracking-tighter"
								>{task.duration}</span
							>
						</div>

						<div class="flex-1 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
							<div class="flex flex-col gap-2">
								<div class="flex items-center gap-3">
									<span
										class="bg-primary/10 text-blue-200 border border-primary/20 px-2 py-0.5 rounded-sm text-[9px] font-black uppercase tracking-widest"
									>
										{task.type}
									</span>
								</div>
								<h4 class="text-white text-xl font-bold leading-tight">{task.title}</h4>
								{#if task.description}
									<p class="text-white/60 text-sm">{task.description}</p>
								{/if}
							</div>

							{#if isEditMode}
								<button
									onclick={() => onDelete(task.id)}
									class="size-10 flex items-center justify-center rounded-lg border-2 border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-sm"
								>
									<Trash2 size={20} />
								</button>
							{/if}
						</div>
						<div class="w-2 {task.color}"></div>
					</div>
				{/each}
			</div>
		</section>
	{/each}

	{#if isEditMode}
		<button
			onclick={onOpenAdd}
			class="w-full p-8 border-2 border-dashed border-border-dark rounded-2xl text-[#92a4c9] hover:text-primary hover:border-primary/40 transition-all flex items-center justify-center gap-3 bg-card-dark/20 group"
		>
			<Plus size={24} class="group-hover:scale-125 transition-transform" />
			<span class="font-black uppercase tracking-widest text-sm">Add Activity to List</span>
		</button>
	{/if}
</div>
