<style>
    @import url('https://fonts.googleapis.com/css2?family=Bungee+Spice&display=swap');
    
    .vertical-text {
        writing-mode: vertical-rl; /* Vertical text from right to left */
        transform: rotate(180deg); /* Rotates the text upright */
        white-space: nowrap; /* Prevents text from wrapping */
        width: 30px; /* Set a width for the vertical text div */
        color: aliceblue;
        font-size: 50px; /* Adjust the font size as needed */
        font-weight: bold; /* Make the text bold */
        font-family: 'Bungee Spice', cursive;
    }

    @media (max-width:1200px) {
        .vertical-text{
            writing-mode: horizontal-tb; /* Reset to horizontal text */
            transform: none; /* Reset the transform property */ 
            width: auto;
        }
    }
</style>

<div class="vertical-text">
    SPY
</div>