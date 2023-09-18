<script>
	import Top from './Top.svelte';
	import Kd from './Kd.svelte';
	import Inventory from './Inventory.svelte';
</script>

<div class="container">
	<Top />
	<Kd />
	<Inventory />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 110px;
	}
</style>
