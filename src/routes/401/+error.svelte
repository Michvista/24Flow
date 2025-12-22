<script lang="ts">
    import { onMount } from 'svelte';

    // State for dynamic metadata
    let timestamp = $state('2025-01-01 00:00:00 UTC');
    let errorId = $state('REF-401-UNAUTH');

    onMount(() => {
        const now = new Date();
        timestamp = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
    });

    const navItems = [
        { label: 'Login', href: '/auth' },
        { label: 'Home', href: '/' }
    ];

    const footerLinks = [
        { label: 'Home', href: '/' },
        { label: 'Features', href: '/#features' },
        { label: 'Contact', href: '/#footer' }
    ];
</script>

<svelte:head>
    <title>401 Unauthorized - 24FLOW</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
</svelte:head>

<div class="min-h-screen flex flex-col bg-[#101822] font-display text-white selection:bg-[#1973f0] selection:text-white overflow-x-hidden">
    <header class="w-full border-b-2 border-[#2a3b55] bg-[#101822] z-50">
        <div class="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <h1 class="text-xl font-bold tracking-tight uppercase font-monoton">24FLOW</h1>
            </div>
            <nav class=" flex gap-8">
                {#each navItems as item}
                    <a class="text-gray-400 hover:text-white hover:underline decoration-2 underline-offset-4 text-sm font-medium transition-colors" href={item.href}>
                        {item.label}
                    </a>
                {/each}
            </nav>
        </div>
    </header>

    <main class="flex-grow flex items-center justify-center relative w-full p-6 bg-grid-pattern">
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="absolute top-20 left-20 text-[#233248] opacity-50 select-none">
                <span class="material-symbols-outlined text-9xl">lock</span>
            </div>
            <div class="absolute bottom-20 right-20 text-[#233248] opacity-50 select-none">
                <span class="material-symbols-outlined text-9xl">block</span>
            </div>
            <div class="absolute top-1/2 left-10 w-4 h-4 bg-[#1973f0]"></div>
            <div class="absolute bottom-1/3 right-1/4 w-4 h-4 bg-white"></div>
        </div>

        <div class="relative z-10 w-full max-w-4xl bg-[#101822] border-2 border-[#2a3b55] shadow-[6px_6px_0px_0px_#1973f0] p-8 md:p-12 lg:flex lg:gap-12 lg:items-center">
            
            <div class="flex-shrink-0 flex flex-col items-center justify-center lg:items-start lg:w-1/3 mb-8 lg:mb-0 border-b-2 border-[#2a3b55] lg:border-b-0 lg:border-r-2 lg:pr-12 pb-8 lg:pb-0 border-dashed">
                <div class="relative w-48 h-48 bg-[#192434] border-2 border-white flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_#ffffff]">
                    <span class="material-symbols-outlined text-8xl text-[#1973f0]">gpp_bad</span>
                    <div class="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 border border-white">ERROR</div>
                </div>
                <div class="text-center lg:text-left">
                    <p class="text-gray-400 text-sm font-mono uppercase tracking-widest mb-1">Error Code</p>
                    <p class="text-5xl font-black text-white tracking-tighter">401</p>
                </div>
            </div>

            <div class="flex-grow lg:w-2/3">
                <div class="flex items-center gap-3 mb-4">
                    <span class="px-3 py-1 bg-red-500/10 border border-red-500 text-red-500 text-xs font-bold uppercase tracking-wider">Access Denied</span>
                    <span class="h-px flex-grow bg-[#2a3b55]"></span>
                </div>

                <h2 class="text-3xl md:text-5xl font-bold text-white mb-6 uppercase leading-none tracking-tight">
                    You shall not<br/> <span class="text-[#1973f0]">pass.</span>
                </h2>

                <p class="text-gray-400 text-lg mb-8 leading-relaxed max-w-lg">
                    It looks like you don't have permission to access this page. You might need to sign in or sign up with an account or contact your administrator for elevated privileges.
                </p>

                <div class="flex flex-col sm:flex-row gap-4">
                    <a href="/auth" class="group relative px-8 py-3 bg-[#1973f0] border-2 border-white text-white font-bold uppercase tracking-wider shadow-[4px_4px_0px_0px_#ffffff] hover:shadow-[2px_2px_0px_0px_#ffffff] hover:translate-x-[2px] hover:translate-y-[2px] transition-all active:shadow-none active:translate-x-[4px] active:translate-y-[4px] text-center no-underline">
                        <span class="flex items-center justify-center gap-2">
                            Return to Login
                            <span class="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">login</span>
                        </span>
                    </a>
                    
                    <a href="/" class="group px-8 py-3 bg-transparent border-2 border-[#2a3b55] text-white font-bold uppercase tracking-wider hover:bg-[#2a3b55] transition-colors text-center no-underline">
                        <span class="flex items-center justify-center gap-2">
                            Go Home
                            <span class="material-symbols-outlined text-lg">home</span>
                        </span>
                    </a>
                </div>

                <div class="mt-8 pt-6 border-t border-dashed border-[#2a3b55] flex flex-wrap gap-4 text-xs font-mono text-gray-500">
                    <span>ID: {errorId}</span>
                    <span>//</span>
                    <span>TIMESTAMP: {timestamp}</span>
                </div>
            </div>
        </div>
    </main>

    <footer class="w-full bg-[#101822] border-t-2 border-[#2a3b55] py-8">
        <div class="max-w-[1440px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-gray-500 text-sm font-medium">© 2025 24FLOW. All rights reserved.</p>
            <div class="flex items-center gap-6">
                {#each footerLinks as link}
                    <a class="text-gray-500 hover:text-[#1973f0] text-sm font-bold uppercase tracking-wide transition-colors" href={link.href}>
                        {link.label}
                    </a>
                {/each}
            </div>
        </div>
    </footer>
</div>

<style>
    /* Injects the custom grid pattern from the original HTML style block */
    .bg-grid-pattern {
        background-size: 40px 40px;
        background-image: 
            linear-gradient(to right, #233248 1px, transparent 1px),
            linear-gradient(to bottom, #233248 1px, transparent 1px);
    }

    /* Global reset for background to prevent white flashes */
    :global(html), :global(body) {
        background-color: #101822;
        margin: 0;
        padding: 0;
    }
</style>