const formData = { email: '', message: '' };
const storageKey = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

try {
  const savedData = JSON.parse(localStorage.getItem(storageKey));

  for (const name of Object.keys(formData)) {
    formData[name] =
      typeof savedData?.[name] === 'string' ? savedData[name].trim() : '';
    form.elements[name].value = formData[name];
  }
} catch (error) {
  console.warn('Could not restore feedback form data:', error);
}

form.addEventListener('input', event => {
  const { name, value } = event.target;
  if (name !== 'email' && name !== 'message') return;

  formData[name] = value.trim();
  localStorage.setItem(storageKey, JSON.stringify(formData));
});

form.addEventListener('submit', event => {
  event.preventDefault();

  formData.email = form.elements.email.value.trim();
  formData.message = form.elements.message.value.trim();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log({ ...formData });
  localStorage.removeItem(storageKey);
  formData.email = '';
  formData.message = '';
  form.reset();
});
