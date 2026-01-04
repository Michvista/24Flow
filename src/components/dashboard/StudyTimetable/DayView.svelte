<script lang="ts">
    import { Timer, Play, Coffee, Trash2, GripVertical, Plus } from 'lucide-svelte';
    import type { Task } from '$lib/types';

    let { scheduleData, weekOffset, isEditMode, currentDayIndex, onDelete, onDrop, onDragStart, onOpenAdd } = $props();

    let daysTasks = $derived(
        scheduleData
            .filter((t: Task) => t.week === weekOffset && t.day === currentDayIndex)
            .sort((a: Task, b: Task) => a.time.localeCompare(b.time))
    );

    function getEndTime(startTime: string, durationStr: string) {
        const [h, m] = startTime.split(':').map(Number);
        let durH = 1;
        if(durationStr.includes('h')) durH = parseFloat(durationStr);
        else if(durationStr.includes('m')) durH = parseFloat(durationStr) / 60;
        
        const totalMins = (h * 60 + (m || 0)) + (durH * 60);
        const endH = Math.floor(totalMins / 60);
        const endM = totalMins % 60;
        return `${endH.toString().padStart(2,'0')}:${endM.toString().padStart(2,'0')}`;
    }

    let draggedItemIndex = $state<number | null>(null);

    function handleDragStart(e: DragEvent, task: Task, index: number) {
        if (!isEditMode) return;
        draggedItemIndex = index;
        onDragStart(e, task, 'calendar');
    }

    function handleDrop(e: DragEvent, targetIndex: number) {
        if (!isEditMode) return;
        e.preventDefault();
        
        if (draggedItemIndex === null) return;
        
        const items = [...daysTasks];
        const [reorderedItem] = items.splice(draggedItemIndex, 1);
        items.splice(targetIndex, 0, reorderedItem);
        
        // Update times based on new order
        items.forEach((item, idx) => {
            const task = scheduleData.find(t => t.id === item.id);
            if (task && idx > 0) {
                task.time = items[idx - 1].time; // Simplified - in production, calculate proper time slots
            }
        });
        
        draggedItemIndex = null;
    }

    function handleDragOver(e: DragEvent) {
        if (isEditMode) {
            e.preventDefault();
        }
    }
</script>

<div class="w-full max-w-5xl mx-auto border-2 border-border-dark bg-background-dark rounded-2xl shadow-hard mb-20 overflow-hidden">
    <div class="grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] border-b-2 border-border-dark bg-card-dark">
        <div class="p-4 md:p-6 border-r-2 border-border-dark flex items-center justify-center font-black uppercase text-[10px] md:text-xs text-[#92a4c9] tracking-widest">Time</div>
        <div class="p-4 md:p-6 font-black uppercase text-[10px] md:text-xs text-[#92a4c9] tracking-widest pl-8 md:pl-12">Activity Details</div>
    </div>

    {#each daysTasks as task, index}
        <div 
            class="grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] border-b-2 border-border-dark last:border-b-0 min-h-[160px] relative group"
            draggable={isEditMode}
            ondragstart={(e) => handleDragStart(e, task, index)}
            ondragover={handleDragOver}
            ondrop={(e) => handleDrop(e, index)}
        >
            <div class="p-4 md:p-6 border-r-2 border-border-dark flex flex-col items-center md:items-end justify-start pt-8 gap-1">
                <span class="text-white font-black font-mono text-lg md:text-2xl">{task.time}</span>
                <span class="text-[#92a4c9] font-mono text-[10px] md:text-xs">{getEndTime(task.time, task.duration)}</span>
            </div>

            <div class="p-4 md:p-6 pl-8 md:pl-12 relative flex items-center">
                {#if isEditMode}
                    <div class="absolute left-[-14px] top-1/2 -translate-y-1/2 size-7 bg-white text-black rounded flex items-center justify-center shadow-lg z-10 cursor-grab active:cursor-grabbing">
                        <GripVertical size={16} />
                    </div>
                {/if}

                <div class="w-full {task.color} border-2 border-white/10 rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-6 relative overflow-hidden shadow-hard-sm transition-all {isEditMode ? 'cursor-grab active:cursor-grabbing' : ''}">
                    <div class="absolute top-0 right-0 p-4 opacity-10">
                        {#if task.isBreak}<Coffee size={80} />{:else}<Timer size={80} />{/if}
                    </div>

                    <div class="flex-1 space-y-3 relative z-10">
                        <div class="flex items-center gap-3">
                            <span class="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest bg-black/20 text-white">
                                {task.type}
                            </span>
                        </div>
                        <h3 class="text-white text-2xl md:text-3xl font-black uppercase tracking-tight">{task.title}</h3>
                        {#if task.description}
                            <p class="text-white/70 text-sm font-medium max-w-lg leading-relaxed">{task.description}</p>
                        {/if}
                    </div>

                    <div class="flex flex-col items-end justify-between relative z-10 shrink-0">
                        <div class="flex items-center gap-1.5 text-white font-bold bg-white/10 px-4 py-2 rounded-lg border border-white/10 font-mono text-sm">
                            <Timer size={16} />
                            <span>{task.duration}</span>
                        </div>
                        {#if isEditMode}
                            <button onclick={() => onDelete(task.id)} class="size-12 rounded-xl bg-red-500/20 text-red-200 border-2 border-red-500/50 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                                <Trash2 size={24} />
                            </button>
                        {:else}
                            <button class="size-12 rounded-full bg-white text-primary flex items-center justify-center hover:scale-110 transition-transform shadow-hard-sm">
                                <Play size={24} fill="currentColor" />
                            </button>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    {/each}

    {#if isEditMode}
        <button 
            onclick={onOpenAdd}
            class="w-full p-12 border-t-2 border-dashed border-border-dark bg-white/[0.02] hover:bg-white/[0.05] transition-all flex flex-col items-center justify-center gap-4 text-[#92a4c9] hover:text-primary group"
        >
            <div class="size-14 rounded-full border-4 border-dashed border-current flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus size={32} />
            </div>
            <span class="font-black uppercase tracking-[0.2em] text-xs">Add Activity to Timeline</span>
        </button>
    {/if}
</div>