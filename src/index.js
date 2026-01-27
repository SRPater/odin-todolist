import { Todo } from "./classes/Todo.js";
import { Project } from "./classes/Project.js";

const todo1 = new Todo(
  "Finish homework",
  "Math and English exercises",
  "2026-01-27",
  "high",
);

console.log("Todo object: ", todo1);
console.log("Formatted due date: ", todo1.getFormattedDueDate());

const project = new Project("default");
project.addTodo(todo1);

console.log("Project object: ", project);
console.log("Project todos: ", project.getTodos());

project.removeTodo(todo1.id);
console.log("Project after removing todo: ", project.getTodos());
