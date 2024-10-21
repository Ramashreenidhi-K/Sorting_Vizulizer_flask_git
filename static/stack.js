const stackContainer = document.getElementById('stack-elements');
const pushBtn = document.getElementById('push-btn');
const popBtn = document.getElementById('pop-btn');
const resetBtn = document.getElementById('reset-btn');
const stackInput = document.getElementById('stack-input');
const stackSizeInput = document.getElementById('stack-size');

let stack = [];
let maxSize = parseInt(stackSizeInput.value);

// Function to update the stack visualization
function updateStack() {
    stackContainer.innerHTML = ''; // Clear the stack display
    stack.forEach(value => {
        const item = document.createElement('div');
        item.classList.add('stack-item');
        item.textContent = value;
        stackContainer.appendChild(item);
    });
}

// Update max size when the input changes
stackSizeInput.addEventListener('change', () => {
    maxSize = parseInt(stackSizeInput.value);
});

// Push operation
pushBtn.addEventListener('click', () => {
    const value = stackInput.value.trim(); // Trim whitespace
    if (value === '' || isNaN(value)) {
        alert("Please enter a valid number!");
        return; // Exit if invalid
    }

    if (stack.length < maxSize) {
        stack.push(value);
        updateStack();
        stackInput.value = ''; // Clear input
    } else {
        alert("Stack is full!");
    }
});

// Pop operation
popBtn.addEventListener('click', () => {
    if (stack.length > 0) {
        stack.pop();
        updateStack();
    } else {
        alert("Stack is empty!");
    }
});

// Reset operation
resetBtn.addEventListener('click', () => {
    stack = [];
    updateStack();
});

// Initial setup
updateStack();
