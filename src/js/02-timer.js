// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const classTimer = document.querySelector('.timer');
const field = document.querySelectorAll('.field');
const value = document.querySelectorAll('.value');
const label = document.querySelectorAll('.label');

const refs = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),

  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const visibleDelay = 1000;

//оформление
classTimer.style.display = 'flex';

for (let key of value) {
  key.style.fontSize = '30px';
}

for (let key of field) {
  key.style.marginRight = '20px';
  key.style.textAlign = 'center';
}

for (let key of label) {
  key.style.display = 'block';
}

refs.btnStart.disabled = true;
let endTime = null;

//Форматирование времени
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
  return { days, hours, minutes, seconds };
}

//flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      //window.alert('Please choose a date in the future');
      Notify.failure('Please choose a date in the future');
    } else {
      refs.btnStart.disabled = false;
      endTime = selectedDates[0];
    }
  },
};

flatpickr(refs.input, options);

//реализация через класс
class Timer {
  constructor() {
    this.intervalId = null;
    refs.btnStart.disabled = true;
  }

  start() {
    refs.btnStart.disabled = true;
    refs.input.disabled = true;
    this.intervalId = setInterval(() => {
      const startTime = Date.now();
      const deltaTime = endTime - startTime;
      const ms = convertMs(deltaTime);

      if (deltaTime <= 1000) {
        clearInterval(this.intervalId);
      }

      this.updateClockface(ms);
    }, visibleDelay);
  }

  updateClockface({ days, hours, minutes, seconds }) {
    refs.days.textContent = days.toString().padStart(2, 0);
    refs.hours.textContent = hours.toString().padStart(2, 0);
    refs.minutes.textContent = minutes.toString().padStart(2, 0);
    refs.seconds.textContent = seconds.toString().padStart(2, 0);
  }
}

const timer = new Timer();
refs.btnStart.addEventListener('click', () => timer.start());
