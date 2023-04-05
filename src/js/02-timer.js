import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const input = document.querySelector('#datetime-picker');
const button = document.querySelector('[data-start]');
const spanDays = document.querySelector('[data-days]');
const spanHours = document.querySelector('[data-hours]');
const spanMinutes = document.querySelector('[data-minutes]');
const spanSecond = document.querySelector('[data-seconds]');

let date = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const sel = selectedDates[0].getTime();
    // console.log(sel);
    let newDateMls = selectedDates[0].getTime();
    if (newDateMls <= date.getTime()) {
      button.disabled = true;
      alert('Please choose a date in the future');
    } else {
      button.disabled = false;
      let ms = newDateMls - date.getTime();
      console.log('getMonth(): ', date.getMonth());
      convertMs(ms);
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
  spanHours.textContent = hours;
  spanMinutes.textContent = minutes;
  spanSecond.textContent = seconds;

  return { days, hours, minutes, seconds };
}

button.addEventListener('click', convertMs);
