export function displayProjects({
  projects,
  selectedProject,
  onSelectProject,
  onAddProject,
}) {
  const sidebar = document.getElementById("sidebar");
  sidebar.innerHTML = "";

  const header = document.createElement("div");
  header.classList.add("sidebar-header");

  const heading = document.createElement("h2");
  heading.classList.add("sidebar-heading");
  heading.textContent = `Projects (${projects.length})`;

  const addButton = document.createElement("button");
  addButton.classList.add("add-project-button");
  addButton.title = "Add Project";

  const icon = document.createElement("span");
  icon.classList.add("material-symbols-rounded");
  icon.textContent = "add_circle";

  addButton.appendChild(icon);

  addButton.addEventListener("click", () => {
    onAddProject();
  });

  header.appendChild(heading);
  header.appendChild(addButton);
  sidebar.appendChild(header);

  projects.forEach((project) => {
    const projectDiv = document.createElement("div");
    projectDiv.textContent = project.name;
    projectDiv.classList.add("project-item");

    if (selectedProject && project.id === selectedProject.id) {
      projectDiv.classList.add("selected");
    }

    projectDiv.addEventListener("click", () => {
      onSelectProject(project.id);
    });

    sidebar.appendChild(projectDiv);
  });
}
