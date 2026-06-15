// src/services/todo-list.js
import { ToDo } from '../models/todo.js';

export class ToDoList {
    constructor(logger, storage) {
        this.todos = [];
        this.logger = logger;
        this.storage = storage
    }

    add(todo) {
        this.todos.push(todo);
        this.logger.log(`Added todo: ${todo.title}`);
        this.storage.save(this.todos);
    }

    remove(todo_id) {
        // todo to be removed
        const todo = this.todos.find(todo => todo.id === todo_id);
        // remove todo with todo_id
        this.todos = this.todos.filter(
            todo => todo.id !== todo_id
        );
        this.logger.log(`Deleted todo: ${todo.title}`);
        this.storage.save(this.todos);
    }

    getAll() {
        return this.todos;
    }

    getById(todo_id) {
        return this.todos.find(todo => todo.id === todo_id);
    }

    loadFromStorage() {
        const savedTodos = this.storage.load();

        // convert plain objects back to todo instances
        this.todos = savedTodos.map(todo => {
            const newTodo = new ToDo(
                todo.title, todo.dueDate ? new Date(todo.dueDate) : null, todo.note
            );
            newTodo.id = todo.id;
            newTodo.completed = todo.completed;
            return newTodo;
        });
        this.logger.log(`Loaded ${this.todos.length} todos from localStorage`);
    }
}