<script>
	import Main from './Main.svelte';
	import Inventory from './Inventory.svelte';
	import Spy from './Spy.svelte'
	import Monkey from './Monkey.svelte';
	import Armory from './Armory.svelte';
	import Equipped from './Equipped.svelte';

	let audio = null;
  let isPlaying = false;

  function toggleAudio() {
    if (audio) {
      if (isPlaying) {
        audio.pause();
        isPlaying = false;
      } else {
        audio.play()
          .then(() => {
            isPlaying = true;
          })
          .catch((error) => {
            console.error('Audio playback error:', error);
          });
      }
    }
  }

</script>

<audio bind:this={audio} src="banana.mp3"></audio>
<button style="background-color:transparent; border: none; outline: none; background: none; loop" on:click={toggleAudio}>{isPlaying ? "⏸️" : "▶️"}</button>



<div class="container">
	<div class="spy">
		<Spy/>
	</div>

	<div class="main-items">
		<img id="main-logo" src="/spymonke.png" alt="">
		<Main />
		
		<div class="sec" style="display: flex; align-items:center; justify-content:center" >
			<Armory />
			<Inventory />
			<Equipped />
		</div>
		
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
    justify-content: center;
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
	