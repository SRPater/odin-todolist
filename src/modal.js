export function openModal({
  titleText,
  bodyElements = [],
  confirmText = "OK",
  onConfirm,
  onCancel = () => {},
}) {
  const backdrop = document.createElement("div");
  backdrop.classList.add("modal-backdrop");

  const modal = document.createElement("div");
  modal.classList.add("modal");

  const title = document.createElement("h3");
  title.textContent = titleText;

  const actions = document.createElement("div");
  actions.classList.add("modal-actions");

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("cancel-button");
  cancelButton.textContent = "Cancel";

  const confirmButton = document.createElement("button");
  confirmButton.classList.add("confirm-button");
  confirmButton.textContent = confirmText;

  actions.appendChild(cancelButton);
  actions.appendChild(confirmButton);
  modal.appendChild(title);

  bodyElements.forEach(element => {
    modal.appendChild(element);
  });

  modal.appendChild(actions);
  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);

  confirmButton.focus();

  function close() {
    document.removeEventListener("keydown", keyHandler);
    backdrop.remove();
  }

  function confirm() {
    onConfirm?.(close);
  }

  cancelButton.addEventListener("click", () => {
    onCancel();
    close();
  });

  confirmButton.addEventListener("click", confirm);

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) {
      onCancel();
      close();
    }
  });

  function keyHandler(e) {
    if (e.key === "Escape") {
      onCancel();
      close();
    }

    if (e.key === "Enter") confirm();
  }

  document.addEventListener("keydown", keyHandler);

  return { close, modal };
}
