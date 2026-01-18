<!DOCTYPE html>
<html lang="en"
	><head>
		<meta charset="utf-8" />
		<meta content="width=device-width, initial-scale=1.0" name="viewport" />
		<title>Refined Scheduler Dashboard</title>
		<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
		<link href="https://fonts.googleapis.com" rel="preconnect" />
		<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect" />
		<link
			href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&amp;display=swap"
			rel="stylesheet"
		/>
		<link
			href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap"
			rel="stylesheet"
		/>
		<script>
			tailwind.config = {
				theme: {
					extend: {
						colors: {
							'primary-bg': '#0D1A3E',
							'primary-accent': '#3D7BFF',
							'secondary-yellow': '#F7FF5C',
							'secondary-green': '#00F57A',
							'secondary-purple': '#AF52DE',
							'off-white': '#F0F0F0'
						},
						fontFamily: {
							display: ['IBM Plex Mono', 'monospace']
						},
						boxShadow: {
							hard: '4px 4px 0px #000000',
							'hard-light': '4px 4px 0px #F0F0F0'
						}
					}
				}
			};
		</script>
		<style>
			.material-symbols-outlined {
				font-variation-settings:
					'FILL' 0,
					'wght' 700,
					'GRAD' 0,
					'opsz' 24;
			}
			::-webkit-scrollbar {
				width: 12px;
				background: #0d1a3e;
			}
			::-webkit-scrollbar-thumb {
				background: #f0f0f0;
				border: 2px solid #000000;
			}
		</style>
	</head>
	<body class="font-display bg-primary-bg text-off-white">
		<div class="flex h-screen w-full flex-col">
			<header
				class="flex w-full items-center justify-between border-b-2 border-black bg-primary-accent px-6 py-3"
			>
				<h1 class="text-2xl font-bold uppercase text-black">Scheduler</h1>
				<div class="flex items-center gap-6">
					<div class="flex items-center gap-2">
						<button
							class="flex h-10 w-10 items-center justify-center border-2 border-black bg-off-white text-black shadow-hard transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#000000]"
						>
							<span class="material-symbols-outlined">chevron_left</span>
						</button>
						<button
							class="border-2 border-black bg-off-white px-4 py-2 text-sm font-bold text-black shadow-hard transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#000000]"
							>Today</button
						>
						<button
							class="flex h-10 w-10 items-center justify-center border-2 border-black bg-off-white text-black shadow-hard transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#000000]"
						>
							<span class="material-symbols-outlined">chevron_right</span>
						</button>
					</div>
					<div
						class="flex h-10 items-center border-2 border-black bg-primary-bg p-1 text-off-white"
					>
						<label
							class="flex h-full cursor-pointer items-center justify-center px-3 has-[:checked]:bg-off-white has-[:checked]:text-black"
						>
							<span class="truncate text-sm font-bold">Month</span>
							<input class="invisible w-0" name="view-toggle" type="radio" value="Month" />
						</label>
						<label
							class="flex h-full cursor-pointer items-center justify-center px-3 has-[:checked]:bg-off-white has-[:checked]:text-black"
						>
							<span class="truncate text-sm font-bold">Week</span>
							<input
								checked=""
								class="invisible w-0"
								name="view-toggle"
								type="radio"
								value="Week"
							/>
						</label>
						<label
							class="flex h-full cursor-pointer items-center justify-center px-3 has-[:checked]:bg-off-white has-[:checked]:text-black"
						>
							<span class="truncate text-sm font-bold">Day</span>
							<input class="invisible w-0" name="view-toggle" type="radio" value="Day" />
						</label>
					</div>
					<button
						class="h-10 border-2 border-black bg-secondary-yellow px-5 text-sm font-bold text-black shadow-hard transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#000000]"
						>Add Event</button
					>
				</div>
			</header>
			<main class="flex flex-1 overflow-hidden">
				<div class="flex flex-1 flex-col border-r-2 border-black bg-off-white text-black relative">
					<div
						class="grid grid-cols-[60px_1fr_1fr_1fr_1fr_1fr_1fr_1fr] border-b-2 border-black bg-primary-bg text-off-white z-10"
					>
						<div class="w-[60px] border-r-2 border-black p-4 text-center"></div>
						<div class="border-transparent p-4 text-center">
							<div class="text-xs uppercase text-primary-accent font-bold">SUN</div>
							<div class="text-xl font-bold">29</div>
						</div>
						<div class="border-transparent p-4 text-center">
							<div class="text-xs uppercase text-off-white opacity-60">MON</div>
							<div class="text-xl font-bold">30</div>
						</div>
						<div class="border-transparent p-4 text-center bg-primary-accent/10">
							<div class="text-xs uppercase text-secondary-yellow">TUE</div>
							<div class="text-xl font-bold text-secondary-yellow">31</div>
						</div>
						<div class="border-transparent p-4 text-center">
							<div class="text-xs uppercase text-off-white opacity-60">WED</div>
							<div class="text-xl font-bold">1</div>
						</div>
						<div class="border-transparent p-4 text-center">
							<div class="text-xs uppercase text-off-white opacity-60">THU</div>
							<div class="text-xl font-bold">2</div>
						</div>
						<div class="border-transparent p-4 text-center">
							<div class="text-xs uppercase text-off-white opacity-60">FRI</div>
							<div class="text-xl font-bold">3</div>
						</div>
						<div class="border-transparent p-4 text-center">
							<div class="text-xs uppercase text-off-white opacity-60">SAT</div>
							<div class="text-xl font-bold">4</div>
						</div>
					</div>
					<div class="flex-1 overflow-y-auto relative bg-off-white">
						<div class="relative min-h-[1440px] w-full">
							<div
								class="absolute left-0 top-0 bottom-0 w-[60px] border-r-2 border-black bg-off-white z-10"
							>
								<div class="h-[60px] relative">
									<span class="absolute -top-3 right-2 text-xs text-gray-500 font-bold">12 AM</span>
								</div>
								<div class="h-[60px] relative">
									<span class="absolute -top-3 right-2 text-xs text-gray-500 font-bold">1 AM</span>
								</div>
								<div class="h-[60px] relative">
									<span class="absolute -top-3 right-2 text-xs text-gray-500 font-bold">2 AM</span>
								</div>
								<div class="h-[60px] relative">
									<span class="absolute -top-3 right-2 text-xs text-gray-500 font-bold">3 AM</span>
								</div>
								<div class="h-[60px] relative">
									<span class="absolute -top-3 right-2 text-xs text-gray-500 font-bold">4 AM</span>
								</div>
								<div class="h-[60px] relative">
									<span class="absolute -top-3 right-2 text-xs text-gray-500 font-bold">5 AM</span>
								</div>
								<div class="h-[60px] relative">
									<span class="absolute -top-3 right-2 text-xs text-gray-500 font-bold">6 AM</span>
								</div>
								<div class="h-[60px] relative">
									<span class="absolute -top-3 right-2 text-xs text-gray-500 font-bold">7 AM</span>
								</div>
								<div class="h-[60px] relative">
									<span class="absolute -top-3 right-2 text-xs text-gray-500 font-bold">8 AM</span>
								</div>
								<div class="h-[60px] relative">
									<span class="absolute -top-3 right-2 text-xs text-gray-500 font-bold">9 AM</span>
								</div>
								<div class="h-[60px] relative">
									<span class="absolute -top-3 right-2 text-xs text-gray-500 font-bold">10 AM</span>
								</div>
								<div class="h-[60px] relative">
									<span class="absolute -top-3 right-2 text-xs text-gray-500 font-bold">11 AM</span>
								</div>
								<div class="h-[60px] relative">
									<span class="absolute -top-3 right-2 text-xs text-gray-500 font-bold">12 PM</span>
								</div>
								<div class="h-[60px] relative">
									<span class="absolute -top-3 right-2 text-xs text-gray-500 font-bold">1 PM</span>
								</div>
								<div class="h-[60px] relative">
									<span class="absolute -top-3 right-2 text-xs text-gray-500 font-bold">2 PM</span>
								</div>
								<div class="h-[60px] relative">
									<span class="absolute -top-3 right-2 text-xs text-gray-500 font-bold">3 PM</span>
								</div>
								<div class="h-[60px] relative">
									<span class="absolute -top-3 right-2 text-xs text-gray-500 font-bold">4 PM</span>
								</div>
								<div class="h-[60px] relative">
									<span class="absolute -top-3 right-2 text-xs text-gray-500 font-bold">5 PM</span>
								</div>
								<div class="h-[60px] relative">
									<span class="absolute -top-3 right-2 text-xs text-gray-500 font-bold">6 PM</span>
								</div>
								<div class="h-[60px] relative">
									<span class="absolute -top-3 right-2 text-xs text-gray-500 font-bold">7 PM</span>
								</div>
								<div class="h-[60px] relative">
									<span class="absolute -top-3 right-2 text-xs text-gray-500 font-bold">8 PM</span>
								</div>
								<div class="h-[60px] relative">
									<span class="absolute -top-3 right-2 text-xs text-gray-500 font-bold">9 PM</span>
								</div>
								<div class="h-[60px] relative">
									<span class="absolute -top-3 right-2 text-xs text-gray-500 font-bold">10 PM</span>
								</div>
								<div class="h-[60px] relative">
									<span class="absolute -top-3 right-2 text-xs text-gray-500 font-bold">11 PM</span>
								</div>
							</div>
							<div class="absolute left-[60px] right-0 top-0 h-full pointer-events-none">
								<div class="h-[60px] border-b border-gray-300 w-full"></div>
								<div class="h-[60px] border-b border-gray-300 w-full"></div>
								<div class="h-[60px] border-b border-gray-300 w-full"></div>
								<div class="h-[60px] border-b border-gray-300 w-full"></div>
								<div class="h-[60px] border-b border-gray-300 w-full"></div>
								<div class="h-[60px] border-b border-gray-300 w-full"></div>
								<div class="h-[60px] border-b border-gray-300 w-full"></div>
								<div class="h-[60px] border-b border-gray-300 w-full"></div>
								<div class="h-[60px] border-b border-gray-300 w-full"></div>
								<div class="h-[60px] border-b border-gray-300 w-full"></div>
								<div class="h-[60px] border-b border-gray-300 w-full"></div>
								<div class="h-[60px] border-b border-gray-300 w-full"></div>
								<div class="h-[60px] border-b border-gray-300 w-full"></div>
								<div class="h-[60px] border-b border-gray-300 w-full"></div>
								<div class="h-[60px] border-b border-gray-300 w-full"></div>
								<div class="h-[60px] border-b border-gray-300 w-full"></div>
								<div class="h-[60px] border-b border-gray-300 w-full"></div>
								<div class="h-[60px] border-b border-gray-300 w-full"></div>
								<div class="h-[60px] border-b border-gray-300 w-full"></div>
								<div class="h-[60px] border-b border-gray-300 w-full"></div>
								<div class="h-[60px] border-b border-gray-300 w-full"></div>
								<div class="h-[60px] border-b border-gray-300 w-full"></div>
								<div class="h-[60px] border-b border-gray-300 w-full"></div>
								<div class="h-[60px] border-b border-gray-300 w-full"></div>
							</div>
							<div class="absolute left-[60px] right-0 top-0 bottom-0 grid grid-cols-7 h-full">
								<div class="relative h-full border-r border-gray-200">
									<div class="absolute top-[540px] w-full px-1 z-10 h-[90px]">
										<div
											class="bg-primary-accent border-2 border-black text-white p-2 h-full text-left shadow-[2px_2px_0px_#000] overflow-hidden rounded-md"
										>
											<span class="block text-xs font-bold mb-1">9:00 - 10:30 AM</span>
											<span class="block text-sm font-bold truncate">Morning Sync</span>
										</div>
									</div>
									<div class="absolute top-[780px] w-full px-1 z-10 h-[60px]">
										<div
											class="bg-primary-accent border-2 border-black text-white p-2 h-full text-left shadow-[2px_2px_0px_#000] overflow-hidden rounded-md"
										>
											<span class="block text-xs font-bold mb-1">1:00 - 2:00 PM</span>
											<span class="block text-sm font-bold truncate">Project Review</span>
										</div>
									</div>
								</div>
								<div class="relative h-full border-r border-gray-200">
									<div class="absolute top-[840px] w-full px-1 z-10 h-[60px]">
										<div
											class="bg-secondary-yellow border-2 border-black text-black p-2 h-full text-left shadow-[2px_2px_0px_#000] overflow-hidden rounded-md"
										>
											<span class="block text-xs font-bold mb-1">2:00 - 3:00 PM</span>
											<span class="block text-sm font-bold truncate">Client Call</span>
										</div>
									</div>
								</div>
								<div class="relative h-full bg-secondary-yellow/5 border-r border-gray-200">
									<div class="absolute top-[600px] w-full px-1 z-20 h-[60px]">
										<div
											class="bg-secondary-yellow border-2 border-black text-black p-2 h-full text-left shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 transition-transform cursor-pointer rounded-md"
										>
											<span class="block text-xs font-bold mb-1">10:00 - 11:00 AM</span>
											<span class="block text-sm font-bold truncate">Design Sync</span>
										</div>
									</div>
									<div class="absolute top-[840px] w-full px-1 z-20 h-[90px]">
										<div
											class="bg-secondary-green border-2 border-black text-black p-2 h-full text-left shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 transition-transform cursor-pointer rounded-md"
										>
											<span class="block text-xs font-bold mb-1">2:00 - 3:30 PM</span>
											<span class="block text-sm font-bold truncate">Project Kick-off</span>
										</div>
									</div>
									<div class="absolute top-[960px] w-full px-1 z-20 h-[60px]">
										<div
											class="bg-secondary-purple border-2 border-black text-white p-2 h-full text-left shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 transition-transform cursor-pointer rounded-md"
										>
											<span class="block text-xs font-bold mb-1">4:00 - 5:00 PM</span>
											<span class="block text-sm font-bold truncate">Team Retro</span>
										</div>
									</div>
								</div>
								<div class="relative h-full border-r border-gray-200">
									<div class="absolute top-[660px] w-full px-1 z-10 h-[90px]">
										<div
											class="bg-secondary-green border-2 border-black text-black p-2 h-full text-left shadow-[2px_2px_0px_#000] overflow-hidden rounded-md"
										>
											<span class="block text-xs font-bold mb-1">11:00 - 12:30 PM</span>
											<span class="block text-sm font-bold truncate">Workshop A</span>
										</div>
									</div>
									<div class="absolute top-[780px] w-full px-1 z-10 h-[60px]">
										<div
											class="bg-secondary-green border-2 border-black text-black p-2 h-full text-left shadow-[2px_2px_0px_#000] overflow-hidden rounded-md"
										>
											<span class="block text-xs font-bold mb-1">1:00 - 2:00 PM</span>
											<span class="block text-sm font-bold truncate">Workshop B</span>
										</div>
									</div>
									<div class="absolute top-[900px] w-full px-1 z-10 h-[60px]">
										<div
											class="bg-secondary-green border-2 border-black text-black p-2 h-full text-left shadow-[2px_2px_0px_#000] overflow-hidden rounded-md"
										>
											<span class="block text-xs font-bold mb-1">3:00 - 4:00 PM</span>
											<span class="block text-sm font-bold truncate">Wrap Up</span>
										</div>
									</div>
									<div class="absolute top-[1020px] w-full px-1 z-10 h-[60px]">
										<div
											class="bg-secondary-green border-2 border-black text-black p-2 h-full text-left shadow-[2px_2px_0px_#000] overflow-hidden rounded-md"
										>
											<span class="block text-xs font-bold mb-1">5:00 - 6:00 PM</span>
											<span class="block text-sm font-bold truncate">Social</span>
										</div>
									</div>
								</div>
								<div class="relative h-full border-r border-gray-200"></div>
								<div class="relative h-full border-r border-gray-200">
									<div class="absolute top-[540px] w-full px-1 z-10 h-[60px]">
										<div
											class="bg-secondary-purple border-2 border-black text-white p-2 h-full text-left shadow-[2px_2px_0px_#000] overflow-hidden rounded-md"
										>
											<span class="block text-xs font-bold mb-1">9:00 - 10:00 AM</span>
											<span class="block text-sm font-bold truncate">Deep Work</span>
										</div>
									</div>
									<div class="absolute top-[840px] w-full px-1 z-10 h-[180px]">
										<div
											class="bg-primary-accent border-2 border-black text-white p-2 h-full text-left shadow-[2px_2px_0px_#000] overflow-hidden rounded-md"
										>
											<span class="block text-xs font-bold mb-1">2:00 - 5:00 PM</span>
											<span class="block text-sm font-bold truncate">Strategy Session</span>
										</div>
									</div>
								</div>
								<div class="relative h-full"></div>
							</div>
							<div
								class="absolute left-[60px] right-0 border-t-2 border-red-500 z-30 flex items-center"
								style="top: 645px;"
							>
								<div class="absolute -left-[6px] h-3 w-3 rounded-full bg-red-500"></div>
							</div>
						</div>
					</div>
				</div>
				<aside
					class="w-80 flex-shrink-0 overflow-y-auto custom-scrollbar bg-primary-bg p-6 border-l-2 border-black flex flex-col"
				>
					<div class="border-2 border-off-white bg-primary-bg p-4 shadow-hard-light">
						<div class="flex items-center justify-between mb-4">
							<span class="font-bold text-off-white uppercase">October 2023</span>
							<div class="flex gap-1">
								<button
									class="flex h-6 w-6 items-center justify-center border-2 border-off-white bg-primary-accent text-white hover:bg-black transition-colors"
								>
									<span class="material-symbols-outlined text-sm">chevron_left</span>
								</button>
								<button
									class="flex h-6 w-6 items-center justify-center border-2 border-off-white bg-primary-accent text-white hover:bg-black transition-colors"
								>
									<span class="material-symbols-outlined text-sm">chevron_right</span>
								</button>
							</div>
						</div>
						<div class="grid grid-cols-7 gap-1 text-center text-xs mb-2">
							<div class="font-bold text-gray-400">S</div>
							<div class="font-bold text-gray-400">M</div>
							<div class="font-bold text-gray-400">T</div>
							<div class="font-bold text-gray-400">W</div>
							<div class="font-bold text-gray-400">T</div>
							<div class="font-bold text-gray-400">F</div>
							<div class="font-bold text-gray-400">S</div>
						</div>
						<div class="grid grid-cols-7 gap-1 text-center text-sm text-off-white">
							<div class="p-1 opacity-30">29</div>
							<div class="p-1 opacity-30">30</div>
							<div
								class="p-1 hover:bg-secondary-yellow hover:text-black cursor-pointer font-bold transition-colors"
							>
								1
							</div>
							<div
								class="p-1 hover:bg-secondary-yellow hover:text-black cursor-pointer font-bold transition-colors"
							>
								2
							</div>
							<div
								class="p-1 hover:bg-secondary-yellow hover:text-black cursor-pointer font-bold transition-colors"
							>
								3
							</div>
							<div
								class="p-1 hover:bg-secondary-yellow hover:text-black cursor-pointer font-bold transition-colors"
							>
								4
							</div>
							<div
								class="p-1 hover:bg-secondary-yellow hover:text-black cursor-pointer font-bold transition-colors"
							>
								5
							</div>
							<div
								class="p-1 hover:bg-secondary-yellow hover:text-black cursor-pointer font-bold transition-colors"
							>
								6
							</div>
							<div
								class="p-1 hover:bg-secondary-yellow hover:text-black cursor-pointer font-bold transition-colors"
							>
								7
							</div>
							<div
								class="p-1 hover:bg-secondary-yellow hover:text-black cursor-pointer font-bold transition-colors"
							>
								8
							</div>
							<div
								class="p-1 hover:bg-secondary-yellow hover:text-black cursor-pointer font-bold transition-colors"
							>
								9
							</div>
							<div
								class="p-1 hover:bg-secondary-yellow hover:text-black cursor-pointer font-bold transition-colors"
							>
								10
							</div>
							<div
								class="p-1 hover:bg-secondary-yellow hover:text-black cursor-pointer font-bold transition-colors"
							>
								11
							</div>
							<div
								class="p-1 hover:bg-secondary-yellow hover:text-black cursor-pointer font-bold transition-colors"
							>
								12
							</div>
							<div
								class="p-1 hover:bg-secondary-yellow hover:text-black cursor-pointer font-bold transition-colors"
							>
								13
							</div>
							<div
								class="p-1 hover:bg-secondary-yellow hover:text-black cursor-pointer font-bold transition-colors"
							>
								14
							</div>
							<div
								class="p-1 hover:bg-secondary-yellow hover:text-black cursor-pointer font-bold transition-colors"
							>
								15
							</div>
							<div
								class="p-1 hover:bg-secondary-yellow hover:text-black cursor-pointer font-bold transition-colors"
							>
								16
							</div>
							<div
								class="p-1 hover:bg-secondary-yellow hover:text-black cursor-pointer font-bold transition-colors"
							>
								17
							</div>
							<div
								class="p-1 hover:bg-secondary-yellow hover:text-black cursor-pointer font-bold transition-colors"
							>
								18
							</div>
							<div
								class="p-1 hover:bg-secondary-yellow hover:text-black cursor-pointer font-bold transition-colors"
							>
								19
							</div>
							<div
								class="p-1 hover:bg-secondary-yellow hover:text-black cursor-pointer font-bold transition-colors"
							>
								20
							</div>
							<div
								class="p-1 hover:bg-secondary-yellow hover:text-black cursor-pointer font-bold transition-colors"
							>
								21
							</div>
							<div
								class="p-1 hover:bg-secondary-yellow hover:text-black cursor-pointer font-bold transition-colors"
							>
								22
							</div>
							<div
								class="p-1 hover:bg-secondary-yellow hover:text-black cursor-pointer font-bold transition-colors"
							>
								23
							</div>
							<div
								class="p-1 hover:bg-secondary-yellow hover:text-black cursor-pointer font-bold transition-colors"
							>
								24
							</div>
							<div
								class="p-1 hover:bg-secondary-yellow hover:text-black cursor-pointer font-bold transition-colors"
							>
								25
							</div>
							<div
								class="p-1 hover:bg-secondary-yellow hover:text-black cursor-pointer font-bold transition-colors"
							>
								26
							</div>
							<div
								class="p-1 hover:bg-secondary-yellow hover:text-black cursor-pointer font-bold transition-colors"
							>
								27
							</div>
							<div
								class="p-1 hover:bg-secondary-yellow hover:text-black cursor-pointer font-bold transition-colors"
							>
								28
							</div>
							<div
								class="p-1 hover:bg-secondary-yellow hover:text-black cursor-pointer font-bold transition-colors"
							>
								29
							</div>
							<div
								class="p-1 hover:bg-secondary-yellow hover:text-black cursor-pointer font-bold transition-colors"
							>
								30
							</div>
							<div class="p-1 bg-primary-accent text-white font-bold border-2 border-off-white">
								31
							</div>
						</div>
					</div>
					<h2 class="text-xl font-bold uppercase mb-1 text-off-white pt-6">Today's Schedule</h2>
					<p class="mb-6 text-sm text-gray-400">Tue, 31 Oct - 3 events</p>
					<div class="flex flex-col gap-4 pr-1 flex-1 mb-6">
						<div
							class="flex items-start gap-4 border-2 border-off-white p-4 shadow-hard-light bg-primary-bg hover:bg-[#1a2b5e] transition-colors cursor-pointer group"
						>
							<div
								class="mt-1 h-4 w-4 flex-shrink-0 border-2 border-black bg-secondary-yellow group-hover:shadow-[2px_2px_0px_#FFF]"
							></div>
							<div>
								<p class="font-bold text-lg">10:00 AM</p>
								<p class="text-sm font-medium text-gray-300">Design Sync</p>
								<p class="text-xs text-gray-500 mt-1">1h • Zoom</p>
							</div>
						</div>
						<div
							class="flex items-start gap-4 border-2 border-off-white p-4 shadow-hard-light bg-primary-bg hover:bg-[#1a2b5e] transition-colors cursor-pointer group"
						>
							<div
								class="mt-1 h-4 w-4 flex-shrink-0 border-2 border-black bg-secondary-green group-hover:shadow-[2px_2px_0px_#FFF]"
							></div>
							<div>
								<p class="font-bold text-lg">2:00 PM</p>
								<p class="text-sm font-medium text-gray-300">Project Kick-off</p>
								<p class="text-xs text-gray-500 mt-1">1h 30m • Room 302</p>
							</div>
						</div>
						<div
							class="flex items-start gap-4 border-2 border-off-white p-4 shadow-hard-light bg-primary-bg hover:bg-[#1a2b5e] transition-colors cursor-pointer group"
						>
							<div
								class="mt-1 h-4 w-4 flex-shrink-0 border-2 border-black bg-secondary-purple group-hover:shadow-[2px_2px_0px_#FFF]"
							></div>
							<div>
								<p class="font-bold text-lg">4:00 PM</p>
								<p class="text-sm font-medium text-gray-300">Team Retro</p>
								<p class="text-xs text-gray-500 mt-1">1h • Main Hall</p>
							</div>
						</div>
						<div class="mt-4 pt-4 border-t-2 border-gray-700">
							<p class="text-xs font-bold uppercase text-gray-500 mb-2">Tasks</p>
							<div class="flex items-center gap-2 mb-2">
								<input
									checked=""
									class="h-4 w-4 border-2 border-off-white bg-transparent text-primary-accent focus:ring-0 rounded-none"
									type="checkbox"
								/>
								<span class="text-sm line-through text-gray-500">Review PR #231</span>
							</div>
							<div class="flex items-center gap-2">
								<input
									class="h-4 w-4 border-2 border-off-white bg-transparent text-primary-accent focus:ring-0 rounded-none"
									type="checkbox"
								/>
								<span class="text-sm">Update Documentation</span>
							</div>
						</div>
					</div>
				</aside>
			</main>
		</div>
	</body></html
>
