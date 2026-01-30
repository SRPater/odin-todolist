import { format } from "date-fns";
import { openDeleteTaskModal } from "./deleteTask.js";

export function displayTasks({ project, tasks, onAddTask, onDeleteTask }) {
  const main = document.getElementById("main");
  main.innerHTML = "";

  const header = document.createElement("div");
  header.classList.add("task-header");

  const title = document.createElement("h2");
  title.classList.add("project-title");
  title.textContent = `${project.name} (${tasks.length} tasks)`;

  const addButton = document.createElement("button");
  addButton.classList.add("add-task-button");
  addButton.title = "Add Task";

  const icon = document.createElement("span");
  icon.classList.add("material-symbols-rounded");
  icon.textContent = "add_circle";

  addButton.appendChild(icon);
  addButton.addEventListener("click", () => onAddTask());

  header.appendChild(title);
  header.appendChild(addButton);
  main.appendChild(header);

  const list = document.createElement("div");
  list.classList.add("task-list");
  main.appendChild(list);

  if (tasks.length === 0) {
    const empty = document.createElement("p");
    empty.classList.add("no-tasks");
    empty.textContent = "No tasks yet.";
    list.appendChild(empty);
    return;
  }

  tasks.forEach(task => {
    const taskCard = document.createElement("div");
    taskCard.classList.add(
      "task-card",
      `priority-${task.priority.toLowerCase()}`,
    );

    const taskHeader = document.createElement("div");
    taskHeader.classList.add("task-card-header");

    const titleContainer = document.createElement("div");
    titleContainer.classList.add("task-title-container");

    const taskTitle = document.createElement("h3");
    taskTitle.classList.add("task-title");
    taskTitle.textContent = task.title;

    const taskDate = document.createElement("p");
    taskDate.classList.add("task-date");
    taskDate.textContent = format(new Date(task.dueDate), "dd-MM-yyyy");

    titleContainer.appendChild(taskTitle);
    titleContainer.appendChild(taskDate);

    const arrow = document.createElement("span");
    arrow.classList.add("toggle-arrow", "material-symbols-outlined");
    arrow.textContent = "keyboard_arrow_right";

    taskHeader.appendChild(titleContainer);
    taskHeader.appendChild(arrow);

    const description = document.createElement("p");
    description.classList.add("task-description");
    description.textContent = task.description;

    const deleteButton = document.createElement("span");
    deleteButton.classList.add(
      "material-symbols-outlined",
      "delete-task-button",
    );
    deleteButton.textContent = "delete";
    deleteButton.title = "Delete task";

    description.appendChild(deleteButton);

    taskHeader.addEventListener("click", () => {
      description.classList.toggle("expanded");
      arrow.textContent = description.classList.contains("expanded")
        ? "keyboard_arrow_down"
        : "keyboard_arrow_right";
    });

    deleteButton.addEventListener("click", () => {
      openDeleteTaskModal({
        taskName: task.title,
        projectName: project.name,
        onConfirm: () => onDeleteTask(task.id),
      });
    });

    taskCard.appendChild(taskHeader);
    taskCard.appendChild(description);
    list.appendChild(taskCard);
  });
}