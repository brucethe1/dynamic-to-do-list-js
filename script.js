document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks from Local Storage when the page loads
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false)); // Do not save again while loading
  }

  // Add a new task to the list and optionally save it to Local Storage
  function addTask(taskText, save = true) {
    const trimmedText = taskText.trim();
    if (!trimmedText) {
      alert('Please enter a task'); // Prompt user to enter valid input
      return;
    }

    // Create a new <li> element
    const li = document.createElement('li');
    li.textContent = trimmedText;

    // Create a Remove button for the task
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-btn');

    // Add event listener to the Remove button
    removeButton.addEventListener('click', () => {
      taskList.removeChild(li); // Remove the task from the DOM
      removeTask(trimmedText); // Remove it from Local Storage
    });

    // Append the button to the <li>, then add <li> to the task list
    li.appendChild(removeButton);
    taskList.appendChild(li);

    // Save task to Local Storage if needed
    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      storedTasks.push(trimmedText);
      localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
  }

  // Remove a task from Local Storage
  function removeTask(taskText) {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updatedTasks = storedTasks.filter(task => task !== taskText); // Remove the specific task
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Update Local Storage
  }

  // Event listener for the "Add Task" button
  addButton.addEventListener('click', () => {
    addTask(taskInput.value); // Call addTask with input value
    taskInput.value = ''; // Clear input field
  });

  // Event listener for adding a task with the Enter key
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask(taskInput.value); // Call addTask with input value
      taskInput.value = ''; // Clear input field
    }
  });

  // Load tasks from Local Storage on page load
  loadTasks();
});
