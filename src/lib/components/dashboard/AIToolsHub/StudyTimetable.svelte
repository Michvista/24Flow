<script lang="ts">
    import Navbar from '../../../../components/dashboard/Navbar.svelte';
    import { 
        BookOpen, 
        AlertCircle, 
        List, 
        Plus, 
        Calendar, 
        Clock, 
        Brain, 
        Trash2, 
        Sparkles 
    } from 'lucide-svelte';

    // State for form inputs
    let subjectName = $state("");
    let priority = $state("High");
    let topicList = $state("");
    let dailyHours = $state(4);
    let deadline = $state("");
    let includeBreaks = $state(true);
    let spacedRepetition = $state(false);

    // Data for the queue
    let queuedSubjects = $state([
        { id: 1, name: "Linear Algebra", topics: 12, priority: "High" },
        { id: 2, name: "Thermodynamics", topics: 8, priority: "Med" }
    ]);

    // 1 & 2. Dynamic Calculations and Adding Subjects
    const totalTopics = $derived(queuedSubjects.reduce((acc, s) => acc + s.topics, 0));
    const estimatedHours = $derived(totalTopics * 4.3); // Mock formula: 4.3 hours per topic

    function addSubject() {
        if (!subjectName || !topicList) return;

        // Split by newlines or commas and filter empty strings
        const topics = topicList.split(/[\n,]+/).filter(t => t.trim().length > 0);
        
        const newSubject = {
            id: Date.now(),
            name: subjectName,
            topics: topics.length,
            priority: priority
        };

        queuedSubjects.push(newSubject);
        
        // Reset form
        subjectName = "";
        topicList = "";
    }

    function removeSubject(id: number) {
        queuedSubjects = queuedSubjects.filter(s => s.id !== id);
    }
</script>

<svelte:head>
    <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Noto+Sans:wght@400;500;700&display=swap"
        rel="stylesheet"
    />
</svelte:head>

<div>
    <Navbar />
</div>

<div class="bg-background-dark text-white min-h-screen flex flex-col overflow-x-hidden font-display">
    <main class="flex-1 flex flex-col lg:flex-row w-full max-w-[1600px] mx-auto p-6 md:p-10 gap-8">
        <section class="flex-1 flex flex-col gap-8 min-w-0">
            <div class="border-l-4 border-primary pl-6 py-2">
                <h2 class="text-4xl md:text-5xl font-black uppercase leading-none tracking-tight mb-2">
                    Configure<br />Timetable
                </h2>
                <p class="text-slate-400 text-lg font-mono">
                    Enter your subject details and let AI organize an optimal study schedule tailored to your needs.
                </p>
            </div>

            <div class="bg-surface-dark border-2 border-border-color p-6 md:p-8 shadow-neo-white relative group">
                <div class="absolute -top-3 left-4 bg-background-dark border border-border-color px-2 py-0.5 text-xs font-mono text-primary uppercase font-bold tracking-widest z-10">
                    Step 01: Subject Details
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <label class="flex flex-col gap-2">
                        <span class="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                            <BookOpen class="text-primary size-4" /> Subject Name
                        </span>
                        <input
                            bind:value={subjectName}
                            class="neo-input w-full bg-[#192233] border-2 border-border-color text-white p-4 font-mono text-sm placeholder:text-slate-600 focus:ring-0 transition-all duration-200"
                            placeholder="e.g. Advanced Calculus"
                            type="text"
                        />
                    </label>
                    <label class="flex flex-col gap-2">
                        <span class="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                            <AlertCircle class="text-primary size-4" /> Priority
                        </span>
                        <div class="grid grid-cols-3 gap-2">
                            {#each ['High', 'Med', 'Low'] as p}
                                <label class="cursor-pointer relative">
                                    <input
                                        type="radio"
                                        name="priority"
                                        value={p}
                                        bind:group={priority}
                                        class="peer sr-only"
                                    />
                                    <div class="h-14 flex flex-col items-center justify-center border-2 border-border-color bg-[#192233] text-slate-400 peer-checked:bg-primary/20 peer-checked:border-primary peer-checked:text-white transition-all font-bold text-xs uppercase hover:bg-white/5">
                                        {p}
                                    </div>
                                </label>
                            {/each}
                        </div>
                    </label>
                </div>
                <label class="flex flex-col gap-2 mb-6">
                    <span class="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                        <List class="text-primary size-4" /> Topic List / Syllabus
                    </span>
                    <textarea
                        bind:value={topicList}
                        class="neo-input w-full bg-[#192233] border-2 border-border-color text-white p-4 font-mono text-sm placeholder:text-slate-600 focus:ring-0 resize-none transition-all duration-200"
                        placeholder="Paste topics (e.g. Limits, Derivatives, Integrals NOTE: add commas to space out topics)..."
                        rows="4"
                    ></textarea>
                </label>
                <button 
                    onclick={addSubject}
                    class="w-full py-3 border-2 border-dashed border-primary/50 text-primary font-bold uppercase hover:bg-primary/10 hover:border-primary transition-all flex items-center justify-center gap-2 group/btn"
                >
                    <Plus class="size-5 group-hover/btn:rotate-90 transition-transform" /> Add Subject to Queue
                </button>
            </div>

            <div class="bg-surface-dark border-2 border-border-color p-6 md:p-8 shadow-neo-white relative mt-4">
                <div class="absolute -top-3 left-4 bg-background-dark border border-border-color px-2 py-0.5 text-xs font-mono text-primary uppercase font-bold tracking-widest z-10">
                    Step 02: Constraints
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="flex flex-col gap-4">
                        <div class="flex justify-between items-end">
                            <span class="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                                <Clock class="text-primary size-4" /> Daily Hours
                            </span>
                            <span class="text-2xl font-black text-primary">{dailyHours}<span class="text-sm text-slate-500 font-normal ml-1">hrs</span></span>
                        </div>
                        <input class="w-full range-slider" max="12" min="1" type="range" bind:value={dailyHours} />
                        <div class="flex justify-between text-xs font-mono text-slate-500">
                            <span>1h</span><span>6h</span><span>12h</span>
                        </div>
                    </div>
                    <label class="flex flex-col gap-2">
                        <span class="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                            <Calendar class="text-primary size-4" /> Exam Deadline
                        </span>
                        <input
                            bind:value={deadline}
                            class="neo-input w-full bg-[#192233] border-2 border-border-color text-white h-14 px-4 font-mono text-sm focus:ring-0 uppercase"
                            type="date"
                        />
                    </label>
                </div>
                <hr class="border-border-color my-6 border-dashed" />
                
                <div class="flex flex-wrap gap-6">
                    <label class="inline-flex items-center cursor-pointer group">
                        <input type="checkbox" bind:checked={includeBreaks} class="sr-only peer" />
                        <div class="relative w-11 h-6 bg-slate-700 rounded-sm border border-slate-500 peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-sm after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
                        <span class="ms-3 text-sm font-bold uppercase group-hover:text-white transition-colors">Include Breaks</span>
                    </label>
                    <label class="inline-flex items-center cursor-pointer group">
                        <input type="checkbox" bind:checked={spacedRepetition} class="sr-only peer" />
                        <div class="relative w-11 h-6 bg-slate-700 rounded-sm border border-slate-500 peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-sm after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
                        <span class="ms-3 text-sm font-bold uppercase group-hover:text-white transition-colors">Spaced Repetition</span>
                    </label>
                </div>
            </div>

            <button class="relative w-full bg-primary text-white text-xl font-black uppercase py-6 border-2 border-white shadow-neo hover:shadow-neo-hover hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all group overflow-hidden">
                <span class="relative z-10 flex items-center justify-center gap-3">
                    <Sparkles class="size-7 animate-pulse" />
                    Generate Timetable
                </span>
                <div class="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </button>
        </section>

        <aside class="w-full lg:w-[400px] flex flex-col gap-6 shrink-0">
            <div class="bg-[#0a101a] border-2 border-primary p-6 relative">
                <div class="absolute -top-3 right-4 bg-primary border border-primary px-2 py-0.5 text-xs font-mono text-white uppercase font-bold tracking-widest z-10 animate-pulse">
                    AI Active
                </div>
                <h3 class="text-primary text-lg font-black uppercase mb-4 flex items-center gap-2">
                    <Brain class="size-5" /> Insights
                </h3>
                <div class="flex flex-col gap-4">
                    <div class="bg-primary/10 border-l-4 border-primary p-3 text-sm">
                        <span class="font-bold text-white">Suggestion:</span> Breaking tasks into 45-min blocks is 20% more effective.
                    </div>
                </div>
            </div>

            <div class="bg-surface-dark border-2 border-border-color flex-1 flex flex-col p-6 shadow-neo-white">
                <h3 class="text-white text-lg font-black uppercase mb-4 border-b-2 border-border-color pb-2">Queued Subjects</h3>
                <div class="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                    {#each queuedSubjects as subject (subject.id)}
                        <div class="flex items-center justify-between p-3 bg-[#192233] border border-border-color group hover:border-white transition-colors">
                            <div>
                                <p class="font-bold text-sm">{subject.name}</p>
                                <p class="text-xs text-slate-400 font-mono mt-1">{subject.topics} Topics • {subject.priority} Priority</p>
                            </div>
                            <button onclick={() => removeSubject(subject.id)} class="text-slate-500 hover:text-red-500 transition-colors">
                                <Trash2 class="size-4" />
                            </button>
                        </div>
                    {/each}
                    {#if queuedSubjects.length === 0}
                        <p class="text-slate-600 text-xs text-center font-mono mt-4 italic">No subjects in queue</p>
                    {/if}
                </div>
                <div class="mt-6 pt-4 border-t-2 border-border-color grid grid-cols-2 gap-4">
                    <div class="text-center">
                        <p class="text-xs text-slate-500 font-mono uppercase">Total Topics</p>
                        <p class="text-2xl font-black text-white">{totalTopics}</p>
                    </div>
                    <div class="text-center">
                        <p class="text-xs text-slate-500 font-mono uppercase">Est. Hours</p>
                        <p class="text-2xl font-black text-primary">{estimatedHours.toFixed(0)}h</p>
                    </div>
                </div>
            </div>
        </aside>
    </main>

    <footer class="border-t-2 border-border-color bg-background-dark py-8 mt-12">
        <div class="max-w-[1600px] mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-xs font-mono text-slate-500 uppercase">© 2026 AI Scheduler Inc. // System v2.4.1</p>
            <div class="flex gap-6">
                <a class="text-xs font-bold text-slate-400 hover:text-primary uppercase" href="/">Privacy</a>
                <a class="text-xs font-bold text-slate-400 hover:text-primary uppercase" href="/">Terms</a>
            </div>
        </div>
    </footer>
</div>

<style>
    :global(.dark) {
        --primary: #0f49bd;
        --border-color: #324467;
        --background-dark: #020a1a;
        --surface-dark: #111722;
    }

    .font-display { font-family: "Space Grotesk", sans-serif; }

    .custom-scrollbar::-webkit-scrollbar { width: 8px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: #020a1a; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #0f49bd; }

    .shadow-neo { box-shadow: 4px 4px 0px 0px #0f49bd; }
    .shadow-neo-hover { box-shadow: 2px 2px 0px 0px #0f49bd; }
    .shadow-neo-white { box-shadow: 4px 4px 0px 0px #ffffff; }

    .neo-input:focus {
        outline: none;
        border-color: #0f49bd;
        box-shadow: 4px 4px 0px 0px #0f49bd;
        transform: translate(-1px, -1px);
    }

    .range-slider {
        -webkit-appearance: none;
        background: transparent;
    }

    .range-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 24px;
        width: 24px;
        background: #0f49bd;
        margin-top: -10px;
        border: 2px solid #fff;
        cursor: pointer;
    }

    .range-slider::-webkit-slider-runnable-track {
        width: 100%;
        height: 4px;
        background: #324467;
    }
</style>