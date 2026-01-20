<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import unBox from '$lib/imgs/unbox.png';
	import meditating from '$lib/imgs/meditating.png';

	function randomPalette() {
		const hue = Math.floor(Math.random() * 360);

		return {
			bg: `hsl(${hue}, 70%, 94%)`, // soft pastel
			accent: `hsl(${hue}, 60%, 40%)` // darker shade
		};
	}

	let features = [
		{
			title: 'A Better Way to Plan Your Day',
			description:
				'No messy spreadsheets. Visualize your entire day in one place — clear, structured, and built for people who want order.'
		},
		{
			title: 'AI Auto-Fill My Day',
			description:
				'Give the app your tasks and free hours — it automatically arranges everything into a perfect, balanced 12AM–12AM schedule.'
		},
		{
			title: 'AI Hour Block Optimizer',
			description:
				'The AI reshuffles your timetable to reduce overload, remove gaps, and ensure tasks fit into your available hours efficiently.'
		},
		{
			title: 'AI Study Timetable Generator',
			description:
				'Students can enter subjects, topics, deadlines, and available hours. The AI generates a full weekly study timetable instantly.'
		},
		{
			title: 'AI Smart Overlap Fixer',
			description:
				'If two tasks clash or run past their time, the system auto-adjusts the schedule while keeping your priorities intact.'
		},
		{
			title: 'Natural Language → Smart Scheduling',
			description:
				'Type anything like “Study 10–1, gym at 4, cook for 1 hour after”, and the AI instantly converts it into a clean 24H timetable.'
		}
	].map((f) => {
		const palette = randomPalette();
		return {
			...f,
			bgColor: palette.bg,
			accentColor: palette.accent
		};
	});

	onMount(() => {
		const cards = document.querySelectorAll('.feature-card') as NodeListOf<HTMLElement>;

		cards.forEach((card, index) => {
			if (index !== 0 && index !== cards.length - 1) return; // only first + last

			const img = card.querySelector('.hover-pop-img') as HTMLElement | null;
			if (!img) return;

			let moveTL = gsap.timeline({ paused: true });

			// Initial reveal animation
			const revealTL = gsap
				.timeline({ paused: true })
				.fromTo(
					img,
					{ opacity: 0, y: 60, scale: 0.85, rotate: -8 },
					{ opacity: 1, y: 0, scale: 1, rotate: 0, duration: 0.6, ease: 'power3.out' }
				);

			// Magnetic follow animation (cursor inside card)
			const follow = (e: MouseEvent) => {
				const rect = card.getBoundingClientRect();
				const x = e.clientX - rect.left - rect.width / 2;
				const y = e.clientY - rect.top - rect.height / 2;

				gsap.to(img, {
					x: x * 0.12, // horizontal pull
					y: y * 0.12 - 20, // vertical pull + offset
					rotate: x * 0.03,
					scale: 1.05,
					duration: 0.4,
					ease: 'power2.out'
				});
			};

			card.addEventListener('mouseenter', () => {
				revealTL.play();
				moveTL.play();
				card.addEventListener('mousemove', follow as EventListener);
			});

			card.addEventListener('mouseleave', () => {
				revealTL.reverse();
				card.removeEventListener('mousemove', follow as EventListener);

				// Reset position
				gsap.to(img, {
					x: 0,
					y: 0,
					rotate: 0,
					scale: 0.9,
					duration: 0.4,
					ease: 'power2.inOut'
				});
			});
		});
	});
</script>

<div
	id="features"
	class="cont bg-white py-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center font-montserrat"
>
	<div class="max-w-7xl mx-auto w-[75%] text-center mb-16">
		<p class="text-3xl md:text-5xl lg:text-6xl font-semibold text-gray-800">
			Take Time Management to the Next Level
		</p>
	</div>

	<div class="cards max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
		{#each features as feature, i}
			<div
				class={`feature-card 
                    ${i === 0 ? 'md:col-span-2 lg:col-span-2' : ''} 
                    ${i === features.length - 1 ? 'md:col-span-2 lg:col-span-2' : ''}`}
				style="--accent-color: {feature.accentColor}"
			>
				<div class="card-content-inner" style="background-color: {feature.bgColor};">
					<h3 class="text-3xl font-bold text-gray-900">
						{feature.title}
					</h3>

					<p
						class="text-base text-gray-600 font-medium {i === 0 ? 'w-[50%]' : ''} 
                    {i === features.length - 1 ? 'w-[50%]' : ''}"
					>
						{feature.description}
					</p>
				</div>
				{#if i === 0}
					<img src={meditating} alt="" class="hover-pop-img" />
				{/if}
				{#if i === features.length - 1}
					<img src={unBox} alt="" class="hover-pop-img" />
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	.feature-card {
		border-radius: 1rem;
		border: 1px solid black;
		transition: all 0.25s ease;
		position: relative;

		box-shadow:
			0 0 0 2px black,
			14px 14px 0 var(--accent-color);
	}

	/* Hover animation */
	.feature-card:hover {
		transform: translate(-4px, -4px) scale(1.02);

		box-shadow:
			0 0 0 2px black,
			20px 20px 0 var(--accent-color);
	}

	.card-content-inner {
		border-radius: 0.8rem;
		padding: 1.7rem;
		min-height: 200px;

		display: flex;
		flex-direction: column;
		gap: 1rem;

		border: 3px solid var(--accent-color);

		flex-grow: 1;
		flex-shrink: 0;
	}

	/* prevent ellipsis in cases */
	.card-content-inner p,
	.card-content-inner h3 {
		overflow: visible;
		white-space: normal;
		text-overflow: unset;
	}

	/* Smooth appearance */
	.feature-card {
		opacity: 0;
		animation: fadeInUp 0.7s ease forwards;
	}
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Pop-out hover image */
	.hover-pop-img {
		position: absolute;
		bottom: -30px;
		right: -40px;
		width: 30rem;
		height: auto;
		pointer-events: none;
		opacity: 0;
		transform-origin: bottom right;
		z-index: 50; /* above everything */
		will-change: transform, opacity;
	}
</style>
