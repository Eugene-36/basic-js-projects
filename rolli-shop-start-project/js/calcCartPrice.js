export default function calcCartPriceAndDelivery() {
  const cartItems = document.querySelectorAll('.cart-item');
  const container = document.querySelector('.total-price');
  const deliveryCost = document.querySelector('.delivery-cost');

  let total = 0;
  cartItems.forEach((item) => {
    const counter = item.querySelector('[data-counter]').innerText;
    const priceCurrency = item.querySelector('.price__currency').innerText;
    const countTotalPrice = parseInt(counter) * parseInt(priceCurrency);

    total += countTotalPrice;
  });

  //? Отоброжение цены на странице
  container.innerText = total;

  if (total >= 600) {
    deliveryCost.classList.add('free');
    deliveryCost.innerText = 'бесплатно';
  } else {
    deliveryCost.classList.remove('free');
    deliveryCost.innerText = '250  ₽';
  }
  if (cartItems.length === 0) {
    deliveryCost.innerText = '0  ₽';
    document
      .querySelector('.next')
      .nextSibling.nextElementSibling.classList.add('none');
  } else if (cartItems.length > 0) {
    document
      .querySelector('.next')
      .nextSibling.nextElementSibling.classList.remove('none');
  }
}
