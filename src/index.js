import "./styles.css";
import { Storage } from "./storage.js";
import { renderUI } from "./ui.js";

const storage = new Storage();

const projectA = storage.createProject("Project A");
const projectB = storage.createProject("Project B");

storage.addTaskToSelectedProject(
  "Buy groceries",
  "Milk, bread, eggs, and fruit",
  "2026-01-28",
  "Medium"
);

storage.addTaskToSelectedProject(
  "Pay bills",
  "Electricity and internet",
  "2026-01-30",
  "High"
);

storage.selectProject(projectA.id);
storage.addTaskToSelectedProject(
  "Finish report",
  "Complete the quarterly report and email it to the team",
  "2026-01-29",
  "High"
);

storage.addTaskToSelectedProject(
  "Team meeting",
  "Prepare slides for the Monday meeting",
  "2026-02-01",
  "Low"
);

storage.selectProject(storage.getAllProjects()[0].id);

function render() {
  renderUI({
    projects: storage.getAllProjects(),
    selectedProject: storage.getSelectedProject(),
    tasks: storage.getTasksOfSelectedProject(),
    onSelectProject: (projectId) => {
      storage.selectProject(projectId);
      render();
    },
  });
}

render();
