import { openModal } from "./modal.js";
import { format } from "date-fns";

export function openAddTaskModal(onConfirm, taskToEdit = null) {
  const inputTitle = document.createElement("input");
  inputTitle.type = "text";
  inputTitle.placeholder = "Task Title";

  const inputDescription = document.createElement("textarea");
  inputDescription.placeholder = "Description";

  const dueLabel = document.createElement("label");
  dueLabel.textContent = "Due date";
  dueLabel.htmlFor = "task-due"

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

  if (taskToEdit) {
    inputTitle.value = taskToEdit.title;
    inputDescription.value = taskToEdit.description;
    inputDue.value = taskToEdit.dueDate;
    selectPriority.value = taskToEdit.priority;
  }

  openModal({
    titleText: taskToEdit ? "Edit Task" : "New Task",
    bodyElements: [
      inputTitle,
      inputDescription,
      dueLabel,
      inputDue,
      priorityLabel,
      selectPriority,
    ],
    confirmText: taskToEdit ? "Save" : "Add",
    onConfirm: (close) => {
      const title = inputTitle.value.trim();
      if (!title) return;

      onConfirm({
        title,
        description: inputDescription.value.trim(),
        dueDate: inputDue.value,
        priority: selectPriority.value,
      });

      close();
    },
  });

  inputTitle.focus();
}
