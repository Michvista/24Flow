<script>
  import Navbar from "./Navbar.svelte";
  import { Pencil, Trash2, Clock } from 'lucide-svelte';
  import { onMount } from 'svelte';
  
  export let eventTitle = "Neobrutalism Design Workshop";
  export let startTime = "10:00 AM";
  export let endTime = "01:00 PM";
  export let eventDate = "August 20, 2024";

  let randomGradient = "";

  // 1. Generate Random Dark Gradient
  function generateGradient() {
    const randomHue = () => Math.floor(Math.random() * 360);
    // Keep lightness low (20-40%) for a "dark" professional look
    const color1 = `hsl(${randomHue()}, 70%, 30%)`;
    const color2 = `hsl(${randomHue()}, 60%, 20%)`;
    const angle = Math.floor(Math.random() * 360);
    return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
  }

  // 2. Calculate Duration
 function calculateDuration(start, end) {
    const parseTime = (timeStr) => {
      // 1. Split into "10:00" and "AM"
      const [time, modifier] = timeStr.split(' ');
      let [hours, minutes] = time.split(':').map(Number);

      // 2. Correct 12-hour clock logic:
      if (modifier === 'PM' && hours !== 12) {
        hours += 12; // e.g., 1 PM becomes 13:00
      } else if (modifier === 'AM' && hours === 12) {
        hours = 0;   // 12 AM becomes 00:00
      }
      // Note: 12 PM stays 12:00

      return hours * 60 + minutes;
    };

    const startMins = parseTime(start);
    const endMins = parseTime(end);
    let diff = endMins - startMins;

    // Handle events that cross over midnight (e.g., 11 PM to 1 AM)
    if (diff < 0) diff += 1440; 

    const h = Math.floor(diff / 60);
    const m = diff % 60;

    let result = "";
    if (h > 0) result += `${h} hr${h > 1 ? 's' : ''} `;
    if (m > 0) result += `${m} min${m > 1 ? 's' : ''}`;
    return result.trim() || "0 mins";
  }
  onMount(() => {
    randomGradient = generateGradient();
  });

  $: duration = calculateDuration(startTime, endTime);
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
</svelte:head>

<div class="dark">
  <div class="relative flex min-h-screen w-full flex-col bg-[#f6f7f8] dark:bg-[#101822] font-display overflow-x-hidden text-slate-900 dark:text-white">
    <div class="layout-container flex h-full grow flex-col">
      <!-- <Navbar /> -->

      <main class="px-4 py-10 sm:px-10 lg:px-20">
        <div class="mx-auto flex max-w-[960px] flex-1 flex-col gap-8">
          
          <div class="flex flex-wrap items-center justify-between gap-4">
            <h1 class="text-5xl font-black leading-tight tracking-[-0.033em] min-w-72">Event Details</h1>
            <div class="flex items-center gap-2">
              <button class="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-slate-900 dark:border-slate-300 bg-white dark:bg-slate-900 px-4 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#1973f0] hover:-translate-y-0.5 transition-all">
                <Pencil size={18} strokeWidth={2.5} />
                <span>Edit</span>
              </button>
              <button class="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-red-500 bg-red-500/10 px-4 text-sm font-bold text-red-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all">
                <Trash2 size={18} strokeWidth={2.5} />
                <span>Delete</span>
              </button>
            </div>
          </div>

          <div class="flex flex-col rounded-lg border-2 border-slate-900 dark:border-slate-300 bg-white dark:bg-[#101822] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#1973f0]">
            
            <div class="p-4 sm:p-6">
              <div class="flex flex-col items-stretch justify-start gap-4 xl:flex-row xl:items-start bg-transparent">
                <div 
                  class="w-full aspect-video rounded-lg xl:w-1/3 border-2 border-slate-900 dark:border-slate-300 transition-all duration-500" 
                  style="background: {randomGradient};"
                ></div>
                
                <div class="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-1 py-4 xl:px-4">
                  <p class="text-3xl font-bold leading-tight tracking-[-0.015em]">{eventTitle}</p>
                  <div class="flex flex-col gap-1 pt-2">
                    <p class="text-slate-500 dark:text-[#91a9ca] text-base font-normal">A deep dive into raw, functional web aesthetics.</p>
                    <p class="text-slate-500 dark:text-[#91a9ca] text-sm font-normal">Created by Alex Johnson. Last updated on Aug 12, 2024.</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 border-t-2 border-slate-900 dark:border-t-slate-300 p-4 sm:p-6 md:grid-cols-[1fr_auto] md:items-center">
              <div class="flex flex-col">
                <p class="text-slate-500 dark:text-[#91a9ca] text-base font-normal">Date</p>
                <p class="text-xl font-bold">{eventDate}</p>
              </div>
              
              <div class="flex flex-wrap items-center gap-4 rounded-lg border-2 border-slate-900 dark:border-[#1973f0] bg-slate-100 dark:bg-[#1973f0]/20 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#1973f0]">
                <div class="flex items-center gap-3">
                  <Clock size={32} class="text-[#1973f0]" strokeWidth={3} />
                  <div class="flex flex-col">
                    <p class="text-slate-500 dark:text-[#1973f0] text-base font-medium">Time Slot</p>
                    <p class="text-2xl font-black tracking-tight uppercase">{startTime} - {endTime}</p>
                  </div>
                </div>
                <div class="hidden sm:block h-10 w-px bg-slate-300 dark:bg-[#1973f0]/50"></div>
                <div class="hidden sm:flex flex-col">
                  <p class="text-slate-500 dark:text-[#1973f0] text-base font-medium">Duration</p>
                  <p class="text-2xl font-black tracking-tight">{duration}</p>
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-4 p-4 sm:p-6 border-t-2 border-slate-900 dark:border-t-slate-300">
              <p class="text-xl font-bold">Description</p>
              <div class="prose prose-sm dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
                <p>Join us for an immersive workshop exploring the principles of Neobrutalism in modern web design.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</div>

<style>
  :global(.font-display) { font-family: 'Space Grotesk', sans-serif; }
  :global(.dark) { --background-dark: #101822; }
</style>