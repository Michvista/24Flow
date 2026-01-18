<script>
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	import calendarImg from '$lib/imgs/calendar-71.svg';
	import checklist2 from '$lib/imgs/checklist-2.svg';
	import checklist36 from '$lib/imgs/checklist-36.svg';
	import reminderNote from '$lib/imgs/reminder-note-96.svg';
	import time57 from '$lib/imgs/time-57.svg';

	const floatingImgs = [calendarImg, checklist2, checklist36, reminderNote, time57];

	// Orbit radius
	const orbitRadius = 350;

	// Precompute positions around the text
	const positions = floatingImgs.map((_, i) => {
		const angle = (i / floatingImgs.length) * 2 * Math.PI;
		return {
			x: orbitRadius * Math.cos(angle),
			y: orbitRadius * Math.sin(angle)
		};
	});

	onMount(() => {
		// Rotate wrapper for orbit effect
		gsap.to('.orbit-wrapper', {
			rotate: 360,
			duration: 40,
			ease: 'none',
			repeat: -1,
			transformOrigin: '50% 50%'
		});

		// Subtle floating/wobble for each image
		gsap.to('.floating-img', {
			x: '+=15',
			y: '+=15',
			duration: 4,
			yoyo: true,
			repeat: -1,
			ease: 'sine.inOut',
			stagger: 0.2
		});

		// Headline animation
		const letters = document.querySelectorAll('.headline span');
		gsap.from(letters, {
			y: -50,
			opacity: 0,
			duration: 1,
			stagger: 0.05,
			ease: 'back.out(1.7)'
		});

		// Subtext animation
		gsap.from('.subtext', {
			opacity: 0,
			y: 20,
			duration: 1,
			delay: 1.2,
			ease: 'power2.out'
		});
	});
</script>

<div
	class="w-full h-screen relative mt-32 flex items-center justify-center bg-[url('/blob.svg')] bg-center bg-cover"
>
	<div
		class="orbit-wrapper absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
	>
		{#each floatingImgs as img, i}
			<img
				src={img}
				class="floating-img absolute w-16 h-16"
				style="top: 50%; left: 50%; transform: translate(calc(-50% + {positions[i]
					.x}px), calc(-50% + {positions[i].y}px));"
				alt="floating icon"
			/>
		{/each}
	</div>

	<div class="relative z-10 max-w-4xl text-center px-6">
		<h1
			class="headline text-3xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-[3px_3px_0_#78c2Ed]"
			style="color:#154e94cf; font-family:'Monoton', cursive;"
		>
			{#each Array.from('Own Your 24h') as letter}
				<span>{letter}</span>
			{/each}
		</h1>

		<p
			class="subtext text-sm md:text-xl font-semibold max-w-2xl mx-auto text-brand-accent-two font-montserrat"
		>
			Plan, track, and master every hour of your day. Schedule tasks, classes, and activities from
			12AM to 12AM without the headache of Excel spreadsheets. See your entire day clearly and take
			control.
		</p>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=Monoton&display=swap');
</style>
