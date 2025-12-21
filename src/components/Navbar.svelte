<script>
  import { scrollToId } from '$lib/scrollToId'

	const NAV_HEIGHT = 72 
  let isOpen = false;

  const buttonClass = "px-6 py-2 h-12 bg-brand-primary text-white mt-1 mb-[-5] rounded-md cursor-pointer text-lg " +
                      "shadow-[5px_5px_0_var(--brand-secondary)] transition-all duration-500 ease-in-out " + 
                      "hover:translate-x-1 text-center hover:translate-y-1 hover:shadow-none font-poppins";
</script>

<nav class="w-full p-4 flex justify-center items-center relative h-full">
    <div class="absolute left-4 md:hidden">
    <button
      class="p-2 rounded border-2 border-brand-primary shadow-neobrutal"
      on:click={() => isOpen = !isOpen}
    >
      ☰
    </button>
  </div>


    <div 
 class={`
   flex-col 
   md:flex-row 
   md:flex 
   gap-4 
   md:gap-6 
   items-center 
 text-center
   ${isOpen ? 'flex absolute top-full left-0 right-0 p-4 bg-white z-10' : 'hidden md:flex'}
 `}
  >
    
	<button class={buttonClass} on:click={() => scrollToId('home', NAV_HEIGHT)}>
  		<a>
        Home
      </a>
	</button>
	<button class={buttonClass}>
  		<a href="/dashboard">
        Get Started
      </a>
	</button>
	<button class={buttonClass} on:click={() => scrollToId('features', NAV_HEIGHT)}>
  	<a >
	Features
</a>
	</button>
	<button class={buttonClass} on:click={() => scrollToId('footer', NAV_HEIGHT)}>
    <a >
	Contact
</a>
	</button>
</div>

</nav>