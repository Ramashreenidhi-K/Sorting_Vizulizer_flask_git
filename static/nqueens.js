function createBoard(n = 4) {
    const board = document.getElementById('chessboard');
    board.innerHTML = ''; // Clear previous board
    board.style.gridTemplateColumns = `repeat(${n}, 50px)`;
    board.style.gridTemplateRows = `repeat(${n}, 50px)`;

    // Create cells for the chessboard
    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell ' + ((row + col) % 2 === 0 ? 'white' : 'black');
            board.appendChild(cell);
        }
    }
}

async function startVisualization() {
    const n = parseInt(document.getElementById('boardSize').value);
    createBoard(n);
    const response = await fetch(`/nqueens/${n}`);
    const solutions = await response.json();
    const message = document.getElementById('message');

    if (!Array.isArray(solutions) || solutions.length === 0) {
        message.textContent = 'No solutions found for N=' + n;
        return;
    } else {
        message.textContent = 'Solutions found: ' + solutions.length;
    }

    for (const solution of solutions) {
        await new Promise(resolve => {
            setTimeout(() => {
                updateBoard(solution);
                resolve();
            }, 1000);
        });
    }
}

function updateBoard(solution) {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.innerHTML = ''); // Clear previous queens

    solution.forEach((colIndex, row) => {
        if (colIndex >= 0 && colIndex < cells.length) { // Check if the column index is valid
            const cellIndex = row * solution.length + colIndex; // Calculate index
            if (cells[cellIndex]) { // Ensure the cell exists
                cells[cellIndex].innerHTML = '♛'; // Queen symbol
                cells[cellIndex].classList.add('queen');
            }
        }
    });
}

function resetBoard() {
    const n = parseInt(document.getElementById('boardSize').value) || 4; // Default to 4 if not specified
    createBoard(n);
    document.getElementById('message').textContent = '';
}

// Initialize the board on window load
window.onload = () => createBoard();
