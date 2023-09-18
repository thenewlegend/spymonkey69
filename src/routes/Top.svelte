<script>
	import { onMount } from 'svelte';
	import { notifyAction } from 'svelte-legos';

	import {
		fetchMonkeyDetails,
		fetchBananasBalance,
		fetchInventoryAssets,
		banana1,
		banana2,
		stash1,
		stash2,
		status1,
		status2,
		fight1,
		fight2
	} from '$lib/getstats';
	let monkeName1 = '',
		monkeName2 = '',
		banana11,
		banana22,
		stash11,
		stash22,
		fight11,
		fight22,
		status11,
		status22;

	//Getting myMonke from LocalStorage
	onMount(() => {
		if (typeof window !== 'undefined') {
			const storedValue = localStorage.getItem('myMonke');
			if (storedValue) {
				monkeName1 = storedValue;
			}
		}
	});

	banana1.subscribe((value) => {
		banana11 = value;
	});
	banana2.subscribe((value) => {
		banana22 = value;
	});
	stash1.subscribe((value) => {
		stash11 = value;
	});
	stash2.subscribe((value) => {
		stash22 = value;
	});
	status1.subscribe((value) => {
		status11 = value;
	});
	status2.subscribe((value) => {
		status22 = value;
	});
	fight1.subscribe((value) => {
		fight11 = value;
	});
	fight2.subscribe((value) => {
		fight22 = value;
	});

	// Function to display data with the loaded parameters
	async function displayData() {
		clearData();
		//Notify Element
		const monke1Notify = document.getElementById('monke1');
		const monke2Notify = document.getElementById('monke2');
		const noEOSNotify = document.getElementById('noEOS');
		const unknownNotify = document.getElementById('unknown');
		const emptyNotify = document.getElementById('empty');
		const FetchedNotify = document.getElementById('fetched');
		const MyMonke = document.getElementById('myMonke');
		const OpMonke = document.getElementById('opMonke');
		const RektUrself = document.getElementById('rektUrself');

		//Stripping spaces
		const myMonkeFormatted = monkeName1.replace(/\s/g, '');
		const opMonkeFormatted = monkeName2.replace(/\s/g, '');
		MyMonke.value = myMonkeFormatted;
		OpMonke.value = opMonkeFormatted;

		//Check if fields are empty
		if (myMonkeFormatted !== '' && opMonkeFormatted !== '') {
			try {
				//Monkey1 - Your Monke
				const monke1 = await fetchMonkeyDetails(myMonkeFormatted);
				const Stash1 = await fetchBananasBalance(myMonkeFormatted);
				banana1.set(monke1.bananas);
				stash1.set(Stash1 + ' BANANA');
				if (monke1.status !== '') {
					status1.set(monke1.status);
				}
				if (monke1.losing_streak !== 0) {
					fight1.set('NOT FIGHTING');
				} else {
					fight1.set('FIGHTING');
				}
				console.log(fetchInventoryAssets(myMonkeFormatted));

				localStorage.setItem('myMonke', myMonkeFormatted);

				//Monkey2 - Opponent Monke
				const monke2 = await fetchMonkeyDetails(opMonkeFormatted);
				const Stash2 = await fetchBananasBalance(opMonkeFormatted);
				banana2.set(monke2.bananas);
				stash2.set(Stash2 + ' BANANA');
				if (monke2.status !== '') {
					status2.set(monke2.status);
				}
				if (monke2.losing_streak !== 0) {
					fight2.set('NOT FIGHTING');
				} else {
					fight2.set('FIGHTING');
				}
				console.log(fetchInventoryAssets(opMonkeFormatted));

				//Your Monke = Opponent Monke
				if (myMonkeFormatted === opMonkeFormatted) {
					RektUrself.click();
				} else {
					FetchedNotify.click();
				}
			} catch (error) {
				if (error.message.includes('monke2')) {
					monke2Notify.click();
					console.error('Error related to Opponent monke name');
					console.error(error.message);
				} else if (error.message.includes('monke1')) {
					monke1Notify.click();
					console.error('Error related to Your monke name');
					console.error(error.message);
				} else if (error.message.includes('Invalid name')) {
					noEOSNotify.click();
					console.error('Error related to EOS Name');
					console.error(error.message);
				} else {
					unknownNotify.click();
					console.error(error.message);
				}
			}
		} else {
			emptyNotify.click();
			console.error('Enter Valid Monkes');
		}
	}

	function clearData() {
		banana2.set('0.0000 BANANA');
		stash2.set('0.0000 BANANA');
		status2.set('🙊');
		fight1.set('💤');
		banana1.set('0.0000 BANANA');
		stash1.set('0.0000 BANANA');
		status1.set('🙊');
		fight2.set('💤');
	}

	function clearAllData() {
		clearData();
		monkeName2 = '';
		console.log('Cleared All Data');
	}
</script>

<div class="top">
	<div class="top-item top-left">
		<div class="input-container">
			<label for="myMonke" class="input-label">Your Monke</label>
			<input id="myMonke" class="input-field" type="text" bind:value={monkeName1} required /><br />
		</div>
		<span>{status11}</span><br />
		<span>{banana11} in game</span><br />
		<span>{stash11} in account</span><br />
		<span style="font-family: monospace; font-size:12px">{fight11}</span><br />
	</div>

	<div class="buttons top-b">
		<button on:click={displayData}>SPY</button>
		<button on:click={clearAllData}>CLEAR</button>
	</div>

	<div class="top-item top-right">
		<div class="input-container">
			<label for="opMonke" class="input-label">Opponent Monke</label>
			<input id="opMonke" class="input-field" bind:value={monkeName2} type="text" required /><br />
		</div>

		<span>{status22}</span><br />
		<span>{banana22} in game</span><br />
		<span>{stash22} in account</span><br />
		<span style="font-family: monospace; font-size:12px">{fight22}</span><br />
	</div>
</div>

<div class="notifications">
	<button
		id="monke1"
		class="notifications"
		use:notifyAction={{
			title: 'Your Monke name is wrong',
			description: 'Double check dummy.',
			type: 'error',
			duration: 3000
		}}
	/>

	<button
		id="monke2"
		class="notifications"
		use:notifyAction={{
			title: 'Wrong Opponent Monke name',
			description: 'Double check dummy.',
			type: 'error',
			duration: 3000
		}}
	/>

	<button
		id="noEOS"
		class="notifications"
		use:notifyAction={{
			title: 'Invalid Monke',
			description: 'Not even a real Monke name. Jeez !',
			type: 'error',
			duration: 3000
		}}
	/>

	<button
		id="unknown"
		class="notifications"
		use:notifyAction={{
			title: 'Probably Name Error',
			description: 'Check monke names again ser !',
			type: 'error',
			duration: 3000
		}}
	/>

	<button
		id="fetched"
		class="notifications"
		use:notifyAction={{
			title: 'Data Acquired',
			description: 'You are welcome.',
			type: 'success',
			duration: 3000
		}}
	/>

	<button
		id="empty"
		class="notifications"
		use:notifyAction={{
			title: 'Empty Fields, Really ?',
			description: 'Enter something you piece of shit !',
			type: 'error',
			duration: 3000
		}}
	/>

	<button
		id="rektUrself"
		class="notifications"
		use:notifyAction={{
			title: 'Call 911',
			description: 'Trying to REKT yourself ser?',
			type: 'warning',
			duration: 3000
		}}
	/>
</div>

<style>
	.top {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 80%;
		margin-top: 20px;
	}

	/* Item styles */
	.top-item {
		background-color: #fff;
		padding: 20px;
		border-radius: 5px;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
		flex: 1;
		margin: 0 10px;
		transition: transform 0.3s ease; /* Add a smooth transition */
	}

	/* Button style */
	button {
		padding: 10px 20px;
		background-color: #f5f5f4;
		color: #000000;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		transition: background-color 0.3s ease; /* Add a smooth transition */
	}

	/* Button hover effect */
	button:hover {
		background-color: #ffeb09;
	}

	/* Input styles */
	.input-field {
		max-width: 60%;
		padding: 10px;
		margin-bottom: 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
		font-size: 14px;
	}

	.top-b {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.buttons button:nth-child(2) {
		background-color: #aeaeae;
	}

	.buttons button:nth-child(2):hover {
		background-color: #797979;
	}

	.notifications {
		display: none;
	}

	.input-container {
		position: relative;
		width: 200px; /* Adjust the width as needed */
	}

	.input-label {
		position: absolute;
		top: -6.5px; /* Adjust the spacing between the label and the input field */
		left: 10px;
		font-size: 11px;
		background-color: #fff; /* Match the background color of your container */
		padding: 0 5px; /* Add some padding for better styling */
		border-radius: 50%;
		font-family: monospace;
	}
</style>
