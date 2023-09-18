<script>
	import Bottom from './Bottom.svelte';
	import Mid from './Mid.svelte';
	import Top from './Top.svelte';
</script>

<div class="container">
	<Top />
	<Mid />
	<Bottom />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 110px;
	}
</style>
