// src/services/todo-list.js
export class ToDoList {
    constructor(logger) {
        this.todos = [];
        this.logger = logger;
    }

    add(todo) {
        this.todos.push(todo);
        this.logger.log(`Added todo: ${todo.title}`);
    }

    remove(todo_id) {
        // todo to be removed
        const todo = this.todos.find(todo => todo.id === todo_id);
        // remove todo with todo_id
        this.todos = this.todos.filter(
            todo => todo.id !== todo_id
        );
        this.logger.log(`Deleted todo: ${todo.title}`);
    }

    getAll() {
        return this.todos;
    }

    getById(todo_id) {
        this.todos = this.todos.filter(
            todo => todo.id === todo_id
        );
    }
}