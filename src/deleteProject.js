import { openModal } from "./modal.js";

export function openDeleteProjectModal({ projectName, onConfirm }) {
  const message = document.createElement("p");
  message.textContent = 
    `Are you sure you want to delete project ${projectName} and all its tasks?`;

  openModal({
    titleText: "Confirm Project Deletion",
    bodyElements: [message],
    confirmText: "Delete",
    onConfirm: (close) => {
      onConfirm();
      close();
    },
  });
}
