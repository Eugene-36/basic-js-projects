export default function toggleCartStatus() {
  const cartEmptyBadge = document.querySelector('[data-cart-empty]');
  const cartWrapper = document.querySelector('.cart-wrapper');
  const lengthOfchildrens = cartWrapper.children.length;
  const orderForm = document.querySelector('#order-form');

  if (lengthOfchildrens > 0) {
    cartEmptyBadge.classList.add('none');
    orderForm.classList.remove('none');
  } else {
    cartEmptyBadge.classList.remove('none');
    orderForm.classList.add('none');
  }
}
