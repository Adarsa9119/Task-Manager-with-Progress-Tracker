const taskInput = document.getElementById("task");
const priorityInput = document.getElementById("priority");
const deadlineInput = document.getElementById("deadline");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

addTaskButton.addEventListener("click", () => {
  const task = taskInput.value.trim();
  const priority = priorityInput.value;
  const deadline = deadlineInput.value;

  if (task === "" || deadline === "") {
    alert("Please enter a task and select a deadline.");
    return;
  }

  const selectedDate = new Date(deadline);
  const currentDate = new Date();

  if (selectedDate <= currentDate) {
    alert("Please select an upcoming date for the deadline.");
    return;
  }

  createTaskElement(task, priority, deadline);
  taskInput.value = "";
  priorityInput.value = "top";
  deadlineInput.value = "";
});

function createTaskElement(task, priority, deadline) {
  const taskItem = document.createElement("div");
  taskItem.classList.add("task");

  const taskContent = document.createElement("div");
  taskContent.innerHTML = `
    <p><strong>${task}</strong></p>
    <p>Priority: ${priority}</p>
    <p>Deadline: ${deadline}</p>
  `;

  const doneBtn = document.createElement("button");
  doneBtn.textContent = "Mark Done";
  doneBtn.classList.add("mark-done");
  doneBtn.addEventListener("click", () => {
    taskItem.classList.add("completed");
    doneBtn.disabled = true;
    doneBtn.textContent = "Completed";
  });

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit");
  editBtn.addEventListener("click", () => {
    const newTask = prompt("Edit task:", task);
    if (newTask !== null && newTask.trim() !== "") {
      taskContent.querySelector("p strong").textContent = newTask.trim();
    }
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete");
  deleteBtn.addEventListener("click", () => {
    taskList.removeChild(taskItem);
  });

  taskItem.appendChild(taskContent);
  taskItem.appendChild(doneBtn);
  taskItem.appendChild(editBtn);
  taskItem.appendChild(deleteBtn);
  taskList.appendChild(taskItem);
}