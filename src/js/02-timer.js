import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('button[data-start]');
const timerDays = document.querySelector('span[data-days]');
const timerHours = document.querySelector('span[data-hours]');
const timerMinutes = document.querySelector('span[data-minutes]');
const timerSeconds = document.querySelector('span[data-seconds]');
let selectedDate;

startBtn.addEventListener('click', start);
startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = selectedDates[0].getTime();
        if (selectedDate <= Date.now()) {
            Notify.failure('Please choose a date in the future');
        }
        else {
            startBtn.disabled = false;
        }
    },
};

flatpickr("#datetime-picker", options);

function start() {
    const intervalID = setInterval(() => {
        const interval = selectedDate - Date.now();
        const date = convertMs(interval);
        if (date.seconds < 0) {
            clearInterval(intervalID);
            return;
        }
        updateClockface(date);  
    }, 1000)
}

function updateClockface({ days, hours, minutes, seconds }) {
    timerDays.textContent = pad(days);
    timerHours.textContent = pad(hours);
    timerMinutes.textContent = pad(minutes);
    timerSeconds.textContent = pad(seconds);
}

function pad(value) {
    return value.toString().padStart(2, '0');
}

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
