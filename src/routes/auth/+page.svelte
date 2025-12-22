<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { 
		CalendarIcon, 
		ArrowRight, 
		Eye, 
		EyeOff, 
		Mail, 
		User, 
		ExternalLink, 
		RefreshCw,
		Menu,
		IdCard,
		MoveLeft
	} from 'lucide-svelte';
	import { gsap } from 'gsap';

	// State Management
	let isLogin = $state(true);
	let showPassword = $state(false);
	let containerElement = $state<HTMLElement | null>(null);
	let contentElement = $state<HTMLElement | null>(null);
	let createAccount = $state<HTMLElement | null>(null);

	async function toggleMode() {
		if (!containerElement || !contentElement) return;

		const startWidth = containerElement.offsetWidth;
		const startHeight = containerElement.offsetHeight;

		await gsap.to(contentElement, { opacity: 0, y: 15, duration: 0.2, ease: "power2.in" });

		isLogin = !isLogin;
		await tick();

		const targetWidth = isLogin ? 480 : 1024;

		gsap.fromTo(containerElement, 
			{ width: startWidth, height: startHeight },
			{ 
				width: targetWidth, 
				height: 'auto', 
				duration: 0.7, 
				ease: "expo.out" ,
                clearProps: "width"
			}
		);

		gsap.fromTo(contentElement, 
			{ opacity: 0, y: -15 },
			{ opacity: 1, y: 0, duration: 0.4, delay: 0.3, ease: "power2.out" }
		);
	}

      onMount(() => {
    gsap.to(".tilt", {
      y: "random(-25,25)", 
      x: "random(-25,25)",
      rotation: "random(-10,10)",
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      stagger: 0.2
    });
  });
function spinAction(node: HTMLElement) {
    gsap.to(node, {
        rotation: 360,
        duration: 4,
        repeat: -1,
        ease: "none"
    });
    
    return {
        destroy() {
            gsap.killTweensOf(node);
        }
    };
}

    import { Toaster, toast } from 'svelte-sonner';
    import SonnerToast from '../../components/SonnerToast.svelte';
	function notifySuccess() {
		toast.custom((t) => ({
			component: SonnerToast,
			props: {
				title: "System Access",
				message: "Authentication successful. Welcome back.",
				type: "success",
				toastId: t
			}
		}), { duration: 4000 });
	}

function notifyError() {
    const id = Math.random().toString(36).substring(2, 9);

    toast.custom(SonnerToast, {
        id, 
        componentProps: {
            toastId: id,
            title: "Access Denied",
            message: "Invalid credentials. Check your key.",
            type: "error"
        },
        duration: 5000
    });
}

</script>

<svelte:head>
	<title>{isLogin ? 'Login' : 'Sign Up'} - 24FLOW</title>
</svelte:head>

<div class="min-h-screen flex flex-col bg-[#101822] font-display text-white selection:bg-[#1973f0] selection:text-white overflow-x-hidden">
	
	<nav class="relative z-20 w-full border-b-2 border-[#1e293b] bg-[#101822]/95 backdrop-blur px-6 py-4">
		<div class="mx-auto flex max-w-7xl items-center justify-between">
			<div class="flex items-center gap-3 select-none">
				<h1 class="text-2xl font-bold tracking-tighter uppercase font-monoton">24FLOW<span class="text-[#1973f0]">.</span></h1>
			</div>
			<button class="group sm:flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors">
				<div class="group-hover:-translate-x-1 transition-transform flex items-center gap-2">
                    <MoveLeft size={20} />
                </div> 
                <a href="/">Back to Home</a>
			</button>
		</div>
	</nav>

	<main class="relative flex-grow flex items-center justify-center p-4 lg:p-8">
		<div class="absolute inset-0 bg-grid-pattern opacity-40 z-0 pointer-events-none"></div>
		<div class="absolute tilt top-20 left-10 w-32 h-32 border-2 border-[#1973f0] opacity-20 hidden md:block rotate-12"></div>
		<div class="absolute tilt bottom-20 right-10 w-48 h-48 border-2 border-[#324867] opacity-30 hidden md:block -rotate-6"></div>

		<div class="relative z-10 w-full flex justify-center">
			<div 
				bind:this={containerElement}
				class="relative bg-[#1a2432] border-2 border-[#334155] shadow-[8px_8px_0px_0px_#000000] overflow-hidden"
				style="width: {isLogin ? '480px' : '1024px'}"
			>
				{#if isLogin}
					<div class="absolute top-0 left-0 bg-[#1973f0] text-black font-bold text-xs py-1 px-4 border-r-2 border-b-2 border-white uppercase tracking-widest z-20">
						System Access
					</div>
				{/if}

				<div bind:this={contentElement} class="w-full h-full">
					{#if isLogin}
						<div class="p-8 md:p-10 flex flex-col gap-6 pt-12">
							<div class="flex flex-col gap-2 pb-4 border-b-2 border-[#324867] border-dashed">
								<h1 class="text-white tracking-tight text-4xl font-bold leading-none uppercase">System<br/><span class="text-[#1973f0]">Login</span></h1>
								<p class="text-gray-400 text-sm font-mono tracking-wide uppercase">Enter credentials to proceed.</p>
							</div>

							<form class="flex flex-col gap-5 mt-2">
								<label class="flex flex-col group">
									<div class="flex justify-between items-end pb-2">
										<span class="text-white text-xs font-bold uppercase tracking-widest group-focus-within:text-[#1973f0] transition-colors">Username // Email</span>
										<IdCard size={18} class="text-[#1973f0] opacity-0 group-focus-within:opacity-100 transition-opacity" />
									</div>
									<input class="w-full bg-[#0d131a] text-white border-2 border-gray-500 focus:border-[#1973f0] focus:ring-0 h-14 px-4 text-lg font-medium transition-all focus:shadow-[4px_4px_0px_0px_#1973f0]" placeholder="user@24flow.io" type="text" />
								</label>

								<label class="flex flex-col group">
									<div class="flex justify-between items-end pb-2">
										<span class="text-white text-xs font-bold uppercase tracking-widest group-focus-within:text-[#1973f0] transition-colors">Password</span>
										<button type="button" class="text-gray-400 hover:text-white text-xs underline font-mono decoration-1 underline-offset-4">FORGOT KEY?</button>
									</div>
									<div class="relative">
										<input class="w-full bg-[#0d131a] text-white border-2 border-gray-500 focus:border-[#1973f0] focus:ring-0 h-14 px-4 text-lg font-medium transition-all focus:shadow-[4px_4px_0px_0px_#1973f0]" placeholder="••••••••••••" type={showPassword ? "text" : "password"} />
										<button type="button" onclick={() => showPassword = !showPassword} class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#1973f0]">
											{#if showPassword}<EyeOff size={18} />{:else}<Eye size={18} />{/if}
										</button>
									</div>
								</label>

								<div class="pt-4">
									<button class="w-full hover:cursor-pointer bg-[#1973f0] h-14 border-2 border-transparent text-black font-bold uppercase tracking-widest shadow-[4px_4px_0px_0px_#ffffff] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all flex items-center justify-center gap-3">
										Authenticate <ArrowRight size={20} />
									</button>
								</div>

								<div class="flex items-center gap-4 pt-1">
									<div class="h-px flex-1 border-t border-dashed border-[#324867]"></div>
									<span class="text-xs text-gray-500 font-bold uppercase tracking-widest">Or</span>
									<div class="h-px flex-1 border-t border-dashed border-[#324867]"></div>
								</div>

								<button type="button" class="w-full bg-white border-2 border-white h-14 px-5 text-black shadow-[4px_4px_0px_0px_#1973f0] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all flex items-center justify-center gap-3">
									<svg class="w-5 h-5" viewBox="0 0 24 24">
										<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
										<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
										<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
										<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
									</svg>
									<span class="text-base font-bold uppercase tracking-widest hover:cursor-pointer">Google Login</span>
								</button>
							</form>

							<div class="flex flex-col items-center gap-3 pt-4 border-t-2 border-[#324867] border-dashed">
								<p class="text-gray-400 text-sm">New to the system?</p>
								<button 
    onclick={toggleMode} 
    class="group hover:cursor-pointer relative inline-flex items-center gap-2 overflow-hidden border-b-2 border-[#1973f0] px-1 pb-1 font-bold uppercase tracking-wider text-white transition-all hover:bg-[#1973f0] hover:text-black"
>
    <div class="relative flex flex-col h-5 overflow-hidden">
        <div class="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
            <span class="flex items-center gap-2">
                Create Account <ExternalLink size={14} />
            </span>
            <span class="flex items-center gap-2">
                Create Account <ExternalLink size={14} />
            </span>
        </div>
    </div>
</button>
							</div>
						</div>

					{:else}
						<div class="flex flex-col lg:flex-row w-full h-full">
							<div class="relative flex w-full flex-col justify-between bg-[#1973f0] p-8 lg:w-5/12 lg:p-12 overflow-hidden">
								<div class="relative z-10">
									<div  class="mb-6  h-12 w-12 flex items-center justify-center border-2 border-white bg-black text-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)]">
                                        <div use:spinAction>
                                            <RefreshCw size={24} />
                                        </div>
									</div>
									<h2 class="text-4xl font-bold leading-tight tracking-tight text-white mb-4 uppercase">Sync your<br/>life today.</h2>
									<p class="text-blue-100 font-medium text-lg max-w-xs">Join thousands who mastered time with 24FLOW.</p>
								</div>
								
								<div class="relative z-10 mt-12 hidden lg:block">
									<div class="flex items-center gap-3 mb-2">
										<div class="flex -space-x-3">
											<img src="https://i.pravatar.cc/100?img=11" alt="U1" class="h-10 w-10 rounded-full border-2 border-white" />
											<img src="https://i.pravatar.cc/100?img=12" alt="U2" class="h-10 w-10 rounded-full border-2 border-white" />
											<img src="https://i.pravatar.cc/100?img=13" alt="U3" class="h-10 w-10 rounded-full border-2 border-white" />
										</div>
										<span class="font-bold text-white text-sm">+2k Joined Today</span>
									</div>
								</div>
							</div>

							<div class="flex w-full flex-col justify-center bg-[#1a2432] p-8 lg:w-7/12 lg:p-12">
								<div class="mb-6">
									<h3 class="text-3xl font-bold text-white mb-2 uppercase">Create Account</h3>
									<p class="text-gray-400">Enter your details below to get started.</p>
								</div>

								<button type="button" class="group hover:cursor-pointer w-full flex items-center justify-center gap-3 bg-white border-2 border-white p-3.5 text-base font-bold text-[#101822] shadow-[4px_4px_0px_0px_#000000] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_#000000] transition-all mb-6">
									<svg class="h-5 w-5" viewBox="0 0 24 24">
										<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
										<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
										<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
										<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
									</svg>
									Sign up with Google
								</button>

								<div class="relative mb-6 text-center text-sm font-bold text-gray-500 after:absolute after:inset-0 after:top-1/2 after:z-0 after:h-[2px] after:w-full after:bg-[#334155]">
									<span class="relative z-10 bg-[#1a2432] px-2 uppercase tracking-widest text-gray-400">Or continue with</span>
								</div>

								<form class="flex flex-col gap-4">
									<div class="group">
										<label class="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-400 group-focus-within:text-[#1973f0]" for="fullname">Full Name</label>
										<div class="relative">
											<input id="fullname" class="w-full bg-[#111822] text-white border-2 border-[#334155] p-3.5 pl-4 focus:border-[#1973f0] focus:ring-0 focus:shadow-[4px_4px_0px_0px_#1973f0] transition-all" placeholder="Jane Doe" type="text" />
											<User size={18} class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
										</div>
									</div>

									<div class="group">
										<label class="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-400 group-focus-within:text-[#1973f0]" for="email">Email Address</label>
										<div class="relative">
											<input id="email" class="w-full bg-[#111822] text-white border-2 border-[#334155] p-3.5 pl-4 focus:border-[#1973f0] focus:ring-0 focus:shadow-[4px_4px_0px_0px_#1973f0] transition-all" placeholder="jane@24flow.io" type="email" />
											<Mail size={18} class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
										</div>
									</div>

									<div class="flex flex-col gap-4 md:flex-row">
										<div class="flex-1">
											<input class="w-full bg-[#111822] text-white border-2 border-[#334155] p-3.5 focus:border-[#1973f0] focus:ring-0 transition-all" placeholder="Password" type="password" />
										</div>
										<div class="flex-1">
											<input class="w-full bg-[#111822] text-white border-2 border-[#334155] p-3.5 focus:border-[#1973f0] focus:ring-0 transition-all" placeholder="Confirm" type="password" />
										</div>
									</div>

									<button onclick={notifyError} class="mt-3 hover:cursor-pointer w-full bg-[#1973f0] border-2 border-white p-4 font-bold uppercase tracking-wider text-white shadow-[4px_4px_0px_0px_#000000] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_#000000] transition-all flex items-center justify-center gap-2">
										Sign Up Now <ArrowRight size={20} />
									</button>
								</form>

								<div class="mt-8 text-center border-t-2 border-[#334155] pt-6">
									<p class="text-gray-400">
										Already have an account? 
										<button onclick={toggleMode} class="ml-1 font-bold text-white hover:text-[#1973f0] transition-colors underline decoration-2 underline-offset-4 hover:cursor-pointer decoration-[#1973f0]">Log In Here</button>
									</p>
								</div>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</main>

	<footer class="w-full py-6 text-center text-sm text-gray-600">
		<p>© 2025 24FLOW // SECURE CONNECTION v1.0.5</p>
	</footer>
</div>

<Toaster position="bottom-right" expand={false} richColors />


<style>
	.bg-grid-pattern {
		background-image: linear-gradient(to right, #1e293b 1px, transparent 1px),
						  linear-gradient(to bottom, #1e293b 1px, transparent 1px);
		background-size: 40px 40px;
	}

	:global(body) {
		margin: 0;
		background-color: #101822;
	}
</style>