<script>
	import {
		format,
		startOfMonth,
		endOfMonth,
		eachDayOfInterval,
		isSameMonth,
		isSameDay,
		subMonths,
		addMonths,
		startOfWeek,
		endOfWeek
	} from 'date-fns';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	export let currentDay;

	// 1. Initialize viewDate
	let viewDate = startOfMonth(currentDay);
	$: {
		const syncDate = startOfMonth(currentDay);
		updateView(currentDay);
	}

	function updateView(newDay) {
		const newMonth = startOfMonth(newDay);
		if (format(newMonth, 'yyyy-MM') !== format(viewDate, 'yyyy-MM')) {
			viewDate = newMonth;
		}
	}

	function prevMonth() {
		viewDate = subMonths(viewDate, 1);
	}
	function nextMonth() {
		viewDate = addMonths(viewDate, 1);
	}
</script>

<div class="border-2 border-off-white bg-primary-bg p-4 shadow-[4px_4px_0px_#F0F0F0]">
	<div class="flex items-center justify-between mb-4">
		<span class="font-bold text-off-white uppercase text-xs tracking-widest">
			{format(viewDate, 'MMMM yyyy')}
		</span>
		<div class="flex gap-1">
			<button
				type="button"
				on:click|preventDefault|stopPropagation={prevMonth}
				class="flex h-6 w-6 items-center justify-center border-2 border-off-white bg-primary-accent text-white hover:bg-black transition-colors"
			>
				<ChevronLeft size={14} strokeWidth={3} />
			</button>
			<button
				type="button"
				on:click|preventDefault|stopPropagation={nextMonth}
				class="flex h-6 w-6 items-center justify-center border-2 border-off-white bg-primary-accent text-white hover:bg-black transition-colors"
			>
				<ChevronRight size={14} strokeWidth={3} />
			</button>
		</div>
	</div>

	<div
		class="grid grid-cols-7 gap-1 text-center text-[10px] mb-2 text-gray-500 font-bold uppercase"
	>
		{#each ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as d}<div>{d}</div>{/each}
	</div>

	<div class="grid grid-cols-7 gap-1 text-center text-xs text-off-white">
		{#each eachDayOfInterval( { start: startOfWeek(startOfMonth(viewDate)), end: endOfWeek(endOfMonth(viewDate)) } ) as day}
			{@const isSelected = isSameDay(day, currentDay)}
			<button
				on:click={() => (currentDay = day)}
				class="p-1 font-bold border-2 transition-all
                {isSelected
					? 'bg-secondary-yellow text-black border-off-white'
					: 'border-transparent hover:bg-white/10'}
                {!isSameMonth(day, viewDate) ? 'opacity-20' : ''}"
			>
				{format(day, 'd')}
			</button>
		{/each}
	</div>
</div>
