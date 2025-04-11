document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        
        // Check if input is empty
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }
        
        // Create new task item
        const li = document.createElement('li');
        li.textContent = taskText;
        
        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = "remove-btn";
        
        // Add click event to remove button
        removeBtn.onclick = function() {
            taskList.removeChild(li);
            saveTasks();
        };
        
        // Append elements
        li.appendChild(removeBtn);
        taskList.appendChild(li);
        
        // Clear input field
        taskInput.value = "";
        
        // Save tasks to localStorage
        saveTasks();
    }
    
    // Function to save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(function(taskLi) {
            tasks.push({
                text: taskLi.textContent.replace('Remove', '').trim(),
                completed: taskLi.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // Function to load tasks from localStorage
    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            JSON.parse(savedTasks).forEach(function(task) {
                taskInput.value = task.text;
                addTask();
                
                // Mark as completed if needed
                if (task.completed) {
                    const lastLi = taskList.lastChild;
                    lastLi.classList.add('completed');
                }
            });
            taskInput.value = "";
        }
    }
    
    // Add task when button is clicked
    addButton.addEventListener('click', addTask);
    
    // Add task when Enter key is pressed
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
    
    // Load saved tasks when page loads
    loadTasks();
});
