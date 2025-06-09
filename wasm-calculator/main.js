function evaluateExpression(expr) {
  // NOTE: This uses the Function constructor, which is unsafe for untrusted input.
  // We first check that the expression only contains digits, operators and parentheses
  // to reduce risk, but a proper math parser should be used in real applications.
  if (!/^[0-9+\-*/().\s]+$/.test(expr)) {
    throw new Error('invalid expression');
  }
  return Function('"use strict"; return (' + expr + ')')();
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
