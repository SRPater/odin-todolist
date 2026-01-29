export function openAddProjectModal(onConfirm) {
  const backdrop = document.createElement("div");
  backdrop.classList.add("modal-backdrop");

  const modal = document.createElement("div");
  modal.classList.add("modal");

  const title = document.createElement("h3");
  title.textContent = "New Project";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Project name";

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

  modal.appendChild(title);
  modal.appendChild(input);
  modal.appendChild(actions);
  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);

  input.focus();

  function close() {
    document.removeEventListener("keydown", keyHandler);
    document.body.removeChild(backdrop);
  }

  function confirm() {
    const value = input.value.trim();
    if (!value) return;
    onConfirm(value);
    close();
  }

  cancelButton.addEventListener("click", close);
  confirmButton.addEventListener("click", confirm);

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) close();
  });

  const keyHandler = (e) => {
    if (e.key === "Enter") {
      confirm();
    } else if (e.key === "Escape") {
      close();
    }
  }

  document.addEventListener("keydown", keyHandler);
}