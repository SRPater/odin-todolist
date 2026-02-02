import { openModal } from "./modal.js";

export function openAddProjectModal(onConfirm, projectToEdit = null) {
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Project name";

  if (projectToEdit) {
    input.value = projectToEdit.name;
  }

  openModal({
    titleText: projectToEdit ? "Edit Project" : "New Project",
    bodyElements: [input],
    confirmText: projectToEdit ? "Save" : "Add",
    onConfirm: (close) => {
      const value = input.value.trim();
      if (!value) return;
      onConfirm(value);
      close();
    },
  });

  input.focus();
}
