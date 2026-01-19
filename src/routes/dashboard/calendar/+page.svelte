<script>
	// Import the new dynamic WeekCalendar component
	import WeekCalendar from '../../../components/dashboard/WeekCalendar.svelte';

	// Keep state variables used in the header if they are still relevant
	let currentView = 'Week';
export let data;
	// Note: currentTimeStyle is now handled internally by WeekCalendar.svelte,
	// but keep it if you still use it elsewhere.
</script>

<svelte:head></svelte:head>

<div class="font-display bg-primary-bg text-off-white flex h-screen w-full flex-col">
	<!-- <header class="flex w-full items-center justify-between border-b-2 border-black bg-primary-accent px-6 py-3">
        <h1 class="text-2xl font-bold uppercase text-black">Scheduler</h1>
        <div class="flex items-center gap-6">
            <div class="flex items-center gap-2">
                <button class="flex h-10 w-10 items-center justify-center border-2 border-black bg-off-white text-black shadow-hard transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#000000]">
                    <span class="material-symbols-outlined">chevron_left</span>
                </button>
                <button class="border-2 border-black bg-off-white px-4 py-2 text-sm font-bold text-black shadow-hard transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#000000]">Today</button>
                <button class="flex h-10 w-10 items-center justify-center border-2 border-black bg-off-white text-black shadow-hard transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#000000]">
                    <span class="material-symbols-outlined">chevron_right</span>
                </button>
            </div>
            <div class="flex h-10 items-center border-2 border-black bg-primary-bg p-1 text-off-white">
                <label class="flex h-full cursor-pointer items-center justify-center px-3 has-[:checked]:bg-off-white has-[:checked]:text-black">
                    <span class="truncate text-sm font-bold">Month</span>
                    <input class="invisible w-0" name="view-toggle" type="radio" value="Month" bind:group={currentView}/>
                </label>
                <label class="flex h-full cursor-pointer items-center justify-center px-3 has-[:checked]:bg-off-white has-[:checked]:text-black">
                    <span class="truncate text-sm font-bold">Week</span>
                    <input class="invisible w-0" name="view-toggle" type="radio" value="Week" bind:group={currentView}/>
                </label>
                <label class="flex h-full cursor-pointer items-center justify-center px-3 has-[:checked]:bg-off-white has-[:checked]:text-black">
                    <span class="truncate text-sm font-bold">Day</span>
                    <input class="invisible w-0" name="view-toggle" type="radio" value="Day" bind:group={currentView}/>
                </label>
            </div>
            <button class="h-10 border-2 border-black bg-secondary-yellow px-5 text-sm font-bold text-black shadow-hard transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#000000]">Add Event</button>
        </div>
    </header> -->

	<main class="flex flex-1 overflow-hidden">
		<WeekCalendar data={data}/>
	</main>
</div>
