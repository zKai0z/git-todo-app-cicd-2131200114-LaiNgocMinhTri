// --- SINGLETON PATTERN ---
// We use a private variable `instance` and check for its existence
// to ensure only one TodoService is ever created.
let instance = null;

class TodoService {
    constructor() {
        if (instance) {
            return instance;
        }
        this.todos = [];
        this.observers = []; // --- OBSERVER PATTERN ---
        instance = this;
    }

    // --- OBSERVER PATTERN ---
    // Methods to subscribe and notify observers
    addObserver(observer) {
        this.observers.push(observer);
    }

    notify() {
        this.observers.forEach(observer => observer.update(this.todos));
    }

    addTodo(text) {
        const trimmedText = text.trim(); // remove whitespace from start/end
        if (trimmedText) {
            const newTodo = {
                id: Date.now(),
                text: trimmedText,
                completed: false
            };
            this.todos.push(newTodo);
            this.notify(); // Notify observers of the change
            return newTodo; // optional: return created todo
        }
        return null; // no todo added if empty
    }

    toggleTodoComplete(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.notify();
        }
    }

    removeTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.notify();
    }

    getTodos() {
        return this.todos;
    }
}

module.exports = { TodoService };
