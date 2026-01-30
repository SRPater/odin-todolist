import { openModal } from "./modal.js";

export function openDeleteTaskModal({ taskName, projectName, onConfirm }) {
  const message = document.createElement("p");
  message.textContent =
    `Are you sure you want to delete task "${taskName}" from project "${projectName}"?`;
  
  openModal({
    titleText: "Confirm deletion",
    bodyElements: [message],
    confirmText: "Delete",
    onConfirm: (close) => {
      onConfirm();
      close();
    },
  });
}
