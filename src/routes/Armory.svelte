<script>
	import { equipment1 } from '$lib/getstats';

	let equipment11,
		stick1 = 0,
		bat1 = 0,
        bat_nail1 = 0,
        katana1 = 0,
        shiv1 = 0,
        axe1 = 0;

	equipment1.subscribe((value) => {
		equipment11 = value;
		try {
			equipment11.forEach((item) => {
				if (item.id === 1) {
					stick1 = parseFloat(item.quantity);
				}

                if (item.id === 2) {
					bat1 = parseFloat(item.quantity);
				}

                if (item.id === 3) {
					bat_nail1 = parseFloat(item.quantity);
				}

                if (item.id === 4) {
					katana1 = parseFloat(item.quantity);

				}

                if (item.id === 5) {
                    shiv1 = parseFloat(item.quantity);
                }
                
                if (item.id === 6) {
					axe1 = parseFloat(item.quantity);
				}
			});
		} catch (error) {console.log(error.message)}
	});

</script>

<div class="container">
	<div class="inventory mymonke">
		<div class="item">
			<img src="/stick.png" alt="Stick" style="width:30px" /> <span>{stick1}</span>
		</div>
		<div class="item">
			<img src="/bat.png" alt="Bat" style="width:30px" /> <span>{bat1}</span>
		</div>
		<div class="item">
			<img src="/bat_nails.png" alt="Bat with Nails" style="width:30px" /> <span>{bat_nail1}</span>
		</div>
		<div class="item">
			<img src="/katana.png" alt="Katana" style="width:30px" /> <span>{katana1}</span>
		</div>
		<div class="item">
			<img src="/shiv.png" alt="Shiv" style="width:30px" /> <span>{shiv1}</span>
		</div>
		<div class="item"><img src="/axe.png" alt="Axe" style="width:30px" /> <span>{axe1}</span></div>
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

	@media (max-width: 1200px) {
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
