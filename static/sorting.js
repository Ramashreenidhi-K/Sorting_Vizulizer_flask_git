const arrayContainer = document.getElementById('array-container');
const resetBtn = document.getElementById('reset');
const runBtn = document.getElementById('run-sort');
const algorithmSelect = document.getElementById('algorithm-select');
const arraySizeInput = document.getElementById('array-size');

let array = [];
let isRunning = false;

// Function to fetch a random array from the backend
async function fetchArray(size) {
    const response = await fetch('/generate_array', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ size })
    });
    return response.json();
}

// Function to fetch sorting steps from the backend
async function fetchSortingSteps(array, algorithm) {
    const response = await fetch('/sort_array', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ array, algorithm })
    });
    return response.json();
}

// Function to render the array as bars with values
function renderArray(arr) {
    arrayContainer.innerHTML = '';
    arr.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value}px`;
        bar.setAttribute('data-value', value);

        const valueLabel = document.createElement('div');
        valueLabel.classList.add('value');
        valueLabel.textContent = value;
        bar.appendChild(valueLabel);

        arrayContainer.appendChild(bar);
    });
}

// Function to update bar heights and values
function updateBars(values) {
    const bars = document.querySelectorAll('.bar');
    values.forEach((value, index) => {
        const bar = bars[index];
        bar.style.height = `${value}px`;
        bar.setAttribute('data-value', value);
        const valueLabel = bar.querySelector('.value');
        valueLabel.textContent = value;
    });
}

// Sleep function for animation
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to animate the sorting process
async function runSortingAlgorithm() {
    if (isRunning) {
        alert('Sorting is already in progress!');
        return;
    }
    isRunning = true;
    const selectedAlgorithm = algorithmSelect.value;

    const steps = await fetchSortingSteps(array, selectedAlgorithm);
    if (steps.error) {
        alert(steps.error);
        isRunning = false;
        return;
    }

    for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        updateBars(step);

        document.querySelectorAll('.bar').forEach((bar, index) => {
            bar.classList.remove('current', 'sorted');
            if (i < steps.length - 1) {
                if (step[index] !== array[index]) {
                    bar.classList.add('current');
                } else {
                    bar.classList.add('sorted');
                }
            }

        });

        await sleep(100); // Adjust delay as needed
    }

    document.querySelectorAll('.bar').forEach(bar => bar.classList.add('sorted'));
    isRunning = false;
}

// Function to reset and generate a new array
async function reset() {
    const size = parseInt(arraySizeInput.value);
    array = await fetchArray(size);
    renderArray(array);
}

// Event listeners
arraySizeInput.addEventListener('change', reset);
resetBtn.addEventListener('click', reset);
runBtn.addEventListener('click', runSortingAlgorithm);

// Initial setup
reset();
