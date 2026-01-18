<script>
	import { LayoutGrid } from 'lucide-svelte';
</script>

<footer class="w-full border-t-2 border-border-dark bg-[#051020] py-10">
	<div
		class="mx-auto flex max-w-[1200px] flex-col items-center justify-center gap-6 px-6 md:flex-row md:justify-between"
	>
		<div class="flex items-center gap-2">
			<div
				class="flex h-8 w-8 items-center justify-center border-2 border-slate-600 bg-surface-dark"
			>
				<LayoutGrid size={18} class="text-slate-400" strokeWidth={2.5} />
			</div>
			<span class="text-sm font-bold font-monoton uppercase text-slate-500">24FLOW System</span>
		</div>

		<p class="text-sm font-medium font-monoton text-slate-600 font-body">© 2025 24FLOW</p>

		<div class="flex gap-6">
			<a
				class="text-slate-500 hover:text-white transition-colors"
				data-sveltekit-preload-data="false"
				href="/">Privacy</a
			>
			<a
				class="text-slate-500 hover:text-white transition-colors"
				data-sveltekit-preload-data="false"
				href="/">Terms</a
			>
			<a
				class="text-slate-500 hover:text-white transition-colors"
				data-sveltekit-preload-data="false"
				href="/">Support</a
			>
		</div>
	</div>
</footer>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Monoton&display=swap');
	.font-monoton {
		font-family: 'Monoton', sans-serif;
	}
</style>
