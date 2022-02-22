import toggleCartStatus from './toggleCartStatus.js';
import calcCartPriceAndDelivery from './calcCartPrice.js';

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
    //* Проверка на счётчик больше нуля
    if (parseInt(dataCounter.innerText) > 1) {
      dataCounter.innerText = --dataCounter.innerText;
    } else if (
      e.target.closest('.cart-wrapper') &&
      parseInt(dataCounter.innerText) === 1
    ) {
      console.log('IN CART!');
      //* Удаляем товар из корзины
      e.target.closest('.cart-item').remove();

      //* Отображение статуса корзины Пустая / Полная
      toggleCartStatus();

      //? Пересчёт общей стоимости товаров в корзине

      calcCartPriceAndDelivery();
    }
  }

  //* Проверяем клик на + или - внутри корзины
  if (
    e.target.hasAttribute('data-action') &&
    e.target.closest('.cart-wrapper')
  ) {
    //? Пересчёт общей стоимости товаров в корзине
    calcCartPriceAndDelivery();
  }
});
