<script>
  import { MapPin, Calendar } from 'lucide-svelte';

  // Form State
  let title = "";
  let location = "";
  let date = "";
  let description = "";

  // 1. Dynamic Recurrence Text
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  let selectedDays = [1, 3]; // Indices for M, W

$: recurrenceText =
  selectedDays.length === 0
    ? "No repeats selected"
    : selectedDays.length === dayNames.length
      ? "Repeats every day"
      : `Repeats every ${selectedDays
          .sort()
          .map(i => dayNames[i])
          .join(", ")}`;


  // 2. Dynamic Time Generation (00:00 to 23:00)
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    return i.toString().padStart(2, '0') + ":00";
  });

  // 3. Time Span Logic
  let startTimeIndex = null;
  let endTimeIndex = null;

  function handleTimeClick(index) {
    if (startTimeIndex === null || endTimeIndex !== null) {
      // Start a new selection
      startTimeIndex = index;
      endTimeIndex = null;
    } else {
      // Complete the range
      if (index < startTimeIndex) {
        endTimeIndex = startTimeIndex;
        startTimeIndex = index;
      } else if (index === startTimeIndex) {
        startTimeIndex = null; // Deselect if clicking same button
      } else {
        endTimeIndex = index;
      }
    }
  }

  $: isSelected = (index) => {
    if (startTimeIndex === null) return false;
    if (endTimeIndex === null) return index === startTimeIndex;
    return index >= startTimeIndex && index <= endTimeIndex;
  };
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet"/>
</svelte:head>

<div class="font-display bg-background-dark min-h-screen text-text-primary p-4 md:p-10">
  <div class="max-w-3xl mx-auto">
    <div class="mb-8">
      <h1 class="text-5xl font-black leading-tight tracking-[-0.033em]">Create New Event</h1>
    </div>

    <form class="space-y-10" on:submit|preventDefault>
      <div class="flex flex-col gap-2">
        <label class="text-sm font-bold uppercase tracking-widest">Title</label>
        <input bind:value={title} class="form-input w-full border-4 border-black bg-surface h-14 p-[15px] focus:ring-4 focus:ring-primary/50 outline-none" placeholder="Enter event title" />
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm font-bold uppercase tracking-widest">Location</label>
        <div class="relative flex w-full items-stretch">
          <input bind:value={location} class="form-input flex-1 border-t-4 border-l-4 border-b-4 border-black bg-surface h-14 p-[15px] outline-none" placeholder="Add location" />
          <div class="flex border-4 border-black bg-surface items-center justify-center px-4">
            <MapPin size={24} class="text-text-secondary" />
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-2 max-w-xs">
        <label class="text-sm font-bold uppercase tracking-widest">Date</label>
        <div class="relative flex w-full items-stretch">
          <input type="date" bind:value={date} class="form-input flex-1 border-t-4 border-l-4 border-b-4 border-black bg-surface h-14 p-[15px] outline-none" />
          <div class="flex border-4 border-black bg-surface items-center justify-center px-4">
            <Calendar size={24} class="text-text-secondary" />
          </div>
        </div>
      </div>

      <div>
        <p class="text-sm font-bold pb-2 uppercase tracking-widest">Select Time Range (Click start, then end)</p>
        <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 p-4 border-4 border-black bg-surface">
          {#each timeSlots as time, i}
            <button 
              type="button"
              class="h-12 border-2 transition-all {isSelected(i) ? 'bg-primary border-black text-white ring-2 ring-primary shadow-neobrutalist' : 'bg-[#0B111C] border-border-color text-text-secondary hover:border-primary'}"
              on:click={() => handleTimeClick(i)}
            >
              {time}
            </button>
          {/each}
        </div>
      </div>

      <div>
        <p class="text-sm font-bold pb-2 uppercase tracking-widest">Recurring Event</p>
        <div class="flex flex-col gap-4 p-4 border-4 border-black bg-surface">
          <div class="grid grid-cols-7 gap-2">
            {#each days as day, i}
              <button 
                type="button"
                class="aspect-square flex items-center justify-center font-bold border-2 transition-all {selectedDays.includes(i) ? 'bg-primary border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'bg-[#0B111C] border-border-color text-text-secondary'}"
                on:click={() => {
                  selectedDays = selectedDays.includes(i) ? selectedDays.filter(d => d !== i) : [...selectedDays, i];
                }}
              >
                {day}
              </button>
            {/each}
          </div>
          <p class="text-text-secondary text-xs font-mono pt-2 border-t-2 border-border-color/30">
            {recurrenceText}
          </p>
        </div>
      </div>

      <div class="flex flex-col gap-4">
<label class="flex flex-col w-full">
<p class="text-text-primary text-sm font-bold leading-normal pb-2 uppercase tracking-widest">Description</p>
<textarea class="form-textarea flex w-full min-w-0 flex-1 resize-y overflow-hidden text-text-primary focus:outline-0 focus:ring-4 focus:ring-primary/50 border-4 border-black bg-surface h-40 placeholder:text-text-secondary p-[15px] text-base font-normal leading-normal" placeholder="Add a description for your event..."></textarea>
</label>
</div>

      <div class="flex items-center gap-6 pt-4">
        <button class="min-w-[180px] h-14 bg-primary font-bold uppercase border-4 border-black shadow-neobrutalist hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">Schedule</button>
        <button type="button" class="min-w-[140px] h-14 border-4 border-black bg-surface text-text-secondary font-bold uppercase hover:text-white transition-colors">
          Cancel
        </button>

      </div>
    </form>
  </div>
</div>

<style>
  .font-display { font-family: 'Space Grotesk', sans-serif; }
  .bg-background-dark { background-color: #0B111C; }
  .bg-surface { background-color: #0C1524; }
  .bg-primary { background-color: #3E63DD; }
  .text-text-secondary { color: #A1B4D0; }
  .border-border-color { border-color: #4A5E7E; }
  .shadow-neobrutalist { box-shadow: 4px 4px 0px 0px rgba(0,0,0,1); }
  input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(100%);
  cursor: pointer;
}

</style>