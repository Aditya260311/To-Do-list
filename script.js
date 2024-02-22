const tasksList = document.getElementById("tasks-list");
const addTaskForm = document.getElementById("add-task-form");
const newTaskInput = document.getElementById("new-task");
const addTaskBtn = document.getElementById("add-task-btn");

let tasks = [];

// Load tasks from local storage (using a fallback array to avoid potential errors)
let storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks = storedTasks;

// Dynamic list height calculation
function updateListHeight() {
  const listHeight = tasks.length * 50; // Adjust based on desired item height
  tasksList.style.height = listHeight + "px";
}

// Render tasks with improvements and error handling
function renderTasks() {
  updateListHeight(); // Ensure height is updated before rendering

  tasksList.innerHTML = "";
  tasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.classList.add(task.completed ? "completed" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.dataset.id = task.name;
    checkbox.checked = task.completed;
    checkbox.addEventListener("click", () => {
      task.completed = !task.completed;
      saveToLocalStorage();
      renderTasks(); // Update list after checkbox change
    });

    const label = document.createElement("label");
    label.for = task.name;
    label.textContent = task.name;
    label.addEventListener("click", () => {
      task.completed = !task.completed;
      saveToLocalStorage();
      renderTasks(); // Update list after label click
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.dataset.id = task.name;
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      const taskIndex = tasks.findIndex((t) => t.name === task.name);
      tasks.splice(taskIndex, 1);
      saveToLocalStorage();
      renderTasks(); // Update list after deletion
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(deleteBtn);

    tasksList.appendChild(listItem);
  });
}

// Add task
addTaskBtn.addEventListener("click", () => {
  const taskName = newTaskInput.value;
  if (taskName) {
    tasks.push({ name: taskName, completed: false });
    renderTasks();
    saveToLocalStorage();
    newTaskInput.value = "";
  }
});

// Save tasks to local storage
function saveToLocalStorage() {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks to local storage:", error);
  }
}

// Initial render
renderTasks();
