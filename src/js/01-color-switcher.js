import { getRandomHexColor } from "./helpers/getRandomHexColor";

const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

startBtnEl.addEventListener('click', onClickStartBtn);
stopBtnEl.addEventListener('click', onClickStopBtn);
let intervalId = null;

function onClickStartBtn() {
  intervalId = setInterval(() => {
    const randomHexColor = getRandomHexColor();
    bodyEl.style.backgroundColor = randomHexColor;
    startBtnEl.disabled = true;
  }, 1000);
}

function onClickStopBtn() {
  startBtnEl.disabled = false;
  clearInterval(intervalId);
}


