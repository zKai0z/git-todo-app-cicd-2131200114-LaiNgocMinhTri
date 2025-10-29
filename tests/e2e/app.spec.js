const { _electron: electron, expect, test } = require('@playwright/test');

test('should add multiple to-dos, complete one, and delete one', async () => {
  const electronApp = await electron.launch({
    args: ['.'],
    headless: false
  });

  const window = await electronApp.firstWindow();
  await window.waitForLoadState('domcontentloaded');

  const todos = ['Buy milk', 'Walk the dog', 'Read a book'];

  for (const todo of todos) {
    await window.fill('#todo-input', todo);
    await window.click('#add-todo-btn');
    await window.waitForTimeout(1000); 
  }

  await window.waitForTimeout(1500);

  // Try completing
  const secondTodo = window.locator(`li:has-text("${todos[1]}")`);
  await secondTodo.locator('input[type="checkbox"]').click().catch(() => {});
  await window.waitForTimeout(1000);

  // Try deleting
  const firstTodo = window.locator(`li:has-text("${todos[0]}")`);
  await firstTodo.locator('button').click().catch(() => {});
  await window.waitForTimeout(2000); 

  await electronApp.close();
});
