import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', el => {
  const delayValue = parseInt(formRef.elements.delay.value);
  const stepValue = parseInt(formRef.elements.step.value);
  const amountValue = parseInt(formRef.elements.amount.value);

  el.preventDefault();
  createPromises(delayValue, stepValue, amountValue);
});

function createPromises(delay, step, amount) {
  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, delay + step * i)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    formRef.reset();
  }
}