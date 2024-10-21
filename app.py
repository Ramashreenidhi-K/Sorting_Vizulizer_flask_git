from flask import Flask, request, jsonify, render_template
import random

app = Flask(__name__)

def generate_array(size):
    return [random.randint(10, 200) for _ in range(size)]

def bubble_sort_steps(array):
    arr = array[:]
    steps = [arr.copy()]
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                steps.append(arr.copy())
    return steps

def insertion_sort_steps(array):
    arr = array[:]
    steps = [arr.copy()]
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
        steps.append(arr.copy())
    return steps

def merge_sort_steps(array):
    arr = array[:]
    steps = [arr.copy()]

    def merge_sort(arr):
        if len(arr) > 1:
            mid = len(arr) // 2
            left_half = arr[:mid]
            right_half = arr[mid:]

            merge_sort(left_half)
            merge_sort(right_half)

            merged = []
            i = j = 0
            while i < len(left_half) and j < len(right_half):
                if left_half[i] < right_half[j]:
                    merged.append(left_half[i])
                    i += 1
                else:
                    merged.append(right_half[j])
                    j += 1
            merged.extend(left_half[i:])
            merged.extend(right_half[j:])
            arr[:] = merged
            steps.append(arr.copy())

    merge_sort(arr)
    return steps

def quick_sort_steps(array):
    arr = array[:]
    steps = [arr.copy()]

    def quick_sort(low, high):
        if low < high:
            pi = partition(low, high)
            quick_sort(low, pi - 1)
            quick_sort(pi + 1, high)
            steps.append(arr.copy())

    def partition(low, high):
        pivot = arr[high]
        i = low - 1
        for j in range(low, high):
            if arr[j] < pivot:
                i += 1
                arr[i], arr[j] = arr[j], arr[i]
        arr[i + 1], arr[high] = arr[high], arr[i + 1]
        return i + 1

    quick_sort(0, len(arr) - 1)
    return steps

def stack_operations(operations):
    stack = []
    steps = []

    for operation in operations:
        if operation['type'] == 'push':
            stack.append(operation['value'])
        elif operation['type'] == 'pop' and stack:
            stack.pop()
        steps.append(stack.copy())

    return steps

def binary_search_steps(array, target):
    steps = []
    left, right = 0, len(array) - 1

    while left <= right:
        mid = (left + right) // 2
        steps.append((array.copy(), mid))  # Capture the array and the mid index
        if array[mid] == target:
            return steps, mid
        elif array[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return steps, -1  # Target not found

@app.route('/binary_search')
def binary_search():
    return render_template('binary_search.html')
@app.route('/search', methods=['POST'])
def binary_search_route():
    data = request.json
    array = sorted(data.get('array', []))
    target = data.get('target')
    
    if target is None or not isinstance(target, int):
        return jsonify({'error': 'Invalid target'}), 400

    steps = []
    left, right = 0, len(array) - 1

    while left <= right:
        mid = left + (right - left) // 2
        steps.append((array.copy(), mid))

        if array[mid] == target:
            return jsonify({'steps': steps, 'index': mid})
        elif array[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return jsonify({'steps': steps, 'index': -1})


#linear search
def linear_search_steps(array, target):
    steps = []
    for index, value in enumerate(array):
        steps.append((array.copy(), index))  # Capture the current array and index
        if value == target:
            return steps, index
    return steps, -1  # Target not found

@app.route('/linear_search')
def linear_search():
    return render_template('linear_search.html')

@app.route('/search_linear', methods=['POST'])
def linear_search_route():
    data = request.json
    array = data.get('array', [])
    target = data.get('target')

    if target is None or not isinstance(target, int):
        return jsonify({'error': 'Invalid target'}), 400

    steps, index = linear_search_steps(array, target)
    return jsonify({'steps': steps, 'index': index})

#nqueens
def solve_n_queens(n):
    solutions = []
    board = [['.' for _ in range(n)] for _ in range(n)]
    
    def is_safe(row, col):
        for i in range(row):
            if board[i][col] == 'Q':
                return False
            if col - (row - i) >= 0 and board[i][col - (row - i)] == 'Q':
                return False
            if col + (row - i) < n and board[i][col + (row - i)] == 'Q':
                return False
        return True

    def place_queens(row):
        if row == n:
            solutions.append([''.join(r) for r in board])
            return
        
        for col in range(n):
            if is_safe(row, col):
                board[row][col] = 'Q'
                place_queens(row + 1)
                board[row][col] = '.'  # Backtrack

    place_queens(0)
    return solutions

@app.route('/nqueens/<int:n>')
def n_queens(n):
    solutions = solve_n_queens(n)
    return jsonify(solutions)

@app.route('/nqueens')
def n_queens_page():
    return render_template('nqueens.html')






@app.route('/')
def index():
    return render_template('index.html')

@app.route('/aboutus')
def about_us():
    return render_template('aboutus.html')

@app.route('/index.html')
def return_index():
    return render_template('index.html')

@app.route('/generate_array', methods=['POST'])
def generate_array_route():
    size = int(request.json.get('size', 20))
    array = generate_array(size)
    return jsonify(array)

@app.route('/sorting')
def sorting():
    return render_template('sorting.html')

@app.route('/stack')
def stack():
    return render_template('stack.html')

@app.route('/queue')
def queue():
    return render_template('queue.html')

@app.route('/sort_array', methods=['POST'])
def sort_array_route():
    array = request.json.get('array', [])
    algorithm = request.json.get('algorithm', 'bubble')
    
    if algorithm == 'bubble':
        steps = bubble_sort_steps(array)
    elif algorithm == 'insertion':
        steps = insertion_sort_steps(array)
    elif algorithm == "merge":
        steps = merge_sort_steps(array)
    elif algorithm == "quick":
        steps = quick_sort_steps(array)
    else:
        return jsonify({'error': 'Invalid algorithm'})
    
    return jsonify(steps)

@app.route('/stack_operations', methods=['POST'])
def stack_operations_route():
    operations = request.json.get('operations', [])
    steps = stack_operations(operations)
    return jsonify(steps)

if __name__ == '__main__':
    app.run(debug=True)
