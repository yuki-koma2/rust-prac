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

run().catch(error => {
    console.error('WebAssembly\u521d\u671f\u5316\u30a8\u30e9\u30fc:', error);
    alert('\u8a08\u7b97\u6a5f\u306e\u521d\u671f\u5316\u306b\u5931\u6557\u3057\u307e\u3057\u305f');
});
