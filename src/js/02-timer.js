import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  datetimePickerInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  timer: document.querySelector('timer'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
}

refs.startBtn.setAttribute('disabled', true);

let timeFromDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {

    timeFromDate = selectedDates[0].getTime()

    if(timeFromDate < Date.now()) {
      return Notify.failure("Please select a future date");
    }

    Notify.success('Date is valid, click the Start button');
    refs.startBtn.removeAttribute('disabled');
  },
};

flatpickr('#datetime-picker', options);

class Timer {
  constructor({onShow}) {
    this.onShow = onShow;
    this.intervalId = null;
    this.delay = 1000;
  }

  start() {
    this.intervalId = setInterval(() => {
      if(timeFromDate - Date.now() <= 0 ){
        clearInterval(this.intervalId);
        this.enableInputFields();
        return Notify.success('We start the sale!');
      }

      const deltaTime = timeFromDate - Date.now();
      const time = this.convertMs(deltaTime);
      this.onShow(time);
    }, this.delay);

    this.disableStartButton();
    this.disableTimePickerInput();
  }

  stop() {
    clearInterval(this.intervalId);
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = this.addLeadingZero(Math.floor(ms / day));
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
  }

    addLeadingZero (value) {
      return String(value).padStart(2, '0');
    };

    enableInputFields() {
      refs.datetimePickerInput.removeAttribute('disabled');
    }

    disableStartButton() {
      refs.startBtn.setAttribute('disabled', 'disabled');
    }

    disableTimePickerInput() {
      refs.datetimePickerInput.setAttribute('disabled', 'disabled');
    }
}

const timer = new Timer({
  onShow: updateTimerInterface,
});

refs.startBtn.addEventListener('click', timer.start.bind(timer));

function updateTimerInterface({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}