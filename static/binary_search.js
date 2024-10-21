document.addEventListener("DOMContentLoaded", () => {
    const arrayInput = document.getElementById('binary-array-input'); // ID should match
    const targetInput = document.getElementById('binary-target-input'); // ID should match
    const searchButton = document.getElementById('search-btn');
    const binaryArrayContainer = document.getElementById('binary-array-container');
    const resultDiv = document.getElementById('result');

    searchButton.addEventListener('click', async () => {
        const arrayInputValue = arrayInput.value;
        const targetInputValue = targetInput.value;

        // Validate array input
        const array = arrayInputValue.split(',')
            .map(num => num.trim())
            .filter(num => num !== "" && !isNaN(num))
            .map(Number);

        // Validate target input
        const target = parseInt(targetInputValue, 10);

        // Check if the array is valid
        if (array.length === 0) {
            resultDiv.textContent = 'Please enter a valid array of sorted numbers (comma-separated).';
            return;
        }

        // Check if target is a valid number
        if (isNaN(target)) {
            resultDiv.textContent = 'Please enter a valid target number.';
            return;
        }

        // Disable button and clear results
        searchButton.disabled = true;
        resultDiv.textContent = '';

        // Execute the visualization
        await visualizeBinarySearch(array, target);

        // Re-enable button after search
        searchButton.disabled = false;
    });

    async function visualizeBinarySearch(array, target) {
        binaryArrayContainer.innerHTML = ''; // Clear previous array

        // Create item elements
        array.forEach(value => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('binary-item');
            itemDiv.textContent = value;
            binaryArrayContainer.appendChild(itemDiv);
        });

        let left = 0;
        let right = array.length - 1;

        while (left <= right) {
            const items = document.querySelectorAll('.binary-item');
            const mid = Math.floor((left + right) / 2);

            // Highlight the current range
            items[mid].classList.add('highlight');
            await new Promise(resolve => setTimeout(resolve, 1000)); // Pause for visualization

            if (array[mid] === target) {
                resultDiv.textContent = `Found ${target} at index ${mid}.`;
                items[mid].classList.add('found'); // Highlight found item
                return;
            } else if (array[mid] < target) {
                left = mid + 1; // Search in the right half
            } else {
                right = mid - 1; // Search in the left half
            }

            // Remove highlight after checking
            items[mid].classList.remove('highlight');
        }

        resultDiv.textContent = `${target} not found in the array.`;
    }
});
