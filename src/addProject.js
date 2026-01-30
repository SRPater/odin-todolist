import { openModal } from "./modal.js";

export function openAddProjectModal(onConfirm) {
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Project name";

  openModal({
    titleText: "New Project",
    bodyElements: [input],
    confirmText: "Add",
    onConfirm: (close) => {
      const value = input.value.trim();
      if (!value) return;
      onConfirm(value);
      close();
    },
  });

  input.focus();
}
