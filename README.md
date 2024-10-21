# DSA Visualization

This project is a Flask-based web application that provides visualizations and steps for various sorting algorithms, searching algorithms, stack operations, and solving the N-Queens problem. The application is designed to help users understand how these algorithms work step-by-step.

## Features

1. **Sorting Algorithms Visualization**:
    - Bubble Sort
    - Insertion Sort
    - Merge Sort
    - Quick Sort

2. **Searching Algorithms Visualization**:
    - Binary Search
    - Linear Search

3. **Stack Operations**:
    - Push and Pop operations visualization

4. **N-Queens Problem**:
    - Solve and visualize the N-Queens problem




## Usage
```
1.Clone the repository:
git clone https://github.com/yourusername/flask-sorting-searching.git
cd flask-sorting-searching

2.Create and activate a virtual environment:
python3 -m venv venv
source venv/bin/activate   # On Windows, use `venv\Scripts\activate`

3.Run the application:
python app.py

4.Open your browser and go to:
http://127.0.0.1:5000
```
## Endpoints

1. **Home Page**
  - GET /

    Renders the home page.

2. **About Us Page:**
   - GET /aboutus

   Renders the about us page.

3. **Generate Random Array:**

   - POST /generate_array

    Generates a random array of integers.

   Request body: { "size": <integer> }

   Response: JSON array of random integers.

4. **Sorting**
   - GET /sorting

   Renders the sorting algorithms page.

5. **Stack Operations**
   - GET /stack

   Renders the stack operations page.

   POST /stack_operations

   Performs stack operations and returns the steps.
   Request body: { "operations": <array of operations> }
   Response: JSON array of steps showing the stack operations process.

6. **Binary Search**

   - GET /binary_search

   Renders the binary search page.

   POST /search

   Performs a binary search on the given array and returns the steps.
   Request body: { "array": <array of integers>, "target": <integer> }
   Response: JSON object with steps and the index of the target.

7. **Linear Search**

   - GET /linear_search

   Renders the linear search page.
   
   POST /search_linear

   Performs a linear search on the given array and returns the steps.
   Request body: { "array": <array of integers>, "target": <integer> }
   Response: JSON object with steps and the index of the target.

8. **Templates:**

   The application uses HTML templates to render the pages. The templates are located 
   in the templates folder and include:

   - index.html: Home page
   - aboutus.html: About Us page
   - sorting.html: Sorting algorithms page
   - stack.html: Stack operations page
   - binary_search.html: Binary search page
   - linear_search.html: Linear search page
   - nqueens.html: N-Queens page


