import init, { evaluate } from './pkg/calc.js';

async function run() {
    await init();
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('button[data-val]');
    const clear = document.getElementById('clear');
    const del = document.getElementById('delete');
    const enter = document.getElementById('enter');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            display.value += btn.dataset.val;
        });
    });

    clear.addEventListener('click', () => {
        display.value = '';
    });

    del.addEventListener('click', () => {
        display.value = display.value.slice(0, -1);
    });

    enter.addEventListener('click', () => {
        const result = evaluate(display.value);
        if (result.ok) {
            display.value = result.value.toString();
        } else {
            alert(result.err);
        }
    });
}

run();
