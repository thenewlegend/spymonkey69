<script>
	 
	import Spy from './Spy.svelte';
	import Monkey from './Monkey.svelte';
    import Chain from './Chain.svelte';
	import { notifyAction } from 'svelte-legos';
	import { onMount } from 'svelte';

	let audio = null;
	let isPlaying = false;

	function confirmBeforeUnload() {
    return "Are you sure you want to leave? Your changes may not be saved.";
  }

  onMount(() => {
    window.addEventListener('beforeunload', confirmBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', confirmBeforeUnload);
    };
  });

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
		<Chain />
	</div>

	<div class="monkey">
		<Monkey />
	</div>
</div>

<style>

	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 10%;
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
		justify-content: center;
	}

	#main-logo {
		width: 25%;
		margin-bottom: 30px;
	}

	#play {
		position: fixed;
		top: 0;
		right: 0;
		font-size: medium;
		margin: 20px 20px 0 0;
		font-size: medium;
		margin-left: 10px;
		background-color: transparent;
		border: none;
		z-index: 1;
		outline: none;
	}

	/* MEDIA QUERIES */
	@media (max-width: 1200px) {
		#main-logo {
			width: 35%;
			margin-bottom: 15px;
		}

		.container {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-top: 15%;
		}

		.spy,
		.monkey {
			flex: 0 0 auto;
			margin: 0 8rem;
		}

		.main-items {
			flex: 1; /* Allow the center content to grow and take available space */
		}
	}
</style>
