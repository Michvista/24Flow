<script lang="ts">
	// You can add logic for the "Try Again" or "Copy Log" buttons here
	let errorCode = "SCHED_500_INTERNAL_SERVER_ERROR";
	let errorId = "#8392-FKA";
	let timestamp = new Date().toISOString();

	function handleTryAgain() {
		window.location.reload();
	}

	function copyLog() {
		const log = `Error: ${errorCode}\nID: ${errorId}\nTimestamp: ${timestamp}`;
		navigator.clipboard.writeText(log);
		alert("Log copied to clipboard!");
	}
</script>

<svelte:head>
	<title>24Flow - Error 500</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com"  />
	<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Noto+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
	<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
</svelte:head>

<div class="min-h-screen flex flex-col bg-[#0a0a1a] text-white font-display selection:bg-[#1973f0] selection:text-white overflow-x-hidden">
	<header class="w-full border-b-2 border-[#1973f0] bg-[#111822] px-6 py-4 lg:px-12 sticky top-0 z-50">
		<div class="max-w-[1440px] mx-auto flex items-center justify-between">
            <a href="/dashboard" class="text-white text-2xl font-bold font-monoton tracking-tight">24Flow</a>
			<nav class="hidden md:flex items-center gap-8">
				<a class="text-gray-300 hover:text-white hover:underline decoration-2 underline-offset-4 text-sm font-medium transition-colors" href="/">Go Back Home</a>
				<div class="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/50 rounded text-red-400 text-xs font-bold uppercase tracking-wider">
					<span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
					System Offline
				</div>
			</nav>
		</div>
	</header>

	<main class="flex-grow flex flex-col items-center justify-center px-4 py-12 relative">
		<div class="absolute inset-0 z-0 opacity-10 pointer-events-none" style="background-image: linear-gradient(#1973f0 1px, transparent 1px), linear-gradient(90deg, #1973f0 1px, transparent 1px); background-size: 40px 40px;"></div>

		<div class="relative z-10 w-full max-w-4xl flex flex-col items-center gap-12">
			<div class="w-full max-w-2xl bg-[#111822] border-2 border-white p-8 md:p-12 shadow-[6px_6px_0px_0px_#ffffff] flex flex-col items-center text-center relative overflow-hidden group">
				<div class="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-[#1973f0]"></div>
				<div class="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-[#1973f0]"></div>
				<div class="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-[#1973f0]"></div>
				<div class="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-[#1973f0]"></div>

				<div class="mb-6 relative">
					<h1 class="text-[120px] md:text-[180px] font-bold leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#1973f0] to-blue-900 select-none opacity-90 tracking-tighter" style="-webkit-text-stroke: 2px #1973f0;">
						500
					</h1>
					<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#111822] px-4 border border-[#1973f0] rotate-[-5deg] shadow-[4px_4px_0px_0px_#fff]">
						<span class="text-white font-mono text-sm uppercase tracking-widest font-bold">Internal Error</span>
					</div>
				</div>

				<h2 class="text-3xl md:text-4xl font-bold text-white mb-4 uppercase tracking-tight">Something went wrong</h2>
				<p class="text-gray-400 text-lg max-w-md mb-10 leading-relaxed font-body">
					We encountered an unexpected conflict while trying to load your calendar. The server might be taking a mandatory break.
				</p>

				<div class="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
					<a href="/dashboard" class="flex items-center justify-center gap-2 h-14 px-8 bg-[#1973f0] text-white text-base font-bold uppercase tracking-wider border-2 border-transparent hover:border-white transition-all shadow-[6px_6px_0px_0px_#ffffff] hover:translate-y-1 hover:shadow-none w-full sm:w-auto">
						<span class="material-symbols-outlined">dashboard</span>
						Return to Dashboard
					</a>
					<button on:click={handleTryAgain} class="flex items-center justify-center gap-2 h-14 px-8 bg-transparent text-white border-2 border-gray-600 text-base font-bold uppercase tracking-wider hover:border-[#1973f0] hover:text-[#1973f0] transition-colors w-full sm:w-auto">
						<span class="material-symbols-outlined">refresh</span>
						Try Again
					</button>
				</div>
			</div>

			<div class="w-full max-w-2xl mt-4">
				<div class="border border-[#233248] bg-[#0d1219] p-4 rounded-lg">
					<div class="flex items-start gap-4">
						<div class="mt-1 p-2 bg-red-500/10 rounded border border-red-500/20 text-red-500">
							<span class="material-symbols-outlined">terminal</span>
						</div>
						<div class="flex-1 font-mono text-sm">
							<div class="flex items-center justify-between mb-2">
								<p class="text-gray-400 uppercase text-xs tracking-widest font-bold">Technical Details</p>
								<span class="text-xs text-gray-500">ID: {errorId}</span>
							</div>
							<p class="text-white mb-1"><span class="text-[#1973f0]">&gt;</span> Error Code: <span class="text-red-400">{errorCode}</span></p>
							<p class="text-gray-500"><span class="text-[#1973f0]">&gt;</span> Timestamp: {timestamp}</p>
							<p class="text-gray-500"><span class="text-[#1973f0]">&gt;</span> Latency: 420ms</p>
							<div class="mt-4 pt-4 border-t border-[#233248] flex items-center justify-between">
								<span class="text-gray-500 text-xs">If this persists, send this code to support.</span>
								<button on:click={copyLog} class="text-xs text-[#1973f0] hover:text-white underline decoration-dashed underline-offset-4">Copy Log</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: 'Noto Sans', sans-serif;
	}

	.font-display {
		font-family: 'Space Grotesk', sans-serif;
	}

	.font-body {
		font-family: 'Noto Sans', sans-serif;
	}
</style>