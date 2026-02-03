<script lang="ts">
	import { onMount } from 'svelte';
	import { PUBLIC_API_URL } from '$env/static/public';
	import { toast, Toaster } from 'svelte-sonner';
	import { Activity, Bug } from 'lucide-svelte';
	import BehavioralSuggestionToast from '../../../components/BehavioralSuggestionToast.svelte';
	import MoodModal from '../../../components/modal/MoodSelectionModal.svelte';

	let { data } = $props();
	let token = $derived(data?.token || '');

	let showModal = $state(false);
	let isLoadingIntel = $state(false);

	// Function to show the AI Suggestion Toast
	function triggerIntelToast(data: any) {
		// attempting to render toast with data (silent)
		const id = Math.random().toString(36).substring(2, 9);

		toast.custom(BehavioralSuggestionToast, {
			id,
			componentProps: {
				toastId: id,
				eventName: data?.eventName || 'Pattern Analysis',
				eventTime: data?.eventTime || 'Scheduled Time',
				probability: data?.probability || '85%'
			},
			duration: Infinity
		});
	}

	// Fetch the report stored by the Cron Job
	async function fetchMorningIntelligence() {
		// starting fetchMorningIntelligence
		isLoadingIntel = true;

		try {
			const res = await fetch(`${PUBLIC_API_URL}/ai/tool`, {
				method: 'POST',
				headers: token
					? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
					: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ toolType: 'GET_INTELLIGENCE_REPORT' })
			});

			const result = await res.json();

			// If the cron job hasn't run, data will be null
			if (res.ok && result.data) {
				triggerIntelToast(result.data);
			} else {
				console.warn('No intelligence report found in database. Did the 7AM cron job run?');
				toast.error('Mood logged, but no AI report found for today.');
			}
		} catch (err) {
			console.error('Fetch failure:', err);
			toast.error('Connection error while fetching AI report.');
		} finally {
			isLoadingIntel = false;
		}
	}

	// Handle Mood Selection
	async function handleMoodUpdate(mood: string) {
		// mood logged successfully (silent)
		setTimeout(async () => {
			await fetchMorningIntelligence();
		}, 300);
	}

	onMount(() => {
		showModal = true;
	});
</script>

<Toaster position="bottom-right" expand={false} richColors />

<main class="min-h-screen bg-[#101822] flex flex-col items-center justify-center p-6 font-display">
	<button
		onclick={() =>
			triggerIntelToast({ eventName: 'Manual Test', eventTime: '12:00 PM', probability: '100%' })}
		class="fixed bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-red-900/20 border border-red-500/50 text-red-500 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all z-50"
	>
		<Bug size={12} />
		Test Toast UI
	</button>

	{#if isLoadingIntel}
		<div
			class="fixed top-4 right-4 flex items-center gap-2 text-[#1973f0] font-mono text-[10px] animate-pulse z-50"
		>
			<span class="w-2 h-2 bg-[#1973f0] rounded-full"></span>
			SYNCING_AI_INTELLIGENCE...
		</div>
	{/if}

	<div class="relative group">
		<div
			class="absolute -inset-1 bg-gradient-to-r from-[#1973f0] to-blue-600 rounded blur opacity-25 group-hover:opacity-100 transition duration-1000"
		></div>
		<button
			onclick={() => (showModal = true)}
			class="relative flex items-center gap-4 px-8 py-4 bg-[#111822] border-2 border-[#1973f0] text-white font-bold text-xl uppercase tracking-tighter shadow-[4px_4px_0px_0px_#1973f0] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
		>
			<Activity class="size-6 text-[#1973f0]" />
			Log Daily State
		</button>
	</div>

	<MoodModal bind:isOpen={showModal} onConfirm={handleMoodUpdate} />
</main>
