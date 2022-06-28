import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({
        position: position,
        delay: delay,
      });
    } else {
      reject({
        position: position,
        delay: delay,
      });
    }
  });
}

function onFormSubmit(e) {
  e.preventDefault();

  const {
    elements: { delay, step, amount },
  } = e.target;

  const delayNumber = Number(delay.value);
  const stepNumber = Number(step.value);

  for (let i = 1, j = delayNumber; i <= amount.value; i += 1, j += stepNumber) {
    setTimeout(() => {
      createPromise(i, j)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }, j);
  }
  e.target.reset();
}
