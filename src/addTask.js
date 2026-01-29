import { format } from "date-fns";

export function openAddTaskModal(onConfirm) {
  const backdrop = document.createElement("div");
  backdrop.classList.add("modal-backdrop");

  const modal = document.createElement("div");
  modal.classList.add("modal");

  const modalTitle = document.createElement("h3");
  modalTitle.textContent = "New Task";

  const inputTitle = document.createElement("input");
  inputTitle.type = "text";
  inputTitle.placeholder = "Task title";

  const inputDescription = document.createElement("textarea");
  inputDescription.placeholder = "Description";

  const dueLabel = document.createElement("label");
  dueLabel.textContent = "Due date";
  dueLabel.htmlFor = "task-due";

  const inputDue = document.createElement("input");
  inputDue.type = "date";
  inputDue.id = "task-due";
  inputDue.value = format(new Date(), "yyyy-MM-dd");

  const priorityLabel = document.createElement("label");
  priorityLabel.textContent = "Priority";
  priorityLabel.htmlFor = "task-priority";

  const selectPriority = document.createElement("select");
  selectPriority.id = "task-priority";
  ["High", "Medium", "Low"].forEach((level) => {
    const option = document.createElement("option");
    option.value = level;
    option.textContent = level;
    if (level === "Medium") option.selected = true;
    selectPriority.appendChild(option);
  });

  const actions = document.createElement("div");
  actions.classList.add("modal-actions");

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("cancel-button");
  cancelButton.textContent = "Cancel";

  const confirmButton = document.createElement("button");
  confirmButton.classList.add("confirm-button");
  confirmButton.textContent = "Add";

  actions.appendChild(cancelButton);
  actions.appendChild(confirmButton);

  modal.appendChild(modalTitle);
  modal.appendChild(inputTitle);
  modal.appendChild(inputDescription);
  modal.appendChild(dueLabel);
  modal.appendChild(inputDue);
  modal.appendChild(priorityLabel);
  modal.appendChild(selectPriority);
  modal.appendChild(actions);

  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);

  inputTitle.focus();

  function close() {
    document.removeEventListener("keydown", keyHandler);
    document.body.removeChild(backdrop);
  }

  function confirm() {
    const title = inputTitle.value.trim();
    if (!title) return;
    
    onConfirm({
      title,
      description: inputDescription.value.trim(),
      dueDate: inputDue.value,
      priority: selectPriority.value,
    });

    close();
  }

  cancelButton.addEventListener("click", close);
  confirmButton.addEventListener("click", confirm);

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) close();
  });

  function keyHandler(e) {
    if (e.key === "Enter") confirm();
    else if (e.key === "Escape") close();
  }

  document.addEventListener("keydown", keyHandler);
};