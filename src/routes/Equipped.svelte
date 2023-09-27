<script>
	import { equipped1,stick_visible,bat_visible,nails_visible,katana_visible,shiv_visible,axe_visible } from '$lib/getstats';

	let equipped11,
		stick1 = 0,
		bat1 = 0,
        bat_nail1 = 0,
        katana1 = 0,
        shiv1 = 0,
        axe1 = 0,
		visible1 = '',
		visible2 = '',
		visible3 = '',
		visible4 = '',
		visible5  = '',
		visible6 = '';


		stick_visible.subscribe((value) => {
		visible1 = value;
	});

	bat_visible.subscribe((value) => {
		visible2 = value;
	});

	nails_visible.subscribe((value) => {
		visible3 = value;
	});

	katana_visible.subscribe((value) => {
		visible4 = value;
	});

	shiv_visible.subscribe((value) => {
		visible5 = value;
	});

	axe_visible.subscribe((value) => {
		visible6 = value;
	});

	equipped1.subscribe((value) => {
		equipped11 = value;
		try {
			equipped11.forEach((item) => {
				if (item.id === 1) {
					stick1 = parseFloat(item.lifespan);
					if(stick1>0){
						visible1 = 'visible';
					}
				}

                if (item.id === 2) {
					bat1 = parseFloat(item.lifespan);
					if(bat1>0){
						visible2 = 'visible';
					}
				}

                if (item.id === 3) {
					bat_nail1 = parseFloat(item.lifespan);
					if(bat_nail1>0){
						visible3 = 'visible';
					}
				}

                if (item.id === 4) {
					katana1 = parseFloat(item.lifespan);
					if(katana1>0){
						visible4 = 'visible';
					}

				}

                if (item.id === 5) {
                    shiv1 = parseFloat(item.lifespan);
					if(shiv1>0){
						visible5 = 'visible';
					}
                }
                
                if (item.id === 6) {
					axe1 = parseFloat(item.lifespan);
					if(axe1>0){
						visible = 'visible';
					}
				}
			});
		} catch (error) {console.log(error.message)}
	});

</script>

<div class="container">
	<div class="inventory mymonke">
		
		<!-- PLACEHOLDERS -->
		<div id="placeholder{visible1}{visible2}{visible3}{visible4}{visible5}{visible6}" class="item flag" >
			<img src="/placeholder.jpg" alt="placeholder" style="width:30px" /> <p></p>
		</div>

		<div id="placeholder{visible1}{visible2}{visible3}{visible4}{visible5}{visible6}" class="item flag" >
			<img src="/placeholder.jpg" alt="placeholder" style="width:30px" /> <p></p>
		</div>
		
		<!-- EQUIPPED -->
		<div class="item {visible1}">
			<img src="/stick.png" alt="Stick" style="width:30px" /> <p>{stick1}</p>
		</div>
		<div class="item {visible2}">
			<img src="/bat.png" alt="Bat" style="width:30px" /> <p>{bat1}</p>
		</div>
		<div class="item {visible3}">
			<img src="/bat_nails.png" alt="Bat with Nails" style="width:30px" /> <p>{bat_nail1}</p>
		</div>
		<div class="item {visible4}">
			<img src="/katana.png" alt="Katana" style="width:30px" /> <p>{katana1}</p>
		</div>
		<div class="item {visible5}">
			<img class="" src="/shiv.png" alt="Shiv" style="width:30px" /> <p>{shiv1}</p>
		</div>
		<div class="item {visible6}"><img src="/axe.png" alt="Axe" style="width:30px" /> <p>{axe1}</p></div>
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
		display: none;
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

	.visible{
		display:block;
	}

	#placeholder{
		display:block;
		}
	
	.flag{
		display: none;
	}
</style>
