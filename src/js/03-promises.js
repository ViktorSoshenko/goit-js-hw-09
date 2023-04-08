function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}

const form = document.querySelector('.form');
// const button = document.querySelector('button[type=submit]');
const inputDelay = document.querySelector('input[name=delay]');
const inputStep = document.querySelector('input[name=step]');
const inputAmount = document.querySelector('input[name=amount]');

form.addEventListener('submit', causeFunktion);

function causeFunktion(event) {
  event.preventDefault();
  console.log(typeof inputDelay);
  for (let i = inputAmount.value; i > 0; i++) {
    createPromise(inputDelay.value, inputStep.value).then(
      ({ position, delay }) => {
        console.log(
          `✅ Fulfilled promise ${inputDelay.value} in ${inputStep.value}ms`
        );
      }
    );
  }
}
