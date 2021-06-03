<script>
	import { onMount } from 'svelte';

	export let time = 30000;
	export let interval = 1000;
	export let onEnd = () => console.log('Acabou');

	onMount(() => {
		const timer = setInterval(() => {
			time -= interval;
		}, interval);
		return () => clearInterval(timer);
	});

	$: {
		if (time < 0) {
			onEnd();
		}
	}
</script>

<div>Time: {time / 1000}s</div>
