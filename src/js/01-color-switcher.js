const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
}

refs.startBtn.addEventListener('click', onStartColor);
refs.stopBtn.addEventListener('click', onStopColor);

let timerId = null

function onStartColor () {
    timerId = setInterval(getRandomHexColor, 1000);
    toggleButtonState(refs.startBtn, refs.stopBtn);
    
}

function onStopColor () {
    clearInterval(timerId);
    toggleButtonState(refs.stopBtn, refs.startBtn);
}

function toggleButtonState(disabledBtn, enabledBtn) {
    disabledBtn.setAttribute('disabled', true);
    enabledBtn.removeAttribute('disabled');
}

function getRandomHexColor() {
    return document.body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
