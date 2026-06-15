// src/interface/todo-display.js
export class ToDoDisplay {
    constructor(containerSelector, logger) {
        this.container = document.querySelector(containerSelector);
        this.logger = logger;
    }

    render(todos) {
        this.container.replaceChildren();
        this.logger.log(`Rendering ${todos.length} todos`);
        todos.forEach(todo => {
            const todoDiv = this.createTodoElement(todo);
            this.container.appendChild(todoDiv);
        });
    }

    createTodoElement(todo) {
        const todoDiv = document.createElement("div");
        todoDiv.className = "todo-item";
        todoDiv.setAttribute("data-id", todo.id);
        
        // Status and delete button
        const top_seperator = document.createElement("div");
        top_seperator.className = "top-seperator";

        const statusDiv = this.createStatusDiv(todo.completed);
        const delButton = this.createDeleteButton(todo.id);
        top_seperator.appendChild(statusDiv);
        top_seperator.appendChild(delButton);
        todoDiv.appendChild(top_seperator);
        
        // Separator for title and date
        const seperator = document.createElement("div");
        seperator.className = "seperator";
        
        const inner_seperator = document.createElement("div");
        inner_seperator.className = "inner-seperator";
        inner_seperator.appendChild(this.createToggleBox(todo.id, todo.completed));
        inner_seperator.appendChild(this.createTitleDiv(todo.title));

        seperator.appendChild(inner_seperator);
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

    createDeleteButton(todo_id) {
        const delButton = document.createElement("button");
        delButton.className = "delete-btn";
        delButton.textContent = "-";
        delButton.dataset.id = todo_id;
        return delButton;
    }

    createToggleBox(todo_id, completed) {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "todo-checkbox";
        checkbox.checked = completed;
        checkbox.dataset.id = todo_id;
        return checkbox;
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
        dateDiv.textContent = date ? date.toLocaleDateString() : "Unscheduled";
        return dateDiv;
    }

    createNoteDiv(note) {
        const noteDiv = document.createElement("div");
        noteDiv.className = "todo-note";
        noteDiv.textContent = note || "";
        return noteDiv;
    }
}