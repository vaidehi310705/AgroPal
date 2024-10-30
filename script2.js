let progress = 0;

// Event listener for crop plan calculator
document.getElementById('calculate-plan').addEventListener('click', () => {
    const cropType = document.getElementById('crop-type').value;
    const weather = document.getElementById('weather').value;
    const soil = document.getElementById('soil').value;
    const fertilizer = document.getElementById('fertilizer').value;

    const recommendations = {
        tomatoes: "Tomatoes require well-drained soil and full sun. Use NPK fertilizer.",
        potatoes: "Potatoes thrive in sandy loamy soil with moderate moisture. Use compost.",
        corn: "Corn needs nitrogen-rich soil and plenty of water. Fertilize with nitrogen.",
        lettuce: "Lettuce grows best in cool weather and moist soil. Use organic compost.",
        beans: "Beans fix their nitrogen. Ensure well-drained soil and moderate watering."
    };

    const output = recommendations[cropType] || "No recommendations available.";
    document.getElementById('plan-output').innerText = `Recommendations for ${cropType}: ${output}`;
});

// Event listener for increasing crop growth progress
document.getElementById('increase-progress').addEventListener('click', () => {
    if (progress < 100) {
        progress += 10; // Increase progress by 10%
        updateProgressBar();
    }
});

function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    progressBar.style.width = progress + '%'; // Update the width of the progress bar
    progressText.innerText = progress + '%'; // Update the progress text
}

// Event listener for buying and selling fertilizers
document.getElementById('buy-fertilizer').addEventListener('click', () => {
    handleFertilizerTrade("bought");
});

document.getElementById('sell-fertilizer').addEventListener('click', () => {
    handleFertilizerTrade("sold");
});

function handleFertilizerTrade(action) {
    const fertilizerName = document.getElementById('fertilizer-name').value;
    const quantity = document.getElementById('quantity').value;

    if (fertilizerName && quantity) {
        document.getElementById('trade-output').innerText = `You have ${action} ${quantity} of ${fertilizerName}.`;
    } else {
        document.getElementById('trade-output').innerText = "Please provide fertilizer name and quantity.";
    }
}
