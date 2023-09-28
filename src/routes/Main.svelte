<script>
	import { onMount } from 'svelte';
	import { notifyAction } from 'svelte-legos';
	import Kd from './Kd.svelte';

	import {
		fetchMonkeyDetails,
		fetchBananasBalance,
		fetchInventoryAssets,
		monkey1,
		banana1,
		stash1,
		status1,
		fight1,
		banana_peels1,
		wins1,
		losses1,
		total_fights1,
		losing_streak1,
		xp1,
		inventory1,
		equipment1,
		equipped1,
		fetchEquipmentAssets
	} from '$lib/getstats';

	// For store 1
	let monkey11,
		monkeName1 = '',
		banana11,
		stash11,
		status11,
		fight11,
		banana_peels11,
		wins11,
		losses11,
		total_fights11,
		losing_streak11,
		xp11;

	// Assign values from stores to the variables

	monkey1.subscribe((value) => {
		monkey11 = value;
	});

	banana1.subscribe((value) => {
		banana11 = value;
	});
	stash1.subscribe((value) => {
		stash11 = value;
	});
	status1.subscribe((value) => {
		status11 = value;
	});
	fight1.subscribe((value) => {
		fight11 = value;
	});
	monkey1.subscribe((value) => {
		monkey11 = value;
	});
	banana_peels1.subscribe((value) => {
		banana_peels11 = value;
	});
	wins1.subscribe((value) => {
		wins11 = value;
	});
	losses1.subscribe((value) => {
		losses11 = value;
	});
	total_fights1.subscribe((value) => {
		total_fights11 = value;
	});
	losing_streak1.subscribe((value) => {
		losing_streak11 = value;
	});
	xp1.subscribe((value) => {
		xp11 = value;
	});

	//Getting myMonke from LocalStorage
	onMount(() => {
		if (typeof window !== 'undefined') {
			const storedValue = localStorage.getItem('myMonke');
			if (storedValue) {
				monkeName1 = storedValue;
			}
		}
	});

	// Function to display data with the loaded parameters
	async function displayData() {
		clearData();
		//Notify Element
		const monke1Notify = document.getElementById('monke1');
		const noEOSNotify = document.getElementById('noEOS');
		const unknownNotify = document.getElementById('unknown');
		const emptyNotify = document.getElementById('empty');
		const FetchedNotify = document.getElementById('fetched');
		const MyMonke = document.getElementById('myMonke');

		//Stripping spaces
		const myMonkeFormatted = monkeName1.replace(/\s/g, '');
		MyMonke.value = myMonkeFormatted;

		//Check if fields are empty
		if (myMonkeFormatted !== '') {
			try {
				//Monkey1 -  Monke
				const monke1 = await fetchMonkeyDetails(myMonkeFormatted);
				const Stash1 = await fetchBananasBalance(myMonkeFormatted);
				banana1.set(monke1.bananas);
				stash1.set(Stash1 + ' BANANA');
				if (monke1.status !== '') {
					status1.set(monke1.status);
				}

				monkey1.set(monke1.monkey);
				banana1.set(monke1.bananas);
				banana_peels1.set(monke1.banana_peels);
				status1.set(monke1.status);
				wins1.set(monke1.wins);
				losses1.set(monke1.losses);
				total_fights1.set(monke1.total_fights);
				losing_streak1.set(monke1.losing_streak);
				xp1.set(monke1.xp);
				equipped1.set(monke1.equip_used);

				if (monke1.losing_streak !== 0) {
					fight1.set('NOT FIGHTING');
				} else {
					fight1.set('FIGHTING');
				}

				//Set Inventory to Store
				const inventoryItem1 = await fetchInventoryAssets(myMonkeFormatted);
				const equipmentItem1 = await fetchEquipmentAssets(myMonkeFormatted);
				inventory1.set(inventoryItem1);
				equipment1.set(equipmentItem1);
				localStorage.setItem('myMonke', myMonkeFormatted);

				FetchedNotify.click();
			} catch (error) {
				if (error.message.includes('monke1')) {
					monke1Notify.click();
					console.error('Error related to  Monke');
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
		try {
			monkey1.set('-----');
			fight1.set('💤');
			banana1.set('0.0000 BANANA');
			stash1.set('0.0000 BANANA');
			status1.set('🙊');
			wins1.set(0);
			losses1.set(0);
			total_fights1.set(0);
			losing_streak1.set(0);
			xp1.set(0);
			inventory1.set([]);
			const nullArmoryData = [
				{ id: 1, quantity: '0.00 EQP', crafting_details: { first: ' ', value: '0.00 EQP' } },
				{ id: 2, quantity: '0.00 EQP', crafting_details: { first: ' ', value: '0.00 EQP' } },
				{ id: 3, quantity: '0.00 EQP', crafting_details: { first: ' ', value: '0.00 EQP' } },
				{ id: 4, quantity: '0.00 EQP', crafting_details: { first: ' ', value: '0.00 EQP' } },
				{ id: 5, quantity: '0.00 EQP', crafting_details: { first: ' ', value: '0.00 EQP' } },
				{ id: 6, quantity: '0.00 EQP', crafting_details: { first: ' ', value: '0.00 EQP' } }
			];
			const nullEquippedData = [
				{ id: 1, lifespan: '0 EQP' },
				{ id: 2, lifespan: '0 EQP' },
				{ id: 3, lifespan: '0 EQP' },
				{ id: 4, lifespan: '0 EQP' },
				{ id: 5, lifespan: '0 EQP' },
				{ id: 6, lifespan: '0 EQP' }
			];
			equipment1.set(nullArmoryData);
			equipped1.set(nullEquippedData);
		} catch (error) {
			console.error('An error occurred while clearing data: ', error.message);
		}
	}

	function selectAllText() {
		const input = document.getElementById('myMonke');
		input.select();
	}
</script>

<div class="top">
	<div class="top-item top-left">
		<div class="input-container">
			<div class="input">
				<label for="myMonke" class="input-label">Monke</label>
				<input
					id="myMonke"
					on:focus={selectAllText}
					class="input-field"
					type="text"
					bind:value={monkeName1}
					required
				/><br />
			</div>

			<div class="buttons top-b">
				<button on:click={displayData}>SPY</button>
			</div>
		</div>

		<div class="span-container" style="overflow-wrap: break-word;">
			<span>{monkey11}</span><br />
			<span>{status11}</span><br />
			<span>{banana11} in game</span><br />
			<span>{stash11} in account</span><br />
			<span style="font-family: monospace; font-size:12px">{fight11}</span><br />
		</div>

		<Kd />
	</div>
</div>

<div class="notifications">
	<button
		id="monke1"
		class="notifications"
		use:notifyAction={{
			title: ' Monke name is wrong',
			description: 'Double check the name dummy.',
			type: 'error',
			duration: 3000
		}}
	/>

	<button
		id="monke2"
		class="notifications"
		use:notifyAction={{
			title: 'Opponent Monke name is wrong',
			description: 'Double check the name dummy.',
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
			description: 'Enter something will ya !',
			type: 'error',
			duration: 3000
		}}
	/>

	<button
		id="rektUrself"
		class="notifications"
		use:notifyAction={{
			title: 'Call 911',
			description: 'Trying to REKT self ser?',
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
		margin: 0 10px;
		transition: transform 0.3s ease; /* Add a smooth transition */
		max-width: calc(50% - 20px); /* Limit each item to half of the container's width */
		box-sizing: border-box; /* Include padding and border in the max-width calculation */
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

	.buttons {
		margin: 0.3rem;
	}

	/* Button hover effect */
	button {
		background-color: #ffeb09;
	}

	button:hover {
		background-color: #cdbd06;
	}

	/* Input styles */
	.input-field {
		max-width: 100%; /* Make input fields take up full width on smaller screens */
		padding: 10px;
		margin-bottom: 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
		font-size: 14px;
	}

	.top-b {
		display: flex;
		gap: 10px;
		justify-content: center;
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
		background-color: #fff; /* Match the background color of  container */
		padding: 0 5px; /* Add some padding for better styling */
		border-radius: 50%;
		font-family: monospace;
	}

	@media (max-width: 1200px) {
		/* Media query for responsiveness on smaller screens */
		.top {
			flex-direction: column; /* Stack items vertically on smaller screens */
		}

		.top-left {
			max-width: 300px;
			justify-content: center;
			align-items: center;
			width: 80%;
			margin-top: 20px;
			flex-wrap: wrap;
		}

		.span-container {
			max-width: 300px;
		}
	}
</style>
