<script>
	import { wins2, losses2, wins1, losses1 } from '$lib/getstats';
	import { onMount, afterUpdate } from 'svelte';

	let wins11, wins22, losses11, losses22, kd11, kd22;

	wins1.subscribe((value) => {
		wins11 = value;
		updateKD1(); // Update KD1 when wins1 changes
	});

	losses1.subscribe((value) => {
		losses11 = value;
		updateKD1(); // Update KD1 when losses1 changes
	});

	wins2.subscribe((value) => {
		wins22 = value;
		updateKD2(); // Update KD2 when wins2 changes
	});

	losses2.subscribe((value) => {
		losses22 = value;
		updateKD2(); // Update KD2 when losses2 changes
	});

	function updateKD1() {
		if (losses11 > 0) {
			kd11 = Math.round(wins11 / losses11);
		} else {
			kd11 = 0;
		}
	}

	function updateKD2() {
		if (losses22 > 0) {
			kd22 = Math.round(wins22 / losses22);
		} else {
			kd22 = 0;
		}
	}

	// Run the updateKD functions when the component mounts and after updates
	onMount(() => {
		updateKD1();
		updateKD2();
	});

	afterUpdate(() => {
		updateKD1();
		updateKD2();
	});
</script>

<div class="container">
	<div class="kd-box">
		<p>Your KD</p>
		<h2>{kd11}</h2>
	</div>
	<div class="kd-box">
		<p>Opponent KD</p>
		<h2>{kd22}</h2>
	</div>
</div>

<style>
	/* Add your CSS styles here for modern styling and responsiveness */
	.container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.kd-box {
		background-color: #f0f0f0;
		padding: 20px;
		border-radius: 8px;
		margin: 10px;
		text-align: center;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		width: 150px;
	}

	@media (max-width: 768px) {
		/* Media query for responsiveness */
		.container {
			flex-direction: column;
			align-items: center;
		}
	}
</style>
