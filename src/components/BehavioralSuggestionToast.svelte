<script lang="ts">
	import { PlusCircle, Loader2, BicepsFlexed, X } from 'lucide-svelte';
	import { Toaster, toast } from 'svelte-sonner';
	import { onMount } from 'svelte';
	import { colors } from '$lib/colors';
	import { PUBLIC_API_URL } from '$env/static/public';

	import SonnerToast from './SonnerToast.svelte';

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

	let { toastId, eventName, eventTime, probability } = $props();
	let isSaving = $state(false);

	// Fix: Add currentDay and days array
	const days = [
		'Sundays',
		'Mondays',
		'Tuesdays',
		'Wednesdays',
		'Thursdays',
		'Fridays',
		'Saturdays'
	];
	const currentDay = days[new Date().getDay()];

	async function handleAddAndSync() {
		isSaving = true;
		try {
			// Logic to parse "09:00 AM" into a Date object
			const [time, modifier] = eventTime.split(' ');
			let [hours, minutes] = time.split(':').map(Number);
			if (modifier === 'PM' && hours < 12) hours += 12;
			if (modifier === 'AM' && hours === 12) hours = 0;

			const startTime = new Date();
			startTime.setHours(hours, minutes, 0, 0);

			const shuffle = (arr: { name: string; bg: string; text: string }[]) => {
				const a = arr.slice();
				for (let i = a.length - 1; i > 0; i--) {
					const j = Math.floor(Math.random() * (i + 1));
					[a[i], a[j]] = [a[j], a[i]];
				}
				return a;
			};

			const palette = shuffle(colors);

			const res = await fetch(`${PUBLIC_API_URL}/events`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({
					title: eventName,
					startTime: startTime.toISOString(),
					endTime: new Date(startTime.getTime() + 3600000).toISOString(), // 1 hour duration
					color: palette[0].bg,
					colorName: palette[0].name,
					textColor: palette[0].text
				})
			});

			if (res.ok) {
				toast.dismiss(toastId);
				notifySuccess('Event Added', `${eventName} has been added to your calendar.`);
			}
		} catch (err) {
			notifyError('Network error', 'Could not sync calendar.');
		} finally {
			isSaving = false;
		}
	}

	onMount(() => {
		// Add backdrop effects to your main layout if it exists
		const layout = document.querySelector('.layout-container');
		if (layout) layout.classList.add('blur-md', 'brightness-50');
		return () => {
			if (layout) layout.classList.remove('blur-md', 'brightness-50');
		};
	});
</script>

<div
	class="group relative w-full max-w-[420px] overflow-hidden rounded-sm bg-[#151f2b] border-2 border-[#1973f0] shadow-[6px_6px_0px_0px_#1973f0] font-display"
>
	<div
		class="relative flex items-center justify-between border-b-2 border-[#1973f0] bg-[#233248] px-4 py-3"
	>
		<div class="flex items-center gap-2.5">
			<div
				class="flex h-6 w-6 items-center justify-center rounded-sm bg-[#1973f0]/20 text-[#1973f0]"
			>
				<BicepsFlexed size={16} />
			</div>
			<p class="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1973f0]">
				Intelligence Report
			</p>
		</div>
		<button
			onclick={() => toast.dismiss(toastId)}
			class="text-white/50 hover:text-white cursor-pointer"
		>
			<X size={18} />
		</button>
	</div>

	<div class="p-5">
		<div class="mb-4">
			<h3 class="text-xl font-black text-white italic tracking-tighter uppercase">
				Pattern Detected
			</h3>
			<p class="text-sm text-gray-300 mt-1">
				Based on <span class="text-white font-bold underline decoration-[#1973f0]"
					>{currentDay}</span
				>
				history, you usually schedule <span class="text-[#1973f0] font-bold">{eventName}</span>
				around {eventTime}.
			</p>
		</div>

		<div class="mb-5 flex items-center border-2 border-white/10 bg-black/40 p-3 shadow-inner">
			<div class="flex flex-col pr-4 border-r-2 border-white/10">
				<span class="text-[9px] font-bold uppercase text-white/40">Confidence</span>
				<span class="text-xl font-black text-[#1973f0]">{probability}</span>
			</div>
			<div class="flex-1 px-4">
				<div class="h-2 w-full bg-white/5 border border-white/10 relative">
					<div
						class="absolute left-[35%] h-full w-[25%] bg-[#1973f0] shadow-[0_0_10px_#1973f0]"
					></div>
				</div>
			</div>
		</div>

		<div class="flex gap-3">
			<button
				onclick={handleAddAndSync}
				disabled={isSaving}
				class="flex-1 flex items-center justify-center gap-2 border-2 border-black bg-[#1973f0] px-4 py-2.5 text-xs font-black uppercase text-white shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none disabled:opacity-50 cursor-pointer"
			>
				{#if isSaving}
					<Loader2 class="animate-spin" size={16} />
					<span>SYNCING...</span>
				{:else}
					<PlusCircle size={16} />
					<span>Add to Calendar</span>
				{/if}
			</button>
			<button
				onclick={() => toast.dismiss(toastId)}
				class="px-4 py-2.5 text-xs font-black text-white uppercase border-2 border-[#233248] cursor-pointer"
			>
				Dismiss
			</button>
		</div>
	</div>
</div>
