import { format } from "date-fns";

export function displayTasks({ tasks }) {
  const main = document.getElementById("main");
  main.innerHTML = "";

  if (!tasks || tasks.length === 0) {
    const placeholder = document.createElement("p");
    placeholder.textContent = "No tasks yet.";
    placeholder.classList.add("no-tasks");
    main.appendChild(placeholder);
    return;
  }

  tasks.forEach((task) => {
    const card = document.createElement("div");
    card.classList.add(
      "task-card",
      `priority-${task.priority.toLowerCase() || "low"}`
    );

    const header = document.createElement("div");
    header.classList.add("task-header");

    const title = document.createElement("h3");
    title.classList.add("task-title");
    title.textContent = task.title;

    const date = document.createElement("p");
    date.classList.add("task-date");
    try {
      const due = new Date(task.dueDate);
      date.textContent = `Due: ${format(due, "dd-MM-yyyy")}`;
    } catch (e) {
      date.textContent = `Due: ${task.dueDate}`;
    }

    const arrowSpan = document.createElement("span");
    arrowSpan.classList.add("toggle-arrow");
    arrowSpan.textContent = "▶";

    const titleContainer = document.createElement("div");
    titleContainer.classList.add("task-title-container");
    titleContainer.appendChild(title);
    titleContainer.appendChild(date);

    header.appendChild(titleContainer);
    header.appendChild(arrowSpan);

    const description = document.createElement("div");
    description.classList.add("task-description");
    description.textContent = task.description;

    header.addEventListener("click", () => {
      description.classList.toggle("expanded");
      arrowSpan.textContent = description.classList.contains("expanded") ? "▼" : "▶";
    });

    card.appendChild(header);
    card.appendChild(description);
    main.appendChild(card);
  });
}