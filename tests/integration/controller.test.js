const { TodoService } = require('../../js/model');
const { Controller } = require('../../js/controller');

// Mock the View — we’re not testing UI behavior here
const mockView = {
    update: jest.fn(),
    bindAddTodo: jest.fn(),
    bindToggleTodo: jest.fn(),
    bindRemoveTodo: jest.fn(),
};

describe('Controller-Service Integration Tests', () => {
    let service;
    let controller;

    beforeEach(() => {
        service = new TodoService();
        service.todos = []; // Reset singleton for tests
        controller = new Controller(service, mockView);

        // ✅ Simulate the view subscribing to the service like in the real app
        service.addObserver(mockView);
    });

    test('handleAddTodo should call service.addTodo and update the model', () => {
        // Act
        controller.handleAddTodo('Integration test todo');

        // Assert
        const todos = service.getTodos();
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe('Integration test todo');
        expect(todos[0].completed).toBe(false);
        // Optional: ensure view update was triggered
        expect(mockView.update).toHaveBeenCalledWith(todos);
    });

    test('handleRemoveTodo should call service.removeTodo and update the model', () => {
        // Arrange
        service.addTodo('Temporary todo');
        const todoId = service.getTodos()[0].id;

        // Act
        controller.handleRemoveTodo(todoId);

        // Assert
        expect(service.getTodos().length).toBe(0);
        // Optional: ensure view update was triggered after removal
        expect(mockView.update).toHaveBeenCalledWith([]);
    });
});
