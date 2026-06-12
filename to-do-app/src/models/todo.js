// src/models/todo.js
export class ToDo {
    constructor(title, dueDate = null, note = "") {
        this.id = crypto.randomUUID();
        this.title = title;
        this.dueDate = dueDate;
        this.note = note;
        this.completed = false;
    }
    
    toggleComplete() {
        this.completed = !this.completed;
    }
}