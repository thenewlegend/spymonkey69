<script>
	import { inventory1, inventory2 } from '$lib/getstats';

	let inventory11,
		inventory22,
		wood1 = 0,
		wood2 = 0,
		rock1 = 0,
		rock2 = 0,
		water1 = 0,
		water2 = 0,
		mushroom1 = 0,
		mushroom2 = 0,
		fire1 = 0,
		fire2 = 0,
		fig1 = 0,
		fig2 = 0,
		pill1 = 0,
		pill2 = 0;

	inventory1.subscribe((value) => {
		inventory11 = value;
		try {
			inventory11.forEach((item) => {
				if (item.asset_id === 2) {
					wood1 = parseInt(item.quantity);
				}

				if (item.asset_id === 3) {
					rock1 = parseInt(item.quantity);
				}

				if (item.asset_id === 4) {
					water1 = parseInt(item.quantity);
				}

				if (item.asset_id === 5) {
					mushroom1 = parseInt(item.quantity);
				}

				if (item.asset_id === 6) {
					fire1 = parseInt(item.quantity);
				}

				if (item.asset_id === 7) {
					fig1 = parseInt(item.quantity);
				}

				if (item.asset_id === 8) {
					pill1 = parseInt(item.quantity);
				}
			});
		} catch (error) {}
	});

	inventory2.subscribe((value) => {
		inventory22 = value;
		try {
			inventory22.forEach((item) => {
				if (item.asset_id === 2) {
					wood2 = parseInt(item.quantity);
				}

				if (item.asset_id === 3) {
					rock2 = parseInt(item.quantity);
				}

				if (item.asset_id === 4) {
					water2 = parseInt(item.quantity);
				}

				if (item.asset_id === 5) {
					mushroom2 = parseInt(item.quantity);
				}

				if (item.asset_id === 6) {
					fire2 = parseInt(item.quantity);
				}

				if (item.asset_id === 7) {
					fig2 = parseInt(item.quantity);
				}

				if (item.asset_id === 8) {
					pill2 = parseInt(item.quantity);
				}
			});
		} catch (error) {}
	});
</script>

<div class="container">
	<div class="inventory mymonke">
		<div class="item">
			<img src="/wood.png" alt="Wood" style="width:30px" /> <span>{wood1}</span>
		</div>
		<div class="item">
			<img src="/rock.png" alt="rock" style="width:30px" /> <span>{rock1}</span>
		</div>
		<div class="item">
			<img src="/water.png" alt="water" style="width:30px" /> <span>{water1}</span>
		</div>
		<div class="item">
			<img src="/mushroom.png" alt="mushroom" style="width:30px" /> <span>{mushroom1}</span>
		</div>
		<div class="item">
			<img src="/fire.png" alt="fire" style="width:30px" /> <span>{fire1}</span>
		</div>
		<div class="item"><img src="/fig.png" alt="fig" style="width:30px" /> <span>{fig1}</span></div>
		<div class="item">
			<img src="/pill.png" alt="pill" style="width:30px" /> <span>{pill1}</span>
		</div>
	</div>

	<div class="inventory opmonke">
		<div class="item">
			<img src="/wood.png" alt="Wood" style="width:30px" /> <span>{wood2}</span>
		</div>
		<div class="item">
			<img src="/rock.png" alt="rock" style="width:30px" /> <span>{rock2}</span>
		</div>
		<div class="item">
			<img src="/water.png" alt="water" style="width:30px" /> <span>{water2}</span>
		</div>
		<div class="item">
			<img src="/mushroom.png" alt="mushroom" style="width:30px" /> <span>{mushroom2}</span>
		</div>
		<div class="item">
			<img src="/fire.png" alt="fire" style="width:30px" /> <span>{fire2}</span>
		</div>
		<div class="item"><img src="/fig.png" alt="fig" style="width:30px" /> <span>{fig2}</span></div>
		<div class="item">
			<img src="/pill.png" alt="pill" style="width:30px" /> <span>{pill2}</span>
		</div>
	</div>
</div>

<style>
	.container {
		display: flex;
		width: max-content;
	}

	.inventory {
		background-color: #f0f0f0;
		display: flex;
		padding: 20px;
		border-radius: 8px;
		margin: 20px;
		text-align: center;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.item {
		display: flex;
		flex-direction: column;
		margin: 10px;
	}

	@media (max-width: 768px) {
		/* Media query for responsiveness */

		.container {
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}

		.inventory {
			margin: 10px; /* Adjust margin for smaller screens */
			flex-wrap: wrap;
		}
	}
</style>
