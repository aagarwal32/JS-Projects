import "./styles.css";

// src/index.js (Wires everything together)
import { ToDo } from './models/todo.js';
import { ToDoList } from './services/todo-list.js';
import { Logger } from './services/logger.js';
import { Storage } from './services/storage.js';
import { ToDoDisplay } from './interface/todo-display.js';
import { FormHandler } from './interface/form-handler.js';

// Create logger once
const logger = new Logger();
const storage = new Storage('todos', logger);

// Inject logger into classes that need it
const todoList = new ToDoList(logger, storage);
const display = new ToDoDisplay('#todo-list', logger);
const formHandler = new FormHandler('form');

// load todos from localStorage when page loads
todoList.loadFromStorage();
// Initial render
display.render(todoList.getAll());

// Handle form submission
formHandler.onSubmit(({ title, dueDate, note }) => {
    try {
        const todo = new ToDo(title, dueDate, note);
        todoList.add(todo);
        display.render(todoList.getAll());
    } catch (error) {
        logger.error(error.message);
    }
});

// Handle delete
formHandler.onDelete((id) => {
    todoList.remove(id);
    display.render(todoList.getAll());
});

formHandler.onToggle((id) => {
    const todo = todoList.getById(id);
    todo.toggleComplete();
    logger.log(`Toggled todo: ${todo.title} to ${todo.completed}`);
    storage.save(todoList.getAll());
    display.render(todoList.getAll());
});