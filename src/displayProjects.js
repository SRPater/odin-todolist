import { openAddProjectModal } from "./addProject.js";
import { openDeleteProjectModal } from "./deleteProject.js";

export function displayProjects({
  projects,
  selectedProject,
  onSelectProject,
  onAddProject,
  onEditProject,
  onDeleteProject,
}) {
  const sidebar = document.getElementById("sidebar");
  sidebar.innerHTML = "";

  const header = document.createElement("div");
  header.classList.add("sidebar-header");

  const heading = document.createElement("h2");
  heading.classList.add("sidebar-title");
  heading.textContent = `Projects (${projects.length})`;

  const addButton = document.createElement("span");
  addButton.classList.add("material-symbols-rounded", "add-project-button");
  addButton.textContent = "add_circle";
  addButton.title = "Add Project";
  addButton.addEventListener("click", onAddProject);

  header.appendChild(heading);
  header.appendChild(addButton);
  sidebar.appendChild(header);

  projects.forEach((project, index) => {
    const item = document.createElement("div");
    item.classList.add("project-item");

    if (project.id === selectedProject?.id) {
      item.classList.add("selected");
    }

    item.addEventListener("click", () => {
      onSelectProject(project.id);
    });

    const name = document.createElement("span");
    name.textContent = project.name;

    item.appendChild(name);

    if (index !== 0) {
      const buttonContainer = document.createElement("div");
      buttonContainer.classList.add("project-buttons");

      const editButton = document.createElement("span");
      editButton.classList.add(
        "material-symbols-outlined",
        "edit-project-button",
      );
      editButton.textContent = "edit";
      editButton.title = "Edit Project";

      const deleteButton = document.createElement("span");
      deleteButton.classList.add(
        "material-symbols-outlined",
        "delete-project-button",
      );
      deleteButton.textContent = "delete";
      deleteButton.title = "Delete Project";

      editButton.addEventListener("click", (e) => {
        e.stopPropagation();
        onEditProject(project);
      });

      deleteButton.addEventListener("click", (e) => {
        e.stopPropagation();
        openDeleteProjectModal({
          projectName: project.name,
          onConfirm: () => onDeleteProject(project.id),
        });
      });

      buttonContainer.appendChild(editButton);
      buttonContainer.appendChild(deleteButton);
      item.appendChild(buttonContainer);
    }

    sidebar.appendChild(item);
  });
}
