<script runes lang="ts">
	import { onMount } from 'svelte';
	import { Menu, X, Calendar, Cpu, Settings as SettingsIcon } from 'lucide-svelte';
	import gsap from 'gsap';

	let { activeTab = $bindable('AI Tools Hub') } = $props();

	// reactive state in runes mode
	let avatarUrl = $state<string>('');
	let isMobileMenuOpen = $state<boolean>(false);
	let sidebarElement: HTMLElement | null = null;
	let menuLinks: HTMLElement[] = [];

	function generateRandomAvatar() {
		const styles = ['adventurer', 'fun-emoji', 'bottts', 'lorelei', 'avataaars'];
		const randomStyle = styles[Math.floor(Math.random() * styles.length)];
		const randomSeed = Math.random().toString(36).substring(7);
		return `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${randomSeed}`;
	}

	onMount(() => {
		avatarUrl = generateRandomAvatar();
	});

	// GSAP Animations
	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;

		if (isMobileMenuOpen) {
			// Open Sidebar
			gsap.to(sidebarElement, { x: 0, duration: 0.5, ease: 'power4.out' });
			gsap.fromTo(
				menuLinks,
				{ x: 50, opacity: 0 },
				{ x: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2, ease: 'back.out(1.7)' }
			);
		} else {
			// Close Sidebar
			gsap.to(sidebarElement, { x: '100%', duration: 0.4, ease: 'power4.in' });
		}
	}

	const linkClass =
		'text-sm font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2';
	const activeClass = 'text-white underline decoration-2 underline-offset-8';
	const inactiveClass = 'text-blue-100 hover:text-white';

	// Sidebar-specific classes
	const sidebarLinkClass =
		'text-2xl font-black uppercase tracking-tighter p-4 border-2 border-black bg-white text-black shadow-[4px_4px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all';
</script>

<header
	class="relative flex items-center bg-[#3b82f6] justify-between border-b-2 border-slate-900 px-6 md:px-10 py-3 z-[100]"
>
	<div class="flex items-center gap-4 text-white">
		<div class="size-6">
			<svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
				<path
					clip-rule="evenodd"
					d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z"
					fill="currentColor"
					fill-rule="evenodd"
				></path>
			</svg>
		</div>
		<h2 class="font-monoton text-lg font-bold leading-tight tracking-[-0.015em]">24FLOW</h2>
	</div>

	<div class="flex items-center gap-4 md:gap-8">
		<nav class="hidden md:flex items-center gap-9">
			<a class="{linkClass} {inactiveClass}" href="/dashboard/calendar">
				<Calendar size={16} /> Calendar
			</a>

			<button
				type="button"
				class="{linkClass} {activeTab === 'AI Tools Hub' ? activeClass : inactiveClass}"
				on:click={() => (activeTab = 'AI Tools Hub')}
			>
				<Cpu size={16} /> AI Tools Hub
			</button>

			<button
				type="button"
				class="{linkClass} {activeTab === 'Settings' ? activeClass : inactiveClass}"
				on:click={() => (activeTab = 'Settings')}
			>
				<SettingsIcon size={16} /> Settings
			</button>
		</nav>

		<div
			class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-slate-900 overflow-hidden bg-slate-200"
			style="background-image: url('{avatarUrl}');"
		>
			{#if !avatarUrl}
				<div class=" w-full h-full"></div>
			{/if}
		</div>

		<button
			class="md:hidden p-2 border-2 border-black bg-white shadow-[2px_2px_0_0_#000] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
			on:click={toggleMobileMenu}
		>
			{#if isMobileMenuOpen}
				<X size={24} color="black" />
			{:else}
				<Menu size={24} color="black" />
			{/if}
		</button>
	</div>
</header>

<div
	bind:this={sidebarElement}
	class="fixed inset-0 z-[90] bg-[#3b82f6] translate-x-full md:hidden flex flex-col pt-24 px-8 gap-6 border-l-4 border-black"
>
	<div class="flex flex-col gap-6 w-full">
		<a
			bind:this={menuLinks[0]}
			href="/dashboard/calendar"
			class={sidebarLinkClass}
			on:click={toggleMobileMenu}
		>
			Calendar
		</a>

		<button
			bind:this={menuLinks[1]}
			class="{sidebarLinkClass} {activeTab === 'AI Tools Hub' ? 'bg-yellow-300' : ''}"
			on:click={() => {
				activeTab = 'AI Tools Hub';
				toggleMobileMenu();
			}}
		>
			AI Tools Hub
		</button>

		<button
			bind:this={menuLinks[2]}
			class="{sidebarLinkClass} {activeTab === 'Settings' ? 'bg-yellow-300' : ''}"
			on:click={() => {
				activeTab = 'Settings';
				toggleMobileMenu();
			}}
		>
			Settings
		</button>
	</div>

	<div
		class="mt-auto mb-10 p-4 border-2 border-black bg-black text-white font-bold uppercase text-center rotate-2"
	>
		CurrentlyOn: {activeTab}
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Monoton&display=swap');
	.font-monoton {
		font-family: 'Monoton', sans-serif;
	}

	:global(body) {
		overflow-x: hidden;
	}
</style>
