import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';
const input = document.querySelector('#datetime-picker');
const button = document.querySelector('[data-start]');
const spanDays = document.querySelector('[data-days]');
const spanHours = document.querySelector('[data-hours]');
const spanMinutes = document.querySelector('[data-minutes]');
const spanSecond = document.querySelector('[data-seconds]');
const divBlock = document.querySelector('.field');
const divflex = document.querySelector('.timer');

divflex.style.display = 'flex';

button.disabled = true;
let date = new Date();
let timerId = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);

    let newDateMls = selectedDates[0].getTime();
    if (newDateMls <= date.getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      button.disabled = false;
      button.addEventListener('click', () => {
        timerId = setInterval(() => {
          const ms = newDateMls - date.getTime();
          // console.log(ms);
          convertMs(ms);
          stopTimer(ms);
          date = new Date();
        }, 1000);
      });
    }
  },
};

const fp = flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  spanDays.textContent = days;
  spanHours.textContent = `${addLeadingZero(hours)} :`;
  spanMinutes.textContent = `${addLeadingZero(minutes)} :`;
  spanSecond.textContent = `${addLeadingZero(seconds)}`;

  return { days, hours, minutes, seconds };
} // {days: 0, hours: 0, minutes: 0, seconds: 2}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function stopTimer(value) {
  if (spanSecond.textContent < 1) {
    console.log('OVER');
    Notiflix.Notify.success('OVER');
    clearInterval(timerId);
  }
}
