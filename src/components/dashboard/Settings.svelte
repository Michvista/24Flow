<script>
  import Navbar from "./Navbar.svelte";
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
    X
  } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import gsap from 'gsap';

  let displayName = "Alex";
  let username = "alex_24flower";
  let email = "alex@example.com";
  let bio = "Product designer and time management enthusiast.";
  let avatarUrl = "";
  
  // Sidebar State
  let isSidebarOpen = false;
  let mobileSidebarElem;

  function generateRandomAvatar() {
    const styles = ['adventurer', 'fun-emoji', 'bottts', 'lorelei', 'avataaars'];
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    const randomSeed = Math.random().toString(36).substring(7);
    return `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${randomSeed}`;
  }

  onMount(() => {
    avatarUrl = generateRandomAvatar();
  });

  function toggleMobileSidebar() {
    isSidebarOpen = !isSidebarOpen;
    if (isSidebarOpen) {
      gsap.to(mobileSidebarElem, { x: 0, duration: 0.4, ease: "power4.out" });
    } else {
      gsap.to(mobileSidebarElem, { x: "-100%", duration: 0.3, ease: "power4.in" });
    }
  }
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
</svelte:head>

<div class="bg-background-dark text-white overflow-x-hidden min-h-screen flex flex-col font-display relative">
  <button 
    on:click={toggleMobileSidebar}
    class="lg:hidden fixed bottom-6 right-6 z-[100] p-4 bg-primary border-4 border-black shadow-[4px_4px_0_0_#000] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all rounded-none"
  >
    {#if isSidebarOpen}
      <X size={28} strokeWidth={3} />
    {:else}
      <Menu size={28} strokeWidth={3} />
    {/if}
  </button>

  <div 
    bind:this={mobileSidebarElem}
    class="fixed inset-y-0 left-0 w-72 bg-[#111822] border-r-4 border-black z-[90] -translate-x-full lg:hidden flex flex-col p-8 gap-8"
  >
    <div class="mt-4">
      <h1 class="text-primary text-xs font-bold tracking-widest mb-6 uppercase">System Menu</h1>
      <nav class="flex flex-col gap-4">
        <a on:click={toggleMobileSidebar} class="flex items-center gap-3 px-4 py-4 bg-[#233248] border-2 border-black shadow-neo-primary text-white font-bold" href="#settings">
          <Settings size={22} />
          <span>General</span>
        </a>
        <a on:click={toggleMobileSidebar} class="flex items-center gap-3 px-4 py-4 text-[#91a9ca] border-2 border-transparent" href="#notifications">
          <Bell size={22} />
          <span>Notifications</span>
        </a>
        <a on:click={toggleMobileSidebar} class="flex items-center gap-3 px-4 py-4 text-[#91a9ca] border-2 border-transparent" href="#billing">
          <CreditCard size={22} />
          <span>Billing</span>
        </a>
      </nav>
    </div>
    <div class="mt-auto border-t-2 border-[#233248] pt-6">
      <button class="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-red-500 text-red-500 font-bold uppercase text-sm">
        <LogOut size={18} /> Logout
      </button>
    </div>
  </div>

  <!-- <Navbar /> -->

  <div class="flex flex-1 w-full max-w-[1440px] mx-auto">
    <aside class="hidden lg:flex w-64 flex-col gap-6 p-6 border-r-2 border-[#233248] min-h-[calc(100vh-80px)] bg-[#111822]/50">
      <div>
        <h1 class="text-primary text-xs font-bold tracking-widest mb-4 uppercase">System Menu</h1>
        <nav class="flex flex-col gap-3">
          <a class="flex items-center gap-3 px-4 py-3 bg-[#233248] border-2 border-black shadow-neo-primary text-white font-bold transition-transform hover:-translate-y-1" href="#settings">
            <Settings size={20} />
            <span class="text-sm">General</span>
          </a>
          <a class="flex items-center gap-3 px-4 py-3 text-[#91a9ca] hover:bg-[#233248]/50 hover:text-white border-2 border-transparent hover:border-[#233248] transition-colors" href="#notifications">
            <Bell size={20} />
            <span class="text-sm font-medium">Notifications</span>
          </a>
          <a class="flex items-center gap-3 px-4 py-3 text-[#91a9ca] hover:bg-[#233248]/50 hover:text-white border-2 border-transparent hover:border-[#233248] transition-colors" href="#billing">
            <CreditCard size={20} />
            <span class="text-sm font-medium">Billing</span>
          </a>
        </nav>
      </div>
      <div class="mt-auto pt-6 border-t-2 border-[#233248]">
        <button class="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-red-500 text-red-500 font-bold hover:bg-red-500 hover:text-white transition-colors">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>

    <main class="flex-1 p-6 lg:p-10 overflow-y-auto">
      <div class="flex items-center gap-2 mb-6">
        <a class="text-[#91a9ca] text-sm font-bold hover:text-primary uppercase tracking-wider" href="/">Dashboard</a>
        <span class="text-[#91a9ca] text-sm font-bold">/</span>
        <span class="text-primary text-sm font-bold uppercase tracking-wider bg-[#1973f0]/10 px-2 py-0.5 border border-[#1973f0]">Settings</span>
      </div>

      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-6 border-b-4 border-[#233248]">
        <div class="flex flex-col gap-2">
          <h1 class="text-white text-4xl md:text-5xl font-black tracking-tighter uppercase drop-shadow-[2px_2px_0_#1973f0]">Global Settings</h1>
          <p class="text-[#91a9ca] text-lg font-medium max-w-xl">Configure your workspace preferences and operational parameters.</p>
        </div>
        <button class="neo-btn-primary px-6 py-3 text-white font-bold flex items-center gap-2 hover:opacity-45 hover:cursor-pointer">
          <Save size={20} /> SAVE CHANGES
        </button>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div class="xl:col-span-2 flex flex-col gap-8">
          <div class="neo-card p-6 md:p-8">
            <div class="flex items-center justify-between mb-6 border-b-2 border-[#233248] pb-4">
              <h3 class="text-2xl font-bold text-white uppercase flex items-center gap-2">
                <BadgeCheck class="text-primary" size={24} /> Profile Information
              </h3>
            </div>
            <div class="flex flex-col md:flex-row gap-8 items-start">
              <div class="relative group">
                <div 
                  class="bg-center bg-no-repeat aspect-square bg-cover rounded-sm w-32 h-32 border-2 border-slate-900 dark:border-white overflow-hidden bg-slate-200"
                  style="background-image: url('{avatarUrl}');"
                >
                  {#if !avatarUrl}
                    <div class="animate-pulse bg-slate-300 w-full h-full"></div>
                  {/if}
                </div>
              </div>
              <div class="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="flex flex-col gap-2">
                  <label class="text-[#91a9ca] text-xs font-bold uppercase tracking-wider">Display Name</label>
                  <input class="neo-input h-12 px-4 w-full text-base font-bold" type="text" bind:value={displayName}/>
                </div>
                <div class="flex flex-col gap-2">
                  <label class="text-[#91a9ca] text-xs font-bold uppercase tracking-wider">Username</label>
                  <div class="flex">
                    <span class="inline-flex items-center px-3 border-y-2 border-l-2 border-[#233248] bg-[#1a2330] text-[#91a9ca] text-sm font-mono">@</span>
                    <input class="neo-input h-12 px-4 w-full text-base font-bold border-l-0" type="text" bind:value={username}/>
                  </div>
                </div>
                <div class="flex flex-col gap-2 md:col-span-2">
                  <label class="text-[#91a9ca] text-xs font-bold uppercase tracking-wider">Email Address</label>
                  <input class="neo-input h-12 px-4 w-full text-base font-bold" type="email" bind:value={email}/>
                </div>
                <div class="flex flex-col gap-2 md:col-span-2">
                  <label class="text-[#91a9ca] text-xs font-bold uppercase tracking-wider">Bio</label>
                  <textarea class="neo-input py-3 px-4 w-full text-base font-bold resize-none" rows="3" bind:value={bio}></textarea>
                </div>
              </div>
            </div>
          </div>
          
          <div class="neo-card p-6 md:p-8">
            <div class="flex items-center justify-between mb-6 border-b-2 border-[#233248] pb-4">
              <h3 class="text-2xl font-bold text-white uppercase flex items-center gap-2">
                <SlidersHorizontal class="text-primary" size={24} /> Preferences
              </h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="flex flex-col gap-3">
                <label class="text-[#91a9ca] text-xs font-bold uppercase tracking-wider">Timezone</label>
                <div class="relative">
                  <select class="neo-input h-12 px-4 w-full text-base font-bold appearance-none cursor-pointer">
                    <option>(GMT-08:00) Pacific Time</option>
                    <option>(GMT+00:00) UTC</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
                    <ChevronDown size={20} />
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-3">
                <label class="text-[#91a9ca] text-xs font-bold uppercase tracking-wider">Date Format</label>
                <div class="relative">
                  <select class="neo-input h-12 px-4 w-full text-base font-bold appearance-none cursor-pointer">
                    <option>MM/DD/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
                    <ChevronDown size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-8">
          <div class="border-4 border-red-900 bg-red-900/10 p-6 md:p-8 relative overflow-hidden shadow-[6px_6px_0_0_#000]">
            <div class="absolute inset-0 opacity-10 pointer-events-none" style="background-image: repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, #ef4444 25%, #ef4444 75%, #000 75%, #000); background-position: 0 0, 10px 10px; background-size: 20px 20px;"></div>
            <div class="relative z-10">
              <h3 class="text-red-500 font-black text-xl uppercase mb-2 flex items-center gap-2">
                <TriangleAlert size={24} /> Danger Zone
              </h3>
              <p class="text-red-300 text-sm mb-6 font-medium">Actions here cannot be undone.</p>
              <button class="w-full bg-red-600 text-white font-bold py-4 px-4 border-2 border-black shadow-neo hover:translate-y-1 hover:shadow-none transition-all uppercase tracking-widest text-sm">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</div>

<style lang="postcss">
  :global(.font-display) { font-family: 'Space Grotesk', sans-serif; }

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

  .shadow-neo-primary { box-shadow: 4px 4px 0 0 #1973f0; }
</style>