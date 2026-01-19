<script lang="ts">
	import Navbar from './Navbar.svelte';
	import {
		Settings,
		Bell,
		CreditCard,
		LogOut,
		Save,
		BadgeCheck,
		Pencil,
		ChevronDown,
		TriangleAlert,
		SlidersHorizontal,
		Menu,
		X,
		Moon,
		Timer,
		ShieldCheck,
		Zap,
		RefreshCw
	} from 'lucide-svelte';
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	import { Toaster, toast } from 'svelte-sonner';
	import SonnerToast from '../SonnerToast.svelte';
let { data = {} } = $props();


const user = $derived(data?.user || {});

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

	

	// Sidebar State
	let isSidebarOpen = false;
	let mobileSidebarElem: HTMLElement;

	// 1. Change your declarations to use $state
let sleepTime = $state('23:00');
let wakeTime = $state('07:00');

// 2. Use $derived for the logic
let sleepMinutes = $derived.by(() => {
    const [bH, bM] = sleepTime.split(':').map(Number);
    const [wH, wM] = wakeTime.split(':').map(Number);
    let diff = wH * 60 + wM - (bH * 60 + bM);
    if (diff < 0) diff += 1440; // Handle overnight sleep
    return diff;
});

let durationFormatted = $derived(
    `${Math.floor(sleepMinutes / 60)}h ${(sleepMinutes % 60).toString().padStart(2, '0')}m`
);

let efficiency = $derived(
    Math.min(Math.round((sleepMinutes / 480) * 100), 100)
);

	function generateRandomAvatar() {
		const styles = ['adventurer', 'fun-emoji', 'bottts', 'lorelei', 'avataaars'];
		const randomStyle = styles[Math.floor(Math.random() * styles.length)];
		const randomSeed = Math.random().toString(36).substring(7);
		return `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${randomSeed}`;
	}

let displayName = $state('Alex');
let username = $state('alex_24flower');
let email = $state('alex@example.com');
let bio = $state('Product designer and time management enthusiast.');
let avatarUrl = $state('');
let isUpdating = $state(false);
let currentTab = $state('settings'); // 'settings', 'notifications', 'billing'
// New Preference States
let timezone = $state('(GMT+00:00) UTC');
let dateFormat = $state('MM/DD/YYYY');

interface UserData {
    name?: string;
    username?: string;
    email?: string;
    bio?: string;
    preferences?: {
        timezone?: string;
        dateFormat?: string;
    };
	sleep?: {
		sleepTime?: string;
		wakeTime?: string;
	}
}

onMount(async () => {
    avatarUrl = generateRandomAvatar();
    
    // Helper function to assign user data to state variables
    const assignUserData = (userData:UserData) => {
        displayName = userData.name || '';
        username = userData.username || '';
        email = userData.email || '';
        bio = userData.bio || '';
        
        // Populate preferences if they exist in the record
        if (userData.preferences) {
            timezone = userData.preferences.timezone || '(GMT+00:00) UTC';
            dateFormat = userData.preferences.dateFormat || 'MM/DD/YYYY';
        }
		if (userData.sleep){
			sleepTime = userData.sleep.sleepTime || '23:00';
			wakeTime = userData.sleep.wakeTime || '7:00';
		}
    };

    // 1. Check if user exists in the data prop
    if (data?.user) {
        assignUserData(data.user);
        console.log('User loaded from props:', data.user);
    } 
    // 2. Fallback: Manual fetch if props are missing
    else {
        try {
            const res = await fetch('http://localhost:3000/auth/profile', { 
                credentials: 'include' 
            });
            
            if (res.ok) {
                const result = await res.json();
                if (result.data) {
                    assignUserData(result.data);
                    console.log('User loaded from fallback fetch:', result.data);
                }
            }
        } catch (err) {
            console.error("Could not load user data via fallback:", err);
        }
    }
});
	function toggleMobileSidebar() {
		isSidebarOpen = !isSidebarOpen;
		if (isSidebarOpen) {
			gsap.to(mobileSidebarElem, { x: 0, duration: 0.4, ease: 'power4.out' });
		} else {
			gsap.to(mobileSidebarElem, { x: '-100%', duration: 0.3, ease: 'power4.in' });
		}
	}

const handleUpdate = async () => {
    if (isUpdating) return; 
    
    isUpdating = true;
    
    const formData = {
        name: displayName,
        username: username,
        email: email,
        bio: bio,
        preferences: {
            timezone: timezone, 
            dateFormat: dateFormat
        },
		 sleepLog: {
                sleepTime: sleepTime,
                wakeTime: wakeTime
            },
    };

    try {
        const res = await fetch('http://localhost:3000/auth/update-profile', {
            method: 'PATCH',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });

        const result = await res.json();

        if (result.requiresLogout) {
            window.location.href = '/login?message=Email updated. Please log in again.';
            return;
        } 
        
        if (res.ok) {
            notifySuccess("Success", "Profile updated!");
        } else {
            notifyError("Update Failed", result.message || "Check your details.");
        }
    } catch (err) {
        notifyError("Network Error", "Could not connect to server.");
    } finally {
        isUpdating = false; 
    }
};

const handleLogout = async () => {
    try {
        const response = await fetch('http://localhost:3000/auth/logout', {
            method: 'POST',
            credentials: 'include' 
        });

        if (response.ok) {
            // Perform a page reload and redirect to login
            window.location.href = '/auth'; 
			notifySuccess("LogOut completed", "redirecting...")
        }
    } catch (error) {
        console.error('Logout failed:', error);
		notifyError('Logout failed', String(error))
		
    }
};

</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="bg-background-dark text-white min-h-screen flex flex-col font-display relative">
	<button
		onclick={toggleMobileSidebar}
		class="lg:hidden fixed bottom-6 right-6 z-[100] p-4 bg-[#1973f0] border-4 border-black shadow-[4px_4px_0_0_#000] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all rounded-none"
	>
		{#if isSidebarOpen}
			<X size={28} strokeWidth={3} />
		{:else}
			<Menu size={28} strokeWidth={3} />
		{/if}
	</button>

	<div
		bind:this={mobileSidebarElem}
		class="fixed top-0 inset-y-0 left-0 w-72 bg-[#111822] border-r-4 border-black z-90 -translate-x-full lg:hidden flex flex-col p-8 gap-8"
	>
		<div class="mt-4">
			<h1 class="text-[#1973f0] text-xs font-bold tracking-widest mb-6 uppercase">System Menu</h1>
			<nav class="flex flex-col gap-4">
				<button
					onclick={() => {
						currentTab = 'settings';
						toggleMobileSidebar();
					}}
					class="flex items-center gap-3 px-4 py-4 {currentTab === 'settings'
						? 'bg-[#233248] border-black shadow-neo-primary'
						: 'border-transparent'} border-2 text-white font-bold text-left"
				>
					<Settings size={22} /> <span>General</span>
				</button>
				<button
					onclick={() => {
						currentTab = 'notifications';
						toggleMobileSidebar();
					}}
					class="flex items-center gap-3 px-4 py-4 {currentTab === 'notifications'
						? 'bg-[#233248] border-black shadow-neo-primary'
						: 'border-transparent text-[#91a9ca]'} border-2 font-bold text-left"
				>
					<Bell size={22} /> <span>Notifications</span>
				</button>
				<button
					onclick={() => {
						currentTab = 'billing';
						toggleMobileSidebar();
					}}
					class="flex items-center gap-3 px-4 py-4 {currentTab === 'billing'
						? 'bg-[#233248] border-black shadow-neo-primary'
						: 'border-transparent text-[#91a9ca]'} border-2 font-bold text-left"
				>
					<CreditCard size={22} /> <span>Billing</span>
				</button>
			</nav>
		</div>
		<div class="mt-auto pt-6 border-t-2 border-[#233248]">
				<button
				onclick={handleLogout}
					class="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-red-500 text-red-500 font-bold hover:bg-red-500 hover:text-white transition-colors uppercase text-xs"
				>
					<LogOut size={18} /> Logout
				</button>
			</div>
	</div>

	<div class="flex flex-1 w-full max-w-[1440px] mx-auto relative">
		<aside
			class="hidden lg:flex w-64 flex-col gap-6 p-6 border-r-2 border-[#233248] bg-[#111822]/50 sticky top-0 h-screen"
		>
			<div>
				<h1 class="text-[#1973f0] text-xs font-bold tracking-widest mb-4 uppercase">System Menu</h1>
				<nav class="flex flex-col gap-3">
					<button
						onclick={() => (currentTab = 'settings')}
						class="flex items-center gap-3 px-4 py-3 {currentTab === 'settings'
							? 'bg-[#233248] border-black shadow-neo-primary'
							: 'border-transparent text-[#91a9ca]'} border-2 text-white font-bold transition-transform hover:-translate-y-1 text-left w-full"
					>
						<Settings size={20} /> <span class="text-sm">General</span>
					</button>
					<button
						onclick={() => (currentTab = 'notifications')}
						class="flex items-center gap-3 px-4 py-3 {currentTab === 'notifications'
							? 'bg-[#233248] border-black shadow-neo-primary'
							: 'border-transparent text-[#91a9ca]'} border-2 hover:bg-[#233248]/50 hover:text-white transition-colors text-left w-full"
					>
						<Bell size={20} /> <span class="text-sm font-medium">Notifications</span>
					</button>
					<button
						onclick={() => (currentTab = 'billing')}
						class="flex items-center gap-3 px-4 py-3 {currentTab === 'billing'
							? 'bg-[#233248] border-black shadow-neo-primary'
							: 'border-transparent text-[#91a9ca]'} border-2 hover:bg-[#233248]/50 hover:text-white transition-colors text-left w-full"
					>
						<CreditCard size={20} /> <span class="text-sm font-medium">Billing</span>
					</button>
				</nav>
			</div>
			<div class="mt-auto pt-6 border-t-2 border-[#233248]">
				<button
				onclick={handleLogout}
					class="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-red-500 text-red-500 font-bold hover:bg-red-500 hover:text-white transition-colors uppercase text-xs"
				>
					<LogOut size={18} /> Logout
				</button>
			</div>
		</aside>

		<main class="flex-1 p-6 lg:p-10">
			<div class="flex items-center gap-2 mb-6">
				<a
					class="text-[#91a9ca] text-sm font-bold hover:text-primary uppercase tracking-wider"
					data-sveltekit-preload-data="false"
					href="/">Dashboard</a
				>
				<span class="text-[#91a9ca] text-sm font-bold">/</span>
				<span
					class="text-[#1973f0] text-sm font-bold uppercase tracking-wider bg-[#1973f0]/10 px-2 py-0.5 border border-[#1973f0] capitalize"
					>{currentTab}</span
				>
			</div>

			<div
				class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-6 border-b-4 border-[#233248]"
			>
				<div class="flex flex-col gap-2">
					<h1
						class="text-white text-4xl md:text-5xl font-black tracking-tighter uppercase drop-shadow-[2px_2px_0_#1973f0]"
					>
						{#if currentTab === 'settings'}Global Settings{:else if currentTab === 'notifications'}Alert
							Center{:else}Subscription & Pay{/if}
					</h1>
					<p class="text-[#91a9ca] text-lg font-medium max-w-xl">
						{#if currentTab === 'settings'}Configure your workspace preferences and operational
							parameters.{:else if currentTab === 'notifications'}Manage how and when you receive
							system updates.{:else}Review your plan, invoices, and payment methods.{/if}
					</p>
				</div>
			<button
    onclick={handleUpdate}
    disabled={isUpdating}
    class="neo-btn-primary px-6 py-3 text-white font-bold flex items-center gap-2 uppercase transition-all
    {isUpdating ? 'opacity-70 cursor-not-allowed shadow-none translate-x-1 translate-y-1' : 'hover:cursor-pointer'}"
>
    {#if isUpdating}
        <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
      Processing...
    {:else}
        <Save size={20} /> Save Changes
    {/if}
</button>
			</div>

			{#if currentTab === 'settings'}
				<div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
					<div class="xl:col-span-2 flex flex-col gap-8">
						<div class="neo-card p-6 md:p-8">
							<div class="flex items-center justify-between mb-6 border-b-2 border-[#233248] pb-4">
								<h3 class="text-2xl font-bold text-white uppercase flex items-center gap-2">
									<BadgeCheck class="text-[#1973f0]" size={24} /> Profile Information
								</h3>
							</div>
							<div class="flex flex-col md:flex-row gap-8 items-start">
								<div class="relative group">
									<div
										class="bg-center bg-no-repeat aspect-square bg-cover rounded-sm w-32 h-32 border-2 border-slate-900 dark:border-white overflow-hidden bg-slate-200"
										style="background-image: url('{avatarUrl}');"
									>
										{#if !avatarUrl}<div
												class="animate-pulse bg-slate-300 w-full h-full"
											></div>{/if}
									</div>
								</div>
								<div class="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
									<div class="flex flex-col gap-2">
										<label class="text-[#91a9ca] text-xs font-bold uppercase tracking-wider"
											>Display Name</label
										>
										<input
											class="neo-input h-12 px-4 w-full text-base font-bold"
											type="text"
											bind:value={displayName}
										/>
									</div>
									<div class="flex flex-col gap-2">
										<label class="text-[#91a9ca] text-xs font-bold uppercase tracking-wider"
											>Username</label
										>
										<div class="flex">
											<span
												class="inline-flex items-center px-3 border-y-2 border-l-2 border-[#233248] bg-[#1a2330] text-[#91a9ca] text-sm font-mono"
												>@</span
											>
											<input
												class="neo-input h-12 px-4 w-full text-base font-bold border-l-0"
												type="text"
												placeholder="type a likeable username"
												bind:value={username}
											/>
										</div>
									</div>
									<div class="flex flex-col gap-2 md:col-span-2">
										<label class="text-[#91a9ca] text-xs font-bold uppercase tracking-wider"
											>Email Address</label
										>
										<input
											class="neo-input h-12 px-4 w-full text-base font-bold"
											type="email"
											bind:value={email}
										/>
									</div>
									<div class="flex flex-col gap-2 md:col-span-2">
										<label class="text-[#91a9ca] text-xs font-bold uppercase tracking-wider"
											>Bio</label
										>
										<textarea
											class="neo-input py-3 px-4 w-full text-base font-bold resize-none"
											rows="3"
											placeholder="type something about yourself"
											bind:value={bio}
										></textarea>
									</div>
								</div>
							</div>
						</div>

						<section class="neo-card p-6 md:p-8 relative overflow-hidden group">
							<div
								class="absolute top-0 right-0 p-4 opacity-10 pointer-events-none group-hover:scale-110 transition-transform"
							>
								<Moon size={100} />
							</div>
							<div class="relative z-10 flex flex-col gap-6">
								<div class="flex items-center gap-3">
									<Timer class="text-[#1973f0]" size={24} />
									<h2 class="text-white text-xl font-bold tracking-wide uppercase">
										Sleep & Wake Cycles
									</h2>
								</div>
								<div class="flex flex-wrap gap-6 items-end">
									<div class="flex-1 min-w-[200px]">
										<label
											class="block text-[#91a9ca] text-xs font-bold mb-2 uppercase tracking-wider"
											>sleepTime</label
										>
										<input
											class="neo-input w-full text-2xl font-mono font-bold py-4 px-4"
											type="time"
											bind:value={sleepTime}
										/>
									</div>
									<div class="flex-1 min-w-[200px]">
										<label
											class="block text-[#91a9ca] text-xs font-bold mb-2 uppercase tracking-wider"
											>Wake Up</label
										>
										<input
											class="neo-input w-full text-2xl font-mono font-bold py-4 px-4"
											type="time"
											bind:value={wakeTime}
										/>
									</div>
									<div class="flex-1 min-w-[180px]">
										<div
											class="border-2 border-[#1973f0] bg-[#1973f0]/10 p-4 flex flex-col justify-center h-[88px]"
										>
											<span class="text-[#1973f0] text-xs font-bold uppercase mb-1"
												>Sleep Duration</span
											>
											<span class="text-white text-3xl font-black tracking-tighter"
												>{durationFormatted}</span
											>
										</div>
									</div>
								</div>
								<div class="flex items-center gap-3 mt-2">
									<div class="h-2 flex-1 bg-[#111822] overflow-hidden border border-[#233248]">
										<div
											class="h-full bg-gradient-to-r from-[#1973f0] to-[#052e16] transition-all duration-500 ease-out"
											style="width: {efficiency}%"
										></div>
									</div>
									<span class="text-xs font-mono text-[#91a9ca] uppercase"
										>{efficiency}% Efficiency</span
									>
								</div>
							</div>
						</section>

						<div class="neo-card p-6 md:p-8">
							<div class="flex items-center justify-between mb-6 border-b-2 border-[#233248] pb-4">
								<h3 class="text-2xl font-bold text-white uppercase flex items-center gap-2">
									<SlidersHorizontal class="text-[#1973f0]" size={24} /> Preferences
								</h3>
							</div>
							<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
								<div class="flex flex-col gap-3">
									<label class="text-[#91a9ca] text-xs font-bold uppercase tracking-wider"
										>Timezone</label
									>
									<div class="relative">
										<select
										bind:value={timezone}
											class="neo-input h-12 px-4 w-full text-base font-bold appearance-none cursor-pointer"
										>
											<option>(GMT-08:00) Pacific Time</option>
											<option>(GMT+00:00) UTC</option>
										</select>
										<div
											class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white"
										>
											<ChevronDown size={20} />
										</div>
									</div>
								</div>
								<div class="flex flex-col gap-3">
									<label class="text-[#91a9ca] text-xs font-bold uppercase tracking-wider"
										>Date Format</label
									>
									<div class="relative">
										<select
										bind:value={dateFormat}
											class="neo-input h-12 px-4 w-full text-base font-bold appearance-none cursor-pointer"
										>
											<option>MM/DD/YYYY</option>
											<option>YYYY-MM-DD</option>
										</select>
										<div
											class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white"
										>
											<ChevronDown size={20} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="flex flex-col gap-8">
						<div
							class="border-4 border-red-900 bg-red-900/10 p-6 md:p-8 relative overflow-hidden shadow-[6px_6px_0_0_#000]"
						>
							<div
								class="absolute inset-0 opacity-10 pointer-events-none"
								style="background-image: repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, #ef4444 25%, #ef4444 75%, #000 75%, #000); background-position: 0 0, 10px 10px; background-size: 20px 20px;"
							></div>
							<div class="relative z-10">
								<h3 class="text-red-500 font-black text-xl uppercase mb-2 flex items-center gap-2">
									<TriangleAlert size={24} /> Danger Zone
								</h3>
								<p class="text-red-300 text-sm mb-6 font-medium">Actions here cannot be undone.</p>
								<button
									class="w-full bg-red-600 text-white font-bold py-4 px-4 border-2 border-black shadow-neo hover:translate-y-1 hover:shadow-none transition-all uppercase tracking-widest text-sm"
									>Delete Account</button
								>
							</div>
						</div>
					</div>
				</div>
			{:else if currentTab === 'notifications'}
				<div class="neo-card p-8 flex flex-col gap-6">
					<div class="flex items-center gap-4 border-b-2 border-[#233248] pb-6">
						<ShieldCheck class="text-green-500" size={32} />
						<div>
							<h2 class="text-2xl font-black uppercase">Notification Preferences</h2>
							<p class="text-[#91a9ca]">You have 3 active notification channels.</p>
							<p class="text-red-500 capitalize"> This is not a functioning feature</p>
						</div>
					</div>
					<div class="grid gap-4">
						{#each ['Email Digests', 'Browser Push', 'SMS Alerts'] as item}
							<div
								class="flex justify-between items-center p-4 border-2 border-[#233248] bg-[#0d131a]"
							>
								<span class="font-bold uppercase tracking-widest">{item}</span>
								<input type="checkbox" class="w-6 h-6 accent-[#1973f0]" checked />
							</div>
						{/each}
					</div>
				</div>
			{:else if currentTab === 'billing'}
				<div class="neo-card p-8 border-[#1973f0] border-4 shadow-neo-primary">
					<div class="flex flex-col gap-6">
						<div class="bg-[#1973f0] p-6 border-2 border-black">
							<p class="text-red-500 capitalize"> This is not a functioning feature</p>
							<span class="text-xs font-black uppercase tracking-[0.2em] opacity-80"
								>Current Plan</span
							>
							<h2 class="text-4xl font-black italic uppercase">Pro Workspace</h2>
						</div>
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div class="p-6 border-2 border-[#233248] bg-[#1a2330]">
								<p class="text-xs font-bold text-[#91a9ca] uppercase mb-1">Next Billing Date</p>
								<p class="text-xl font-bold">Jan 24, 2026</p>
							</div>
							<div class="p-6 border-2 border-[#233248] bg-[#1a2330]">
								<p class="text-xs font-bold text-[#91a9ca] uppercase mb-1">Monthly Cost</p>
								<p class="text-xl font-bold">$24.00</p>
							</div>
						</div>
						<button
							class="bg-white text-black font-black py-4 uppercase border-4 border-black shadow-[4px_4px_0_0_#1973f0] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
							>Manage Subscription</button
						>
					</div>
				</div>
			{/if}
		</main>
	</div>
</div>
<Toaster position="bottom-right" expand={false} richColors />


<style lang="postcss">
	:global(.font-display) {
		font-family: 'Space Grotesk', sans-serif;
	}

	/* Removed hidden scrollbars to ensure scrolling is evident */

	.neo-input {
		border: 2px solid #233248;
		background-color: #111822;
		color: white;
		transition: all 0.1s ease;
	}
	.neo-input:focus {
		border-color: #1973f0;
		box-shadow: 4px 4px 0 0 #1973f0;
		outline: none;
	}

	.neo-btn-primary {
		background-color: #1973f0;
		border: 2px solid #000000;
		box-shadow: 4px 4px 0 0 #000000;
		transition: all 0.1s ease;
	}
	.neo-btn-primary:active {
		transform: translate(2px, 2px);
		box-shadow: 2px 2px 0 0 #000000;
	}

	.neo-card {
		border: 2px solid #233248;
		background-color: #111822;
		box-shadow: 6px 6px 0 0 #000000;
	}

	.shadow-neo-primary {
		box-shadow: 4px 4px 0 0 #1973f0;
	}

	input[type='time']::-webkit-calendar-picker-indicator {
		filter: invert(48%) sepia(79%) saturate(2476%) hue-rotate(195deg) brightness(101%) contrast(92%);
		cursor: pointer;
	}
</style>
