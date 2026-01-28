import { Storage } from "./storage.js";

const storage = new Storage();

// Show all projects
console.log("Projects after initialization: ", storage.getAllProjects());

// Add a new project
const projectA = storage.createProject("Project A");
console.log("Projects after adding Project A: ", storage.getAllProjects());

// Select Project A and add tasks
storage.selectProject(projectA.id);
storage.addTaskToSelectedProject(
  "Task 1",
  "Do something",
  "2026-01-28",
  "High",
);

storage.addTaskToSelectedProject(
  "Task 2",
  "Do something else",
  "2026-01-29",
  "Medium",
);

console.log("Tasks in project A: ", storage.getTasksOfSelectedProject());

// Delete Task 1
const task1Id = storage.getTasksOfSelectedProject()[0].id;
storage.removeTaskFromSelectedProject(task1Id);
console.log(
  "Tasks in Project A after removing Task 1: ",
  storage.getTasksOfSelectedProject(),
);

// Delete Project A
storage.deleteProject(projectA.id);
console.log("Projects after deleting Project A: ", storage.getAllProjects());
console.log("Selected project after deletion: ", storage.getSelectedProject());
