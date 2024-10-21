document.addEventListener("DOMContentLoaded", () => {
    const arrayInput = document.getElementById('array-input');
    const targetInput = document.getElementById('target-input');
    const searchButton = document.getElementById('search-btn');
    const linearArrayContainer = document.getElementById('linear-array-container');
    const resultDiv = document.getElementById('result');

    searchButton.addEventListener('click', async () => {
        const arrayInputValue = arrayInput.value;
        const targetInputValue = targetInput.value;

        // Validate array input
        const array = arrayInputValue.split(',')
            .map(num => num.trim())
            .filter(num => !isNaN(num) && num !== "")
            .map(Number);

        // Validate target input
        const target = parseInt(targetInputValue);

        // Check if the array is valid
        if (array.length === 0) {
            resultDiv.textContent = 'Please enter a valid array of numbers (comma-separated).';
            return;
        }

        // Check if target is a valid number
        if (isNaN(target)) {
            resultDiv.textContent = 'Please enter a valid target number.';
            return;
        }

        // Execute the visualization
        await visualizeArray(array, target);
    });

    async function visualizeArray(array, target) {
        linearArrayContainer.innerHTML = ''; // Clear previous array

        // Create bubble items
        array.forEach((value) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('linear-item');
            itemDiv.textContent = value;
            linearArrayContainer.appendChild(itemDiv);
        });

        // Simulate the linear search and highlight steps
        for (let i = 0; i < array.length; i++) {
            const items = document.querySelectorAll('.linear-item');

            // Highlight the current item
            items[i].classList.add('highlight');

            await new Promise(resolve => setTimeout(resolve, 1000)); // Pause for visualization

            if (array[i] === target) {
                resultDiv.textContent = `Found ${target} at index ${i}.`;
                items[i].classList.add('found'); // Highlight found item
                return;
            }

            // Remove highlight after checking
            items[i].classList.remove('highlight');
        }

        resultDiv.textContent = `${target} not found in the array.`;
    }
});
