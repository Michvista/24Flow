<script lang="ts">
	import { WandSparkles, Plus, Trash2, Clock } from 'lucide-svelte';
	import Navbar from '../../../../components/dashboard/Navbar.svelte';

	// Task State
	let tasks = $state([
		{ id: 1, title: 'Design System Audit', duration: 60, tag: 'High Priority', color: 'border-primary' },
		{ id: 2, title: 'Client Emails', duration: 30, tag: 'Batch', color: 'border-pink-500' },
		{ id: 3, title: 'Frontend Deployment', duration: 45, tag: 'DevOps', color: 'border-yellow-500' }
	]);

	// Form State
	let newTaskTitle = $state('');
	let newTaskMins = $state<number | null>(null);

	// Availability State
	let startTime = $state('09:00');
	let endTime = $state('17:00');

	function addTask() {
		if (!newTaskTitle || !newTaskMins) return;
		const newTask = {
			id: Date.now(),
			title: newTaskTitle,
			duration: newTaskMins,
			tag: 'New Task',
			color: 'border-primary'
		};
		tasks = [...tasks, newTask];
		newTaskTitle = '';
		newTaskMins = null;
	}

	function deleteTask(id: number) {
		tasks = tasks.filter(t => t.id !== id);
	}

	const totalMinutes = $derived(tasks.reduce((sum, t) => sum + t.duration, 0));
	const formattedTotal = $derived(`${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`);
</script>

<div class="pb-6">
    <Navbar />
</div>
<div class="flex flex-col gap-10 pb-6 max-w-3xl mx-auto w-full font-display">
	<section class="flex flex-col gap-6">
        <div class="mb-12 text-center">
<h1 class="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4">
            AI Auto-Fill <span class="text-primary">Scheduler</span>
</h1>
<p class="text-gray-400 text-lg font-mono uppercase tracking-wide max-w-2xl mx-auto">
            Input your tasks and availability. Let AI optimize your day.
        </p>
</div>
		<div class="flex items-center gap-3">
			<div class="bg-primary text-white font-bold w-8 h-8 flex items-center justify-center border border-white">1</div>
			<h2 class="text-2xl font-bold uppercase tracking-tight text-white">Your Tasks</h2>
		</div>

		<div class="bg-[#16202c] border-2 border-[#2d4059] p-6 md:p-8 shadow-[4px_4px_0px_0px_#1973f0]">
			<div class="flex flex-col md:flex-row gap-4 items-end mb-8">
				<label class="flex flex-col flex-1 gap-2 w-full">
					<span class="text-xs font-bold uppercase text-primary tracking-widest">Task Name</span>
					<input 
						bind:value={newTaskTitle}
						class="w-full bg-[#101822] border-2 border-[#2d4059] text-white placeholder-gray-600 px-4 py-3 focus:outline-none focus:border-primary transition-all font-mono text-sm" 
						placeholder="e.g. Q3 Report Review" 
						type="text"
					/>
				</label>
				<label class="flex flex-col w-full md:w-32 gap-2">
					<span class="text-xs font-bold uppercase text-primary tracking-widest">Mins</span>
					<input 
						bind:value={newTaskMins}
						class="w-full bg-[#101822] border-2 border-[#2d4059] text-white placeholder-gray-600 px-4 py-3 focus:outline-none focus:border-primary transition-all font-mono text-sm" 
						placeholder="45" 
						type="number"
					/>
				</label>
				<button 
					onclick={addTask}
					class="w-full md:w-auto h-[50px] px-8 bg-white text-black font-black uppercase border-2 border-gray-400 hover:bg-primary hover:text-white hover:border-white hover:shadow-[4px_4px_0px_0px_#ffffff] transition-all flex items-center justify-center gap-2"
				>
					<Plus size={18} /> Add
				</button>
			</div>

			<div class="space-y-4">
				{#each tasks as task, i}
					<div class="flex items-center justify-between p-4 bg-[#101822] border-l-4 {task.color} border-y border-r border-[#2d4059] group hover:border-primary transition-all">
						<div class="flex items-center gap-4">
							<div class="w-8 h-8 flex items-center justify-center bg-primary/10 text-primary font-bold border border-primary/20">
								{i + 1}
							</div>
							<div>
								<h3 class="font-bold text-base uppercase text-white">{task.title}</h3>
								<p class="text-xs text-gray-500 font-mono mt-0.5">{task.tag}</p>
							</div>
						</div>
						<div class="flex items-center gap-6">
							<span class="font-mono text-white bg-[#2d4059] px-2 py-1 text-sm font-bold">{task.duration}m</span>
							<button 
								onclick={() => deleteTask(task.id)}
								class="text-gray-500 hover:text-red-500 transition-colors"
							>
								<Trash2 size={18} />
							</button>
						</div>
					</div>
				{/each}
			</div>

			<div class="mt-6 pt-4 border-t-2 border-[#2d4059] flex justify-between items-center text-sm font-bold uppercase text-gray-400">
				<span>{tasks.length} Tasks Queued</span>
				<span class="text-white">Total: {formattedTotal}</span>
			</div>
		</div>
	</section>

	<section class="flex flex-col gap-6">
		<div class="flex items-center gap-3">
			<div class="bg-primary text-white font-bold w-8 h-8 flex items-center justify-center border border-white">2</div>
			<h2 class="text-2xl font-bold uppercase tracking-tight text-white">Availability</h2>
		</div>

		<div class="bg-[#16202c] border-2 border-[#2d4059] p-6 md:p-8 shadow-[4px_4px_0px_0px_#1973f0]">
			<div class="flex flex-col md:flex-row items-center gap-8">
				<div class="flex items-center gap-4 w-full">
					<div class="bg-[#2d4059] p-3 rounded-sm">
						<Clock class="text-primary" size={24} />
					</div>
					<div>
						<h3 class="text-lg font-bold uppercase text-white">Daily Work Window</h3>
						<p class="text-sm text-gray-500">Set the boundaries for your schedule.</p>
					</div>
				</div>
				<div class="flex items-center gap-4 w-full md:w-auto">
					<label class="flex-1 min-w-[140px]">
						<span class="block text-xs font-bold text-primary mb-2 uppercase tracking-wider">Start Time</span>
						<input 
							bind:value={startTime}
							class="w-full bg-[#101822] border-2 border-[#2d4059] text-white px-4 py-3 font-mono text-lg focus:border-primary focus:outline-none transition-all" 
							type="time"
						/>
					</label>
					<span class="text-gray-500 text-2xl mt-6 font-thin">/</span>
					<label class="flex-1 min-w-[140px]">
						<span class="block text-xs font-bold text-primary mb-2 uppercase tracking-wider">End Time</span>
						<input 
							bind:value={endTime}
							class="w-full bg-[#101822] border-2 border-[#2d4059] text-white px-4 py-3 font-mono text-lg focus:border-primary focus:outline-none transition-all" 
							type="time"
						/>
					</label>
				</div>
			</div>
		</div>
	</section>

	<div class="pt-6">
		<button class="group relative w-full bg-primary py-6 border-2 border-white overflow-hidden shadow-[4px_4px_0px_0px_#ffffff] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all text-white">
			<div class="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
			<div class="relative flex items-center justify-center gap-3">
				<WandSparkles size={28} />
				<span class="text-2xl font-black uppercase tracking-widest">Generate Schedule</span>
			</div>
		</button>
	</div>
</div>

<style>
	/* Custom scrollbar to match the original design */
	:global(::-webkit-scrollbar) {
		width: 12px;
	}
	:global(::-webkit-scrollbar-track) {
		background: #101822;
		border-left: 1px solid #2d4059;
	}
	:global(::-webkit-scrollbar-thumb) {
		background: #1973f0;
		border: 2px solid #101822;
	}
</style>