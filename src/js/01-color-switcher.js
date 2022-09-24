const refs = {
  body: document.querySelector('body'),
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};

const visibleDelay = 1000;
let timerId = null;

refs.btnStart.addEventListener('click', onStartClick);
refs.btnStop.addEventListener('click', onStopClick);

function onStartClick() {
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;

  timerId = setInterval(() => {
    refs.body.style.background = getRandomHexColor();
  }, visibleDelay);
}

function onStopClick() {
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;
  clearTimeout(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
