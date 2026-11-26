<script>
	import Navbar from '../components/Navbar.svelte';
	import Landing from '../components/Landing.svelte';
	import About from '../components/About.svelte';
	import Features from '../components/Features.svelte';
	import Footer from '../components/Footer.svelte';
</script>

<svelte:head>
	<title>24Flow — 24 hours under your control</title>
	<meta
		name="description"
		content="Plan, track and master every hour of your day. 24Flow turns your tasks into a clear 24-hour schedule with AI."
	/>
</svelte:head>

<div
	class="min-h-screen bg-[#0b111c] text-white font-display overflow-x-hidden selection:bg-[#1973f0] selection:text-white"
>
	<Navbar />
	<main>
		<Landing />
		<About />
		<Features />
	</main>
	<Footer />
</div>
