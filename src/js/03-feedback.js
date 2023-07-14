import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const emailInputEl = document.querySelector('input');
const messageInputEl = document.querySelector('textarea');

const saveFormData = () => {
  const formData = {
    email: emailInputEl.value,
    message: messageInputEl.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

const loadFormData = () => {
  const savedData = localStorage.getItem('feedback-form-state');
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    emailInputEl.value = parsedData.email;
    messageInputEl.value = parsedData.message;
  }
};

const clearFormData = () => {
  localStorage.removeItem('feedback-form-state');
  emailInputEl.value = '';
  messageInputEl.value = '';
};

const submitForm = event => {
  event.preventDefault();
  const formData = {
    email: emailInputEl.value,
    message: messageInputEl.value,
  };
  if (emailInputEl.value === '' || messageInputEl.value === '') {
    return alert('Both rows must be filled in');
  }
  console.log(formData);
  clearFormData();
};

formEl.addEventListener('input', throttle(saveFormData, 500));
formEl.addEventListener('submit', submitForm);

loadFormData();
