import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

const SUBMIT_VALUE = 'feedback-form-state';

form.addEventListener('submit', onSubmit);
form.addEventListener('input', throttle(onInput, 500));

autoFill();

function onInput() {
  const formData = {
    email: form.elements.email.value,
    message: form.elements.message.value,
  };

  return localStorage.setItem(SUBMIT_VALUE, JSON.stringify(formData));
}

function onSubmit(e) {
  e.preventDefault();
  const {
    elements: { email, message },
  } = e.currentTarget;
  const data = {
    email: email.value,
    message: message.value,
  };

  if (email.value === '' || message.value == '') {
    return alert('Всі поля повинні бути заповнені');
  }

  console.log(data);

  localStorage.removeItem(SUBMIT_VALUE);
  return form.reset();
}

function autoFill() {
  const values = localStorage.getItem(SUBMIT_VALUE);

  if (!values) {
    return;
  }
  const { email, message } = JSON.parse(values);
  form.elements.email.value = email;
  form.elements.message.value = message;
}
