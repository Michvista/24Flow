<script lang="ts">
	import { scrollToId } from '$lib/scrollToId';
	import { Menu, X } from 'lucide-svelte';
	import gsap from 'gsap';

	const NAV_HEIGHT = 72;
	let isOpen: boolean = false;
	let sidebarElement: HTMLElement | null = null; // This is now the "Curtain"
	let menuLinks: HTMLElement[] = [];

	const buttonClass =
		'px-6 py-2 h-12 bg-brand-primary text-white mt-1 mb-[-5] rounded-md cursor-pointer text-lg ' +
		'shadow-[5px_5px_0_var(--brand-secondary)] transition-all duration-500 ease-in-out ' +
		'hover:translate-x-1 text-center hover:translate-y-1 hover:shadow-none font-poppins  ';

	function toggleMobileMenu() {
		isOpen = !isOpen;

		if (isOpen) {
			gsap.to(sidebarElement, { y: '0%', duration: 0.6, ease: 'expo.out' });

			// 2. Stagger links in (sliding from Y: 20 and fading in)
			gsap.fromTo(
				menuLinks,
				{ y: 20, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.3, ease: 'power2.out' }
			);
		} else {
			// 3. Slide the curtain back up
			gsap.to(sidebarElement, { y: '-100%', duration: 0.5, ease: 'expo.in' });
			// Reset links instantly so they are ready for next time
			gsap.set(menuLinks, { opacity: 0 });
		}
	}

	const handleNavClick = (id: string) => {
		if (isOpen) toggleMobileMenu();
		scrollToId(id, NAV_HEIGHT);
	};
</script>

<nav class="w-full p-4 flex justify-center items-center relative h-full bg-white z-[60]">
	<div class="hidden md:flex gap-6 items-center">
		<button class={buttonClass} on:click={() => scrollToId('home', NAV_HEIGHT)}>Home</button>
		<button class={buttonClass}
			><a href="/auth" data-sveltekit-preload-data="false"> Get Started </a></button
		>
		<button class={buttonClass} on:click={() => scrollToId('features', NAV_HEIGHT)}>Features</button
		>
		<button class={buttonClass} on:click={() => scrollToId('footer', NAV_HEIGHT)}>Contact</button>
	</div>
</nav>
<div class="absolute left-4 md:hidden">
	<button
		class="p-2 rounded border-2 border-brand-primary shadow-neobrutal bg-white relative z-[85]"
		on:click={toggleMobileMenu}
	>
		{#if isOpen}
			<X size={24} color="black" />
		{:else}
			<Menu size={24} color="black" />
		{/if}
	</button>
</div>
<div
	bind:this={sidebarElement}
	class="fixed top-0 left-0 w-full h-[70vh] bg-white border-b-4 border-brand-primary z-[70] flex flex-col items-center justify-center gap-4 md:hidden shadow-2xl transform -translate-y-full"
>
	<button class={buttonClass} on:click={() => handleNavClick('home')} bind:this={menuLinks[0]}>
		Home
	</button>
	<button class={buttonClass} bind:this={menuLinks[1]}>
		<a href="/auth" data-sveltekit-preload-data="false"> Get Started </a>
	</button>
	<button class={buttonClass} on:click={() => handleNavClick('features')} bind:this={menuLinks[2]}>
		Features
	</button>
	<button class={buttonClass} on:click={() => handleNavClick('footer')} bind:this={menuLinks[3]}>
		Contact
	</button>
</div>

<style>
	/* Prevents content from being clickable through the menu when open */
	:global(body.menu-open) {
		overflow: hidden;
	}
</style>
