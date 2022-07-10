const refs = {
    startBtn: document.querySelector("[data-start]"),
    stopBtn: document.querySelector("[data-stop]"),
};

let timerId = null;

function getRandomHexColor() {
  return document.body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

refs.startBtn.addEventListener("click", () => {
    timerId = setInterval(() => getRandomHexColor(), 1000);
    refs.stopBtn.removeAttribute('disabled');
    refs.startBtn.setAttribute('disabled', true);
});

refs.stopBtn.addEventListener("click", () => {
    clearInterval(timerId);
    refs.startBtn.removeAttribute('disabled');
    refs.stopBtn.setAttribute('disabled', true);
});
