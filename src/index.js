import { Project } from "./project.js";
import { Task } from "./task.js";

const general = new Project("General");
console.log("New Project: ", general);

const task1 = new Task(
  "Buy groceries",
  "Milk, eggs, bread",
  "2026-01-30",
  "High",
);

const task2 = new Task(
  "Do laundry",
  "Wash and fold clothes",
  "2026-02-01",
  "Medium",
);

general.addTask(task1);
general.addTask(task2);

console.log("Project after adding tasks: ", general);

general.removeTask(task1.id);
console.log("Project after removing task1: ", general);
