<script lang="ts">
	import AIToolsHub from '../../components/dashboard/AIToolsHub.svelte';
	import Navbar from '../../components/dashboard/Navbar.svelte';
	import Settings from '../../components/dashboard/Settings.svelte';
	import { toast, Toaster } from 'svelte-sonner';
	import { Activity, Bug } from 'lucide-svelte';
	import BehavioralSuggestionToast from '../../components/BehavioralSuggestionToast.svelte';
	import MoodModal from '../../components/modal/MoodSelectionModal.svelte';
	import { onMount } from 'svelte';
	import { PUBLIC_API_URL } from '$env/static/public';

	let showModal = $state(false);
	let isLoadingIntel = $state(false);

	// Default view
	// Receive data from the page load function
	let { data } = $props();
	let activeTab = $state('AI Tools Hub');

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
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
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
<MoodModal bind:isOpen={showModal} onConfirm={handleMoodUpdate} />

<div>
	<Navbar bind:activeTab />
	{#if isLoadingIntel}
		<div
			class="fixed z-500 top-4 right-4 flex items-center gap-2 text-[#1973f0] font-mono text-[10px] animate-pulse"
		>
			<span class="w-2 h-2 bg-[#1973f0] rounded-full"></span>
			SYNCING_AI_INTELLIGENCE...
		</div>
	{/if}

	<main>
		{#if activeTab === 'AI Tools Hub'}
			<AIToolsHub />
		{:else if activeTab === 'Settings'}
			<Settings {data} />
		{/if}
	</main>
</div>
