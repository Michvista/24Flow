<script>
    import Navbar from '../components/Navbar.svelte';
    import Landing from '../components/Landing.svelte';
    import About from '../components/About.svelte';
	import Features from '../components/Features.svelte';
	import Footer from '../components/Footer.svelte';
  const title = "24hrs under your control";
  const words = title.split(" ");
</script>

<div class="w-full h-full overflow-hidden">
    <div class="text-center mt-4 flex flex-col items-center justify-center h-3/4">
    <p class="text-[4.5vw] lg:text-[11vw] md:text-[8vw] sm:text-[5vw] text-brand-primary font-robson flex items-center gap-4">
      {#each words as word, i}
        <span class="scale-y-180 inline-block">{word}</span>
    
        {#if i < words.length - 1}
          <lord-icon
            src="https://cdn.lordicon.com/kiqyrejq.json"
            trigger="loop"
            class="w-12 h-12"
          ></lord-icon>
        {/if}
      {/each}
    </p>
</div>
<Navbar />
<Landing />
<About />
<Features />
<Footer />
</div>
