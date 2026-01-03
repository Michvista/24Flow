<script lang="ts">
  import { Bolt, CheckCircle, Frown, Moon, X } from 'lucide-svelte';
  import { fade, scale } from 'svelte/transition';

  // Props
  let { isOpen = $bindable(false), onConfirm } = $props();

  // State
  let selectedMood = $state('PRODUCTIVE');

  const moods = [
    { id: 'STRESSED', icon: Bolt, rotation: -45, label: 'STRESSED' },
    { id: 'PRODUCTIVE', icon: CheckCircle, rotation: 45, label: 'PRODUCTIVE' },
    { id: 'UNMOTIVATED', icon: Frown, rotation: -135, label: 'UNMOTIVATED' },
    { id: 'TIRED', icon: Moon, rotation: 135, label: 'TIRED' }
  ];

  let currentRotation = $derived(moods.find(m => m.id === selectedMood)?.rotation || 0);

  function handleConfirm() {
    onConfirm?.(selectedMood);
    isOpen = false;
  }
</script>

{#if isOpen}
  <div 
    transition:fade={{ duration: 200 }}
    class="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/70 font-display"
  >
    <div class="fixed inset-0 pointer-events-none opacity-10">
      <div class="absolute inset-0 bg-[radial-gradient(#1973f0_1px,transparent_1px)] [background-size:40px_40px]"></div>
    </div>

    <div 
      transition:scale={{ start: 0.95, duration: 200 }}
      class="relative flex flex-col w-full max-w-[500px] max-h-[90vh] bg-[#111822] border-4 border-primary shadow-neo overflow-hidden"
    >
      <div class="flex items-stretch border-b-4 border-primary bg-[#111822] z-20 shrink-0">
        <div class="flex-1 p-4 flex flex-col justify-center">
          <div class="flex items-center gap-2 mb-1">
            <span class="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <p class="text-primary text-[10px] font-bold font-mono tracking-widest uppercase">
              {new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' })} // LOG_SYSTEM
            </p>
          </div>
          <h2 class="text-white text-lg font-bold leading-none uppercase tracking-tighter">Log Your State</h2>
        </div>
        <button 
          onclick={() => isOpen = false}
          class="w-16 border-l-4 border-primary bg-[#111822] hover:bg-red-500 group transition-all flex items-center justify-center cursor-pointer"
        >
          <X class="text-primary group-hover:text-white size-6 stroke-[3]" />
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col items-center custom-scrollbar bg-[#0d1219]/50">
        <p class="text-slate-400 text-center mb-8 font-medium text-sm">Select a quadrant to sync your current headspace.</p>

        <div class="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 mb-10 shrink-0">
          <div class="w-full h-full rounded-full border-4 border-primary overflow-hidden relative bg-[#0d1219] shadow-[0_0_30px_rgba(25,115,240,0.15)]">
            <div class="w-full h-full grid grid-cols-2 grid-rows-2">
              {#each moods as mood}
                <button 
                  onclick={() => selectedMood = mood.id}
                  class="relative group border border-primary/20 transition-all focus:outline-none flex items-center justify-center
                  {selectedMood === mood.id ? 'bg-primary text-white' : 'hover:bg-primary/10 text-slate-500 hover:text-white'}"
                >
                  <div 
                    class="flex flex-col items-center justify-center transition-transform group-hover:scale-110"
                    style="transform: rotate({mood.rotation}deg)"
                  >
                    <mood.icon class="size-6 md:size-7 mb-1" />
                    <span class="text-[8px] md:text-[10px] font-black tracking-widest uppercase leading-none">
                      {mood.label}
                    </span>
                  </div>
                </button>
              {/each}
            </div>
          </div>

          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-[#111822] rounded-full border-4 border-primary z-30 flex items-center justify-center shadow-[0_0_20px_rgba(25,115,240,0.4)]">
            <div class="w-2 h-2 bg-primary rounded-full animate-ping"></div>
          </div>

          <div 
            class="absolute top-1/2 left-1/2 w-full h-full pointer-events-none z-20 transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1)" 
            style="transform: translate(-50%, -50%) rotate({currentRotation}deg);"
          >
            <div class="absolute top-0 left-1/2 -translate-x-1/2 -mt-3 md:-mt-4">
              <div class="w-0 h-0 border-l-[10px] md:border-l-[14px] border-l-transparent border-r-[10px] md:border-r-[14px] border-r-transparent border-b-[18px] md:border-b-[24px] border-b-primary filter drop-shadow-[0_0_8px_rgba(25,115,240,0.8)]"></div>
            </div>
          </div>

          <div class="absolute -inset-4 border border-dashed border-primary/20 rounded-full pointer-events-none animate-[spin_30s_linear_infinite]"></div>
        </div>

        <div class="w-full mb-8">
          <div class="bg-[#111822] border-2 border-primary/30 p-4 relative overflow-hidden group">
            <div class="absolute top-0 left-0 w-1 h-full bg-primary"></div>
            <span class="text-primary text-[10px] block mb-1 font-mono tracking-[0.3em] font-bold">CURRENT_STATE_READY</span>
            <h2 class="text-white tracking-tighter text-2xl md:text-3xl font-black leading-tight uppercase italic">
              {selectedMood}
            </h2>
          </div>
        </div>

        <div class="flex gap-3 w-full mt-auto">
          <button 
            onclick={() => isOpen = false}
            class="flex-1 h-12 bg-transparent border-2 border-slate-700 text-slate-400 text-xs font-bold tracking-widest hover:border-white hover:text-white transition-all cursor-pointer"
          >
            DISCARD
          </button>
          <button 
            onclick={handleConfirm}
            class="flex-[2] h-12 bg-primary border-2 border-primary text-white text-xs font-bold tracking-widest shadow-neo-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo transition-all cursor-pointer"
          >
            CONFIRM_ENTRY
          </button>
        </div>
      </div>

      <div class="absolute top-14 left-0 w-full h-px bg-primary/10 pointer-events-none"></div>
    </div>
  </div>
{/if}

<style>
  .shadow-neo { box-shadow: 8px 8px 0px 0px #1973f0; }
  .shadow-neo-sm { box-shadow: 4px 4px 0px 0px #ffffff; }

  .custom-scrollbar::-webkit-scrollbar { width: 4px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: #0d1219; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: #1973f0; border-radius: 10px; }

  :global(.dark) .font-display {
    font-family: 'Space Grotesk', sans-serif;
  }
</style>