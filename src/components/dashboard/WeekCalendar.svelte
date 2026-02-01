<script lang="ts">
	import { onMount, tick } from 'svelte';
	import {
		format,
		startOfWeek,
		addDays,
		isSameDay,
		getHours,
		getMinutes,
		startOfToday,
		endOfWeek,
		addWeeks,
		subWeeks
	} from 'date-fns';
	import { ChevronLeft, ChevronRight, Plus, X, Menu as MenuIcon, Trash2 } from 'lucide-svelte';
	import MiniCalendar from './MiniCalendar.svelte';
	import EventDetails from './EventDetails.svelte';
	import AddTodo from './AddTodo.svelte';
	import Create from './Create.svelte';
	import gsap from 'gsap';
	import { Toaster, toast } from 'svelte-sonner';
	import SonnerToast from '../SonnerToast.svelte';

	export let data;
	$: user = data?.user;
	$: console.log(user);

	interface CalendarEvent {
		id: string;
		title: string;
		startTime: string;
		endTime: string;
		date: Date;
		start: string;
		end: string;
		color: string;
		textColor: string;
		text?: string;
		location?: string;
		desc?: string;
		recurringDays?: number[];
	}

	let selectedEventData: CalendarEvent | null = null;
	let isDetailsOpen = false;
	let detailsOverlay: HTMLDivElement;
	let detailsContent: HTMLDivElement;

	let isAddTodoOpen = false;
	let todoOverlay: HTMLDivElement;
	let todoContent: HTMLDivElement;

	let menuOverlay: HTMLDivElement;
	let menuContent: HTMLDivElement;
	let container: HTMLDivElement;

	let events: CalendarEvent[] = [];

	async function openAddTodo() {
		isAddTodoOpen = true;
		await tick();
		const tl = gsap.timeline();
		gsap.set(todoOverlay, { opacity: 0 });
		gsap.set(todoContent, { scale: 0.5, opacity: 0 });
		tl.to(todoOverlay, { opacity: 1, duration: 0.3 }).to(
			todoContent,
			{ scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' },
			'-=0.1'
		);
	}

	function closeAddTodo() {
		const tl = gsap.timeline({
			onComplete: () => {
				isAddTodoOpen = false;
			}
		});
		tl.to(todoContent, { scale: 0.8, opacity: 0, duration: 0.3 }).to(
			todoOverlay,
			{ opacity: 0, duration: 0.2 },
			'-=0.1'
		);
	}

	function handleEventClick(eventObj: CalendarEvent) {
		const convertTo12hr = (timeStr: string) => {
			const [h, m] = timeStr.split(':');
			const hh = parseInt(h);
			const suffix = hh >= 12 ? 'PM' : 'AM';
			const hours = hh % 12 || 12;
			return `${hours}:${m} ${suffix}`;
		};

		selectedEventData = {
			...eventObj,
			start: eventObj.start.includes('M') ? eventObj.start : convertTo12hr(eventObj.start),
			end: eventObj.end.includes('M') ? eventObj.end : convertTo12hr(eventObj.end)
		};
		openDetails();
	}

	async function openDetails() {
		isDetailsOpen = true;
		await tick();
		const tl = gsap.timeline();
		gsap.set(detailsOverlay, { opacity: 0 });
		gsap.set(detailsContent, { scale: 0.5, opacity: 0 });
		tl.to(detailsOverlay, { opacity: 1, duration: 0.3 }).to(
			detailsContent,
			{ scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' },
			'-=0.1'
		);
	}

	function closeDetails() {
		const tl = gsap.timeline({
			onComplete: () => {
				isDetailsOpen = false;
				selectedEventData = null;
			}
		});
		tl.to(detailsContent, { scale: 0.8, opacity: 0, duration: 0.3 }).to(
			detailsOverlay,
			{ opacity: 0, duration: 0.2 },
			'-=0.1'
		);
	}

	let currentDay = startOfToday();
	let currentView = 'Week';
	const baseDate = startOfWeek(startOfToday());
	import { PUBLIC_API_URL } from '$env/static/public';


	// const events = [
	// 	{
	// 		id: 1,
	// 		title: 'Morning Sync',
	// 		start: '9:00',
	// 		end: '10:30',
	// 		date: addDays(baseDate, 0),
	// 		color: 'primary-accent',
	// 		text: 'white'
	// 	},
	// 	{
	// 		id: 2,
	// 		title: 'Project Review',
	// 		start: '13:00',
	// 		end: '14:00',
	// 		date: addDays(baseDate, 0),
	// 		color: 'primary-accent',
	// 		text: 'white'
	// 	},
	// 	{
	// 		id: 3,
	// 		title: 'Client Call',
	// 		start: '14:00',
	// 		end: '15:00',
	// 		date: addDays(baseDate, 1),
	// 		color: 'secondary-yellow',
	// 		text: 'black'
	// 	},
	// 	{
	// 		id: 4,
	// 		title: 'Design Sync',
	// 		start: '10:00',
	// 		end: '11:00',
	// 		date: addDays(baseDate, 2),
	// 		color: 'secondary-yellow',
	// 		text: 'black'
	// 	},
	// 	{
	// 		id: 5,
	// 		title: 'Project Kick-off',
	// 		start: '14:00',
	// 		end: '15:30',
	// 		date: addDays(baseDate, 2),
	// 		color: 'secondary-green',
	// 		text: 'black'
	// 	},
	// 	{
	// 		id: 6,
	// 		title: 'Team Retro',
	// 		start: '16:00',
	// 		end: '17:00',
	// 		date: addDays(baseDate, 2),
	// 		color: 'secondary-purple',
	// 		text: 'white'
	// 	},
	// 	{
	// 		id: 7,
	// 		title: 'Workshop A',
	// 		start: '11:00',
	// 		end: '12:30',
	// 		date: addDays(baseDate, 3),
	// 		color: 'secondary-green',
	// 		text: 'black'
	// 	},
	// 	{
	// 		id: 11,
	// 		title: 'Deep Work',
	// 		start: '9:00',
	// 		end: '10:00',
	// 		date: addDays(baseDate, 5),
	// 		color: 'secondary-purple',
	// 		text: 'white'
	// 	},
	// 	{
	// 		id: 12,
	// 		title: 'Strategy Session',
	// 		start: '14:00',
	// 		end: '17:00',
	// 		date: addDays(baseDate, 5),
	// 		color: 'primary-accent',
	// 		text: 'white'
	// 	}
	// ];

	async function fetchEvents() {
		try {
			const res = await fetch(`${PUBLIC_API_URL}/events`, {
				credentials: 'include'
			});
			const json = await res.json();
			if (res.ok && json.status === 'success') {
				events = json.data.map(
					(event: any): CalendarEvent => ({
						...event,
						date: new Date(event.startTime),
						start: format(new Date(event.startTime), 'HH:mm'),
						end: format(new Date(event.endTime), 'HH:mm')
					})
				);
			}

			console.log(
				`Loaded ${json.meta.total} events (${json.meta.baseEvents} base + ${json.meta.recurringInstances} recurring)`
			);
		} catch (e) {
			console.error('Failed to load events', e);
		}
	}

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

	// onMount(() => {
	//     fetchEvents();
	// });

	// let tasks = [
	// 	{ id: 1, title: 'Review PR #231', completed: true },
	// 	{ id: 2, title: 'Update Documentation', completed: false }
	// ];

	$: weekStart = startOfWeek(currentDay, { weekStartsOn: 0 });
	$: weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
	$: timeSlots = Array.from({ length: 24 }, (_, i) => i);
	$: currentTimeLineTop = getHours(new Date()) * 60 + getMinutes(new Date());
	$: selectedDayEvents = events.filter((e) => isSameDay(e.date, currentDay));

	function getEventStyle(event: CalendarEvent): string {
		const [h, m] = event.start.split(':').map(Number);
		const [eh, em] = event.end.split(':').map(Number);
		const start = h * 60 + m;
		const end = eh * 60 + em;
		return `top: ${start}px; height: ${end - start}px;`;
	}

	let prefilledDate: Date = new Date();
	let prefilledTime: string = '';

	function handleGridClick(
		event: MouseEvent & { currentTarget: EventTarget & HTMLDivElement },
		day: Date
	) {
		const timeGrid = event.currentTarget.getBoundingClientRect();
		const yPos = event.clientY - timeGrid.top;
		const startHour = Math.floor(yPos / 60);
		const startMinute = Math.floor(yPos % 60);
		// const appointmentTime = new Date(
		// 	day.getFullYear(),
		// 	day.getMonth(),
		// 	day.getDate(),
		// 	startHour,
		// 	startMinute
		// );
		// let timeString =
		// 	startHour === 0
		// 		? `00:${format(appointmentTime, 'mm')} AM`
		// 		: format(appointmentTime, 'h:mm a');
		// alert(`Proposed: ${format(appointmentTime, 'E, MMM d')} at ${timeString}`);

		const appointmentTime = new Date(day);
		appointmentTime.setHours(startHour, 0, 0, 0);

		prefilledDate = appointmentTime;
		prefilledTime = format(appointmentTime, 'HH:mm');

		// Trigger the add event
		openMenu();
	}

	// Keyboard alternative for activating the grid cell (centers on 9:00)
	function handleGridClickKeyboard(day: Date) {
		const appointmentTime = new Date(day);
		appointmentTime.setHours(9, 0, 0, 0); // sensible default for keyboard users
		prefilledDate = appointmentTime;
		prefilledTime = format(appointmentTime, 'HH:mm');
		openMenu();
	}

	function navigateWeek(direction: number) {
		currentDay = addDays(currentDay, direction * 7);
	}

	let isOpen = false;
	let isAnimating = false;
	let isMobileSidebarOpen = false;

	$: if (typeof document !== 'undefined') {
		if (isOpen || isDetailsOpen || isAddTodoOpen) document.body.classList.add('no-scroll');
		else document.body.classList.remove('no-scroll');
	}

	onMount(() => {
		gsap.set(menuOverlay, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' });
		gsap.set(menuContent, { opacity: 0, rotate: -15, scale: 1.1 });
	});

	function menuClick() {
		if (!isOpen) {
			// Reset prefilled data if clicking the general button
			prefilledDate = new Date();
			prefilledTime = format(new Date(), 'HH:mm');
			openMenu();
		} else {
			closeMenu();
		}
	}

	function openMenu() {
		if (isAnimating || isOpen) return;
		isAnimating = true;
		gsap.set(menuOverlay, { pointerEvents: 'all' });
		const tl = gsap.timeline({
			onComplete: () => {
				isOpen = true;
				isAnimating = false;
			}
		});
		tl.to(container, { rotate: -4, y: 80, scale: 0.9, duration: 1, ease: 'power4.inOut' }, 0)
			.to(
				menuOverlay,
				{
					clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
					duration: 1,
					ease: 'power4.inOut'
				},
				0
			)
			.to(
				menuContent,
				{ opacity: 1, rotate: 0, scale: 1, y: 0, duration: 1, ease: 'power4.out' },
				0.2
			);
	}

	function closeMenu() {
		if (isAnimating || !isOpen) return;
		isAnimating = true;
		const tl = gsap.timeline({
			onComplete: () => {
				isOpen = false;
				isAnimating = false;
				gsap.set(menuOverlay, { pointerEvents: 'none' });
			}
		});
		tl.to(container, { rotate: 0, y: 0, scale: 1, duration: 0.8, ease: 'power3.inOut' }, 0)
			.to(
				menuOverlay,
				{
					clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
					duration: 0.8,
					ease: 'power3.inOut'
				},
				0
			)
			.to(menuContent, { opacity: 0, y: -20, duration: 0.4 }, 0);
	}
	interface Task {
		id: string;
		title: string;
		description: string;
		completed: boolean;
	}

	let tasks: Task[] = [];

	// 1. Fetch tasks automatically on load
	onMount(async () => {
		await fetchTasks();
	});

	async function fetchTasks() {
		try {
			const res = await fetch(`${PUBLIC_API_URL}/tasks`, { credentials: 'include' });
			const result = await res.json();
			if (res.ok) tasks = result.data;
		} catch (err) {
			console.error('Error fetching tasks:', err);
		}
	}

	async function deleteTask(taskId: string) {
		// Optimistically remove the task from UI
		const originalTasks = [...tasks];
		tasks = tasks.filter((task) => task.id !== taskId);

		try {
			const res = await fetch(`${PUBLIC_API_URL}/tasks/${taskId}`, {
				method: 'DELETE',
				credentials: 'include'
			});

			notifySuccess('Task Deleted', 'The task has been successfully deleted.');

			if (!res.ok) {
				// Rollback if server deletion fails
				tasks = originalTasks;
				notifyError('Deletion Failed', 'Could not delete the task. Please try again.');
				console.error('Failed to delete task on server');
			}
		} catch (err) {
			// Rollback on network error
			tasks = originalTasks;
			notifyError('Network Error', 'Please check your connection and try again.');
			console.error('Network error deleting task:', err);
		}
	}

	// 2. Handle adding task
	function handleTaskAdded(newTask: Task) {
		tasks = [newTask, ...tasks];
	}

	async function toggleTask(task: Task) {
		tasks = [...tasks]; // Trigger UI update for the line-through class

		try {
			const res = await fetch(`${PUBLIC_API_URL}/tasks/${task.id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({ completed: task.completed }) // Send the already-flipped value
			});

			if (!res.ok) {
				// Rollback only if the server fails
				task.completed = !task.completed;
				tasks = [...tasks];
				console.error('Failed to update task on server');
			}
		} catch (err) {
			task.completed = !task.completed;
			tasks = [...tasks];
			console.error('Network error updating task:', err);
		}
	}

	let currentViewDate = new Date();

	async function fetchEventsForRange() {
		const rangeStart = startOfWeek(subWeeks(currentViewDate, 2));
		const rangeEnd = endOfWeek(addWeeks(currentViewDate, 6));

		const startStr = rangeStart.toISOString();
		const endStr = rangeEnd.toISOString();

		try {
			const res = await fetch(`${PUBLIC_API_URL}/events?start=${startStr}&end=${endStr}`, {
				credentials: 'include'
			});

			const result = await res.json();
			// Inside fetchEventsForRange
			if (res.ok) {
				events = result.data.map((event: any) => {
					const sDate = new Date(event.startTime);
					return {
						...event,
						date: sDate,
						start: format(sDate, 'HH:mm'),
						end: format(new Date(event.endTime), 'HH:mm')
					};
				});
			}
		} catch (err) {
			console.error('Failed to load events', err);
		}
	}

	$: {
		if (currentViewDate) {
			fetchEventsForRange();
		}
	}
</script>

{#if isAddTodoOpen}
	<div
		bind:this={todoOverlay}
		class="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
		on:click={closeAddTodo}
		role="button"
		tabindex="0"
		on:keydown={(e) => {
			if (e.key === 'Escape' || e.key === 'Enter') {
				closeAddTodo();
			}
		}}
	>
		<div
			bind:this={todoContent}
			class="relative w-full max-w-2xl bg-[#0B111C] border-4 border-black shadow-[8px_8px_0px_#000] overflow-hidden"
			on:click|stopPropagation
		>
			<button
				on:click={closeAddTodo}
				class="absolute top-6 right-6 z-[130] bg-secondary-yellow p-2 border-2 border-black shadow-[4px_4px_0px_#000] hover:-translate-y-1 transition-transform"
			>
				<X size={24} color="black" strokeWidth={3} />
			</button>
			<AddTodo onCancel={closeAddTodo} onAdd={handleTaskAdded} />
		</div>
	</div>
{/if}

<div
	class="createMenuOverlay fixed inset-0 w-full h-full bg-primary-bg overflow-y-auto"
	bind:this={menuOverlay}
	style="z-index: 50; pointer-events: none;"
>
	<button
		on:click={closeMenu}
		class="fixed top-6 right-8 z-[60] bg-secondary-yellow p-3 border-2 border-black shadow-[4px_4px_0px_#000] hover:-translate-y-1 transition-transform cursor-pointer"
	>
		<X size={32} color="black" strokeWidth={3} />
	</button>
	<div class="flex justify-center items-start py-20 min-h-full w-full" bind:this={menuContent}>
		<div class="w-full max-w-4xl px-6">
			<Create initialDate={prefilledDate} initialTime={prefilledTime} onSuccess={closeMenu} />
		</div>
	</div>
</div>

<div
	bind:this={container}
	class="flex cont h-screen w-full flex-col bg-primary-bg text-off-white font-mono overflow-hidden"
>
	<header
		class="flex w-full items-center justify-between border-b-2 border-black bg-primary-accent px-4 sm:px-6 py-3 z-20"
	>
		<div class="flex items-center gap-2 sm:gap-4 text-slate-900 dark:text-white">
			<button
				class="lg:hidden text-white p-1"
				on:click={() => (isMobileSidebarOpen = !isMobileSidebarOpen)}
			>
				<MenuIcon size={24} />
			</button>
			<div class="size-6 hidden sm:block">
				<svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"
					><path
						clip-rule="evenodd"
						d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z"
						fill="white"
						fill-rule="evenodd"
					></path></svg
				>
			</div>
			<h2
				class="text-white font-monoton dark:text-white text-base sm:text-lg font-bold leading-tight tracking-[-0.015em]"
			>
				24FLOW
			</h2>
		</div>

		<div class="flex items-center gap-2 sm:gap-6">
			<div class="flex items-center gap-1 sm:gap-2">
				<button
					on:click={() => navigateWeek(-1)}
					class="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center border-2 border-black bg-off-white text-black shadow-[2px_2px_0px_#000] sm:shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 transition-all"
				>
					<ChevronLeft size={20} strokeWidth={3} />
				</button>
				<button
					on:click={() => (currentDay = startOfToday())}
					class="hidden sm:block border-2 border-black bg-off-white px-4 py-2 text-sm font-bold text-black shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 transition-all"
					>Today</button
				>
				<button
					on:click={() => navigateWeek(1)}
					class="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center border-2 border-black bg-off-white text-black shadow-[2px_2px_0px_#000] sm:shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 transition-all"
				>
					<ChevronRight size={20} strokeWidth={3} />
				</button>
			</div>
			<div class="hidden md:flex h-10 border-2 border-black bg-primary-bg p-1">
				<!-- {#each ['Month', 'Week', 'Day'] as view} -->
				{#each [ 'Week'] as view}
					<button
						class="px-3 h-full text-sm font-bold {currentView === view
							? 'bg-off-white text-black'
							: ''}"
						on:click={() => (currentView = view)}>{view}</button
					>
				{/each}
			</div>
			<button
				class="h-8 sm:h-10 border-2 border-black bg-secondary-yellow px-3 sm:px-5 font-bold text-black shadow-[2px_2px_0px_#000] sm:shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 transition-all addeventbtn"
				on:click={menuClick}
			>
				<span class="sm:hidden"><Plus size={16} /></span>
				<span class="hidden sm:inline">Add Event</span>
			</button>
		</div>
	</header>

	<main class="flex flex-1 overflow-hidden relative">
		<div
			class="flex flex-1 flex-col border-r-2 border-black bg-off-white text-black relative overflow-x-auto"
		>
			<div
				class="grid grid-cols-[50px_repeat(7,1fr)] sm:grid-cols-[60px_repeat(7,1fr)] border-b-2 border-black bg-primary-bg text-off-white z-10 min-w-[700px] sm:min-w-0"
			>
				<div class="w-[50px] sm:w-[60px] border-r-2 border-black"></div>
				{#each weekDays as day}
					{@const isToday = isSameDay(day, startOfToday())}
					{@const isSelected = isSameDay(day, currentDay)}
					<button
						on:click={() => (currentDay = day)}
						class="p-2 sm:p-4 text-center border-r-2 border-black last:border-r-0 transition-colors {isSelected
							? 'bg-secondary-yellow text-black'
							: isToday
								? 'bg-primary-accent/20'
								: 'hover:bg-white/5'}"
					>
						<div
							class="text-[10px] sm:text-xs uppercase font-bold {isSelected
								? 'text-black/60'
								: isToday
									? 'text-secondary-yellow'
									: 'text-gray-400'}"
						>
							{format(day, 'E')}
						</div>
						<div
							class="text-lg sm:text-xl font-bold {isSelected
								? 'text-black'
								: isToday
									? 'text-secondary-yellow'
									: ''}"
						>
							{format(day, 'd')}
						</div>
					</button>
				{/each}
			</div>

			<div class="flex-1 overflow-y-auto relative bg-off-white min-w-[700px] sm:min-w-0">
				<div class="relative min-h-[1440px] w-full">
					<div
						class="absolute left-0 top-0 bottom-0 w-[50px] sm:w-[60px] border-r-2 border-black bg-off-white z-10"
					>
						{#each timeSlots as hour}
							<div class="h-[60px] relative">
								<span
									class="absolute -top-3 right-2 text-[10px] sm:text-xs text-gray-500 font-bold uppercase"
									>{format(new Date(2000, 0, 1, hour), 'h a')}</span
								>
							</div>
						{/each}
					</div>

					<div class="absolute left-[50px] sm:left-[60px] right-0 top-0 h-full pointer-events-none">
						{#each timeSlots as hour}
							<div class="h-[60px] border-b border-gray-300 w-full"></div>
						{/each}
					</div>

					<div
						class="absolute left-[50px] sm:left-[60px] right-0 top-0 bottom-0 grid grid-cols-7 h-full"
					>
						{#each weekDays as day}
							{@const dayEvents = events.filter((e) => isSameDay(e.date, day))}
							<div
								class="relative h-full border-r border-gray-200 last:border-r-0 {isSameDay(
									day,
									currentDay
								)
									? 'bg-secondary-yellow/5'
									: ''}"
								on:click={(e) => handleGridClick(e, day)}
								role="button"
								tabindex="0"
								on:keydown={(e) => {
									if (e.key === 'Enter') {
										handleGridClickKeyboard(day);
									}
								}}
							>
								{#each dayEvents as event}
									<div
										class="absolute w-full px-0.5 sm:px-1 z-20"
										style={getEventStyle(event)}
										on:click|stopPropagation={() => handleEventClick(event)}
										role="button"
										tabindex="0"
										on:keydown={(e) => {
											if (e.key === 'Enter') {
												handleEventClick(event);
											}
										}}
									>
										<div
											class="border-2 border-black p-1 sm:p-2 h-full shadow-[2px_2px_0px_#000] sm:shadow-[4px_4px_0px_#000] rounded-md overflow-hidden transition-transform cursor-pointer"
											style="background-color: {event.color}; color: {event.textColor};"
										>
											<span class="block text-[8px] sm:text-[10px] font-bold">{event.start}</span>
											<span class="block text-[10px] sm:text-xs font-bold truncate"
												>{event.title}</span
											>
										</div>
									</div>
								{/each}
							</div>
						{/each}
					</div>

					<div
						class="absolute left-[50px] sm:left-[60px] right-0 border-t-2 border-red-500 z-30 flex items-center"
						style="top: {currentTimeLineTop}px;"
					>
						<div class="absolute -left-[6px] h-3 w-3 rounded-full bg-red-500"></div>
					</div>
				</div>
			</div>
		</div>

		<aside
			class="
            fixed inset-y-0 right-0 z-40 w-72 transform bg-primary-bg p-6 border-l-2 border-black transition-transform duration-300 ease-in-out
            lg:relative lg:translate-x-0 lg:flex lg:w-80 flex-col overflow-y-auto
            {isMobileSidebarOpen
				? 'translate-x-0 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]'
				: 'translate-x-full'}
        "
		>
			<button
				class="lg:hidden absolute top-4 right-4 text-white"
				on:click={() => (isMobileSidebarOpen = false)}
			>
				<X size={20} />
			</button>

			<div class="mb-8"><MiniCalendar bind:currentDay /></div>
			<h2 class="text-xl font-bold uppercase mb-1 text-off-white">Schedule</h2>
			<p class="mb-6 text-sm text-gray-400">
				{format(currentDay, 'E, d MMM')} — {selectedDayEvents.length} events
			</p>
			<div class="flex flex-col gap-4 mb-8">
				{#each selectedDayEvents as event}
					<div
						class="flex items-start gap-4 border-2 border-off-white p-4 shadow-[4px_4px_0px_#F0F0F0] bg-primary-bg hover:bg-white/5 transition-colors cursor-pointer"
						on:click={() => {
							handleEventClick(event);
							isMobileSidebarOpen = false;
						}}
						role="button"
						tabindex="0"
						on:keydown={(e) => {
							if (e.key === 'Enter') {
								handleEventClick(event);
								isMobileSidebarOpen = false;
							}
						}}
					>
						<div
							class="mt-1 h-4 w-4 flex-shrink-0 border-2 border-black"
							style="background-color: {event.color};"
						></div>
						<div>
							<p class="font-bold text-lg leading-none mb-1">{event.start}</p>
							<p class="text-sm font-medium text-gray-300">{event.title}</p>
						</div>
					</div>
				{/each}
			</div>

			<div class="border-t-2 border-gray-700 pt-4 mt-auto">
				<div class="flex items-center justify-between mb-4">
					<p class="text-xs font-bold uppercase text-gray-500">Tasks</p>
					<button
						on:click={openAddTodo}
						class="p-1 border-2 border-off-white bg-primary-accent text-white hover:bg-secondary-yellow hover:text-black transition-colors"
					>
						<Plus size={14} strokeWidth={4} />
					</button>
				</div>
				<div class="max-h-48 overflow-y-auto">
					{#each tasks as task}
						<div class="flex items-center justify-between mb-3">
							<div class="flex items-center gap-3 mb-3">
								<input
									type="checkbox"
									bind:checked={task.completed}
									on:change={() => toggleTask(task)}
									class="h-4 w-4 border-2 border-off-white bg-transparent text-primary-accent focus:ring-0 rounded-none cursor-pointer"
								/>
								<span
									class="text-sm {task.completed ? 'line-through text-gray-500' : 'text-off-white'}"
									>{task.title}</span
								>
							</div>
							<button on:click={() => deleteTask(task.id)} class="p-1">
								<Trash2 size={16} color="red" />
							</button>
						</div>
					{/each}
				</div>
			</div>
		</aside>
	</main>

	{#if isDetailsOpen}
		<div
			bind:this={detailsOverlay}
			class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-2 sm:p-4"
			on:click={closeDetails}
			role="button"
			tabindex="0"
			on:keydown={(e) => {
				if (e.key === 'Escape' || e.key === 'Enter') {
					closeDetails();
				}
			}}
		>
			<div
				bind:this={detailsContent}
				class="relative w-full max-w-6xl max-h-[95vh] overflow-y-auto bg-white dark:bg-[#101822] border-4 border-black shadow-[8px_8px_0px_#000]"
				on:click|stopPropagation
			>
				<button
					on:click={closeDetails}
					class="absolute top-2 right-2 sm:top-4 sm:right-4 z-[110] bg-secondary-yellow p-2 border-2 border-black shadow-[4px_4px_0px_#000] hover:-translate-y-1 transition-transform"
				>
					<X size={24} color="black" strokeWidth={3} />
				</button>
				{#if isDetailsOpen && selectedEventData}
					<EventDetails
						id={selectedEventData.id}
						eventTitle={selectedEventData.title}
						eventDescription={selectedEventData.desc}
						startTime={selectedEventData.start}
						endTime={selectedEventData.end}
						eventDate={format(selectedEventData.date, 'MMMM d, yyyy')}
						location={selectedEventData.location}
						userData={user}
						recurringDays={selectedEventData.recurringDays || []}
					/>
				{/if}
			</div>
		</div>
	{/if}
</div>
<Toaster position="bottom-right" expand={false} richColors />

<style>
	@import url('https://fonts.googleapis.com/css2?family=Monoton&display=swap');
	.font-monoton {
		font-family: 'Monoton', sans-serif;
	}

	::-webkit-scrollbar {
		width: 6px;
		background: #0d1a3e;
	}
	::-webkit-scrollbar-thumb {
		background: #f0f0f0;
		border: 2px solid #000;
	}

	.bg-primary-accent {
		background-color: #3d7bff;
	}
	.bg-secondary-yellow {
		background-color: #f7ff5c;
	}
	.bg-secondary-green {
		background-color: #00f57a;
	}
	.bg-secondary-purple {
		background-color: #af52de;
	}

	:global(body.no-scroll) {
		overflow: hidden;
	}

	.createMenuOverlay {
		background-color: #0d1a3e;
	}
	.createMenu {
		will-change: transform, opacity;
		transform-origin: center center;
	}
	.cont {
		position: relative;
		will-change: transform;
		transform-origin: right top;
	}
</style>
