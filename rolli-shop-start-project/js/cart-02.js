import toggleCartStatus from './toggleCartStatus.js';
import calcCartPriceAndDelivery from './calcCartPrice.js';
//import calcCartPriceAndDelivery from './calcCartPrice.js';

//* Div внутри корзины, в которую мы добавляем товары
const cartWrapper = document.querySelector('.cart-wrapper');

// Отслеживаем клик на странице

window.addEventListener('click', (e) => {
  // Проверяем что клик был совершён по кнопке "Добавить в корзину"

  if (e.target.hasAttribute('data-cart')) {
    // Находим карточку с товаром, внутри которой был совершён клик
    const card = e.target.closest('.card');

    // Собираем данные с этого товара и записываем их в единый объект productInfo
    const productInfo = {
      id: card.dataset.id,
      imgSrc: card.querySelector('.product-img').getAttribute('src'),
      title: card.querySelector('.item-title').innerText,
      itemsInBox: card.querySelector('[data-items-in-box]').innerText,
      weight: card.querySelector('.price__weight').innerText,
      price: card.querySelector('.price__currency').innerText,
      counter: card.querySelector('[data-counter]').innerText,
    };

    //* Проверяем есть ли такой в корзине
    const itemInCart = cartWrapper.querySelector(
      `[data-id="${productInfo.id}"]`
    );

    if (itemInCart) {
      const counterElement = itemInCart.querySelector('[data-counter]');
      counterElement.innerText =
        parseInt(counterElement.innerText) + parseInt(productInfo.counter);
    } else {
      //* Здесь делаю деструктуризацию нашего бъекта productInfo
      const { id, imgSrc, title, itemsInBox, weight, price, counter } =
        productInfo;
      //* Собранные данные подставим в шаблон для товара в корзине
      const cartItemHTML = `
        <div class="cart-item" data-id="${id}">
        <div class="cart-item__top">
        <div class="cart-item__img">
        <img src="${imgSrc}" alt="${title}">
        </div>
        <div class="cart-item__desc">
        <div class="cart-item__title">${title}</div>
        <div class="cart-item__weight">${itemsInBox}. / ${weight}.</div>
        
        <!-- cart-item__details -->
        <div class="cart-item__details">
        
        <div class="items items--small counter-wrapper">
        <div class="items__control" data-action="minus">-</div>
        <div class="items__current" data-counter="">${counter}</div>
        <div class="items__control" data-action="plus">+</div>
        </div>
        
        <div class="price">
        <div class="price__currency">${price}</div>
        </div>
        
        </div>
        
        
        </div>
        </div>
        </div>
        `;

      //* Отобразим товар в корзине
      cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);
    }

    //* Сбрасываем счётчик на добавленного товара на 1
    card.querySelector('[data-counter]').innerText = '1';

    //* Отображение статуса корзины Пустая / Полная
    toggleCartStatus('cart-item');

    //* Пересчёт общей стоимости товаров в корзине
    calcCartPriceAndDelivery();
  }
});
