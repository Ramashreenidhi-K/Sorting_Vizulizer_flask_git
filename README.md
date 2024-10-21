Sorting vizulizer
Flask Sorting, Searching, and N-Queens Visualization

Description
This project is a Flask-based web application that provides visualizations and steps for various sorting algorithms, searching algorithms, stack operations, and solving the N-Queens problem. The application is designed to help users understand how these algorithms work step-by-step.

Features
Sorting Algorithms Visualization:

Bubble Sort
Insertion Sort
Merge Sort
Quick Sort
Searching Algorithms Visualization:

Binary Search
Linear Search
Stack Operations:

Push and Pop operations visualization
N-Queens Problem:

Solve and visualize the N-Queens problem
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/flask-sorting-searching.git
cd flask-sorting-searching
Create and activate a virtual environment:

bash
Copy code
python3 -m venv venv
source venv/bin/activate   # On Windows, use `venv\Scripts\activate`
Install the dependencies:

bash
Copy code
pip install -r requirements.txt
Run the application:

bash
Copy code
python app.py


Copy code
http://127.0.0.1:5000
Endpoints
Home Page
GET /
Renders the home page.
About Us Page
GET /aboutus
Renders the about us page.
Generate Random Array
POST /generate_array
Generates a random array of integers.
Request body: { "size": <integer> }
Response: JSON array of random integers.
Sorting
GET /sorting

Renders the sorting algorithms page.
POST /sort_array

Sorts the given array using the specified algorithm and returns the steps.
Request body: { "array": <array of integers>, "algorithm": <string> }
Response: JSON array of steps showing the sorting process.
Stack Operations
GET /stack

Renders the stack operations page.
POST /stack_operations

Performs stack operations and returns the steps.
Request body: { "operations": <array of operations> }
Response: JSON array of steps showing the stack operations process.
Binary Search
GET /binary_search

Renders the binary search page.
POST /search

Performs a binary search on the given array and returns the steps.
Request body: { "array": <array of integers>, "target": <integer> }
Response: JSON object with steps and the index of the target.
Linear Search
GET /linear_search

Renders the linear search page.
POST /search_linear

Performs a linear search on the given array and returns the steps.
Request body: { "array": <array of integers>, "target": <integer> }
Response: JSON object with steps and the index of the target.
N-Queens
GET /nqueens

Renders the N-Queens page.(not yet fully developed)
GET /nqueens/<int:n>

Solves the N-Queens problem for a given n and returns the solutions.
Response: JSON array of solutions.
Templates
The application uses HTML templates to render the pages. The templates are located in the templates folder and include:

index.html: Home page
aboutus.html: About Us page
sorting.html: Sorting algorithms page
stack.html: Stack operations page
binary_search.html: Binary search page
linear_search.html: Linear search page
nqueens.html: N-Queens page


Acknowledgments
This project was created for educational purposes to help users understand and visualize various algorithms.
Flask documentation: https://flask.palletsprojects.com/
