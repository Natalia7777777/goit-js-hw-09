const bodyColor = document.querySelector('body');
const colorBtnStart = document.querySelector('button[data-start]');
const colorBtnStop = document.querySelector('button[data-stop]');

colorBtnStart.addEventListener("click", start);
colorBtnStop.addEventListener("click", stop);

let intervalId = null;
colorBtnStart.disabled = false;

function start() {
    intervalId = setInterval(() => {
        const color = getRandomHexColor();
        bodyColor.style.backgroundColor = color;
    }, 1000);
    colorBtnStart.disabled = true;
}

function stop() {
    clearInterval(intervalId);
    colorBtnStart.disabled = false;
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
