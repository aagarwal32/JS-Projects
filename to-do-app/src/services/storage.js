// src/services/storage.js
export class Storage {
    constructor(key = 'todos', logger) {
        this.key = key;
        this.logger = logger;
    }

    // save todos to localStorage
    save(todos) {
        try {
            const json = JSON.stringify(todos);
            localStorage.setItem(this.key, json);
            this.logger.log(`Saved ${todos.length} todos to localStorage`);
        } catch (error) {
            this.logger.error(`Failed to save ${todos.length} todos to localStorage: ${error}`);
        }
    }

    // load todos from localStorage
    load() {
        try {
            const json = localStorage.getItem(this.key);

            // return empty array if nothing saved
            if (!json) {
                return [];
            }
            return JSON.parse(json);
        } catch (error) {
            this.logger.error(`Failed to load todos from localStorage: ${error}`);
            return [];
        }
    }

    clear() {
        try {
            localStorage.removeItem(this.key);
            this.logger.log(`Cleared all todos from localStorage successfully`);
        } catch (error) {
            this.logger.error(`Failed to clear todos from localStorage: ${error}`);
        }
    }
}