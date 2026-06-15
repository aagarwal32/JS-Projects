// src/interface/form-handler.js
export class FormHandler {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        this.titleInput = document.querySelector("#title");
        this.dueDateInput = document.querySelector("#due-date");
        this.noteInput = document.querySelector("#note");
    }

    onSubmit(callback) {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();

            const title = this.titleInput.value;
            const dueDate = this.dueDateInput.value 
                ? new Date(this.dueDateInput.value) : null;
            const note = this.noteInput.value;

            callback({ title, dueDate, note});
            this.form.reset();
        });
    }

    onDelete(callback) {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-btn')) {
                const id = e.target.dataset.id;
                callback(id);
            }
        });
    }

    onToggle(callback) {
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('todo-checkbox')) {
                const id = e.target.dataset.id;
                callback(id);
            }
        });
    }
}