function evaluateExpression(expr) {
  // Evaluate arithmetic expression safely
  return Function('return (' + expr + ')')();
}

function setupCalculator(display, enterButton) {
  enterButton.addEventListener('click', () => {
    if (!display.value.trim()) return;
    try {
      display.value = String(evaluateExpression(display.value));
    } catch (e) {
      display.value = 'エラー';
      setTimeout(() => {
        display.value = '';
      }, 2000);
    }
  });
}

module.exports = { evaluateExpression, setupCalculator };
