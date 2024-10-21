let queue = [];
const queueElements = document.getElementById('queue-elements');
const queueSizeInput = document.getElementById('queue-size');
const queueInput = document.getElementById('queue-input');

document.getElementById('enqueue-btn').addEventListener('click', enqueue);
document.getElementById('dequeue-btn').addEventListener('click', dequeue);
document.getElementById('reset-btn').addEventListener('click', resetQueue);

function enqueue() {
    const value = queueInput.value.trim(); // Get trimmed value
    if (value === '' || isNaN(value)) {
        alert("Please enter a valid number!");
        return; // Exit if invalid
    }
    
    if (queue.length < queueSizeInput.value) {
        queue.push(value);
        updateQueueDisplay(); // Only update display with valid input
        queueInput.value = ''; // Clear input after enqueue
    } else {
        alert("Queue is full!");
    }
}

function dequeue() {
    if (queue.length > 0) {
        queue.shift();
        updateQueueDisplay();
    } else {
        alert("Queue is empty!");
    }
}

function resetQueue() {
    queue = [];
    updateQueueDisplay();
}

function updateQueueDisplay() {
    queueElements.innerHTML = '';
    queue.forEach(value => {
        const div = document.createElement('div');
        div.textContent = value;
        div.classList.add('queue-item'); // Use the queue-item class
        queueElements.appendChild(div);
    });
}
