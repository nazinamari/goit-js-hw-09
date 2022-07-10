import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  timer: document.querySelector('.timer'),
  startBtn: document.querySelector('[data-start]'),
  timePicker: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

refs.startBtn.setAttribute('disabled', true);
refs.startBtn.addEventListener('click', onStartClick);

const libraryFlatpickr = flatpickr(refs.timePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      refs.startBtn.removeAttribute('disabled');
    } else {
      window.alert('Please choose a date in the future');
    }
  },
});

function onStartClick() {
  refs.startBtn.setAttribute('disabled', true);
  refs.timePicker.setAttribute('disabled', true);

    const timer = setInterval(() => {
        const selectedDate =
            libraryFlatpickr.selectedDates[0].getTime() - Date.now();

        if (selectedDate > 0) {
            renderTimer(convertMs(selectedDate));
            refs.seconds.classList.add('zero');
        } else {
            clearInterval(timer);
            refs.timePicker.removeAttribute('disabled');
            refs.seconds.classList.remove('zero');
            window.alert(`Time's up!`);
        }
    },1000);
}

function renderTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}