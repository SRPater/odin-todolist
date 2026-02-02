import { Project } from "./project.js";
import { Task } from "./task.js";

export class Storage {
  constructor() {
    this.projects = [];
    this.selectedProject = null;

    let data = null;

    try {
      const saved = localStorage.getItem("projectsData");
      if (saved) data = JSON.parse(saved);
    } catch {
      data = null;
    }

    if (data && Array.isArray(data.projects) && data.projects.length > 0) {
      this.projects = data.projects.map(p => {
        const project = new Project(p.name);
        project.id = p.id;

        project.tasks = p.tasks.map(t => {
          const task = new Task(t.title, t.description, t.dueDate, t.priority);
          task.id = t.id;
          return task;
        });

        return project;
      });

      if (!this.selectProject(data.selectedProjectId)) {
        this.selectProject(this.projects[0].id);
      }
    } else {
      const general = new Project("General");
      this.project.push(general);
      this.selectedProject = general;
    }

    this.save();
  }

  save() {
    localStorage.setItem(
      "projectsData",
      JSON.stringify({
        projects: this.projects,
        selectedProjectId: this.selectedProject?.id,
      }),
    );
  }

  createProject(name) {
    const project = new Project(name);
    this.projects.push(project);
    this.save();
    return project;
  }

  deleteProject(projectId) {
    const project = this.projects.find(p => p.id === projectId);
    if (!project || project.name === "General") return false;

    this.projects = this.projects.filter(p => p.id !== projectId);

    if (this.selectedProject?.id === projectId) {
      this.selectProject(this.projects[0].id);
    }

    this.save();
    return true;
  }

  selectProject(projectId) {
    const project = this.projects.find(p => p.id === projectId);
    if (!project) return false;
    this.selectedProject = project;
    this.save();
    return true;
  }

  getSelectedProject() {
    return this.selectedProject;
  }

  getProjects() {
    return this.projects;
  }

  addTaskToSelectedProject(title, description, dueDate, priority) {
    if (!this.selectedProject) return null;
    const task = new Task(title, description, dueDate, priority);
    this.selectedProject.addTask(task);
    this.save();
    return task;
  }

  removeTaskFromSelectedProject(taskId) {
    if (!this.selectedProject) return false;
    this.selectedProject.removeTask(taskId);
    this.save();
    return true;
  }

  getTasksOfSelectedProject() {
    return this.selectedProject ? this.selectedProject.tasks : [];
  }
}
