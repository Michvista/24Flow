<script lang="ts">
	import { MapPin, Calendar } from 'lucide-svelte';
	import { format } from 'date-fns';
	import { Toaster, toast } from 'svelte-sonner';
	import SonnerToast from '../SonnerToast.svelte';
	import { PUBLIC_API_URL } from '$env/static/public';

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

	interface Props {
		initialDate?: Date;
		initialTime?: string;
		onSuccess?: () => void;
		token?: string;
	}

	let {
		initialDate = new Date(),
		initialTime = '',
		onSuccess = () => {},
		token = ''
	}: Props = $props();

	interface NeoColor {
		bg: string;
		text: string;
		name: string;
		description?: string;
	}

	// Form State
	let title = $state('');
	let location = $state('');
	let date = $state('');
	let description = $state('');

	let selectedDays = $state([1, 3]); // Indices for M, W

	let startTimeIndex: number | null = $state(null);
	let endTimeIndex: number | null = $state(null);

	// Dynamic Time Generation (00:00 to 23:00) - defined early so it's available for effects
	const timeSlots = Array.from({ length: 24 }, (_, i) => {
		return i.toString().padStart(2, '0') + ':00';
	});

	// Track last seen props to detect changes (not reactive - just plain variables)
	let lastSeenDateTimestamp: number | null = null;
	let lastSeenTimeValue: string | null = null;

	// Sync props with local state reactively using $effect
	$effect(() => {
		// Only read the props we want to react to
		const currentDateTimestamp = initialDate?.getTime() ?? null;
		const currentTimeValue = initialTime;

		// Check if props have changed (comparing against non-reactive tracking vars)
		const dateChanged = currentDateTimestamp !== null && currentDateTimestamp !== lastSeenDateTimestamp;
		const timeChanged = currentTimeValue !== lastSeenTimeValue;

		if (dateChanged || timeChanged) {
			if (initialDate && dateChanged) {
				date = format(initialDate, 'yyyy-MM-dd');
				lastSeenDateTimestamp = currentDateTimestamp;
			}

			if (initialTime && timeChanged) {
				// If the grid click gives us "14:00", we find the closest index in timeSlots
				const hour = initialTime.split(':')[0];
				const index = timeSlots.findIndex((t) => t.startsWith(hour));
				if (index !== -1) startTimeIndex = index;
				lastSeenTimeValue = currentTimeValue;
			}
		}
	});

	async function handleSubmit() {
		if (!title || startTimeIndex === null) {
			notifyError('Validation Error', 'Please provide a title and start time.');
			return;
		}

		const startStr = `${date}T${timeSlots[startTimeIndex]}:00`;
		const endStr =
			endTimeIndex !== null
				? `${date}T${timeSlots[endTimeIndex]}:00`
				: `${date}T${timeSlots[startTimeIndex + 1] || '23:59'}:00`;

		//  Neobrutalist Color Palette

		const colors: NeoColor[] = [
			// Original Palette
			{ bg: '#f7ff5c', text: '#000000', name: 'secondary-yellow' },
			{ bg: '#00f57a', text: '#000000', name: 'secondary-green' },
			{ bg: '#af52de', text: '#ffffff', name: 'secondary-purple' },
			{ bg: '#3d7bff', text: '#ffffff', name: 'primary-accent' },

			// Extended High-Contrast Vivids
			{ bg: '#ff5c5c', text: '#000000', name: 'neo-red' },
			{ bg: '#ff90e8', text: '#000000', name: 'neo-pink' },
			{ bg: '#05d9e8', text: '#000000', name: 'neo-cyan' },
			{ bg: '#ffbd12', text: '#000000', name: 'neo-orange' },

			// Deep Neutrals (For Heavy Borders & Shadows)
			{ bg: '#000000', text: '#ffffff', name: 'ink-black' },
			{ bg: '#ffffff', text: '#000000', name: 'stark-white' },
			{ bg: '#bebebe', text: '#000000', name: 'concrete-gray' },

			// Muted Accents (For secondary UI elements)
			{ bg: '#d6ff00', text: '#000000', name: 'acid-lime' },
			{ bg: '#8a2be2', text: '#ffffff', name: 'royal-purple' },
			{ bg: '#171717', text: '#00f57a', name: 'dark-mode-bg' }
		];

		const randomStyle = colors[Math.floor(Math.random() * colors.length)];

		const payload = {
			title,
			location,
			description,
			startTime: new Date(startStr).toISOString(),
			endTime: new Date(endStr).toISOString(),
			recurringDays: selectedDays,
			color: randomStyle.bg, // Send hex color
			textColor: randomStyle.text,
			colorName: randomStyle.name
		};
		try {
			const response = await fetch(`${PUBLIC_API_URL}/events`, {
				method: 'POST',
				headers: token
					? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
					: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			});

			if (response.ok) {
				const result = await response.json();
				notifySuccess('Event Created', 'reloading page...');
				console.log('Event Created:', result);
				onSuccess();

				setTimeout(() => {
					window.location.reload();
				}, 1500);
			} else {
				const err = await response.json();
				alert(`Error: ${err.message}`);
				notifyError('Error occured', String(err.message));
			}
		} catch (error) {
			console.error('Fetch error:', error);
			notifyError('System Fetch Error', String(error));
		}
	}
	// 1. Dynamic Recurrence Text
	const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

	let recurrenceText = $derived(
		selectedDays.length === 0
			? 'No repeats selected'
			: selectedDays.length === dayNames.length
				? 'Repeats every day'
				: `Repeats every ${[...selectedDays]
						.sort()
						.map((i) => dayNames[i])
						.join(', ')}`
	);

	function handleTimeClick(index: number) {
		if (startTimeIndex === null || endTimeIndex !== null) {
			startTimeIndex = index;
			endTimeIndex = null;
		} else {
			if (index === startTimeIndex) {
				startTimeIndex = null;
			} else {
				// We allow index to be less than startTimeIndex!
				// This means the event ends the following day.
				endTimeIndex = index;
			}
		}
	}

	// Update the visual selection logic to handle the "wrap around"
	function isSelected(index: number) {
		if (startTimeIndex === null) return false;
		if (endTimeIndex === null) return index === startTimeIndex;

		if (startTimeIndex <= endTimeIndex) {
			// Normal same-day range
			return index >= startTimeIndex && index <= endTimeIndex;
		} else {
			// Overnight range: select from start to end of day, AND start of day to end index
			return index >= startTimeIndex || index <= endTimeIndex;
		}
	}
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="font-display bg-background-dark min-h-screen text-text-primary p-3 sm:p-4 md:p-10">
	<div class="max-w-3xl mx-auto">
		<div class="mb-6 sm:mb-8">
			<h1 class="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
				Create New Event
			</h1>
		</div>

		<form class="space-y-6 sm:space-y-8 md:space-y-10" on:submit|preventDefault={handleSubmit}>
			<div class="flex flex-col gap-2">
				<label class="text-xs sm:text-sm font-bold uppercase tracking-widest">Title</label>
				<input
					bind:value={title}
					class="form-input w-full border-2 sm:border-4 border-black bg-surface h-12 sm:h-14 p-3 sm:p-[15px] focus:ring-4 focus:ring-primary/50 outline-none text-sm sm:text-base"
					placeholder="Enter event title"
				/>
			</div>

			<div class="flex flex-col gap-2">
				<label class="text-xs sm:text-sm font-bold uppercase tracking-widest">Location</label>
				<div class="relative flex w-full items-stretch">
					<input
						bind:value={location}
						class="form-input flex-1 border-t-2 border-l-2 border-b-2 sm:border-t-4 sm:border-l-4 sm:border-b-4 border-black bg-surface h-12 sm:h-14 p-3 sm:p-[15px] outline-none text-sm sm:text-base"
						placeholder="Add location"
					/>
					<div
						class="flex border-2 sm:border-4 border-black bg-surface items-center justify-center px-3 sm:px-4"
					>
						<MapPin size={20} class="text-text-secondary sm:w-6 sm:h-6" />
					</div>
				</div>
			</div>

			<div class="flex flex-col gap-2 w-full sm:max-w-xs">
				<label class="text-xs sm:text-sm font-bold uppercase tracking-widest">Date</label>
				<div class="relative flex w-full items-stretch">
					<input
						type="date"
						bind:value={date}
						class="form-input flex-1 border-t-2 border-l-2 border-b-2 sm:border-t-4 sm:border-l-4 sm:border-b-4 border-black bg-surface h-12 sm:h-14 p-3 sm:p-[15px] outline-none text-sm sm:text-base"
					/>
					<div
						class="flex border-2 sm:border-4 border-black bg-surface items-center justify-center px-3 sm:px-4"
					>
						<Calendar size={20} class="text-text-secondary sm:w-6 sm:h-6" />
					</div>
				</div>
			</div>

			<div>
				<p class="text-xs sm:text-sm font-bold pb-2 uppercase tracking-widest">
					Select Time Range (Click start, then end)
				</p>
				<div
					class="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-1.5 sm:gap-2 p-3 sm:p-4 border-2 sm:border-4 border-black bg-surface"
				>
					{#each timeSlots as time, i}
						<button
							type="button"
							class="h-10 sm:h-12 text-xs sm:text-sm border-2 transition-all {isSelected(i)
								? 'bg-primary border-black text-white ring-2 ring-primary shadow-neobrutalist'
								: 'bg-[#0B111C] border-border-color text-text-secondary hover:border-primary'}"
							on:click={() => handleTimeClick(i)}
						>
							{time}
						</button>
					{/each}
				</div>
			</div>

			<div>
				<p class="text-xs sm:text-sm font-bold pb-2 uppercase tracking-widest">Recurring Event</p>
				<div
					class="flex flex-col gap-3 sm:gap-4 p-3 sm:p-4 border-2 sm:border-4 border-black bg-surface"
				>
					<div class="grid grid-cols-7 gap-1.5 sm:gap-2">
						{#each days as day, i}
							<button
								type="button"
								class="aspect-square flex items-center justify-center text-xs sm:text-sm font-bold border-2 transition-all {selectedDays.includes(
									i
								)
									? 'bg-primary border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
									: 'bg-[#0B111C] border-border-color text-text-secondary'}"
								on:click={() => {
									selectedDays = selectedDays.includes(i)
										? selectedDays.filter((d) => d !== i)
										: [...selectedDays, i];
								}}
							>
								{day}
							</button>
						{/each}
					</div>
					<p
						class="text-text-secondary text-[10px] sm:text-xs font-mono pt-2 border-t-2 border-border-color/30"
					>
						{recurrenceText}
					</p>
				</div>
			</div>

			<div class="flex flex-col gap-3 sm:gap-4">
				<label class="flex flex-col w-full">
					<p
						class="text-text-primary text-xs sm:text-sm font-bold leading-normal pb-2 uppercase tracking-widest"
					>
						Description
					</p>
					<textarea
						bind:value={description}
						class="form-textarea flex w-full min-w-0 flex-1 resize-y overflow-hidden text-text-primary focus:outline-0 focus:ring-4 focus:ring-primary/50 border-2 sm:border-4 border-black bg-surface h-32 sm:h-40 placeholder:text-text-secondary p-3 sm:p-[15px] text-sm sm:text-base font-normal leading-normal"
						placeholder="Add a description for your event..."
					></textarea>
				</label>
			</div>

			<div
				class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6 pt-2 sm:pt-4"
			>
				<button
					class="w-full sm:w-auto sm:min-w-[180px] h-12 sm:h-14 bg-primary font-bold uppercase border-2 sm:border-4 border-black shadow-neobrutalist hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-sm sm:text-base"
					>Schedule</button
				>
				<button
					type="button"
					class="w-full sm:w-auto sm:min-w-[140px] h-12 sm:h-14 border-2 sm:border-4 border-black bg-surface text-text-secondary font-bold uppercase hover:text-white transition-colors text-sm sm:text-base"
				>
					Cancel
				</button>
			</div>
		</form>
	</div>
</div>

<style>
	.font-display {
		font-family: 'Space Grotesk', sans-serif;
	}
	.bg-background-dark {
		background-color: #0b111c;
	}
	.bg-surface {
		background-color: #0c1524;
	}
	.bg-primary {
		background-color: #3e63dd;
	}
	.text-text-secondary {
		color: #a1b4d0;
	}
	.border-border-color {
		border-color: #4a5e7e;
	}
	.shadow-neobrutalist {
		box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);
	}
	input[type='date']::-webkit-calendar-picker-indicator {
		filter: invert(100%);
		cursor: pointer;
	}
</style>
