export function displayProjects({
  projects,
  selectedProject,
  onSelectProject
}) {
  const sidebar = document.getElementById("sidebar");
  sidebar.innerHTML = "";

  const heading = document.createElement("h2");
  heading.textContent = `Projects (${projects.length})`;
  heading.classList.add("sidebar-heading");
  sidebar.appendChild(heading);

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
