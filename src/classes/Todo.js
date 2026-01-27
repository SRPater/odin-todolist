import { format, parseISO } from "date-fns";

export class Todo {
  constructor(title, description, dueDate, priority) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = parseISO(dueDate);
    this.priority = priority;
  }

  getFormattedDueDate() {
    return format(this.dueDate, "dd-MM-yyyy");
  }
};
