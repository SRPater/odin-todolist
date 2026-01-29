import "./styles.css";
import { Storage } from "./storage.js";
import { displayProjects } from "./displayProjects.js";
import { displayTasks } from "./displayTasks.js";
import { openAddProjectModal } from "./addProject.js";
import { openAddTaskModal } from "./addTask.js";

const storage = new Storage();

function renderApp() {
  const projects = storage.getProjects();
  const selectedProject = storage.getSelectedProject();

  displayProjects({
    projects,
    selectedProject,
    onSelectProject: (projectId) => {
      storage.selectProject(projectId);
      renderApp();
    },
    onAddProject: () => {
      openAddProjectModal((name) => {
        const newProject = storage.createProject(name);
        storage.selectProject(newProject.id);
        renderApp();
      });
    },
  });

  if (selectedProject) {
    displayTasks({
      project: selectedProject,
      tasks: selectedProject.tasks,
      onAddTask: () => {
        openAddTaskModal((taskData) => {
          storage.addTaskToSelectedProject(
            taskData.title,
            taskData.description,
            taskData.dueDate,
            taskData.priority,
          );
          renderApp();
        });
      },
      onDeleteTask: (id) => {
        selectedProject.removeTask(id);
        renderApp();
      },
    });
  }
}

renderApp();
