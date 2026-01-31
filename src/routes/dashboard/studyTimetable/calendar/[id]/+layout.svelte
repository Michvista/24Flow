<script>
	//initiate hoc here
	let { children } = $props();
	import favicon from '$lib/assets/favicon.svg';

	import '../../../../../app.css';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
