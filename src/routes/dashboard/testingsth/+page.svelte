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
</script>

<Toaster position="bottom-right" expand={true} />
<!-- layout-container (add this for blur) -->
<button 
  onclick={triggerIntelToast}
  class="bg-[#1973f0] text-white px-6 py-3 hover:cursor-pointer font-bold border-2 border-black shadow-[4px_4px_0_0_#000]"
>
  Run System Analysis
</button>