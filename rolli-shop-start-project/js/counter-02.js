const btnMinues = document.querySelectorAll('[data-action="minus"]');
const btnPlues = document.querySelectorAll('[data-action="plus"]');
const counter = document.querySelectorAll('[data-counter]');

//! Мой вариант =====

// btnPlues.forEach((item, i) => {
//   item.addEventListener('click', () => {
//     console.log('index', i);
//     counter[i].innerText = ++counter[i].innerText;
//   });
// });

// btnMinues.forEach((item, i) => {
//   item.addEventListener('click', () => {
//     console.log('btnMinues index:', i);

//     const decrement = (counter[i].innerText = --counter[i].innerText);
//     if (decrement <= 1) {
//       counter[i].innerText = '1';
//     }
//     console.log('click');
//   });
// });

//!=========

window.addEventListener('click', (e) => {
  const gettingDataSetPlus = e.target.dataset.action === 'plus';
  const gettingDataSetMinues = e.target.dataset.action === 'minus';

  //* Объявляем переменную для счётчика
  let dataCounter;
  //Проверяем клик строго по кнопкам Плюс либо Минус
  if (gettingDataSetPlus || gettingDataSetMinues) {
    //* Находим обёртку счётчика
    const counterWrapper = e.target.closest('.counter-wrapper');

    //* Находим див с числом счётчика
    dataCounter = counterWrapper.querySelector('[data-counter]');
  }

  if (gettingDataSetPlus) {
    dataCounter.innerText = ++dataCounter.innerText;
  }

  if (gettingDataSetMinues) {
    const decrement = (dataCounter.innerText = --dataCounter.innerText);

    //* Если счётчик меньше или равно 1 то записую 1
    if (decrement <= 1) {
      dataCounter.innerText = '1';
    }
  }
});
