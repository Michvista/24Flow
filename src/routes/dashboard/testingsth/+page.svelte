<script lang="ts">
  import { onMount } from 'svelte';
  import { toast, Toaster } from 'svelte-sonner';
  import { Activity } from 'lucide-svelte';
  import BehavioralSuggestionToast from '../../../components/BehavioralSuggestionToast.svelte';
  import MoodModal from '../../../components/modal/MoodSelectionModal.svelte';

  let showModal = $state(false);
  let isLoadingIntel = $state(false);

  function triggerIntelToast(data: { eventName: string, probability: string, eventTime: string }) {
    const id = Math.random().toString(36).substring(2, 9);
    
    // Svelte 5 / Sonner correct syntax
    toast.custom(BehavioralSuggestionToast, {
      id,
      componentProps: {
        toastId: id,
        eventName: data.eventName,
        eventTime: data.eventTime,
        probability: data.probability
      },
      duration: Infinity 
    });
  }

  async function fetchMorningIntelligence() {
    isLoadingIntel = true;
    try {
      const res = await fetch('http://localhost:3000/ai/tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ toolType: 'GET_INTELLIGENCE_REPORT' }) 
      }); 
      
      const result = await res.json();

      if (res.ok && result.data) {
        triggerIntelToast(result.data);
      }
    } catch (err) {
      console.error("Fetch failure:", err);
    } finally {
      isLoadingIntel = false;
    }
  }

  async function handleMoodUpdate(mood: string) {
    // This is called after the Modal's own fetch succeeds
    await fetchMorningIntelligence();
  }

  onMount(() => {
    showModal = true;
  });
</script>

<Toaster position="bottom-right" />

<main class="min-h-screen bg-[#101822] flex flex-col items-center justify-center p-6 font-display">
  {#if isLoadingIntel}
    <div class="fixed top-4 right-4 flex items-center gap-2 text-[#1973f0] font-mono text-[10px] animate-pulse">
      <span class="w-2 h-2 bg-[#1973f0] rounded-full"></span>
      RETRIEVING_REPORT...
    </div>
  {/if}

  <div class="relative group">
    <div class="absolute -inset-1 bg-gradient-to-r from-[#1973f0] to-blue-600 rounded blur opacity-25 group-hover:opacity-100 transition duration-1000"></div>
    <button 
      onclick={() => showModal = true}
      class="relative flex items-center gap-4 px-8 py-4 bg-[#111822] border-2 border-[#1973f0] text-white font-bold text-xl uppercase tracking-tighter shadow-[4px_4px_0px_0px_#1973f0] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
    >
      <Activity class="size-6 text-[#1973f0]" />
      Log Status
    </button>
  </div>

  <MoodModal bind:isOpen={showModal} onConfirm={handleMoodUpdate} />
</main>