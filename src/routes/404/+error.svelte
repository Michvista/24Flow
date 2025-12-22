<script lang="ts">
	// State for any dynamic error information
	let serverId = $state("US-EAST-1A // v2.4.0");
	let path = $state("/var/www/html/PAGEr/PAGE_id_null");

	const navLinks = [
		{ name: 'Dashboard', href: '/dashboard' },
		{ name: 'Calendar', href: '/dashboard/calendar' },
	];
</script>

<svelte:head>
	<title>404 Page Not Found - 24FLOW</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com"  />
	<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Noto+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
	<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
</svelte:head>

<div class="bg-[#101822] text-white font-display overflow-x-hidden min-h-screen flex flex-col selection:bg-primary selection:text-white">
	<header class="border-b-2 border-slate-700 bg-[#111822] px-6 py-4 sticky top-0 z-50">
		<div class="max-w-7xl mx-auto flex items-center justify-between">
			<div class="flex items-center gap-3">
				<h2 class="text-xl font-bold tracking-tighter uppercase font-monoton">24FLOW //</h2>
			</div>
			
			<nav class="hidden md:flex items-center gap-8">
				{#each navLinks as link}
					<a class="text-sm font-bold uppercase hover:text-[#1973f0] transition-colors" href={link.href}>{link.name}</a>
				{/each}
			</nav>

			<!-- <div class="flex items-center gap-4">
				<button class="hidden md:flex items-center justify-center h-10 px-6 bg-[#1973f0] hover:opacity-35 hover:cursor-pointer text-white text-sm font-bold border-2 border-white shadow-[4px_4px_0px_0px_#fff] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all">
					<a href="/login">
                        LOGIN
                    </a>
				</button>
				<button class="md:hidden p-2">
					<span class="material-symbols-outlined">menu</span>
				</button>
			</div> -->
		</div>
	</header>

	<div class="border-b-2 border-slate-700 bg-yellow-400 text-slate-900 overflow-hidden py-2 select-none">
		<div class="marquee-container">
			<div class="marquee-content font-bold text-sm tracking-widest uppercase">
				ERROR // 404 // MISSING PAGE // SYSTEM MALFUNCTION // TIME NOT FOUND // ERROR // 404 // MISSING PAGE // SYSTEM MALFUNCTION // TIME NOT FOUND // ERROR // 404 // MISSING PAGE // SYSTEM MALFUNCTION // TIME NOT FOUND //
			</div>
		</div>
	</div>

	<main class="flex-grow flex flex-col items-center justify-center px-4 py-12 md:py-20 relative">
		<div class="absolute inset-0 pointer-events-none opacity-[0.05]" style="background-image: linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px); background-size: 40px 40px;"></div>
		
		<div class="flex flex-col max-w-6xl w-full z-10">
			<div class="flex flex-col lg:flex-row gap-8 md:gap-12 items-stretch">
				
				<div class="w-full lg:w-1/2 flex flex-col">
					<div class="relative w-full h-64 md:h-96 lg:h-full border-2 border-slate-600 bg-[#151f2e] shadow-[8px_8px_0px_0px_#1973f0] overflow-hidden group">
						<div class="absolute inset-0 flex items-center justify-center flex-col p-8 text-center bg-slate-900/40 backdrop-blur-sm">
							<span class="material-symbols-outlined text-[80px] md:text-[120px] text-[#1973f0] animate-pulse">
								broken_image
							</span>
							<p class="mt-4 font-mono text-xs text-[#1973f0]/80 uppercase tracking-widest">
								{path}
							</p>
						</div>
						<div class="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-white"></div>
						<div class="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-white"></div>
						<div class="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-white"></div>
						<div class="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-white"></div>
					</div>
				</div>

				<div class="w-full lg:w-1/2 flex flex-col justify-center">
					<div class="border-2 border-slate-600 p-8 md:p-12 bg-[#151f2e] shadow-[8px_8px_0px_0px_#fff] relative">
						<div class="absolute -top-3 left-4 bg-[#1973f0] px-2 py-0.5 border-2 border-white transform -rotate-2">
							<span class="text-xs font-bold text-white uppercase">Fatal Error</span>
						</div>
						
						<div class="flex flex-col gap-6 text-left">
							<h1 class="text-[8rem] md:text-[10rem] font-black leading-[0.8] tracking-[-0.05em] text-[#1973f0] select-none opacity-90 mix-blend-screen">
								404
							</h1>
							<div class="space-y-4 border-l-4 border-[#1973f0] pl-6">
								<h2 class="text-2xl md:text-3xl font-bold uppercase leading-tight text-white">
									System Error: <br/> PAGE Not Found.
								</h2>
								<p class="text-slate-400 text-sm md:text-base font-mono leading-relaxed max-w-md">
									The timeline you are trying to access does not exist in our database. The page has been moved, deleted, or was never part of the plan.
								</p>
							</div>

							<div class="flex flex-wrap gap-4 mt-4">
								<a href="/" class="flex-1 min-w-[160px] flex items-center justify-center h-14 px-6 bg-[#1973f0] text-white text-base font-bold uppercase tracking-wider border-2 border-white shadow-[4px_4px_0px_0px_#fff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#fff] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all group">
									<span class="material-symbols-outlined mr-2 group-hover:-translate-x-1 transition-transform">arrow_back</span>
									Return Home
								</a>
								<button class="flex-1 min-w-[160px] flex items-center justify-center h-14 px-6 bg-transparent text-white text-base font-bold uppercase tracking-wider border-2 border-slate-500 hover:bg-slate-800 hover:border-white transition-colors">
									<span class="material-symbols-outlined mr-2 text-[#1973f0]">bug_report</span>
									Report Bug
								</button>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
	</main>

	<footer class="border-t-2 border-slate-700 bg-[#151f2e] py-10 mt-auto">
		<div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
			<div class="flex flex-col md:flex-row gap-6 md:gap-12 text-center md:text-left">
				<span class="text-slate-400 font-mono text-sm uppercase tracking-wide">System Status: <span class="text-green-500">Online</span></span>
				<a class="text-slate-400 hover:text-white font-bold text-sm uppercase" href="/dashboard">Dashboard</a>
				<a class="text-slate-400 hover:text-white font-bold text-sm uppercase" href="/">Home</a>
			</div>
			<div class="flex items-center gap-2">
				<div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
				<p class="text-slate-500 text-xs font-mono">SERVER_ID: {serverId}</p>
			</div>
			<p class="text-slate-500 text-sm font-bold font-monoton">© 2025 24FLOW SYSTEMS</p>
		</div>
	</footer>
</div>

<style>
	/* Custom Marquee Animation */
	.marquee-container {
		overflow: hidden;
		white-space: nowrap;
	}
	.marquee-content {
		display: inline-block;
		animation: marquee 20s linear infinite;
	}
	@keyframes marquee {
		0% { transform: translateX(0); }
		100% { transform: translateX(-50%); }
	}

	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>