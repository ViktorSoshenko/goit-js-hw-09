function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;
startBtn.addEventListener('click', () => {
  timerId = setInterval(randomCollor, 1000);
});
startBtn.addEventListener('click', disabledTrue);

function disabledTrue(event) {
  startBtn.disabled = true;
  stopBtn.disabled = false;
}
function randomCollor(event) {
  const funkColor = getRandomHexColor();
  body.style.backgroundColor = funkColor;
}

stopBtn.addEventListener('click', stopColor);
function stopColor(event) {
  clearInterval(timerId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
  console.log('wert');
}
console.log('готово');
