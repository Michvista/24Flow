<script>
	import { onMount } from 'svelte';
	import main from '$lib/imgs/main.svg';
	import img1 from '$lib/imgs/calendar-71.svg';
	import img2 from '$lib/imgs/checklist-2.svg';
	import img3 from '$lib/imgs/checklist-36.svg';
	import img4 from '$lib/imgs/reminder-note-96.svg';
	import img5 from '$lib/imgs/time-57.svg';

	import gsap from 'gsap';

	onMount(() => {
		gsap.to('.floating', {
			y: 'random(-25,25)',
			x: 'random(-25,25)',
			rotation: 'random(-10,10)',
			duration: 3,
			yoyo: true,
			repeat: -1,
			ease: 'sine.inOut',
			stagger: 0.2
		});
	});
</script>

<div id="home" class="flex flex-col justify-center items-center my-6 relative">
	<!-- Main Image -->
	<div class="mainPic z-10">
		<img src={main} class="w-xs md:w-xl h-xl" alt="main" />
	</div>

	<!-- Floating Images -->
	<div class="floatingPics absolute top-0 left-0 w-full h-full flex justify-center items-center">
		<img src={img1} class="floating absolute w-14 md:w-24 h-24" style="top:10%; left:20%" />
		<img src={img2} class="floating absolute w-14 md:w-24 h-24" style="top:30%; left:70%" />
		<img src={img3} class="floating absolute w-14 md:w-24 h-24" style="top:60%; left:15%" />
		<img src={img4} class="floating absolute w-14 md:w-24 h-24" style="top:85%; left:40%" />
		<img src={img5} class="floating absolute w-14 md:w-24 h-24" style="top:5%; left:65%" />
	</div>
</div>
