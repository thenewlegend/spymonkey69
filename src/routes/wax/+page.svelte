<script>
	import Main from './Main.svelte';
	import Inventory from './Inventory.svelte';
	import Spy from './Spy.svelte';
	import Monkey from './Monkey.svelte';
	import Armory from './Armory.svelte';
	import { notifyAction } from 'svelte-legos';

	let audio = null;
	let isPlaying = false;
	let selectedValue = '';

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

	function goToChain() {
		if (typeof window !== 'undefined') {
			// Get the current base URL
			const currentBaseUrl = window.location.origin;

			// Assuming you have a switch case for different values
			switch (selectedValue) {
				case '0':
					window.location.href = `${currentBaseUrl}/eos`;
					break;
				case '1':
					window.location.href = `${currentBaseUrl}/telos`;
					break;
				case '2':
					window.location.href = `${currentBaseUrl}/wax`;
					break;
				default:
				window.location.href = `${currentBaseUrl}`
					break;
			}
		}
	}
</script>


<audio bind:this={audio} src="banana.mp3" />
<button id="play" on:click={toggleAudio}>{isPlaying ? '⏸️' : '▶️'}</button>

<!-- <select bind:value={selectedValue} name="chain-select" id="chain">
	<option value='2'>WAX</option>
    <option on:click={goToChain} value='0' >EOS</option>
    <option on:click={goToChain} value='1'>TELOS</option>
	<option value='3'disabled >TELOS EVM</option>
    <option value='4'disabled>BSC</option>
</select> -->
  
<button id="chain" on:click={goToChain}>Return to HQ</button>

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

	#chain {
		position: relative;
		top: 0;
		left: 0;
		margin: 20px 0 0 20px ;
		color: #ffffff;
		font-size: medium;
		font-weight: 350;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		z-index: 1;
		outline: none;
		border: none;
		padding: 8px;
		border-radius: 1px;
		text-shadow: 0 1px 0 #ffffff;
		background-color: #000000;
		border: 2px solid #ffffff;
		cursor: pointer;
    	
	}

	#chain:hover {
		transition: border-color 1s ease-in;
		border: 2px solid #e5ae07;
	}



	/* MEDIA QUERIES */
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
