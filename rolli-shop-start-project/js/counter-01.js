//Получаем элементы на странице
const btnMinues = document.querySelector('[data-action="minus"]');
const btnPlues = document.querySelector('[data-action="plus"]');
const counter = document.querySelector('[data-counter]');

//Отслеживаем клик на конпку минус
btnMinues.addEventListener('click', () => {
  const decrement = (counter.innerText = --counter.innerText);

  if (decrement <= 1) {
    counter.innerText = '1';
  }
});

//Отслеживаем клик на конпку плюс
btnPlues.addEventListener('click', (e) => {
  counter.innerText = ++counter.innerText;
});
