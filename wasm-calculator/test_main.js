const assert = require('assert');
const { setupCalculator } = require('./main');

function createButton() {
  return {
    listeners: {},
    addEventListener(event, cb) {
      this.listeners[event] = cb;
    }
  };
}

async function testSuccess() {
  const display = { value: '1+2' };
  const button = createButton();
  setupCalculator(display, button);
  button.listeners.click();
  assert.strictEqual(display.value, '3');
}

async function testError() {
  const display = { value: '1a' };
  const button = createButton();
  setupCalculator(display, button);
  button.listeners.click();
  assert.strictEqual(display.value, 'エラー');
  await new Promise(r => setTimeout(r, 2100));
  assert.strictEqual(display.value, '');
}

async function testInjection() {
  const display = { value: '1+process.exit()' };
  const button = createButton();
  setupCalculator(display, button);
  button.listeners.click();
  assert.strictEqual(display.value, 'エラー');
  await new Promise(r => setTimeout(r, 2100));
  assert.strictEqual(display.value, '');
}

async function testEmptyInput() {
  const display = { value: '   ' };
  const button = createButton();
  setupCalculator(display, button);
  button.listeners.click();
  assert.strictEqual(display.value, '   ');
}

(async () => {
  await testSuccess();
  await testError();
  await testInjection();
  await testEmptyInput();
  console.log('All tests passed');
})();
