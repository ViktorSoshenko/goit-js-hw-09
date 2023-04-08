import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
        // Fulfill
      } else {
        reject({ position, delay });
        // Reject
      }
    }, delay);
  });
}

const form = document.querySelector('.form');
// const button = document.querySelector('button[type=submit]');

form.addEventListener('submit', causeFunktion);
console.log(form);
function causeFunktion(event) {
  event.preventDefault();
  let {
    elements: { delay, step, amount },
  } = event.currentTarget;
  let inputDelay = Number(delay.value);
  let inputStep = Number(step.value);
  let inputAmount = Number(amount.value);
  if (inputDelay < 0 || inputStep < 0 || inputAmount <= 0) {
    Notiflix.Notify.warning('All data mast be positive');
    return;
  }
  for (let i = 0; i < inputAmount; i += 1) {
    let position = i + 1;
    let deleys = inputDelay + inputStep * i;

    createPromise(position, deleys)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    // inputDelay += inputStep;
  }
}
