import Select from './select.js';

const data = document.querySelectorAll('[data-custom]');
console.log(data);

data.forEach((selectElement) => {
  console.log('selectElement', selectElement);
  new Select(selectElement);
});
