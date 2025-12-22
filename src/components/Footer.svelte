<script>
    import { onMount } from "svelte";
    import { scrollToId } from '$lib/scrollToId'
    import gsap from "gsap";

  const NAV_HEIGHT = 72 

    onMount(() => {
        gsap.from(".footer-logo", {
            opacity: 0,
            y: 40,
            scale: 0.92,
            duration: 1.4,
            ease: "power3.out"
        });

        gsap.to(".footer-logo", {
            y: -10,
            repeat: -1,
            yoyo: true,
            duration: 5,
            ease: "sine.inOut"
        });
    });

     const handleNavClick = (id) => {
    scrollToId(id, NAV_HEIGHT);
  }
</script>

<footer id="footer" class="w-full bg-[#09090f] font-montserrat text-white rounded-3xl px-10 py-20 relative overflow-hidden">

<div class="absolute inset-0 z-10 pointer-events-none">
    <!-- Deep primary glow -->
    <div class="w-full h-full bg-[#123F76] opacity-45 blur-[150px] absolute inset-0"></div>

    <!-- Soft secondary blue glow -->
    <div class="w-[70%] h-[70%] bg-[#78C2ED] opacity-45 blur-[200px] absolute top-10 right-10 rounded-full"></div>

    <!-- Light neutral highlight glow -->
    <div class="w-[60%] h-[60%] bg-[#DCDCDC] opacity-40 blur-[220px] absolute bottom-10 left-10 rounded-full"></div>
</div>



    <div class="flex flex-col md:flex-row justify-between w-full">

        <div class="max-w-xl">
            <p class="text-lg text-brand-accent-two mb-4">✦ Contact Us</p>

            <h2 class="text-3xl md:text-4xl font-semibold leading-tight mb-10 text-white/90">
             Interested in transforming the way you plan your day, discovering how 24Flow automates your schedule, or simply understanding how our platform helps you stay organized and in control?
            </h2>

            <p class="text-sm text-brand-accent-two mb-2">Contact the team at:</p>
            <a href="mailto:support@24flow.ai" 
               class="text-lg underline underline-offset-4 decoration-white hover:opacity-80 transition">
               support@24flow.ai ↗
            </a>
        </div>

        <div class="flex flex-col gap-3 text-right pt-10 md:pt-0">
            <a class="hover:text-gray-300 transition cursor-pointer" on:click={()=> handleNavClick('home')}>Home</a>
            <a class="hover:text-gray-300 transition cursor-pointer" href="/dashboard">Get Started</a>
            <a class="hover:text-gray-300 transition cursor-pointer" on:click={()=> handleNavClick('features')}>Features</a>
            <a class="hover:text-gray-300 transition cursor-pointer" on:click={()=> handleNavClick('footer')}>Contact</a>
        </div>
    </div>

    <div class="w-full flex justify-center mt-24 mb-14">
        <h1 class="footer-logo text-[65px] md:text-[150px] font-monoton tracking-tight text-white/90 select-none">
            24Flow
        </h1>
    </div>

    <div class="flex flex-col md:flex-row justify-between items-center text-sm text-[#8b8b9c]">

        <p>© 2025 24Flow. All rights reserved.</p>

        <div class="flex gap-6 pt-4 md:pt-0">
            <a class="hover:text-white transition cursor-pointer">LinkedIn</a>
            <a class="hover:text-white transition cursor-pointer">Facebook</a>
            <a class="hover:text-white transition cursor-pointer">Twitter</a>
        </div>
    </div>
</footer>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Monoton&display=swap');

    .font-monoton {
        font-family: "Monoton", sans-serif;
    }
</style>
