<script lang="ts">
	import { Timer, Trash2, Plus } from 'lucide-svelte';
	import type { Task } from '$lib/types';

	let { scheduleData, weekOffset, hours24, isEditMode, onDelete, onDrop, onDragStart, getDayDate } =
		$props();

	const getEntry = (day: number, time: string) =>
		scheduleData.find((i: Task) => i.week === weekOffset && i.day === day && i.time === time);
</script>

<div class="min-w-[1000px] border-2 border-border-dark bg-background-dark rounded shadow-hard">
	<div class="grid grid-cols-8 border-b-2 border-border-dark bg-card-dark z-10">
		<div class="p-4 border-r border-border-dark flex items-center justify-center bg-card-dark">
			<span class="text-[#92a4c9] text-[10px] md:text-xs font-bold uppercase tracking-widest"
				>Time</span
			>
		</div>
		{#each ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as day, i}
			<div class="p-2 md:p-4 border-r border-border-dark text-center {i > 4 ? 'bg-white/5' : ''}">
				<div class="text-[#92a4c9] text-[10px] md:text-xs font-bold uppercase mb-1">{day}</div>
				<div class="text-white text-base md:text-lg font-black">{getDayDate(i).getDate()}</div>
			</div>
		{/each}
	</div>

	{#each hours24 as time}
		<div class="grid grid-cols-8 border-b border-border-dark min-h-[120px]">
			<div
				class="p-2 md:p-4 border-r border-border-dark flex flex-col justify-start bg-card-dark/30"
			>
				<span class="text-white font-bold font-mono text-xs md:text-sm">{time}</span>
			</div>
			{#each Array(7) as _, dayIndex}
				{@const entry = getEntry(dayIndex, time)}
				<div
					role="gridcell"
					class="p-1 md:p-2 border-r border-border-dark relative group {dayIndex > 4
						? 'bg-white/5'
						: ''}"
					ondragover={(e) => isEditMode && e.preventDefault()}
					ondrop={(e) => isEditMode && onDrop(e, dayIndex, time)}
				>
					{#if entry}
						<div
							draggable={isEditMode}
							ondragstart={(e) => isEditMode && onDragStart(e, entry, 'calendar')}
							class="h-full w-full {entry.isBreak
								? 'bg-[#232f48] border-white/5'
								: entry.color +
									' border-white/10'} p-2 md:p-3 rounded-sm border shadow-hard transition-all {isEditMode
								? 'cursor-grab active:cursor-grabbing hover:border-white/30'
								: 'hover:-translate-y-0.5 hover:shadow-hard-hover'} flex flex-col justify-between overflow-hidden"
						>
							<div class="flex justify-between items-start">
								<div class="flex flex-col overflow-hidden">
									<span
										class="{entry.subColor ||
											'text-[#92a4c9]'} text-[9px] font-bold uppercase truncate tracking-wider"
										>{entry.type}</span
									>
									<span
										class="text-white font-bold leading-tight text-[11px] md:text-xs line-clamp-2 mt-0.5"
										>{entry.title}</span
									>
								</div>
								{#if isEditMode}
									<button
										onclick={() => onDelete(entry.id)}
										class="text-white/40 hover:text-red-400 shrink-0"><Trash2 size={12} /></button
									>
								{/if}
							</div>
							{#if !entry.isBreak}
								<div class="flex items-center gap-1 text-white/80 text-[9px] font-bold mt-2">
									<Timer size={10} /> <span>{entry.duration}</span>
								</div>
							{/if}
						</div>
					{:else if isEditMode}
						<div
							class="h-full w-full border-2 border-dashed border-white/5 rounded-sm flex items-center justify-center group-hover:border-white/20 transition-all"
						>
							<Plus size={16} class="text-white/10 group-hover:text-white/30" />
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	:global(.shadow-hard) {
		box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 0.5);
	}
	:global(.shadow-hard-hover) {
		box-shadow: 6px 6px 0px 0px rgba(0, 0, 0, 0.5);
	}
</style>
