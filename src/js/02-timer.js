import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import { convertMs } from './helpers/convertMs';
import { padStart } from './helpers/padStart';
import { Report } from 'notiflix/build/notiflix-report-aio';

const inputEl = document.querySelector('#datetime-picker');
const startBtnEl = document.querySelector('[data-start]');
const timerEl = document.querySelector('.timer');
let TIMER_DEADLINE = null;
let TIMER_ID = null;

startBtnEl.addEventListener('click', onStartBtnClick);

startBtnEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
        return Report.failure('Warning!', 'Please choose a date in the future', 'Okey');
    }
    startBtnEl.disabled = false;
    console.log(selectedDates[0]);
    Report.success('Success', 'Date selected. Press Start button', 'Okay');
    TIMER_DEADLINE = selectedDates[0];
  },
};

flatpickr(inputEl, options);

function onStartBtnClick() {
  TIMER_ID = setInterval(() => {
    const currentTime = Date.now();
    const diff = TIMER_DEADLINE - currentTime;

    if(diff <= 0) {
        clearInterval(TIMER_ID);
        startBtnEl.disabled = false;
        inputEl.disabled = false;
        return Report.info('Finally!!!', 'Congratulations!!!', 'Okay');
    }

    const { days, hours, minutes, seconds } = convertMs(diff);

    timerEl.querySelector('[data-days]').textContent = padStart(days);
    timerEl.querySelector('[data-hours]').textContent = padStart(hours);
    timerEl.querySelector('[data-minutes]').textContent = padStart(minutes);
    timerEl.querySelector('[data-seconds]').textContent = padStart(seconds);
  }, 1000);
  startBtnEl.disabled = true;
  inputEl.disabled = true;
}
