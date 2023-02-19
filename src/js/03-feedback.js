import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formData = {};
const parsedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

const form = document.querySelector('.feedback-form');

populateFormInput();

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onInput, 500));

function onFormSubmit(event) {
  event.preventDefault();
  console.log(formData);
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onInput(event) {
  formData[event.target.name] = event.target.value;
  return localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateFormInput() {
  if (parsedData) {
    const formKeys = Object.keys(parsedData);
    formKeys.map(element => {
      document.querySelector(`[name='${element}']`).value = parsedData[element];
    });
  }
}
