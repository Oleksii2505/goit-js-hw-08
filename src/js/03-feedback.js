import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
let formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('textarea'),
  input: document.querySelector('input'),
};

populateFormInput();

refs.form.addEventListener('input', throttle(onInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = {};
}

function onInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateFormInput() {
  const parsedData = localStorage.getItem(STORAGE_KEY);
  if (parsedData) {
    const formKeys = JSON.parse(parsedData);
    if (formKeys.email !== undefined) refs.input.value = formKeys.email;
    if (formKeys.message !== undefined) refs.textarea.value = formKeys.message;
  }
}
