import { openDeleteProjectModal } from "./deleteProject.js";

export function displayProjects({
  projects,
  selectedProject,
  onSelectProject,
  onAddProject,
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
      const deleteButton = document.createElement("span");
      deleteButton.classList.add(
        "material-symbols-outlined",
        "delete-project-button",);
      deleteButton.textContent = "delete";
      deleteButton.title = "Delete Project";

      deleteButton.addEventListener("click", (e) => {
        e.stopPropagation();
        openDeleteProjectModal({
          projectName: project.name,
          onConfirm: () => onDeleteProject(project.id),
        });
      });

      item.appendChild(deleteButton);
    }

    sidebar.appendChild(item);
  });
}
