import { createPromise } from './helpers/createPromise';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('form');
const submitBtnEl = document.querySelector('button');

formEl.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();

  const amount = event.target.elements.amount.value;
  let delay = Number(event.target.elements.delay.value);
  const step = Number(event.target.elements.step.value);

  submitBtnEl.disabled = true;
  event.target.elements.amount.disabled = true;
  event.target.elements.delay.disabled = true;
  event.target.elements.step.disabled = true;

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
      delay += step;
  }
  setInterval(() => {submitBtnEl.disabled = false;
    event.target.elements.amount.disabled = false;
    event.target.elements.delay.disabled = false;
    event.target.elements.step.disabled = false}, delay)
}
