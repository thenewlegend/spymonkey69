<script>
	import Main from './Main.svelte';
	import Inventory from './Inventory.svelte';
	import Spy from './Spy.svelte';
	import Monkey from './Monkey.svelte';
	import Armory from './Armory.svelte';
	import { notifyAction } from 'svelte-legos';

	let audio = null;
	let isPlaying = false;

	function toggleAudio() {
		if (audio) {
			if (isPlaying) {
				audio.pause();
				isPlaying = false;
			} else {
				audio
					.play()
					.then(() => {
						const volumeUp = document.getElementById('playing');
						volumeUp.click();
						isPlaying = true;
					})
					.catch((error) => {
						console.error('Audio playback error:', error);
					});
			}
		}
	}
</script>

<audio bind:this={audio} src="banana.mp3" />
<button id="play" on:click={toggleAudio}>{isPlaying ? '⏸️' : '▶️'}</button>

<button
	id="playing"
	class="notifications"
	use:notifyAction={{
		title: '🐵 ❤️🍌',
		description: 'Turn up the volume',
		type: 'success',
		duration: 5000
	}}
	style="display: none;"
/>

<div class="container">
	<div class="spy">
		<Spy />
	</div>

	<div class="main-items">
		<img id="main-logo" src="/spymonke.png" alt="" />
		<Main />

		<div class="split">
			<Armory />
			<Inventory />
		</div>
	</div>

	<div class="monkey">
		<Monkey />
	</div>
</div>

<style>
	.split {
		display: flex;
		align-items: flex-start;
		justify-content: space-around;
	}

	.container {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.spy,
	.monkey {
		flex: 0 0 auto;
		margin: 0 8rem;
	}

	.main-items {
		flex: 1; /* Allow the center content to grow and take available space */
	}

	.main-items {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	#main-logo {
		width: 25%;
	}

	#play {
		position: fixed;
		top: 0;
		left: 0;
		margin-top: 10px;
		font-size: medium;
		margin-left: 10px;
		background-color: transparent;
		border: none;
		z-index: 1;
		outline: none;
	}

	@media (max-width: 1200px) {
		#main-logo {
			width: 35%;
		}

		.container {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

		.spy,
		.monkey {
			flex: 0 0 auto;
			margin: 0 8rem;
		}

		.main-items {
			flex: 1; /* Allow the center content to grow and take available space */
		}

		.split {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: flex-start;
		}
	}
</style>
