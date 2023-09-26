<script>
	import { wins1, losses1 } from '$lib/getstats';
	import { onMount, afterUpdate } from 'svelte';

	let wins11, losses11, kd11;

	wins1.subscribe((value) => {
		wins11 = value;
		updateKD1(); // Update KD1 when wins1 changes
	});

	losses1.subscribe((value) => {
		losses11 = value;
		updateKD1(); // Update KD1 when losses1 changes
	});

	function updateKD1() {
		if (losses11 > 0) {
			kd11 = Math.round(wins11 / losses11);
		} else {
			kd11 = 0;
		}
	}

	// Run the updateKD functions when the component mounts and after updates
	onMount(() => {
		updateKD1();
	});

	afterUpdate(() => {
		updateKD1();
	});
</script>
		<p>KD : {kd11}</p>

<style>
	p{
		margin: 0;
	}
</style>
