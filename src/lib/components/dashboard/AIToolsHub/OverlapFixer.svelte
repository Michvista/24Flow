<script lang="ts">
    import { 
        TriangleAlert, 
        ArrowDown, 
        Check, 
        BrainCircuit, 
        Wand2,
        ChevronLeft,
        ChevronRight
    } from 'lucide-svelte';
    import { fade, slide } from 'svelte/transition';
    import Navbar from '../../../../components/dashboard/Navbar.svelte';

    // State management
    let isResolved = $state(false);
    let showAnalysis = $state(true);
    let currentConflictIdx = $state(0);

	function generateErrorId() {
  const number = Math.floor(1000 + Math.random() * 9000); // 1000–9999
  return `#ERR-${number}`;
}

    
    const allConflicts = $state([
        {
            id: generateErrorId(),
            summary: "2 Tasks Collision",
            tasks: [
                { title: "Marketing Sync", start: 1400, end: 1500, type: "static" },
                { title: "Design Review", start: 1415, end: 1515, type: "conflict" }
            ],
            analysis: "Detected a 45-minute overlap with 'Marketing Sync'. 'Design Review' participants are free at 15:00."
        },
        {
            id: generateErrorId(),
            summary: "3 Tasks Collision",
            tasks: [
                { title: "Project Alpha", start: 1400, end: 1500, type: "static" },
                { title: "Budget Sync", start: 1420, end: 1520, type: "conflict" },
                { title: "Dev Standup", start: 1445, end: 1545, type: "conflict" }
            ],
            analysis: "Major collision detected. Moving 'Budget Sync' to 15:00 and 'Dev Standup' to 16:00 is recommended."
        }
    ]);

    let activeConflict = $derived(allConflicts[currentConflictIdx]);

    // Function to automatically calculate CSS positions based on time and index
    function calculatePosition(task, index) {
        // Base time starts at 14:00 (represented as 1400)
        const baseTime = 1400; 
        const pixelsPerMinute = 1.2; // Scaling factor for height
        
        const startOffsetMinutes = (task.start - baseTime); 
        const durationMinutes = (task.end - task.start);

        return {
            top: `${8 + (startOffsetMinutes * 1.5)}px`, // Calculates vertical position
            left: `${8 + (index * 20)}px`,             // Offsets each overlapping card to the right
            right: `${8 + (index * -5)}px`,            // Adjusts width to keep stacking look
            height: `${durationMinutes * 1.5}px`,       // Dynamic height
            zIndex: index + 10
        };
    }

    function handleAccept() { isResolved = true; }
    function handleDecline() { console.log("Fix declined"); }
    
    function next() { if (currentConflictIdx < allConflicts.length - 1) currentConflictIdx++; }
    function prev() { if (currentConflictIdx > 0) currentConflictIdx--; }
</script>

<div class="pb-6">
    <Navbar />
</div>

<div class="relative z-20 pb-6 w-full max-w-[960px] font-display mx-auto px-4">
    <div class="absolute -inset-1 bg-primary/20 rounded-xl blur-sm -z-10"></div>

    <div class="bg-[#111822] border-2 border-primary rounded-lg shadow-[8px_8px_0px_0px_#0e62d8] flex flex-col overflow-hidden">
        
        <div class="bg-[#192434] border-b-2 border-primary p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div class="flex items-center gap-4">
                <div class="bg-red-500/10 border-2 border-red-500 p-2 rounded shrink-0">
                    <TriangleAlert class="text-red-500 animate-pulse" size={32} />
                </div>
                <div>
                    <h1 class="text-white text-2xl md:text-3xl font-black uppercase tracking-tight leading-none mb-1">
                        {isResolved ? 'Overlap Resolved' : 'Overlap Detected'}
                    </h1>
                    <div class="flex items-center gap-3">
                        <p class="text-slate-400 font-mono text-xs md:text-sm tracking-wide">
                            Conflict ID: <span class="text-white">{activeConflict.id}</span> // {activeConflict.summary}
                        </p>
                        <div class="flex items-center gap-1 ml-2">
                            <button onclick={prev} disabled={currentConflictIdx === 0} class="p-1 hover:bg-white/10 rounded disabled:opacity-20 text-white">
                                <ChevronLeft size={24} />
                            </button>
                            <span class="text-[14px] text-primary font-bold">{currentConflictIdx + 1}/{allConflicts.length}</span>
                            <button onclick={next} disabled={currentConflictIdx === allConflicts.length - 1} class="p-1 hover:bg-white/10 rounded disabled:opacity-20 text-white">
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded text-primary text-xs font-bold uppercase tracking-wider">
                <BrainCircuit size={16} class="animate-spin-slow" />
                <span>AI Active Resolution</span>
            </div>
        </div>

        <div class="p-6 md:p-8 flex flex-col gap-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
                <div class="hidden lg:block absolute left-1/2 top-4 bottom-4 w-px bg-[#233248]"></div>

                <div class="flex flex-col gap-3">
                    <div class="flex justify-between items-end border-b border-[#233248] pb-2 mb-2">
                        <h3 class="text-red-400 font-bold uppercase tracking-wide text-sm">Current State</h3>
                        <span class="text-red-400/60 text-xs font-mono">Collision Cluster</span>
                    </div>
                    
                    <div class="relative h-64 bg-[#0b1016] border-2 border-red-500/30 border-dashed rounded overflow-hidden">
                        <div class="absolute left-0 top-0 bottom-0 w-12 border-r border-[#233248]/50 flex flex-col justify-between py-2 text-[10px] text-slate-500 font-mono text-center">
                            <span>14:00</span><span>14:30</span><span>15:00</span><span>15:30</span>
                        </div>
                        
                        <div class="absolute inset-y-0 left-12 right-0 p-2">
                            {#each activeConflict.tasks as task, i}
                                {@const pos = calculatePosition(task, i)}
                                <div 
                                    class="absolute border-2 rounded p-3 transition-all duration-500 {task.type === 'static' ? 'bg-[#1f2937] border-slate-600 opacity-60' : 'bg-[#2d1b1b] border-red-500 shadow-lg'}"
                                    style="top: {pos.top}; left: {pos.left}; right: {pos.right}; height: {pos.height}; z-index: {pos.zIndex}; {task.type === 'conflict' ? 'background-image: repeating-linear-gradient(-45deg, rgba(239,68,68,0.1) 0px, rgba(239,68,68,0.1) 10px, rgba(239,68,68,0.2) 10px, rgba(239,68,68,0.2) 20px);' : ''}"
                                >
                                    <div class="flex items-center gap-2">
                                        {#if task.type === 'conflict'} <TriangleAlert size={14} class="text-red-500" /> {/if}
                                        <span class="text-white text-xs font-bold uppercase truncate">{task.title}</span>
                                    </div>
                                    {#if task.type === 'conflict'}
                                        <div class="mt-2 bg-red-500/20 text-red-200 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded w-fit border border-red-500/50">
                                            Overlap
                                        </div>
                                    {/if}
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>

                <div class="flex flex-col gap-3">
                    <div class="flex justify-between items-end border-b border-primary/30 pb-2 mb-2">
                        <h3 class="text-primary font-bold uppercase tracking-wide text-sm flex items-center gap-2">
                            AI Proposal 
                            <span class="px-1.5 py-0.5 rounded bg-primary text-white text-[10px] shadow-[2px_2px_0_0_rgba(255,255,255,0.2)]">OPTIMIZED</span>
                        </h3>
                    </div>

                    <div class="relative h-64 bg-[#0b1016] border-2 border-primary rounded shadow-[inset_0_0_20px_rgba(14,98,216,0.1)] overflow-hidden">
                        <div class="absolute left-0 top-0 bottom-0 w-12 border-r border-[#233248]/50 flex flex-col justify-between py-2 text-[10px] text-slate-500 font-mono text-center bg-[#111822]">
                            <span>14:00</span><span>15:00</span><span>16:00</span>
                        </div>
                        
                        <div class="absolute inset-y-0 left-12 right-0 p-2 flex flex-col gap-2">
                           {#each activeConflict.tasks as task, i}
                            <div class="w-full bg-primary/10 border-2 border-primary/40 rounded p-3 flex items-center justify-between {isResolved ? 'border-green-500 bg-green-500/10' : ''}">
                                <div>
                                    <span class="text-white text-xs font-bold block">{task.title}</span>
                                    <span class="text-[10px] text-primary font-mono">{isResolved ? 'Scheduled' : 'Optimized Slot'}</span>
                                </div>
                                <div class="size-6 rounded-full bg-primary flex items-center justify-center {isResolved ? 'bg-green-500' : ''}">
                                    <Check size={14} class="text-white" />
                                </div>
                            </div>
                           {/each}
                        </div>
                    </div>
                </div>
            </div>

            {#if showAnalysis}
            <div transition:slide class="bg-[#0b1016] border border-[#233248] rounded flex flex-col md:flex-row overflow-hidden">
                <div class="p-4 bg-[#192434] border-b md:border-b-0 md:border-r border-[#233248] flex items-center gap-3 md:w-48 shrink-0">
                    <BrainCircuit size={18} class="text-slate-400" />
                    <span class="text-slate-300 text-xs font-bold uppercase">Analysis Logic</span>
                </div>
                <div class="p-4 flex-1 font-mono text-sm leading-relaxed text-slate-300">
                    <p><span class="text-primary mr-2">></span> {activeConflict.analysis}</p>
                </div>
            </div>
            {/if}

            <div class="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-4 pt-6 border-t-2 border-[#233248] mt-2">
                <button onclick={handleDecline} class="px-8 py-3 rounded border-2 border-slate-600 text-slate-300 font-bold uppercase tracking-wider hover:bg-slate-800 transition-all">
                    Decline
                </button>
                <button onclick={handleAccept} disabled={isResolved} class="relative group px-10 py-3 rounded bg-primary border-2 border-primary text-white font-bold uppercase tracking-wider shadow-[4px_4px_0px_0px_#0e62d8] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-3 disabled:opacity-50">
                    <span>{isResolved ? 'Fix Applied' : 'Accept Fix'}</span>
					<Wand2 size={20} class="group-hover:rotate-12 transition-transform" />
                </button>
            </div>
        </div>
    </div>
</div>

<style>
    :global(.animate-spin-slow) { animation: spin 3s linear infinite; }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
</style>