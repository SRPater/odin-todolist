import { Project } from "./project.js";
import { Task } from "./task.js";

export class Storage {
  constructor() {
    this.projects = [];
    this.selectedProject = null;

    // Initialize default project
    this.createProject("General");
    this.selectProject(this.projects[0].id);
  }

  // --- Project Methods ---
  createProject(name) {
    const project = new Project(name);
    this.projects.push(project);
    return project;
  }

  deleteProject(projectId) {
    // Never delete "General"
    const project = this.projects.find(p => p.id === projectId);
    if (!project || project.name === "General") return false;

    this.projects = this.projects.filter(p => p.id !== projectId);

    // If deleted project was selected, select "General"
    if (this.selectedProject?.id === projectId) {
      this.selectProject(this.projects[0].id);
    }

    return true;
  }

  selectProject(projectId) {
    const project = this.projects.find(p => p.id === projectId);
    if (!project) return false;
    this.selectedProject = project;
    return true;
  }

  getSelectedProject() {
    return this.selectedProject;
  }

  getAllProjects() {
    return this.projects;
  }

  // --- Task Methods ---
  addTaskToSelectedProject(title, description, dueDate, priority) {
    if (!this.selectedProject) return null;
    const task = new Task(title, description, dueDate, priority);
    this.selectedProject.addTask(task);
    return task;
  }

  removeTaskFromSelectedProject(taskId) {
    if (!this.selectedProject) return false;
    this.selectedProject.removeTask(taskId);
    return true;
  }

  getTasksOfSelectedProject() {
    return this.selectedProject ? this.selectedProject.tasks : [];
  }
}
