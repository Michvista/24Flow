<script lang="ts">
    import { onMount } from 'svelte';
    import { 
        FileDown, Edit3, ChevronLeft, ChevronRight, Coffee,
        Timer, Sparkles, Bed, BookOpen, Plus, Save, X,
        GripVertical, Trash2, LayoutDashboard, Settings, LogOut,
        RotateCcw, MousePointer2, Menu 
    } from 'lucide-svelte';
    import { gsap } from 'gsap';
    import AddTaskModal from './AddTaskModal.svelte';

    // --- State Management ---
    let isEditMode = $state(false);
    let weekOffset = $state(0);
    let currentTime = $state(new Date());
    let showCreateModal = $state(false);
    let isSidebarOpen = $state(false); 
    
    let sidebarElement = $state<HTMLElement>();
    let overlayElement = $state<HTMLElement>();
    let clipboard = $state<{id: number, title: string} | null>(null);

    // GSAP Animation Logic
    $effect(() => {
        if (!sidebarElement) return;

        if (isSidebarOpen) {
            // Open Sidebar
            gsap.to(sidebarElement, { x: 0, duration: 0.4, ease: "power3.out" });
            gsap.to(overlayElement, { opacity: 1, display: 'block', duration: 0.3 });
        } else {
            // Close Sidebar (only on mobile screens)
            if (window.innerWidth < 1024) {
                gsap.to(sidebarElement, { x: "-100%", duration: 0.3, ease: "power3.in" });
                gsap.to(overlayElement, { opacity: 0, display: 'none', duration: 0.3 });
            }
        }
    });

    let showDetailedModal = $state(false); // New detailed Timetable modal
    
    // Function to handle the detailed data from the GSAP modal
   // Inside your main script
    function handleDetailedAdd(data: any) {
        const id = Math.random();
        
        // 1. Calculate the day index (0 for Monday, 6 for Sunday)
        // new Date(data.date).getDay() returns 0 for Sunday, 1 for Monday...
        const dateObj = new Date(data.date);
        let dayIdx = dateObj.getDay() - 1; 
        if (dayIdx === -1) dayIdx = 6; // Handle Sunday

        // 2. Ensure time is formatted as "HH:00" to match your 'hours24' array
        // This takes "09:30" and makes it "09:00" so it shows up in the grid row
        const formattedTime = data.startTime.split(':')[0] + ':00';

        const newEntry = {
            id,
            week: weekOffset,
            day: dayIdx, 
            time: formattedTime,
            title: data.title,
            type: data.subject || data.type, // Uses the custom subject if provided
            duration: data.duration + 'm',
            color: 'bg-primary', 
            subColor: 'text-blue-200'
        };

        // 3. Add to schedule
        scheduleData = [...scheduleData, newEntry];
    }

    // Schedule Data (rest of your logic remains the same)
    let scheduleData = $state([
        { id: 1, week: 0, day: 0, time: "09:00", title: "Calculus II: Derivatives", type: "Deep Work", duration: "2h", color: "bg-primary", subColor: "text-blue-200" },
        { id: 2, week: 0, day: 1, time: "09:00", title: "History Essay Draft", type: "Writing", duration: "2h", color: "bg-[#6d28d9]", subColor: "text-purple-200" },
        { id: 3, week: 0, day: 2, time: "09:00", title: "Chemistry Pre-lab", type: "Lab Prep", duration: "1.5h", color: "bg-[#059669]", subColor: "text-emerald-200" },
        { id: 4, week: 0, day: 0, time: "11:00", title: "Coffee Break", type: "Rest", isBreak: true },
        { id: 5, week: 0, day: 0, time: "11:30", title: "Physics Concepts", type: "Flashcards", duration: "1h", color: "bg-[#be185d]", subColor: "text-pink-200" }
    ]);

    let backlog = $state([
        { id: 101, title: "Linear Algebra Review", type: "Math", duration: "1h", color: "bg-primary", subColor: "text-blue-200" },
        { id: 102, title: "Cite Sources for Essay", type: "History", duration: "45m", color: "bg-[#6d28d9]", subColor: "text-purple-200" },
        { id: 103, title: "Ch. 4: Thermodynamics", type: "Reading", duration: "2h", color: "bg-[#c2410c]", subColor: "text-orange-200" }
    ]);

    let newTask = $state({ title: '', type: 'Deep Work', duration: '1h', color: 'bg-primary' });

    // --- Logic ---
    const hours24 = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0') + ':00');
    const getDayDate = (dayIndex: number) => {
        const d = new Date();
        const day = d.getDay();
        const diff = d.getDate() - day + (day == 0 ? -6 : 1); 
        const date = new Date(d.setDate(diff));
        date.setDate(date.getDate() + (weekOffset * 7) + dayIndex);
        return date;
    };

    const formatDateRange = $derived(() => {
        const start = getDayDate(0);
        const end = getDayDate(6);
        return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    });

    const getEntry = (day: number, time: string) => 
        scheduleData.find(i => i.week === weekOffset && i.day === day && i.time === time);

    const getNextStatus = $derived(() => {
        const currentDayIdx = (currentTime.getDay() + 6) % 7;
        const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
        const todaysEvents = scheduleData
            .filter(i => i.week === 0 && i.day === currentDayIdx)
            .map(i => {
                const [h, m] = i.time.split(':').map(Number);
                return { ...i, totalMins: h * 60 + m };
            })
            .filter(i => i.totalMins > currentMinutes)
            .sort((a, b) => a.totalMins - b.totalMins);

        const nextBreak = todaysEvents.find(e => e.isBreak);
        const nextWork = todaysEvents.find(e => !e.isBreak);

        const formatDiff = (targetMins: number) => {
            const diff = targetMins - currentMinutes;
            return diff >= 60 ? `In ${Math.floor(diff/60)}h ${diff%60}m` : `In ${diff} mins`;
        };

        return {
            break: nextBreak ? { title: nextBreak.title, time: formatDiff(nextBreak.totalMins) } : null,
            work: nextWork ? { title: nextWork.title, time: formatDiff(nextWork.totalMins) } : null
        };
    });

    const totalHours = $derived(scheduleData.filter(i => i.week === weekOffset && !i.isBreak).length * 2);
    const progressWidth = $derived(Math.min((totalHours / 40) * 100, 100));

    function deleteEntry(id: number) {
        const item = scheduleData.find(i => i.id === id);
        if (item) clipboard = { id: item.id, title: item.title };
        scheduleData = scheduleData.filter(i => i.id !== id);
    }

    function createTask() {
        const id = Math.random();
        backlog = [...backlog, { ...newTask, id, subColor: 'text-white/70' }];
        showCreateModal = false;
        newTask = { title: '', type: 'Deep Work', duration: '1h', color: 'bg-primary' };
    }

    let draggedItem = $state<any>(null);

    function onDragStart(event: DragEvent, item: any, source: 'backlog' | 'calendar') {
        draggedItem = { ...item, source };
        if (event.dataTransfer) event.dataTransfer.effectAllowed = "move";
    }

    function onDrop(event: DragEvent, day: number, time: string) {
        event.preventDefault();
        if (!draggedItem) return;
        if (draggedItem.source === 'calendar') {
            scheduleData = scheduleData.filter(i => i.id !== draggedItem.id);
        }
        scheduleData = [...scheduleData, { ...draggedItem, id: Math.random(), week: weekOffset, day, time }];

isSidebarOpen = false;        
        draggedItem = null;
    }
</script>

<div class="bg-background-dark font-display text-white overflow-hidden h-screen flex flex-col">
    <header class="lg:hidden h-14 bg-card-dark border-b-2 border-border-dark flex items-center justify-between px-4 z-40 shrink-0">
        <div class="flex items-center gap-2">
            <div class="size-8 bg-primary rounded flex items-center justify-center">
                <Sparkles size={18} class="text-white" />
            </div>
            <span class="font-black uppercase tracking-tight text-sm font-monoton">24Flow</span>
        </div>
        <button 
            onclick={() => isSidebarOpen = true}
            class="p-2 hover:bg-white/5 rounded-lg transition-colors"
        >
            <Menu size={24} />
        </button>
    </header>

    <div class="flex flex-1 overflow-hidden relative">
        <main class="flex-1 flex flex-col relative overflow-hidden bg-[#0b0f17]">
            <div class="px-4 md:px-8 py-4 md:py-6 flex flex-col gap-4 md:gap-6 border-b-2 border-border-dark bg-background-dark shrink-0">
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
                    <div class="flex flex-col gap-1">
                        <p class={isEditMode ? "text-yellow-500 text-xs md:text-sm font-bold uppercase flex items-center gap-2" : "text-[#92a4c9] text-xs md:text-sm font-bold uppercase tracking-wider"}>
                            {#if isEditMode}<Edit3 size={14} /> Editing Schedule{:else}Generated Schedule{/if}
                        </p>
                        <h1 class="text-2xl md:text-4xl font-black uppercase tracking-tight truncate">Week {weekOffset + 1}: Exam Prep</h1>
                    </div>
                    <div class="flex gap-2 md:gap-3">
                        {#if isEditMode}
                            <button onclick={() => isEditMode = false} class="flex-1 sm:flex-none flex items-center justify-center gap-2 h-10 px-4 bg-background-dark border-2 border-red-500/50 text-red-400 text-xs md:text-sm font-bold uppercase rounded shadow-hard">
                                <X size={16} /> <span>Cancel</span>
                            </button>
                            <button onclick={() => isEditMode = false} class="flex-1 sm:flex-none flex items-center justify-center gap-2 h-10 px-4 bg-success border-2 border-transparent text-white text-xs md:text-sm font-bold uppercase rounded shadow-hard">
                                <Save size={16} /> <span>Save</span>
                            </button>
                        {:else}
                            <button class="flex-1 sm:flex-none flex items-center justify-center gap-2 h-10 px-4 bg-card-dark border-2 border-border-dark text-white text-xs md:text-sm font-bold uppercase rounded shadow-hard">
                                <FileDown size={16} /> <span>Export</span>
                            </button>
                            <button onclick={() => isEditMode = true} class="flex-1 sm:flex-none flex items-center justify-center gap-2 h-10 px-4 bg-primary border-2 border-transparent text-white text-xs md:text-sm font-bold uppercase rounded shadow-hard">
                                <Edit3 size={16} /> <span>Edit</span>
                            </button>
                        {/if}
                    </div>
                </div>

                <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 {isEditMode ? 'opacity-70 pointer-events-none grayscale' : ''}">
                    <div class="flex items-center bg-card-dark border-2 border-border-dark rounded overflow-hidden w-full md:w-auto">
                        <button onclick={() => weekOffset--} class="flex-1 md:flex-none h-10 px-3 hover:bg-white/5 border-r border-border-dark text-white"><ChevronLeft size={20} /></button>
                        <div class="flex-[3] md:flex-none px-4 h-10 flex items-center justify-center text-white font-bold text-xs md:text-sm min-w-[140px] font-mono">{formatDateRange()}</div>
                        <button onclick={() => weekOffset++} class="flex-1 md:flex-none h-10 px-3 hover:bg-white/5 border-l border-border-dark text-white"><ChevronRight size={20} /></button>
                    </div>
                    <div class="flex p-1 bg-card-dark border-2 border-border-dark rounded w-full md:w-auto">
                        <button class="flex-1 md:flex-none px-4 py-1.5 rounded text-[#92a4c9] text-xs font-bold uppercase">Daily</button>
                        <button class="flex-1 md:flex-none px-4 py-1.5 rounded bg-background-dark text-white shadow-sm border border-border-dark text-xs font-bold uppercase">Weekly</button>
                        <button class="flex-1 md:flex-none px-4 py-1.5 rounded text-[#92a4c9] text-xs font-bold uppercase">List</button>
                    </div>
                </div>
            </div>

            <div class="flex-1 overflow-auto p-4 md:p-8 custom-scrollbar">
                <div class="min-w-[800px] md:min-w-[1000px] border-2 border-border-dark bg-background-dark rounded shadow-hard">
                    <div class="grid grid-cols-8 border-b-2 border-border-dark bg-card-dark z-10">
                        <div class="p-4 border-r border-border-dark flex items-center justify-center bg-card-dark">
                            <span class="text-[#92a4c9] text-[10px] md:text-xs font-bold uppercase tracking-widest">Time</span>
                        </div>
                        {#each ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as day, i}
                            <div class="p-2 md:p-4 border-r border-border-dark text-center {i > 4 ? 'bg-white/5' : ''}">
                                <div class="text-[#92a4c9] text-[10px] md:text-xs font-bold uppercase mb-1">{day}</div>
                                <div class="text-white text-base md:text-lg font-black">{getDayDate(i).getDate()}</div>
                            </div>
                        {/each}
                    </div>

                    {#each hours24 as time}
                        <div class="grid grid-cols-8 border-b border-border-dark min-h-[100px] md:min-h-[120px]">
                            <div class="p-2 md:p-4 border-r border-border-dark flex flex-col justify-start bg-card-dark/30">
                                <span class="text-white font-bold font-mono text-xs md:text-sm">{time}</span>
                            </div>
                            {#each Array(7) as _, dayIndex}
                                {@const entry = getEntry(dayIndex, time)}
                                <div 
                                    role="gridcell"
                                    class="p-1 md:p-2 border-r border-border-dark relative group {dayIndex > 4 ? 'bg-white/5' : ''}"
                                    ondragover={(e) => isEditMode && e.preventDefault()}
                                    ondrop={(e) => isEditMode && onDrop(e, dayIndex, time)}
                                >
                                    {#if entry}
                                        <div 
                                            draggable={isEditMode}
                                            ondragstart={(e) => isEditMode && onDragStart(e, entry, 'calendar')}
                                            class="h-full w-full {entry.isBreak ? 'bg-[#232f48]' : entry.color} p-2 md:p-3 rounded-sm border border-white/10 shadow-hard transition-all {isEditMode ? 'cursor-grab active:cursor-grabbing border-white/30' : 'hover:-translate-y-0.5'} flex flex-col justify-between overflow-hidden"
                                        >
                                            <div class="flex justify-between items-start">
                                                <div class="flex flex-col overflow-hidden">
                                                    <span class="{entry.subColor || 'text-[#92a4c9]'} text-[8px] md:text-[9px] font-bold uppercase truncate">{entry.type}</span>
                                                    <span class="text-white font-bold leading-tight text-[10px] md:text-xs line-clamp-2">{entry.title}</span>
                                                </div>
                                                {#if isEditMode}
                                                    <button onclick={() => deleteEntry(entry.id)} class="text-white/40 hover:text-red-400 shrink-0"><Trash2 size={12} /></button>
                                                {/if}
                                            </div>
                                            {#if !entry.isBreak}
                                                <div class="flex items-center gap-1 text-white/80 text-[8px] md:text-[9px] font-bold mt-1">
                                                    <Timer size={8} /> <span>{entry.duration}</span>
                                                </div>
                                            {/if}
                                        </div>
                                    {:else if isEditMode}
                                        <div class="h-full w-full border-2 border-dashed border-white/5 rounded-sm flex items-center justify-center group-hover:border-white/20 transition-all">
                                            <Plus size={16} class="text-white/10 group-hover:text-white/30" />
                                        </div>
                                    {/if}
                                </div>
                            {/each}
                        </div>
                    {/each}
                </div>
            </div>

           <button 
    onclick={() => showDetailedModal = true} 
    class="absolute bottom-6 right-6 md:bottom-8 md:right-8 size-12 md:size-14 bg-white text-primary rounded shadow-hard hover:shadow-hard-hover hover:-translate-y-1 transition-all flex items-center justify-center border-2 border-border-dark z-30 group"
    aria-label="Add new task"
>
    <div class="pointer-events-none flex items-center justify-center transition-transform duration-300 {isEditMode ? 'group-hover:rotate-90' : ''}">
        <Plus size={28} />
    </div>
</button>
        </main>

        <div 
            bind:this={overlayElement}
            class="fixed inset-0 bg-black/60 z-40 hidden opacity-0" 
            onclick={() => isSidebarOpen = false}
        ></div>

        <aside 
            bind:this={sidebarElement}
            class="
                fixed lg:relative inset-y-0 left-0 w-72 md:w-80 bg-[#0B111C] md:bg-card-dark border-r-2 lg:border-r-0 lg:border-l-2 border-border-dark 
                z-50 lg:z-10 flex flex-col shrink-0 -translate-x-full lg:translate-x-0
            "
        >
            <div class="p-6 border-b-2 border-border-dark bg-background-dark flex justify-between items-center shrink-0">
                {#if isEditMode}
                    <h3 class="text-white font-bold uppercase tracking-wider text-xs md:text-sm flex items-center gap-2">
                        <MousePointer2 size={16} class="text-yellow-500" /> Backlog
                    </h3>
                {:else}
                    <h3 class="text-white font-bold uppercase tracking-wider text-xs md:text-sm flex items-center gap-2">
                        <Sparkles size={16} class="text-primary" /> AI Insights
                    </h3>
                {/if}
                <button onclick={() => isSidebarOpen = false} class="lg:hidden text-gray-400 hover:text-white"><X size={20} /></button>
            </div>

            <div class="p-4 md:p-6 overflow-y-auto flex-1 flex flex-col gap-6 custom-scrollbar">
                {#if isEditMode}
                    {#each backlog as task}
                        <div draggable="true" ondragstart={(e) => onDragStart(e, task, 'backlog')} class="bg-card-dark p-3 rounded border border-white/10 hover:border-primary/50 cursor-grab group transition-all hover:bg-white/5">
                            <div class="flex justify-between items-start mb-2">
                                <span class="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-400/10 px-1.5 py-0.5 rounded">{task.type}</span>
                                <GripVertical size={14} class="text-white/20 group-hover:text-white" />
                            </div>
                            <h4 class="text-white font-bold text-xs md:text-sm leading-tight">{task.title}</h4>
                            <div class="flex items-center gap-2 mt-2 text-[10px] md:text-xs text-[#92a4c9]"><Timer size={12} /> {task.duration}</div>
                        </div>
                    {/each}
                    <button onclick={() => showCreateModal = true} class="w-full h-10 border-2 p-3 border-dashed border-border-dark rounded flex items-center justify-center text-[#92a4c9] text-xs font-bold uppercase hover:text-white hover:border-white/20 transition-all gap-2">
                        <Plus size={16} /> Create Task
                    </button>
                {:else}
                    <div class="p-4 rounded border-2 border-primary/50 bg-primary/10 relative">
                        <div class="absolute -top-3 left-3 px-2 bg-background-dark border border-primary text-primary text-[9px] font-bold uppercase">Optimization</div>
                        <p class="text-white text-xs md:text-sm font-medium leading-relaxed mt-2">
                        High cognitive load detected on Tuesday. Moving <span class="text-white underline decoration-wavy decoration-primary">History Essay</span> to Wednesday is recommended for better retention.
                        </p>
                        <div class="mt-4 flex gap-2">
                            <button class="flex-1 h-8 bg-primary text-white text-[10px] font-bold uppercase rounded">Apply</button>
                            <button class="flex-1 h-8 px-2 border border-border-dark text-[#92a4c9] text-[10px] font-bold uppercase rounded">Dismiss</button>
                        </div>
                    </div>
                    <div>
                        <h4 class="text-[#92a4c9] text-[10px] font-bold uppercase mb-2">Weekly Load</h4>
                        <div class="flex items-end gap-2 mb-2">
                            <span class="text-3xl font-black text-white">{totalHours}</span>
                            <span class="text-xs font-bold text-[#92a4c9] mb-1">hrs</span>
                        </div>
                        <div class="w-full bg-[#232f48] h-2 rounded-full overflow-hidden">
                            <div class="bg-gradient-to-r from-primary to-purple-600 h-full" style="width: {progressWidth}%"></div>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 gap-3">
                        <div class="p-3 border-2 border-border-dark bg-background-dark rounded flex items-center gap-3">
                            <div class="size-8 rounded-full bg-[#232f48] flex items-center justify-center text-white shrink-0"><Bed size={16} /></div>
                            <div class="overflow-hidden">
                                <div class="text-[#92a4c9] text-[9px] font-bold uppercase">Next Break</div>
                                <div class="text-white font-bold text-xs truncate">{getNextStatus().break?.time ?? 'Done'}</div>
                            </div>
                        </div>
                        <div class="p-3 border-2 border-border-dark bg-background-dark rounded flex items-center gap-3">
                            <div class="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0"><BookOpen size={16} /></div>
                            <div class="overflow-hidden">
                                <div class="text-[#92a4c9] text-[9px] font-bold uppercase">Next Study</div>
                                <div class="text-white font-bold text-xs truncate">{getNextStatus().work?.title ?? 'Done'}</div>
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
        </aside>
    </div>
    
    {#if showCreateModal}
        <div class="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <div class="bg-card-dark border-2 border-border-dark w-full max-w-md rounded shadow-hard p-5 md:p-6 animate-in zoom-in-95 duration-200">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-lg md:text-xl font-black uppercase text-white">New Task</h3>
                    <button onclick={() => showCreateModal = false} class="text-gray-400 hover:text-white"><X size={24} /></button>
                </div>
                <div class="space-y-4">
                    <div>
                        <label class="block text-[10px] font-bold uppercase text-[#92a4c9] mb-1">Title</label>
                        <input bind:value={newTask.title} type="text" class="w-full bg-background-dark border-2 border-border-dark rounded px-4 py-2 text-white focus:border-primary outline-none" placeholder="Physics Review" />
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-[10px] font-bold uppercase text-[#92a4c9] mb-1">Type</label>
                            <select bind:value={newTask.type} class="w-full bg-background-dark border-2 border-border-dark rounded px-4 py-2 text-white outline-none">
                                <option>Deep Work</option><option>Math</option><option>History</option><option>Reading</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-[10px] font-bold uppercase text-[#92a4c9] mb-1">Duration</label>
                            <input bind:value={newTask.duration} type="text" class="w-full bg-background-dark border-2 border-border-dark rounded px-4 py-2 text-white outline-none" placeholder="1h 30m" />
                        </div>
                    </div>
                    <button onclick={createTask} class="w-full bg-primary py-3 rounded text-white font-bold uppercase shadow-hard hover:translate-x-0.5 hover:translate-y-0.5 transition-all mt-4">Add Task</button>
                </div>
            </div>
        </div>
    {/if}
</div>
<AddTaskModal 
    bind:show={showDetailedModal} 
    onAdd={handleDetailedAdd} 
/>

<style>
    .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: #111722; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #232f48; border-radius: 4px; }
    .shadow-hard { box-shadow: 4px 4px 0px 0px rgba(0,0,0,0.5); }
    .bg-success { background-color: #16a34a; }
</style>