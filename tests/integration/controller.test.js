const { TodoService } = require('../../js/model');
const { Controller } = require('../../js/controller');

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
        service.todos = [];
        controller = new Controller(service, mockView);

        service.addObserver(mockView);
    });

    test('handleAddTodo should call service.addTodo and update the model', () => {
        controller.handleAddTodo('Integration test todo');

        const todos = service.getTodos();
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe('Integration test todo');
        expect(todos[0].completed).toBe(false);
        expect(mockView.update).toHaveBeenCalledWith(todos);
    });

    test('handleRemoveTodo should call service.removeTodo and update the model', () => {
        service.addTodo('Temporary todo');
        const todoId = service.getTodos()[0].id;

        controller.handleRemoveTodo(todoId);

        expect(service.getTodos().length).toBe(0);
        expect(mockView.update).toHaveBeenCalledWith([]);
    });
});
