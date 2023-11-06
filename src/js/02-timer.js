import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';

const refs = {
  timePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  timer: document.querySelector('timer'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
}

refs.startBtn.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {

    if(selectedDates[0] < Date.now()) {
      return Notify.failure("Please select future date");
    }

    Report.success('Date is valid, click to Start button');
    refs.startBtn.removeAttribute('disabled');
  },
};

flatpickr('#datetime-picker', options);

class Timer {
  constructor({onShow}) {
    this.onShow = onShow;
    this.intervalId = null;
    this.delay = 1000;
    // this.init();
  }


  init() {

  }

  start() {
    this.intervalId = setInterval(() => {
      
    })
  }

  stop() {

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
}

const timer = new Timer({
  onShow: updateTimerInterface,
});

// refs.buttonStart.addEventListener('click', timer.start.bind(timer));

function updateTimerInterface({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}