import { displayProjects } from "./displayProjects.js";
import { displayTasks } from "./displayTasks.js";

export function renderUI({
  projects,
  selectedProject,
  tasks,
  onSelectProject
}) {
  displayProjects({ projects, selectedProject, onSelectProject });
  displayTasks({ tasks });
}
