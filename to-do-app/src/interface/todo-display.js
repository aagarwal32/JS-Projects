// src/interface/todo-display.js
export class ToDoDisplay {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
    }

    render(todos) {
        this.container.replaceChildren();
        todos.forEach(todo => {
            const todoDiv = this.createTodoElement(todo);
            this.container.appendChild(todoDiv);
        });
    }

    createTodoElement(todo) {
        const todoDiv = document.createElement("div");
        todoDiv.className = "todo-item";
        todoDiv.setAttribute("data-id", todo.id);
        
        // Status
        const statusDiv = this.createStatusDiv(todo.completed);
        todoDiv.appendChild(statusDiv);
        
        // Separator for title and date
        const seperator = document.createElement("div");
        seperator.className = "seperator";
        seperator.appendChild(this.createTitleDiv(todo.title));
        seperator.appendChild(this.createDateDiv(todo.dueDate));
        todoDiv.appendChild(seperator);
        
        // Note
        const noteDiv = this.createNoteDiv(todo.note);
        todoDiv.appendChild(noteDiv);
        
        return todoDiv;
    }

    createStatusDiv(completed) {
        const statusDiv = document.createElement("div");
        statusDiv.className = "todo-status";
        statusDiv.textContent = completed ? "✓ Completed" : "~ Pending";
        return statusDiv;
    }

    createTitleDiv(title) {
        const titleDiv = document.createElement("div");
        titleDiv.className = "todo-title";
        titleDiv.textContent = title;
        return titleDiv;
    }

    createDateDiv(date) {
        const dateDiv = document.createElement("div");
        dateDiv.className = "todo-date";
        dateDiv.textContent = date ? date.toLocaleDateString() : "No date";
        return dateDiv;
    }

    createNoteDiv(note) {
        const noteDiv = document.createElement("div");
        noteDiv.className = "todo-note";
        noteDiv.textContent = note || "No notes";
        return noteDiv;
    }
}