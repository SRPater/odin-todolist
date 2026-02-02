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
    onEditProject: (project) => {
      openAddProjectModal((newName) => {
        project.name = newName;
        storage.save();
        renderApp();
      }, project);
    },
    onDeleteProject: (projectId) => {
      if (selectedProject.id === projectId) {
        storage.selectProject(projects[0].id);
      }

      storage.deleteProject(projectId);
      renderApp();
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
      onEditTask: (task) => {
        openAddTaskModal(
          (updatedData) => {
            task.title = updatedData.title;
            task.description = updatedData.description;
            task.dueDate = updatedData.dueDate;
            task.priority = updatedData.priority;
            storage.save();
            renderApp();
          },
          task,
        );
      },
      onDeleteTask: (taskId) => {
        selectedProject.removeTask(taskId);
        renderApp();
      },
    });
  }
}

renderApp();
