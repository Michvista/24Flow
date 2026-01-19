<script lang="ts">
    import Navbar from './Navbar.svelte';
    import { Pencil, Trash2, Clock, Check, X, User, MapPin, Loader2 } from 'lucide-svelte';
    import { onMount, tick } from 'svelte';
    import { gsap } from 'gsap';
    import { Toaster, toast } from 'svelte-sonner';
    import SonnerToast from '../SonnerToast.svelte';
    
    interface UserInfo {
        username?: string;
        name?: string;
        email?: string;
    }

    // Props
    export let id = ''; 
    export let eventTitle = 'Neobrutalism Design Workshop';
    export let eventDescription = 'some desc';
    export let startTime = '10:00 AM';
    export let endTime = '01:00 PM';
    export let eventDate = 'August 20, 2024';
    export let location = 'Class';
    export let userData: UserInfo = {};
    export let recurringDays: number[] = [];

    // State
    let isEditing = false;
    let isUpdating = false;
    let editTitle = eventTitle;
    let editDescription = eventDescription;
    let editLocation = location;
    let randomGradient = '';

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    $: recurrenceText = recurringDays?.length > 0
        ? recurringDays.length === 7
            ? 'Repeats daily'
            : `Repeats every ${recurringDays.map(d => dayNames[d]).join(', ')}`
        : 'Does not repeat';

    // Toast Functions
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
    function generateGradient(): string {
        const randomHue = () => Math.floor(Math.random() * 360);
        return `linear-gradient(${Math.floor(Math.random() * 360)}deg, hsl(${randomHue()}, 70%, 30%), hsl(${randomHue()}, 60%, 20%))`;
    }

    function calculateDuration(start: string, end: string): string {
        const parseTime = (timeStr: string): number => {
            const [time, modifier] = timeStr.split(' ');
            let [hours, minutes] = time.split(':').map(Number);
            if (modifier === 'PM' && hours !== 12) hours += 12;
            else if (modifier === 'AM' && hours === 12) hours = 0;
            return hours * 60 + minutes;
        };
        const startMins = parseTime(start);
        const endMins = parseTime(end);
        let diff = endMins - startMins;
        if (diff < 0) diff += 1440;
        const h = Math.floor(diff / 60);
        const m = diff % 60;
        return `${h > 0 ? h + ' hr ' : ''}${m > 0 ? m + ' min' : ''}`.trim() || '0 mins';
    }

    async function toggleEdit() {
        isEditing = !isEditing;
        if (isEditing) {
            await tick();
            gsap.from(".gsap-input", {
                opacity: 0,
                x: -20,
                duration: 0.4,
                stagger: 0.05,
                ease: "power2.out"
            });
        }
    }

    async function handleUpdate() {
        isUpdating = true;
        const dbId = id.includes('_') ? id.split('_')[0] : id;
		console.log(dbId)
        try {
            const res = await fetch(`http://localhost:3000/events/${dbId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    title: editTitle,
                    description: editDescription,
                    location: editLocation
                })
            });
            
            if (res.ok) {
                eventTitle = editTitle;
                eventDescription = editDescription;
                location = editLocation;
                isEditing = false;
                notifySuccess("Success!", "Event details updated successfully.");
            } else {
                const errData = await res.json();
                notifyError("Update Failed", errData.message || "Could not update event.");
            }
        } catch (e) { 
            notifyError("Connection Error", "The server could not be reached.");
        } finally {
            isUpdating = false;
        }
    }

    async function handleDelete() {
        if (!confirm("Delete this entire event series?")) return;
        const dbId = id.includes('_') ? id.split('_')[0] : id;
		console.log(dbId)
        try {
            const res = await fetch(`http://localhost:3000/events/${dbId}`, { 
                method: 'DELETE',
                credentials: 'include' 
            });
            if (res.ok) {
                notifySuccess("Deleted", "Event series removed.");
                window.location.href = '/calendar';
            }
        } catch (e) { 
            notifyError("Error", "Could not delete the event.");
        }
    }

    onMount(() => { randomGradient = generateGradient(); });
    $: duration = calculateDuration(startTime, endTime);
</script>


<div class="dark">
    <div class="relative flex min-h-screen w-full flex-col bg-[#f6f7f8] dark:bg-[#101822] font-display overflow-x-hidden text-slate-900 dark:text-white">
        <div class="layout-container flex h-full grow flex-col">
            <main class="px-4 py-10 sm:px-10 lg:px-20">
                <div class="mx-auto flex max-w-[960px] flex-1 flex-col gap-8">
                    
                    <div class="flex flex-wrap items-center justify-between gap-4">
                        <h1 class="text-4xl md:text-5xl font-black leading-tight tracking-tight">
                            Event Details
                        </h1>
                        <div class="flex items-center gap-3">
                            {#if !isEditing}
                                <button on:click={toggleEdit} class="flex h-11 items-center justify-center gap-2 rounded-lg border-2 border-slate-900 dark:border-slate-300 bg-white dark:bg-slate-900 px-5 text-sm font-bold shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#1973f0] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
                                    <Pencil size={18} /> <span>Edit</span>
                                </button>
                                <button on:click={handleDelete} class="flex h-11 items-center justify-center gap-2 rounded-lg border-2 border-red-600 bg-red-50 dark:bg-red-950/30 px-5 text-sm font-bold text-red-600 shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
                                    <Trash2 size={18} /> <span>Delete</span>
                                </button>
                            {:else}
                                <button 
                                    on:click={handleUpdate} 
                                    disabled={isUpdating}
                                    class="flex h-11 min-w-[100px] items-center justify-center gap-2 rounded-lg border-2 border-green-600 bg-green-50 px-5 text-sm font-bold text-green-600 shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-70"
                                >
                                    {#if isUpdating}
                                        <Loader2 size={18} class="animate-spin" />
                                    {:else}
                                        <Check size={18} /> <span>Save</span>
                                    {/if}
                                </button>
                                <button on:click={() => (isEditing = false)} class="flex h-11 items-center justify-center gap-2 rounded-lg border-2 border-slate-900 bg-white px-5 text-sm font-bold shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all text-black">
                                    <X size={18} /> <span>Cancel</span>
                                </button>
                            {/if}
                        </div>
                    </div>

                    <div class="flex flex-col rounded-xl border-[3px] border-slate-900 dark:border-slate-300 bg-white dark:bg-[#101822] shadow-[8px_8px_0px_0px_#000] dark:shadow-[8px_8px_0px_0px_#1973f0] overflow-hidden">
                        <div class="p-6">
                            <div class="flex flex-col gap-6 lg:flex-row">
                                <div class="w-full aspect-video lg:w-1/3 rounded-lg border-2 border-slate-900 dark:border-slate-300" style="background: {randomGradient};"></div>

                                <div class="flex flex-1 flex-col justify-center">
                                    {#if isEditing}
                                        <div class="flex flex-col gap-4">
                                            <div class="gsap-input flex flex-col gap-1">
                                                <label class="text-[10px] font-black uppercase tracking-widest text-slate-500">Event Title</label>
                                                <input bind:value={editTitle} class="w-full rounded-md border-2 border-slate-900 p-3 text-2xl font-bold focus:bg-yellow-50 focus:outline-none dark:text-black" />
                                            </div>
                                            <div class="gsap-input flex flex-col gap-1">
                                                <label class="text-[10px] font-black uppercase tracking-widest text-slate-500">Description</label>
                                                <textarea bind:value={editDescription} rows="3" class="w-full rounded-md border-2 border-slate-900 p-3 text-base font-medium focus:bg-yellow-50 focus:outline-none dark:text-black"></textarea>
                                            </div>
                                        </div>
                                    {:else}
                                        <h2 class="text-3xl font-black mb-2">{eventTitle}</h2>
                                        <p class="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{eventDescription}</p>
                                        <div class="mt-4 flex items-center gap-2 text-sm font-bold text-slate-400">
                                            <User size={16}/> <span>{userData.username || userData.name}</span>
                                            <span class="mx-1">•</span>
                                            <span>Updated {eventDate}</span>
                                        </div>
                                    {/if}
                                </div>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-[1fr_auto] border-t-[3px] border-slate-900 dark:border-slate-300">
                            <div class="p-6 flex flex-col justify-center border-b-[3px] md:border-b-0 md:border-r-[3px] border-slate-900 dark:border-slate-300">
                                <span class="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">Date</span>
                                <span class="text-2xl font-black">{eventDate}</span>
                            </div>

                            <div class="p-4 bg-slate-50 dark:bg-slate-800/50 flex flex-wrap gap-6 items-center">
                                <div class="flex items-center gap-3">
                                    <div class="p-2 bg-blue-100 dark:bg-blue-500/20 border-2 border-blue-600 rounded-lg text-blue-600">
                                        <Clock size={24} strokeWidth={3} />
                                    </div>
                                    <div>
                                        <p class="text-[10px] font-black uppercase text-blue-600">Time Slot</p>
                                        <p class="text-lg font-black uppercase tracking-tight">{startTime} - {endTime}</p>
                                    </div>
                                </div>
                                
                                <div class="flex flex-col">
                                    <p class="text-[10px] font-black uppercase text-slate-500">Duration</p>
                                    <p class="text-lg font-black">{duration}</p>
                                </div>

                                <div class="flex flex-col min-w-[120px]">
                                    <p class="text-[10px] font-black uppercase text-slate-500">Location</p>
                                    {#if isEditing}
                                        <input bind:value={editLocation} class="gsap-input mt-1 border-b-2 border-slate-900 bg-white font-black text-lg outline-none focus:border-blue-500 text-black rounded" />
                                    {:else}
                                        <div class="flex items-center gap-1">
                                            <MapPin size={16} class="text-red-500" />
                                            <p class="text-lg font-black capitalize">{location}</p>
                                        </div>
                                    {/if}
                                </div>
                            </div>
                        </div>

                        {#if recurringDays?.length > 0}
                            <div class="p-4 bg-yellow-400 border-t-[3px] border-slate-900 text-slate-900 flex items-center gap-3">
                                <div class="p-1 border-2 border-slate-900 rounded-full">
                                    <Clock size={16} strokeWidth={3} />
                                </div>
                                <span class="text-sm font-black uppercase tracking-tight">{recurrenceText}</span>
                            </div>
                        {/if}
                    </div>
                </div>
            </main>
        </div>
    </div>
</div>
<!-- <Toaster position="bottom-right" expand={false} richColors /> -->

<style>
    :global(.font-display) { font-family: 'Space Grotesk', sans-serif; }
</style>