<script>
    import { loadingAction } from "svelte-legos";
    import { notifyAction } from 'svelte-legos';

    let selectedValue = '69';
    let loading = false;

    function goToChain() {

        // Get the current base URL
        const currentBaseUrl = window.location.origin;

        // Assuming you have a switch case for different values
        switch (selectedValue) {
            case '0':
                loading = true;
                window.location.href = `${currentBaseUrl}/eos`;
                break;
            case '1':
                loading = true;
                window.location.href = `${currentBaseUrl}/telos`;
                break;
            case '2':
                loading = true;
                window.location.href = `${currentBaseUrl}/wax`;
                break;
            default:
                    const NC = document.getElementById('no-chain');
					NC.click();
                break;
        }
    }

</script>

<select bind:value={selectedValue} name="chain-select" id="chain">
    <option value='69'hidden >-- Select a chain --</option>
    <option value='0'>EOS</option>
    <option value='1'>TELOS</option>
    <option value='2'>WAX</option>
    <option value='3'disabled >TELOS EVM</option>
    <option value='4'disabled>BSC</option>
</select>

<button on:click={goToChain} use:loadingAction={loading} >Deploy Spy</button>
<button
	id="no-chain"
	class="notifications"
	use:notifyAction={{
		title: 'Are you a Monke or a DUMBe ?',
		description: 'Select a chain stuped',
        type: 'error',
        duration: 5000
	}}
	style="display: none;"
/>

<style>

#chain, button, option {
        height: 3em;
        width: 15em;
        margin: 15px;
        padding:10px;
        text-align: center;
		color: #ffffff;
		font-size: medium;
		font-weight: 350;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		z-index: 1;
		outline: none;
		border: none;
		border-radius: 1px;
		text-shadow: 0 1px 0 #ffffff;
		background-color: #000000;
		border: 2px solid #ffffff;
        cursor: pointer;
    	
	}

	#chain:hover {
		transition: border-color 1s ease-in;
		border: 2px solid #e5ae07;
        cursor: pointer;
	}

    #chain option {
    cursor: pointer;    
    }

    button{
        color: rgb(198, 160, 7);
        text-shadow: none;
        font-weight: 550;
    }


	@media (max-width: 1200px) {

	}
</style>