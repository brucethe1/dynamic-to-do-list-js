// Wait until the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
  // Select the necessary DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Function to add a new task to the list
  function addTask() {
    const taskText = taskInput.value.trim(); // Get and trim the input value

    // Check if the input field is empty
    if (taskText === '') {
      alert('Please enter a task'); // Prompt the user to enter a task if the field is empty
      return;
    }

    // Create a new <li> element to represent the task
    const li = document.createElement('li');
    li.textContent = taskText; // Set the text content to the task input

    // Create a new remove button for the task
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove'; // Set button text to "Remove"
    removeButton.classList.add('remove-btn'); // Add a class for styling

    // Event listener for the remove button to remove the task from the list
    removeButton.addEventListener('click', () => {
      taskList.removeChild(li); // Remove the <li> from the task list
    });

    // Append the remove button to the task <li> element
    li.appendChild(removeButton);

    // Append the new <li> (task) to the task list
    taskList.appendChild(li);

    // Clear the input field after adding the task
    taskInput.value = '';
  }

  // Add task when the "Add Task" button is clicked
  addButton.addEventListener('click', addTask);

  // Allow adding tasks by pressing the "Enter" key
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask(); // Add task if Enter key is pressed
    }
  });
});
