<script lang="ts">
  import { toast, Toaster } from 'svelte-sonner';
  import BehavioralSuggestionToast from '../../../components/BehavioralSuggestionToast.svelte';

  function triggerIntelToast() {
     const id = Math.random().toString(36).substring(2, 9);

    toast.custom(BehavioralSuggestionToast, {
        id,
      componentProps: {
        toastId: id,
        eventName: "Weekly Sync",
        probability: "92%"
      },
      duration: 10000 // Long duration for intelligence reports
    });
  }

    import MoodModal from '../../../components/modal/MoodSelectionModal.svelte';
  import { Activity } from 'lucide-svelte';

  let showModal = $state(false);
  let savedMood = $state('NONE');

  function handleMoodUpdate(mood: string) {
    savedMood = mood;
    console.log("Mood logged to database:", mood);
  }
</script>

<!-- layout-container (add this for blur) -->
<button 
  onclick={triggerIntelToast}
  class="bg-[#1973f0] text-white px-6 py-3 hover:cursor-pointer font-bold border-2 border-black shadow-[4px_4px_0_0_#000]"
>
	Run System Analysis
</button>

<main class="min-h-screen bg-[#101822] flex flex-col items-center justify-center p-6 font-display">
  <div class="relative group">
    <div class="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
    
    <button 
      onclick={() => showModal = true}
      class="relative flex items-center gap-4 px-8 py-4 bg-[#111822] border-2 border-primary text-white font-bold text-xl uppercase tracking-tighter shadow-[4px_4px_0px_0px_#1973f0] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
    >
      <Activity class="size-6 text-primary" />
      Open Mood Logger
    </button>
  </div>

  {#if savedMood !== 'NONE'}
    <p class="mt-8 text-slate-500 font-mono text-sm">LAST_LOGGED: <span class="text-primary">{savedMood}</span></p>
  {/if}

  <MoodModal 
    bind:isOpen={showModal} 
    onConfirm={handleMoodUpdate} 
  />
</main>

<Toaster position="bottom-right" />
