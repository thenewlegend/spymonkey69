<script>
	import Main from './Main.svelte';
	import Inventory from './Inventory.svelte';
	import Spy from './Spy.svelte'
	import Monkey from './Monkey.svelte';
</script>

<div class="container">
	<div class="spy">
		<Spy/>
	</div>

	<div class="main-items">
		<img id="main-logo" src="/spymonke.png" alt="">
		<Main />
		<Inventory />
	</div>

	<div class="monkey">
		<Monkey />
	</div>
</div>

<style>
	.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
	}

	.spy, .monkey {
		flex: 0 0 auto; 
		margin:0 8rem;
	}

	.main-items {
		flex: 1; /* Allow the center content to grow and take available space */
	}

	.main-items {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 50px;
	}

	#main-logo{
		width:25%;
	}

	@media (max-width:1200px) {
		#main-logo{
		width:35%;
	}

	.container {
    display: flex;
	flex-direction: column;
    justify-content: space-between;
    align-items: center;
	}

	.spy, .monkey {
		flex: 0 0 auto; 
		margin:0 8rem;
	}

	.main-items {
		flex: 1; /* Allow the center content to grow and take available space */
	}
}
</style>
	